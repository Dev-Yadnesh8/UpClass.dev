import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETE,
});

const uploadToCloudinary = async (localFilePath, resourceType = "auto") => {
  try {
    if (!localFilePath) {
      console.log("File path not found");
      return null;
    }

    const folderMap = {
      image: "codeverse/thumbnails",
      video: "codeverse/videos",
      auto: "codeverse/uploads",
    };

    const options = {
      resource_type: resourceType,
      folder: folderMap[resourceType] || folderMap["auto"],
    };

    // Only apply transformations for images
    if (resourceType === "image") {
      options.transformation = [
        { width: 300, height: 300, crop: "limit" },
        { quality: "auto" },
        { fetch_format: "auto" },
      ];
    }

    const response = await cloudinary.uploader.upload(localFilePath, options);

    // Clean up temp file after successful upload
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // Clean up on error
    }
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

const deleteFromCloudinary = async (publicId, resourceType = "auto") => {
  try {
    if (!publicId) {
      console.warn("No publicId provided for Cloudinary deletion.");
      return null;
    }

    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    console.log("Cloudinary delete response:", response);
    return response;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return null;
  }
};


export  {uploadToCloudinary,deleteFromCloudinary};
