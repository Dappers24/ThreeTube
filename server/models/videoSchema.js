import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        videoCid:{
            type:String,
            required:true
        },
        likesCount:{
            type:Number,
            default:0
        },
        viewsCount:{
            type:Number,
            default:0
        }
    },{
        timestamps:true
    }
)

export const Video = mongoose.model("Video" , videoSchema);