const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
items: { type: [mongoose.Schema.Types.ObjectId], ref: 'MarketPlace' },
    totalAmount: { type: Number },
    totalItems: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, default: 'pending' },
    status: { type: String, default: 'pending' },
    selectedAddress: { type: mongoose.Schema.Types.Mixed, required: true },
},{
    timestamps: true
});
module.exports = mongoose.model("Order",orderSchema);
