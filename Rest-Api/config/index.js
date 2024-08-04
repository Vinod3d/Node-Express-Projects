import { configDotenv } from "dotenv";
configDotenv();
export const {
    APP_PORT,
    DEBUG_MODE,
    MONGO_URI,
    JWT_KEY,
    REFRESH_KEY
} = process.env;