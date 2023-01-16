const express = require("express");
const router = express.Router();
const jwt = require("../controllers/Jwt");
const multerStorage = require("../services/multerStorage");
const { saveSlider, allSliders } = require("../controllers/slidersController");

router.post("/saveSlider", jwt.verifyToken, multerStorage, saveSlider);
router.get("/allSliders", jwt.verifyToken, allSliders);

module.exports = router;
