//imports
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const db_config = require("../data/db_config");
const { validationResult } = require("express-validator/check");

module.exports.registerCtrl = (req, res, next) => {
  console.log("Register a user");
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

  User.create(
    {
      email: req.body.email.toLowerCase(),
      "name.first": req.body.name.first,
      "name.last": req.body.name.last,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12))
    },
    (err, user) => {
      if (err) {
        error = new Error("An error occured!");
        next(error);
        return;
      } else {
        res.status(201).json({
          status: "Success",
          message: "Account successfully created",
          user: user
        });
      }
    }
  );
};

module.exports.loginCtrl = (req, res, next) => {
  console.log("Login a user");
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

  User.findOne({
    email: req.body.email.toLowerCase()
  }).exec((err, user) => {
    if (err) {
      error = new Error("An error occured");
      next(error);
      return;
    } else {
      if (!user) {
        error = new Error("Invalid Email");
        error.code = 401;
        next(error);
        return;
      }

      if (bcrypt.compareSync(req.body.password, user.password)) {
        if (user.status === "Locked") {
          error = new Error(
            "Account locked!, please contact siwes support for more details"
          );
          error.code = 401;
          next(error);
          return;
        } else if (user.status === "Suspended") {
          error = new Error(
            "Account Suspended!, please contact siwes support for more details"
          );
          error.code = 401;
          next(error);
          return;
        }

        if (user.confirmed === "Yes") {
          let token = jwt.sign(
            {
              _id: user._id,
              name: user.name,
              email: user.email,
              profilePic: user.profilePic
            },
            db_config.secret,
            { expiresIn: 604800 }
          ); //expires after 1 week
          res.status(200).json({
            status: "Success",
            message: "Account login successful",
            token: token
          });
        } else {
          let token = jwt.sign(
            {
              _id: user._id,
              name: user.name,
              email: user.email,
              profilePic: user.profilePic
            },
            db_config.secret,
            { expiresIn: 3600 }
          ); //expires after 1 hour
          res.status(401).json({
            status: "Failed",
            message: "Account not confirmed, confirm your account to continue",
            token: token
          });
        }
      } else {
        error = new Error("Incorrect Password");
        error.code = 401;
        next(error);
        return;
      }
    }
  });
};

module.exports.getProfileCtrl = (req, res, next) => {
  console.log("Get authenticated user details");
  let error;

  User.findById(req.user._id)
    .select("-password")
    .exec((err, user) => {
      if (err) {
        error = new Error("An error occured");
        next(error);
        return;
      } else if (!user) {
        error = new Error("User Not Found!");
        error.code = 404;
        next(error);
        return;
      } else {
        res.status(200).json(user);
      }
    });
};

const _updateUser = (req, res, next, suppliedData) => {
  User.update(
    {
      _id: req.user._id
    },
    suppliedData,
    (err, updatedUser) => {
      if (err) {
        console.log("\n " + err);
        error = new Error("An error occured while updating your account");
        next(error);
        return;
      } else {
        res.status(204).json();
      }
    }
  );
};

module.exports.patchProfileCtrl = (req, res, next) => {
  console.log("partial update of profile");
  let error;
  let suppliedData = {};

  //error handling
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    error = new Error("Validation Failed");
    error.code = 400;
    error.data = errors.array();
    next(error);
    return;
  }

  //handle type varieties
  if (!(req.body.type == "Password")) {
    error = new Error("That feature is not available for partial modification");
    error.code = 400;
    next(error);
    return;
  }

  if (req.body.type == "Password") {
    if (
      !req.body.oldPassword ||
      !req.body.newPassword ||
      !req.body.confirmNewPassword
    ) {
      error = new Error("Please ensure all fields are specified");
      error.code = 400;
      next(error);
      return;
    }

    User.findById(req.user._id)
      .select("password")
      .exec((err, user) => {
        if (err) {
          error = new Error("An error occured while updating your password");
          next(error);
          return;
        } else if (!user) {
          error = new Error("User not found!");
          error.code = 404;
          next(error);
          return;
        } else {
          if (!bcrypt.compareSync(req.body.oldPassword, user.password)) {
            error = new Error("Invalid old password!");
            error.code = 403;
            next(error);
            return;
          } else if (req.body.newPassword !== req.body.confirmNewPassword) {
            error = new Error("New passwords do not match!");
            error.code = 403;
            next(error);
            return;
          } else if (bcrypt.compareSync(req.body.newPassword, user.password)) {
            error = new Error(
              "New password cannot be the same as old password"
            );
            error.code = 403;
            next(error);
            return;
          } else {
            suppliedData = {
              password: bcrypt.hashSync(
                req.body.newPassword,
                bcrypt.genSaltSync(12)
              )
            };
            _updateUser(req, res, next, suppliedData);
          }
        }
      });
  }
};

module.exports.putProfileCtrl = (req, res, next) => {
  console.log("full update of profile");
  let error;
  let suppliedData = {};

  //error handling
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    error = new Error("Validation Failed");
    error.code = 400;
    error.data = errors.array();
    next(error);
    return;
  }

  User.findById(req.user._id).exec((err, user) => {
    if (err) {
      error = new Error("An error occured while updating your profile");
      next(error);
      return;
    } else {
      suppliedData = {
        name: req.body.name
      };

      _updateUser(req, res, next, suppliedData);
    }
  });
};

module.exports.forgetPasswordCtrl = (req, res, next) => {
  console.log("Updating user password when forgotten!");
  let error;
  let suppliedData = {};

  //error handling
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    error = new Error("Validation Failed");
    error.code = 400;
    error.data = errors.array();
    next(error);
    return;
  }

  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err) {
      error = new Error("An error occured!");
      next(error);
      return;
    } else if (!user) {
      error = new Error("Email not registered on our database!");
      error.code = 404;
      next(error);
      return;
    } else {
      let text = "";
      const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*_$#";

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      const password = bcrypt.hashSync(text, bcrypt.genSaltSync(10));

      suppliedData = {
        password: password
      };
      //send email before updating it.
      User.update(
        {
          email: req.body.email
        },
        suppliedData,
        (err, updatedUser) => {
          if (err) {
            res.status(500).json({
              err,
              message: "An error occured!"
            });
          } else {
            res.status(200).json({ password: text });
          }
        }
      );
    }
  });
};

/*
    *** MIDDLEWARE *** exports.authenticate
    ---
    check for authorization header then verify token if it exists then
    set jwt payload of [ _id, name, email, imageUrl ]
*/

module.exports.authenticate = (req, res, next) => {
  var headerExists = req.headers.authorization;

  if (headerExists) {
    var token = req.headers.authorization.split(" ")[1]; //-> Authorization: Bearer vvv
    jwt.verify(token, db_config.secret, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(401).json({
          err: err,
          message: "Failed to authenticate!, log out and login again."
        });
      } else {
        console.log("Authentication successfull");
        req.user = {
          _id: decoded._id,
          name: decoded.name.first + " " + decoded.name.last,
          email: decoded.email,
          profilePic: decoded.profilePic
        };
        next();
      }
    });
  } else {
    res.status(403).json({ message: "No token provided!" });
  }
};
