const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const jwt = require("jsonwebtoken");

const registerUser = async function (req, res) {
  try {
    let { email, password, fullname } = req.body;
    let user = await userModel.findOne({ email });
    if (user)
      return res.status(401).send("You already have an accound, please login");
    const haspassword = bcrypt.hashSync(password, 10);
    let userCreated = await userModel.create({
      fullname,
      email,
      password: haspassword,
    });

    let token = generateToken(userCreated);
    res.cookie("token", token);
    res.status(201).send("user created successfully")
  } catch (error) {
    res.send(error.message);
  }
};


const loginUser = async (req, res)=>{
    let {email, password} = req.body;

    let user = await userModel.findOne({email: email});
    if(!user) return res.send("Email or Password incorrect")
    let validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      res.send('Invalid email or password');
    }

    let token = generateToken(user);
    res.cookie("token", token);
    res.send("You Logged in")
};

module.exports = {
  registerUser,
  loginUser
};
