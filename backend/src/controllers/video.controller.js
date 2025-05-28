import { Course } from "../models/course.model.js";
import { Video } from "../models/video.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
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
  const { secure_url, duration, public_id } = cloudinaryVideo;
  const video = await Video.create({
    title,
    courseId,
    videoFile: secure_url,
    publicId: public_id,
    duration,
  });

  // Updating course model
  course.videos.push(video._id);
  await course.save();

  //   console.log("Final course after modification ", course);

  //Step4: Send success response
  res.status(201).json(new ApiResponse(201, "Video added successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { courseId, videoId } = req.params;

  //Step1: Validate IDs
  if (!courseId || !videoId) {
    throw new ApiError(400, "Course ID and video ID are required");
  }
  if (
    !mongoose.Types.ObjectId.isValid(courseId) ||
    !mongoose.Types.ObjectId.isValid(videoId)
  ) {
    throw new ApiError(400, "Invalid course ID or video ID format");
  }

  //Step2: Check if course exists
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  //Step3: Delete the video from DB and cloudinary
  const video = await Video.findByIdAndDelete(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

    // Step4: Delete video file from Cloudinary
  const cloudinaryResponse = await deleteFromCloudinary(video.publicId, "video");
  if (!cloudinaryResponse || cloudinaryResponse.result !== "ok") {
    console.warn("Cloudinary deletion may have failed or file not found.");
    // Not throwing error here to allow soft failure of cloud cleanup
  }

  //Step5: Remove video reference from course
  course.videos = course.videos.filter((vidId) => vidId.toString() !== videoId);
  await course.save();

  // Step6: Send the response back
  return res
    .status(200)
    .json(
      new ApiResponse(200, "Video deleted and reference removed from course")
    );
});

export { postVideo, deleteVideo };
