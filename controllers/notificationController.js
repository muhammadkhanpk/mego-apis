const { Users } = require("../db/models/Users");
const { admin } = require("../services/firebaseService");
const sendPushNotification = async (req, res) => {
  const { country, sendTo, title, description } = req.body;
  try {
    if (country.length == 2) {
      if (sendTo.length == 2) {
        const users = await Users.find({}).map((token) => token.fcmToken);
        return res.json(users);
      } else {
        const users = await Users.find({ userType: sendTo[0] });
        return res.json(users);
      }
    } else {
      if (sendTo.length == 2) {
        const users = await Users.find({ country: country[0] });
        return res.json(users);
      } else {
        const users = await Users.find({
          country: country[0],
          userType: sendTo[0],
        });
        return res.json(users);
      }
    }
  } catch (e) {
    return res.json({
      status: false,
    });
  }
  // return res.json(req.body);
  if (tokens && title && description) {
    try {
      const message = await admin.messaging().sendToDevice(
        tokens,
        {
          notification: {
            title,
            body: description,
          },
        },
        {
          contentAvailable: true,
          priority: "high",
        }
      );
      return res.json(message);
    } catch (e) {
      return res.status(400).send("Notification is not send due to " + e);
    }
  } else {
    return res.status(400).send("Notification is not send");
  }
};
const sendNotification = ({ title, description, tokens }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await admin.messaging().sendToDevice(
        tokens,
        {
          notification: {
            title,
            body: description,
          },
        },
        {
          contentAvailable: true,
          priority: "high",
        }
      );
      resolve(true);
    } catch (e) {
      reject(false);
    }
  });
};
module.exports = { sendPushNotification };
