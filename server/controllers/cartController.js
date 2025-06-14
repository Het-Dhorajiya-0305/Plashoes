import Product from "../models/productModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import cartIteam from "../models/cartIteamModel.js";

const addToCart = asyncHandler(async (res, req) => {
    // const { proName, proSize} = req.body;

    console.log(req.body);  

    // if (!proName || !proSize || !proDetails) {
    //     res.status(400).json({
    //         success: false,
    //         message: "Please provide all required fields"
    //     })
    // }

    // const existingCartIteam = await cartIteam.find({ proName, proSize });

    // if (existingCartIteam) {
    //     existingCartIteam.proQuantity += 1;
    //     await cartIteam.save();
    //     return res.status(200).json({
    //         success: true,
    //         message: "Product quantity updated successfully",
    //         cartIteam: existingCartIteam
    //     })
    // }
    // else {
    //     const newCartIteam = new cartIteam.create({
    //         proName,
    //         proSize,
    //         proQuantity: 1,
    //         proDetails: proDetails
    //     })
    //     return res.status(200).json({
    //         success: true,
    //         message: "Product added to cart successfully",
    //         cartIteam: newCartIteam
    //     })
    // }
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
    const {cartId}=req.body;
    if(!cartId)
    {
        return res.status(400).json({
            success:false,
            message:"Please provide cart item id"
        })
    }

    const deletedIteam=await cartIteam.findByIdAndDelete({cartId});

    if(!deletedIteam) {
        return res.status(404).json({
            success: false,
            message: "Cart item not found"
        })
    }

    return res.status(200).json({
        success:true,
        message: "Cart item deleted successfully",
        deletedIteam: deletedIteam
    })
})
export { addToCart, getCartIteams,deleteCartIteam };