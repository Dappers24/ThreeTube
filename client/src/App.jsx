import {useState, useEffect} from 'react';
import Web3 from 'web3';

function App() {
  
  const [balance , setBalance] = useState(null)
  const [isConnected, setIsConnected] = useState(false);
  
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

  useEffect(()=>{
    console.log(balance)
  },[balance])
  
  const onConnect = async() => {
    try {
      const currentProvider = detectCurrentProvider();
      if(currentProvider) {
        await currentProvider.request({method: 'eth_requestAccounts'});
        const web3 = new Web3(currentProvider);
        const userAccount  =await web3.eth.getAccounts();
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account);
        ethBalance = web3.utils.fromWei(ethBalance, 'ether'); 
        console.log(ethBalance)
        setBalance(ethBalance)
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
   <>
    <button onClick={onConnect}>Connect</button>
    {isConnected && 
      <>
      <div>
        Account connected
      </div>
      <div>
        Balance : {balance}
      </div>
      </>
    }
   </>
  );
}

export default App;
