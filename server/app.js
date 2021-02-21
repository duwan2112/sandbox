require("dotenv").config();
const express = require("express");
const next = require("next");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const logger = require("morgan");
const {getCMS, updateCMS} = require("./database/cms");
const {connectToDatabase} = require("./database/connection");
const {ROLES} = require("../utils/roles");
/* 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 */
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({dev});
const handle = nextApp.getRequestHandler();
const cors = require("cors");
const port = process.env.PORT || 3000;

const router = require("./routes");
const {initialiseAuthentication} = require("./auth");

nextApp.prepare().then(async () => {
  const app = express();
  app.use(cors());
  app.use(express.json({extended: true, limit: "50mb"}));
  app.use(cookieParser());

  app.use(passport.initialize());

  app.use(
    logger("dev", {
      skip: (req) => req.url.includes("_next"),
    })
  );

  app.get("/test-route", (req, res) =>
    res.status(200).json({hello: "Hello, from the back-end world!"})
  );

  router(app, handle);
  initialiseAuthentication(app);

  app.get("*", (req, res) => {
    return handle(req, res);
  });

  const db = await connectToDatabase();

  if (db) {
    console.log("MongoDB connected");
  }

  // Getting CMS

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
