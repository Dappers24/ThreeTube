import metamask from '../assets/metamask.png'

const Wallet=({onConnect})=>{
    return(
        <>
         <div className='glassmorphism connect-wrapper'
        style={{display:'flex',justifyContent:'center',flexDirection:'column' , alignItems:'center'}}>
        <img src={metamask} alt='' />
        <button className='connect-btn' onClick={onConnect}>Connect to Metamask</button>
        </div>
        </>
    )
}

export default Wallet