import { createContext, useState } from "react";

export const Context = createContext()
export const ContextProvider = ({children})=>{
    const [videoCid , setVideoCid] = useState(null);
    const [isConnected , setIsConnected] = useState(false);
    const [accData , setAccData] = useState({address:'#07h834Cuh9u89329' , balance:'100000eth'})
    
    return (
        <Context.Provider value={{videoCid , setAccData , accData , setIsConnected , isConnected , setVideoCid}}>
            {children}
        </Context.Provider>
    )
}