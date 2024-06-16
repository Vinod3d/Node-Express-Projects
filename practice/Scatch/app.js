require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/connectDB')
const ownersRouter = require("./routes/ownersRouter")
const usersRouter = require("./routes/usersRouter")
const productsRouter = require("./routes/productsRouter")
const indexRouter = require("./routes/index")
const expressSession = require("express-session");
const flash = require("connect-flash");


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: ,
        // secret: process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash());
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);





const port = process.env.PORT || 3000
const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
        console.log(`Server is running on ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()