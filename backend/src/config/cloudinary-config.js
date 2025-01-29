import { v2 as cloudinary } from "cloudinary";
//import { cloud_name, cloud_api_key, cloud_api_secret } from "./config";
import fs from "fs";



cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(localFilePath);
        
        // Remove the file after a successful upload
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        // Optimize delivery dynamically based on uploaded file
        const optimizeUrl = cloudinary.url(uploadResult.public_id, {
            fetch_format: "auto",
            quality: "auto"
        });

        
        return uploadResult;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);

        // Ensure the local temp file is deleted if an error occurs
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

export default uploadOnCloudinary;
