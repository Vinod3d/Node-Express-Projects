import { config } from "dotenv";
config();
export const {
    PORT,
    MONGO_URI,
    DEBUG_MODE,
    JWT_SECRET_KEY,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME,
} = process.env;