var mongodb = require('mongoose')
const CoursesCodes = mongodb.Schema({
    TeacherID: {
        type: Number,
        required: true
    },
    TeacherName: {
        type: String,
        required: true
    },
    CourseCode: {
        type: String,
        required: true
    }
});


module.exports = mongodb.model('COCODE', CoursesCodes);