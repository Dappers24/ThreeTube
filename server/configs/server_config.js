import dotenv from "dotenv";
dotenv.config();

const keys = {
    PINATA_API_KEY: process.env.PINATA_API_KEY,
    PINATA_SECRET_API_KEY: process.env.PINATA_SECRET_API_KEY,
    GATEWAY_URL: process.env.GATEWAY_URL,
    PINATA_JWT: process.env.PINATA_JWT
};

export default keys;