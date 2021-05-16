var express = require('express');
var router = express.Router();
const jwtUtil = require('../lib/jwtUtil');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('in protected');
  res.send('respond with a resource');
});

module.exports = router;
