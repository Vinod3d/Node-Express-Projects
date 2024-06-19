import Joi from "joi"; 
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import { User } from "../../models/index.js";
import bcrypt from "bcrypt";
import JwtService from "../../services/JwtService.js";

const register = async (req, res, next) => {
    const {name, email, password} = req.body;
  
       
    const registerSchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,8}$')).required(),
        repeat_password: Joi.ref('password')
    });

    const {error} = registerSchema.validate(req.body);

    if(error){
        return next(error);
    }

    try {

        const exist = await User.exists({email: req.body.email});
        if(exist){
            return next(CustomErrorHandler.alreadyExist('This email is already exist'));
        }
        
        const hashedPassword = await bcrypt.hashSync(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        })

        const result = await user.save();


        const access_token = JwtService.sign({_id: result._id, role: result.role})

        res.cookie("token", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' // Set the secure flag to true in production
        });
        return res.status(201).send("User created successfully");
    } catch (error) {
        next(error);
    }
}

export default register;
