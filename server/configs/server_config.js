import dotenv from "dotenv";
import express from "express";

dotenv.config({path: '../.env'});

const keys = {
    PORT: 8000,
    DB: 'mongodb+srv://test_user:test_user@cluster0.5b3q3.mongodb.net/threetube',
    NODE_ENV: 'development',
    PINATA_API_KEY: '8a034777c3ad4d9b325d',
    PINATA_SECRET_API_KEY: '48cda73faea224b7e3f89ac3bfbcae7edb55ce17c3e5e6da3969d05dcd9894ee',
    GATEWAY_URL: 'tomato-junior-tarsier-562.mypinata.cloud',
    PINATA_JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3MTE5YmEyYS1kMmRhLTQ5ZjUtOTBiMi1hZmI2MGQ4YThhNGYiLCJlbWFpbCI6IjA4MDUyMDA2bXVza2FuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI4YTAzNDc3N2MzYWQ0ZDliMzI1ZCIsInNjb3BlZEtleVNlY3JldCI6IjQ4Y2RhNzNmYWVhMjI0YjdlM2Y4OWFjM2JmYmNhZTdlZGI1NWNlMTdjM2U1ZTZkYTM5NjlkMDVkY2Q5ODk0ZWUiLCJleHAiOjE3NzExNzc2NTl9.NTOT8U3kUqW6IY6HHWxB34aSh_G7y80yPFoMHInnjfw',
    LIVEPEER_API_KEY: '4b3b8a69-906a-403b-bf6a-e648b7f5f948'
};

export default keys;