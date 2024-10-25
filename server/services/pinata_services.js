import fs from 'fs'
import pinata from '../configs/pinata_config.js';

async function uploadFileToIPFS({filePath,metadata}) {
    try {
        const imageBuffer = fs.readFileSync(filePath);
        const file = new File([imageBuffer], "test2.png", { type: "image/png" });
        //const file = new File([videoBuffer], "video.m3u8", { type: "application/vnd.apple.mpegurl" });
        const pinataMetadata  ={
            name:"metaData",
            keyValues:metadata
        }
        const pinataOptions ={
          cidVersion:1
        }
        const upload = await pinata.upload.file(file,pinataMetadata,pinataOptions);
        console.log(upload);
        return upload
      } catch (error) {
        console.log(error);
        return false
      }
}

async function fetchFileFromIFPS(ipsHash) {
    try {
        const response = await pinata.gateways.get(ipsHash)
        const file = response.data
        console.log(file)
        return file
    } catch (error) {
        console.log(error)
        return false
    }
}

export  {uploadFileToIPFS , fetchFileFromIFPS}