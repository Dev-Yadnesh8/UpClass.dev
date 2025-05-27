import { Course } from "../models/course.model.js";
import { Video } from "../models/video.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadToCloudinary from "../utils/cloudinary.js";
import VideoValidator from "../validators/video.validator.js";
import mongoose from "mongoose";

const postVideo = asyncHandler(async (req, res) => {
  //Step1: Get courseId, video info and video file form multer && validate it.
  const courseId = req.params.courseId.toString();
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, "Invalid course ID format");
  }
  const course = await Course.findById(courseId);
  console.log("Course,", course);

  if (!course) {
    throw new ApiError(404, "Invalid course");
  }

  if (!req.file || !req.file?.path) {
    throw new ApiError(400, "Video file is required");
  }
  //   console.log("Path", req.file?.path);
  //   console.log("CourseId", courseId);

  const result = VideoValidator.validateVideoData(req.body);
  if (!result.success) {
    throw new ApiError(422, "Validation error", result.errors);
  }
  const { title } = result.data;

  //Step2: Upload the video file to cloudinary and get the url.
  const cloudinaryVideo = await uploadToCloudinary(req.file?.path, "video");
  console.log("Cloudinary video", cloudinaryVideo);

  //Step3: Create an entry in DB
  const { secure_url, duration } = cloudinaryVideo;
  const video = await Video.create({
    title,
    courseId,
    videoFile: secure_url,
    duration,
  });

  // Updating course model
  course.videos.push(video._id);
  await course.save();

  //   console.log("Final course after modification ", course);

  //Step4: Send success response
  res.status(201).json(new ApiResponse(201, "Video added successfully"));
});

export { postVideo };
