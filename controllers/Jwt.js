const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token =
    (req.headers &&
      req.headers?.authorization &&
      req.headers?.authorization.split(" ")[1]) ||
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send("Authentication token is required.");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    // req.user = decoded;
  } catch (e) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
module.exports = { verifyToken };
