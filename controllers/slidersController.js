const { Sliders } = require("../db/models/Sliders");
const { uploadImage } = require("../services/gcsUpload");
const { v4: uuid } = require("uuid");

const saveSlider = async (req, res) => {
  //   return res.json({ msg: "hello sliders" });
  const id = uuid();
  let obj = { _id: id, ...req.body };
  const oldSlider = await Sliders.findOne({ sliderUrl: obj.sliderUrl });
  if (!!oldSlider) {
    return res.status(400).send("Slider is already exists.");
  }
  const img = await uploadImage(req.files, `sliders/${id}`);
  const newSlider = new Sliders({ ...obj, ...img });
  newSlider.save((err, slider) => {
    if (err) {
      return res.status(400).send("Slider is not saved");
    }
    return res.json(slider);
  });
};
const allSliders = async (req, res) => {
  const s = await Sliders.find();
  return res.json(s);
};
module.exports = { saveSlider, allSliders };
