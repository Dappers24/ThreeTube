import { useContext,useEffect,useState } from 'react';
import Web3 from 'web3';
import Wallet from './components/wallet';
import { Context } from './context/context';
import Navbar from './components/navbar';
import VideoCard from './components/videoCard';
import Feed from './components/feed';
import { LivepeerBroadcast } from './components/livepeerbroadcast';
import { DemoPlayer } from './components/playbackinfo';


function App() {

  const context = useContext(Context)
  const {setAccData , isConnected , setIsConnected} = context
  const [stream, setStream] = useState(false);
  const [watch , setWatch] = useState(false);

  useEffect(() => {
    console.log(stream)
  },[stream])

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      alert("Window does not support MEtamask")
    }
    return provider;
  };
  
  const onConnect = async() => {
    try {
      const currentProvider = detectCurrentProvider();
      if(currentProvider) {
        await currentProvider.request({method: 'eth_requestAccounts'});
        const web3 = new Web3(currentProvider);
        const userAccount  =await web3.eth.getAccounts();
        let ethAddress = userAccount[0];
        let ethBalance = await web3.eth.getBalance(ethAddress);
        ethBalance = web3.utils.fromWei(ethBalance, 'ether'); 
        const data = {
          balance:ethBalance, address:ethAddress
        }
        setAccData(data)
        setIsConnected(true);
      }
    } catch(err) {
      console.log(err);
    }
  }
  
  return (
   <div className='page-wrapper'>
    {!isConnected?
    <Wallet onConnect={onConnect}/>:
    <>
    <Navbar/>
    <div className='section-wrapper'>
      <VideoCard/>
      <Feed/>
      <div style={{position:'fixed', zIndex:"100"}}>
        <button style={{color:"white",backgroundColor:'black',position:"fixed", bottom:"20px", right:"20px"}} 
        onClick={()=>{
          console.log("clicked")
          setStream((prevstream)=>setStream(!prevstream))}}>
            {stream?"End the stream":"Start a Stream"}</button>
        {
          stream && 
          <div style={{width:'60vw' , display:'flex' , justifyContent:'center', alignItems:'center'}}>
            <LivepeerBroadcast/>
            </div>
        }        
      </div>


      <div style={{position:'fixed', zIndex:"200"}}>
        <button style={{color:"white",backgroundColor:'black',position:"fixed", bottom:"20px", left:"20px"}} 
        onClick={()=>{setWatch(prevWatch=>setWatch(!prevWatch))}}>{watch?"Not Watch the stream":"Watch a Stream"}</button>
        {
          watch && 
          <div style={{width:'60vw' , display:'flex' , justifyContent:'center', alignItems:'center'}}>
            <DemoPlayer/>
            </div>
        } 
      </div>
    </div>
    </>}
   </div>
  );
}

export default App;