import Joi from "joi";
import { RefreshToken, User } from "../../models/index.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import JwtService from "../../services/JwtService.js";
import { REFRESH_KEY } from "../../config/index.js";

const refreshcontroller = async (req, res, next)=>{
    const refreshSchema = Joi.object({
        refresh_token: Joi.string().required(),
    });

    const { error } = refreshSchema.validate(req.body);

    if (error) {
        return next(error);
    }

    let userId;

    try {
        const refreshtoken = await RefreshToken.findOne({ token: req.body.refresh_token });
        if (!refreshtoken) {
            return next(CustomErrorHandler.unAuthorized('Invalid refresh token'));
        }
        
        const {_id} = await JwtService.verify(refreshtoken.token, REFRESH_KEY)
        userId = _id;

        const user = await User.findOne({_id:userId});       
        
        if(!user){
            return next(CustomErrorHandler.unAuthorized('No user found!'));
        }



        const access_token = JwtService.sign({ _id: user._id, role: user.role });
        const refresh_token = JwtService.sign({_id: user._id, role: user.role}, REFRESH_KEY, '1y', )

        await RefreshToken.create({token: refresh_token});

        res.cookie("token", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });
    
        return res.status(201).json({ access_token, refresh_token, message: "You logged in successfully" });

    } catch (error) {
        return next(new Error('Something went wrong: ' + error.message)); 
    }
}

export default refreshcontroller