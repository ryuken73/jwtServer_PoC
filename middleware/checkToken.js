const jwtUtil = require('../lib/jwtUtil');
const tokenGetter = require('../lib/tokenGetter');
const {jwtVerify} = jwtUtil;

module.exports = async (req, res, next) => {
    // SECRET was set when express started. 
    const {SECRET} = req.app.locals;
    const {useAccessTokenIn} = req.query;
    const getAccessToken = tokenGetter[useAccessTokenIn];
    const accessToken = getAccessToken(req);
    const refreshToken = req.cookies ? req.cookies.refreshToken : null;

    if(refreshToken === null || refreshToken === undefined){
        console.error('No token provided');
        res.status(401).json({authenticated:false, errMsg:'No refresh token provided!'});
        return;
    }

    // if(accessToken === null || accessToken === undefined){
    //     console.error('No token provided');
    //     res.redirect(301, '/pages/login');
    //     return;
    // }

    let refreshTokenDecoded, accessTokenDecoded;
    try {
        refreshTokenDecoded = await jwtVerify(refreshToken, SECRET);
        req.refreshTokenDecoded = refreshTokenDecoded;
        console.log('refresh token valid')
    } catch (err) {
        console.error('refresh token invalid:', err.message)
        res.status(401).json({authenticated:false, errMsg:err});
        return;
    }

    try {
        accessTokenDecoded = await jwtVerify(accessToken, SECRET);
        req.accessTokenDecoded = accessTokenDecoded;
        console.log('access token valid')
        next();
    } catch(err) {
        console.error('access token invalid:', err.message)
        res.status(499).json({authenticated:false, errMsg:err});
    }
}