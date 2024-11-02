import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import keys from './configs/server_config.js';
import { uploadFileToIPFS } from './services/pinata_services.js';
import { segmentVideo } from './services/ffmpeg_services.js';
import upload from './middlewares/upload.js';
import fs from 'fs';
const app = express()

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
        if(!segmentation)return res.status(500).json({error:true,message:'File upload failed'});

        //uploading to IPFS by pinataSDK 
        const response = await uploadFileToIPFS({folderPath:outputFolder , metadata:{title:title , description:description , tags:tags}});
        if(!response) return res.status(500).json({error:true,message:'File upload failed'});
        
        //sending the frontend response to contact with the smart contracts to store the returned ipfsHash in ethereum blockchain via subgraphs
        return res.status(200).json({error:false,message:'File upload success',data:{
            ipfsHash:response.ipfsHash,
            title:title,
            description:description,
            tags:tags
        }});
    }catch(error){
        console.log(error);
        res.status(500).json({error:true,message:'File upload failed'});
    }
})

app.get('/ping',(req,res)=>{
    res.send('pong')
})

app.listen(8000 , ()=>{
    console.log("Running on port 8000")
})