//const axios = require('axios');
//const FormData = require('form-data');
//const fs = require('fs'); // Or use any buffer data for your files

import fs from 'fs'
import keys from './server_config.js';
// Pinata credentials
import { PinataSDK } from 'pinata-web3';

const pinata = new PinataSDK({
    pinataJwt: keys.PINATA_JWT,
    pinataGateway: keys.GATEWAY_URL
  })
  
async function uploadFileToIPFS(filePath) {
    try {
        const imageBuffer = fs.readFileSync(filePath);
        const file = new File([imageBuffer], "test2.png", { type: "image/png" });
        console.log('error1')
        const upload = await pinata.upload.file(file);
        console.log(upload);
      } catch (error) {
        console.log(error);
      }
}
export  {uploadFileToIPFS}

// Usage example
/*uploadFileToIPFS('path/to/your/file.mp4')
    .then(response => console.log('File uploaded:', response))
    .catch(error => console.error('Error uploading file:', error));*/