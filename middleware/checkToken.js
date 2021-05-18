const jwtUtil = require('../lib/jwtUtil');
const {jwtVerify} = jwtUtil;

module.exports = async (req, res, next) => {
    const {cookies} = req;
    const {SECRET} = req.app.locals;
    const pocToken = cookies ? cookies.pocToken : null;
    if(pocToken === null || pocToken === undefined){
        console.error('No token provided');
        res.status(401).json({authenticated:false, errMsg:'No token provided!'});
        return;
    }
    try {
        const tokenDecoded = await jwtVerify(pocToken, SECRET);
        console.log(`tokenDecoded:`, tokenDecoded)
        // if(tokenDecoded){
            req.tokenDecoded = tokenDecoded;
            next();
            // return
        // }
    } catch(err) {
        console.error(err)
        res.status(401).json({authenticated:false, errMsg:err});
    }
}