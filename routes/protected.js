var express = require('express');
var router = express.Router();
const jwtUtil = require('../lib/jwtUtil');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const {refreshTokenDecoded, accessTokenDecoded} = req;
  res.status(200).json({refreshTokenDecoded, accessTokenDecoded});
});

module.exports = router;
