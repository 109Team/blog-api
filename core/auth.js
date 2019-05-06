const jwt = require('jsonwebtoken');

const resHandle = require('../core/dbResHandle');
const CONFIG = require('../app.config');

module.exports = (req, res, next) => {
    const _token = req.headers.authorization;
    if(!_token){
        return resHandle(res, null, 401, '无权访问');
    }
    jwt.verify(_token, CONFIG.JWTSECRET, (err, decode) => {
        if(err){
            return resHandle(res, null, 401, '无权访问');
        }else{
            req.user = decode;
            return next();
        }
    })
}