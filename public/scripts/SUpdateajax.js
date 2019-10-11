$(document).ready(() => {
    //STUDENT INFO
    $('#UStudentIDin').on("keyup", () => {
        var id = $('#UStudentIDin').val()
        $('#Sinfoalert').empty()
        $.post('/SM00', { id: id }, res => {
            if (res.info) {
                var studentinfo = res.info[0]
                $('#Sinfoalert').append('<div class="alert alert-success" role="alert">' + studentinfo.StudentName + '</div>')
                $('#Name').show()
                $('#Studentphone').show()
                $('#ParentsPhone').show()
                $('#WhatsappPhone').show()
                $('#RegisterationAmount').show()
                $('#SubmitButton').show()
                $('#UStudentName').val(studentinfo.StudentName).show()
                $('#UStudentNumber').val(studentinfo.Phones.studentphone).show()
                $('#UStudentParentsPhone').val(studentinfo.Phones.parentsphone).show()
                $('#UStudentWhatsappPhone').val(studentinfo.Phones.whatsappphone).show()
                $('#UStudentRegisterationAmount').val(studentinfo.REGcost).show()
            }
            if (res.error) {

                $('#Sinfoalert').append('<div class="alert alert-danger" role="alert"> Wrong ID</div>')


                $('#UStudentName').val('')
                $('#UStudentNumber').val('')
                $('#UStudentParentsPhone').val('')
                $('#UStudentWhatsappPhone').val('')
                $('#UStudentRegisterationAmount').val('')
            }

        })
    })
    //STUDENT INFO

    //DATA Course
    // Check From Student Exist
    $('#UStudentID').on('keyup', e => {
        var studentid = $('#UStudentID').val()
        $('#UCCourseCode').empty()
        $('#SDalert').empty()
        $('#UTeacher').empty().append('<option>Choose Teacher Name:</option>')
        $('#UNCourseCode').empty().append("<option>Choose New Course Code:</option>")
        $.post('/SU1', { stid: studentid }, res => {
            if (res.codo) {
                var std = res.codo
                $('#UCCourseCode').append("<option>Choose Current Course:</option>")
                std.forEach(element => {
                    $('#UCCourseCode').append("<option>" + element.CourseCode + "</option>")
                });
                $('#SDalert').append('<div class="alert alert-success" role="alert">Student Name:' + std[0].StudentName + '</div>')
                $('#CurrentCourseCode').show()
            }
            if (res.error) {
                $('#SDalert').append('<div class="alert alert-danger" role="alert">' + res.error + '</div>')
                $('#UCCourseCode').append("<option>Choose Current Course Code:</option>")
            }

        })
    })

    //Course Name & Teacher Name
    $('#UCCourseCode').change(e => {
        var studentid = $('#UStudentID').val()
        var codo = $('#UCCourseCode').val()
        if ($('#UCCourseCode').val() == 'Choose Current Course:') {
            $('#SDalert').empty()
            $('#Teacheme').val('')
            $('#NewCourseCode').val('')
            $('#UNCourseCode').empty().append("<option>Choose New Course Code:</option>")
            $('#SDalert').append('<div class="alert alert-danger" role="alert">Please Choose old course code</div>')
            $('#UTeacher').empty().append('<option>Choose Teacher Name:</option>')
        } else {
            $('#UTeacher').empty()
            $('#SDalert').empty()
            $('#NewCourseCode').val('')
            $('#UNCourseCode').empty().append("<option>Choose New Course Code:</option>")
            $.post('/SU2', { stid: studentid, code: codo }, res => {
                var teachers = res.TN
                if (teachers.length > 0) {
                    $('#UTeacher').append('<option>Choose Teacher Name:</option>')
                    teachers.forEach(element => {
                        $('#UTeacher').append('<option>' + element.TeacherName + '</option>')
                    });
                } if (res.error) {
                    $('#SDalert').append('<div class="alert alert-danger" role="alert">' + res.error + '</div>')
                }

            })
        }

    })

    // TeacherID && CourseCodes && Data 
    $('#UTeacher').change(e => {
        var TN = $('#UTeacher').val()
        var studentid = $('#UStudentID').val()
        if ($('#UTeacher').val() == 'Choose Teacher Name:') {
            $('#SDalert').empty()
            $('#NewCourseCode').val('')
            $('#Submitutton')
            $('#SDalert').append('<div class="alert alert-danger" role="alert">Please Choose Teacher</div>')
            $('#UNCourseCode').empty().append("<option>Choose Teacher First</option>")
        } else {
            $('#UNCourseCode').empty()
            $.post('/SU3', { TN: TN, id: studentid }, res => {
                var ending = res.final
                if (ending) {
                    $('#SDalert').empty()
                    $('#UNCourseCode').append("<option>Choose New Course Code:</option>")
                    ending.forEach(element => {
                        $('#UNCourseCode').append("<option>" + element.CourseCode + "</option>")
                    });
                    $('#NewCourseCode').show()
                } if (res.error) {
                    $('#SDalert').append('<div class="alert alert-danger" role="alert">' + res.error + '</div>')
                }

            })
        }

    })
    $('#UNCourseCode').change(e => {
        var TN = $('#UTeacher').val()
        var cod = $('#UNCourseCode').val()
        var studentid = $('#UStudentID').val()
        var notvaild = $('#UNCourseCode').val()
        $('#NewCourseData').empty()
        if(notvaild == 'Choose New Course Code:'){
            $('#SDalert').append('<div class="alert alert-danger" role="alert">Choose New Course Code</div>')
               
        }else{
            $.post('/SU4', { TN: TN, code: cod, id: studentid }, res => {
                var showcd = res.show
                var info = res.info
                // console.log(showcd)
                //$('#NewCourseData').empty()
                showcd.forEach(element => {
                    // $('#NewCourseData').append('<p>Course Day:' + element.CourseDay +
                    //     "</br>Course Time:" + element.CourseTime +
                    //     "</br>Course Grade:" + element.CourseGrade +
                    //     "</br>Course Cost:" + element.TotalCost + "</p>")
                    $('#NewCourseData').append('<input type="hidden" class="form-control" name="coursename" id="coursename" value="' + element.CourseName + '">')
                    $('#NewCourseData').append('<input type="hidden" class="form-control" name="Courseday" id="Courseday" value="' + element.CourseDay + '">')
                    $('#NewCourseData').append('<input type="hidden" class="form-control" name="CourseTime" id="CourseTime" value="' + element.CourseTime + '">')
                    $('#NewCourseData').append('<input type="hidden" class="form-control" name="CourseGrade" id="CourseGrade" value="' + element.CourseGrade + '">')
                    $('#NewCourseData').append('<input type="hidden" class="form-control" name="TotalCost" id="TotalCost" value="' + element.TotalCost + '">')
                    $('#NewCourseData').append('<input type="hidden" class="form-control" name="TeacherCoost" id="TeacherCoost" value="' + element.TeacherCost + '">')
                    $('#NewCourseData').append('<input type="hidden" class="form-control" name="CenterCoost" id="CenterCoost" value="' + element.CenterCost + '">')
                });
                info.forEach(element => {
                    $('#NewCourseData').append('<input type="hidden" class="form-control" name="studentname" id="studentname" value="' + element.StudentName + '">')
                    $('#NewCourseData').append('<input type="hidden" class="form-control" name="coursegrade" id="coursegrade" value="' + element.courseGrade + '">')
                    $('#NewCourseData').append('<input type="hidden" class="form-control" name="STPHONE" id="STPHONE" value="' + element.Phones.studentphone + '">')
                    $('#NewCourseData').append('<input type="hidden" class="form-control" name="PTPHONE" id="PTPHONE" value="' + element.Phones.parentsphone + '">')
                    $('#NewCourseData').append('<input type="hidden" class="form-control" name="WPPhone" id="WPPhone" value="' + element.Phones.whatsappphone + '">')
                    $('#NewCourseData').append('<input type="hidden" class="form-control" name="RGCO" id="RGCO" value="' + element.REGcost + '">')
                });
    
            })
        }

    })
})