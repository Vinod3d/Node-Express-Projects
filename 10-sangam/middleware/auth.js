import jwt from"jsonwebtoken"
import { JWT_SECRET_KEY } from "../config/Index.js";

const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Access denied" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const verified = jwt.verify(token, JWT_SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}

export default authMiddleware;