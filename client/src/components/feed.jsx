import { useContext, useState } from "react"
import '../styles/feed.css'
import { Context } from "../context/context";
import '../styles/videoPlayer.css'

const Feed = ()=>{
    //graphQL query to get the videos ipfsHash and metadata. 
    //We will use pagination to get a certain  number of videosData at a time.
    //The videos data will be stored in the videoList state 
    //on clicking on a video, the video data is set to VideoData
    const context = useContext(Context);
    const {videoList , setVideoList , setVideoData} = context;
    const [page , setPage] = useState(0);

    const handleVideoClick = (index)=>{
        setVideoData(videoList[index]);
    }

    return(
        <div className="left-section glassmorphism">
        </div>
    )
}
export default Feed