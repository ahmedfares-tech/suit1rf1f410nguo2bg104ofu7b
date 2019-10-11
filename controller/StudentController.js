// Var For CAll Schemas For Students
var StudentReg = require('../models/Student/StudentReg');
var StudentsCourses = require('../models/Student/StudentCourses');
var getcoursecode = require("../models/teacher/TeacherMix");
var login = require('../models/login/login');
var SM00 = require('../models/Student/StudentMix')

//Registeration New Student
StudentRegisteration = (req, res, next) => {
  var Studentnm = req.body.StudentName
  var stnum = req.body.StudentNumber
  var partnum = req.body.StudentParentsPhone
  var whatnum = req.body.StudentWhatsappPhone
  var grade = req.body.StudentGrade
  console.log(Studentnm + '=>' + stnum + '=>' + partnum + '=>' + whatnum + '=>' + grade)
  StudentReg.find({ StudentName: Studentnm, 'Phones.studentphone': stnum, 'Phones.parentsphone': partnum, 'Phones.whatsappphone': whatnum, courseGrade: grade }, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      if (result.length <= 0) {
        // Find Function to find the length to put id for new User
        StudentReg.find({}, "Studentid", (error, result) => {
          // Error with database well give us error
          if (error) {
            console.log(error)
          }
          // If It's okey and find the Students Database
          else {
            // variable for get Length of Studentid in database
            var HMStudent = result.length;

            // Collect Data from SChema and Form hbs
            const StudentRegisteration = new StudentReg({
              Studentid: HMStudent + 1,
              StudentName: req.body.StudentName,
              Phones: {
                studentphone: req.body.StudentNumber,
                parentsphone: req.body.StudentParentsPhone,
                whatsappphone: req.body.StudentWhatsappPhone,
              },
              courseGrade: req.body.StudentGrade,
              AnotherData: {
                SchoolName: req.body.StudentSchoolName,
              },
              REGcost: req.body.StudentRegisterationAmount
            })//End Of Collect Data

            //Save Data To Database
            StudentRegisteration.save((error, result) => {
              // If there is error in save
              if (error) {
                console.log(error)
              }
              // Print the result of saving
              else {
                console.log(result)
                req.session.done = {
                  type: 'success',
                  intro: 'Registed',
                  message: ('Registed Sucussfully')
                }

                //  res.redirect('')
                res.redirect('/student')
              }
            })
          }//End of Else
        }) // End of find function
      } else {
        req.session.message = {
          type: 'danger',
          intro: 'Required',
          message: ('Sorry This Student Registed Before')
        }
        res.redirect('/student')
        console.log("Sorry This Student Is REgisted Before")
      }
    }
  })

};

// Registeration New Course For Student
StudentCourseAdd = (req, res, next) => {
  var studentid = req.body.StudentIDVal
  var coursename = req.body.CourseName
  var teachername = req.body.TeacherName
  var coursegrade = req.body.CourseGRADE_add
  var courseday = req.body.Day
  var coursetime = req.body.time
  var coursecost = req.body.StudentCourseCost
  //console.log(coursename + '=>' + teachername + '=>' + coursegrade + '=>' + courseday + '=>' + coursetime + '=>' + coursecost+'=>'+studentid);
  StudentsCourses.find({
    StudentIDStatic: studentid, 'StudentCourseInformation.CourseName': coursename,
    'StudentCourseInformation.TeacherName': teachername,
    CourseGrade: coursegrade,
    'StudentCourseInformation.CourseDay': courseday,
    'StudentCourseInformation.CourseTime': coursetime,
    StudentCourseCost: coursecost
  }, (error, result) => {
    //console.log(result)
    if (error) {
      console.log(error)
    } else {
      if (result.length <= 0) {
        //   console.log('Not Exist')
        getcoursecode.find({ CourseName: coursename, TeacherName: teachername, CourseGrade: coursegrade, CourseDay: courseday, CourseTime: coursetime, TotalCost: coursecost }, (error, coursecode) => {
          var code = coursecode[0].CourseCode
          var TeacherCost = coursecode[0].TeacherCost
          var CenterCost = coursecode[0].CenterCost
          // Variable for get ID from Form

          var StudentID = req.body.StudentIDVal
          // Find If Student in Our Database or not
          StudentReg.find({ Studentid: StudentID }, (error, result) => {
            if (error) {
              //Error is somthing happen
              console.log(error)
            }
            else {
              //Get length of result to check if he exist or not
              var checkifresultarray = result.length;
              //If else for check of empty
              if (checkifresultarray == 0) {
                // Error Message
                req.session.message = {
                  type: 'danger',
                  intro: 'Required',
                  message: ('Sorry This Student Not Register On our system')
                }
                res.redirect('/studentcourse')
                console.log('Not Found')
                // If it have value
              } else {
                // Search for Student from Form in Course Students Data Base
                StudentsCourses.find({ StudentIDStatic: StudentID }, (error, result) => {
                  // If Somthing Happend
                  if (error) {
                    console.log(error)
                    //If It is okey
                  } else {
                    // Counter For Spseeefic Student (Count How Course He Reg)
                    var StudentCourseCounter = result.length;
                    // Get data from Page to put it in Database
                    const Studentcourseadd = new StudentsCourses({
                      // Get StudentID from page and other data
                      StudentIDStatic: req.body.StudentIDVal,
                      // 
                      StudentCourseID: StudentCourseCounter + 1,
                      CourseGrade: req.body.CourseGRADE_add,
                      StudentCourseInformation: {
                        CourseName: req.body.CourseName,
                        TeacherName: req.body.TeacherName,
                        CourseCode: code,
                        CourseDay: req.body.Day,
                        CourseTime: req.body.time,

                        // missing Course Time Getting @@@@@@@
                      },
                      StudentCourseCost: req.body.StudentCourseCost,
                      CenterCost: CenterCost,
                      TeacherCost: TeacherCost
                    })
                    // Put Getting Data To Database
                    Studentcourseadd.save((error, result) => {
                      if (error) {
                        console.log(error)
                      }
                      else {
                        counter = 0;
                        SM00.deleteMany({}, (error, finish) => {
                          if (error) {
                            console.log(error);
                          } else {
                            //     console.log("DeLETED=============");
                          }
                        });
                        StudentReg.find({}, { _id: 0, __v: 0 }, (error, studentinfo) => {
                          if (error) {
                            console.log(error);
                          } else {
                            StudentsCourses.find({}, { _id: 0, __v: 0 }, (error, studentcourse) => {
                              var allstudentcourses = studentcourse.length
                              if (error) {
                                console.log(error);
                              } else {
                                // console.log('studentinfo =>', studentinfo)
                                // console.log('studeentcourse =>', studentcourse)
                                var studentfulldata = studentinfo.map(studentin => {
                                  //   console.log('studentin=>', studentin)
                                  Studenttotal = [];
                                  Studenttotal.push(
                                    studentin,
                                    studentcourse.filter(studentco => {
                                      return studentin.Studentid === studentco.StudentIDStatic;
                                    })
                                  );

                                  // console.log('Studenttotal =>', Studenttotal)

                                  return Studenttotal;
                                });
                                for (var i = 0; i < studentfulldata.length; i++) {
                                  var studentcourseslength = studentfulldata[i][1].length;
                                  for (var j = 0; j < studentcourseslength; j++) {
                                    var studentid = studentfulldata[i][0].Studentid;
                                    var studentname = studentfulldata[i][0].StudentName;
                                    var studentphone = studentfulldata[i][0].Phones.studentphone;
                                    var parentsphone = studentfulldata[i][0].Phones.parentsphone;
                                    var regcost = studentfulldata[i][0].REGcost;

                                    var coursegrade = studentfulldata[i][1][j].CourseGrade;
                                    var CourseName =
                                      studentfulldata[i][1][j].StudentCourseInformation.CourseName;
                                    var TeacherName =
                                      studentfulldata[i][1][j].StudentCourseInformation.TeacherName;
                                    var CourseDay =
                                      studentfulldata[i][1][j].StudentCourseInformation.CourseDay;
                                    var CourseTime =
                                      studentfulldata[i][1][j].StudentCourseInformation.CourseTime;
                                    var CourseCode =
                                      studentfulldata[i][1][j].StudentCourseInformation.CourseCode;
                                    var CourseCost = studentfulldata[i][1][j].StudentCourseCost;
                                    var CenterCOST = studentfulldata[i][1][j].CenterCost;
                                    var TeacherCOST = studentfulldata[i][1][j].TeacherCost;
                                    // console.log('============START============');
                                    // console.log(studentid);
                                    // console.log(studentname);
                                    // console.log(studentphone);
                                    // console.log(parentsphone);
                                    // console.log(regcost);
                                    // console.log("===========MID===============");
                                    // console.log(CourseName);
                                    // console.log(TeacherName);
                                    // console.log(CourseDay);
                                    // console.log(CourseHour + ':' + CourseMinutes + '' + CourseAP);
                                    // console.log(CourseCost);
                                    // console.log("==========END==============");
                                    // console.log("            ");
                                    // console.log("            ");
                                    // console.log("            ");

                                    const mixed = new SM00({
                                      StudentID: studentid,
                                      StudentName: studentname,
                                      StudentNumber: studentphone,
                                      ParentsNumber: parentsphone,
                                      TeacherName: TeacherName,
                                      coursegrade: coursegrade,
                                      courseName: CourseName,
                                      courseDay: CourseDay,
                                      courseTime: CourseTime,
                                      courseCost: CourseCost,
                                      CourseCode: CourseCode,
                                      CenterCost: CenterCOST,
                                      TeacherCost: TeacherCOST,
                                    });
                                    mixed.save((error, result) => {
                                      if (error) {
                                        console.log(error);
                                      } else {
                                        // console.log(result);
                                        //  console.log('allstudentcourses =>', allstudentcourses)
                                        if (counter == allstudentcourses - 1) {
                                          SM00.find({}, (error, result) => {
                                            if (error) {
                                              console.log(error);
                                            } else {
                                              var fuck = result.length;
                                              var money = 0;
                                              for (var i = 0; i < result.length; i++) {
                                                var money = money + result[i].courseCost;
                                              }
                                            }
                                          });
                                        }
                                      }
                                      counter++

                                    });
                                  }

                                }
                                req.session.done = {
                                  type: 'success',
                                  intro: 'Done!',
                                  message: ('Course Added Succufully')
                                }

                                res.redirect('/studentcourse')
                              }
                            });
                          }
                        });
                      }
                    })// End of saved Data Saved

                  }// Else
                })//End Of function that add courses to some one


              }

            }
          })
        })
      } else {
        req.session.message = {
          type: 'danger',
          intro: 'Required',
          message: ('You Cannot Register Student Twice In Same Course :(')
        }
        res.redirect('/studentcourse')
        console.log('This Student Already Registed on this course')
      }
    }
  })

}

// Search for Student
StudentSearch = (req, res, next) => {
  var checksearchoption = req.body.StudentSearchType
  if (checksearchoption == 'ID') {
    //var for get Student ID From User
    var StudentIDSearch = req.body.StudentSearch;
    //Search For Id In DataBase
    StudentReg.find({ Studentid: StudentIDSearch }, '', (error, result) => {
      //If There error Log it
      if (error) {
        console.log(error)
      }
      else {
        // var for check for array is empyte ( User Exist )
        var CheckOfExistforStudent = result.length;
        // IF ElSE FOR Check if array is empyte
        if (CheckOfExistforStudent == 0) {
          //will be editd with sessions
          console.log('Not Found')
        }
        else {
          // if all gone done print result
          console.log(result)
        } // end of else
      }// end for uper else
    })// end of find function
  } else {
    //var for get Student ID From User
    var StudentNameSearch = req.body.StudentSearch;
    //Search For Id In DataBase
    StudentReg.find({ StudentName: StudentNameSearch }, '', (error, result) => {
      //If There error Log it
      if (error) {
        console.log(error)
      }
      else {
        // var for check for array is empyte ( User Exist )
        var CheckOfExistforStudent = result.length;
        // IF ElSE FOR Check if array is empyte
        if (CheckOfExistforStudent == 0) {
          //will be editd with sessions
          console.log('Not Found')
        }
        else {
          // if all gone done print result
          console.log(result)
        } // end of else
      }// end for uper else
    })// end of find function
  }

};

// TABLES

// Student Table

StudentTable = (req, res, next) => {
  login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {
        //find All Students that registered on our system
        StudentReg.find({}, (error, result) => {
          if (error) {
            console.log(error)
          } else {
            //SEND All Students to the table
            res.render('partials/Students/listStudents', { Student: result, student: 'active', stlist: 'active', searchQ: 'ajaxstudentl' })
          }
        })
      } else {
        res.redirect('/login')
      }
    }
  })

}

// Student Course Table

StudentCoursesTable = (req, res, next) => {

  login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {
        // var for get id from url
        var StudentIDForCourse = req.params.id;
        // Go to Schema and find the student id he get from url
        StudentsCourses.find({ StudentIDStatic: StudentIDForCourse }, (error, result) => {
          // print if somthing happened
          if (error) {
            console.log(error)
          }
          // Render the page with given content from schema
          else {
            res.render('partials/Students/listStudentsCourse', { StudentCourses: result, student: 'active', searchQ: 'ajaxstudentcl' })
          } // End of else
        }) // End of find
      } else {
        res.redirect('/login')
      }
    }
  })


}


module.exports = {
  STREG: StudentRegisteration,
  STCA: StudentCourseAdd,
  STSEA: StudentSearch,
  //tables

  ListStudent: StudentTable,

  StudentsCourse: StudentCoursesTable
}

/**
    login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {

      } else {
        res.redirect('/login')
      }
    }
  })
 */