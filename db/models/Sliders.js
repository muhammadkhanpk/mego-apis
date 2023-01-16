const mongoose = require("mongoose");
const sliderSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "sliders", versionKey: false, strict: false }
);
const Sliders = mongoose.model("Sliders", sliderSchema);
module.exports = { Sliders };
