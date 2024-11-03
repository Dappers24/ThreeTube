import { useState } from "react"
import { Upload } from "../apis/videos";
import '../styles/profile.css'
import '../styles/upload.css'
import cross from '../assets/cross.svg'

const AddVideo = ({close})=>{

    const [title , setTitle] = useState('');
    const [description , setDescription] = useState('');
    const [tags , setTags] = useState('');
    const [video , setVideo] = useState('');

    async function uploadVideo() {
        const formData = new FormData();
        formData.append('title',title);
        formData.append('description' , description);
        formData.append("tags", tags);
        formData.append("video", video);
        const response = await Upload(formData);
        if(!response) {
            alert('Video not Posted due to some Error');
            return;
        }
        //reposne consists of ipfsHash and the metadata of the video. Now this data is added to the blockchain by GraphQL
        alert('Video Successfully Posted');
        close(false);
    }

    function handleVideoChange(e){
        const file = e.target.files[0];
        if(!file || file.type!=="video/mp4"){
            alert('You can only upload MP4 format files');
            e.target.value = null;
            return;
        }
        setVideo(file)
    }

    return(
        <>
        <div className="dialog-wrapper">
        <div className="glassmorphism dialog-box">
        <img src={cross} alt="" onClick={()=>{close(false)}}
        style={{position:'fixed', top:'10px' , right:'10px'}}/>

        <form className="upload-form"
        onSubmit={(e)=>{
            e.preventDefault();
            uploadVideo();
        }}>
            
            <input type="text" name="title" placeholder="Enter the title" onChange={(e)=>{setTitle(e.target.value)}} required/>
            <input type="text" name="description" placeholder="Enter the description" onChange={(e)=>{setDescription(e.target.value)}} required/>
            <input type="text" name="tags" placeholder="Enter the tags separated by comma(,)" onChange={(e)=>{setTags(e.target.value)}} required/>
            <label htmlFor="video" style={{color:'white'}}>
            Add Video here
            </label>
            <input className="video-upload" type="file" accept="video/mp4" name="video" onChange={(e)=>{handleVideoChange(e)}} required/>
            <input className="submit-btn" type="submit" value='Upload'/>
        </form>
        </div>
        </div>
        </>
    )
}

export default AddVideo