"use strict";

const express = require("express");
const router = express.Router();

const {
  bannerExistorNot,
  updateBanner
} = require("../controllers/updateBanner");

router.use(
  bannerExistorNot,
    updateBanner
);

module.exports = router;