var express = require('express');
var router = express.Router();
const path = require('path');

const basePath = '../download';
/* GET users listing. */
router.get('/', function(req, res, next) {
  const {refreshTokenDecoded, accessTokenDecoded} = req;
  res.status(200).json({refreshTokenDecoded, accessTokenDecoded});
});

router.get('/download/:fname', (req, res) => {
  const fullPath = path.join(__dirname, basePath, req.params.fname);
  console.log(fullPath)
  res.download(fullPath, req.params.fname);
})

router.get('/static/download/:fname', (req, res) => {
  const fullPath = path.join(__dirname, basePath, req.params.fname);
  console.log(fullPath)
  res.download(fullPath, req.params.fname);
})


router.get('/echo/:value', (req, res) => {
  res.json({result: req.params.value});
})

module.exports = router;
