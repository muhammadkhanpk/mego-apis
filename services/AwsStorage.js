//aws
const AWS = require("aws-sdk");
const fs = require("fs");
const s3 = new AWS.S3({
  accessKeyId: process.env.accessKeyID,
  secretAccessKey: process.env.secretAccessKeyID,
});

const uploadFile = (filePath, url) => {
  return new Promise((resolve, reject) => {
    try {
      var fs = require("fs");
      const file = fs.readFileSync(filePath);
      const BUCKET = "mego-services";

      const uploadParams = {
        Bucket: BUCKET,
        Key: url,
        Body: file,
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
