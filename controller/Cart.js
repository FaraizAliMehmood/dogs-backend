const { updateLocale } = require('moment');
const  Cart = require('../model/Cart');
addToCart = async (req, res) => {
   const cart = await Cart.findOne({market: req.body.market});
   if(cart){
    res.status(400).json({success: false, message: "Cart already exist"});
   }else{
 const cart = new Cart(req.body);
  try {
    const doc = await cart.save();
    res.status(200).json({success: true, message: "Product is added in the  cart."});
  } catch (err) {
    res.status(500).json({success: false, message: err.message});
  }
   }
};
fetchCartByUser = async (req, res) => {
     
  try {
    console.log(req.body);
    const cartItems = await Cart.find({ user: req.body.id }).populate('user','_id username').populate('market')
    console.log(cartItems);
    res.status(200).json({success: true, message: "Cart items loaded", data: cartItems});
  } catch (err) {
    res.status(400).json({success:false, message: err.message});
  }
};
updateCart = async (req, res) => {
  const { id, quantity,price } = req.body
  try {
    console.log(quantity);
    const  total = quantity * Number(price);
     const cart = await Cart.findByIdAndUpdate(
            {_id: id},
            {$set: {quantity:quantity}},
            {new: true});
   // const result = await cart.populate('market');
    res.status(200).json({success: true, message: "Cart has been updated", data: cart});
  } catch (err) {
    res.status(400).json({success: false, message: err.message});
  }
};

 deleteCart = async (req, res) => {
      const { id } = req.body;
      try {
      const cart = await Cart.findByIdAndDelete(id);
      res.status(200).json({success: true, message: "Cart has been deleted"});
    } catch (err) {
      res.status(400).json({success: false, message: err.message});
    }
  };

module.exports = {
    addToCart,
    fetchCartByUser,
    updateCart,
    deleteCart
}