const mongoose = require("mongoose");

const SubAreaSchema = mongoose.Schema(
  {
    userId: mongoose.ObjectId,
    subareaId: String,
    subareaName: String,
    principal: Object,
    testimonials: Object,
    interviews: Object,
    blogs: Object,
    lawyers: Object,
    solvedCases: Object,
    seo: {
      type: Object,
      default: {
        title: "",
        description: "",
      },
    },
  },
  {timestamps: true}
);

const SubAreaModel = mongoose.model("SubArea", SubAreaSchema);

module.exports = SubAreaModel;
