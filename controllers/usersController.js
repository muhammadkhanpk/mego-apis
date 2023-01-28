require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Users } = require("../db/models/Users");
const { uploadImage } = require("../services/gcsUpload");
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
            return res.json({
              status: false,
              success: {},
              error: {
                message: `OTP is not updated`,
              },
            });
          } else {
            return res.json({
              status: true,
              success: { phoneNo: user.phoneNo },
              error: {
                message: ``,
              },
            });
          }
        }
      );
    } else {
      const oldUser = await Users.findOne({ phoneNo });
      if (oldUser) {
        let reason = userType == "provider" ? "User" : "Provider";
        return res.json({
          status: false,
          success: {},
          error: {
            message: `This phone is already registered with [${reason}] credentials`,
          },
        });
      }
      let code = phoneNo.substring(0, 3);
      if (code == "+92") {
        // const otp = generateOTP();
        const otp = 1234;
        let obj = { phoneNo, otp, userType };
        var user = new Users(obj);
        user.save((err, u) => {
          if (err) {
            return res.json({
              status: false,
              success: {},
              error: {
                message: `OTP is not saved`,
              },
            });
          } else {
            return res.json({
              status: true,
              success: { ...JSON.parse(JSON.stringify(u)) },
              error: {
                message: ``,
              },
            });
          }
        });
      } else if (code == "+97") {
      } else {
        return res.json({
          status: false,
          success: {},
          error: {
            message: "Wrong Country Code",
          },
        });
      }
    }
  } else {
    return res.json({
      status: false,
      success: {},
      error: {
        message: "Provide Phone Number and User Type",
      },
    });
  }
};
const verifyOTP = async (req, res) => {
  const { phoneNo, otp } = req.body;
  if (phoneNo && otp) {
    let newOtp = parseInt(otp);
    const u = await Users.findOne({ phoneNo, otp: newOtp });
    const user = JSON.parse(JSON.stringify(u));
    if (user) {
      let token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
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
const updateProvider = async (req, res) => {
  const { providerId } = req.params;
  // return res.json(providerId);

  if (providerId) {
    try {
      const provider = await Users.findOne({ _id: providerId });
      let pr = JSON.parse(JSON.stringify(provider));
      // return res.json(pr);
      if (!!pr && pr.userType == "provider") {
        let newImgs = {};
        if (req.files.length > 0) {
          const imgs = await uploadImage(
            req.files,
            `providers/${providerId}/profile`
          );
          newImgs = { ...imgs };
        }
        let updatePr = {
          ...pr,
          ...req.body,
          imgs: {
            ...pr.imgs,
            ...newImgs,
          },
        };
        // return res.json(x);
        Users.findOneAndUpdate(
          providerId,
          { ...updatePr },
          { new: true },
          (err, p) => {
            if (err) {
              return res.status(400).send("Provider is not updated!");
            } else {
              res.json(p);
            }
          }
        );
      } else {
        return res.status(400).send("Provider not found on this ID");
      }
    } catch (e) {
      return res.status(400).send("Provider not found on this ID");
    }
  } else {
    return res.status(400).send("Provide providerId");
  }
};
const allUsers = async (req, res) => {
  const users = await Users.find();
  return res.json(users);
};
module.exports = { saveUserOTP, allUsers, verifyOTP, findUser, updateProvider };
