import { createContext, useState } from "react";

export const Context = createContext()
export const ContextProvider = ({children})=>{
    const [videoData , setVideoData] = useState(null);
    const [videosList , setVideosList] = useState([]);
    const [isConnected , setIsConnected] = useState(false);
    const [accData , setAccData] = useState({address:'#07h834Cuh9u89329' , balance:'100000eth'})
    
    return (
        <Context.Provider value={{videoData , setAccData , accData , setIsConnected , 
        isConnected , setVideoData , videosList , setVideosList}}>
            {children}
        </Context.Provider>
    )
}