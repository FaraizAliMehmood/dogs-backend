const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    market: {
       type: mongoose.Schema.Types.ObjectId, ref: 'MarketPlace'
    },
    user:{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    quantity: {
        type: Number,
         default: 1
    },
    totalAmount:{
        type: Number
    }
},{
    timestamps: true
});
module.exports = mongoose.model("cart",cartSchema);
