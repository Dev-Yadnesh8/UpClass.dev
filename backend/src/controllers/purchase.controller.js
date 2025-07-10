import { Course } from "../models/course.model.js";
import { Purchase } from "../models/purchase.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const purchaseCourse = asyncHandler(async(req,res)=>{
    //Step1: Get & validate courseId.
    const userId = req.user._id;
    const {courseId} = req.params;
    if(!mongoose.Types.ObjectId.isValid(courseId)){
        throw new ApiError(400,"Invalid course ID");
    }
    //Step2: find course form course Id.
    const course = await Course.findById(courseId);
    if(!course){
        throw new ApiError(404,"Course not found");
    }

    //Step3: Check if user already had purchased the course
    const isAlreadyPurchased = await Purchase.findOne({courseId,userId});
    if(isAlreadyPurchased){
        throw new ApiError(409,"You have already purchased this course");
    }
    //Step4: Create an entry in purchases schema.
    const purchase = await Purchase.create({
        userId: req.user._id,
        courseId
    });
    if(!purchase){
        throw new ApiError(500,"Failed to create purchase");
    }
    //Step5: Send successful response.
    return res.status(201).json(new ApiResponse(201,"Course purchased succefful"));
});

const getPurchasedCourse = asyncHandler(async (req, res) => {
    
    //Step1:  Check if userId exists
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(401, "Unauthorized Request");
    }

    const purchases = await Purchase.find({ userId });
    if (purchases.length === 0) {
        throw new ApiError(404, "No purchases found for this user");
    }

    //Step2: Aggregate to get course details
    const purchasedCourses = await Purchase.aggregate([
        {
            $match: { userId }
        },
        {
            $lookup: {
                from: "courses", // collection name (not model)
                localField: "courseId",
                foreignField: "_id",
                as: "courseDetails"
            }
        },
        {
            $unwind: "$courseDetails"
        },
        {
            $project: {
                _id: 0,
                courseId: "$courseDetails._id",  // Course ID
                title: "$courseDetails.title",
                thumbnail: "$courseDetails.thumbnail",
            }
        },
        
            
        
    ]);

    res.status(200).json(
        new ApiResponse(200, "Purchased courses fetched successfully", purchasedCourses)
    );
});

export {purchaseCourse,getPurchasedCourse}