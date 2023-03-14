//aws
const AWS = require("aws-sdk");
const fs = require("fs");
const s3 = new AWS.S3({
  accessKeyId: "AKIAUOPGLHS7C3YLDKVX",
  secretAccessKey: "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",
});

const uploadFile = (file, key) => {
  return new Promise((resolve, reject) => {
    try {
      const BUCKET = "megoservices";
      const uploadParams = {
        Bucket: BUCKET + "/helo",
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      s3.upload(uploadParams, function (err, data) {
        if (err) {
          return reject(err);
        }
        if (data) {
          return resolve(data);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};
const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    try {
      var params = {
        Bucket: "mego-services",
        Key: filePath,
      };

      s3.deleteObject(params, function (err, data) {
        if (err) return reject(err);
        return resolve({ data });
      });
    } catch (err) {
      return reject(err);
    }
  });
};

module.exports = { uploadFile, deleteFile };
