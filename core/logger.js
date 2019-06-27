const log4js = require('log4js');

const CONFIG = require('../app.config');

log4js.configure({
    appenders: {
        console: { type: "console" },
        logstash: {
            type: 'log4js-logstash-tcp',
            host: CONFIG.LOGSTASH.host,
            port: CONFIG.LOGSTASH.port,
            fields: {
                instanceId: CONFIG.APPNAME || 'appName',
                appName: CONFIG.APPNAME
            }
        }
    },
    categories: {
        default: { appenders: ['logstash', 'console'], level: 'debug' }
    }
});

module.exports = log4js.getLogger('default');
