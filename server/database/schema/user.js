const mongoose = require("mongoose");
const {ROLES} = require("../../../utils/roles");

const UserSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    name: String,
    emailVerified: {
      type: Boolean,
      default: false,
    },
    displayName: String,
    providerId: String,
    provider: String,
    role: {
      type: String,
      default: "subscribed",
    },
    churn: {
      type: Date,
      default: null,
    },
    stripeCustomerId: {
      type: String,
      default: null,
    },
    subId: {
      type: String,
      default: null,
    },
    subDate: {
      type: Date,
      default: null,
    },
    sub: {
      type: String,
      default: null,
    },
    allowedLawyers: {
      type: Number,
      default: null,
    },
    expiration: {
      type: Date,
      default: null,
    },
    payments: {
      type: Array,
      default: null,
    },
    referral_link: {
      type: String,
      default: null,
    },
    billing: {
      type: Array,
      default: {
        fiscalName: "",
        direction: "",
        nif: "",
      },
    },
  },
  {timestamps: true}
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
