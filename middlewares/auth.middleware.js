const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

export const verifyJWT = asyncHandler(async(reqq,res,next)=>{
  try {
      const token = req.cookies?.accessToken || req.header
      ("Authorization")?.replace("Bearer", "");
  
      if(!token){
          throw new ApiError("UnAuthorized request");
          
      }
  
     const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  
   const user = await  User.findById(decodedToken?._id).select("-password -refreshToken")
       
     if(!user){
      throw new ApiError(401,"Invalid Access Token")
     }
  
     req.user = user;
     next()
  } catch (error) {
     throw new ApiError(401,"Invalid access token")
  }
   
})