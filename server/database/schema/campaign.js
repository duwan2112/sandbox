const mongoose = require("mongoose");

const ACTIVE_STATUS = "active";
const CREATED_STATUS = "created";
const PAUSE_STATUS = "paused";

const CampaignSchema = new mongoose.Schema(
  {
    userId: mongoose.ObjectId,
    status: {
      type: String,
      default: CREATED_STATUS,
    },
    done: {
      type: Boolean,
      default: false,
    },
    payments: Array,
    areas: String,
    location: String,
    invest: Number,
    fiscalName: String,
    nif: String,
    direction: String,
    email: String,
    iban: String,
    swiftbic: String,
    importe: String,
    activationDate: { type: Date, default: null },
    expireAt: {
      type: Date,
      default: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
  },
  { timestamps: true }
);

const CampaignModel = mongoose.model("Campaign", CampaignSchema);

module.exports = CampaignModel;
