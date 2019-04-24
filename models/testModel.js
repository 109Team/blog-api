
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TestSchema = new Schema({
    name: {
        type: String,
        required: 'required a name'
    },
    status: {
        type: [
            {
                type: String,
                enum: ['pending', 'completed']
            }
        ],
        default: ['pending']
    }
});
module.exports = mongoose.model('TestModel', TestSchema, 'site');