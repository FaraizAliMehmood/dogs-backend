const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String
    },
    username: {
        type: String
    },
    password:{
        type: String
    },
    account_verified:{
        type: Boolean,
        default: false
    },
    avatar:{
        type: String,
          default: "https://res.cloudinary.com/duhiildi0/image/upload/v1722508071/service_provider/dog-animal_DOTORLBDD7.jpg.jpg"
    },
    otp: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        default: "user"
    },
    deviceToken: {
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
     status: {
    type: String,
    default: 'Hey there! I am using Dogz app.'
  },
  followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
     following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  lastSeen: {
    type: Date,
    default: Date.now
  },
    account_deleted:{
        type: Boolean,
        default: false
    },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("User",userSchema);
