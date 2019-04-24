const mongoose = require('mongoose');

const CONGIG = require('../app.config');

// 初始化mongoose
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

exports.mongoose = mongoose;

exports.connect = () => {
    mongoose.connect(CONGIG.MONGODB.uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        promiseLibrary: global.Promise
    }).then(
        () => {
            console.info(`mongoose connected with: ${CONGIG.MONGODB.uri}!`);
        },
        err => {
            console.error(`mongoose connect error: ${err}`)
        }
    )
}