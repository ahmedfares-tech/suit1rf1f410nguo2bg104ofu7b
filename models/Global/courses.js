var mongodb = require('mongoose')
const courses = mongodb.Schema({
    CourseCounter:{
        type:Number,
        required:true
    },
    CourseName: {
        type: String,
        required: true
    }
});

module.exports = mongodb.model('addcourse', courses);