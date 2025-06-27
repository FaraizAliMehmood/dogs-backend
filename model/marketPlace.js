const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const marketSchema = new Schema({
    product_title: {
        type: String,
         default: "N/A"
    },
    userId:{
type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    product_description: {
        type: String,
         default: "N/A"
    },
    product_pic_public_id:{
        type: String,
        default: ""
    },
    product_picture_url:{
        type: String,
        default: ""
    },
    default_product_picture_url:{
        type: String,
        default:""
    },
    product_price: {
        type: String
    },
    category:{
        type: String
    },
    likes: {
			// array of user ids
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
			default: [],
		},
    balance: {
      type: Number,
      default: 0  
    }
},{
    timestamps: true
});
module.exports = mongoose.model("MarketPlace",marketSchema);
