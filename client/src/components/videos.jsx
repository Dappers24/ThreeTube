import { Livepeer } from "livepeer";
// import { useEffect, useState } from "react";

const apiKey = '4b3b8a69-906a-403b-bf6a-e648b7f5f948';

const livepeer = new Livepeer({apiKey});

const streamData = {
  name: "test_stream"
};

livepeer
  .stream.create(streamData)
  .then((response) => {
    console.log("Stream created:", response);
  })
  .catch((error) => {
    console.error("Error creating stream:", error);
  });