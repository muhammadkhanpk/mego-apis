const { General } = require("../db/models/General");
const { admin, storage } = require("../services/firebaseService");
const saveDiameter = async (req, res) => {
  const { id, data } = req.body;
  //   return res.json(req.body);
  if (id && data) {
    const gd = await General.findById(id).lean();
    if (gd) {
      General.findByIdAndUpdate(id, { ...data }, { new: true }, (err, doc) => {
        if (err) {
          return res.status(400).send("Not updated");
        }
        return res.json(doc);
      });
    } else {
      const newGen = new General({
        _id: id,
        ...data,
      });
      newGen.save((err, doc) => {
        if (err) {
          return res.status(400).send("Not Added");
        } else {
          return res.json(doc);
        }
      });
    }
  } else {
    return res.status(400).send("Please provide identifier");
  }
};
const findDiameter = async (req, res) => {
  const d = await General.findOne({ _id: "diameter" }).lean();
  return res.json(d);
};
const testingUpload = async (req, res) => {
  let img = req.files[0];
  try {
    // Upload the image data to Firebase Storage
    const file = storage.file("images/" + img.fieldname);
    await file.save(img.buffer, {
      metadata: {
        contentType: "image/jpeg",
      },
    });
    console.log("Image successfully uploaded to Firebase Storage.");
    return res.json("ok");
  } catch (error) {
    console.error("Error uploading image: ", error);
  }
};

module.exports = { saveDiameter, findDiameter, testingUpload };
