/**
 * 对所有请求拦截过滤
 * 设置允许的请求方法
 * 设置允许跨域
 * */
module.exports = app => {
    app.all('*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authoriation,Accept,X-Requested-With,Origin');
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.header('X-Powered-By', 'Express/4.16.4');
        if(req.method == 'OPTIONS')
            res.send(200);
        else
            next();
    })
}