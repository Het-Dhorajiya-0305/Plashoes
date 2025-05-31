import mongoose from "mongoose";

const buyIteamSchema=mongoose.Schema({
    proName:{
        type:String,
        required:true,
    },
    proPrice:{
        type:Number,
        required:true
    },
    proIteams:{
        type:Number,
        require:true
    }
})