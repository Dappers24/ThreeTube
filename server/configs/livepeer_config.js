import keys from './server_config.js';
import Livepeer from "livepeer";

const livepeer = new Livepeer({
  apiKey: keys.LIVEPEER_API_KEY
})

export default livepeer