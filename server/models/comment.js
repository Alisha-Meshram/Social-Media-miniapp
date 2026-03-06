import { timeStamp } from "console";
import mongoose from "mongoose";

const commentSchema=mongoose.Schema({
    text:{type:String,required:true},
    post:{type:mongoose.Schema.Types.ObjectId,ref:"Post"},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
},
{timestamps:true}
)

export const Comment =mongoose.model('Comment',commentSchema)