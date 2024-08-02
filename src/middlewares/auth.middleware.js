import {asynchandler} from '../utils/asynchandlers.js';
import jwt from "jsonwebtoken";
import {User}from '../models/user.models.js'
import { ApiError } from '../utils/ApiErrors.js';

export const verifyJWT = asynchandler(async(req, res, next)=>{
   try {
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","") 
     if(!token){
         throw new ApiError(400,"Unauthorized User")
     }
      
     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
     const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
     
     if(!user){
         throw new ApiError(401, "Invalid Access Token")
     }  
     req.user = user;
     next()
   } catch (error) {
    throw new ApiError(401, error.message || "Invalid access token")
   }
})