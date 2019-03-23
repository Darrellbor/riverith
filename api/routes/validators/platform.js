const mongoose = require("mongoose");
const Platform = mongoose.model("Platform");
const { body } = require("express-validator/check");

module.exports.politicianValidate = [
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
  body("office")
    .not()
    .isEmpty()
    .withMessage("Please fill in your last name"),
  body("tenure.start")
    .not()
    .isEmpty()
    .toDate()
    .withMessage(
      "Please make sure the politician start tenure is filled and is a date."
    ),
  body("tenure.end")
    .not()
    .isEmpty()
    .toDate()
    .withMessage(
      "Please make sure the politician end tenure is filled and is a date."
    ),
  body("description")
    .not()
    .isEmpty()
    .withMessage("Please fill in a brief description of the politician")
];

module.exports.promiseValidate = [
  body("description")
    .not()
    .isEmpty()
    .withMessage("Please fill in a brief description of the politician")
];

module.exports.feedbackValidate = [
    body("description")
      .not()
      .isEmpty()
      .withMessage("Please fill in a brief description of your feedback")
    body("rating")
      .not()
      .isEmpty()
      .withMessage("Please fill in a rating score for your feedback")
  ];
