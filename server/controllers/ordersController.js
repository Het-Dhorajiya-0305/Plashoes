import cartIteam from "../models/cartIteamModel.js";
import OrderModel from "../models/ordersModel.js";
import User from "../models/usermodel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY)

const currency='inr';


// place order for cash on delivery
const placeOrder = asyncHandler(async (req, res) => {

    const { iteams, amount, address } = req.body;
    const userId = req.userId;

    if (!userId) {
        return res.status(404).json({
            success: false,
            message: "unathorized user"
        })
    }

    if (!iteams || !amount || !address) {
        return res.status(404).json({
            success: false,
            message: "please provide address,amount,iteams"
        })
    }

    const newOrder = await OrderModel.create({
        userId,
        iteams,
        address,
        amount,
        paymentMethod: "COD",
        payment: false
    })
    if (!newOrder) {
        return res.status(404).json({
            success: false,
            message: "new order does not created"
        })
    }

    const updatedUser = await User.findByIdAndUpdate(userId, {
        $set: {
            cartData: {}
        }
    })

    if (!updatedUser) {
        return res.status(404).json({
            success: false,
            message: "user does not updated"
        })
    }

    const updatedCart=await cartIteam.deleteMany({'userId': userId})

    if(!updatedCart)
    {
        return res.status(404).json({
            success: false,
            message: "cart does not deleted"
        })
    }

    return res.status(200).json({
        success: true,
        message: "order successfully placed",
        newOrder
    })
})

// place order for stripe

const placeOrderStripe = asyncHandler(async (req, res) => {

     const { iteams, amount, address } = req.body;
    const userId = req.userId;
    const {origin}=req.headers;


    if (!userId) {
        return res.status(404).json({
            success: false,
            message: "unathorized user"
        })
    }

    if (!iteams || !amount || !address) {
        return res.status(404).json({
            success: false,
            message: "please provide address,amount,iteams"
        })
    }

    const newOrder = await OrderModel.create({
        userId,
        iteams,
        address,
        amount,
        paymentMethod: "Stripe",
        payment: false
    })

    // console.log("items",iteams)

    const line_items=iteams.map((item)=>({
        price_data:{
            currency:currency,
            product_data:{
                name:item.proName
            },
            unit_amount: Math.round((item.proPrice + (item.proPrice * 0.05)) * 100)
        },
        quantity:item.quantity
    }))

    line_items.push({
        price_data:{
            currency:currency,
            product_data:{
                name:'delivery charge'
            },
            unit_amount:10*100
        },
        quantity:1
    })


    const session=await stripe.checkout.sessions.create({
        success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode:'payment'
    })

    if(!session)
    {
        return res.status(404).json({
            success:false,
            message:"error in payment method"
        })
    }

    return res.status(200).json({
        success:true,
        session_url:session.url
    })
})

// verify for stripe

const verifyStripe=asyncHandler(async (req,res) => {
    const {orderId,success}=req.body
    const userId=req.userId;

    if(success==='true')
    {
        const updatedUser=await User.findByIdAndUpdate(userId,{
            $set:{
                cartData:{}
            }
        })

        const updatedOrder=await OrderModel.findByIdAndUpdate(orderId,{
            $set:{
                payment:true
            }
        })
        if(!updatedOrder || !updatedUser)
        {
            return res.status(404).json({
                success:false,
                message:"error in updating user or order"
            })
        }
        return res.status(200).json({
            success:true,
            message:"all done"
        })
    }
    else
    {
        const deletedOrder=await OrderModel.findByIdAndDelete(orderId)
        if(!deletedOrder)
        {
            return res.status(404).json({
                success:false,
                message:"order does not delete"
            })
        }
        return res.status(200).json({
            success:false,
            message:"order deleted successfully"
        })
    }
})

// order for admin

const adminOrders = asyncHandler(async (req, res) => {
    const admorders = await OrderModel.find({});

    if (!admorders) {
        return res.status(404).json({
            success: false,
            message: "error in fetching data from data base"
        })
    }

    return res.status(200).json({
        success: true,
        message: "orders fetched",
        orders: admorders
    })
})

// order for user

const userOrders = asyncHandler(async (req, res) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(404).json({
            success: false,
            message: "unathorized user"
        })
    }

    const usrOrders = await OrderModel.find({
        userId: userId
    })

    return res.status(200).json({
        success: true,
        message: "data successfully fetched",
        order: usrOrders
    })
})

// update delivery status

const updateStatus = asyncHandler(async (req, res) => {
    const { orderId,newStatus } =req.body;

    console.lof

    if(!orderId || !newStatus)
    {
        return res.status(404).json({
            success:false,
            message:"please provide all data"
        })
    }

    const updatedOrder=await OrderModel.findByIdAndUpdate(orderId,{
        $set:{
            status:newStatus
        }
    })

    console.log("updated order ",updatedOrder);

    if(!updatedOrder)
    {
        return res.status(404).json({
            success:false,
            message:"order does not updated"
        })
    }

    return res.status(200).json({
        success:true,
        message:"status changed !!"
    })

})

const deleteAllOrders=asyncHandler(async (req,res) => {
    const deletedOrders=await OrderModel.deleteMany({})
    if(!deletedOrders)
    {
        return res.status(404).json({
            success:false,
            message:"error in deleting orders"
        })
    }
    return res.status(200).json({
        success:true,
        message:"all orders deleted successfully"
    })
})

export { placeOrder, placeOrderStripe, adminOrders, userOrders, updateStatus,verifyStripe,deleteAllOrders }