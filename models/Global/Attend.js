var mongodb = require('mongoose')
const attends = mongodb.Schema({
    StudentID: {
        type: Number,
        required: true,
    },
    StudentNam: {
        type: String,
        required: true
    },
    totalattend: {
        type: Number,
        required: true
    },
    studentattendcounter: {
        type: Number,
        required: true
    },
    CourseTotalAttend: {
        type: Number,
        required: true
    },
    attenddate: {
        type: String,
        required: true
    },
    CourseCode: {
        type: String,
        required: true,
    },
    AttendChange: {
        type: Boolean,
        required: true,
    },
    coursepaid: {
        type: Number,
        required: true
    },
    CenterCost: {
        type: Number,
        required: true
    },
    TeacherCost: {
        type: Number,
        required: true
    }

});

module.exports = mongodb.model('attend', attends)