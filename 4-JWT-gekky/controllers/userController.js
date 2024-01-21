const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const { transporter } = require('../config/emailConfig')

class UserController {
    static userRegistration = async (req, res)=> {
        const {name, email, password, password_confirmation, tc} = req.body
        const user = await UserModel.findOne({email: email})
        if(user){
            return res.status(401).send({error:'Email already in use.'})
        }else{
            if(name && email && password && password_confirmation && tc){
                if(password === password_confirmation){
                    try {
                        const salt = await bcrypt.genSalt(10)
                        const hashedPassword = await bcrypt.hash(password, salt)
                        const doc = new UserModel ({
                            name: name,
                            email: email,
                            password: hashedPassword,
                            tc :tc
                        })
                        await doc.save()
                        const saved_user = await UserModel.findOne({email : email})
                        
                        // Generate JWT Token
                        const token = JWT.sign({id:saved_user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '5d'})
                        res.status(200).send({"status" : "success", "message" : "Registration Success", 'token' : token})
                    } catch (error) {
                        return res.status(500).send({error:"Internal server error."})
                        
                    }
                } else{
                    return res.status(406).send({error:"Passwords don't match"})
                }
            } else{
                return res.status(400).send({ error: 'All fields are required' })
            }
        }

    }

    static userLogin = async(req, res)=>{
        try {
            const {email, password} = req.body
            if(email && password){
                const user = await UserModel.findOne({email: email})
                if(user != null){
                    const isValid = await bcrypt.compare(password, user.password)
                    if((user.email === email) && isValid){
                         // Generate JWT Token
                         const token = JWT.sign({id:user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '5d'})
                        res.status(200).send({"status" : "success", "message" : "Login Success", "token": token})
                    }else{
                        return res.status(401).json({"Error":"Invalid Email or Password"})
                    }

                } else {
                    return res.status(401).send({error:'User not found.'})
                }
            } else{
                res.send({"status" : "failed", "message" : "All Fields are Required"})
            }
        } catch (error) {
            
        }
    }


    static changeUserPassword = async (req, res) =>{
        const {password, password_confirmation} = req.body
        if(password && password_confirmation){
            if(password !== password_confirmation){
                res.send({"status" : "failed", "message" : "New Password and Confirm New Password doesn't match"})
            } else{
                const salt = await bcrypt.genSalt(10)
                const newHashedPassword = await bcrypt.hash(password, salt)
                await UserModel.findByIdAndUpdate(req.user._id, {$set : {password: newHashedPassword}})
                res.send({"status" : "success", "message" : "Password changed succesfully"})
            }
        } else{
            res.send({"status" : "failed", "message" : "All Fields are Required"})
        }
    }


    static loggedUser = async (req, res)=>{
        res.send({"user" : req.user})
    }


    static sendUserPasswordResetEmail = async (req, res) => {
        try {
            const { email } = req.body;

            if (!email) {
                return res.send({ "status": "failed", "message": "Email Field is required!" });
            }

            const user = await UserModel.findOne({ email });

            if (user) {
                const secret = user._id + process.env.JWT_SECRET_KEY;
                const token = JWT.sign({ userID: user._id }, secret, { expiresIn: '15m' });
                const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`;
                console.log(link);

                     // Send Email
                    // const info = await transporter.sendMail({
                    //     from: process.env.EMAIL_FROM,
                    //     to: email,
                    //     subject: 'Your Password Reset Link',
                    //     html: `<a href=${link}>Click Here</a> to Reset Your Password`
                    // });

                    const mailoptions = {
                        from: process.env.EMAIL_FROM,
                        to: email,
                        subject: 'portfolio',
                        text: 'Your Password Reset Link',
                        html: `<a href=${link}>Click Here</a> to Reset Your Password`
                    }
                    
                    transporter.sendMail(mailoptions, (err, result) => {
                        if (err){
                        console.log(err)
                            res.json('opps error occured')
                        } else{
                            res.json('thanks for e-mailing me');
                        }
                    })
                
                
               
                res.send({
                    "status": "success",
                    "message": "Password Reset Email Sent... Please Check Your Email",
                    "info": info
                });
            } else {
                res.send({ "status": "failed", "message": "Email doesn't exist" });
            }
        } catch (error) {
            console.error('Error sending password reset email:', error);
            res.status(500).send({ "status": "failed", "message": "Internal Server Error" });
        }
    }


    static userPasswordReset = async(req, res)=>{
        const {password, password_confirmation} = req.body
        const {id, token} = req.params
        const user = await UserModel.findById(id)
        const new_secret = user._id + process.env.JWT_SECRET_KEY
        try {
            JWT.verify(token, new_secret)
            if(password && password_confirmation){
                if(password === password_confirmation){
                    if(password !== password_confirmation){
                        res.send({"status":"failed", "message":"New Password and Confirm New Password doesn't match"})
                    } else{
                        const salt = await bcrypt.genSalt(10)
                        const newHashedPassword = await bcrypt.hash(password, salt)
                        await UserModel.findByIdAndUpdate(user._id, {$set : {password: newHashedPassword}})
                        res.send({"status" : "success", "message" : "Password Reset succesfully"})
                    }
                }
            } else{
                return res.send({"status":"failed", "message":"Both fields are required!"})
            }
        } catch (error) {
            res.send({"status" : "failed", "message": "Invalid Token"})
        }
    }
}


module.exports = UserController