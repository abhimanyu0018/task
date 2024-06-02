import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import validator from 'validator';
import bcrypt from "bcrypt";





const createToken = (_id) => {
return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}


export const signupController = async (req,res) => {
    try {
        const {name, email, password} = req.body

        if(!name || !email || !password ) {
            return res.status(500).json({success: false, message: "All fields must be filled" })
        }

        if(!validator.isEmail(email)){
            return res.status(500).json({success: false,message: "Email is not valid" })
        }

        const existUser = await User.findOne({email})

        if(existUser) {
            return res.status(500).json({success: false,message: "Email already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)

        const user = await User.create({name,email, password: hash})

        const token = createToken(user._id)

        return res.status(200).json({success: true, message: "signUp successful", token})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
}


export const loginController = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password ){
            return res.status(500).json({success: false,error: "All fields must be filled" })
        }
    
        if(!validator.isEmail(email)){
            return res.status(500).json({success: false,error: "Email is not valid" })
        }
    
        const existUser = await User.findOne({email})
    
        if(!existUser) {
            return res.status(500).json({success: false,error: "email is not exists"})
        }
    
        const match = await bcrypt.compare(password, existUser.password) 
    
        if(!match) {
            return res.status(500).json({success: false, message: "Incorrect Password"})
        }
    
        const token = createToken(existUser._id)
    
        return res.status(200).json({success: true, message: "Login successful",token})
      
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });

    }
}