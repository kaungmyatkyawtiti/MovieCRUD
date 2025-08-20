var express = require('express');
var router = express.Router();

function tokenVerify(req, res, next) {
  return res.status(200).json({ message: "Token Valid" });
}

router.post('/tokenVerify', tokenVerify);

module.exports = router;
