const express = require("express");
const router = express.Router();

//validators
const platformValidator = require("./validators/platform");

//controllers
const platformCtrl = require("../controllers/platform.controller");

//routes

module.exports = router;
