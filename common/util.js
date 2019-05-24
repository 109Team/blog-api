
// 获取时间字符串
exports.getTimeString = (date = Date.now()) => {
    return new Date(+date + 8 * 60 * 60 * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

// 判断是否是数组
exports.isArray = arr => {
    return Array.isArray ? Array.isArray(arr) : Object.prototype.toString.call(arr) == '[object Array]';
}

// 判断是否为null
exports.isNull = obj => {
    return !obj && typeof obj === 'object';
}