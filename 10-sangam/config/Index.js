import { config } from "dotenv";
config();
export const {
    PORT,
    MONGO_URI,
    DEBUG_MODE,
} = process.env;