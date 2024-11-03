import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
    {
        videoCid:{
            type:String,
            required:true
        },
        userAddress:{
            type:String,
            required:true
        }
    },{
        timestamps:true
    }
)

export const Like = mongoose.model("Like" , likeSchema);