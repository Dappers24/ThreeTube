import { useQuery } from '@apollo/client';
// import { GET_NFT } from '../graphql/queries';
import { useContext, useEffect, useState } from 'react';
import cross from '../assets/cross.svg'
import buy from '../assets/buy.svg'
import { Context } from '../context/context';
import { buyNFT } from '../apis/contracts';
import '../styles/nft.css'

const NFTs = ({close})=>{

    const context = useContext(Context);
    const {nftList , setNftList} = context;
    const [toggle , setToggle] = useState(false);

    //presently commented out code to be used after deploying again on subgraphs
    // const { loading, error, data } = useQuery(GET_NFT);
    // const [loadingFeed , setLoadingFeed] = useState('');
    // const [errorFeed , setErrorFeed] =useState('');

    useEffect(()=>{
        const list = [
            {metadata:{title:'Demo'} , price:'200', tokenId:1}
        ]
        setNftList(list) //demo for testing
    },[])

    // useEffect(()=>{
    //     if(loading) setLoadingFeed('Loading...');
    //     else setLoadingFeed('');
    //   },[loading]);

    //   useEffect(()=>{
    //     if(error) setErrorFeed('Some Error Occured');
    //     else setErrorFeed('');
    //   },[error]);

    //   useEffect(()=>{
    //     if(data && data.nftAddeds){
    //         let tempData = (data.videoAddeds).map(obj => {
    //             let metadata = JSON.parse(obj.metadata);
    //             let tempObj = {...obj , metadata};
    //             return tempObj
    //           });
    //           setNftList(tempData);
    //     }
    //   },[data])

    async function buyNft(nft) {
        const tokenId = nft.tokenId;
        const transaction = await buyNFT({tokenId:tokenId});
        if(!transaction){
            alert('Purchase not Successful');
            return;
        }
        alert('Purchase Successful')
    }

    return(
        <div className = "dialog-wrapper">
            <div className="glassmorphism dialog-box" style={{height:'70vh',width:'40vw'}}>
                <img src={cross} alt="" onClick={()=>{close(false)}}
                style={{position:'fixed', top:'10px' , right:'10px'}}/>
                {/* {loadingFeed && <div>{loading}</div>}
                {errorFeed && <div>{error}</div>} */}
                <div className='toggle-btn-wrapper'>
                <div className='toggle-btn' onClick={()=>setToggle(false)}
                style={!toggle?{background:'#fff',color:'black'}:{background:'transparent',color:'#fff'}}>All NFT's</div>
                <div className='toggle-btn' onClick={()=>setToggle(true)}
                style={toggle?{background:'#fff',color:'black'}:{background:'transparent',color:'#fff'}}>My NFT's</div>
                </div>
                { !toggle &&
                    nftList.map((nft)=>{
                        return(
                            <>
                            <div className='nft-list-box'>
                               <p style={{fontSize:'1.2rem'}}>{nft.metadata.title}</p> 
                               <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                               <img src={buy} alt='' onClick={async ()=>{
                                const response = prompt('You want to purchase? Enter Y to continue')
                                if(response !== 'Y') return;
                                buyNft(nft) 
                               }}/>
                               {nft.price}eth
                               </div>
                            </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default NFTs