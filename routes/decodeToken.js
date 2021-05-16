var express = require('express');
var router = express.Router();
const checkToken = require('../middleware/checkToken');

/* GET users listing. */
router.get('/', checkToken, function(req, res, next) {
  res.status(200).json({
    authenticated: true,
    tokenDecoded: req.tokenDecoded
  })
});

module.exports = router;
