exports.getNow = () => {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}