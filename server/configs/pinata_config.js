//const axios = require('axios');
//const FormData = require('form-data');
//const fs = require('fs'); // Or use any buffer data for your files
import keys from './server_config.js';
import { PinataSDK } from 'pinata-web3';

const pinata = new PinataSDK({
    pinataJwt: keys.PINATA_JWT,
    pinataGateway: keys.GATEWAY_URL
})

export default pinata
