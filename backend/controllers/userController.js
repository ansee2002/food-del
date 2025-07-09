import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


// Generate JWT token 
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d"});
};

// login user
const loginUser = async (req,res) => {
   const{email,password} = req.body;
   try {
    const user = await  userModel.findOne({email});

    if (!user) {
        return res.json({success:false,message:"User Doesn't exist"});
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if (!isMatch) {
     return res.json({success:false,message:"Invalid credentials"});   
    }

    const token = createToken(user._id);
    res.json({success:true,token});
    
   } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
   }
}

// const createToken = (id) => {
//     return jwt.sign({id},process.env.JWT_SECRET);
// }

// register user
const registerUser = async (req,res) => {
  const {name,password,email} = req.body;
  try {
    // checking is user already exists
    const exists = await userModel.findOne({email});
    if (exists) {
      return res.json({success:false, message:"User already exists"});  
    }

    // validating email format and a strong password
    if (!validator.isEmail(email)) {
       return res.json({success:false, message:"Please enter valid email"});   
    }

    if (password.length<8) {
        return res.json({success:false,message:"Please enter a strong password"});
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await  bcrypt.hash(password,salt);


    const newUser =  new userModel({
        name,
        email,
        password:hashedPassword
    });

     const user = await newUser.save();
     const token = createToken(user._id);
     res.json({success:true,token});
  } catch (error) {
    console.log( "Registration error:",error);
    res.json({success:false,message:"Error"});
  } 
}

// fetch User profile
const getUserProfile = async (req,res) => {
  try {
    const user = await userModel.findById(req.body.userId).select("-password");
    if(!user){
      return res.status(404).json({success:false, mesage:"User not found"});
    }
    res.json({success:true,user});
  } catch (error) {
    console.log("Profile fetch error:",error);
    res.status(500).json({success:false,message:"Server error"});
  }
};

//update User profile
const updateUserProfile = async (req,res) => {

  
  try {
    const user = await userModel.findById(req.body.userId);
    // console.log(req.body);
    let nPasword;
    if(!user){
      return res.status(404).json({success:false,message:"User not found"});
    }
    const {name,email,password,userId} = req.body;

    //check if email is changed and already exists
    if (email && email !== user.email){
      const emailExists = await userModel.findOne({email});
      if(emailExists){
        return res.status(400).json({success:false,message:"Email already in use"});
      }
    }
    user.name = name || user.name;
    user.email = email || user.email;
    delete(user.password)
// console.log(user);
    //  hash new  password if updated
    if (password) {
      // console.log(password);
      
      const salt = await bcrypt.genSalt(10);
     nPasword = await bcrypt.hash(password,salt);
    }
    
    const newUser = {name :name, password:nPasword,email}

     const an = await userModel.findByIdAndUpdate({_id:userId},newUser,{new:true})
    const user2= await an.save();
    // console.log(user2);
    
    res.json({success:true,mesage:"Profile updated successfully"});

  } catch (error) {
    console.log("Profile update error",error);
    res.status(500).json({success:false, message:"Server error"});
  }
};

export { loginUser, registerUser, getUserProfile, updateUserProfile };