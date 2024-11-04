import mongoose from "mongoose";

const viewSchema = new mongoose.Schema(
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

export const View = mongoose.model("View" , viewSchema);