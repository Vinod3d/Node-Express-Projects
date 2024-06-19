import Joi from "joi";
import { User } from "../../models/index.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import JwtService from "../../services/JwtService.js";
import bcrypt from 'bcrypt';

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,8}$')).required(),
    });

    const { error } = loginSchema.validate(req.body);

    if (error) {
        return next(error);
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(CustomErrorHandler.wrongCredentials());
        }

        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            return next(CustomErrorHandler.wrongCredentials());
        }

        const access_token = JwtService.sign({ _id: user._id, role: user.role });

        res.cookie("token", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });

        return res.send("You Logged in"); // Added return to ensure the response is correctly terminated
    } catch (error) {
        return next(error);
    }
}

export default login;
