import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import CourseValidator from "../validators/course.validator.js";
import {Course} from "../models/course.model.js";
import uploadToCloudinary from "../utils/cloudinary.js";

const createCourse = asyncHandler(async(req,res)=>{
    //Step1: Get details form admin 
    const thumbnailPath = req.file || req.file?.path;
    if(!thumbnailPath){
        throw new ApiError(400,"Thumbnail is required");
    }
    const result = CourseValidator.validateCourse({...req.body});
    if(!result.success){
        throw new ApiError(422,"Validation error",result.errors);
    }
   
    //Step2: Upload thumbnail Img to cloudinary 
   const cloudinaryThumbnail = await uploadToCloudinary(req.file?.path,"image");
   if(!cloudinaryThumbnail){
    throw new ApiError(500,"Failed to upload thumbnail. Please try again later");
   }
    
    
    const {title,description,price} = result.data;
    //Step2: create the course entry in DB
    const createdCourse = await Course.create({
        title,
        description,
        thumbnail : cloudinaryThumbnail.secure_url,
        price,
    });

    //Step3: send success response
    res.status(200).json(new ApiResponse(200,"Course created successfully",createdCourse));
});

const getAllCourses = asyncHandler(async(req,res)=>{
   const courses = await Course.find({});
   res.status(200).json(new ApiResponse(200,"Courses fetched!!",courses));
});
export {createCourse,getAllCourses}