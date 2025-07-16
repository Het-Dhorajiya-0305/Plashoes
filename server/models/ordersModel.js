import mongoose, { Schema } from "mongoose";

const orderSchema=mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    iteams:{
        type:Array,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"Order Placed"
    },
    paymentMethod:{
        type:String,
        required:true,
    },
    payment:{
        type:Boolean,
        required:true,
        default:false
    },
},{timestamps: true})

const OrderModel=mongoose.model("Orders",orderSchema);

export default OrderModel;