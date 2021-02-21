const { Website, User } = require("../schema");

// Create a website
async function createWebsite(data) {
  return new Promise(async (resolve, reject) => {
    try {
      return resolve(await Website.create(data));
    } catch (error) {
      return reject(error);
    }
  });
}

// Update a website
async function updateWebsite(id, data) {
  return await Website.findByIdAndUpdate(
    { _id: id },
    {
      ...data,
    }
  );
}

// Get a website
async function getWebsiteById(id) {
  return await Website.findById(id);
}

// Get a website by userId
async function getWebsiteByUserId(userId) {
  return await Website.findOne({ userId });
}

// Is a website completed
async function isWebsiteCompleted(id) {
  const website = await Website.findById(id);
  return website.isCompleted;
}

async function getWebsiteByUrl(url) {
  return await Website.findOne({ url });
}

async function getWebsiteCount(id, bufeteName) {
  const websites = await Website.find();
  let count = 0;

  websites.forEach((website) => {
    if (
      website.basic &&
      website._id.toString() !== id.toString() &&
      website.basic.bufeteName.toLowerCase().replace(/\s+/g, "") ===
        bufeteName.toLowerCase().replace(/\s+/g, "")
    ) {
      count = count + 1;
    }
  });

  return count;
}

// Get registred lawyers from a website by userId
async function getLawyersByUserId(userId) {
  const website = await getWebsiteByUserId(userId);
  if (website) {
    return website.lawyers.length;
  }
  return -1;
}

// Delete a website by userID
async function deleteWebsiteByUserId(userId) {
  return await Website.deleteOne({ userId });
}

async function getStripeByUrl(url) {
  const { userId } = await Website.findOne({ url });

  const { stripeCustomerId } = await User.findOne({ _id: userId });
  return stripeCustomerId;
}

module.exports = {
  createWebsite,
  getWebsiteById,
  isWebsiteCompleted,
  getWebsiteByUserId,
  updateWebsite,
  getLawyersByUserId,
  getStripeByUrl,
  getWebsiteByUrl,
  getWebsiteCount,
  deleteWebsiteByUserId,
};
