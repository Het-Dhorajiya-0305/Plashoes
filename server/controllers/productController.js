
import Product from "../models/productModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";



// add product

const addProduct = asyncHandler(async (req, res) => {

    const { proName, proPrice, proDescription, proGender,proSize,bestSeller,newArrival } = req.body;

    if (!proName || !proPrice || !proDescription || !proGender ) {
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

    console.log("image local path : ", imageLocalPath);

    if (!imageLocalPath) {
        return res.status(404).json({
            success: false,
            message: "product image is required"
        })
    }

    const imageUrl = await uploadImage(imageLocalPath);

    if (!imageUrl) {
        res.status(400).json({
            success: false,
            message: "image upload failed"
        })
    }

    console.log("image url : ", imageUrl.secure_url);
    const product = await Product.create({
        proName,
        proPrice:Number(proPrice),
        proDescription,
        proSize:JSON.parse(proSize),
        proGender,
        proImg: imageUrl.secure_url,
        bestSeller: bestSeller === "true" ? true : false,
        newArrival: newArrival === "true" ? true : false
    })

    return res.status(200).json({
        success: true,
        message: "product added successfully",
        product
    })
})

// delete product

const deleteProduct = asyncHandler(async (req, res) => {

    const { proName } = req.body;

    if (!proName) {
        return res.status(400).json({
            message: "product name is required",
            success: false
        })
    }

    const existproduct = await Product.findOneAndDelete({ proName });

    if (!existproduct) {
        return res.status(400).json({
            message: "product does not exist",
            success: false
        })
    }

    const deletedImage =await deleteImage(existproduct);

    if (!deletedImage) {
        return res.status(400).json({
            message: "error in deleting image",
            success: false
        })
    }

    return res.status(200).json({
        message: "product successfully deleted",
        success: true
    })

})

const listProduct = asyncHandler(async (req, res) => {
    const productData = await Product.find({});
    if(!productData)
    {
        return res.status(400).json({
            success:false,
            message:"error in fetching data"
        })
    }
    return res.status(200).json({
        success: true,
        productData
    })
})

const singleProduct = asyncHandler(async (req, res) => {

    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "product does not exist!!"
        })
    }
    return res.status(200).json({
        success: true,
        product
    })
})




export { addProduct, deleteProduct, listProduct, singleProduct };