<<<<<<< HEAD
import {useState, useEffect} from 'react';
import Web3 from 'web3';

function App() {
  
  const [balance , setBalance] = useState(null)
  const [isConnected, setIsConnected] = useState(false);
  
=======
import { useEffect, useContext} from 'react';
import Web3 from 'web3';
import Wallet from './components/wallet';
import { Context } from './context/context';
import Navbar from './components/navbar';

function App() {

  const context = useContext(Context)
  const {setAccData , isConnected , setIsConnected} = context
  
  useEffect(()=>{
    setIsConnected(true)
  },[])

>>>>>>> adc3b0d8cbf42e779b9e0618c14c59180db75e84
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
<<<<<<< HEAD

  useEffect(()=>{
    console.log(balance)
  },[balance])
=======
>>>>>>> adc3b0d8cbf42e779b9e0618c14c59180db75e84
  
  const onConnect = async() => {
    try {
      const currentProvider = detectCurrentProvider();
      if(currentProvider) {
        await currentProvider.request({method: 'eth_requestAccounts'});
        const web3 = new Web3(currentProvider);
        const userAccount  =await web3.eth.getAccounts();
<<<<<<< HEAD
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account);
        ethBalance = web3.utils.fromWei(ethBalance, 'ether'); 
        console.log(ethBalance)
        setBalance(ethBalance)
=======
        let ethAddress = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account);
        ethBalance = web3.utils.fromWei(ethBalance, 'ether'); 
        const data = {
          balance:ethBalance, address:ethAddress
        }
        setAccData(data)
>>>>>>> adc3b0d8cbf42e779b9e0618c14c59180db75e84
        setIsConnected(true);
      }
    } catch(err) {
      console.log(err);
    }
  }
  
  const onDisconnect = () => {
    setIsConnected(false);
  }
  
  
  
  return (
<<<<<<< HEAD
   <>
    <button onClick={onConnect}>Connect</button>
    {isConnected && 
=======
   <div className='page-wrapper'>
    {!isConnected?
    <Wallet onConnect={onConnect}/>:
    <>
    <Navbar/>
    </>}
    {/* {isConnected && 
>>>>>>> adc3b0d8cbf42e779b9e0618c14c59180db75e84
      <>
      <div>
        Account connected
      </div>
      <div>
        Balance : {balance}
      </div>
<<<<<<< HEAD
      </>
    }
   </>
=======
      <div>
        Wallet Address : {address.substring(0,4)+"***"+address.substring(address.length-3,address.length)}
      </div>
      </>
    } */}
   </div>
>>>>>>> adc3b0d8cbf42e779b9e0618c14c59180db75e84
  );
}

export default App;
