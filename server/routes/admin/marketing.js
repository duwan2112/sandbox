const express = require("express");
const {
  getAllCampaigns,
  getCampaignById,
  getCampaignByUserId,
  updateCampaign,
} = require("../../database/campaign");

const { getWebsiteByUserId } = require("../../database/website");
const router = express.Router();

/**
 *  GET ALL CAMPAIGNS
 */

const getAllInfo = async (list) => {
  return Promise.all(
    list.map((campaign) => getWebsiteByUserId(campaign.userId))
  );
};

router.get("/", async (req, res) => {
  const campaigns = await getAllCampaigns();
  const websites = await getAllInfo(campaigns);

  data = campaigns.map((campaign, index) => {
    const { createdAt, url, basic } = websites[index];
    return { campaign, website: { createdAt, url, basic } };
  });

  return res.json({ ok: true, data });
});

/**
 * GET A CAMPAIGN BY DOCUMENT ID
 */

router.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const campaign = await getCampaignById(id);
    if (!campaign) return res.status(404).json({ ok: false, data: null });
    else return res.json({ ok: true, data: campaign });
  } catch (err) {
    return res.status(500).json({ ok: false });
  }
});

/**
 * GET A CAMPAIGN BY USER DOCUMENT ID
 */

router.get("/userid/:userid", async (req, res) => {
  const { userid } = req.params;
  try {
    const campaign = await getCampaignByUserId(userid);
    if (!campaign) return res.status(404).json({ ok: false, data: null });
    else return res.json({ ok: true, data: campaign });
  } catch (err) {
    return res.status(500).json({ ok: false });
  }
});

/**
 * UPDATE A CAMPAIGN
 */

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await updateCampaign(id, req.body);
    const updatedCampaign = await getCampaignById(id);
    return res.json({ ok: true, data: updatedCampaign });
  } catch (error) {
    return res.status(500).json({ ok: false, data: "Server Error" });
  }
});

/**
 * INFO ROUTE: this route will return total spent,  total active campaigns, total pending campaings, earnings monthly
 *
 */

router.get("/info", async (req, res) => {
  const campaigns = await getAllCampaigns();
  let totalSpent = 0;
  let activeCampaigns = 0;
  let pendingCampaigns = 0;
  campaigns.forEach((camp) => {
    totalSpent += camp.invest;

    if (camp.status === "active") activeCampaigns++;

    if (camp.done === false) pendingCampaigns++;
  });

  res.json({
    ok: true,
    data: { totalSpent, activeCampaigns, pendingCampaigns },
  });
});

module.exports = router;
