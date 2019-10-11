var mongodb = require('mongoose')
const TR09 = mongodb.Schema({
    TeacherID: {
        type: Number,
    },
    TeacherName: {
        type: String,
        required: true
    },
    TeacherNumber: {
        type: String,
        required: true
    },
    TeacherCourse: {
        type: String,
        required: true
    },
});

module.exports = mongodb.model('TeacherRegisteration', TR09);