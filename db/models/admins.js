const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "admins", versionKey: false, strict: false }
);
const Admins = mongoose.model("Admins", adminSchema);
module.exports = { Admins };
