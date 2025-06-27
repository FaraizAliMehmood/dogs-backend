 const cloudinary = require("../config/cloudinary");
const Pet = require("../model/Pet");
const User = require("../model/User");
const basicInfo = async (req, res) => {
    try {
      console.log(req.body);
if (!req?.files?.picture)
      return res.status(400).json({success: false, message: "Please upload the profile image"});
    const file = req.files.picture;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: file.name,
      resource_type: "image",
      folder: "dogs_profile",
    });
        const {user,name,gender,dob,weight,breed} = req.body
          const data = await Pet.create({
      user: user,
      name: name,
      gender: gender,
      dob: dob,
      weight: weight,
      breed:breed,
      public_id:result.public_id,
      profile_pic_url: result.secure_url
     });
        res.status(200).json({success: true, message: "Basic information has been saved successfully", pet_details: data})
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  };
// personality
const personality = async (req, res) => {
    try {
      const check = await Pet.findOne({ user: req.body.user });
      if (check) {
          const details = await Pet.findByIdAndUpdate(check._id, req.body, {
        new: true,
      });
        res.status(200).json({ success: true,message: "Personality added successfully", pet_details: details });
      }
      
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
// Health care
const healthCare = async (req, res) => {
    try {
      const check = await Pet.findOne({ user: req.body.user });
      if (check) {
          const details = await Pet.findByIdAndUpdate(check._id, req.body, {
        new: true,
      });
        res.status(200).json({ success: true,message: "Health added successfully", pet_details: details });
      }
      
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  // Owner info
const ownerInfo = async (req, res) => {
    try {
      const check = await Pet.findOne({ user: req.body.user });
      if (check) {
          const details = await Pet.findByIdAndUpdate(check._id, req.body, {
        new: true,
      });
        res.status(200).json({ success: true,message: "Owner info has been added successfully", pet_details: details });
      }
      
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
    //Activity & Schedule
const activitySchedule = async (req, res) => {
    try {
      const check = await Pet.findOne({ user: req.body.user });
      if (check) {
          const details = await Pet.findByIdAndUpdate(check._id, req.body, {
        new: true,
      });
        res.status(200).json({ success: true,message: "Activity & Schedule has been added successfully", pet_details: details });
      }
      
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  //Miscellaneous
const miscellaneous = async (req, res) => {
    try {
      const check = await Pet.findOne({ user: req.body.user });
      if (check) {
          const details = await Pet.findByIdAndUpdate(check._id, req.body, {
        new: true,
      });
        res.status(200).json({ success: true,message: "Miscellaneous has been added successfully", pet_details: details });
      }
      
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  // gallery
  const gallery = async(req,res)=>{
 try {
 

 if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const files = req.files.images;
        console.log(files)
        const uploadResults = [];

        // If a single file is uploaded, convert it to an array
        const filesArray = Array.isArray(files) ? files : [files];

        for (const file of filesArray) {
                   const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: file.name,
      resource_type: "image",
      folder: "dogs_gallery",
    });
            uploadResults.push(result.secure_url);
        }
         
        const check = await Pet.findOne({ user: req.body.user });
        if(check){
    //       check.gallery.push(uploadResults);
    // await check.save();
 const data = await Pet.findByIdAndUpdate(
          { _id: check._id },
          {
            $set: { 
             "gallery": uploadResults
            },
          },
          { new: true });
          res.status(200).json({ success: true,message: "Gallery images uploaded", pet_details: check});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
  }

  // pet profiles
  const profiles = async(req,res)=>{
    try {
       const data = await Pet.find().populate('user','_id username');
    res.status(200).json({success: false, message: "Profiles fetched", data: data});
    } catch (error) {
      res.status(500).json({success: false, message: error.message})
    }
  }
  // single profile
const profile = async(req,res)=>{
    try {
       const data = await Pet.findOne({user: req.body.user}).populate('user','_id username');
    res.status(200).json({success: false, message: "Profile fetched", pet_details: data});
    } catch (error) {
      res.status(500).json({success: false, message: error.message})
    }
  }

  //post favorite
const postFavorite = async (req, res) => {
  try {
    const { user} = req.body;
    const data = await Pet.findOne({ _id: user });
    if (!data) {
      return res.status(400).json({ success: false, message: "Pet not found" })
    }
    const favExists = data.likes.some(fav => fav.user.equals(user));
    if (favExists) {
 const doc = await Pet.findByIdAndUpdate(
      data._id,
      { $unset: { likes: "" } },
      { new: true }
    );
     res.status(200).json({ success: true, message: "You removed from the favorite" });
  
    }else{
    data.likes.push(req.body);
    await data.save();
    return res.status(200).json({ success: true, message: "You favorite the pet." });
    }
   
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
//remove favorite
const removeFavorite = async (req, res) => {
  try {
    const { user } = req.body;
     const data = await Pet.findOne({user: user});
     if(data){
 const doc = await Pet.findByIdAndUpdate(
      data._id,
      { $unset: { likes: "" } },
      { new: true }
    );
     res.status(200).json({ success: true, message: "You removed from the favorite" });
     } else {
      res.status(400).json({ success: false, message: "Something went wrong." });
    }

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message});
  }
}



  module.exports = {
  basicInfo,
  personality,
  healthCare,
  ownerInfo,
  activitySchedule,
  miscellaneous,
  gallery,
  profiles,
  profile,
  postFavorite,
  removeFavorite
  }