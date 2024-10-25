import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import keys from './configs/server_config.js';
import {uploadFileToIPFS} from './configs/pinata_config.js';
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

app.get('/test', async (req, res)=>{
    try{
        const response = await uploadFileToIPFS('./ss2.png')
        //const file = new File([videoBuffer], "video.m3u8", { type: "application/vnd.apple.mpegurl" });
        res.send("hello")
    }catch(error){
        console.log('error')
    }
    //res.send("Hello world")
})


app.listen(8000 , ()=>{
    console.log("Running on port 8000")
})