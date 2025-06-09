import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    proName:{
        type:String,
        required:true,
        unique:true,
    },
    proPrice:{
        type:Number,
        required:true,
    },
    proDescription:{
        type:String,
        required:true,
    },
    proGender:{
        type:String,
        required:true,
    },
    proSize:{
        type:Array,
        required:true,
    },
    proImg:{
        type:String,
        required:true,
    }

},{timestamps:true });

const Product=mongoose.model("product",productSchema);

export default Product;