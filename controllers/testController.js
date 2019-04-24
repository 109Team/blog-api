const mongoose = require('mongoose');

const TestModel = mongoose.model('TestModel');

exports.testGetAll = (req, res) => {
    TestModel.find({}, (err, data) => {
        if (err)
            res.send(err);
        else
            res.json(data);
    })
}