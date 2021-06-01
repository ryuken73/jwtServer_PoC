var express = require('express');
var router = express.Router();
const jwtUtil = require('../lib/jwtUtil');
const {jwtVerify} = jwtUtil;

const onExeptionRerfreshToken = (url, res, errMsg) => {
  const {REDIRECT_LOGIN_URL, STATIC_FILE_PATH_PREFIX} = res.app.locals;
  if(url.includes(STATIC_FILE_PATH_PREFIX)){
      res.redirect(302, REDIRECT_LOGIN_URL);
      return
  }
  res.status(401).json({authenticated:false, errMsg});
  return
}

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const {SECRET} = req.app.locals;
  const url = req.originalUrl;
  const refreshToken = req.cookies ? req.cookies.refreshToken : null;
  if(refreshToken === null || refreshToken === undefined){
    const errMsg =  'No refresh token provided!'
    console.error(errMsg);
    onExeptionRerfreshToken(url, res, errMsg)
    return;
  }
  let refreshTokenDecoded;
  try {
      refreshTokenDecoded = await jwtVerify(refreshToken, SECRET);
      req.refreshTokenDecoded = refreshTokenDecoded;
      console.log('refresh token valid')
  } catch (err) {
      const errMsg = `refresh token invalid: ${err.message}`;
      onExeptionRerfreshToken(url, res, errMsg);
      return;
  }
  res.status(200).json({
    authenticated: true,
    tokenDecoded: req.tokenDecoded
  })
});

module.exports = router;
