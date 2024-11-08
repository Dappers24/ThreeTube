import { useState } from "react"
import '../styles/navbar.css'
import add from '../assets/add.svg'
import acc from '../assets/profile.svg'
import AccInfo from "./accInfo.jsx"
import AddVideo from "./addVideo.jsx"
// import AddVideo from './addVideo.jsx'

const Navbar = ()=>{
    const [profile , openProfile] = useState(false)
    const [addVideo , openAddVideo] = useState(false)

    return(
        <>
        {profile && <AccInfo close={openProfile}/>}
        {addVideo && <AddVideo close={openAddVideo}/>}
        {/* <AddVideo close={openAddVideo}/> */}
        <div className="glassmorphism navbar" style={{display:'flex' , justifyContent:'space-between' , alignItems:'center'}}>
            <div className="navbar-header">THREE-TUBE</div>
            <div style={{display:'flex',gap:'20px'}}>
                <img src={add} alt="" onClick={()=>{openAddVideo(true)}}/>
                <img src={acc} alt="" onClick={()=>{openProfile(true)}}/>
            </div>
        </div>
        </>
    )
}

export default Navbar