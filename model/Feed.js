const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedSchema = new Schema({
    feedTitle: {
        type: String,
         default: "N/A"
    },
    userId:{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    feedDescription: {
        type: String,
         default: "N/A"
    },
    feed_pic_public_id:{
        type: String,
        default: ""
    },
    feed_picture_url:{
        type: String,
        default: ""
    },
    default_feed_picture_url:{
        type: String,
        default:""
    },
    distance: {
        type: String,
        default:"0"
    },
    time: {
        type: String,
        default: "Not mentioned"
    },
    location_name: {
        type: String
    },
    latitude: {
        type: String,
        default: "0.0"
    },
    longitude: {
        type: String,
        default: "0.0"
    },
    map: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});
module.exports = mongoose.model("Feed",feedSchema);
