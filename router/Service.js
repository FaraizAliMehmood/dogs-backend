const express = require("express");
const {addInformation,getService,addReviews,changeServiceStatus} = require("../controller/service");
const router = express.Router();

router.post("/add",addInformation);
router.get("/",getService);
router.post('/add_reviews',addReviews);
router.post('/changeServiceStatus',changeServiceStatus);

module.exports = router;