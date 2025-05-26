import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import UserValidator from "../validators/user.validator.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById({ _id: userId });
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    // console.log(error);
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const signUp = asyncHandler(async (req, res) => {
  // Step1: Get data form user & Validate data
  const result = UserValidator.validateSignUp(req.body);

  if (!result.success) {
    throw new ApiError(422, "Validation failed", result.errors);
  }
  const { username, email, password } = result.data;

  // Step2 : Check if user already exist
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(
      409,
      "Email or username is already in use. Please use a different email or username, or log in."
    );
  }

  // Step3 : Create user and store data in DB

  const user = await User.create({
    username,
    email,
    password,
    role: "USER",
  });

  // Step4 : Check if user is created or not & if exist remove password and refersh token field
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(
      500,
      "Something went wrong while creating the user. Please try again later."
    );
  }

  // Setp5 : Send successful response
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        "Your account has been created. Let’s get started!",
        createdUser
      )
    );
});

const signIn = asyncHandler(async (req, res) => {
  //Step1 : Get data from user and validate it.
  const result = UserValidator.validateSignIn(req.body);
  if (!result.success) {
    throw new ApiError(422, "Validation error", result.errors);
  }

  //Step2: Check if user existis or not.
  const { identifier, password } = result.data;
  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });
  if (!user) {
    throw new ApiError(
      404,
      "It looks like you don’t have an account yet. Please sign up."
    );
  }

  //Step3 : Validate user credintials with backend credintials & generate tokens.
  const isPasswordCorrect = await user.checkPassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(
      401,
      "Invalid email/username or password. Please try again."
    );
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id.toHexString()
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //Step4 : Send token & response
  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(200, "Login Successful", {
        accessToken,
        refreshToken,
        user: loggedInUser,
      })
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { refreshToken: undefined } },
    { new: true }
  );
  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, "User logout successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const userRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  console.log(userRefreshToken);
  if (!userRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }
  try {
    const decodedToken = jwt.verify(
      userRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "User not found. Invalid refresh token.");
    }

    if (userRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh token expired or already used");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );
    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(200, "Tokens refreshed successfully", {
          accessToken,
          refreshToken,
        })
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});
export { signUp, signIn, logoutUser, refreshAccessToken };
