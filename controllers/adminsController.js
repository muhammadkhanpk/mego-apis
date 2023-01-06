const { Admins } = require("../db/models/admins");
const jwt = require("jsonwebtoken");
require("dotenv").config;
const loginAdmin = async (req, res) => {
  const { email, password, type } = req.body;
  if (!email || !password) {
    return res.status(400).send("Email and password is required");
  }
  const admin = await Admins.findOne({ email, password, type });
  if (admin) {
    const token = jwt.sign(admin.email, process.env.TOKEN_SECRET);
    let info = JSON.parse(JSON.stringify(admin));
    return res.json({ ...info, token });
  } else {
    return res.status(400).send("Record not Found");
  }
};
const saveAdmin = (req, res) => {
  const newAdmin = new Admins(req.body);
  newAdmin.save((err, admin) => {
    if (err) {
      return res.status(400).send(e);
    }
    return res.json(admin);
  });
};
module.exports = { saveAdmin, loginAdmin };
