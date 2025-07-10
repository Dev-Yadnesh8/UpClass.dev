import mongoose from "mongoose";
import { Course } from "../models/course.model.js";
import { Progress } from "../models/progress.model.js";
import { Video } from "../models/video.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Purchase } from "../models/purchase.model.js";

const getCourseProgress = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  //Step1: Get purchases of user and remove userID
  const purchases = await Purchase.find({ userId }).select("courseId");

  const courseIds = purchases.map((p) => p.courseId);
  if (courseIds.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, "No course purchases found", []));
  }

  //Step2: Fetch all videos for all those courses
  const allVideos = await Video.find({ courseId: { $in: courseIds } }).select(
    "courseId isWatched"
  );

  // Step 3: Group and compute progress
  let progressMap = {};

  for (const courseId of courseIds) {
    const courseVideos = allVideos.filter(
      (video) => video.courseId.toString() === courseId.toString()
    );

    const totalVideos = courseVideos.length;
    const watchedVideos = courseVideos.filter((vid) =>
      vid.isWatched.includes(userId)
    ).length;

    const percentage =
      totalVideos > 0 ? (watchedVideos / totalVideos) * 100 : 0;

    progressMap[courseId.toString()] = {
      courseId: courseId.toString(),
      totalVideos,
      watchedVideos,
      percentageCompleted: Math.round(percentage),
    };
  }

  //Step5: Send response with progress
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Porgress fetched successfully",
        Object.values(progressMap)
      )
    );
});

export { getCourseProgress };
