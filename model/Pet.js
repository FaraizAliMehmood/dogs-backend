const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
   user: {
         type: mongoose.Schema.Types.ObjectId, ref: 'PetProfiles'
    },
},{
  timestamps: true
});

const petSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
       },
    name:{
        type: String
    },
    gender:{
        type: String
    },
    breed:{
        type: String
    },
    profile_pic_url:{
        type:  String,
        default: "https://res.cloudinary.com/duhiildi0/image/upload/v1740328801/labrador-retriever-1210559_640_zsbhoa.jpg"
    },
    public_id:{
        type: String
    },
    weight:{
        type: String
    },
    dob:{
        type: String
    },
   temperament:{
    type: String
   },
   activity:{
    type: String
   },
   training:{
    type: String
   },
   social:{
    type: String
   },
   latitude:{
        type: String,
        default: "0.0"
    },
    longitude:{
        type: String,
        default: "0.0"
    },
    vaccination:{
        type: String,
        default: 'N/A'
    },
    allergy:{
        type: String
    },
    diet:{
        type: String
    },
    spayed:{
        type: String
    },
    grooming:{
        type: String
    },
    owner_name:{
        type: String
    },
    emergency_contact:{
        type: String
    },
    home_environment:{
        type: String
    },
    daily_routine:{
        type: String
    },
    fav_routes:{
        typ: String
    },
    playDate_availability:{
        type: String
    },
    fun_facts:{
        type: String
    },
    fav_toys:{
        type: String
    },
    nick_name:{
        type: String
    },
    adoption_story:{
        type: String
    },
    gallery:{
        type: [String]
    },
    likes:[likeSchema]
    
},{
    timestamps: true
},{
     strictPopulate: false
})
module.exports = mongoose.model("PetProfiles",petSchema);