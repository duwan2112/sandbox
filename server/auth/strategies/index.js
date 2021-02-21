const jwt = require("./jwt");
const google = require("./google");

module.exports = { JWTStrategy: jwt.strategy, GoogleStrategy: google.strategy };
