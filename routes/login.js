const express = require('express');
const router = express.Router();
const jwtUtil = require('../lib/jwtUtil');

const passwdTable = {
    'jwt':'1'
}

const db = {
    authenticate: (username, password) => {
        const userExists = passwdTable[username] !== undefined;
        const storedPassword = userExists ? passwdTable[username] : null;
        if(userExists && storedPassword === password){
            console.log('authenticated!:', username);
            return Promise.resolve(true);
        } 
        if(userExists && storedPassword !== password) {
            console.log('password incorrect');
            return Promise.resolve(false);
        }
        if(!userExists){
            console.log('user not found');
            return Promise.resolve(false)
        }
    }
}

/* GET users listing. */
const {jwtIssue, jwtDecode} = jwtUtil;

router.post('/', async (req, res, next) => {
  console.log(req.body);
  const {SECRET, ACCESS_JWT_EXPIRE_SECONDS, REFRESH_JWT_EXPIRE_SECONDS} = req.app.locals;
  const {
      username, 
      password, 
      returnAccessTokenBy='body',
      expAccess=ACCESS_JWT_EXPIRE_SECONDS,
      expRefresh=REFRESH_JWT_EXPIRE_SECONDS
    } = req.body;
  const isAuthenticated = await db.authenticate(username, password);
  console.log(isAuthenticated);

  if(isAuthenticated){
      try {
        const accessToken = await jwtIssue({username}, SECRET, {expiresIn:expAccess});
        const refreshToken = await jwtIssue({username, accessToken, expAccess}, SECRET, {expiresIn:expRefresh});
        // return refresh token by Set-Cookie 
        res.append('Set-cookie', `refreshToken=${refreshToken}; HttpOnly`);
        const result = {authenticated: true, errMsg: null}
        if(returnAccessTokenBy === 'body'){
            result.accessToken = accessToken;
            result.refreshTokenDecoded = jwtDecode(refreshToken);
        }
        if(returnAccessTokenBy === 'cookie'){
            res.append('Set-cookie', `accessToken=${accessToken}; HttpOnly`);
        }
        res.json(result)
      } catch(err) {
        console.error(err);
        res.json({authenticated:false, errMsg:err})
      }
  } else {
      res.json({authenticated:false, errMsg: 'ID not found or Password incorrect!', redirect:'/login'})
  }
});

module.exports = router;
