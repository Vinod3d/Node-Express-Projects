import { User } from "../models/User.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";

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
        
    } catch (error) {
        return next(CustomErrorHandler.serverError("Some error occured, please try again"))
    }
}