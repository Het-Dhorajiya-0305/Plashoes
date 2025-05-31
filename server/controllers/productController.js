
import Product from "../models/productModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {uploadImage, deleteImage } from "../utils/cloudinary.js";



// add product

const addProduct = asyncHandler(async (req, res) => {


    const { proName, proPrice, proDescription, gender, proStock } = req.body;

    if (!proName || !proPrice || !proDescription || !gender || !proStock) {
        return res.status(400).json({
            success: false,
            message: "please fill all the fields"
        })
    }

    const existedProduct = await Product.findOne({ proName });

    if (existedProduct) {
        return res.status(400).json({
            success: false,
            message: "Product already exists"
        })
    }

    const imageLocalPath = req.file?.path;

    if (!imageLocalPath) {
        return res.status(404).json({
            success: false,
            message: "product image is required"
        })
    }

    const imageUrl = await uploadImage(imageLocalPath,proName);

    if (!imageUrl) {
        res.status(400).json({
            success: false,
            message: "image upload failed"
        })
    }



    const product = await Product.create({
        proName,
        proPrice,
        proDescription,
        proStock,
        gender,
        proImage: imageUrl.url
    })

    return res.status(200).json({
        success: true,
        message: "product added successfully",
        product
    })
})

// delete product

const deleteProduct=asyncHandler(async (req,res)=>{
    
    const {proName}=req.body;

    console.log("product name : ",proName);
    if(!proName)
    {
        return res.status(400).json({
            message:"product name is required",
            success:false
        })
    }

    const existproduct=await Product.findOneAndDelete({proName});
    console.log("exist product : ",existproduct.proName);

    if(!existproduct)
    {
        return res.status(400).json({
            message:"product does not exist",
            success:false
        })
    }

    const deletedImage=deleteImage(proName);

    if(!deletedImage)
    {
        return res.status(400).json({
            message:"error in deleting image",
            success:false
        })
    }


    return res.status(200).json({
        message:"product successfully deleted",
        success:true
    })

})




export { addProduct,deleteProduct};