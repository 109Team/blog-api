const log4js = require('log4js');

const CONFIG = require('../app.config');

log4js.configure({
    appenders: [{
        type: "console", categrey: "app"
    }]
});

let logger = log4js.getLogger('app');
logger.setLevel(CONFIG.LOG.level || 'INFO');
exports.logger = app => {
    app.use(log4js.connectLogger(logger));
}
