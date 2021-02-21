const mongoose = require("mongoose");

const CMSSchema = new mongoose.Schema(
  {
    prices: Object,
    faq: Object,
    contact: Object,
    documents: Object,
  },
  { timestamps: true }
);

const CMSMODEL = mongoose.model("CMS", CMSSchema);

module.exports = CMSMODEL;
