const express = require("express");
const axios = require("axios");
const router = express.Router();
const User = require("../../database/schema/user");

router.post(["/"], async (req, res) => {
  const user = await User.findOne({_id: req.body.userid});

  try {
    var config = {
      headers: {
        Authorization: "Basic ZTdlNDY0MDgwMzY4OWYzNmEwNDFmNTU4OTViNzZkNTQ6",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, DELETE, PUT, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
      },
    };

    const data = {
      first_name: req.body.form.first_name,
      last_name: req.body.form.last_name,
      email: user.email,
    };
    const result = await axios.post(
      "http://api.getrewardful.com/v1/affiliates",
      data,
      config
    );
    console.log(result.data);
    await User.updateOne({_id: req.body.userid}, {referral_link: result.data});
    return res
      .status(200)
      .json({ok: true, data: await User.findOne({_id: req.body.userid})});
  } catch (error) {
    return res
      .status(400)
      .json({ok: false, data: "No se pudo crear el link de referidos"});
  }
});

module.exports = router;
