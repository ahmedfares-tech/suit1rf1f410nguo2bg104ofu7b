/**
 * // 1- Finish Attend , 2- Fix Async & await issue
 * ? Somthing for collect money
 * ? Re Var all things with mine codes
 * ! finish login
 */

/**
 *  ?CODE BASE => S/T + R/I/M + Number
 * ! CODE BASE => Student/Teacher + Registeration/Info/Mix + Number
 */
TODO:
/**
 * !1 - Edit Navbar (* Fix Mobile Version, *Put Dropdown for all stuff, *Fix Links and sublinks)
 * !2 - Fix Login Style
 * !3- Search (*ID, *Number, *CourseCode, *Name) && Ajax auto response
 * !4 - Put Page For Change User Password
 * !5 - List Student For Each Course
 * !6 - put Missing things to tables
 * !7 - History For Attend (CourseCodeHistory , StudentHistory)
 * !8 - Collect (Center,Teacher,Student) => Money In one page
 * !9 - ID Section Put ajax for show name for kill errors
 * !10 - Update Data (Teacher=>{CourseData:{courseDay,CourseTime,Costs},////TeacherNumber})
 * !10 - Update Data (Students =>{CourseCode With Him Data such DAY,Time,COST,TEachername})
 * !11 - Fix In COST Any symbols !Dots Only for Decimal Numbers(Main Vaildator For all)
 * !12 - In Attend Table Ajax
 * !13 - Run StudentMix and TeacherMix for get data after post new data
 * ?14 - Comment All Lines After Sell The project
 * ?15 - Controller For Fast Use And best Apperance 
 * ?16 - Login with Passport.js
 * !17 - =>Dublicate Student in same course Forbiden
 * !18 - Design with marwan amir 
 * !19 - Attend Search AJAX
 * !20 - Update Data Ajax And Res Important data from nodeJS
 * !21 - Static Data Not Respose With Ajax :( Client Order )
 */

var express = require("express");
var router = express.Router();
const httpmsgs = require("http-msgs");
const date = require("date-and-time");
const attend = require("../models/Global/Attend");
const bycrypt = require('bcryptjs');

const DD = require('../models/Global/week');
const login = require('../models/login/login');
const TM00 = require("../models/teacher/TeacherMix");
const SM00 = require("../models/Student/StudentMix");
const addcourse = require("../models/Global/courses");
const addgrades = require("../models/Global/Grade");
const code = require('../models/Global/CoursesCodes');
var TeacherREG = require("../models/teacher/TeacherReg");
var TeacherData = require("../models/teacher/TeacherData");
const StudentController = require("../controller/StudentController");
const TeacherController = require("../controller/TeacherController");
var studentreg = require('../models/Student/StudentReg')
var studentcor = require('../models/Student/StudentCourses')
const routingcontroller = require("../controller/routeing");




/* GET home page. */
router.get("/init", routingcontroller.initlatiz);
router.get('/signup', (req, res, next) => {
  const admindata = new login({
    username: "admin",
    password: bycrypt.hashSync("123456789#*#", 10),
    loginvalue: true
  })
  admindata.save((error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log(result)
    }
  })
})
router.get("/", (req, res, next) => {
  login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {
        res.redirect('/home')
      } else {
        req.session.message = {
          type: 'danger',
          intro: 'Required',
          message: ('Please Login First')
        }
        res.redirect('/login')
      }
    }
  })
});


router.get("/student", routingcontroller.StudentRouting);
router.post("/studentREG", StudentController.STREG);

router.get('/studentcourse', routingcontroller.studentcourse)
router.post("/StudentCoursesREG", StudentController.STCA);

router.get("/teacher", routingcontroller.TeachersRouting);
router.post("/teacherREG", TeacherController.TCREG);

//FOR Code in index.js only remove after move to controllers
router.get('/teachercourse', routingcontroller.Teachercourse)
router.post("/teacherCourseREG", TeacherController.TCCREG);

router.get("/studentL", StudentController.ListStudent);
router.get("/ListStudentCourse/:id", StudentController.StudentsCourse);


router.get("/TeachersL", (req, res, next) => {
  login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {
        TeacherREG.find({}, (error, result) => {
          if (error) {
            console.log(error);
          } else {
            res.render("partials/Teachers/listTeachers", { Teachers: result, teacher: 'active', T01: 'active', searchQ: 'ajaxteacherl' });
          }
        });
      } else {
        req.session.message = {
          type: 'danger',
          intro: 'Required',
          message: ('Please Login First')
        }

        res.redirect('/login')
      }
    }
  })

});
router.get("/ListTeachersCourse/:id", (req, res, next) => {
  login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {
        var TeacherIDFromURL = req.params.id;
        TM00.find({ TeacherID: TeacherIDFromURL }, (error, result) => {
          if (error) {
            console.log(error);
          } else {
            console.log(result);
            res.render("partials/Teachers/listTeachersCourse", {
              TeachersCourses: result, teacher: 'active', searchQ: 'ajaxteachcol'
            });
          }
        });
      } else {
        req.session.message = {
          type: 'danger',
          intro: 'Required',
          message: ('Please Login First')
        }
        res.redirect('/login')
      }
    }
  })

});


router.post("/addcourse", (req, res, next) => {
  login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {
        var course = req.body.GCourses;
        addcourse.find({ CourseName: course }, (error, result) => {
          if (error) {
            console.log(error);
          } else {
            if (result == "") {
              addcourse.find({}, (error, result) => {
                if (error) {
                  console.log(error);
                } else {
                  var howmuchcourse = result.length;
                  //CourseCounter
                  const newcourse = new addcourse({
                    CourseCounter: howmuchcourse + 1,
                    CourseName: req.body.GCourses
                  });
                  newcourse.save((error, result) => {
                    if (error) {
                      console.log(error);
                    } else {
                      req.session.done = {
                        type: 'success',
                        intro: 'WOW ',
                        message: ('Course Add Successfully', req.body.GCourses)
                      }


                      res.redirect("/new");
                      console.log(result);
                    }
                  });
                }
              });
            } else {
              res.send(
                "This " +
                result[0].CourseName +
                " Course Is Exist with ID: " +
                result[0].CourseCounter
              );
            }
          }
        });
      } else {
        req.session.done = {
          type: 'danger',
          intro: 'Required',
          message: ('Please Login First')
        }
        res.redirect('/login')
      }
    }
  })

});
router.get("/new", (req, res, next) => {
  login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {
        addcourse.find({}, (error, result) => {
          if (error) {
            console.log(error);
          } else {
            res.render("partials/Courses/Courses", { data: result, co: 'active' });
          }
        });
      } else {
        req.session.message = {
          type: 'danger',
          intro: 'Required',
          message: ('Please Login First')
        }
        res.redirect('/login')
      }
    }
  })

});

router.post("/addgrade", (req, res, next) => {
  var Grade = req.body.GGrade;

  addgrades.find({ GradeLevel: Grade }, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      if (result == "") {
        addgrades.find({}, (error, result) => {
          if (error) {
            console.log(error);
          } else {
            var howmuchgrade = result.length;

            const newgrade = new addgrades({
              GradeCounter: howmuchgrade + 1,
              GradeLevel: req.body.GGrade
            });
            newgrade.save((error, result) => {
              if (error) {
                console.log(error);
              } else {
                req.session.done = {
                  type: 'success',
                  intro: 'WOW ',
                  message: ('Course Add Successfully', req.body.GGrade)
                }
                console.log(result);
                res.redirect("/grades");
              }
            });
          }
        });
      } else {
        res.send(
          "This " +
          result[0].GradeLevel +
          " Course Is Exist with ID: " +
          result[0].GradeCounter
        );
      }
    }
  });
});
router.get("/grades", (req, res, next) => {
  login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {
        addgrades.find({}, (error, grades) => {
          if (error) {
            console.log(error);
          } else {
            res.render("partials/Courses/Grade", { data: grades, gradd: 'active' });
          }
        });
      } else {
        req.session.message = {
          type: 'danger',
          intro: 'Required',
          message: ('Please Login First')
        }
        res.redirect('/login')
      }
    }
  })

});

router.get("/attend", (req, res, next) => {
  /**
                       <input type="hidden" name="TeacherNameQ" value="{{this.TeacherName}}">
                    <input type="hidden" name="CourseNameQ" value="{{this.CourseName}}">
                    <input type="hidden" name="CourseDayQ" value="{{this.CourseDay}}">
                    <input type="hidden" name="CourseGradeQ" value="{{this.CourseGrade}}">
                    <input type="hidden" name="CourseTimeQ" value="{{this.CourseTime}}">
                    <input type="hidden" name="CourseCost" value="{{this.CourseCost}}">
   */
  // res.render("partials/Attend", { stattend: "active" });
  console.log('get is working too we can use it')
});
router.post("/attend", (req, res, next) => {
  const now = new Date();
  var dat = date.format(now, "DD/MM/YYYY");
  var TNQ = req.body.TeacherNameQ;
  var CNQ = req.body.CourseNameQ;
  var CDQ = req.body.CourseDayQ;
  var CGQ = req.body.CourseGradeQ;
  var CTQ = req.body.CourseTimeQ;
  var CSQ = req.body.TotalCost;
  var co = req.body.CourseCode;
  console.log(
    TNQ +
    "<==>" +
    CNQ +
    "<==>" +
    CDQ +
    "<==>" +
    CGQ +
    "<==>" +
    CTQ +
    "<==>" +
    CSQ
  );
  SM00.find(
    {
      TeacherName: TNQ,
      courseName: CNQ,
      courseDay: CDQ,
      coursegrade: CGQ,
      courseTime: CTQ,
      courseCost: CSQ
    },
    (error, STLIST) => {
      if (error) {
        console.log(error);
      } else {

        console.log(STLIST)
        res.render("partials/Attend", { attend: STLIST, stattend: "active", code: co, Date: dat, stattend: "active", searchQ: 'ajaxsearch' });
      }
    }
  );
});


router.get('/UTI', (req, res, next) => {
  weekdays = [];
  DD.find({}, { _id: 0, weekdays: 1 }, (error, days) => {
    if (error) {
      console.log(error)
    } else {
      var weekdaylength = days.length
      for (var k = 0; k < weekdaylength; k++) {
        weekdays.push(days[k].weekdays)
      }
    }
  })
  var msgserror = req.flash('error')
  res.render('partials/User/UpdateTeacher', { days: weekdays, teacher: 'active', T02: 'active', msgs: msgserror })
})
router.post('/UTeacherinfo', (req, res, next) => {
  var TID = req.body.UTeachID
  var TNN = req.body.UTeachNum
  TeacherREG.find({ TeacherID: TID }, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      if (result.length > 0) {
        const updatetn = {
          TeacherNumber: TNN
        }
        TeacherREG.updateMany({ TeacherID: TID }, { $set: updatetn }, (error, result) => {
          if (error) {
            console.log(error)
          } else {
            // console.log(result)
            TM00.updateMany({ TeacherID: TID }, { $set: updatetn }, (error, result) => {
              if (error) {
                console.log(error)
              } else {
                req.session.done = {
                  type: 'success',
                  intro: 'Updated ',
                  message: ('Teacher Info Updated')
                }


                res.redirect('/UTI')
                console.log(result)
              }
            })
          }
        })
      } else {
        req.session.message = {
          type: 'danger',
          intro: 'Required',
          message: ('No Teacher Registed With This ID :(')
        }
        console.log('not found')

        res.redirect('/UTI')

      }
    }
  })
})
router.post('/UTeachercourse', (req, res, next) => {
  var TID = req.body.UTeachIDC
  var TCOD = req.body.Ucode
  var TCD = req.body.UDay
  var TCT = req.body.UTH + ":" + req.body.UTM + " " + req.body.UTAP
  var TTC = req.body.UTotalCost
  var TTeachC = req.body.UTeacherCost
  var TCC = req.body.UCenterCost
  // console.log(TCOD)
  TeacherREG.find({ TeacherID: TID }, (error, result) => {

    if (error) {
      console.log(error)
    } else {
      if (result.length > 0) {
        // console.log(result)
        var UTnam = result[0].TeacherName
        //  console.log(UTnam)
        TeacherData.find({ TeacherStaticID: TID, CourseCode: TCOD }, (error, result) => {
          if (error) {
            console.log(error)
          } else {
            if (result.length > 0) {
              //  console.log(result)
              const Tncd = {
                TeacherCourseTime: { CourseDay: TCD, CourseTime: TCT },
                TotalCost: TTC,
                TeacherCost: TTeachC,
                CenterCost: TCC
              }
              // TeacherData.updateOne({ TeacherStaticID: TID, CourseCode: TCOD }, { $set: Tncd }, (error, result) => {
              //   if (error) {
              //     console.log(error)
              //   } else {
              //     console.log(result)
              //   }
              // })
              TeacherData.find({ TeacherStaticID: TID, CourseCode: TCOD, 'TeacherCourseTime.CourseDay': TCD, 'TeacherCourseTime.CourseTime': TCT }, (error, result) => {
                if (error) {
                  console.log(error)
                } else {
                  if (result <= 0) {
                    TeacherData.updateMany({ TeacherStaticID: TID, CourseCode: TCOD }, { $set: Tncd }, (error, result) => {
                      if (error) {
                        console.log(error)
                      } else {
                        console.log("Teacher Data Updated")
                        SM00.find({ CourseCode: TCOD, TeacherName: UTnam }, (error, result) => {
                          if (error) {
                            console.log(error)
                          } else {
                            if (result.length > 0) {

                              const SMU = {
                                courseDay: TCD,
                                courseTime: TCT,
                                courseCost: TTC,
                                CenterCost: TCC,
                                TeacherCost: TTeachC
                              }

                              SM00.updateMany({ CourseCode: TCOD, TeacherName: UTnam }, { $set: SMU }, (error, result) => {
                                if (error) {
                                  console.log(error)
                                } else {
                                  console.log("SM00 Updated")
                                  studentcor.find({ 'StudentCourseInformation.CourseCode': TCOD, 'StudentCourseInformation.TeacherName': UTnam }, (error, result) => {
                                    if (error) {
                                      console.log(error)
                                    } else {
                                      var coursnm = result[0].StudentCourseInformation.CourseName
                                      if (result.length > 0) {
                                        const fuckup = {
                                          StudentCourseInformation: {
                                            CourseName: coursnm,
                                            TeacherName: UTnam,
                                            CourseCode: TCOD,
                                            CourseDay: TCD,
                                            CourseTime: TCT,
                                          },
                                          StudentCourseCost: TTC,
                                          CenterCost: TCC,
                                          TeacherCost: TTeachC
                                        }

                                        studentcor.updateMany({ 'StudentCourseInformation.CourseCode': TCOD, 'StudentCourseInformation.TeacherName': UTnam }, { $set: fuckup }, (error, result) => {
                                          if (error) {
                                            console.log(error)
                                          } else {
                                            console.log('StudentCor Updated')
                                            TM00.find({ TeacherID: TID, CourseCode: TCOD }, (error, result) => {
                                              if (error) {
                                                console.log(error)
                                              } else {
                                                //  console.log(result)
                                                if (result.length > 0) {
                                                  const TMIXU = ({
                                                    CourseDay: TCD,
                                                    CourseTime: TCT,
                                                    TotalCost: TTC,
                                                    TeacherCost: TTeachC,
                                                    CenterCost: TCC
                                                  })
                                                  TM00.updateMany({ TeacherID: TID, CourseCode: TCOD }, { $set: TMIXU }, (error, result) => {
                                                    if (error) {
                                                      console.log(error)
                                                    } else {
                                                      req.session.done = {
                                                        type: 'success',
                                                        intro: 'Updated ',
                                                        message: ('Data Updated Succufylly')
                                                      }
                                                      console.log('TM00 Updated')
                                                      res.redirect('/UTI')
                                                    }
                                                  })
                                                }
                                              }
                                            })
                                          }
                                        })
                                      } else {
                                        req.session.message1 = {
                                          type: 'danger',
                                          intro: 'Warning',
                                          message: ('Srry The Course You Target Not Available :(')
                                        }
                                        console.log('there is no course with this data')
                                        res.redirect('/UTI')
                                      }
                                    }
                                  })
                                }
                              })

                            } else {
                              req.session.message1 = {
                                type: 'danger',
                                intro: 'Required',
                                message: ('No Student Registed With This ID :(')
                              }
                              console.log('Not Found Student Rgisted')
                              res.redirect('/UTI')
                            }

                          }
                        })
                      }
                    })

                  } else {
                    req.session.message1 = {
                      type: 'danger',
                      intro: 'Required',
                      message: ('This Data Already Registed with This Teacher')
                    }
                    console.log("Sorry This Course Data You Entered Belong to another course")
                    res.redirect('/UTI')
                  }
                }
              })


            } else {
              req.session.message1 = {
                type: 'danger',
                intro: 'Required',
                message: ('Cannot Find This Course Srry :(')
              }
              console.log('Not Found This Course')
              res.redirect('/UTI')
            }
          }
        })
      } else {
        req.session.message1 = {
          type: 'danger',
          intro: 'Required',
          message: ('No Teacher Registed With This ID :(')
        }
        console.log("Not found")
        res.redirect('/UTI')
      }
    }
  })
})


router.get('/USI', (req, res, next) => {
  res.render('partials/User/UpdateStudents', { student: 'active', USI: 'active' })
})
router.post('/UStudentinfo', (req, res, next) => {
  var SID = req.body.UStudentIDin
  var snm = req.body.UStudentName
  var stnum = req.body.UStudentNumber
  var prtnum = req.body.UStudentParentsPhone
  var whatnum = req.body.UStudentWhatsappPhone
  var retgcost = req.body.UStudentRegisterationAmount
  studentreg.find({ Studentid: SID }, (error, result) => {
    //  console.log('Post => ', result)
    if (error) {
      console.log(error)
    } else {
      if (result.length > 0) {
        const SIU = {
          StudentName: snm,
          Phones: {
            studentphone: stnum,
            parentsphone: prtnum,
            whatsappphone: whatnum,
          },
          REGcost: retgcost
        }
        studentreg.find({ StudentName: snm, 'Phones.studentphone': stnum, 'Phones.parentsphone': prtnum, 'Phones.whatsappphone': whatnum }, (error, result) => {
          if (error) {
            console.log(error)
          } else {
            if (result.length <= 0) {
              studentreg.updateMany({ Studentid: SID }, { $set: SIU }, (error, result) => {
                if (error) {
                  console.log(error)
                } else {
                  console.log(result)
                  const SMIU = {
                    StudentName: req.body.UStudentName,
                    StudentNumber: req.body.UStudentNumber,
                    ParentsNumber: req.body.UStudentParentsPhone,
                  }
                  SM00.updateMany({ StudentID: SID }, { $set: SMIU }, (error, result) => {
                    if (error) {
                      console.log(error)
                    } else {
                      req.session.done = {
                        type: 'success',
                        intro: 'Updated ',
                        message: ('Data Updated Succuflly')
                      }
                      console.log('TM00 Updated')
                      res.redirect('/USI')
                      console.log(result)
                    }
                  })
                }
              })
            } else {
              req.session.message = {
                type: 'danger',
                intro: 'Required',
                message: ('This Student Already Registed On Our System Srry :(')
              }
              console.log("Cannot Update Because This Student Data Is Same With Onther Data")
              res.redirect('/USI')
            }
          }
        })

      }

      else {
        req.session.message = {
          type: 'danger',
          intro: 'Required',
          message: ('This ID Not For Any Student')
        }
        console.log('Not Found')
        res.redirect('/USI')
      }
    }
  })
})
router.post('/UStudentcourse', (req, res, next) => {
  var sid = req.body.UStudentID
  var snm = req.body.studentname
  var tnm = req.body.UTeacher
  var Occode = req.body.UCCourseCode
  var Nccode = req.body.UNCourseCode
  var crnm = req.body.coursename
  var crda = req.body.Courseday
  var crtm = req.body.CourseTime
  var crgd = req.body.CourseGrade
  var tot = req.body.TotalCost
  var TCoost = req.body.TeacherCoost
  var CCoost = req.body.CenterCoost
  //console.log(sid + '=>' + snm + '=>' + tnm + '=>' + Occode + '=>' + Nccode + '=>' + crnm + '=>' + crda + '=>' + crtm + '=>' + crgd + '=>' + tot)
  if (sid == '' || snm == '' || tnm == 'Choose Teacher Name:' || Occode == 'Choose Current Course:' || Nccode == 'Choose New Course Code:' || crnm == '' || crda == '' || crtm == '' || tot == '' || crgd == '' || TCoost == '' || CCoost == '') {
    req.session.message1 = {
      type: 'danger',
      intro: 'Required',
      message: 'Please Fill All Fileds'
    }
    console.log("Some Data Not provided")
    res.redirect('/USI')
  } else {
    studentreg.find({ Studentid: sid }, (error, result) => {
      if (error) {
        console.log(error)
      } else {
        if (result.length > 0) {
          // console.log(result)
          studentcor.find({ StudentIDStatic: sid, 'StudentCourseInformation.CourseCode': Occode }, (error, result) => {
            if (error) {
              console.log(error)
            } else {
              if (result.length > 0) {
                studentcor.find({ StudentIDStatic: sid, 'StudentCourseInformation.CourseCode': Nccode }, (error, result) => {
                  if (error) {
                    console.log(error)
                  } else {
                    if (result <= 0) {
                      // console.log(result)
                      const studencodata = ({
                        StudentCourseInformation: {
                          CourseName: crnm,
                          TeacherName: tnm,
                          CourseCode: Nccode,
                          CourseDay: crda,
                          CourseTime: crtm
                        },
                        StudentCourseCost: tot,
                        CenterCost: CCoost,
                        TeacherCost: TCoost
                      })
                      studentcor.updateMany({ StudentIDStatic: sid, 'StudentCourseInformation.CourseCode': Occode }, { $set: studencodata }, (error, result) => {
                        if (error) {
                          console.log(error)
                        } else {
                          console.log('Student Course Updated')
                          SM00.find({ StudentID: sid, CourseCode: Occode, StudentName: snm }, (error, result) => {
                            if (error) {
                              console.log(error)
                            } else {
                              if (result.length > 0) {
                                const studentmixu = ({
                                  TeacherName: tnm,
                                  CourseCode: Nccode,
                                  courseName: crnm,
                                  courseDay: crda,
                                  courseTime: crtm,
                                  courseCost: tot,
                                  CenterCost: CCoost,
                                  TeacherCost: TCoost
                                })
                                SM00.updateMany({ StudentID: sid, CourseCode: Occode, StudentName: snm }, { $set: studentmixu }, (error, result) => {
                                  if (error) {
                                    console.log(error)
                                  } else {
                                    console.log('SM00 Updated')
                                    req.session.done = {
                                      type: 'success',
                                      intro: 'Updated ',
                                      message: ('Data Updated Succuflly')
                                    }
                                    console.log('TM00 Updated')
                                    res.redirect('/USI')
                                  }
                                })
                              } else {
                                req.session.message1 = {
                                  type: 'danger',
                                  intro: 'Required',
                                  message: 'please contact The Support'
                                }
                                console.log("There Is Some Error Or Un-Defined Msgs")
                                res.redirect('/USI')
                              }
                            }
                          })
                        }
                      })
                    } else {
                      req.session.message1 = {
                        type: 'danger',
                        intro: 'Required',
                        message: ('This Student Is Already Registed In This Course!')
                      }
                      console.log('He Is Already Registed in This Course Srry :( you cannot update')
                      res.redirect('/USI')
                    }
                  }
                })

              } else {
                req.session.message1 = {
                  type: 'danger',
                  intro: 'Required',
                  message: ('Please Sure From ID and Course You want to change!')
                }
                console.log("Cannot See Such Data")
                res.redirect('/USI')
              }
            }
          })
        } else {
          req.session.message1 = {
            type: 'danger',
            intro: 'Required',
            message: ('This ID Not For Any Student')
          }
          console.log("Student Not found")
          res.redirect('/USI')
        }
      }
    })
  }

})



router.get('/login', (req, res, next) => {
  res.render('index', { login: 'hidden' })
})
router.post('/login', (req, res, next) => {
  var username = req.body.Username
  var password = req.body.pass
  login.find({ username: username }, (error, result) => {
    if (error) {
      console.log(error)
    }
    else {
      if (result.length <= 0) {
        req.session.message = {
          type: 'danger',
          intro: 'Required',
          message: ('Username Not Found')
        }
        res.redirect('/login')
        console.log("USER NOT FOUND!")
      } else {
        var dbuser = result[0].username
        var dbpass = result[0].password
        bycrypt.compare(password, dbpass, (error, result) => {
          if (error) {
            console.log(error)
          } else {
            if (username == dbuser && result == true) {
              console.log('Login in succfully')
              const logedin = {
                loginvalue: true,
              }
              login.updateOne({ username: username }, { $set: logedin }, (error, result) => {
                if (error) {
                  console.log(error)
                } else {
                  console.log(result)
                }
              })
              res.redirect('/home')
            } if (result == false) {
              console.log('Password Wrong')
              req.session.message = {
                type: 'danger',
                intro: 'Required',
                message: ('Password Wrong')
              }
              res.redirect('/login')
            }
          }
        })

      }
    }
  })

})


router.get('/admin', (req, res, next) => {
  res.render('partials/User/ChangePassword', { pass: 'active' })
})
router.post('/admin', (req, res, next) => {
  var current = req.body.old
  var newpass = req.body.new
  var conpass = req.body.con
  login.find({}, (error, result) => {
    var savedpass = result[0].password
    bycrypt.compare(current, savedpass, (error, result) => {
      if (error) {
        console.log(error)
      } else {
        if (result == true && current !== newpass && newpass == conpass) {
          const updatepass = {
            password: bycrypt.hashSync(newpass, 10)
          }
          login.updateOne({ username: 'admin' }, { $set: updatepass }, (error, result) => {
            if (error) {
              console.log(error)
            } else {
              req.session.message = {
                type: 'success',
                intro: 'WOW!',
                message: 'New Password Is Here'
              }

              console.log(result)

              res.redirect('/admin')
            }
          })
        } else if (current == newpass) {
          req.session.message = {
            type: 'danger',
            intro: 'Required',
            message: ('Please Choose New Password!')
          }
          //console.log('current password is wrong')
          res.redirect('/admin')
        } else if (result == false) {
          req.session.message = {
            type: 'danger',
            intro: 'Required',
            message: ('current password is wrong')
          }
          //console.log('current password is wrong')
          res.redirect('/admin')
        } else if (newpass == conpass) {
          req.session.message = {
            type: 'danger',
            intro: 'Required',
            message: ('Password And confirm password Not matched!')
          }
          //console.log('current password is wrong')
          res.redirect('/admin')
        }
      }
    })
  })
})



router.get("/home", async (req, res, next) => {
  login.find({}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      var checkstatus = user[0].loginvalue
      if (checkstatus == true) {
        TM00.find({}, (error, result) => {
          if (error) {
            console.log(error)
          } else {
            // console.log(result)
            res.render('partials/Home', { data: result, home: 'active' })
          }
        })

        // counter = 0;
        // TeacherCheck = [];
        // fuck = [];
        // TeacherREG.findAsync({}, { _id: 0, TeacherName: 1, TeacherID: 1, TeacherNumber: 1, TeacherCourse: 1 },
        //   (error, users) => {
        //     if (error) {
        //       console.log(error);
        //     } else {
        //       TeacherCheck.push(users);
        //       // console.log(TeacherCheck)
        //       TeacherData.find({}, { _id: 0, __v: 0 }, (error, courses) => {
        //         var hmcourse = courses.length
        //         if (error) {
        //           console.log(error);
        //         } else {
        //           TM00.deleteMany({}, (error, result) => {
        //             if (error) {
        //               console.log(error);
        //             } else {
        //               // console.log("5lsna mn el data el 2dema");
        //             }
        //           });
        //           // console.log('TeacherREG => ', users)
        //           var gettablefuck = users.map(user => {
        //             //  console.log('Users=>', user)
        //             Teachercourse = [];
        //             Teachercourse.push(
        //               user,
        //               courses.filter(course => {
        //                 return user.TeacherID === course.TeacherStaticID;
        //               })
        //             );
        //             return Teachercourse;
        //           });

        //           var HMUSERS = gettablefuck.length;

        //           //    console.log('HMUSERS=>', HMUSERS)
        //           for (var i = 0; i < HMUSERS; i++) {
        //             //  console.log(gettablefuck[i]);
        //             var other = gettablefuck[i][1].length;
        //             // console.log(other)
        //             for (var j = 0; j < other; j++) {
        //               var TeacherID = gettablefuck[i][1][j].TeacherStaticID;
        //               var TeacherName = gettablefuck[i][0].TeacherName;
        //               var TeacherCourseName = gettablefuck[i][0].TeacherCourse;
        //               var TeacherNumber = gettablefuck[i][0].TeacherNumber;

        //               var Courseday =
        //                 gettablefuck[i][1][j].TeacherCourseTime.CourseDay;
        //               var CourseTime =
        //                 gettablefuck[i][1][j].TeacherCourseTime.CourseTime;
        //               var TeacherCourseGrade =
        //                 gettablefuck[i][1][j].TeacherCourseGrade;
        //               var CourseCode = gettablefuck[i][1][j].CourseCode;
        //               var TotalCost = gettablefuck[i][1][j].TotalCost;
        //               var TeacherCost = gettablefuck[i][1][j].TeacherCost;
        //               var CenterCost = gettablefuck[i][1][j].CenterCost;

        //               const Mixed = new TM00({
        //                 TeacherID: TeacherID,
        //                 TeacherName: TeacherName,
        //                 TeacherNumber: TeacherNumber,
        //                 CourseName: TeacherCourseName,
        //                 CourseDay: Courseday,
        //                 CourseGrade: TeacherCourseGrade,
        //                 CourseTime: CourseTime,
        //                 TotalCost: TotalCost,
        //                 TeacherCost: TeacherCost,
        //                 CenterCost: CenterCost,
        //                 CourseCode: CourseCode
        //               });
        //               Mixed.save((error, result) => {
        //                 if (error) {
        //                   console.log(error);
        //                 } else {
        //                   // console.log("KOSM NODEJS wel MONGODB =>", result)
        //                   console.log('counter => ', counter)
        //                   if (counter >= hmcourse - 1) {
        //                     const today = days_function.days();
        //                     console.log('render function start <======')
        //                     TM00.findAsync({}, (error, result) => {
        //                       if (error) {
        //                         console.log(error);
        //                       } else {
        //                         // console.log(result)
        //                         res.render("partials/Home.hbs", { data: result, count: result.length, home: 'active' });
        //                       }
        //                     });

        //                   }
        //                   counter++
        //                 }

        //               });
        //             }
        //             //      console.log("Teacher REG =>",gettablefuck[i][0].TeacherName)


        //           }
        //           // console.log(gettablefuck[0][1][4])
        //         }
        //       });

        //     }

        //   }
        // );

      } else {
        req.session.message = {
          type: 'danger',
          intro: 'Required',
          message: ('Please Login First')
        }
        res.redirect('/login')
      }
    }
  })


});


router.post('/testing', (req, res, next) => {
  var TN = req.body.Teachername
  var CC = req.body.coursecode
  var CT = req.body.coursetime
  var CD = req.body.coureseday
  var CG = req.body.coursegrade
  console.log(TN + "=>" + CC + "=>" + CD + "=>" + CG)
  SM00.find({ TeacherName: TN, CourseCode: CC, courseDay: CD }, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      if (result.length <= 0) {

        console.log('There is no Students Yet!:(')
        res.render('partials/Teachers/ListStudentForCourse', { data: result, teacher: 'active', searchQ: 'ajaxstuteach1' })
      } else {
        res.render('partials/Teachers/ListStudentForCourse', { data: result, teacher: 'active', searchQ: 'ajaxstuteachl' })
      }
    }
  })
})


router.post("/ajaxcoursename", (req, res, next) => {
  teacherarry = [];
  var coursename = req.body.coursenameretive;
  //console.log(coursename)
  TeacherREG.find({ TeacherCourse: coursename }, (error, Teacher) => {
    if (error) {
      console.log(error);
    } else {
      //console.log(coursename)
      for (var i = 0; i < Teacher.length; i++) {
        teacherarry.push(Teacher[i].TeacherName);
      }
      console.log(teacherarry);
      httpmsgs.sendJSON(req, res, { TeacherNamE: teacherarry });
    }
  });
});

router.post("/ajaxcoursegrade", (req, res, next) => {
  var CN = req.body.CN;
  var TN = req.body.TN;
  var SID = req.body.id
  gradearry = [];
  console.log(CN + "<==>" + TN);
  studentreg.find({ Studentid: SID }, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      if (result.length > 0) {
        var stugrd = result[0].courseGrade
        //    console.log('stugrd=>>>>>>>>', stugrd)
        TM00.find({ CourseName: CN, TeacherName: TN, CourseGrade: stugrd }, { _id: 0, __v: 0 },
          (error, grade) => {
            if (error) {
              console.log(error);
            } else {
              //  console.log(grade)
              for (var i = 0; i < grade.length; i++) {
                gradearry.push(grade[i].CourseGrade);
              }
              //  console.log(gradearry)

              gradefilteredarry = gradearry.filter((item, index) => {
                return gradearry.indexOf(item) === index;
              });
              // console.log(gradefilteredarry);
              httpmsgs.sendJSON(req, res, { grades: gradefilteredarry });
            }
          }
        );
      } else {
        console.log("Not Found")
      }
    }
  })

});

router.post("/ajaxcourseday", (req, res, next) => {
  var CN = req.body.CN;
  var TN = req.body.TN;
  var CG = req.body.CG;
  console.log(CN + "<==>" + TN + "<==>" + CG);
  dayarry = [];
  TM00.find(
    { CourseName: CN, TeacherName: TN, CourseGrade: CG },
    { _id: 0, __V: 0 },
    (error, day) => {
      if (error) {
        console.log(error);
      } else {
        for (var i = 0; i < day.length; i++) {
          dayarry.push(day[i].CourseDay);
        }
        dayfilteredarry = dayarry.filter((item, index) => {
          return dayarry.indexOf(item) === index;
        });
        httpmsgs.sendJSON(req, res, { days: dayfilteredarry });
      }
    }
  );
});
router.post("/ajaxcoursetime", (req, res, next) => {
  var CN = req.body.CN;
  var TN = req.body.TN;
  var CG = req.body.CG;
  var CD = req.body.CD;
  timearry = [];
  console.log(CN + "=>" + TN + "=>" + CG + "=>" + CD);

  TM00.find(
    { CourseName: CN, TeacherName: TN, CourseGrade: CG, CourseDay: CD },
    { _id: 0, __v: 0 },
    (error, time) => {
      if (error) {
        console.log(error);
      } else {
        //        console.log(time);

        for (var i = 0; i < time.length; i++) {
          timearry.push(time[i].CourseTime);
        }

        httpmsgs.sendJSON(req, res, { time: timearry });
      }
    }
  );
});

router.post("/ajaxcoursecost", (req, res, next) => {
  var CN = req.body.CN;
  var TN = req.body.TN;
  var CG = req.body.CG;
  var CD = req.body.CD;
  var CT = req.body.CT;
  costarry = [];
  console.log(CN + "=>" + TN + "=>" + CG + "=>" + CD + "=>" + CT);
  TM00.find(
    {
      CourseName: CN,
      TeacherName: TN,
      CourseGrade: CG,
      CourseDay: CD,
      CourseTime: CT
    },
    { _id: 0, __v: 0 },
    (error, cost) => {
      for (var i = 0; i < cost.length; i++) {
        costarry.push(cost[i].TotalCost);
      }
      console.log(costarry);
      httpmsgs.sendJSON(req, res, { amount: costarry });
    }
  );
});




router.post("/putattend", (req, res, next) => {
  const now = new Date();
  var attenddate = date.format(now, "DD/MM/YYYY");
  var studentid = req.body.StudentID;
  var studentname = req.body.StudentName;
  var coursecode = req.body.CourseCode;
  var coursepaid = req.body.CoursePaided;
  var centercost = req.body.CenterCost
  var teachercost = req.body.TeacherCost
  console.log(studentid + "<==>" + studentname + "<==>" + coursecode + "<==>" + attenddate + "<==>" + coursepaid)
  attend.find({}, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      var getallattends = result.length;

      attend.find(
        { StudentID: studentid, CourseCode: coursecode },
        (error, result) => {
          if (error) {
            console.log(error);
          } else {
            var getstudentattendforcourse = result.length;

            attend.find(
              {
                StudentID: studentid,
                CourseCode: coursecode,
                attenddate: attenddate
              },
              (error, checkattend) => {
                //  console.log(checkattend.length)
                var checkking = checkattend.length;
                // IF There is no common data
                attend.find({ CourseCode: coursecode, attenddate: attenddate }, (error, result) => {

                  var coursetotal = result.length
                  if (checkking <= 0) {
                    const attendconfirm = new attend({
                      StudentID: studentid,
                      StudentNam: studentname,
                      totalattend: getallattends + 1,
                      studentattendcounter: getstudentattendforcourse + 1,
                      CourseTotalAttend: coursetotal + 1,
                      attenddate: attenddate,
                      CourseCode: coursecode,
                      AttendChange: true,
                      coursepaid: coursepaid,
                      CenterCost: centercost,
                      TeacherCost: teachercost,

                    });
                    attendconfirm.save((error, result) => {
                      if (error) {
                        console.log(error);
                      } else {
                        req.session.done = {
                          type: 'success',
                          intro: 'Attend Saved',
                          message: ('student:' + studentname + " Attended succuffly")
                        }
                        
                        
                        console.log(result);
                      }
                    });
                  } else {
                    //  console.log(checkattend[0].AttendChange)
                    var getattendvalue = checkattend[0].AttendChange;
                    //    console.log('getattendvalue =>', getattendvalue)
                    const changeattendfalse = {
                      AttendChange: false
                    };

                    const changeattendtrue = {
                      AttendChange: true
                    };

                    attend.updateOne(
                      {
                        StudentID: studentid,
                        CourseCode: coursecode,
                        attenddate: attenddate
                      },
                      { $set: changeattendtrue },
                      (error, result) => {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log(result);
                        }
                      }
                    );
                  }

                })
              }


            );
          }
        }
      );
    }
  });
});

router.post("/removeattend", (req, res, next) => {
  const now = new Date();
  var attenddate = date.format(now, "DD/MM/YYYY");
  var studentid = req.body.StudentID;
  var studentname = req.body.StudentName;
  var coursecode = req.body.CourseCode;
  var coursepaid = req.body.CoursePaided;

  attend.find(
    { StudentID: studentid, CourseCode: coursecode, attenddate: attenddate },
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        const attendchangefalse = {
          AttendChange: false
        }
        attend.updateOne({ StudentID: studentid, CourseCode: coursecode, attenddate: attenddate }, { $set: attendchangefalse }, (error, result) => {
          if (error) {
            console.log(error)
          } else {
            console.log(result)
          }
        })
      }
    }
  );
});


router.post('/ajaxattendbutton', async (req, res, next) => {
  await sleep(3000)
  var coursecode = req.body.CCO
  const now = new Date();
  var attenddate = date.format(now, "DD/MM/YYYY");
  attendcounterforhtml = [];
  attend.find({ attenddate: attenddate, CourseCode: coursecode }, (error, result) => {
    if (error) {
      console.log(error)
    }
    else {
      for (var i = 0; i < result.length; i++) {
        var checkfromvaild = result[i].AttendChange
        if (checkfromvaild == true) {
          // console.log('this is true value')
          attendcounterforhtml.push(checkfromvaild)

        }
        //  attendcounterforhtml.push()
        else {

        }
        // console.log('attendcounterforhtml =>', attendcounterforhtml)
      }
      var totalattendpushed = attendcounterforhtml.length;
      console.log('totalattendpushed=>', totalattendpushed)
      httpmsgs.sendJSON(req, res, { getthat: totalattendpushed })
      console.log('result=>', result)
    }
  })
})

router.post('/ajaxremovebutton', async (req, res, next) => {
  await sleep(2000)
  var coursecode = req.body.CCO
  const now = new Date();
  var attenddate = date.format(now, "DD/MM/YYYY");
  attendcounterforhtml = [];
  attend.find({ attenddate: attenddate, CourseCode: coursecode }, (error, result) => {
    if (error) {
      console.log(error)
    }
    else {
      for (var i = 0; i < result.length; i++) {
        var checkfromvaild = result[i].AttendChange
        if (checkfromvaild == true) {
          // console.log('this is true value')
          attendcounterforhtml.push(checkfromvaild)

        }
        //  attendcounterforhtml.push()
        else {

        }
        // console.log('attendcounterforhtml =>', attendcounterforhtml)
      }
      var totalattendpushed = attendcounterforhtml.length;
      httpmsgs.sendJSON(req, res, { getthat: totalattendpushed })
      console.log('result=>', result)
    }
  })
})





router.get('/logout', (req, res, next) => {
  login.find({}, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      var username = result[0].username
      const logout = {
        loginvalue: false,
      }
      login.updateOne({ username: username }, { $set: logout }, (error, result) => {
        if (error) {
          console.log(error)
        } else {
          console.log(result)
          req.session.message = {
            type: 'primary',
            intro: ':(',
            message: ('We Wanna See You Again!')
          }
          res.redirect('/login')
        }
      })
    }
  })

})





router.get('/status', (req, res, next) => {
  attend.find({}, (error, result) => {
    var totalattendmoney = 0;
    var centertotalmoney = 0;
    var teachertotalmoney = 0;
    if (error) {
      console.log(error);
    } else {
      var zft = result
      for (var i = 0; i < result.length; i++) {
        totalattendmoney = totalattendmoney + result[i].coursepaid
        centertotalmoney = centertotalmoney + result[i].CenterCost
        teachertotalmoney = teachertotalmoney + result[i].TeacherCost
      }
      code.find({}, (error, result) => {
        if (error) {
          console.log(error)
        } else {
          //  console.log(result)
          resultarry = [];
          for (var i = 0; i < result.length; i++) {
            resultarry.push(result[i].CourseCode)
          }
          // 

          res.render('partials/User/Status', { coco: resultarry, data: zft, total: totalattendmoney, center: centertotalmoney, teacher: teachertotalmoney, Status: 'active', searchQ: 'testnewcollect' })

        }
      })
    }
  })
})

router.post('/Tsearchforid', (req, res, next) => {
  var teacherid = req.body.id1
  TeacherREG.find({ TeacherID: teacherid }, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      if (result.length <= 0) {
        httpmsgs.sendJSON(req, res, { data: 'NO Such Student Registed' })

      } else {

        httpmsgs.sendJSON(req, res, { data: 'Teacher Exist With Name:' + result[0].TeacherName })

      }
    }
  })
})
router.post('/searchforid', (req, res, next) => {
  var studentid = req.body.id1
  studentreg.find({ Studentid: studentid }, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      if (result.length <= 0) {
        httpmsgs.sendJSON(req, res, { data: 'NO Such Student Registed' })

      } else {
        httpmsgs.sendJSON(req, res, { data: 'Student Exist With Name:' + result[0].StudentName })

      }
    }
  })
})

/**
  console.log('both of them empty') => {Attend Only}
   console.log('courseCode Have Value && date no') => {Attend && CourseCode}
   console.log('coursedate have value && code no') => {Attend && CourseDate}
   console.log('both of them have value') => {Attend && CourseDate && CoureseCode}
 */
/**
 * ?CourseCode
 * ?AttendChange
 * ?attenddate
 */
router.post('/firstcon', (req, res, next) => {
  var attendvar = req.body.attend
  if (attendvar == 'all') {
    attend.find({}, (error, result) => {
      if (error) {
        console.log(error)
      } else {
        //console.log(result)
        httpmsgs.sendJSON(req, res, { backres: result })
      }
    })
  } else {
    attend.find({ AttendChange: attendvar }, (error, result) => {
      if (error) {
        console.log(error)
      } else {
        //console.log(result)
        httpmsgs.sendJSON(req, res, { backres: result })
      }
    })
  }
})
router.post('/secondcon', (req, res, next) => {
  var attendvar = req.body.attend
  var coursecode = req.body.code
  if (attendvar == 'all') {
    attend.find({ CourseCode: coursecode }, (error, result) => {
      if (error) {
        console.log(error)
      } else {
        // console.log(result)
        httpmsgs.sendJSON(req, res, { backres: result })
      }
    })
  } else {
    attend.find({ AttendChange: attendvar, CourseCode: coursecode }, (error, result) => {
      if (error) {
        console.log(error)
      } else {
        // console.log(result)
        httpmsgs.sendJSON(req, res, { backres: result })
      }
    })
  }
})
router.post('/thirdcon', (req, res, next) => {
  var attendvar = req.body.attend
  var coursedate = req.body.date
  //console.log(coursedate)
  if (attendvar == 'all') {
    attend.find({ attenddate: coursedate }, (error, result) => {
      if (error) {
        console.log(error)
      } else {
        //   console.log(result)
        httpmsgs.sendJSON(req, res, { backres: result })
      }
    })
  } else {
    attend.find({ AttendChange: attendvar, attenddate: coursedate }, (error, result) => {
      if (error) {
        console.log(error)
      } else {
        //   console.log(result)
        httpmsgs.sendJSON(req, res, { backres: result })
      }
    })
  }
})
router.post('/fourthcon', (req, res, next) => {
  var attendvar = req.body.attend
  var coursecode = req.body.code
  var coursedate = req.body.date
  if (attendvar == 'all') {
    attend.find({ CourseCode: coursecode, attenddate: coursedate }, (error, result) => {
      if (error) {
        console.log(error)
      } else {
        //  console.log(result)
        httpmsgs.sendJSON(req, res, { backres: result })
      }
    })
  } else {
    attend.find({ CourseCode: coursecode, AttendChange: attendvar, attenddate: coursedate }, (error, result) => {
      if (error) {
        console.log(error)
      } else {
        //  console.log(result)
        httpmsgs.sendJSON(req, res, { backres: result })
      }
    })
  }
})



//AJAX CHECEK LATer
router.post('/SU1', (req, res, next) => {
  var studentid = req.body.stid
  SM00.find({ StudentID: studentid }, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      if (result.length > 0) {
        httpmsgs.sendJSON(req, res, { codo: result })
      } else {
        httpmsgs.sendJSON(req, res, { error: "No Student With This ID" })
        //console.log("Not Found This Student")
      }
    }
  })
})
router.post('/SU2', (req, res, next) => {
  var id = req.body.stid
  var code = req.body.code
  // console.log('This is code=>', code)
  SM00.find({ StudentID: id, CourseCode: code }, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      if (result.length > 0) {
        var CN = result[0].courseName
        TeacherREG.find({ TeacherCourse: CN }, (error, result) => {
          if (error) {
            console.log(error)
          } else {
            if (result.length > 0) {
              httpmsgs.sendJSON(req, res, { TN: result })
            } else {
              httpmsgs.sendJSON(req, res, { error: 'This Course Not have Teachers' })
              console.log("There Is Error")
            }
          }
        })
      } else {
        httpmsgs.sendJSON(req, res, { error: 'No Student With This ID Or Wrong Course Code!' })
        console.log("Not Found This Student Somthing happing WRong!!:(")
      }
    }
  })
})
router.post('/SU3', (req, res, next) => {
  var TN = req.body.TN
  var id = req.body.id
  studentreg.find({ Studentid: id }, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      if (result.length > 0) {
        var studentgrad = result[0].courseGrade

        TM00.find({ TeacherName: TN, CourseGrade: studentgrad }, (error, result) => {
          if (error) {
            console.log(error)
          } else {
            if (result.length > 0) {
              httpmsgs.sendJSON(req, res, { final: result })
              // console.log('TeacherName=>' + result[0].TeacherName + "Teacher ID=>" + result[0].TeacherID)

            } else {
              httpmsgs.sendJSON(req, res, { error: 'Not Found Teacher With this name' })
              console.log("Not Found Teacher With this name")
            }
          }
        })
      } else {
        console.log(result)
        httpmsgs.sendJSON(req, res, { error: 'Enter Correct Student ID' })
        console.log("Not !!!!!")
      }
    }
  })

})
router.post('/SU4', (req, res, next) => {
  var id = req.body.id
  var TN = req.body.TN
  var code = req.body.code
  studentreg.find({ Studentid: id }, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      if (result.length > 0) {
        var info = result
        TM00.find({ TeacherName: TN, CourseCode: code }, (error, result) => {
          if (error) {
            console.log(error)
          } else {
            if (result.length > 0) {
              // console.log(result)
              httpmsgs.sendJSON(req, res, { show: result, info: info })
            } else {

              console.log("There Is Another Error")
            }
          }
        })
      } else {
        console.log('There is fucking error')
      }
    }
  })

})
//AJAX CHECEK LATer





router.post('/SM00', (req, res, next) => {
  var id = req.body.id
  studentreg.find({ Studentid: id }, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      if (result.length > 0) {
        console.log(result)
        httpmsgs.sendJSON(req, res, { info: result })
      } else {

        httpmsgs.sendJSON(req, res, { error: "This Id Is Not For any student" })
      }
    }
  })
})


router.post('/TU1', (req, res, next) => {
  var TID = req.body.TID
  TeacherData.find({ TeacherStaticID: TID }, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log(result)
      httpmsgs.sendJSON(req, res, { codes: result })
    }
  })
})
router.post('/TU2', (req, res, next) => {
  var TID = req.body.TID
  var code = req.body.TCODE
  TeacherData.find({ TeacherStaticID: TID, CourseCode: code }, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      httpmsgs.sendJSON(req, res, { complete: result })
    }
  })
})



function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
module.exports = router;

