const express = require("express");
const {postSubscription,getSubscription} = require("../controller/Subscription");
const router = express.Router();

router.post("/add",postSubscription);
router.post("/",getSubscription);


 

 
module.exports = router;