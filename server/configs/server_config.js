import dotenv from "dotenv";
import express from "express";

dotenv.config({path: '../.env'});

const keys = {
    PORT: 8000,
    DB: 'mongodb+srv://test_user:test_user@cluster0.5b3q3.mongodb.net/',
    NODE_ENV: 'development',
    PINATA_API_KEY: '7a20b0385d6729b7e0d2',
    PINATA_SECRET_API_KEY: '73188fab25d157bf93fad229c51f60140570f1551bd0bee1079e0fb72f078098',
    GATEWAY_URL: 'purple-tiny-lion-80.mypinata.cloud',
    PINATA_JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2NzY4YjY3ZC0wM2Q5LTRkYTAtODc1Yi00NWJjNzAyYzRiODAiLCJlbWFpbCI6Im9mZmljaWFsMDZzcmluam95QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI3YTIwYjAzODVkNjcyOWI3ZTBkMiIsInNjb3BlZEtleVNlY3JldCI6IjczMTg4ZmFiMjVkMTU3YmY5M2ZhZDIyOWM1MWY2MDE0MDU3MGYxNTUxYmQwYmVlMTA3OWUwZmI3MmYwNzgwOTgiLCJleHAiOjE3NzY1MzMxNTF9.V9epuz7Gcy8pgV3f8ur8VdWA6CUOm6cRzQA_cAsgX8w',
    LIVEPEER_API_KEY: '4b3b8a69-906a-403b-bf6a-e648b7f5f948'
};

export default keys;