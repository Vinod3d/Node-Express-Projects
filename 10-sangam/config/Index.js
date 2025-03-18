import { config } from "dotenv";
config();
export const {
    PORT,
    MONGO_URI,
    DEBUG_MODE,
    JWT_SECRET_KEY
} = process.env;