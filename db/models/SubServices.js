const mongoose = require("mongoose");
const Joi = require("joi");
const subServicesSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      unique: true,
    },
    name: String,
    pkPrice: Number,
    uaePrice: Number,
    description: String,
  },
  {
    _id: false,
    versionKey: false,
    strict: false,
    collection: "subServices",
  }
);
const SubServices = mongoose.model("SubServices", subServicesSchema);
const subServicesValidation = (service) => {
  const validationSchema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    pkPrice: Joi.number().required(),
    uaePrice: Joi.number().required(),
    description: Joi.string().required(),
  });
  return validationSchema.validate(service);
};
module.exports = { SubServices, subServicesValidation };
