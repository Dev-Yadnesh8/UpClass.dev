import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import UserValidator from "../validators/user.validator.js";
import { User } from "../models/user.model.js";

const signUp = asyncHandler(async (req, res) => {
  // Step1: Get data form user & Validate data
  const result = UserValidator.validateSignUp(req.body);

  if (!result.success) {
    throw new ApiError(422, "Validation failed", result.errors);
  }
  const { username, email, password } = result.data;

  // Step2 : Check if user already exist
  const existingUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (!existingUser) {
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
  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  if (!createdUser) {
    throw new ApiError(
      500,
      "Something went wrong while creating the user. Please try again later."
    );
  }

  // Setp5 : Send successful response
  return res
    .status(201)
    .json(new ApiResponse(200, "User created successfully", createdUser));
});

export { signUp };
