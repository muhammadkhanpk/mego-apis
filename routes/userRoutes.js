const {
  allUsers,
  findUser,
  saveUserOTP,
  updateProvider,
  verifyOTP,
} = require("../controllers/usersController");
const jwt = require("../controllers/Jwt");
const express = require("express");
const upload = require("../services/multerStorage");
const router = express.Router();

router.post("/saveUserOTP", saveUserOTP);
router.post("/verifyOTP", verifyOTP);
router.get("/findUser/:userId", jwt.verifyToken, findUser);
router.post(
  "/updateProvider/:providerId",
  jwt.verifyToken,
  upload,
  updateProvider
);
router.get("/allUsers", jwt.verifyToken, allUsers);

module.exports = router;
