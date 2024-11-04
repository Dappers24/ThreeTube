import { useContext, useEffect, useRef, useState , useMemo , useCallback} from "react"
import { Context } from "../context/context"
// import Hls from 'hls.js'
import '../styles/videoPlayer.css'
import VideoPlayer from "./videoPlayer"
import like from '../assets/like.svg'
import views from '../assets/views.svg'
import { SocketContext } from "../context/socket"
import io from 'socket.io-client'
import { backendUrl } from "../apis/constants"

const VideoCard = ()=>{
    const context = useContext(Context);
    const {videoData , accData} = context;
    const socketContext = useContext(SocketContext);
    const {socketId , setSocketId} = socketContext;
    const playerRef = useRef(null);
    const [likesCount , setLikesCount] = useState(0);
    const [viewsCount , setViewsCount] = useState(0);
    const [systemMsg , setSystemMsg] = useState('');
    const firstLoad = useRef(true)

    useEffect(()=>{
      console.log(videoData)
    },[videoData])

    useEffect(()=>{
      console.log(`likes:${likesCount}`)
    },[likesCount])

    function socketInit(){
      try {
        const newSocket = io(backendUrl);
        setSocketId(newSocket);
        newSocket.on('connect',()=>{
          newSocket.emit('view', {videoCid:videoData.cid, userAddress:accData.address});
        })

        newSocket.on('system-msg', (data) => {
          setSystemMsg(data.msg);
          if(data.likesCount!==null) setLikesCount(data.likesCount);
          if(data.viewsCount!==null) setViewsCount(data.viewsCount);
      });

      return () => {
        newSocket.off('system-msg');
      };
      } catch (error) {
        console.log('connection failed!')
        console.log(error)
      }
    }

    useEffect(()=>{
      if(videoData && !firstLoad.current) socketInit();
      if(firstLoad.current){
        console.log(firstLoad.current)
         firstLoad.current=false;
        }
    },[videoData])

    const handleLike=()=>{
      socketId.emit('like', {videoCid:videoData.cid, userAddress:accData.address});
    }

    const videoPlayerOptions = useMemo(()=>({
      controls: true,
      responsive: true,
      fluid: true,
      sources: [
        {
          src: `https://gateway.pinata.cloud/ipfs/${videoData?.cid}/playlist.m3u8`,
          type: "application/x-mpegURL"
        }
      ]
    }), [videoData]);

      
    const handlePlayerReady = useCallback((player) => {
      playerRef.current = player;

      player.on("waiting", () => {
        videojs.log("player is waiting");
      });

      player.on("dispose", () => {
        videojs.log("player will dispose");
      });
    }, []);

    return(
        <div>
        {videoData? 
        <>
        <div className="system-msg">{systemMsg}</div>
        <VideoPlayer options={videoPlayerOptions} onReady={handlePlayerReady}/>
        <div className="video-details">
            <div className="video-metadata">
            <div className="video-title">{videoData.metadata.title}</div>
            <div className="video-tags">
                {
                   ( videoData.metadata.tags.split(',')).map((tag)=>{
                    return(
                        <span className="tags">{tag}</span>
                    )
                   })
                }
            </div>
            <div className="video-desc">{videoData.metadata.description}</div>
            </div>

            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            {likesCount}<img src={like} alt="Likes" style={{width:'30px',}} onClick={handleLike}/>
            {viewsCount}<img src={views} alt="Views" style={{width:'30px'}}/>
            </div>
        </div>
        </>:<div style={{width:'65vw',color:'#fff',fontSize:'2rem',fontWeight:'bold',textAlign:'center',marginTop:'30%'}}>Select a Video to Play it!</div>
        }
        </div>
    )
}

export default VideoCard