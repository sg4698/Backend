const asyncHandler = require("../utils/asyncHandler");
const userRouter = require("../routes/user.routes");
const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");
const uploadOnCloudinary = require("../utils/cloudinary");
const ApiResponse = require("../utils/ApiResponse");
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { fullName, email, username, password } = req.body;
  //console.log("email: ", email);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  //console.log(req.files);

  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

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
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const generateAccessAndRefreshToken = async (userId) => {
  // Declare an asynchronous function to generate access and refresh tokens for a user.
  try {
    const user = await User.findById(userId);
    // Retrieve the user document from the database using the provided userId.
    // `findById` is a Mongoose method that fetches a single user by their unique `_id`.

    const accessToken = user.generateAccessToken();
    // Call the `generateAccessToken` method of the user instance to create an access token.
    // Assumes `generateAccessToken` is a custom method defined on the User schema.

    const refreshToken = user.generateAccessToken();
    // Call the `generateAccessToken` method again to create a refresh token.
    // This might be an error since `generateAccessToken` is likely intended for generating an access token.
    // A separate method for generating a refresh token might be more appropriate.

    user.refreshToken = refreshToken;
    // Assign the generated refresh token to the user's `refreshToken` field.

    await user.save({ validateBeforeSave: false });
    // Save the updated user document to the database.
    // The `{ validateBeforeSave: false }` option skips schema validations before saving.

    return { accessToken, refreshToken };
    // Return the generated access token and refresh token as an object.
  } catch (error) {
    throw new ApiError(
      404,
      "Something went wrong while generating access and refresh token"
    );
    // If an error occurs, throw a custom API error with a status code of 404 and an error message.
    // This ensures the calling function can handle the error appropriately.
  }
};

const loginUser = asyncHandler(async (req, res) => {
  //  req body => to fetch data after login
  // lgin on the bases o user or email
  // Find the user
  // Check the Password
  // access and refresh token
  // send  secure cookie

  const { username, email, password } = req.body;

  if (!username || !email) {
    throw new ApiError(400, "User or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Password inCorrect");
  }
  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
    user._id
  );

  await User.findById(user._id).select(" -password -refreshToken");

  //    To send cookies we have to put option
  const options = {
    httpOnly: true,
    secure: true, //This will only edit from server side
  };

  return res
    .status(400)
    .cookie("accessToken", accessToken)
    .cookie("refresshToken", refreshToken)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in Successfully"
      )
    );
});

const logoutUser = asyncHandler(async(req,res)=>{
    
})

module.exports = { registerUser, loginUser };
