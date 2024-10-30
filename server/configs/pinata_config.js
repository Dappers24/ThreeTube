//const axios = require('axios');
//const FormData = require('form-data');
//const fs = require('fs'); // Or use any buffer data for your files
<<<<<<< HEAD

import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'
import keys from './server_config.js';
// Pinata credentials
=======
import keys from './server_config.js';
>>>>>>> adc3b0d8cbf42e779b9e0618c14c59180db75e84
import { PinataSDK } from 'pinata-web3';

const pinata = new PinataSDK({
    pinataJwt: keys.PINATA_JWT,
    pinataGateway: keys.GATEWAY_URL
<<<<<<< HEAD
  })
// Upload File function
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
=======
})

export default pinata
>>>>>>> adc3b0d8cbf42e779b9e0618c14c59180db75e84
