import { createContext, useState } from "react";

export const Context = createContext()
export const ContextProvider = ({children})=>{
    const [videoCid , setVideoCid] = useState(null);
    const [isConnected , setIsConnected] = useState(false);
    const [accData , setAccData] = useState({})
    
    return (
        <Context.Provider value={{videoCid , setAccData , accData , setIsConnected , isConnected , setVideoCid}}>
            {children}
        </Context.Provider>
    )
}