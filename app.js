// C:\users\DELL\workspace\siwes
require("./api/data/db");
const db_config = require("./api/data/db_config");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const user_routes = require("./api/routes/users");
const platform_routes = require("./api/routes/platform");
const bodyParser = require("body-parser");
const multer = require("multer");

app.set("port", 3001);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//configuring multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    req.headers.uploadTo === "users"
      ? cb(null, "assets/images/users")
      : cb(null, "assets/images/platform");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    (file.mimetype === "image/png" ||
      file.mimetype === "image/gif" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/mp3" ||
      file.mimetype === "image/mp4") &&
    file.size <= 30 * 1024 * 1024
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//implementing multer
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("upload")
);

//middleware for serving images from the server
app.use(
  "/images/promises",
  express.static(path.join(__dirname, "assets", "images", "promises"))
);
app.use(
  "/images/feedbacks",
  express.static(path.join(__dirname, "assets", "images", "feedbacks"))
);

//middleware for routes
app.use("/user/v1", user_routes);

app.use("/platform/v1", platform_routes);

//custom error handler for all routes
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.code || 500;
  const message = error.message;
  const data = error.data || [];
  res.status(status).json({ message: message, data: data });
});

const server = app.listen(app.get("port"), () => {
  const port = server.address().port;
  console.log("App listening on port " + port);
});
