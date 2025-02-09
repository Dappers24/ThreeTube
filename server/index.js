import express from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import keys from './configs/server_config.js';
import { uploadFileToIPFS } from './services/pinata_services.js';
import { segmentVideo } from './services/ffmpeg_services.js';
import upload from './middlewares/upload.js';
import fs from 'fs';
import connectToDb from './configs/db_config.js';
import {Server as SocketIo} from 'socket.io'
import { Like } from './models/likesSchema.js';
import { Video } from './models/videoSchema.js';
import { View } from './models/viewsSchema.js';

const app = express()
const server = http.createServer(app);
export const io = new SocketIo(server , {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(
    cors({
      origin:'*',
      credentials: true,
    }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.post('/upload', upload.single('video') , async (req, res)=>{
    try{
        const {title , description , tags} = req.body;

        //ffmpeg segments the video in the segmentVideo() function;
        const inputPath = `./uploads/${req.fileName}`;
        const outputFolder = `./videos/${(req.fileName).split('.')[0]}`;
        if(!fs.existsSync(outputFolder)){
            fs.mkdirSync(outputFolder , {recursive:true});
        }
        const segmentation = await segmentVideo(inputPath , outputFolder);
        fs.unlinkSync(inputPath);
        if(!segmentation)return res.status(500).json({error:true,message:'File upload failed'});

        //uploading to IPFS by pinataSDK 
        const response = await uploadFileToIPFS({folderPath:outputFolder , metadata:{title:title , description:description , tags:tags}});
        fs.rmdirSync(outputFolder, {recursive:true});
        if(!response) return res.status(500).json({error:true,message:'File upload failed'});
        
        //sending the frontend response to contact with the smart contracts to store the returned ipfsHash in ethereum blockchain via subgraphs
        return res.status(200).json({error:false,message:'File upload success',data:{
            ipfsHash:response,
            title:title,
            description:description,
            tags:tags
        }});
    }catch(error){
        console.log(error);
        if (fs.existsSync(outputFolder)) fs.rmdirSync(outputFolder, {recursive:true});
        res.status(500).json({error:true,message:'File upload failed'});
    }
})

io.on('connection' , (socket)=>{
    console.log(`connection with ${socket.id}`)

    socket.on('view' , async ({videoCid,userAddress})=>{
        try {
            socket.join(videoCid);
            let video = await Video.findOne({videoCid:videoCid});
            if(!video)
                video = await Video.create({videoCid:videoCid});
            const viewCheck = await View.findOne({videoCid:videoCid , userAddress:userAddress});
            if(!viewCheck){
                await View.create({videoCid:videoCid, userAddress:userAddress});
                let viewsCount = video.viewsCount+1;
                video.viewsCount = viewsCount;
                await video.save({validateBeforeSave:'true'});
                io.to(videoCid).emit('system-msg',{msg:'New Viewer Joined',likesCount:video.likesCount,error:false,viewsCount:viewsCount});
            }else
            io.to(videoCid).emit('system-msg',{msg:'',likesCount:video.likesCount,error:false,viewsCount:video.viewsCount});
        } catch (error) {
            socket.emit('system-msg' , {error:true,msg:'Some error occured',likesCount:null,viewsCount:null});
        }
    });

    socket.on('like' , async ({videoCid,userAddress})=>{
        try {
            const likeCheck = await Like.findOne({videoCid:videoCid , userAddress:userAddress});
            let video = await Video.findOne({videoCid:videoCid});
            if(likeCheck){
                await Like.findByIdAndDelete(likeCheck._id);
                let likesCount = video.likesCount;
                if(likesCount>0) likesCount = video.likesCount-1;
                video.likesCount = likesCount;
                io.to(videoCid).emit('system-msg' , {msg:"Someone Liked Removed",likesCount:likesCount,error:false,viewsCount:video.viewsCount});
            }else{
                await Like.create({videoCid:videoCid, userAddress:userAddress});
                let likesCount = video.likesCount+1;
                video.likesCount = likesCount;
                io.to(videoCid).emit('system-msg' , {msg:'Video Liked',likesCount:likesCount,error:false,viewsCount:video.viewsCount});
            }
            await video.save({validateBeforeSave:'true'});
        } catch (error) {
            socket.emit('system-msg' , {error:true,msg:'Some error occured',likesCount:null,viewsCount:null});
        }
    });
})

app.get('/ping',(req,res)=>{
    res.send('pong')
})

server.listen(keys.PORT ||8000 , async ()=>{
    await connectToDb();
    console.log("Running on port 8000");
})