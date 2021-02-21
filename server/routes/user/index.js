const express = require("express");
const accountRoutes = require("./account");
const websiteRoutes = require("./website");
const paymentRoutes = require("./payments");
const payment2Routes = require("./paymentsv2");
const webhookStripe = require("./webhookStripe");
const subAreasRoutes = require("./subareas");
const referrals = require("./referrals");
const passport = require("passport");
const {
  getWebsiteByUrl,
  getStripeByUrl,
  getWebsiteByUserId,
} = require("../../database/website");
const {getSubareaBySubName} = require("../../database/subareas");

const Website = require("../../database/schema/website");

const router = express.Router();

router.use("/account", accountRoutes);
router.use("/website", passport.authenticate("jwt"), websiteRoutes);
router.use("/payments", passport.authenticate("jwt"), paymentRoutes);
router.use("/v2/payments", passport.authenticate("jwt"), payment2Routes);
router.use("/subareas", passport.authenticate("jwt"), subAreasRoutes);

router.use("/stripe", webhookStripe);
router.use("/referrals", referrals);

router.get("/getSubareaP/:subarea", async (req, res) => {
  const subarea = await getSubareaBySubName(req.params.subarea);
  if (subarea) {
    res.status(200).json({ok: true, data: subarea});
  } else {
    res.status(404).json({ok: false, data: "No existe esa subareas"});
  }
});

router.get("/getwebsite/:url", async (req, res) => {
  try {
    const website = await getWebsiteByUrl(req.params.url);
    if (!website) return res.status(404).json({ok: false, data: null});

    return res.json({ok: true, data: website});
  } catch (error) {
    return res.status(400).json({
      ok: false,
      data: "Error intentando obtener la información del sition web",
    });
  }
});

router.get("/getwebsiteUrl/:userid", async (req, res) => {
  try {
    const website = await getWebsiteByUserId(req.params.userid);
    if (!website) return res.status(404).json({ok: false, data: null});

    return res.json({ok: true, data: website});
  } catch (error) {
    return res.status(400).json({
      ok: false,
      data: "Error intentando obtener la información del sition web",
    });
  }
});

router.put("/seo", async (req, res) => {
  const {title, description, userId} = req.body;
  try {
    const newSeo = {title: title, description: description};

    let website = await Website.findOneAndUpdate(
      {userId: userId},
      {seo: newSeo}
    );

    if (website) {
      return res.status(200).json({ok: true, data: website});
    }
    return res.status(500).json({
      ok: false,
      data: "No se pudo actualizar la informacion del seo",
    });
  } catch (error) {
    return res.status(400).json({ok: false, data: "Mala peticion de datos"});
  }
});

router.get("/getstripe/:url", async (req, res) => {
  try {
    const website = await getStripeByUrl(req.params.url);
    if (!website) return res.status(404).json({ok: false, data: null});

    return res.json({ok: true, data: website});
  } catch (error) {
    return res.status(400).json({
      ok: false,
      data: "Error intentando obtener la información del sition web",
    });
  }
});

module.exports = router;
