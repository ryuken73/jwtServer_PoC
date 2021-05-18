var express = require('express');
var router = express.Router();
const jwtUtil = require('../lib/jwtUtil');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('in protected:', req.tokenDecoded);
  res.status(200).json(req.tokenDecoded)
});

module.exports = router;
