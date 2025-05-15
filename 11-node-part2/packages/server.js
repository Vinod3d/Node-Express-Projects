
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { configureCors } from './config/corsConfig.js';
import rateLimitMiddleware from './middleware/rateLimiting.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(configureCors());
app.use(rateLimitMiddleware(100, 15)); // 100 requests per 15 minutes
app.use(express.urlencoded({ extended: true })); // support url-encoded bodies
app.use(express.json());

app.listen(PORT, ()=>{
    console.log(`Server is now running on port ${PORT}`);
});

