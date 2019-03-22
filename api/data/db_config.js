const crypto = require("crypto")
  .randomBytes(256)
  .toString("hex");
const secret = require("./secret");

module.exports = {
  url: "mongodb://localhost:27017/riverith",
  secret: secret.secret, //crypto
  isServer: false
};
