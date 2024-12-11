import { useContext, useEffect, useState } from "react"
import '../styles/feed.css'
import '../styles/nft.css'
import '../styles/feed.css'
import '../styles/videoPlayer.css'
import { Context } from "../context/context";
import { useQuery } from '@apollo/client';
import { GET_DATA } from "../graphql/queries";
import play from '../assets/play.svg'
import left from '../assets/left.svg'
import right from '../assets/right.svg'
import Mint from "./mint"

const Feed = ()=>{
    const context = useContext(Context);
    const {setVideoData,videoData,accData} = context;
    const [videoList , setVideoList] = useState([]);
    const [loadingFeed , setLoadingFeed] = useState('');
    const [errorFeed , setErrorFeed] =useState('');
    const [page , setPage] = useState(1);
    const [toggle , setToggle] = useState(false);
    const [mint , setMint] = useState(null);

    const handleVideoClick = (index)=>{
        setVideoData(videoList[index]);
    }

    useEffect(()=>{
      console.log(videoList)
    },[videoList])

    const handlePage = ({no,sign})=>{
        if(!no){
            setPage(page=>page+sign);
            return;
        } 
        setPage(no);
    }

    const { loading, error, data , refetch } = useQuery(GET_DATA, {
        variables: { first: 10,skip:(page-1)*10 },
      });

      useEffect(() => {
        refetch({ first: 10, skip: (page - 1) * 10 });
      }, [page, refetch]);
    
      useEffect(()=>{
        if(loading) setLoadingFeed('Loading...');
        else setLoadingFeed('');
      },[loading]);

      useEffect(()=>{
        if(error) setErrorFeed('Some Error Occured');
        else setErrorFeed('');
      },[error]);

      useEffect(()=>{
        console.log(data)
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
        <>
        {mint && <Mint close={setMint} metadata={mint.metadata} cid={mint.cid}/>}
        <div className="left-section glassmorphism">
            <div className='toggle-btn-wrapper'>
                <div className='toggle-btn' onClick={()=>setToggle(false)}
                style={!toggle?{background:'#fff',color:'black'}:{background:'transparent',color:'#fff'}}>All Videos</div>
                <div className='toggle-btn' onClick={()=>setToggle(true)}
                style={toggle?{background:'#fff',color:'black'}:{background:'transparent',color:'#fff'}}>My Videos</div>
            </div>

            {loadingFeed && <div className="sys-msg">{loadingFeed}</div>}
            {errorFeed && <div className="sys-msg">{errorFeed}</div>}

            <div style={{height:'60vh' , overflow:'scroll'}}>
            <div style={{height:'max-content',gap:'20px',display:'flex' , flexDirection:'column'}}>
            {!toggle && 
               videoList.map((video,index)=>(
                <div key={index} className="feed-card" style={{background:videoData?.cid === video?.cid?'#5fa4ff':'white',
                  color:videoData?.cid === video?.cid?'white':'black'
                }}>
                  <img src={play} alt="Play" onClick={()=>{handleVideoClick(index)}}/>
                  <div className="feed-title">{video.metadata.title}</div>
                </div>
               ))
            }

            {
              toggle && 
              videoList.map((video,index)=>{
                  return(
                    video?.owner.toLowerCase()===accData?.address.toLowerCase() ? 
                    (<div key={index} className="feed-card" style={{background:videoData?.cid === video?.cid?'#5fa4ff':'white',
                      color:videoData?.cid === video?.cid?'white':'black', justifyContent:"space-between"
                    }}>
                      <div style={{display:'flex'}}>
                      <img src={play} alt="Play" onClick={()=>{handleVideoClick(index)}}/>
                      <div className="feed-title">{video.metadata.title}</div>
                      </div>
                      <div className="mint-box" onClick={()=>{setMint(video)}}>MINT</div>
                    </div>):"lawda"
                  )
              })
            }
            </div>
            </div>

            <div className="pagination-wrapper">
              <img src={left} alt="left" onClick={()=>handlePage(null , -1)}/>
              <img src={right} alt="right" onClick={()=>handlePage(null , 1)}/>
            </div>

        </div>
        </>
    )
}
export default Feed