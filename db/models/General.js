const mongoose = require("mongoose");

const generalSchema = new mongoose.Schema(
  {
    name: String,
  },
  { _id: false, strict: false }
);

const General = mongoose.model("General", generalSchema);
module.exports = { General };
