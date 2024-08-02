import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

  api_key: process.env.CLOUDINARY_API_KEY,

  api_secret: process.env.CLOUDINARY_API_SECRET,
});
 
const cloudinaryUpload = async(localfilepath) => {
    try{
          if(!localfilepath) return null
         const response =  await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto"
          })
        
          return response

    }catch (error){
        fs.unlinkSync(localfilepath) //remove the locally saved temp files as the upload operation got failed
        return null
    }
}
export {cloudinaryUpload}
