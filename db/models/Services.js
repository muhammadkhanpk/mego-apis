const mongoose = require("mongoose");
const Joi = require("joi");
const SubServices = require("../models/SubServices");
const servicesSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      unique: true,
    },
    name: String,
    price: Number,
    img: String,
    description: String,
    subServices: [{ type: String, ref: "SubServices" }],
  },
  {
    _id: false,
    versionKey: false,
    strict: false,
    collection: "services",
  }
);
const Services = mongoose.model("Services", servicesSchema);
const servicesValidation = (service) => {
  const validationSchema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
  });
  return validationSchema.validate(service);
};
module.exports = { Services, servicesValidation };
