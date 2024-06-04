const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(cookieParser());

app.get('/', isLoggedIn, (req, res) => {
    res.render("index");
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.get('/profile', isLoggedIn,  (req, res) => {
    console.log(req.user);
    res.render("login");
});

app.post('/register', async (req, res) => {
    let {username, name, email, age, password} = req.body;
    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("User already registered")
    const hashPassword = bcrypt.hashSync(password, 10);
    console.log(hashPassword)

    const newUser = await userModel.create({
        username,
        name,
        email,
        age,
        password: hashPassword
    })
    res.status(200).send("registered");
});

app.post('/login', async (req, res) => {
    let {email, password} = req.body;
    let user = await userModel.findOne({email});
    if(!user) return res.status(500).send("Something went wrong");
    const validPassword = bcrypt.compareSync(password, user.password);

    if(!validPassword){
        res.status(401).send("Please Enter valid email and password");
    }
    const token = jwt.sign({email: email, userid: user._id}, "Secret", { expiresIn: '1d' });
    res.status(200).cookie("token", token, { httpOnly: true, secure: true }).send("logedin");
});

app.get('/logout', async (req, res) => {
    res.clearCookie('token')
    res.redirect("login")
});

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Login required' });
    }
  
    try {
      const decoded = jwt.verify(token, "Secret");
      req.user = decoded;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  }
  



app.listen(3000, function() {
    console.log('Server is running on port 3000');
});
