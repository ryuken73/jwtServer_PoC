const jwtUtil = require('../lib/jwtUtil');
const tokenGetter = require('../lib/tokenGetter');
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

const onExeptionAccessToken = (url, res, next, errMsg) => {
    const {STATIC_FILE_PATH_PREFIX} = res.app.locals;
    if(url.includes(STATIC_FILE_PATH_PREFIX)){
        // pass static-file request only refresh token is valid
        next();
        return
    }
    res.status(499).json({authenticated:false, errMsg});
    return
}

module.exports = async (req, res, next) => {
    // SECRET was set when express started. 
    const {SECRET} = req.app.locals;
    const url = req.originalUrl;
    const {useAccessTokenIn='query'} = req.query;
    const getAccessToken = tokenGetter[useAccessTokenIn];
    const accessToken = getAccessToken(req);
    const refreshToken = req.cookies ? req.cookies.refreshToken : null;

    if(refreshToken === null || refreshToken === undefined){
        const errMsg =  'No refresh token provided!'
        console.error(errMsg);
        onExeptionRerfreshToken(url, res, errMsg)
        return;
    }

    let refreshTokenDecoded, accessTokenDecoded;
    try {
        refreshTokenDecoded = await jwtVerify(refreshToken, SECRET);
        req.refreshTokenDecoded = refreshTokenDecoded;
        console.log('refresh token valid')
    } catch (err) {
        const errMsg = `refresh token invalid: ${err.message}`;
        onExeptionRerfreshToken(url, res, errMsg);
        return;
    }

    try {
        accessTokenDecoded = await jwtVerify(accessToken, SECRET);
        req.accessTokenDecoded = accessTokenDecoded;
        console.log('access token valid')
        next();
    } catch(err) {
        console.error('access token invalid:', err.message)
        const errMsg = `access token invalid: ${err.message}`
        onExeptionAccessToken(url, res, next, errMsg);
    }
}