import mongoose from "mongoose";

const cartIteamSchema=mongoose.Schema({
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
},{timestamp:true,minimize:false});

const cartIteam=mongoose.model("CartIteam",cartIteamSchema);

export default cartIteam;

