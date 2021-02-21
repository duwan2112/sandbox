const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema(
  {
    userId: mongoose.ObjectId,
    done: {
      type: Boolean,
      default: false,
    },
    fees: Number,
    amount: Number,
    photos: Number,
    videos: Number,
    direction: String,
    contact: String,
  },
  { timestamps: true }
);

const SessionModel = mongoose.model("Session", SessionSchema);

module.exports = SessionModel;
