var mongoose = require("mongoose");
var db_config = require("./db_config");

mongoose.connect(db_config.url);

mongoose.connection.on("connected", function() {
  console.log("mongoose connected to " + db_config.url);
});

mongoose.connection.on("disconnected", function() {
  console.log("mongoose disconnected");
});

mongoose.connection.on("error", function(err) {
  console.log("mongoose connection error " + err);
});

process.on("SIGINT", function() {
  mongoose.connection.close(function() {
    console.log("mongoose disconnected through app termination!");
    process.exit(0);
  });
});

process.on("SIGTERM", function() {
  mongoose.connection.close(function() {
    console.log("mongoose disconnected through app termination!");
    process.exit(0);
  });
});

process.once("SIGUSR2", function() {
  mongoose.connection.close(function() {
    console.log("mongoose disconnected through app termination!");
    process.kill(process.pid, "SIGUSR2");
  });
});

//bring in the schemas and models
require("./models/platform.model.js");
require("./models/users.model.js");
