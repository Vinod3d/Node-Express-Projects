import { configDotenv } from "dotenv";
configDotenv();
export const {
    APP_PORT,
    DEBUG_MODE,
    MONGO_URI,
    JWT_KEY
} = process.env;