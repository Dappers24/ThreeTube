import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import keys from './configs/server_config.js';
import { fetchFileFromIFPS, uploadFileToIPFS } from './services/pinata_services.js';
import { segmentVideo } from './services/ffmpeg_services.js';
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

app.post('/upload', async (req, res)=>{
    try{
        const {title , description , tags} = req.body

        //ffmpeg segments the video in the segmentVideo() function
        // const inputPath = './video.mp4'
        // const outputFolder = './videos'
        // const segmentation = await segmentVideo(inputPath , outputFolder)
        // if(!segmentation) res.status(500).json({error:true,message:'File upload failed'})

        const response = await uploadFileToIPFS({filePath:'./ss2.png' , metadata:{title:title , description:description , tags:tags}})
        if(!response) return res.status(500).json({error:true,message:'File upload failed'})
        
        //sending the frontend response to contact with the smart contracts to store the returned ipfsHash in ethereum blockchain via subgraphs
        return res.status(200).json({error:false,message:'File upload success'})
    }catch(error){
        console.log('error')
        res.status(500).json({error:true,message:'File upload failed'})
    }
})

app.get('/view' , async (req, res)=>{
    try {
        const {ipsHash} = req.body
        const response = await fetchFileFromIFPS(ipsHash)
        if(!response) return res.status(500).json({error:true,message:'File fetch failed'})
        //returning the 
        return res.status(200).json({error:false,message:'File fetch success',data:response})
    } catch (error) {
        console.log('error')
        res.status(500).json({error:true,message:'File fetch failed'})
    }
})


app.listen(8000 , ()=>{
    console.log("Running on port 8000")
})