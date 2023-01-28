const { admin } = require("../services/firebaseService");

const sendPushNotification = async (req, res) => {
  const { tokens, title, description } = req.body;
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
module.exports = { sendPushNotification };
