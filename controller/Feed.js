const Feed = require("../model/Feed");
//cloudinary
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDKEY,
    api_secret: process.env.CLOUDSECRET
});
// post feed
 const postFeed = async(req,res)=>{
  try { 
     const {map,time,distance,location,latitude,longitude} = req.body;

     if(map === true){
       const data = await Feed.create({
      distance: distance,
      time: time,
      location: location,
      latitude: latitude,
      longitude: longitude,
      feedTitle: req.body.title,
      feedDescription: req.body.description,
      userId: req.body.id
   })
      res.json({success: true, message: data});

     }else{
if (!req?.files?.feed)
      return res.json({success: false, message: "Please upload the feed image"});
    const file = req.files.feed;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: file.name,
      resource_type: "image",
      folder: "feed",
    });
    if(result){

   const data = await Feed.create({
      feed_pic_public_id: result.public_id,
      feed_picture_url: result.secure_url,
      feedTitle: req.body.title,
      feedDescription: req.body.description,
      userId: req.body.id
   })
      res.json({success: true, message: data});
    }
     }
  } catch (error) {
    console.log(error.message);
    res.json({success: false,message: error.message});
  }
};
//get Feed
 const getFeed = async(req,res)=>{
  try { 
  const data = await Feed.find({userId: req.body.id}).populate('userId', 'username petName petBreed  pet_picture_url default_picture_url');
      res.json({success: true, message: data});
    
  } catch (error) {
    console.log(error.message);
    res.json({success: false,message: error.message});
  }
};
//delete feed
const deleteFeed = async(req,res)=>{
    try {
      const {feedId,public_id} = req.body;
        const data = await Feed.findOne({feed_pic_public_id: public_id});
        if(!data){
             return res.json({success: false,message: "public_id does not exist"})
        }else{
const result =  await cloudinary.uploader.destroy(public_id);
if(result.result === 'ok'){

const doc =   await Feed.findByIdAndDelete({_id: feedId})
    if(doc){
res.json({success: true, message: "Feed has been deleted"});
    }else{
        console.log(error.message);
       res.json({success: false, message: error.message}); 
    }  
}else{
    res.json({success: true,message: result.result})
}
        }
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message: error.message});
    }
};


module.exports = {
   postFeed,
   getFeed,
   deleteFeed
}