const getAccessTokenByQuery = req => {
    if(req.query){
        return req.query.accessToken;
    }
    return null;
}
const getAccessTokenByHeader = req => {};
const getAccessTokenByCookie = req => {
    if(req.cookies){
        return req.cookies.accessToken;
    }
    return null;
}

module.exports = {
    'query': getAccessTokenByQuery,
    'header': getAccessTokenByHeader,
    'cookie': getAccessTokenByCookie,
}