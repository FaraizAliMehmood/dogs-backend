const express = require('express');
const {basicInfo,personality,healthCare,ownerInfo,activitySchedule,miscellaneous,gallery,profiles,profile,postFavorite,removeFavorite} = require('../controller/PetProfile');

const router = express.Router();
router.post('/basicInfo',basicInfo)
      .post('/personality',personality)
       .post("/health",healthCare)
       .post('/owner',ownerInfo)
       .post("/activity",activitySchedule)
       .post("/miscellaneous",miscellaneous)
       .post("/gallery",gallery)
       .get("/profiles",profiles)
       .post("/profile",profile)
       .post("/like",postFavorite)
       .post("/unlike",removeFavorite)
    


module.exports = router;