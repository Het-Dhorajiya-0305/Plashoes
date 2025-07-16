import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
import { extractPublicId } from 'cloudinary-build-url';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath,
            {
                resource_type: "image",
                folder: "products",
                fetch_format: "auto",
            });
        console.log("file had been uploaded on cloudinary ", response.url);

        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return response

    }
    catch (error) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        console.log("error", error);
        return null;
    }
}

const deleteImage = async (product) => {
    try {
        const publicId = extractPublicId(product.proImg);
        if (!publicId) {
            console.log("No public ID found for the image.");
            return null;
        }

        const deletedImage = await cloudinary.uploader.destroy(publicId)

        return deletedImage;

    }
    catch (error) {
        alert("error in deleting image",error.message);
        console.log("error in deleting image :", error);
        return null;
    }
}

export { uploadImage, deleteImage };