const express = require("express");
const router = express.Router();

//validators
const userValidator = require("./validators/users");

//controllers
const userCtrl = require("../controllers/users.controller");

//routes

module.exports = router;
