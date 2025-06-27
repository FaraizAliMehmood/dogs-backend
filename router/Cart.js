const express = require('express');
const { addToCart, fetchCartByUser,updateCart,deleteCart} = require('../controller/Cart');

const router = express.Router();
//  /products is already added in base path
router.post('/add', addToCart)
      .post('/', fetchCartByUser)
      .post("/update",updateCart)
      .post('/delete',deleteCart)
    


module.exports = router;