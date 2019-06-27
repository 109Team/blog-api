module.exports = (req, res, next) => {
    let _body = {};
    if(req.body){
        _body = Object.assign({}, _body, req.body);
    }
    if(req.query){
        _body = Object.assign({}, _body, req.query);
    }
    LOG.info(`[入参]-[${UTIL.getTimeString()}]-[${req.method}]-[${req.url}]: ${JSON.stringify(_body)}`);
    next();
}