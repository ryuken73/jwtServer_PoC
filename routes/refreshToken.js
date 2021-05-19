var express = require('express');
var router = express.Router();

const tokenGetter = require('../lib/tokenGetter');
const jwtUtil = require('../lib/jwtUtil');
const {jwtIssue, jwtVerify} = jwtUtil;

router.post('/', async function(req, res, next) {
    const {SECRET} = req.app.locals;
    const {returnAccessTokenBy} = req.body;
    const useAccessTokenIn = req.query ? req.query.useAccessTokenIn : null;
    const getAccessToken = tokenGetter[useAccessTokenIn];
    const accessTokenCurrent = getAccessToken(req);
    const refreshToken = req.cookies ? req.cookies.refreshToken : null;
    console.log(`accessToken:${accessTokenCurrent}`);
    console.log(`refreshToken:${refreshToken}`);
    try {
        const refreshTokenDecoded = await jwtVerify(refreshToken, SECRET);
        const accessTokenIssued = refreshTokenDecoded.accessToken;
        // if(accessTokenIssued !== accessTokenCurrent){
        //     throw new Error('accessToken not issued!');
        // }
        const {username, expAccess} = refreshTokenDecoded;
        const accessTokenNew = await jwtIssue({username}, SECRET, {expiresIn:expAccess});
        const result = {success: true, errMsg: null}
        if(returnAccessTokenBy === 'body'){
            result.accessToken = accessTokenNew;
        }
        res.json(result)
    } catch (err) {
        console.error(err);
        res.status(401).json({authenticated:false, errMsg:err});
    }
});

module.exports = router;
