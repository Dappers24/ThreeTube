import fs from 'fs'
import path from 'path';
import pinata from '../configs/pinata_config.js';

async function uploadFileToIPFS({folderPath,metadata}) {
    try {
        let fileArray = [] 
        const fileNames = fs.readdirSync(folderPath);
        fileNames.forEach((fileName)=>{   
            const fileBuffer = fs.readFileSync(path.join(folderPath , fileName));
            const fileType = fileName.endsWith('.m3u8')? 
            "application/vnd.apple.mpegurl":"video/MP2T";
            const file = new File([fileBuffer], fileName , { type:fileType });
            fileArray.push(file);
        })

        const pinataMetadata  ={
            name:"metaData",
            keyValues:metadata
        }
        const pinataOptions ={
          cidVersion:1
        }
        const upload = await pinata.upload.fileArray(fileArray,pinataMetadata,pinataOptions);
        console.log(upload);
        return upload.IpfsHash;
      } catch (error) {
        console.log(error);
        return false
      }
}


export  {uploadFileToIPFS}