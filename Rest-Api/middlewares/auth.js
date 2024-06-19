import CustomErrorHandler from "../services/CustomErrorHandler.js";
import JwtService from "../services/JwtService.js";

const auth = (req, res, next) => {

    const token = req.cookies.token; 
    console.log(token);

    if (!token) {
        return next(CustomErrorHandler.unAuthorized());
    }

    try {
        const user = JwtService.verify(token);
        req.user = user; 
        next();
    } catch (error) {
        return next(CustomErrorHandler.unAuthorized());
    }
};

export default auth;
