const express = require("express");
const router = express.Router();

//validators
const userValidator = require("./validators/users");

//controllers
const userCtrl = require("../controllers/users.controller");

//routes
router
  .route("/register")
  .post(userValidator.registerValidate, userCtrl.registerCtrl);

router.route("/login").post(userValidator.loginValidate, userCtrl.loginCtrl);

router
  .route("/profile")
  .get(userCtrl.authenticate, userCtrl.getProfileCtrl)
  .patch(
    userCtrl.authenticate,
    userValidator.patchProfileValidate,
    userCtrl.patchProfileCtrl
  )
  .put(
    userCtrl.authenticate,
    userValidator.putProfileValidate,
    userCtrl.putProfileCtrl
  );

router
  .route("/forgetPassword")
  .post(userValidator.forgetPasswordValidate, userCtrl.forgetPasswordCtrl);

module.exports = router;
