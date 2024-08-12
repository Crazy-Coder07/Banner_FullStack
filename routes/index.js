const express = require("express");
const router = express.Router();

const  getBanner=require("./getBanner"); 

const  updateBanner=require("./updateBanner"); 


router.get("/get-banner",getBanner); 

router.patch("/update-banner",updateBanner); 


module.exports = router;