const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


app.use(cookieParser());

app.get("/", function(req, res){
//    bcrypt.genSalt(10, function(err, salt){
//     bcrypt.hash("password", salt, function(err, hash){
//         console.log(hash);
//     })
//    })


let token = jwt.sign({email: "vinodchandra979@gmail.com"}, "secret");
res.cookie("token", token);
console.log(token)
res.send("hello")
})

app.get("/read", function(req, res){
    let data = jwt.verify(req.cookies.token, "secret");
    console.log(data)
})

app.listen(3000);