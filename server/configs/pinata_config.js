import keys from './server_config.js';
import { PinataSDK } from 'pinata-web3';

const pinata = new PinataSDK({
    pinataJwt: keys.PINATA_JWT,
    pinataGateway: keys.GATEWAY_URL
})

export default pinata