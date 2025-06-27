const  Post = require('../model/Post');
const cloudinary = require("../config/cloudinary")
 const uploadPost = async(req,res)=>{
  try { 
    console.log(req.body);
if (!req?.files?.picture)
      return res.status(400).json({success: false, message: "Please upload the feed image"});
    const file = req.files.picture;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: file.name,
      resource_type: "image",
      folder: "post_feeds",
    });
    if(result){

   const data = await Post.create({
      public_id: result.public_id,
      imageUrl: result.secure_url,
      caption: req.body.caption,
      user: req.body.id
   })
      res.status(200).json({success: true, message: "Post added successfully",post_details: data});
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({success: false,message: error.message});
  }
};


const uploadedPosts = async(req,res)=>{
  try {
    const post = await Post.find()
      .populate("user", "username avatar")
      // .populate({
      //   path: "comments",
      //   populate: { path: "user", select: "username profilePicture" },
      // })
     
    // if (!post) {
    //   return res.status(400).json({success: false, message: "Post not found" })
    // }

    res.status(200).json({success: true, message: "Posts fetched successfully.", data: post});
  } catch (error) {
    res.status(500).json({success: false, message: error.message })
  }
}
  //post favorite
const postFavorite = async (req, res) => {
  try {
    const data = await Post.findOne({ _id: req.body.postID });
      console.log(data)
    if (!data) {
      return res.status(400).json({ success: false, message: "Post not found" })
    }
    const favExists = data.likes.some(fav => fav.equals(req.body.userID));
    console.log(favExists)
    if (favExists) {
 const doc = await Post.findByIdAndUpdate(
      data._id,
      { $unset: { likes: "" } },
      { new: true }
    );
     res.status(200).json({ success: true, message: "You removed from the favorite" });
  
    }else{
    data.likes.push(req.body.userID);
    await data.save();
    return res.status(200).json({ success: true, message: "You favorite the pet." });
    }
   
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }


//  try {
//     const post = await Post.findById(req.body.)

//     if (!post) {
//       return res.status(404).json({ message: "Post not found" })
//     }

//     // Check if user already liked the post
//     const index = post.likes.indexOf(req.body.postID)

//     if (index === -1) {
//       // Like the post
//       post.likes.push(req.body.postID)
//     } else {
//       // Unlike the post
//       post.likes.splice(index, 1)
//     }

//     const updatedPost = await post.save()
//       res.status(200).json({success: true, message: "post like" })
//   } catch (error) {
//     res.status(500).json({success:false, message: error.message })
//   }
};


module.exports =  {
    uploadPost,
    uploadedPosts,
    postFavorite
}