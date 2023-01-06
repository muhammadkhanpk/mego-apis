const { saveAdmin, loginAdmin } = require("../controllers/adminsController");
const express = require("express");
const router = express.Router();

router.post("/saveAdmin", saveAdmin);
router.post("/loginAdmin", loginAdmin);
module.exports = router;
