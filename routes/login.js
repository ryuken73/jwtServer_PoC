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
  const {username, password} = req.body;
  const {SECRET, JWT_EXPIRE_SECONDS} = req.app.locals;
  const isAuthenticated = await db.authenticate(username, password);
  console.log(isAuthenticated);

  if(isAuthenticated){
      try {
        const token = await jwtIssue({username}, SECRET, {expiresIn:JWT_EXPIRE_SECONDS});
        res.append('Set-cookie', `pocToken=${token}; HttpOnly`)
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
