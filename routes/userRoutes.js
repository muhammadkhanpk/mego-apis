const userController = require("../controllers/usersController");
const jwt = require("../controllers/Jwt");
const express = require("express");
const router = express.Router();

router.post("/saveUserOTP", userController.saveUserOTP);
router.post("/verifyOTP", userController.verifyOTP);
router.get("/allUsers", jwt.verifyToken, userController.allUsers);

module.exports = router;
