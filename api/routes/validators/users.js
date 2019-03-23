const mongoose = require("mongoose");
const User = mongoose.model("User");
const { body } = require("express-validator/check");

module.exports.registerValidate = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then(user => {
        if (user) {
          return Promise.reject("Email already in use");
        }
      });
    })
    .normalizeEmail(),
  body("username")
    .not()
    .isEmpty()
    .withMessage("Please fill in your username")
    .custom((value, { req }) => {
      return User.findOne({ username: value }).then(user => {
        if (user) {
          return Promise.reject("Username already in use");
        }
      });
    })
    .normalizeEmail(),
  body("name.first")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please fill in your first name"),
  body("name.last")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please fill in your last name"),
  body("password")
    .isLength({ min: 8 })
    .withMessage(
      "Please ensure that your password isn't less than 8 characters"
    )
];

module.exports.loginValidate = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Please enter a valid password not less than 8 characters")
];

module.exports.patchProfileValidate = [
  body("type")
    .not()
    .isEmpty()
    .withMessage("Please specify the feature you want to update")
];

module.exports.putProfileValidate = [
  body("name.first")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please fill in your first name"),
  body("name.last")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please fill in your last name")
];

module.exports.forgetPasswordValidate = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail()
];
