import {v2 as cloudinary} from "cloudinary";
import fs from "fs";


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRETE,
});


const uploadToCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath){
          console.log("File path not found");
          return null;     
        }

const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
      folder: "codeverse/thumbnails", // organize uploads
      transformation: [
        { width: 300, height: 300, crop: "limit" }, // small & safe size
        { quality: "auto" },                        // smart compression
        { fetch_format: "auto" },                   // use WebP etc.
      ],
    });

        // console.log("File uploaded!! ",response);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // removes the locally saved temp file as the upload operation got failed
        return null;
    }
}

export default uploadToCloudinary;