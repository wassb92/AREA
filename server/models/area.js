const mongoose = require("mongoose");

const AREASchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    img: {
      type: String,
    },
    to: {
      type: String,
      required: true,
    },
    /* "action" or "reaction" */
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AREA", AREASchema);
