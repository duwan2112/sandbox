const express = require("express");

const {
  getAllSessions,
  getSessionById,
  getSessionByUserId,
  updateSession,
} = require("../../database/sessions");

const { getWebsiteByUserId } = require("../../database/website");
const router = express.Router();

/**
 *  GET ALL Photo sessions
 */

const getAllInfo = async (list) => {
  return Promise.all(list.map((session) => getWebsiteByUserId(session.userId)));
};

router.get("/", async (req, res) => {
  const sessions = await getAllSessions();
  const websites = await getAllInfo(sessions);

  data = sessions.map((session, index) => {
    const { createdAt, url, basic } = websites[index];
    return { session, website: { createdAt, url, basic } };
  });

  return res.json({ ok: true, data });
});

/**
 * GET A CAMPAIGN BY DOCUMENT ID
 */

// router.get("/id/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const campaign = await getCampaignById(id);
//     if (!campaign) return res.status(404).json({ ok: false, data: null });
//     else return res.json({ ok: true, data: campaign });
//   } catch (err) {
//     return res.status(500).json({ ok: false });
//   }
// });

// /**
//  * GET A CAMPAIGN BY USER DOCUMENT ID
//  */

// router.get("/userid/:userid", async (req, res) => {
//   const { userid } = req.params;
//   try {
//     const campaign = await getCampaignByUserId(userid);
//     if (!campaign) return res.status(404).json({ ok: false, data: null });
//     else return res.json({ ok: true, data: campaign });
//   } catch (err) {
//     return res.status(500).json({ ok: false });
//   }
// });

/**
 * UPDATE A CAMPAIGN
 */

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await updateSession(id, req.body);
    const updatedCampaign = await getSessionById(id);
    return res.json({ ok: true, data: updatedCampaign });
  } catch (error) {
    return res.status(500).json({ ok: false, data: "Server Error" });
  }
});

/**
 * INFO ROUTE: this route will return total spent,  , total pending sessions, earnings monthly
 *
 */

router.get("/info", async (req, res) => {
  const sessions = await getAllSessions();
  let totalSpent = 0;
  let pendingSessions = 0;
  sessions.forEach((session) => {
    totalSpent += session.amount;
    if (session.done === false) pendingSessions++;
  });

  res.json({
    ok: true,
    data: { totalSpent, pendingSessions },
  });
});

module.exports = router;
