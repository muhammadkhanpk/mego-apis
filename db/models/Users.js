const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema(
  {
    phoneNo: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { collection: "users", versionKey: false, strict: false }
);
const Users = mongoose.model("Users", usersSchema);
module.exports = { Users };
