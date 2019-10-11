// Var For CAll Schemas For Teachers
var TeacherREG = require('../models/teacher/TeacherReg');
var TeacherData = require('../models/teacher/TeacherData');
var coursescode = require('../models/Global/CoursesCodes');
var TM00 = require('../models/teacher/TeacherMix');
TeacherRegistertion = (req, res, next) => {
  var Tnm = req.body.TeacherName
  var TNum = req.body.TeacherNumber
  var TCo = req.body.TeacherCourse
  TeacherREG.find({ TeacherName: Tnm, TeacherNumber: TNum, TeacherCourse: TCo }, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      if (result.length > 0) {
        req.session.message = {
          type: 'danger',
          intro: 'Required',
          message: ('This Teacher Already Registed Srry')
        }
        res.redirect('/teacher')
      } else {
        // Find All Teacher for give new teacher second ID
        TeacherREG.find({}, (error, result) => {
          // If Happen Any Error
          if (error) {
            console.log(error)
          }

          else {
            // variable to get length of teacher Schema
            var newteacherid = result.length;
            // Save data in (newteacher) to start store it 
            const newteacher = new TeacherREG({
              TeacherID: newteacherid + 1,
              TeacherName: req.body.TeacherName,
              TeacherNumber: req.body.TeacherNumber,
              TeacherCourse: req.body.TeacherCourse
            })
            //Store Data from (newteacher) in Schema
            newteacher.save((error, result) => {
              //If Error Happing
              if (error) {
                console.log(error)
              }
              else {
                req.session.done = {
                  type: 'success',
                  intro: 'Done!',
                  message: ('Teacher Added')
                }
                res.redirect('/teacher')
                console.log(result)
              }
            }) // End of Storing Data
          }
        }) // End of Function
      }
    }
  })

}

TeacherCourseRegisteration = (req, res, next) => {
  var GetTeacherIDFORM = req.body.TEACHERIDCHECK
  var CourseGrade = req.body.Grade
  var CourseDay = req.body.Day
  var CourseTime = req.body.TH + ':' + req.body.TM + ' ' + req.body.TAP
  var TotalCostv = req.body.TotalCost
  var TeacherCostv = req.body.TeacherCost
  var CenterCostv = req.body.CenterCost

  TeacherREG.find({ TeacherID: GetTeacherIDFORM }, (error, result) => {
    if (error) {
      console.log(error)
    }
    else {
      var Teachercoursename = result[0].TeacherCourse.substring(0, 3)
      var TeacherNameForCode = result[0].TeacherName
      var TeacherNumbr = result[0].TeacherNumber
      var Coursenm = result[0].TeacherCourse
      // console.log(TeacherNameForCode)
      var CheckTeacherExist = result.length;
      if (CheckTeacherExist <= 0) {
        req.session.message = {
          type: 'danger',
          intro: 'Required',
          message: ('This Id Not Belong For any teacher')
        }
        res.redirect('/teachercourse')
        console.log('UserNotFound')
      }
      else {
        TeacherData.find({
          TeacherStaticID: GetTeacherIDFORM,
          TeacherCourseGrade: CourseGrade,
          'TeacherCourseTime.CourseDay': CourseDay,
          'TeacherCourseTime.CourseTime': CourseTime,
        }, (error, result) => {
          if (error) {
            console.log(error)
          } else {
            if (result.length > 0) {
              req.session.message = {
                type: 'danger',
                intro: 'Required',
                message: ('Teacher Have Course At The Same Time Srry')
              }
              res.redirect('/teachercourse')
              console.log("Teacher Have Course With This Data!")
            } else {
              TeacherData.find({
                TeacherStaticID: GetTeacherIDFORM,
                TeacherCourseGrade: CourseGrade,
                'TeacherCourseTime.CourseDay': CourseDay,
                'TeacherCourseTime.CourseTime': CourseTime,
                TotalCost: TotalCostv, TeacherCost: TeacherCostv, CenterCost: CenterCostv
              }, (error, result) => {
                if (error) {
                  console.log(error)
                } else {
                  if (result.length <= 0) {
                    TeacherData.find({ TeacherStaticID: GetTeacherIDFORM }, (error, result) => {
                      if (error) {
                        console.log(error)
                      }
                      else {
                        var TeacherCounterCourse = result.length
                        coursescode.find({}, (error, result) => {
                          if (error) {
                            console.log(error);
                          } else {
                            var CoursesCodeCounter = result.length + 100


                            const TeacherInfo = new TeacherData({
                              TeacherStaticID: GetTeacherIDFORM,
                              TeacherCourseCounter: TeacherCounterCourse + 1,
                              TeacherCourseGrade: req.body.Grade,
                              TeacherCourseTime: {
                                CourseDay: req.body.Day,
                                CourseTime: req.body.TH + ':' + req.body.TM + ' ' + req.body.TAP

                              },
                              CourseCode: Teachercoursename + CoursesCodeCounter,
                              TotalCost: req.body.TotalCost,
                              TeacherCost: req.body.TeacherCost,
                              CenterCost: req.body.CenterCost
                            })
                            const coursecode = new coursescode({
                              TeacherID: GetTeacherIDFORM,
                              TeacherName: TeacherNameForCode,
                              CourseCode: Teachercoursename + CoursesCodeCounter,
                            })
                            const MIXED = new TM00({
                              TeacherID: GetTeacherIDFORM,
                              TeacherName: TeacherNameForCode,
                              TeacherNumber: TeacherNumbr,
                              CourseCode: Teachercoursename + CoursesCodeCounter,
                              CourseName: Coursenm,
                              CourseDay: req.body.Day,
                              CourseTime: req.body.TH + ':' + req.body.TM + ' ' + req.body.TAP,
                              CourseGrade: req.body.Grade,
                              TotalCost: req.body.TotalCost,
                              TeacherCost: req.body.TeacherCost,
                              CenterCost: req.body.CenterCost
                            })
                            TeacherInfo.save((error, result) => {
                              if (error) {
                                console.log(error)
                              }
                              else {
                                coursecode.save((error, result) => {
                                  if (error) {
                                    console.log(error)
                                  } else {
                                    // console.log(result)
                                    MIXED.save((error, result) => {
                                      if (error) {
                                        console.log(error)
                                      } else {
                                        req.session.done = {
                                          type: 'success',
                                          intro: 'Done!',
                                          message: ('Course Added')
                                        }
                                        res.redirect('/teachercourse')
                                        console.log(result)
                                      }
                                    })
                                  }
                                })
                                console.log(result)
                              }
                            })
                          }
                        })

                      }
                    })

                  } else {
                    req.session.message = {
                      type: 'danger',
                      intro: 'Required',
                      message: ('Teacher Have Similar Course With Same Data')
                    }
                    res.redirect('/teachercourse')
                    console.log('THis Course Is Exist With This Teacher Sorry You Still can update it')
                  }
                }
              })
            }
          }
        })


      }

    }
  })
}

TeacherSearch = (req, res, next) => {
  var check = req.body.TeacherSearchType;
  if (check == 'ID') {
    var TeacherSearchID = req.body.TeacherSearch;
    TeacherREG.find({ TeacherID: TeacherSearchID }, (error, result) => {
      if (error) {
        console.log(error)
      }
      else {
        var CheckEmptyArray = result.length;
        if (CheckEmptyArray <= 0) {
          console.log('Not Found')
        }
        else {
          console.log(result)
        }
      }
    })
  }
  else {
    var TeacherSearchName = req.body.TeacherSearch;
    TeacherREG.find({ TeacherName: TeacherSearchName }, (error, result) => {
      if (error) {
        console.log(error)
      }
      else {
        var CheckEmptyArray = result.length;
        if (CheckEmptyArray <= 0) {
          console.log('Not Found')
        }
        else {
          console.log(result)
        }
      }
    })
  }
}


module.exports = {
  TCREG: TeacherRegistertion,
  TCCREG: TeacherCourseRegisteration,
  TCSEA: TeacherSearch
}