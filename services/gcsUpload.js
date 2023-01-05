//firebase start
const admin = require("firebase-admin");
const serviceAccount = require("../service-account.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "mego-services.appspot.com",
});
const storage = admin.storage().bucket();

//firebase end

const uploadImage = async (files, keyUrl) => {
  return new Promise(async (resolve, reject) => {
    if (files.length > 0) {
      if (files.length > 1) {
        resolve(files);
      } else {
        let img = files[0];
        let originalFile = img?.originalname;
        let names = originalFile.split(".");
        let ext = names[1];
        let url = `${keyUrl}/${img.fieldname}.${ext}`;
        // resolve(url);
        const file = storage.file(url);

        try {
          await file.save(img.buffer, {
            contentType: img.mimetype,
          });
          await file.makePublic();
          resolve(file.publicUrl());
        } catch (e) {
          console.log(e);
          reject(false);
        }
      }
    } else {
      reject(false);
    }
  });
};
module.exports = { uploadImage };
