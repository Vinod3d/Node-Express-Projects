import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    }, 
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    }
},{timestamps:true})


// FOR HASHING PASSWORD
UserSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

export const User = mongoose.model("User", UserSchema);