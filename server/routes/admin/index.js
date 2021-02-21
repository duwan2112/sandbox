const express = require("express");
const marketingRoutes = require("./marketing");
const sessionsRoutes = require("./sessions");
const CMSRoutes = require("./cms");
const UsersRoutes = require("./users");
const StatsRoutes = require("./stats");
const passport = require("passport");

const router = express.Router();

// Here i should create the middleware for validataing the role
/**
 *  Function goes here
 *
 */

const roleValidation = (req, res, next) => {
  try {
    if (req && req.user && req.user.role === "admin") next();
    else {
      res
        .status(401)
        .json({ ok: false, data: "No tienes acceso a estas rutas" });
      next();
    }
  } catch (error) {
    res.status(500).json({ ok: false, data: "Error en el servidor" });
  }
  return;
};

// Marketing Routes
router.use(
  "/marketing",
  passport.authenticate("jwt"),
  roleValidation,
  marketingRoutes
);

// Sessions Routes
router.use(
  "/sessions",
  passport.authenticate("jwt"),
  roleValidation,
  sessionsRoutes
);
// CMS Routes
router.use("/cms", passport.authenticate("jwt"), roleValidation, CMSRoutes);

// User Routes
router.use("/users", passport.authenticate("jwt"), roleValidation, UsersRoutes);

// Statistics Routes
router.use("/stats", passport.authenticate("jwt"), roleValidation, StatsRoutes);

module.exports = router;
