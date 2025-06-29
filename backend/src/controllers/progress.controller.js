import { Course } from "../models/course.model.js";
import { Progress } from "../models/progress.model.js";
import { Video } from "../models/video.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getCourseProgress = asyncHandler(async (req, res) => {
  //Step1: Get course id and validate it
  const { courseId } = req.params;
  const userId = req.user?._id;
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, "Invalid course ID.");
  }
  //Step2: Check if course exist
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  //Step3: Calculate the progress by getting total videos in course and marked watch
  const videos = await Video.find({ courseId });
  if (!videos) {
    throw new ApiError(404, "No videos found in course");
  }
  const watchedVideos = videos.filter((vid) => vid.isWatched.includes(userId));
  const progressPercentage = (watchedVideos.length / videos.length) * 100;



  //Step4: Update the progress model
  let progress = await Progress.findOne({ userId, courseId });

  if (progress) {
    progress.completedVideos = watchedVideos.length;
    progress.percentageCompleted = progressPercentage;
    await progress.save();
  } else {
    progress = await Progress.create({
      userId,
      courseId,
      completedVideos: watchedVideos.length,
      percentageCompleted: progressPercentage,
    });
  }

  //Step5: Send response with progress
  return res
    .status(200)
    .json(new ApiResponse(200, "Porgress fetched successfully", progress));
});

export { getCourseProgress };
