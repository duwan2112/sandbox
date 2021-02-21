const authRoutes = require("./auth");
const userRoutes = require("./user");
const adminRoutes = require("./admin");
const freeRoutes = require("./free");
const passport = require("passport");
function Router(app, handle) {
  app.use(`${process.env.BASE_API_URL}/auth`, authRoutes);
  app.use(`${process.env.BASE_API_URL}/users`, userRoutes);
  app.use(`${process.env.BASE_API_URL}/admin`, adminRoutes);
  app.use(`${process.env.BASE_API_URL}/data`, freeRoutes);

  // This is implementing auth routes i should change this

  // Implementing secured route to admin panel
  app.get(
    ["/dashboard/admin"],
    passport.authenticate("jwt", {failureRedirect: "/login"}),
    (req, res, next) => {
      if (req.user && !req.user.emailVerified) {
        res.redirect("/verify");
      } else if (req.user.role !== "admin") {
        res.redirect("/dashboard");
      }
      next();
    },
    (req, res) => {
      return handle(req, res);
    }
  );

  app.get(
    ["/dashboard", "/dashboard/*"],
    passport.authenticate("jwt", {failureRedirect: "/login"}),
    (req, res, next) => {
      if (req.user && !req.user.emailVerified) {
        res.redirect("/verify");
      }
      next();
    },
    (req, res) => {
      return handle(req, res);
    }
  );

  app.get(
    ["/verify", "/verify/:token"],
    passport.authenticate("jwt", {failureRedirect: "/login"}),
    (req, res) => {
      return handle(req, res);
    }
  );
}

module.exports = Router;
