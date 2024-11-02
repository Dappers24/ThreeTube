import { useEffect, useContext} from 'react';
import Web3 from 'web3';
import Wallet from './components/wallet';
import { Context } from './context/context';
import Navbar from './components/navbar';

function App() {

  const context = useContext(Context)
  const {setAccData , isConnected , setIsConnected} = context


  // useEffect(()=>{
  //   setIsConnected(true)
  // },[])

  useEffect(()=>{
    console.log(isConnected)
  },[])

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
    console.log('error')
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
      
    </div>
    </>}
   </div>
  );
}

export default App;