const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

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
}


module.exports = UserController