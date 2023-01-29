const { Users } = require("../db/models/Users");
const { admin } = require("../services/firebaseService");
const sendPushNotification = async (req, res) => {
  const { country, sendTo, title, description } = req.body;
  try {
    if (country.length == 2) {
    } else {
      if (country[0] == "Pakistan") {
      } else if (country[0] == "UAE") {
      }
    }
  } catch (e) {}
  return res.json(req.body);
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
const sendPushNotificationToUser = async (req, res) => {
  const { userId, title, description } = req.body;
  if (!userId || !title || !description) {
    return res.json({
      status: false,
      success: {},
      error: {
        message: "Some of the parameters are missings",
      },
    });
  }
  const user = Users.find({ _id: userId });
  return res.json(user);
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
module.exports = { sendPushNotification, sendPushNotificationToUser };
