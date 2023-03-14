const express = require("express");
const router = express.Router();
const jwt = require("../controllers/Jwt");
const multerStorage = require("../services/multerStorage");
const {
  saveSlider,
  allSliders,
  deleteSlider,
} = require("../controllers/slidersController");

router.post("/saveSlider", jwt.verifyToken, multerStorage, saveSlider);
router.get("/allSliders", jwt.verifyToken, allSliders);
router.delete("/deleteSlider/:id", jwt.verifyToken, deleteSlider);

module.exports = router;
