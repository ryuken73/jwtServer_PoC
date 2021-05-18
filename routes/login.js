const express = require('express');
const jwtUtil = require('../lib/jwtUtil');
const router = express.Router();

const passwdTable = {
    'ryuken01@sbs.co.kr':'1234'
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
const {jwtIssue} = jwtUtil;

router.post('/', async (req, res, next) => {
  console.log(req.body);
  const {SECRET, ACCESS_JWT_EXPIRE_SECONDS, REFRESH_JWT_EXPIRE_SECONDS} = req.app.locals;
  const {
      username, 
      password, 
      expAccess=ACCESS_JWT_EXPIRE_SECONDS,
      expRefresh=REFRESH_JWT_EXPIRE_SECONDS
    } = req.body;
  const isAuthenticated = await db.authenticate(username, password);
  console.log(isAuthenticated);

  if(isAuthenticated){
      try {
        const accessToken = await jwtIssue({username}, SECRET, {expiresIn:expAccess});
        const refreshToken = await jwtIssue({username}, SECRET, {expiresIn:expRefresh});
        res.append('Set-cookie', `refreshToken=${refreshToken}; HttpOnly`);
        res.append('Set-cookie', `accessToken=${accessToken}; HttpOnly`);
        res.json({authenticated:true, redirect:'/protected'})
      } catch(err) {
        console.error(err);
        res.json({authenticated:false, errMsg:err})
      }
  } else {
      res.json({authenticated:false, errMsg: 'ID not found or Password incorrect!', redirect:'/login'})
  }
});

module.exports = router;
