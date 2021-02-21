const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
  {
    token: String,
    userId: mongoose.ObjectId,
    type: String,
    expireAt: {
      type: Date,
      default: new Date(Date.now() + 1000 * 60 * 60 * 24)
    }
  },
  { timestamps: true }
);

const TokenModel = mongoose.model("Token", TokenSchema);

module.exports = TokenModel;
