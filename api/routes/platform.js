const express = require("express");
const router = express.Router();

//validators
const platformValidator = require("./validators/platform");

//controllers
const platformCtrl = require("../controllers/platform.controller");
const userCtrl = require("../controllers/users.controller");

//routes
router
  .route("/politician")
  .post(
    userCtrl.authenticate,
    platformValidator.politicianValidate,
    platformCtrl.politicianCtrl
  );

router
  .route("/promise/:id")
  .post(
    userCtrl.authenticate,
    platformValidator.promiseValidate,
    platformCtrl.promiseCtrl
  );

router
  .route("/promise/:id/upvote/:promiseId")
  .patch(platformCtrl.promiseUpvoteCtrl);

router
  .route("/promise/:id/downvote/:promiseId")
  .patch(platformCtrl.promiseDownvoteCtrl);

router
  .route("/feedback/:id")
  .post(
    userCtrl.authenticate,
    platformValidator.feedbackValidate,
    platformCtrl.feedbackCtrl
  );

router
  .route("/feedback/:id/upvote/:feedbackId")
  .patch(platformCtrl.feedbackUpvoteCtrl);

router
  .route("/feedback/:id/downvote/:feedbackId")
  .patch(platformCtrl.feedbackDownvoteCtrl);

router.route("/top").get(platformCtrl.getTopCtrl);

router.route("/bottom").get(platformCtrl.getbottomCtrl);

router.route("/search").get(platformCtrl.searchPlatformCtrl);

module.exports = router;
