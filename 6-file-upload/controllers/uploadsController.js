const {StatusCodes} = require('http-status-codes')
const path = require('path')
const customError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadProductImageLocal = async(req, res) =>{
    
    console.log(req.files);
    if(!req.files){
        throw new customError.BadRequestError('No File Uploaded')
    }

    let productImage = req.files.image;

    if(!productImage.mimetype.startsWith('image')){
        throw new customError.BadRequestError('Please Upload Image');
    }

    const maxSize = 1024 * 1024
    if(productImage.size > maxSize){
        throw new customError.BadRequestError('Please Upload image smaller 1KB');
    }

    const imagePath = path.join(__dirname, '../public/uploads/'+`${productImage.name}`)

    await productImage.mv(imagePath);
    return res.status(StatusCodes.OK).json({image:{src:`/uploads/${productImage.name}`}});
};

const uploadProductImage = async(req, res) =>{
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
          use_filename: true,
          folder: 'file-upload',
        }
      );
      fs.unlinkSync(req.files.image.tempFilePath); //
      return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
}

module.exports = {
    uploadProductImage,
};