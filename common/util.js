exports.getTimeString = (date = Date.now()) => {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

exports.isArray = (arr) => {
    return Array.isArray ? Array.isArray(arr) : Object.prototype.toString.call(arr) == '[object Array]';
}