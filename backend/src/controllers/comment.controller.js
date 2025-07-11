import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ObjectId } from 'bson';
const addComment = asyncHandler(async (req, res) => {
  //Step1: Get the video id and find video in db.
  const { videoId } = req.params;
  const { commentText } = req.body;
  if (!commentText || commentText.trim() === "") {
    throw new ApiError(400, "Comment cannot be empty");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  //Step2: add the comment in db also in the video schema.
  const comment = await Comment.create({
    comment: commentText,
    commentedBy: req.user?._id,
    videoId: videoId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Comment successful", comment));
});

const editComment = asyncHandler(async (req, res) => {
  //Step1: Check if comment exist and update the data .
  const { commentId } = req.params;
  const { commentText } = req.body;
  if (!commentText || commentText.trim() === "") {
    throw new ApiError(400, "Comment cannot be empty");
  }
  const comment = await Comment.findByIdAndUpdate(
    commentId,
    { comment: commentText },
    { new: true }
  );
  if (!comment) {
    throw new ApiError(404, "Comment not found or invalid comment");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Comment edited successfully", comment));
});

const deleteComment = asyncHandler(async (req, res) => {
  //Step1: Check if comment exist and update the data .
  const { commentId } = req.params;

  const comment = await Comment.findByIdAndDelete(commentId);
  if (!comment) {
    throw new ApiError(
      404,
      "Comment does not exist or already has been deleted"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Comment deleted successfully", comment));
});
const fetchAllComments = asyncHandler(async (req, res) => {
  //Step1: check if video exist.
  const { videoId } = req.params;

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  //Step2: Send all comments of that video
  // const allComments = await Comment.find({ videoId });
  console.log("Video found",video);
  

const allComments = await Comment.aggregate([
    {
      $match:{videoId :new ObjectId(String(videoId))}
    },{
      $lookup:{
        from: 'users',
        localField:'commentedBy',
        foreignField:'_id',
        as:'commenterInfo'
      }
    },{
      $unwind: '$commenterInfo'
    },
    {
      $project:{
        _id:1,
        comment:1,
        commentedBy:1,
        updatedAt:1,
        username:'$commenterInfo.username',
        email:'$commenterInfo.email'

      }
    }
    

  ])
  if (!allComments) {
    throw new ApiError(404, "No comments found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Comments fetched", allComments));
});

export { addComment, editComment, fetchAllComments, deleteComment };
