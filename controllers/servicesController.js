const { Services, servicesValidation } = require("../db/models/Services");
const {
  SubServices,
  subServicesValidation,
} = require("../db/models/SubServices");
const { uploadImage } = require("../services/gcsUpload");
const { v4: uuid } = require("uuid");

const saveService = async (req, res) => {
  if (!req.files) {
    return res.status(400).send("Select Service Image.");
  }
  const id = uuid();
  let obj = { _id: id, ...req.body };
  const { error } = servicesValidation(obj);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const oldService = await Services.findOne({ name: obj.name });
  if (oldService) {
    return res.status(400).send("Service is already exists.");
  }
  const img = await uploadImage(req.files, `services/${id}`);
  const newService = new Services({ ...obj, img });
  newService.save((err, service) => {
    if (err) {
      return res.status(400).send("New Service is not created.");
    }
    return res.json(service);
  });
};
const updateService = async (req, res) => {};
const deleteService = async (req, res) => {};
const allServices = async (req, res) => {
  const s = await Services.findOne({ _id: req.params.id }).populate(
    "subServices"
  );
  return res.json(s);
};
//sub services
const saveSubService = async (req, res) => {
  if (!req.files) {
    return res.status(400).send("Select Sub Service Image.");
  }
  const id = uuid();
  let obj = { _id: id, ...req.body };
  // return res.json(obj);
  const { error } = subServicesValidation(obj);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const oldSubService = await SubServices.findOne({ name: obj.name });
  if (oldSubService) {
    return res.status(400).send("Sub Service is already exists.");
  }
  const img = await uploadImage(req.files, `subServices/${id}`);
  const newSubService = new SubServices({ ...obj, img });
  newSubService.save((err, subService) => {
    if (err) {
      return res.status(400).send("New Sub Service is not created.");
    }
    Services.updateOne(
      { _id: req.params.serviceId },
      { $push: { subServices: id } },
      async (err, ser) => {
        if (err) {
          return res.status(400).send("Card id is required !");
        }
        return res.json(ser);
      }
    );
  });
};
const updateSubService = async (req, res) => {};
const deleteSubService = async (req, res) => {};

module.exports = {
  saveService,
  updateService,
  deleteService,
  allServices,
  saveSubService,
  updateSubService,
  deleteSubService,
};
