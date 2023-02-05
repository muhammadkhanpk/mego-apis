const { Users } = require("../db/models/Users");
const { admin } = require("../services/firebaseService");
const sendPushNotification = async (req, res) => {
  const { country, sendTo, title, description } = req.body;
  try {
    if (country.length == 2) {
      if (sendTo.length == 2) {
        const tokensObj = await Users.find(
          { isFCM: "true", fcmToken: { $ne: null, $ne: "", $ne: undefined } },
          { fcmToken: 1 }
        );

        let tokens = tokensObj.map((val) => val.fcmToken);
        const noti = await sendNotification({ title, description, tokens });
        return res.json("To All");
      } else {
        const tokensObj = await Users.find(
          {
            userType: sendTo[0],
            isFCM: "true",
            fcmToken: { $ne: null, $ne: "", $ne: undefined },
          },
          { fcmToken: 1 }
        );
        let tokens = tokensObj.map((val) => val.fcmToken);
        const noti = await sendNotification({ title, description, tokens });
        return res.json("To all country and To specific User Type");
      }
    } else {
      if (sendTo.length == 2) {
        const tokensObj = await Users.find(
          {
            country: country[0],
            isFCM: "true",
            fcmToken: { $ne: null, $ne: "", $ne: undefined },
          },
          { fcmToken: 1 }
        );
        let tokens = tokensObj.map((val) => val.fcmToken);
        const noti = await sendNotification({ title, description, tokens });
        return res.json("To all User Type with specific country");
      } else {
        const tokensObj = await Users.find(
          {
            country: country[0],
            userType: sendTo[0],
            isFCM: "true",
            fcmToken: { $ne: null, $ne: "", $ne: undefined },
          },
          { fcmToken: 1 }
        );
        let tokens = tokensObj.map((val) => val.fcmToken);
        const noti = await sendNotification({ title, description, tokens });
        return res.json("To specific user type and Specific country");
      }
    }
  } catch (e) {
    return res.status(400).send(e);
  }
};
const sendNotification = ({ title, description, tokens }) => {
  return new Promise(async (resolve, reject) => {
    resolve(true);
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
      reject(e);
    }
  });
};
module.exports = { sendPushNotification };
