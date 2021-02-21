const { Campaign } = require("./schema");

// Get All Campaings
async function getAllCampaigns() {
  return Campaign.find({}).exec();
}

// Campaign  by a Document Object ID
async function getCampaignById(id) {
  return await Campaign.findById(id).exec();
}

//  Campaign By
async function getCampaignByUserId(userId) {
  return await Campaign.findOne({ userId }).exec();
}

// Update a campaign by Document Object ID
async function updateCampaign(id, data) {
  return await Campaign.findByIdAndUpdate({ _id: id }, { ...data });
}

async function deleteCampaign(id) {
  return await Campaign.findByIdAndDelete({ _id: id });
}

async function createCampaign(userId, data) {
  return new Promise(async (resolve, reject) => {
    const campaign = await Campaign.findOne({ userId });
    if (campaign) {
      return reject("Este usuario ya tiene una campaña creada");
    }

    return resolve(await Campaign.create({ userId, ...data }));
  });
}

async function deleteCampaignByUserId(userId) {
  return await Campaign.deleteOne({ userId });
}

module.exports = {
  createCampaign,
  getCampaignById,
  getCampaignByUserId,
  updateCampaign,
  deleteCampaign,
  getAllCampaigns,
  deleteCampaignByUserId,
};
