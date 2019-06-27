module.exports = {
    APPNAME: 'blog',
    VERSION: "v1",          // API版本号
    MONGODB: {              // mongodb配置信息
        uri: 'mongodb://127.0.0.1:27017/test'
    },
    JWTSECRET: 'Hopenjwt',  // 开发环境jwt密钥
    LOGSTASH: {
        host: '116.62.56.222',
        port: 5044
    }
    
}