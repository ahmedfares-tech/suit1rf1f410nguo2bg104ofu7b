var mongodb = require('mongoose')
const TM99 = mongodb.Schema({
    TeacherID: {
        type: Number,
    },
    TeacherName: {
        type: String,

    },
    TeacherNumber: {
        type: String,
    },
    CourseCode: {
        type: String
    },
    CourseName: {
        type: String,
    },
    CourseDay: {
        type: String
    },
    CourseTime: {
        type: String
    },
    CourseGrade: {
        type: String,
    },
    TotalCost: {
        type: String
    },
    TeacherCost: {
        type: String
    },
    CenterCost: {
        type: String
    }
});

module.exports = mongodb.model('Relation', TM99)