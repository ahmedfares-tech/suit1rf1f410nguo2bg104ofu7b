var mongodb = require('mongoose')
const weekdays = mongodb.Schema({

    weekdays: {
        type: String,
        required: true
    }
});

module.exports = mongodb.model('days', weekdays)