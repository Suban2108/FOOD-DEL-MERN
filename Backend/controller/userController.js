import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from "validator"

//login user (POST)
const loginUser = async(req,res)=>{
    const {email,password} = req.body;

    try {
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success:false,message:"User Doesn't Exists"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch) {
            return res.json({success:false,message:"Invalid Credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true,message:"Logged In Successfully",token});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
}

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

//register user (POST)
const registerUser = async(req,res)=>{
    const {name,password,email} = req.body;

    try {

        //Checking is user already exists
        const exist = await userModel.findOne({email});
        if (exist){
           return res.json({success:false,message:"User Already Exists"});
        }

        //validating email and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valud email"});
        }
        
        if(password.length < 8){
            return res.json({success:false,message:"Please enter a strong password"});
        }


        //Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name,
            password:hashedPassword,
            email
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({success:true,token});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error Occured"});
    }
}

export {loginUser,registerUser};
