import { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../context/context"
import Hls from 'hls.js'

const VideoCard = ()=>{
    const context = useContext(Context);
    const {videoData} = context;
    const [url , setUrl] = useState(null);
    const videoRef = useRef(null);

    useEffect(()=>{
        const fetchFromPinata = () => {
            const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${videoData.ipfsHash}/playlist.m3u8`; 
            setUrl(ipfsUrl);
            if(url && Hls.isSupported() && videoRef.current){
                const hls = new Hls();
                hls.loadSource(url);
                hls.attachMedia(videoRef);
                hls.on(Hls.Events.MANIFEST_PARSED , ()=>{
                    videoRef.current?.play();
            })
            return()=>{
                hls.destroy();
            }
        }}
        if(videoData && videoData.ipfsHash) fetchFromPinata();
    },[videoData,url])

    return(
        <>
        {url? 
        <video ref={videoRef} controls width="100%" />:
        (videoData?<div>Loading Video...</div>:
            <div>Select a Video to Play it!</div>
        )}
        </>
    )
}

export default VideoCard