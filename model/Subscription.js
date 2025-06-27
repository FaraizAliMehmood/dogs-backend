const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
   id: {
         type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
},{
  timestamps: true
});

const subscriptionSchema = new Schema({
    subscription_title: {
        type: String
    },
    subscription_price: {
        type: Number,
        default: 0.0
    },
    subscription_duration:{
        type: String,
        default: "Month"
    },
    likes: {
        type: Number,
        default: 0
    },
    rewinds: {
        type: Number,
        default: 0
    },
    travel: {
        type: Boolean,
        default: false
    },
    who_likes_you: [likeSchema],
    advertisement: {
        type: Boolean,
        default: false
    }, 
    boost: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
});
module.exports = mongoose.model("Subscription",subscriptionSchema);