import { backendUrl } from "./constants"
import axios from 'axios'

export const Upload = async(formData)=>{
    try {
        const response = await axios.post(`${backendUrl}/upload`,formData,{headers:{'Content-Type':"multipart/form-data"}});
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error)
        return false
    }
}