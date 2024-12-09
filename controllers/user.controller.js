const asyncHandler = require("../utils/asyncHandler");
const userRouter = require("../routes/user.routes");
const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");
const uploadOnCloudinary = require("../utils/cloudinary");
const ApiResponse = require("../utils/ApiResponse")
const userRegister = asyncHandler(async (req, res) => {
  //get user details from frontend
  // vaildation
  //check if useralready exists:username,email
  // check imagesm=,check for avatar
  // uploam them to cloudinary,avatar
  // create user object - create entry in db
  // remove password and refresh token field for response
  // check for user creation
  // return res
  const { fullName, email, username, password } = req.body;
  console.log("email:", email);

  if ([fullName, email, avatar, email].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or usrname is already existed");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

if(!createdUser){
   throw new ApiError(500,"Something went wrong while registering the user")
}
  return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Successfully")
  )
});

module.exports = userRegister;
