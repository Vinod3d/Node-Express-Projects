const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const upload = require("./config/multerconfig");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(cookieParser());

app.get('/test', (req, res) => {
    res.render("test");
});

app.post('/upload', isLoggedIn, upload.single('file'), async (req, res) => {
    const user = await userModel.findOne({email: req.user.email})
    user.profilepic = req.file.filename;
    user.save();

    if (req.file) { 
        res.send('uploaded');
      } else {
        res.send('No file uploaded');
      } 
});

app.get('/', isLoggedIn, (req, res) => {
    res.render("index");
});


app.get('/login', (req, res) => {
    res.render("login");
});

app.get('/profile', isLoggedIn, async  (req, res) => {
    const user = await userModel.findOne({email: req.user.email}).populate("posts");
    res.render("profile", {user});
});

app.get('/like/:id', isLoggedIn, async  (req, res) => {
    const post = await postModel.findOne({_id: req.params.id}).populate("user");
    if(post.likes.indexOf(req.user.userid) === -1){
        post.likes.push(req.user.userid);
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid), 1)
    }
    await post.save();
    
    res.redirect("/profile")
});

app.get('/edit/:id', isLoggedIn, async  (req, res) => {
    const post = await postModel.findOne({_id: req.params.id}).populate("user");
    
    res.render("edit", {post});
});

app.post('/update/:id', isLoggedIn, async  (req, res) => {
    const post = await postModel.findOneAndUpdate({_id: req.params.id}, {title: req.body.title, content: req.body.content});
    
    res.redirect("/profile");
});

app.get('/delete/:id', isLoggedIn, async  (req, res) => {
    const post = await postModel.findOneAndDelete({_id: req.params.id});
    
    res.redirect("/profile");
});

app.post('/post', isLoggedIn, async  (req, res) => {
    const user = await userModel.findOne({email: req.user.email});
    const {title, content} = req.body;
    const post = await postModel.create({
        user: user._id,
        title,
        content
    });

    user.posts.push(post._id)
    await user.save();
    res.redirect("/profile");   
});

app.post('/register', upload.single('file'), async (req, res) => {
    let {username, name, email, age, password} = req.body;
    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("User already registered")
    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = await userModel.create({
        username,
        name,
        email,
        age,
        profilepic: req.file ? req.file.filename : 'default.png',
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
    res.status(200).cookie("token", token, { httpOnly: true, secure: true }).redirect("/profile");
});

app.get('/logout', async (req, res) => {
    res.clearCookie('token')
    res.redirect("login")
});

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).redirect("/login");
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
