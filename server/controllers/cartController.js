import { asyncHandler } from "../utils/asyncHandler.js";
import cartIteam from "../models/cartIteamModel.js";
import User from "../models/usermodel.js";
import mongoose from "mongoose";

const addToCart = asyncHandler(async (req, res) => {
    const { proName, size, proDetails } = req.body;
    const user_id = req.userId
    const user = await User.findById(user_id);

    let cartData = await user.cartData;

    if (!proName || !size || !proDetails) {
        res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        })
    }

    const existingCartIteam = await cartIteam.findOne({
        $and: [
            {userId: user_id},
            { proName },
            { proSize: size}
        ]

    });
    if (existingCartIteam) {
        existingCartIteam.proQuantity += 1;
        await existingCartIteam.save();
        if (cartData[existingCartIteam._id]) {
            if (cartData[existingCartIteam._id][size]) {
                cartData[existingCartIteam._id][size] += 1;
            }
            else {
                cartData[existingCartIteam._id][size] = 1;
            }
        }
        else {
            cartData[existingCartIteam._id] = {};
            cartData[existingCartIteam._id][size] = 1;
        }
    }
    else {
        const newCartIteam = await cartIteam.create({
            userId: user._id,
            proName,
            proSize: size,
            proQuantity: 1,
            proDetails: proDetails
        })
        cartData[newCartIteam._id] = {};
        cartData[newCartIteam._id][size] = 1;
    }
    // Update user's cart data



    await User.findByIdAndUpdate(user_id,
        {
            $set: { cartData: cartData }
        },
        { new: true }
    );


    return res.status(200).json({
        success: true,
        message: "Product successfully added to cart",
        user: user
    })
})

const getUserCart = asyncHandler(async (req, res) => {

    const id = req.userId;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "please login to see your cart"
        })
    }
    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "user not found"
        })
    }

    let cartData = await user.cartData;

    if (!cartData || Object.keys(cartData).length === 0) {
        return res.status(200).json({
            success: true,
            message: "No items in cart",
            cartData: []
        })
    }
    let userCart = [];

    const orders=await cartIteam.find({'userId': id});

    if (!orders || orders.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No items in cart",
            cartData: []
        })
    }

    orders.map((order)=>{
        const obj={
             "_id": order._id,
            "user_id": order.userId,
            "product": order.proDetails,
            "size": order.proSize,
            "quantity": order.proQuantity
        }   
        userCart.push(obj);
    })

    return res.status(200).json({
        success: true,
        message: "User cart retrieved successfully",
        cartData: userCart
    })

})

const getCartIteams = asyncHandler(async (req, res) => {
    const cartiteams = await cartIteam.find({});
    if (!cartiteams) {
        return res.status(404).json({
            success: false,
            message: "No cart items found"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Cart items retrieved successfully",
        cartIteams: cartiteams
    })
})

const deleteCartIteam = asyncHandler(async (req, res) => {

    const { cartId } = req.body;

    const newUserId = req.userId

    const newCartId = new mongoose.Types.ObjectId(cartId)

    if (!newCartId && !newUserId) {
        return res.status(400).json({
            success: false,
            message: "Please provide cart item id and user id"
        })
    }

    const deletedIteam = await cartIteam.findByIdAndDelete(newCartId);

    if (!deletedIteam) {
        return res.status(404).json({
            success: false,
            message: "Cart item not found"
        })
    }

    const user = await User.findById(newUserId);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "user does not exist"
        })
    }

    let cartData = user.cartData;

    let newCartData = {};

    for (const [key, value] of Object.entries(cartData)) {
        if (key != cartId) {
            newCartData[key] = {};
            newCartData[key] = value;
        }
    }

    const updatedUser = await User.findByIdAndUpdate(newUserId, {
        $set: {
            cartData: newCartData
        }
    },
        { new: true }
    )

    if (!updatedUser) {
        return res.status(404).json({
            success: false,
            message: "error in updating user"

        })
    }

    return res.status(200).json({
        success: true,
        message: "Cart item deleted successfully",
        deletedIteam: deletedIteam,
        updatedUser: updatedUser
    })
})

const updateCartQuantity = asyncHandler(async (req, res) => {

    const { orderId, quantity } = req.body;
    const userId = req.userId;

    const newOrderId = new mongoose.Types.ObjectId(orderId)

    if (!orderId || !userId) {
        return res.status(400).json({
            success: false,
            message: "orderId or user id does not exist!!"
        })
    }

    const updatedOrder = await cartIteam.findByIdAndUpdate(newOrderId, {
        $set: {
            proQuantity: Number(quantity)
        }
    });

    if (!updatedOrder) {
        return res.status(400).json({
            success: false,
            message: "order does not exist!!"
        })
    }

    const user = await User.findById(userId);

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "user does not exist!!"
        })
    }

    let cartData = user.cartData;

    for (const [key, val] of Object.entries(cartData)) {
        if (key == updatedOrder._id) {
            cartData[key][updatedOrder.proSize] = quantity;
        }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, {
        $set: {
            cartData: cartData
        }
    }, { new: true })

    if (!updatedUser) {
        return res.status(404).json({
            success: false,
            message: "error in updating user while updating quantity"
        })
    }

    return res.status(200).json({
        success: true,
        message: "quantity updated successfully !!",
        updatedOrder,
        updatedUser
    })


})

export { addToCart, getCartIteams, deleteCartIteam, getUserCart, updateCartQuantity };