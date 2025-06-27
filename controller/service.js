const Service = require("../model/Service");

//cloudinary
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDKEY,
    api_secret: process.env.CLOUDSECRET
});
//Saving information of the service provider
const addInformation = async(req,res)=>{
 try { 
if (!req?.files?.picture)
      return res.json({success: false, message: "Please upload the feed image"});
    const file = req.files.picture;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: file.name,
      resource_type: "image",
      folder: "service_provider",
    });
    if(result){

   const data = await Service.create({
      service_provider_public_pic_id: result.public_id,
      service_provider_picture_url: result.secure_url,
      service_provider_first_name: req.body.firstName,
      service_provider_last_name: req.body.lastName,
      service_provider_address: req.body.address,
      service_description: req.body.description,
      service_duration: req.body.duration,
      service_fee: req.body.price,
      userId: req.body.id
   })
      res.json({success: true, message: data});
    }
  } catch (error) {
    console.log(error.message);
    res.json({success: false,message: error.message});
  }
}
//get service provider informtion
 const getService = async(req,res)=>{
  try { 
  const data = await Service.find({userId: req.body.id}).populate('userId', '_id username');
      res.json({success: true, message: data});
    
  } catch (error) {
    console.log(error.message);
    res.json({success: false,message: error.message});
  }
};
// add reviews
const addReviews = async(req,res)=>{
  try {
     const data = await Service.findOne({userId: req.body.id});
    if (!data) {
      return res.json({success: false, message: "User not found"})
    }
    const reviewExists = data.reviews.some(review => review.hirePerson.equals(req.body.hireId));
    if (reviewExists) {
       averageRating(req.body.providerId)
      return res.json({success: false, message: "Review by this user already exists"});
    }
    data.reviews.push(req.body);
   const doc = await data.save();
   if(doc){
    averageRating(req.body.providerId)
   }
    return res.json({success: true, message: "Review saved successfully"}); 
  } catch (error) {
    console.log(error.message);
    return res.json({success: false, message: "Internal server error"});
  }
}
//change service status
const changeServiceStatus = async(req,res)=>{
    try {
      const {service_status,service_provider_id} = req.body;
   const service = await Service.findOne({userId: service_provider_id});
   if(service_status === "Completed" ){
    const admin_amount  = service.service_fee * 0.10;
     const provider_balance = service.service_fee - admin_amount;
      let accountCredit = service.balance + provider_balance 
     
     const data = await Service.findByIdAndUpdate(
            {_id: service_provider_id},
            {$set: {balance: accountCredit, service_status: service_status }},
            {new: true});
            res.json({success: true, message: "Thankyou for trusting our platform."})
   }else{
     const data = await Appointment.findByIdAndUpdate(
            {_id: service_provider_id},
            {$set: {service_status: 'InCompleted'}},
            {new: true});
    res.json({success: true, message: "Service is incomplete"})
   }

    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: error.message});
    }
}


module.exports = {
    addInformation,
    getService,
    addReviews,
    changeServiceStatus
}