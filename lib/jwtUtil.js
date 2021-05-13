
const jwt = require('jsonwebtoken');

const DEFAULT_ISSUE_OPTIONS = {
    algorithm : 'HS256',
    expiresIn: '1h',
    notBefore: 10,
    issuer: 'urn:security@sbs.co.kr',
    subject: 'wiseToken'
}
const DEFAULT_VERIFY_OPTIONS = {
    algorithms: ['HS256'],
    issuer: 'urn:security@sbs.co.kr',
    subject: 'wiseToken'
}
const DEFAULT_PAYLOAD = {tokenFor:'WISE'};
const DEFAULT_SECRET = 'WISE';

exports.jwtIssue = (payload, secret=DEFAULT_SECRET, options={}) => {  
    const payloadMerged = {
        ...DEFAULT_PAYLOAD,
        ...payload
    }
    const optionMerged = {
        ...DEFAULT_ISSUE_OPTIONS,
        ...options
    }
    return new Promise((resolve, reject) => {
        jwt.sign(payloadMerged, secret, optionMerged, (err, token) => {
            if(err){
                console.error(err);
                reject(err);
                return
            }
            console.log('issued jwt token:', token);
            resolve(token);
        })
    })
}

exports.jwtVerify = (token, secret=DEFAULT_SECRET, options={}) => {
    const optionMerged = {
        ...DEFAULT_VERIFY_OPTIONS,
        ...options
    }
    return new Promise((resokve, reject) => {
        jwt.verify(token, secret, optionMerged, (err, decoded) => {
            if(err){
                console.error(err);
                reject(err);
                return
            }
            console.log('decoded jwt token:', decoded);
            resolve(decoded);
        })
    })
}