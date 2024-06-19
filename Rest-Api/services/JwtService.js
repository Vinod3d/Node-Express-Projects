import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/index.js";

class JwtService {
    static sign (payload, secret = JWT_KEY, expiry = '1d',){
        return jwt.sign(payload, secret, { expiresIn: expiry });
    }

    static verify(token, secret = JWT_KEY) {
        return jwt.verify(token, secret);
    }
}

export default JwtService;