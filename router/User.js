const express = require("express");
const {create,login,verifyOtp,checkEmail,resetPassword,uploadProfile,getProfile,allUsers,deleteAccount} = require("../controller/User");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/create",create);
 router.post("/login",login);
 router.post("/verifyOtp",verifyOtp);
 router.post("/checkEmail",checkEmail);
 router.post("/forgotPassword",resetPassword);
 router.post("/uploadPetProfile",uploadProfile);
 router.post("/profile",getProfile);
 router.post("/all",allUsers);
 router.post("/deleteAccount",deleteAccount);


 
module.exports = router;