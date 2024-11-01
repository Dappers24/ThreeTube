import { useContext } from "react"
import { Context } from "../context/context.jsx"
import '../styles/profile.css'
import cross from '../assets/cross.svg'

const AccInfo = ({close})=>{
    const {accData} = useContext(Context)
    return(
        <div className="dialog-wrapper">
            <div className="glassmorphism dialog-box">
                <img src={cross} alt="" onClick={()=>{close(false)}}
                style={{position:'fixed', top:'10px' , right:'10px'}}/>
                <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
                    <p className="dialog-text">Address <br/> 
                    <span>{accData.address.substring(0,4)+"***"+accData.address.substring(accData.address.length-3,accData.address.length)}</span>
                    </p>
                    <p className="dialog-text">Balance <br/> 
                    <span>{accData.balance}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AccInfo