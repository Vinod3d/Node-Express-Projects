import mongoose from 'mongoose';

const connectDB = (url) => {
    return mongoose
        .connect(url, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        })
        .then(() => console.log("CONNECTED TO THE DB..."))
        .catch((err) => console.log(err));
};

export default connectDB;
