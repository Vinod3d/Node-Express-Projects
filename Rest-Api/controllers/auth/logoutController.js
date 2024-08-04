import Joi from "joi";
import { RefreshToken } from "../../models/index.js";

const logout = async (req, res, next) => {
    const refreshSchema = Joi.object({
        refresh_token: Joi.string().required(),
    });

    const { error } = refreshSchema.validate(req.body);

    if (error) {
        return next(error);
    }

    try {
        const result = await RefreshToken.deleteOne({ token: req.body.refresh_token });
        
        if (result.deletedCount === 0) {
            return next(new Error('Refresh token not found'));
        }

        res.status(200).json({ message: "Successfully logged out" });
    } catch (error) {
        return next(new Error('Something went wrong in the database: ' + error.message)); 
    }
}

export default logout;
