const mongoose = require("mongoose");
const Platform = mongoose.model("Platform");
const { validationResult } = require("express-validator/check");

module.exports.politicianCtrl = (req, res, next) => {
  console.log("Create a new politician record!");
  let error;

  //error handling
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    error = new Error("Validation Failed");
    error.code = 400;
    error.data = errors.array();
    next(error);
    return;
  }

  if (!req.file) {
    error = new Error("No Politician Image Provided!");
    error.code = 400;
    next(error);
    return;
  }

  Platform.create(
    {
      politician: [
        {
          name: req.body.name,
          office: req.body.office,
          image: req.file.path,
          tenure: req.body.tenure,
          description: req.body.description
        }
      ]
    },
    (err, politician) => {
      if (err) {
        error = new Error("An error occured!");
        next(error);
        return;
      } else {
        res.status(201).json({
          status: "Success",
          message: "Politician record sucessfully added!",
          politician: politician
        });
      }
    }
  );
};

const _addPromise = (req, res, platform) => {
  platform.promise.push({
    promise_by: {
      email: req.user.email,
      username: req.user.username
    },
    description: req.body.description,
    media: req.file.path
  });

  platform.save(function(err, promiseAdded) {
    if (err) {
      res.status(500).json({
        err,
        message: "An error occured!"
      });
    } else {
      res
        .status(201)
        .json(promiseAdded.promise[promiseAdded.promise.length - 1]);
    }
  });
};

module.exports.promiseCtrl = (req, res, next) => {
  console.log("Create a new promise record!");
  const platformId = req.params.id;
  let error;

  //error handling
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    error = new Error("Validation Failed");
    error.code = 400;
    error.data = errors.array();
    next(error);
    return;
  }

  if (!req.file) {
    error = new Error("No proof of promise Provided!");
    error.code = 400;
    next(error);
    return;
  }

  Platform.findById(platformId)
    .select("promise")
    .exec((err, doc) => {
      if (err) {
        error = new Error("An error occured!");
        next(error);
        return;
      } else if (!doc) {
        error = new Error(`platform id not found ${platformId}`);
        error.code = 404;
        next(error);
        return;
      } else {
        _addPromise(req, res, doc);
      }
    });
};

module.exports.promiseUpvoteCtrl = (req, res, next) => {
  console.log("Add to the upvote of a promise");
  const platformId = req.params.id;
  const promiseId = req.params.promiseId;
  let error;

  Platform.findById(platformId)
    .select("promise")
    .exec((err, doc) => {
      if (err) {
        error = new Error("An error occured!");
        next(error);
        return;
      } else if (!doc) {
        error = new Error(`platform id not found ${platformId}`);
        error.code = 404;
        next(error);
        return;
      } else {
        const promiseInstance = doc.promise.id(promiseId);

        if (!promiseInstance) {
          error = new Error("promise id not found");
          error.code = 404;
          next(error);
          return;
        }

        promiseInstance.upvote = promiseInstance.upvote + 1;

        doc.save((err, updatedPromise) => {
          if (err) {
            error = new Error("An error occured!");
            next(error);
            return;
          } else {
            res.status(204).json();
          }
        });
      }
    });
};

module.exports.promiseDownvoteCtrl = (req, res, next) => {
  console.log("Add to the Downvote of a promise");
  const platformId = req.params.id;
  const promiseId = req.params.promiseId;
  let error;

  Platform.findById(platformId)
    .select("promise")
    .exec((err, doc) => {
      if (err) {
        error = new Error("An error occured!");
        next(error);
        return;
      } else if (!doc) {
        error = new Error(`platform id not found ${platformId}`);
        error.code = 404;
        next(error);
        return;
      } else {
        const promiseInstance = doc.promise.id(promiseId);

        if (!promiseInstance) {
          error = new Error("promise id not found");
          error.code = 404;
          next(error);
          return;
        }

        promiseInstance.upvote = promiseInstance.downvote + 1;

        doc.save((err, updatedPromise) => {
          if (err) {
            error = new Error("An error occured!");
            next(error);
            return;
          } else {
            res.status(204).json();
          }
        });
      }
    });
};

const _addFeedback = (req, res, platform) => {
  platform.feedback.push({
    feedback_by: {
      email: req.user.email,
      username: req.user.username
    },
    description: req.body.description,
    media: req.file.path,
    rating: parseInt(req.body.rating, 10)
  });

  platform.save(function(err, feedbackAdded) {
    if (err) {
      res.status(500).json({
        err,
        message: "An error occured!"
      });
    } else {
      res
        .status(201)
        .json(feedbackAdded.feedback[feedbackAdded.feedback.length - 1]);
    }
  });
};

module.exports.feedbackCtrl = (req, res, next) => {
  console.log("Create a new feedback record!");
  const platformId = req.params.id;
  let error;

  //error handling
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    error = new Error("Validation Failed");
    error.code = 400;
    error.data = errors.array();
    next(error);
    return;
  }

  if (!req.file) {
    error = new Error("No proof of feedback Provided!");
    error.code = 400;
    next(error);
    return;
  }

  Platform.findById(platformId)
    .select("feedback rating")
    .exec((err, doc) => {
      if (err) {
        error = new Error("An error occured!");
        next(error);
        return;
      } else if (!doc) {
        error = new Error(`platform id not found ${platformId}`);
        error.code = 404;
        next(error);
        return;
      } else {
        doc.rating = doc.rating + parseInt(req.body.rating, 10);
        _addFeedback(req, res, doc);
      }
    });
};

module.exports.feedbackUpvoteCtrl = (req, res, next) => {
  console.log("Add to the upvote of a feedback");
  const platformId = req.params.id;
  const feedbackId = req.params.feedbackId;
  let error;

  Platform.findById(platformId)
    .select("feedback")
    .exec((err, doc) => {
      if (err) {
        error = new Error("An error occured!");
        next(error);
        return;
      } else if (!doc) {
        error = new Error(`platform id not found ${platformId}`);
        error.code = 404;
        next(error);
        return;
      } else {
        const feedbackInstance = doc.feedback.id(feedbackId);

        if (!feedbackInstance) {
          error = new Error("feedback id not found");
          error.code = 404;
          next(error);
          return;
        }

        feedbackInstance.upvote = feedbackInstance.upvote + 1;

        doc.save((err, updatedfeedback) => {
          if (err) {
            error = new Error("An error occured!");
            next(error);
            return;
          } else {
            res.status(204).json();
          }
        });
      }
    });
};

module.exports.feedbackDownvoteCtrl = (req, res, next) => {
  console.log("Add to the upvote of a feedback");
  const platformId = req.params.id;
  const feedbackId = req.params.feedbackId;
  let error;

  Platform.findById(platformId)
    .select("feedback")
    .exec((err, doc) => {
      if (err) {
        error = new Error("An error occured!");
        next(error);
        return;
      } else if (!doc) {
        error = new Error(`platform id not found ${platformId}`);
        error.code = 404;
        next(error);
        return;
      } else {
        const feedbackInstance = doc.feedback.id(feedbackId);

        if (!feedbackInstance) {
          error = new Error("feedback id not found");
          error.code = 404;
          next(error);
          return;
        }

        feedbackInstance.upvote = feedbackInstance.downvote + 1;

        doc.save((err, updatedfeedback) => {
          if (err) {
            error = new Error("An error occured!");
            next(error);
            return;
          } else {
            res.status(204).json();
          }
        });
      }
    });
};

module.exports.getTopCtrl = (req, res, next) => {
  console.log("Get Top politicians");
  let error;

  Platform.find()
    .limit(3)
    .sort("-rating")
    .exec((err, records) => {
      if (err) {
        error = new Error("An error occured!");
        next(error);
        return;
      } else {
        res.status(200).json({
          records: records
        });
      }
    });
};

module.exports.getbottomCtrl = (req, res, next) => {
  console.log("Get Bottom politicians");
  let error;

  Platform.find()
    .limit(3)
    .sort("rating")
    .exec((err, records) => {
      if (err) {
        error = new Error("An error occured!");
        next(error);
        return;
      } else {
        res.status(200).json({
          records: records
        });
      }
    });
};

module.exports.searchPlatformCtrl = (req, res, next) => {
  console.log("search platform by politician name");
  let error;
  let searchId = req.params.id;

  Platform.findById(searchId)
    .sort("-rating")
    .exec((err, records) => {
      if (err) {
        error = new Error("An error occured!");
        next(error);
        return;
      } else {
        res.status(200).json({
          records: records
        });
      }
    });
};

module.exports.getAllCtrl = (req, res, next) => {
  console.log("Get all politicians");
  let error;

  Platform.find()
    .sort("-rating")
    .exec((err, records) => {
      if (err) {
        error = new Error("An error occured!");
        next(error);
        return;
      } else {
        res.status(200).json({
          records: records
        });
      }
    });
};
