const { storagey } = require("./firebaseService");
//upload file
const uploadImage = async (files, keyUrl) => {
  return new Promise(async (resolve, reject) => {
    if (files.length > 0) {
      let urls = [];
      let urlsObj = {};
      try {
        files.forEach(async (element) => {
          let img = element;
          let originalFile = img?.originalname;
          let fieldname = img?.fieldname;
          let names = originalFile.split(".");
          let ext = names[1];
          const file = storage.file(`${keyUrl}/${fieldname}.${ext}`);
          try {
            await file.save(img.buffer, {
              contentType: img.mimetype,
            });
            await file.makePublic();
            urlsObj = { ...urlsObj, [fieldname]: file.publicUrl() };
            urls.push(file.publicUrl());
          } catch (e) {
            reject(e);
          }
          if (urls.length == files.length) resolve(urlsObj);
        });
      } catch (e) {
        reject(e);
      }
    }
  });
};

//get file url
const storageUrlToPath = (file) => {
  var pictureItem = file;
  var url_token = pictureItem.split("?");
  var url = url_token[0].split("/");
  console.log(url);

  var filePath = url[url.length - 1].replaceAll("%2F", "/");
  return filePath;
};
//delete a file
function deleteImageFromFirebaseStorage(filePath) {
  return new Promise(async (res, rej) => {
    try {
      await storage.file(storageUrlToPath(filePath)).delete();
      res(true);
    } catch (e) {
      rej(e);
    }
  });
}
module.exports = {
  uploadImage,
  storageUrlToPath,
  deleteImageFromFirebaseStorage,
};
