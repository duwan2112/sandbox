const express = require("express");
const Stripe = require("stripe");
const {hashPassword, verifyPassword} = require("../auth/utils");
const {login} = require("../auth/strategies/jwt");
const {createUser, getUserByEmail} = require("../database/user");
const {createWebsite} = require("../database/website");
const {checkCookieSession} = require("../auth/utils");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

/**
 * LOGIN ROUTE
 */

router.post("/login", async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ok: false, data: "Credenciales no encontradas"});

  const authError = () => {
    return res.status(400).json({
      ok: false,
      data: "La combinacion de correo y contraseña no es correcta",
    });
  };

  const user = await getUserByEmail(email);

  if (!user || !(await verifyPassword(password, user.password)))
    return authError();

  const token = await login(req, user);

  return res
    .status(200)
    .cookie("jwt", token, {
      httpOnly: true,
    })
    .json({
      ok: true,
      data: user,
    });
});

/**
 *  REGISTER ROUTE
 */

router.post("/register", async (req, res) => {
  const {name, email, password, rewardful} = req.body;
  if (!password || !email) {
    return res.status(400).json({
      ok: false,
      data: {id: "email", message: "Credenciales no encontradas"},
    });
  }

  try {
    if (!/\b\w+\@\w+\.\w+(?:\.\w+)?\b/.test(email)) {
      return res.status(400).json({
        ok: false,
        data: {id: "email", message: "Ingresa una direccion de correo valida."},
      });
    } else if (password.length < 5 || password.length > 20) {
      return res.status(400).json({
        ok: false,
        data: {
          id: "password",
          message: "La contraseña debe estar entre 5 y 20 caracteres.",
        },
      });
    }

    /* const customer = await stripe.customers.create({
      email,
    }); */

    const user = await createUser({
      name,
      email,
      password: await hashPassword(password),
      stripeCustomerId: null,
      referral_link: rewardful,
    });

    await createWebsite({userId: user._id});

    const token = await login(req, user);

    return res
      .status(200)
      .cookie("jwt", token, {
        httpOnly: true,
      })
      .json({ok: true, data: user});
  } catch (err) {
    console.log(err);

    res.status(500).json({ok: false, data: err});
  }
});

/**
 * LOGOUT
 */
router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ok: true, data: "/"});
});

/**
 * COOKIE SESSION
 */

router.get("/session", checkCookieSession("jwt"), (req, res) => {
  if (user) {
    const {
      email,
      emailVerified,
      _id,
      createdAt,
      allowedLawyers,
      sub,
      expiration,
      stripeCustomerId,
      subId,
      billing,
    } = user;
    return res.json({
      ok: true,
      data: {
        email,
        emailVerified,
        _id,
        createdAt,
        allowedLawyers,
        sub,
        expiration,
        stripeCustomerId,
        subId,
        billing,
      },
    });
  } else {
    res.status(403).json({ok: false, data: null});
  }
});

module.exports = router;
