const utils = require("./utils");
const strategies = require("./strategies");

const pipe = (...fns) => args => fns.reduce((arg, fn) => fn(arg), args);

const initialiseAuthentication = app => {
  utils.setup();

  pipe(strategies.GoogleStrategy, strategies.JWTStrategy)(app);
};

module.exports = { utils, initialiseAuthentication, strategies };
