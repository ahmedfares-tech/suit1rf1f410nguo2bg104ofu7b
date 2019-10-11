var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));


const users = mongodb.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    loginvalue:{
        type:Boolean,
        required:true
    }
})

module.exports = mongodb.model('logindata', users)