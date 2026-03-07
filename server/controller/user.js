import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const Register = async (req, res) => {
  const { name, email, password, username } = req.body;
  try {
    if (!name || !email || !password || !username) {
      return res.status(400).json({ message: "Please fill all the field" });
    }
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: "Email already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      username,
    });
    res.status(201).json({ message: "Registration Successfull" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const Login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existinguser = await User.findOne({ username });

    if (!existinguser) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const compare = await bcrypt.compare(password, existinguser.password);

    if (!compare) {
      return res.status(400).json({ message: "Invalid User" });
    }

    const token = jwt.sign(
      { id: existinguser._id, username: existinguser.username },
      process.env.secret_key
    );
    res.status(201).json({ message: "Login Successfull", token: token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


//get profile

export const Profile= async(req,res)=>{
try {
  const profileUser=await User.findById(req.user.id).select('-password')
if(!profileUser){
  return res.status(400).json({message:"this profile not fond"})
}
res.status(200).json(profileUser)
} catch (error) {
  res.status(500).json({message:error})
}
}

