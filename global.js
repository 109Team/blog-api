const LOG = require('./core/logger');
const UTIL = require('./common/util');
const CONFIG = require('./app.config');
module.exports = () => {
    global.CONFIG = CONFIG;
    global.UTIL = UTIL;
    global.LOG = LOG;
}