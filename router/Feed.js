const express = require("express");
const {postFeed,getFeed,deleteFeed} = require("../controller/Feed");
const router = express.Router();

router.post("/post",postFeed);
router.post("/",getFeed);
router.post("/delete",deleteFeed);

 

 
module.exports = router;