const TeacherName = require('../models/teacher/TeacherReg')
const courses = require('../models/Global/courses');
const weekday = require('../models/Global/week');
const grades = require('../models/Global/Grade');
var login = require('../models/login/login');
initlatiz = (req, res, next) => {
    login.find({}, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            var checkstatus = user[0].loginvalue
            if (checkstatus == true) {
                weekday.deleteMany({}, (error) => {
                    console.log(error)
                })
                weekarray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

                for (var i = 0; i < weekarray.length; i++) {
                    const weekdays = new weekday({
                        weekdays: weekarray[i]
                    })
                    weekdays.save((error, result) => {
                        if (error) {
                            console.log(error)
                        } else {
                            console.log(result)
                        }
                    })

                }
            } else {
                res.redirect('/login')
            }
        }
    })

}
// Routing To Main Student Page
StudentsMainRouting = (req, res, next) => {
    login.find({}, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            var checkstatus = user[0].loginvalue
            if (checkstatus == true) {
                gradesarry = [];
                grades.find({}, (error, result) => {

                    for (var i = 0; i < result.length; i++) {
                        gradesarry.push(result[i].GradeLevel)
                    }
                    res.render('partials/Students/Student', { student: 'active', grade: gradesarry, student: 'active', streg: 'active' })

                })


            } else {
                res.redirect('/login')
            }
        }
    })


    // Teachersname = [];
    // coursesname = [];
    // weekdays = [];
    // TeacherName.find({}, { TeacherName: 1, _id: 0 }, (error, result) => {
    //     if (error) {
    //         console.log(error);

    //     } else {

    //         var teachernamelength = result.length;
    //         for (var i = 0; i < teachernamelength; i++) {
    //             Teachersname.push(result[i].TeacherName)
    //         }
    //         courses.find({}, (error, courses) => {
    //             if (error) { console.log(error) }
    //             else {
    //                 var coursesnamelength = courses.length;
    //                 for (var j = 0; j < coursesnamelength; j++) {
    //                     coursesname.push(courses[j].CourseName)
    //                 }
    //             }

    //             weekday.find({}, { _id: 0, weekdays: 1 }, (error, days) => {
    //                 if (error) {
    //                     console.log(error)
    //                 }
    //                 else {

    //                     var weekdaylength = days.length
    //                     for (var k = 0; k < weekdaylength; k++) {
    //                         weekdays.push(days[k].weekdays)
    //                     }
    //                 }

    //                 res.render('partials/Students/Student', { student: 'active', data: Teachersname, courses: coursesname, days: weekdays })
    //             })
    //         })
    //     }
    // })

}
StudentCourseRouting = (req, res, next) => {
    courses.find({}, { _id: 0, CourseName: 1 }, (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            zft = [];
            for (var i = 0; i < result.length; i++) {
                zft.push(result[i].CourseName)
            }
            res.render('partials/Students/StudentCourse', { courses: zft, student: 'active', stcoa: 'active' })
        }
    })
}
// Routing to Students Table

TeacherCourseadde = (req, res, next) => {
    weekdays = [];
    gradesarry = [];
    weekday.find({}, { _id: 0, weekdays: 1 }, (error, days) => {
        if (error) {
            console.log(error)
        }
        else {

            var weekdaylength = days.length
            for (var k = 0; k < weekdaylength; k++) {
                weekdays.push(days[k].weekdays)
            }
        }
        grades.find({}, { _id: 0, __V: 0 }, (error, result) => {
            if (error) {
                console.log(error);

            }
            else {
                console.log(result)
                for (var i = 0; i < result.length; i++) {
                    gradesarry.push(result[i].GradeLevel)
                }
                res.render('partials/Teachers/TeacherCourse', { days: weekdays, grade: gradesarry, teacher: 'active',T00:'active' })
            }
        })

    })
}
//Routing To main Teachers Page
TeachersMainRouting = (req, res, next) => {
    login.find({}, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            var checkstatus = user[0].loginvalue
            if (checkstatus == true) {
                coursename = [];

                courses.find({}, (error, courses) => {
                    if (error) {
                        console.log(error)
                    }
                    else {
                        var coursesnamelength = courses.length;
                        for (var j = 0; j < coursesnamelength; j++) {
                            coursename.push(courses[j].CourseName)
                        }
                        res.render('partials/Teachers/Teacher', { teacher: 'active', courses: coursename, teacher: 'active',TMC:'active' })


                    }
                })

            } else {
                res.redirect('/login')
            }
        }
    })

}
/*
TeachersMainRouting = (req, res, next) => {
    var zft = [];
    courses.find({}, (error, result) => {
        if (error) {
            console.log(error)
        }
        else {
            console.log(result)
            zftlength = result.length
            for (var i = 0; i < zftlength; i++) {
                zft.push(result[i].CourseName)
            }
            res.render('partials/Teachers/Teacher', { teacher: 'active', courses: zft })
        }
    })



}
*/

module.exports = {
    StudentRouting: StudentsMainRouting,
    studentcourse: StudentCourseRouting,
    TeachersRouting: TeachersMainRouting,
    Teachercourse: TeacherCourseadde,
    initlatiz: initlatiz

    // StudentTableRouting:ListStudent
}