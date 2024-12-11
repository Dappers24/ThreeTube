import '../styles/profile.css'
import cross from '../assets/cross.svg'
import { useState } from 'react'
import { mintNFT } from '../apis/contracts';
import { pinata } from '../apis/pinata';
import { useContext } from "react"
import { Context } from "../context/context.jsx"

const Mint = ({close , metadata , cid})=>{

    const [price , setPrice] = useState('');
    const {accData} = useContext(Context);

    async function handleMint(){
        try {
            const videoData = {metadata , cid};
            const file = new File([JSON.stringify(videoData,null,2)], `videoData-${cid}.json`, {type:"application/json"});
            const response  = await pinata.upload.file(file);
            console.log(response);
            const tokenUri = `ipfs://${response.IpfsHash}`;
            const transaction = await mintNFT({tokenUri:tokenUri,metadata:JSON.stringify(metadata),price:BigInt(price),accData});
            if(!transaction) {
                alert('Video not Minted due to some Error');
                return;
            }
            alert('Video Minted');
            close(null)
        } catch (error) {
            console.log(error);
            alert('Video could not be minted');
            close(null);
        }
    }

    return(
        <div className="dialog-wrapper">
            <div className="glassmorphism dialog-box" 
            style={{color:'#fff',display:'flex',flexDirection:'column',justifyContent:'space-evenly',alignItems:'center'}}>
                <img src={cross} alt="" onClick={()=>{close(null)}}
                style={{position:'fixed', top:'10px' , right:'10px'}}/>
                <div style={{fontSize:'2rem',fontWeight:'bold'}}>{metadata.title}</div>
                <div style={{fontSize:'1.2rem',fontWeight:'bold'}}>{metadata.description}</div>
                <input style={{width:'100px'}} type="number" placeholder='in eth' onChange={(e)=>{setPrice(e.target.value)}}/>
                <button className="submit-btn" style={{borderRadius:'10px'}} onClick={handleMint}>MINT</button>
            </div>
        </div>
    )
}

export default Mint