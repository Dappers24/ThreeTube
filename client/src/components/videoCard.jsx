import { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../context/context"
// import Hls from 'hls.js'
import '../styles/videoPlayer.css'
import VideoPlayer from "./videoPlayer"
import like from '../assets/like.svg'

const VideoCard = ()=>{
    const context = useContext(Context);
    const {videoData} = context;
    const playerRef = useRef(null);

    const videoPlayerOptions = {
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
          {
            src: `https://gateway.pinata.cloud/ipfs/${videoData.IpfsHash}/playlist.m3u8`,
            type: "application/x-mpegURL"
          }
        ]
      }
      const handlePlayerReady = (player) => {
        playerRef.current = player;
    
        player.on("waiting", () => {
          videojs.log("player is waiting");
        });
    
        player.on("dispose", () => {
          videojs.log("player will dispose");
        });
      };

    return(
        <div>
        {videoData? 
        <>
        <VideoPlayer options={videoPlayerOptions} onReady={handlePlayerReady}/>
        <div className="video-details">
            <div className="video-metadata">
            <div className="video-title">{videoData.title}</div><div className="video-tags">
                {
                   ( videoData.tags.split(',')).map((tag)=>{
                    return(
                        <span className="tags">{tag}</span>
                    )
                   })
                }
            </div>
            <div className="video-desc">{videoData.description}</div>
            </div>

            <div>
                <img src={like} alt="Like"/>
            </div>
        </div>
        </>:<div>Select a Video to Play it!</div>
        }
        </div>
    )
}

export default VideoCard