const MarketPlace = require("../model/marketPlace");
//cloudinary
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDKEY,
    api_secret: process.env.CLOUDSECRET
});
// post feed
 const postMarketPlace = async(req,res)=>{
  try { 
    console.log(req.body);
if (!req?.files?.picture)
      return res.status(400).json({success: false, message: "Please upload the feed image"});
    const file = req.files.picture;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: file.name,
      resource_type: "image",
      folder: "market_place",
    });
    if(result){

   const data = await MarketPlace.create({
      product_pic_public_id: result.public_id,
      product_picture_url: result.secure_url,
      product_title: req.body.title,
      product_description: req.body.description,
      product_price: req.body.price,
      category:  req.body.category,
      userId: req.body.id
   })
      res.status(200).json({success: true, message: "Product added successfully",product_details: data});
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({success: false,message: error.message});
  }
};
//get Market place
 const getMarketPlace = async(req,res)=>{
  try { 
  const data = await MarketPlace.find();
      res.status(200).json({success: true, message: "Market products list loaded successfully",markets_list: data});
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({success: false,message: error.message});
  }
};
// get market details
 const getMarketDetails = async(req,res)=>{
  try { 
  const data = await MarketPlace.findOne({_id: req.body.id});
      res.status(200).json({success: true, message: "Market products details loaded successfully",product_details: data});
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({success: false,message: error.message});
  }
};
//delete feed
const deleteMarket = async(req,res)=>{
    try {
      const {feedId,public_id} = req.body;
        const data = await MarketPlace.findOne({product_pic_public_id: public_id});
        if(!data){
             return res.json({success: false,message: "public_id does not exist"})
        }else{
const result =  await cloudinary.uploader.destroy(public_id);
if(result.result === 'ok'){

const doc =   await Feed.findByIdAndDelete({_id: feedId})
    if(doc){
res.json({success: true, message: "Product has been deleted"});
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

const likeUnlikeMarket = async (req, res) => {
	try {
		const { userId,id } = req.body;
	
		const post = await MarketPlace.findById(id);

		if (!post) {
			return res.status(404).json({success:false, message: "Post not found" });
		}

		const userLikedPost = post.likes.includes(userId);

		if (userLikedPost) {
			// Unlike post
			await MarketPlace.updateOne({ _id: id }, { $pull: { likes: userId } });
			res.status(200).json({success: true, message: "Post unliked successfully" });
		} else {
			// Like post
			post.likes.push(userId);
			await post.save();
			res.status(200).json({success: true, message: "Post liked successfully" });
		}
	} catch (err) {
		res.status(500).json({succcess: false, message: err.message });
	}
};

module.exports = {
   postMarketPlace,
   getMarketPlace,
   deleteMarket,
   getMarketDetails,
   likeUnlikeMarket
}