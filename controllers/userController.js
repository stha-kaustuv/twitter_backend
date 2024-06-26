import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const Register = async (req,res) =>{
    try{
        const {name,username,email,password}=req.body;
       
    
        if(!name || !username || !email || !password){
            return res.status(401).json({
                message:"All fields must be filled.",
                success:false   
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                message:"User already exist.",
                success:false 
            })
        }
        const hashedPassword = await bcryptjs.hash(password,16);

        await User.create({
            name,
            username,
            email,
            password:hashedPassword
        });
        return res.status(201).json({
            message:"Account created successfully.",
            success:true
        }) 
    }
    catch(error){
            console.log(error);
    }
}
export const Login = async(req,res)=>{
    try{
      
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(401).json({
                message:"All fields must be filled.",
                success:false
        })
     };
     const user = await User.findOne({email});
     if(!user){
        return res.status(401).json({
            message:"Invalid email or password.",
            success:false
        })
     }
     const isMatch= await bcryptjs.compare(password,user.password); 
     if(!isMatch){
        return res.status(401).json({
            message:"Invalid email or password",
            sucess:false
        });
     }
     const tokenData ={
        userId:user._id
     }
     const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });
  

     res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // 1 day in milliseconds
     
     res.json({
       message: `Welcome back ${user.name}`,
       token : token,
       success: true,
     });
    }
    
    catch(error){
            console.log(error);
    }
}
export const Logout = (req,res)=>{
        return res.cookie("token","",{expiresIn:new Date(Date.now())}).json({
            message:"Logout Successfull",
            success:true
        })
}

