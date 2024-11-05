import { useContext, useEffect, useState } from "react"
import '../styles/feed.css'
import { Context } from "../context/context";
import '../styles/videoPlayer.css'
import { useQuery } from '@apollo/client';
import { GET_DATA } from "../graphql/queries";
import '../styles/feed.css'
import play from '../assets/play.svg'

const Feed = ()=>{
    const context = useContext(Context);
    const {setVideoData,videoData} = context;
    const [videoList , setVideoList] = useState([]);
    const [loadingFeed , setLoadingFeed] = useState('');
    const [errorFeed , setErrorFeed] =useState('');
    const [page , setPage] = useState(1);

    const handleVideoClick = (index)=>{
        setVideoData(videoList[index]);
    }

    const handlePage = ({no,sign})=>{
        if(!no){
            setPage(page=>page+sign);
            return;
        } 
        setPage(no);
    }

    const { loading, error, data } = useQuery(GET_DATA, {
        variables: { first: 10,skip:(page-1)*10 },
      });
    
      useEffect(()=>{
        if(loading) setLoadingFeed('Loading...');
        else setLoadingFeed('');
      },[loading]);

      useEffect(()=>{
        if(error) setErrorFeed('Some Error Occured');
        else setErrorFeed('');
      },[error]);

      useEffect(()=>{
        if(data && data.videoAddeds){
          let tempData = (data.videoAddeds).map(obj => {
            let metadata = JSON.parse(obj.metadata);
            let tempObj = {...obj , metadata};
            return tempObj
          });
          setVideoList(tempData);
        }
      },[data]);

    return(
        <div className="left-section glassmorphism">
            {loadingFeed && <div>{loading}</div>}
            {errorFeed && <div>{error}</div>}
            {
               videoList.map((video,index)=>(
                <div key={index} className="feed-card" style={{background:videoData?.cid === video?.cid?'#5fa4ff':'white',
                  color:videoData?.cid === video?.cid?'white':'black',
                }}>
                  <img src={play} alt="Play" onClick={()=>{handleVideoClick(index)}}/>
                  <div className="feed-title">{video.metadata.title}</div>
                </div>
               ))
            }
        </div>
    )
}
export default Feed