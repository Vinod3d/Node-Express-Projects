import { User } from "../../models/index.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";

const user = async(req, res, next)=>{
    // res.json(req.user);
    try {
        const user = await User.findOne({_id: req.user._id})
        if(!user){
            return next(CustomErrorHandler.notFound())
        }

        res.json(user);
    } catch (error) {
        return next(error);
    }
};

export default user;