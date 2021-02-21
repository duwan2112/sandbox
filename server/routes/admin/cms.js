const express = require("express");
const { updateCMS, getCMS } = require("../../database/cms");

const router = express.Router();

// Getting the CMS
router.get("/", async (req, res) => {
  try {
    const cms = await getCMS();
    if (!cms) return res.status(404).json({ ok: true, data: null });
    res.json({ ok: true, data: cms });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, data: null });
  }
});

// Update all the routes
router.put("/", async (req, res) => {
  try {
    await updateCMS(req.body);
    res.json({ ok: true, data: null });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, data: null });
  }
});

module.exports = router;
