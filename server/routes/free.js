const express = require("express");

const { getCMS } = require("../database/cms");

const router = express.Router();

// Getting the CMS
router.get("/cms", async (req, res) => {
  try {
    const cms = await getCMS();
    if (!cms) return res.status(404).json({ ok: true, data: null });
    res.json({ ok: true, data: cms });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, data: null });
  }
});

module.exports = router;
