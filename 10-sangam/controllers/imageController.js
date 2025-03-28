import cloudinary from "../config/cloudinary.js";
import { Image } from "../models/image.js";
import uploadToCloudinary from "../services/cloudinaryHelper.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import fs from 'fs'

const uploadImage = async (req, res, next)=>{
    try {
        if(!req.file){
            return next(CustomErrorHandler.badRequest("File is required. Please upload an image"))
        }

        // upload to cloudinary
        const {url, publicId} = await uploadToCloudinary(req.file.path)

        // store the image url and public id

        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.user.userId
        })

        await newlyUploadedImage.save();
        // delete the file from the server
        fs.unlinkSync(req.file.path)

        res.status(201).json({
            success: true,
            message: "Image uploaded",
            image: newlyUploadedImage
        })

    } catch (error) {
        return next(CustomErrorHandler.serverError("Something went wrong"));
    }
}

const fetchImageController = async(req, res, next)=>{
    try {
        const images = await Image.find({});

        if(images){
            res.status(200).json({
                success: true,
                data: images
            })
        }
    } catch (error) {
        return next(CustomErrorHandler.serverError("Something went wrong"));
    }
}

const deleteImageController = async(req, res, next)=>{
    try {
        const getCurrentIdOfImageToBeDeleted = req.params.id;
        const userId = req.user.userId;

        const image = await Image.findById(getCurrentIdOfImageToBeDeleted);
        if(!image){
            return next(CustomErrorHandler.notFound('Image not found'));
        }

        // check if this image is uploaded by the current user who is trying to delete this
        if(image.uploadedBy.toString() !== userId.toString()){
            return next(CustomErrorHandler.forbidden('You are not allowed to delete this image'))
        }

        // delete this image first from your cloudinary storage
        await cloudinary.uploader.destroy(image.publicId);

        // delete this image from mongoDB database
        await Image.findByIdAndDelete(getCurrentIdOfImageToBeDeleted);
        res.status(200).json({
            success: true,
            message : 'Image deleted Successfully'
        })

    } catch (error) {
        return next(CustomErrorHandler.serverError("Something went wrong"));
    }
}

export  {
    uploadImage,
    fetchImageController,
    deleteImageController
}