const Order = require("../model/Order")
const Product = require("../model/marketPlace");
const User = require("../model/User");

//create order
  const postOrder = async (req, res) => {
    const order = new Order(req.body);
    // here we have to update stocks;
    
    for(let item of order.items){
       let product =  await Product.findOne({_id:item._id})
      await product.save()
    }

    try {
      const doc = await order.save();
      const user = await User.findById(order.user)         
      res.status(200).json({success: true, message: "Orders has been"});
    } catch (err) {
      res.status(400).json({success: false,message:err});
    }
  };

const getOrder = async(req,res)=>{
      try {
       const data = await Order.find({userId: req.body.id})
       res.json({success: true, message: data})
      } catch (error) {
        console.log(error.message);
        res.json({success: false, message: "Internal server error"})
      }
}

// update order payment

//change order status
const changeOrderStatus = async(req,res)=>{
    try {
      const {order_status,postId,orderId} = req.body;
   const order = await Order.findOne({postId: postId});
   if(order_status === "Completed" ){
    const admin_amount  = order.orderPrice * 0.5;
    let adminCredit = order.admin_balance + admin_amount
     const market_balance = order.orderPrice - admin_amount;
      let accountCredit = order.market_user_balance + market_balance
     
     const data = await Order.findByIdAndUpdate(
            {_id: orderId},
            {$set: {market_user_balance: accountCredit, admin_balance: adminCredit,orderStatus: order_status }},
            {new: true});
            res.json({success: true, message: "Thankyou for trusting our platform."})
   }else{
     const data = await Order.findByIdAndUpdate(
            {_id: orderId},
            {$set: {service_status: 'InCompleted'}},
            {new: true});
    res.json({success: true, message: "Order is incomplete"})
   }

    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: error.message});
    }
}

module.exports = {
    postOrder,
    getOrder,
    changeOrderStatus
}