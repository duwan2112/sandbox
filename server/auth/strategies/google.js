const passport = require("passport");
const passportGoogle = require("passport-google-oauth20");
/* const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); */

const {
  getUserByProvierId,
  createUser,
  getUserByEmail,
} = require("../../database/user");
const {signToken} = require("../utils");

const GoogleStrategy = passportGoogle.Strategy;
const strategy = (app) => {
  const strategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_API_URL}/auth/google/redirect`,
  };

  const verifyCallback = async (accessToken, refreshToken, profile, done) => {
    const {displayName: name, id: providerId, provider} = profile;
    const {email, email_verified: emailVerified} = profile._json;

    const user =
      (await getUserByProvierId(profile.id)) || (await getUserByEmail(email));

    if (user) {
      return done(null, user);
    }
    /* 
    const customer = await stripe.customers.create({
      email,
    });
 */
    const newUser = await createUser({
      name,
      email,
      password: null,
      providerId,
      provider,
      emailVerified,
    });

    return done(null, newUser);
  };

  app.get(
    `${process.env.BASE_API_URL}/auth/google`,
    passport.authenticate("google", {scope: ["profile", "email"]})
  );

  app.get(
    `${process.env.BASE_API_URL}/auth/google/redirect`,
    passport.authenticate("google", {failureRedirect: "/login?fail=1"}),
    (req, res) => {
      return res
        .status(200)
        .cookie("jwt", signToken(req.user), {
          httpOnly: true,
        })
        .redirect("/dashboard");
    }
  );

  passport.use(new GoogleStrategy(strategyOptions, verifyCallback));

  return app;
};

module.exports = {strategy};
