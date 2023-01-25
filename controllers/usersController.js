require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Users } = require("../db/models/Users");

// const { v4: uuid } = require("uuid");
const { generateOTP } = require("../services/Utils");
const saveUserOTP = async (req, res) => {
  const { phoneNo, userType } = req.body;
  if (phoneNo && userType) {
    const oldUser = await Users.findOne({ phoneNo, userType });
    if (oldUser) {
      const otp = generateOTP();
      Users.findOneAndUpdate(
        oldUser._id,
        { otp },
        { new: true },
        (err, user) => {
          if (err) {
            return res.status(400).send("OTP is not updated!");
          } else {
            res.json({ phoneNo: user.phoneNo, status: true });
          }
        }
      );
    } else {
      const oldUser = await Users.findOne({ phoneNo });
      if (oldUser) {
        let reason = userType == "provider" ? "User" : "Provider";
        return res
          .status(400)
          .send(
            `This phone is already registered with [${reason}] credentials`
          );
      }
      let code = phoneNo.substring(0, 3);
      if (code == "+92") {
        // const otp = generateOTP();
        const otp = 1234;
        let obj = { phoneNo, otp, userType };
        var user = new Users(obj);
        user.save((err, u) => {
          if (err) {
            return res.json(err);
          } else {
            return res.json(u);
          }
        });
      } else if (code == "+97") {
      } else {
        return res.status(400).send("Wrong Country Code");
      }
    }
  } else {
    return res.status(400).send("Provide User & Phone NO");
  }
};
const verifyOTP = async (req, res) => {
  const { phoneNo, otp } = req.body;
  if (phoneNo && otp) {
    let newOtp = parseInt(otp);
    const u = await Users.findOne({ phoneNo, otp: newOtp });
    const user = JSON.parse(JSON.stringify(u));
    if (user) {
      let token = jwt.sign({ ...user }, process.env.TOKEN_SECRET);
      return res.json({ ...user, token });
    } else {
      return res.status(400).send("You are providing wrong credentials.");
    }
  } else {
    return res.status(400).send("Provide phone number with otp");
  }
};
const findUser = async (req, res) => {
  const { userId } = req.params;
  if (userId) {
    const user = await Users.findOne({ _id: userId });
    return res.json(user);
  } else {
    return res.status(400).send("Provide UserId");
  }
};

const allUsers = async (req, res) => {
  const users = await Users.find();
  return res.json(users);
};
module.exports = { saveUserOTP, allUsers, verifyOTP, findUser };
