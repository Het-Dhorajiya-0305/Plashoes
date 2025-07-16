import mongoose, { Schema } from "mongoose";

const cartIteamSchema=mongoose.Schema({
    userId:{
      type:Schema.Types.ObjectId,
      ref:"User"
    },
    proName:{
        type:String,
        required:true,
    },
    proQuantity:{
        type:Number,  
        require:true
    },
    proSize:{
        type:String,
        required:true
    },
    proDetails:{
        type:Object,    
        required:true,
        default:{}
    }
},{timestamps: true});

const cartIteam=mongoose.model("CartIteam",cartIteamSchema);

export default cartIteam;

