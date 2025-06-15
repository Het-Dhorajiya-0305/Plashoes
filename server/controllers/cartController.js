
import { asyncHandler } from "../utils/asyncHandler.js";
import cartIteam from "../models/cartIteamModel.js";

const addToCart = asyncHandler(async (req, res) => {
    const { proName, proSize, proDetails } = req.body;

    try {
        proSize = JSON.parse(proSize); // Convert stringified array back to array
        proDetails = JSON.parse(proDetails); // Convert stringified object back to object
    } catch (error) {
        console.log("Error parsing proSize or proDetails:", error.message);
        return res.status(400).json({
            success: false,
            message: "Invalid format for proSize or proDetails",
        });
    }

    if (!proName || !proSize || !proDetails) {
        res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        })
    }

    proSize.map( async (size) => {
        const existingCartIteam = await cartIteam.findOne({ proName, proSize: size });

        if (existingCartIteam) {
            existingCartIteam.proQuantity += 1;
            await existingCartIteam.save();
            return res.status(200).json({
                success: true,
                message: "Product quantity updated successfully",
                cartIteam: existingCartIteam
            })
        }
        else {
            const newCartIteam = await cartIteam.create({
                proName,
                proSize:size,
                proQuantity: 1,
                proDetails: proDetails
            })
            return res.status(200).json({
                success: true,
                message: "Product added to cart successfully",
                cartIteam: newCartIteam
            })
        }
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
    if (!cartId) {
        return res.status(400).json({
            success: false,
            message: "Please provide cart item id"
        })
    }

    const deletedIteam = await cartIteam.findByIdAndDelete({ cartId });

    if (!deletedIteam) {
        return res.status(404).json({
            success: false,
            message: "Cart item not found"
        })
    }

    return res.status(200).json({
        success: true,
        message: "Cart item deleted successfully",
        deletedIteam: deletedIteam
    })
})
export { addToCart, getCartIteams, deleteCartIteam };