const {
  saveDiameter,
  findDiameter,
} = require("../controllers/generalController");
const express = require("express");
const router = express.Router();

router.post("/saveDiameter", saveDiameter);
router.get("/findDiameter", findDiameter);
module.exports = router;
