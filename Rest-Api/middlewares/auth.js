import CustomErrorHandler from "../services/CustomErrorHandler.js";
import JwtService from "../services/JwtService.js";

const auth = (req, res, next) => {

    const token = req.cookies.token; 

    if (!token) {
        return next(CustomErrorHandler.unAuthorized("You Are Not valid user"));
    }

    try {
        const user = JwtService.verify(token);
        req.user = user; 
        next();
    } catch (error) {
        return next(CustomErrorHandler.unAuthorized("You Are Not valid user"));
    }
};

export default auth;
