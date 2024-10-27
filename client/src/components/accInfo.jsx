import { useContext } from "react"
import { Context } from "../context/context.jsx"
import '../styles/profile.css'

const AccInfo = ({close})=>{
    const {accData} = useContext(Context)
    return(
        <div className="dialog-wrapper">
            <div className="glassmorphism dialog-box">

            </div>
        </div>
    )
}

export default AccInfo