import express from "express";
import { APP_PORT, JWT_KEY, MONGO_URI } from "./config/index.js";
import userRoute from './routes/userRoute.js'
import cors from 'cors';
import errorHandler from "./middlewares/errorHandlers.js";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";

const app = express();  
const port = APP_PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser(JWT_KEY));
app.use('/api', userRoute); 
app.use(errorHandler);

const start = async () => {
    try {
        await connectDB(MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();