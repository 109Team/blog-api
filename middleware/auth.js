const jwt = require('jsonwebtoken');

const resHandle = require('../common/resHandle');

module.exports = (req, res, next) => {
    const _token = req.headers.authoriation;
    if(!_token){
        return resHandle(res, null, 401, '无权访问');
    }
    
    jwt.verify(_token, CONFIG.JWTSECRET, (err, decode) => {
        if(err){
            return resHandle(res, err, 401, '无权访问');
        }else{
            req.user = decode;
            return next();
        }
    })
}