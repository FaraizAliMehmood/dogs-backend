const bcrypt = require("bcryptjs")
const User = require("../model/User");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const moment = require("moment");
require("dotenv").config();

//cloudinary
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDKEY,
    api_secret: process.env.CLOUDSECRET
});
// mail transporter
let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth:{
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    }
});
// generate otp
function generateOTP() {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp.toString();
}
//check otp expiration
function isOTPExpired(createdAt){
    const expirationTime = moment(createdAt).add(10,"minutes")
    return moment()>expirationTime;
}
// register user
const create = async(req,res)=>{
    try {
        let check = await User.findOne({email: req.body.email});
        if(check){
           return  res.status(400).json({success:false,message: "Sorry a user with this email already exist"})
        }else{
    const otp = generateOTP();
     const salt = await bcrypt.genSalt(10);
     const securePass = await bcrypt.hash(req.body.password,salt)
          check = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: securePass,
                otp: otp
            });
            const user = await User.findByIdAndUpdate(
              {_id: check._id},
              {$set: {otp: "", account_verified: true}},
              {new: true}).select("-password");

            res.status(200).json({success:true, message: "Account have been created successfully",user_details:{
              id: user._id,
              username: user.username,
              email: user.email,
              status: user.status,
              avatar:user.avatar,
              role: user.role,
              createdAt: user.createdAt,
              lastSeen: user.lastSeen,
              account_deleted: user.account_deleted
            },
            });
          }
    } catch (error) {
      console.log(error.message);
       return res.json({success:false,message: "Internal server error"});
    }
};
// user login
const login = async(req,res)=>{
    const { email, password } = req.body;
  try {
    let user = await User.findOne({email: email });
    if (!user) {
      return res.status(400).json({success: false, message: "Please enter the correct email" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ success:false, message: "Please enter the correct password", });
    }
      // Generate token
     // const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
      // Return user data and token
      res.status(200).json({
        success: true,
        message: 'Login successful',
        user_details: {
          id: user._id,
          username: user.username,
          email: user.email,
          status: user.status,
          avatar:user.avatar,
          role: user.role,
          createdAt: user.createdAt,
          lastSeen: user.lastSeen,
          account_deleted: user.account_deleted
        },
       
      });
    //  if(user.account_verified === false){
    //    const otp = generateOTP();
    //    const Data = await User.findByIdAndUpdate(
    //                 {_id: user._id},
    //                 {$set: {otp: otp}},
    //                 {new: true});
    //    let mailOption = {
    //             from: process.env.SMTP_MAIL,
    //             to: req.body.email,
    //             subject: "Otp verification",
    //             text: `Your otp code is${otp} and do remember otp will expire after 10 minutes.`
    //           //  text: `Your otp is: ${otp} will expire after 10 minutes`
    //         };
    //         transporter.sendMail(mailOption,function(error){
    //       if(error){
    //         console.log(error.message);
    //       return  res.status(500).json({success:false, message: "Error in google server"})
    //       }else{
    //         res.status(200).json({success:true, message: "Please check your email code has been sent.",user_details: null})
    //       }
    //         });
    //  }else{
  
    //   // res.status(200).json({success: true,user_details: user});
    //  }
  } catch (error) {
     console.error(error.message);
     return res.status(500).json({success: false, message: error.message});
  }
};
// verify patient
const verifyOtp = async(req,res)=>{
    try {
        let user = await User.findOne({otp: req.body.otp});
        if(!user){
          return res.status(400).json({success:false, message: "Code not found"})
        }else{
           
           const isExpired = isOTPExpired(user.updatedAt);
            if(isExpired){
                 res.status(400).json({success:false, message: "Your otp is expired"})
            }else{
                const Data = await User.findByIdAndUpdate(
                    {_id: user._id},
                    {$set: {otp: "", account_verified: true}},
                    {new: true}).select("-password");
    // const data = {
    //   user: {
    //     id: user.id
    //   }
    // }
    // const accessToken = jwt.sign(data,process.env.JWT_SECRET_KEY);
       res.status(200).json({success: true, message:"account verified successfully",user_details: Data});
            }
            }
        }catch (error) {
      console.log(error.message);
       return res.status(500).json({success:false, message: "Internal server error"})
    }
};
// check user email
const checkEmail = async(req,res)=>{
    try {
     const user = await User.findOne({email: req.body.email});
     if(!user){
        return res.status(400).json({success:false, message: "User with this email does not exist"})
     }else {
      res.status(200).json({success:true, message: "Email exist",uid: user._id});
        // const otp = generateOTP();
        //    await User.findByIdAndUpdate(
        //             {_id: user._id},
        //             {$set: {otp: otp}},
        //             {new: true});
        //   let mailOption = {
        //         from: process.env.SMTP_MAIL,
        //         to: req.body.email,
        //         subject: "Otp verification",
        //           text: `Your otp code is${otp} and do remember otp will expire after 10 minutes.`
        //     };
        //     transporter.sendMail(mailOption,function(error){
        //   if(error){
        //   return  res.status(500).json({success:false, message: error})
        //   }else{
            
        //   }
            //});          
     }
    } catch (error) {
      console.log(error.message);
       return res.status(500).json({success:false, message: 'Internal server error'})
    }
}
//reset password
const resetPassword = async(req,res)=>{
    try {
        const data = await User.findOne({ _id: req.body.id });
    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(req.body.password, salt);
     const userData = await User.findByIdAndUpdate(
      { _id: data._id },
      { $set: { password: securePass }},
      { new: true }
    );
    res.status(200).json({success:true, message: "Your password has been updated"});
    } catch (error) {
      console.log(error.message);
       return res.status(500).json({success:false, message: 'Internal server error'})
    }
}
//upload profile
 const uploadProfile = async(req,res)=>{
  try { 
if (!req?.files?.profile)
      return res.json({success: false, message: "Please upload an image"})
    const file = req.files.profile;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: file.name,
      resource_type: "image",
      folder: "pet",
    });
    if(result){
           const data = await User.findByIdAndUpdate(
        { _id: req.body.id },
        {
          $set: {
        "petName": req.body.petName,
        "breedName": req.body.breedName,
        "Dob": req.body.dob,
        "petCharacter": req.body.petCharacter,
        "description": req.body.description,
        "pet_pic_public_id": result.public_id,
        "pet_picture_url": result.secure_url
          },
        },
        { new: true }
      );
      res.json({success: true, message: data});
    }
  } catch (error) {
    console.log(error.message);
    res.json({success: false,message: error.message});
  }
};
// get profile
const getProfile = async(req,res)=>{
   try {
    const user = await User.findById({_id: req.body.id}).select("-password")
    res.status(200).json({success: true, user_details: user })
  } catch (error) {
    console.error(error.message);
  return  res.status(500).json({success: false, message:"Internal Server Error"});
  }
};
// Get all users
const allUsers = async(req,res)=>{
 try {
    const users = await User.find({ _id: { $ne: req.body.user } }).select('-password');
    res.status(200).json({success: true, message: "users fetched successfully",data: users});
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({success:false,  message: error.message });
  }
}

// delete account
const deleteAccount = async(req,res)=>{
  try {
     const userData = await User.findByIdAndUpdate(
      { _id: req.body.id },
      { $set: { account_deleted: true }},
      { new: true }
    );
    res.status(200).json({success:true, message: "Your account has been deleted."});
  } catch (error) {
    res.status(500).json({success: false, message: error.message})
  }
}






module.exports={
    create,
    login,
    checkEmail,
    verifyOtp,
    resetPassword,
    uploadProfile,
    getProfile,
    allUsers,
    deleteAccount
}
