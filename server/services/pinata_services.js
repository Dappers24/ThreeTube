import fs from 'fs'
import path from 'path';
import pinata from '../configs/pinata_config.js';

async function uploadFileToIPFS({filePath,metadata}) {
    //give the folderPath instead of filePath
    try {
        // let fileArray = [] //this arrau for storing the segments of files
        // const fileNames = fs.readdirSync(folderPath)
        // fileNames.forEach((fileName)=>{  //this loop returns stored all the files in the fileArray 
        //     const fileBuffer = fs.readFileSync(path.join(folderPath , fileName))
        //     const file = new File([fileBuffer], fileName , type?) 
        //     fileArray.push(file)
        // })

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
        //const upload = await pinata.upload.folder(fileArray,pinataMetadata,pinataOptions)
        //uploading the array with the file object to the ipfs like a playlist
        const upload = await pinata.upload.file(file,pinataMetadata,pinataOptions);
        console.log(upload);
        return upload.IpfsHash
      } catch (error) {
        console.log(error);
        return false
      }
}

async function fetchFileFromIFPS(ipsHash) {
    try {
        const response = await pinata.gateways.get(ipsHash)
        const file = response.data
        // const folder = response.data
        console.log(file)
        return file
    } catch (error) {
        console.log(error)
        return false
    }
}

export  {uploadFileToIPFS , fetchFileFromIFPS}