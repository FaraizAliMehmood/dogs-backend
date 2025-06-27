const express = require("express");
const {getMarketPlace,postMarketPlace,deleteMarket,getMarketDetails,likeUnlikeMarket} = require("../controller/marketPlace");
const router = express.Router();

router.post("/add",postMarketPlace);
router.get("/",getMarketPlace);
router.post("/delete",deleteMarket);
router.post("/productDetail",getMarketDetails);
router.post("/likeUnlike",likeUnlikeMarket);

 

 
module.exports = router;