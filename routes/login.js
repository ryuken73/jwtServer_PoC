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
  const isAuthenticated = await db.authenticate(username, password);
  console.log(isAuthenticated);

  if(isAuthenticated){
      try {
        const token = await jwtIssue({username});
        res.json({authenticated:true, token, redirect:'/protected'})
      } catch(err) {
        console.error(err);
        res.json({authenticated:false, errMsg:err})
      }
  } else {
      res.json({authenticated:false, redirect:'/login'})
  }
});

module.exports = router;
