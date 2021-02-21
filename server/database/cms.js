const { CMS } = require("./schema");

async function updateCMS(data) {
  const record = await CMS.findOne();

  if (!record) {
    await CMS.create(data);
    return;
  }

  await CMS.updateOne(data);
}

async function getCMS() {
  return await CMS.findOne();
}

module.exports = {
  updateCMS,
  getCMS,
};
