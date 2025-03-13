import express from 'express';
import connectDB from './config/connectDB.js';
import { MONGO_URI, PORT } from './config/Index.js';
import errorHandler from './middleware/errorHandlers.js';
import authRoutes from './routes/auth-routes.js'

const app = express();
const port = PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World');
});

// ROUTES
app.use('/api/auth', authRoutes);
app.use(errorHandler)
const start = async () => {
    try {
        await connectDB(MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error(error);
    }
};

start();
