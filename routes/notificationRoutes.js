const {
  sendPushNotification,
} = require("../controllers/notificationController");
const express = require("express");
const router = express.Router();

router.post("/sendPushNotification", sendPushNotification);
module.exports = router;
