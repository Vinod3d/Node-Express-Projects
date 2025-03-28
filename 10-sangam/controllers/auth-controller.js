import { JWT_SECRET_KEY } from "../config/Index.js";
import { User } from "../models/User.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// register controller
export const registerUser = async(req, res, next)=>{
    try {
        const {username, email, password, role} = req.body;

        const checkExistingUser = await User.findOne({$or : [{username}, {email}]});
        if(checkExistingUser){
            return next(CustomErrorHandler.badRequest("user is already exists"));
        }

        const newUser = new User({
            username,
            email,
            password,
            role: role || "user"
        })
        
        await newUser.save();

        res.status(201).json({
          newUser,
          message: "User registered successfully",
        }); 



    } catch (error) {
        return next(CustomErrorHandler.serverError("Some error occured, please try again"))
    }
}


// login controller

export const loginUser = async (req, res, next)=>{
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return next(CustomErrorHandler.badRequest("Invalid username"))
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            return next(CustomErrorHandler.badRequest("Invalid password"))
        }

        const accessToken = jwt.sign({
            userId: user._id,
            username: user.username,
            role: user.role
        },JWT_SECRET_KEY, {expiresIn: '15m'})

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            accessToken,
        })

    } catch (error) {
        return next(CustomErrorHandler.serverError("Some error occured, please try again"))
    }
} 


export const changePassword = async(req, res, next)=>{
    try {
        const userId = req.user.userId;
        const {oldPassword, newPassword} = req.body;
        const user = await User.findById(userId);
        if(!user){
            return next(CustomErrorHandler.badRequest("Invalid user"))
        }
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isPasswordMatch){
            return next(CustomErrorHandler.badRequest("Invalid old password"));
        }

        user.password = newPassword;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Password changed successfully",
        })
    } catch (error) {
        return next(CustomErrorHandler.serverError("Some error occured, please try again"))
    }
}