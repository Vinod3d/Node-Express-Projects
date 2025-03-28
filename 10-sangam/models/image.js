import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    url:{
        type: String,
    },
    publicId : {
        type: String,
        required: true
    },
    uploadedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    }
},{timestamps:true})

export const Image = mongoose.model("Image", ImageSchema);