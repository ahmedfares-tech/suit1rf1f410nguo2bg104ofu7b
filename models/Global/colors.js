var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));
const color = mongodb.Schema({
    colorID: {
        type: Number
    },
    colorpath: {
        type: String
    }
})

module.exports = mongodb.model('color', color)