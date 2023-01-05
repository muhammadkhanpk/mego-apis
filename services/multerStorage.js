//multer configuration..
const multer = require("multer");
const multerStorage = multer.memoryStorage({});
const upload = multer({ multerStorage }).any();
module.exports = upload;
//multer end ....
