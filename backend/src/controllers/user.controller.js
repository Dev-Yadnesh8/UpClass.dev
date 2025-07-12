import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import UserValidator from "../validators/user.validator.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../constants.js";
import generateStrongOTP from "../utils/generateOTP.js";
import {sendEmail,sendPasswordResetEmail} from "../utils/emailService.js";

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

  // Step3 : Create user,verification token , expriy  and store data in DB

  const verificationToken = generateStrongOTP();

  const user = await User.create({
    username,
    email,
    password,
    role: "USER",
    verificationToken,
    verificationTokenExpiry: new Date(Date.now() + 1000 * 60 * 30), // Will expire in 30 min after creation
  });

  // Step4 : Check if user is created or not & if exist remove password and refersh token field
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -verificationToken -verificationTokenExpiry -resetPasswordToken -resetPasswordTokenExpiry"
  );
  if (!createdUser) {
    throw new ApiError(
      500,
      "Something went wrong while creating the user. Please try again later."
    );
  }

  await sendEmail(user.email, verificationToken);

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

  //Step3 : Validate user credintials with backend credintials.
  const isPasswordCorrect = await user.checkPassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(
      401,
      "Invalid email/username or password. Please try again."
    );
  }

  //Step4: Check if email is verified or not
  const isVerified = user.isVerified;
  if (!isVerified) {
    throw new ApiError(
      400,
      "Email verification is required to proceed. Please verify your email and try again."
    );
  }

  //Step5: Generate Tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id.toHexString()
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //Step6 : Send token & response

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

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, "User logout successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  console.log(cookieOptions);

  const userRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  console.log("User Refresh Token", userRefreshToken);
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
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(200, "Tokens refreshed successfully", {
          user: loggedInUser,

          accessToken,
          refreshToken,
        })
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const forgetPassword = asyncHandler(async (req, res) => {
  //Step1: Get data from request body
  const { email } = req.body;
  //Step2: check if user exist with given email
  const user = await User.findOne({ email });
  if (!user) {
   return res.status(200).json(new ApiResponse(200,"If this email is registered with us, a password reset link has been sent"))
  }
  //Step3: send a code for validation if user is real or not
  const resetPasswordToken = crypto.randomUUID();
  console.log("reset-pass-token",resetPasswordToken);
  
  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordTokenExpiry = new Date(Date.now() + 1000 * 60 * 15), // Will expire in 15 min after creation
  await user.save();
  await sendPasswordResetEmail(email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`);

  //Step4: send response
  res.status(200).json(new ApiResponse(200,"Password reset link has been sent to your email address. Please check your inbox."))
});

const changePassword = asyncHandler(async (req, res) => {
  // Step 1: Get token from URL and validate request body
  const { token } = req.params;
  const result = UserValidator.validateChangePassword(req.body);

  if (!result.success) {
    throw new ApiError(422, "Validation failed", result.errors);
  }

    // Step 2: Find user with matching valid token
  const { newPassword } = result.data;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired password reset token.");
  }

  // Step 3: Save new password and clear reset token
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpiry = undefined;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, "Password changed successfully."));
});


const currentUser = asyncHandler((req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, "User fetched successfully", req.user));
});

const verifyEmail = asyncHandler(async (req, res) => {
  //Step1: Get the token form body;
  const { verificationToken } = req.body;
  //Step2: Check if user has the code and it not expired
  const user = await User.findOne({
    verificationToken,
    verificationTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Invalid otp or otp expired");
  }

  //Step3: Update the isVerified status , verification token and expiry
  user.isVerified = true;
  ((user.verificationToken = undefined),
    (user.verificationTokenExpiry = undefined),
    await user.save());

  res.status(200).json(new ApiResponse(200, "Email verified successfully!"));
});

export {
  signUp,
  signIn,
  logoutUser,
  refreshAccessToken,
  changePassword,
  currentUser,
  verifyEmail,
  forgetPassword
};
