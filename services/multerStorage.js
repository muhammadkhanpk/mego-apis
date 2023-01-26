//multer configuration..
const multer = require("multer");
const multerStorage = multer({
  storage: multer.memoryStorage(),
});
const upload = multerStorage.any();
module.exports = upload;
//multer end ....
