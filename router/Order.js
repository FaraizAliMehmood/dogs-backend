const express = require("express");
const {postOrder,getOrder,changeOrderStatus} = require("../controller/Order");
const router = express.Router();

router.post("/create",postOrder);
router.post("/",getOrder);
router.post('/changeServiceStatus',changeOrderStatus);

module.exports = router;