const mongoose = require("mongoose");

const WebsiteSchema = new mongoose.Schema(
  {
    userId: mongoose.ObjectId,
    isCompleted: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: null,
    },
    allowedLawyers: {
      type: Number,
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    seo: {
      type: Array,
      default: {
        title: "",
        description: "",
      },
    },
    basic: Object,
    welcomeScreen: Object,
    lawyers: Array,
    howItWorks: Object,
    clients: Array,
    questions: Object,
    solvedCases: Array,
    blogs: Array,
    areas: Array,
    aboutUs: {
      type: Object,
      default: {
        presentation: "",
        video: [""],
        imageTeam: null,
      },
    },
    politics: Object,
  },
  {timestamps: true}
);

const WebsiteModel = mongoose.model("Website", WebsiteSchema);

module.exports = WebsiteModel;
