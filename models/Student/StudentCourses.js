
var mongodb = require('mongoose')
const SC00 = mongodb.Schema({
    // St
    StudentIDStatic: { 
        type: Number
    },
    StudentCourseID: {
        required: true,
        type: Number,

    },
    CourseGrade: {
        type: String,
        required: true
    },
    StudentCourseInformation: {
        required: true,
        type: {
            CourseName: String,
            TeacherName: String,
            CourseCode: String,
            CourseDay: String,
            CourseTime: String
        }
    },
    StudentCourseCost: {
        type: Number,
        required: true
    },
    CenterCost: {
        type: Number,
        required:true
    },
    TeacherCost: {
        type: Number,
        required:true
    }
});

module.exports = mongodb.model('StudentsCoursessAddeder', SC00);