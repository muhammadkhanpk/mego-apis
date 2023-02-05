const {
  saveDiameter,
  findDiameter,
  testingUpload,
} = require("../controllers/generalController");
const express = require("express");
const upload = require("../services/multerStorage");
const router = express.Router();

router.post("/saveDiameter", saveDiameter);
router.get("/findDiameter", findDiameter);
router.post("/testingUpload", upload, testingUpload);
module.exports = router;
