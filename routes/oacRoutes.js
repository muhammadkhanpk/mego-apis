const express = require("express");
const router = express.Router();
router.post("/oac-success/:trandata", (req, res) => {
  return res.json({
    query: req.query,
    params: req.params,
    body: req.body,
  });
});

module.exports = router;
