import  jwt  from "jsonwebtoken";
import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
      
    const token =
      req.cookies?.accessToken ||
      req.headers.Authorization?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
  
    const decodedJWT = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedJWT?._id).select(
      "-password -refreshToken"
    );
  
    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401,"Invalid access token");
  }
});

export const checkIsAdmin = asyncHandler((req,res,next)=>{
  //Step1: check the user role if not admin block the further req
  if(req.user?.role !== "ADMIN"){
    throw new ApiError(401, "Unauthorized request");
  }
  next();
});
