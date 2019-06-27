const mongoose = require('mongoose');

// 初始化mongoose
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

exports.mongoose = mongoose;
exports.connect = () => {
    mongoose.connect(CONFIG.MONGODB.uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        promiseLibrary: global.Promise
    }).then(
        () => {
            LOG.info(`mongoose connected with: ${CONFIG.MONGODB.uri}!`);
        },
        err => {
            LOG.error(`mongoose connect error: ${err}`)
        }
    )
}