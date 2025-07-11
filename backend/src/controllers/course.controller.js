import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import CourseValidator from "../validators/course.validator.js";
import { Course } from "../models/course.model.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";


const createCourse = asyncHandler(async (req, res) => {
  //Step1: Get details form admin
  const thumbnailPath = req.file || req.file?.path;
  if (!thumbnailPath) {
    throw new ApiError(400, "Thumbnail is required");
  }
  const result = CourseValidator.validateCourse({ ...req.body });
  if (!result.success) {
    throw new ApiError(422, "Validation error", result.errors);
  }

  //Step2: Upload thumbnail Img to cloudinary
  const cloudinaryThumbnail = await uploadToCloudinary(req.file?.path, "image");
  if (!cloudinaryThumbnail) {
    throw new ApiError(
      500,
      "Failed to upload thumbnail. Please try again later"
    );
  }

  const { title, description, price,prerequisitesHtml,whatYouWillLearnHtml } = result.data;
  const { secure_url, public_id }  = cloudinaryThumbnail;
  //Step2: create the course entry in DB
  const createdCourse = await Course.create({
    title,
    description,
    prerequisitesHtml,
    whatYouWillLearnHtml,
    thumbnail: secure_url,
    thumbnailPublicId: public_id,
    price,
  });

  //Step3: send success response
  res
    .status(200)
    .json(new ApiResponse(200, "Course created successfully", createdCourse));
});

const getAllCourses = asyncHandler(async (req, res) => {
  const isAdmin = req.user?.role.includes("ADMIN");  
  const filter = isAdmin ? {} : {visibility : "PUBLIC"};
  const courses = await Course.find(filter);
  res.status(200).json(new ApiResponse(200, "Courses fetched!!", courses));
});

const getCourseById = asyncHandler(async (req, res) => {
 
  const course = await Course.findById(req.params.id);
  if(!course){
    throw new ApiError(404,"Course not found or invalid id");
  }
  res.status(200).json(new ApiResponse(200, "Course fetched!!", course));
});

const editCourse = asyncHandler(async (req, res) => {
  //Step1: Get courseId and validate it.
  const { courseId } = req.params;
  if (courseId === "" || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, "Invalid course ID or video ID.");
  }
  console.log("STEP1: COURSE ID",courseId);
  
  //Step2: Check in db if course exist or not.
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  console.log("STEP2: COURSE ",course);
  //Step3: Get user data and validate it.
    const result = CourseValidator.validateCourse(req.body); // create a validator for partial updates
  if (!result.success) {
    throw new ApiError(422, "Validation error", result.errors);
  }
  const updateData = { ...result.data,thumbnailPublicId:course.thumbnailPublicId  };
  console.log("STEP3: USER DATA ",updateData);

 // Step 4: Handle optional thumbnail update
  if (req.file?.path) {
   const cloudinaryResponse =  await deleteFromCloudinary(course.thumbnailPublicId,"image");
    if (!cloudinaryResponse || cloudinaryResponse.result !== "ok") {
    console.warn("Cloudinary deletion may have failed or file not found.");
    // Not throwing error here to allow soft failure of cloud cleanup
  }
    const cloudinaryThumbnail = await uploadToCloudinary(req.file.path, "image");
    if (!cloudinaryThumbnail?.secure_url) {
      throw new ApiError(500, "Failed to upload thumbnail.");
    }
    updateData.thumbnail = cloudinaryThumbnail.secure_url;
    updateData.thumbnailPublicId = cloudinaryThumbnail.public_id;

    console.log("STEP4: THUMBNAIL DATA OPTIONAL ",updateData);
  }
  if(req.body.visibility && ["PUBLIC", "PRIVATE"].includes(req.body.visibility)){
    updateData.visibility = req.body.visibility;
  }

  //Step4: Update the data in DB.
  console.log("STEP5: FINAL DATA ",updateData);
  
  const updatedCourse = await Course.findByIdAndUpdate(courseId,updateData,{new: true});
  console.log("STEP6: UPDATED DATA ",updatedCourse);
  //Step5: Send success response
  return res.status(200).json(new ApiResponse(200, "Course updated successfully", updatedCourse));
});

export { createCourse, getAllCourses, editCourse ,getCourseById};
