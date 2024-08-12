"use strict";

const express = require("express");
const router = express.Router();

const {
  getBanner
} = require("../controllers/getBanner");

router.use(
    getBanner
);

module.exports = router;