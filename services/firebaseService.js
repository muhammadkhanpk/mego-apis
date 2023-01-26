//firebase start
const admin = require("firebase-admin");
const serviceAccount = require("../service-account.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const storage = admin.storage().bucket();
const db = admin.firestore();
const serverTime = admin.firestore.Timestamp.now();
module.exports = { admin, storage, db, serverTime };
