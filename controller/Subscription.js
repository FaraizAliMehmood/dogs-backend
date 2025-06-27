const Subscription = require("../model/Subscription")
// post subscription
 const postSubscription = async(req,res)=>{
  try { 
     const {title,price,duration,likes,rewind,travel,ads,boost,id} = req.body;

       const data = await Subscription.create({
      subscription_title: title,
      subscription_price: price,
      subscription_duration: duration,
      likes: likes,
      rewinds: rewind,
      travel: travel,
      advertisement: ads,
       boost: boost
   })
      res.json({success: true, message: data});

  } catch (error) {
    console.log(error.message);
    res.json({success: false,message: error.message});
  }
};

//  get subscription
const getSubscription = async(req,res)=>{
  try { 
     const data = await Subscription.find()

      res.json({success: true, message: data});

  } catch (error) {
    console.log(error.message);
    res.json({success: false,message: error.message});
  }
};

module.exports = {
    postSubscription,
    getSubscription
}