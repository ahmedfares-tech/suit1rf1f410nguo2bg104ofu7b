var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));
const TD00 = mongodb.Schema({
    TeacherStaticID: {
        type: Number,
    },
    TeacherCourseCounter: {
        type: Number
    },
    CourseCode: {
        type: String,
        required: true
    },
    TeacherCourseGrade: {
        type: String,
        required: true
    },
    TeacherCourseTime: {
        required: true,
        type: {
            CourseDay: String,
            CourseTime: String
        },
    },
    TotalCost: {
        required: true,
        type: Number
    },
    TeacherCost: {
        required: true,
        type: Number
    },
    CenterCost: {
        required: true,
        type: Number
    }
});
module.exports = mongodb.model('TeacherInfo', TD00);