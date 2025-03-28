const express = require("express");
const router = express.Router();
const jwt = require("../controllers/Jwt");
const multerStorage = require("../services/multerStorage");
const {
  saveService,
  updateService,
  deleteService,
  allServices,
  saveSubService,
  updateSubService,
  deleteSubService,
  allSubServices,
} = require("../controllers/servicesController");

router.post("/saveService", jwt.verifyToken, multerStorage, saveService);
router.post("/updateService", jwt.verifyToken, updateService);
router.post("/deleteService", jwt.verifyToken, deleteService);
router.get("/allServices", jwt.verifyToken, allServices);
router.post(
  "/saveSubService/:serviceId",
  jwt.verifyToken,
  multerStorage,
  saveSubService
);
router.post("/updateSubService", jwt.verifyToken, updateSubService);
router.post("/deleteSubService", jwt.verifyToken, deleteSubService);
router.get("/allSubServices/:serviceId", jwt.verifyToken, allSubServices);

module.exports = router;
