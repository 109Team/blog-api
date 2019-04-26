const jwt = require('jsonwebtoken');

const resHandle = require('../core/dbResHandle');
const jwtTokenSecret = 'HopenJwt';

module.exports = (req, res, next) => {
    const _token = req.headers.authorization;
    if(!_token){
        return resHandle(res, null, 401, '无权访问');
    }
    jwt.verify(_token, jwtTokenSecret, (err, decode) => {
        if(err){
            return resHandle(res, null, 401, '无权访问');
        }else{
            req.user = decode;
            return next();
        }
    })
}