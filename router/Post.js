const express = require("express");
const {uploadPost,uploadedPosts,postFavorite} = require("../controller/Post");
const router = express.Router();

router.post("/uploadPost",uploadPost);
router.get("/posts",uploadedPosts)
router.post("/like",postFavorite);
 
module.exports = router;