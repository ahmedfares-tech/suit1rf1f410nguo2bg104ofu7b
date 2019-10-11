$(document).ready(() => {
    (function () {
        'use strict';
        window.addEventListener('load', function () {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function (form) {
                form.addEventListener('submit', function (event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    })();
    $("#studentidcourse").on("keyup", function () {
        $('#checkidstud').empty()
        var value = $(this).val()
        $.post('/searchforid', { id1: value }, res => {
            if (res.data == "NO Such Student Registed") {
                $('#checkidstud').append('<div class="alert alert-danger"><strong>!!' + res.data + '</strong></div>')

            } else {
                $('#checkidstud').append('<div class="alert alert-success"><strong>!!' + res.data + '</strong></div>')
                $('#CourseNamesec').show()

            }

        })
    })
    //Course Name Retive
    $("#StudentCourseName").change(e => {
        e.preventDefault();
        $("#TeacherName").empty();
        $("#CourseGRADE_add").empty();
        $("#coda").empty();
        $("#CourseTime").empty();
        $("#CourseCost").empty();
        $('#checkidstud').empty()
        $("#ButtonAddCourse").empty();
        $("#CourseCost").empty();
        if ($('#studentidcourse').val() == '') {
            $('#checkidstud').append('<div class="alert alert-danger"><strong>Please Provide Student ID</strong></div>')
        } else {
            var coursename = $("#StudentCourseName").val();
            $.post(
                "/ajaxcoursename",
                { coursenameretive: coursename },
                res => {
                    var teacherretive = res.TeacherNamE;
                    //   console.log(teacherretive)
                    $("#TeacherName").append("<option>Choose Teacher Name</option>");
                    $.each(teacherretive, (error, teachername) => {
                        $("#TeacherName").append("<option>" + teachername + "</option>");
                    });
                },
                "json"
            );
        }

    });
    //Course Name Retive
    //Course Grade Retive
    $("#TeacherName").change(e => {
        e.preventDefault();
        $("#CourseGRADE_add").empty();
        $("#coda").empty();
        $("#CourseTime").empty();

        $("#ButtonAddCourse").empty();
        $("#CourseCost").empty();
        var coursename = $("#StudentCourseName").val();
        var TeacherNAME = $("#TeacherName").val();
        var id = $("#studentidcourse").val();
        $("#CourseGradeDIV").show();
        $.post(
            "/ajaxcoursegrade",
            { CN: coursename, TN: TeacherNAME, id: id },
            res => {
                var grade = res.grades;
                if (grade.length > 0) {
                    $("#CourseGRADE_add").append("<option>Choose Grade</option>");
                    $.each(grade, (error, result) => {
                        $("#CourseGRADE_add").append("<option>" + result + "</option>");
                    });
                } else {
                    $("#CourseGRADE_add").append("<option>Sorry This Teacher Not Available For " + grade + "</option>");
                }

            },
            "json"
        );
    });

    //     Course Grade Retive
    //     CourseDay Retive
    $("#CourseGRADE_add").change(e => {
        e.preventDefault();
        $("#coda").empty();
        $("#CourseTime").empty();
        $("#CourseCost").empty();

        $("#ButtonAddCourse").empty();
        $("#CourseCost").empty();
        var coursename = $("#StudentCourseName").val();
        var TeacherNAME = $("#TeacherName").val();
        var CourseGrade = $("#CourseGRADE_add").val();
        $("#coda").append("<option>Choose Course Day</option>");
        $("#CourseDay").show();
        $.post(
            "/ajaxcourseday",
            { CN: coursename, TN: TeacherNAME, CG: CourseGrade },
            res => {
                var days = res.days;
                $.each(days, (error, result) => {
                    $("#coda").append("<option>" + result + "</option>");
                });
            },
            "json"
        );
    });
    //CourseTime Retive
    $("#coda").change(e => {
        e.preventDefault();
        $("#CourseTime").empty();
        $("#CourseCost").empty();

        $("#ButtonAddCourse").empty();
        $("#CourseCost").empty();
        var coursename = $("#StudentCourseName").val();
        var TeacherNAME = $("#TeacherName").val();
        var CourseGrade = $("#CourseGRADE_add").val();
        var courseday = $("#coda").val();
        //CourseTime Retive
        $("#CourseTimeDIV").show();
        $("#CourseTime").append("<option> Choose Your Time</option>");
        $.post(
            "/ajaxcoursetime",
            { CN: coursename, TN: TeacherNAME, CG: CourseGrade, CD: courseday },
            res => {
                var time = res.time;

                $.each(time, (error, result) => {
                    $("#CourseTime").append("<option>" + result + "</option>");
                });
            }
        );
    });

    $("#CourseTime").change(e => {
        e.preventDefault();

        $("#ButtonAddCourse").empty();
        var coursename = $("#StudentCourseName").val();
        var TeacherNAME = $("#TeacherName").val();
        var CourseGrade = $("#CourseGRADE_add").val();
        var courseday = $("#coda").val();
        var coursetime = $("#CourseTime").val();
        $.post(
            "/ajaxcoursecost",
            {
                CN: coursename,
                TN: TeacherNAME,
                CG: CourseGrade,
                CD: courseday,
                CT: coursetime
            },
            res => {
                var cost = res.amount;
                console.log(cost);
                //   console.log(cost)
                //    $('#CourseCost').append('<label>Working</label>')
                $("#CourseCost").empty();
                $('#CourseCost').show()
                $("#CourseCost").append("<label>Course Cost: " + cost + '</label><div class= "input-group" id = "costcont"><input type="text" class="form-control" name="StudentCourseCost" id="costt" value="' + cost + '" hidden><div class="input-group-append"><span class="input-group-text" hidden>L.E</span></div></div>');
                $("#ButtonAddCourse").show()
                $("#ButtonAddCourse").append('<button type="submit" class="btn btn-dark">Add to student</button>');
            }
        );
    });
});

// $(document).ready(() => {
//     $('#studentcourseame').change((e) => {
//         e.preventDefault();
//         var text = $('#Courses').val();
//         $.post('/testajax', { data: text }, (res => {
//             var data = res.server
//             $('#Tach').empty();
//             $('#Tach').append('<option>Choose Teacher Name</option>')
//             $.each(data, (error, result) => {
//                 console.log(result)
//                 var datalength = result.length
//                 $('#Tach').append('<option>' + result.TeacherName + '</option>')
//             })
//         }), 'json')
//     })
// })
