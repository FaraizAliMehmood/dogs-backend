const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const reviewSchema = new Schema({
hirePerson: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
review: {
    type: String
},
rating: {
    type: Number
},
},{
    timestamps: true
});


const serviceSchema = new Schema({
    service_provider_first_name: {
        type: String
    },
    service_provider_last_name: {
        type: String
    },
    service_type: {
        type: String,
         default: "N/A"
    },
    userId:{
     type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    service_provider_address: {
        type: String
    },
    service_description: {
        type: String,
         default: "N/A"
    },
    service_duration:{
        type: String,
        default: ""
    },
    service_fee:{
        type: Number,
        default: 0
    },
    service_provider_public_pic_id: {
        type: String
    },
    service_provider_picture_url: {
        type: String
    },
    default_service_provider_picture_url:{
        type: String,
        default:""
    },
    service_provider_online:{
        type: Boolean,
        default: "false"
    },
    service_completed: {
        type: String,
        default: "Waiting"
    },
    balance: {
        type: Number,
        default: 0 
    },
    reviews: [reviewSchema]
},{
    timestamps: true
});
module.exports = mongoose.model("ServiceProvider",serviceSchema);
