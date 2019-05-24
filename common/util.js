exports.getTimeString = (date = Date.now()) => {
    return new Date(+date + 8 * 60 * 60 * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

exports.isArray = arr => {
    return Array.isArray ? Array.isArray(arr) : Object.prototype.toString.call(arr) == '[object Array]';
}

exports.isNull = obj => {
    return !obj && typeof obj === 'object';
}