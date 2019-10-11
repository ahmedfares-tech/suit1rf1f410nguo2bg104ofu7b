$(document).ready(() => {

    $('#cocochan').change(e => {
        var coursedate = $('#date').val()
        var coursecode = $('#cocochan').val()
        var courseattend = $('#atchan').val()
        if (coursecode == "Choose By Course Code:" && coursedate == "") {
            console.log('both of them empty')
            $.post('/firstcon', { attend: courseattend }, res => {
                var data = res.backres
                $('#testingtb').empty()

                for (var i = 0; i < data.length; i++) {
                    $('#testingtb').append(
                        "<tr><td>" +
                        data[i].StudentNam +
                        "</td><td>" +
                        data[i].CourseCode +
                        "</td><td>" +
                        data[i].attenddate +
                        "</td><td>" +
                        data[i].AttendChange +
                        "</td><td>" +
                        data[i].CenterCost +
                        "</td><td>" +
                        data[i].TeacherCost +
                        "</td><td>" +
                        data[i].coursepaid +
                        "</td></tr>"
                    )
                }
                $('#final td').empty()
            })
        }
        if (coursecode != "Choose By Course Code:" && coursedate == "") {
            console.log('courseCode Have Value && date no')
            $.post('/secondcon', { attend: courseattend, code: coursecode }, res => {
                // console.log(res.backres)
                var data = res.backres
                $('#testingtb').empty()

                for (var i = 0; i < data.length; i++) {
                    $('#testingtb').append(
                        "<tr><td>" +
                        data[i].StudentNam +
                        "</td><td>" +
                        data[i].CourseCode +
                        "</td><td>" +
                        data[i].attenddate +
                        "</td><td>" +
                        data[i].AttendChange +
                        "</td><td>" +
                        data[i].CenterCost +
                        "</td><td>" +
                        data[i].TeacherCost +
                        "</td><td>" +
                        data[i].coursepaid +
                        "</td></tr>"
                    )
                }
                $('#final td').empty()
            })
        }
        if (coursecode == "Choose By Course Code:" && coursedate != "") {
            console.log('coursedate have value && code no')
            $.post('/thirdcon', { attend: courseattend, date: coursedate }, res => {
                console.log(res.backres)
                var data = res.backres
                $('#testingtb').empty()

                for (var i = 0; i < data.length; i++) {
                    $('#testingtb').append(
                        "<tr><td>" +
                        data[i].StudentNam +
                        "</td><td>" +
                        data[i].CourseCode +
                        "</td><td>" +
                        data[i].attenddate +
                        "</td><td>" +
                        data[i].AttendChange +
                        "</td><td>" +
                        data[i].CenterCost +
                        "</td><td>" +
                        data[i].TeacherCost +
                        "</td><td>" +
                        data[i].coursepaid +
                        "</td></tr>"
                    )
                }
                $('#final td').empty()
            })
        }
        if (coursecode != "Choose By Course Code:" && coursedate != "") {
            console.log('both of them have value')
            $.post('/fourthcon', { attend: courseattend, date: coursedate, code: coursecode }, res => {
                console.log(res.backres)
                var data = res.backres
                $('#testingtb').empty()

                for (var i = 0; i < data.length; i++) {
                    $('#testingtb').append(
                        "<tr><td>" +
                        data[i].StudentNam +
                        "</td><td>" +
                        data[i].CourseCode +
                        "</td><td>" +
                        data[i].attenddate +
                        "</td><td>" +
                        data[i].AttendChange +
                        "</td><td>" +
                        data[i].CenterCost +
                        "</td><td>" +
                        data[i].TeacherCost +
                        "</td><td>" +
                        data[i].coursepaid +
                        "</td></tr>"
                    )
                }
                $('#final td').empty()
            })
        }
        // $.post('/', {}, res => {

        // }, "json")
    })
    // $("#datepicker").datepicker().on("change", function () {
    //     console.log("Change event");
    // });
    // singleDatePicker: true,
    // showDropdowns: true,
    // autoUpdateInput: false,
    // locale: {
    //     cancelLabel: 'Clear'
    // }
    $('#date').on("keyup", e => {
        var coursedate = $('#date').val()
        var coursecode = $('#cocochan').val()
        var courseattend = $('#atchan').val()
        if (coursecode == "Choose By Course Code:" && coursedate == "") {
            console.log('both of them empty')
            $.post('/firstcon', { attend: courseattend }, res => {
                var data = res.backres
                $('#testingtb').empty()

                for (var i = 0; i < data.length; i++) {
                    $('#testingtb').append(
                        "<tr><td>" +
                        data[i].StudentNam +
                        "</td><td>" +
                        data[i].CourseCode +
                        "</td><td>" +
                        data[i].attenddate +
                        "</td><td>" +
                        data[i].AttendChange +
                        "</td><td>" +
                        data[i].CenterCost +
                        "</td><td>" +
                        data[i].TeacherCost +
                        "</td><td>" +
                        data[i].coursepaid +
                        "</td></tr>"
                    )
                }

            })
        }
        if (coursecode != "Choose By Course Code:" && coursedate == "") {
            console.log('courseCode Have Value && date no')
            $.post('/secondcon', { attend: courseattend, code: coursecode }, res => {
                // console.log(res.backres)
                var data = res.backres
                $('#testingtb').empty()

                for (var i = 0; i < data.length; i++) {
                    $('#testingtb').append(
                        "<tr><td>" +
                        data[i].StudentNam +
                        "</td><td>" +
                        data[i].CourseCode +
                        "</td><td>" +
                        data[i].attenddate +
                        "</td><td>" +
                        data[i].AttendChange +
                        "</td><td>" +
                        data[i].CenterCost +
                        "</td><td>" +
                        data[i].TeacherCost +
                        "</td><td>" +
                        data[i].coursepaid +
                        "</td></tr>"
                    )
                }

            })
        }
        if (coursecode == "Choose By Course Code:" && coursedate != "") {
            console.log('coursedate have value && code no')
            $.post('/thirdcon', { attend: courseattend, date: coursedate }, res => {
                console.log(res.backres)
                var data = res.backres
                $('#testingtb').empty()

                for (var i = 0; i < data.length; i++) {
                    $('#testingtb').append(
                        "<tr><td>" +
                        data[i].StudentNam +
                        "</td><td>" +
                        data[i].CourseCode +
                        "</td><td>" +
                        data[i].attenddate +
                        "</td><td>" +
                        data[i].AttendChange +
                        "</td><td>" +
                        data[i].CenterCost +
                        "</td><td>" +
                        data[i].TeacherCost +
                        "</td><td>" +
                        data[i].coursepaid +
                        "</td></tr>"
                    )
                }

            })
        }
        if (coursecode != "Choose By Course Code:" && coursedate != "") {
            console.log('both of them have value')
            $.post('/fourthcon', { attend: courseattend, date: coursedate, code: coursecode }, res => {
                console.log(res.backres)
                var data = res.backres
                $('#testingtb').empty()

                for (var i = 0; i < data.length; i++) {
                    $('#testingtb').append(
                        "<tr><td>" +
                        data[i].StudentNam +
                        "</td><td>" +
                        data[i].CourseCode +
                        "</td><td>" +
                        data[i].attenddate +
                        "</td><td>" +
                        data[i].AttendChange +
                        "</td><td>" +
                        data[i].CenterCost +
                        "</td><td>" +
                        data[i].TeacherCost +
                        "</td><td>" +
                        data[i].coursepaid +
                        "</td></tr>"
                    )
                }

            })
        }
        // $.post('/', {}, res => {

        // }, "json")
    })
    $('#atchan').change(e => {
        var coursedate = $('#date').val()
        var coursecode = $('#cocochan').val()
        var courseattend = $('#atchan').val()
        if (coursecode == "Choose By Course Code:" && coursedate == "") {
            console.log('both of them empty')
            $.post('/firstcon', { attend: courseattend }, res => {
                //  console.log(res.backres)
                var data = res.backres
                $('#testingtb').empty()

                for (var i = 0; i < data.length; i++) {
                    $('#testingtb').append(
                        "<tr><td>" +
                        data[i].StudentNam +
                        "</td><td>" +
                        data[i].CourseCode +
                        "</td><td>" +
                        data[i].attenddate +
                        "</td><td>" +
                        data[i].AttendChange +
                        "</td><td>" +
                        data[i].CenterCost +
                        "</td><td>" +
                        data[i].TeacherCost +
                        "</td><td>" +
                        data[i].coursepaid +
                        "</td></tr>"
                    )
                }
                $('#final td').empty()

            })
        }
        if (coursecode != "Choose By Course Code:" && coursedate == "") {
            console.log('courseCode Have Value && date no')
            $.post('/secondcon', { attend: courseattend, code: coursecode }, res => {
                console.log(res.backres)
                var data = res.backres
                $('#testingtb').empty()

                for (var i = 0; i < data.length; i++) {
                    $('#testingtb').append(
                        "<tr><td>" +
                        data[i].StudentNam +
                        "</td><td>" +
                        data[i].CourseCode +
                        "</td><td>" +
                        data[i].attenddate +
                        "</td><td>" +
                        data[i].AttendChange +
                        "</td><td>" +
                        data[i].CenterCost +
                        "</td><td>" +
                        data[i].TeacherCost +
                        "</td><td>" +
                        data[i].coursepaid +
                        "</td></tr>"
                    )
                }
            })
        }
        if (coursecode == "Choose By Course Code:" && coursedate != "") {
            console.log('coursedate have value && code no')
            $.post('/thirdcon', { attend: courseattend, date: coursedate }, res => {
                console.log(res.backres)
                var data = res.backres
                $('#testingtb').empty()

                for (var i = 0; i < data.length; i++) {
                    $('#testingtb').append(
                        "<tr><td>" +
                        data[i].StudentNam +
                        "</td><td>" +
                        data[i].CourseCode +
                        "</td><td>" +
                        data[i].attenddate +
                        "</td><td>" +
                        data[i].AttendChange +
                        "</td><td>" +
                        data[i].CenterCost +
                        "</td><td>" +
                        data[i].TeacherCost +
                        "</td><td>" +
                        data[i].coursepaid +
                        "</td></tr>"
                    )
                }
                $('#final td').empty()
            })
        }
        if (coursecode != "Choose By Course Code:" && coursedate != "") {
            console.log('both of them have value')
            $.post('/fourthcon', { attend: courseattend, date: coursedate, code: coursecode }, res => {
                console.log(res.backres)
                var data = res.backres
                $('#testingtb').empty()

                for (var i = 0; i < data.length; i++) {
                    $('#testingtb').append(
                        "<tr><td>" +
                        data[i].StudentNam +
                        "</td><td>" +
                        data[i].CourseCode +
                        "</td><td>" +
                        data[i].attenddate +
                        "</td><td>" +
                        data[i].AttendChange +
                        "</td><td>" +
                        data[i].CenterCost +
                        "</td><td>" +
                        data[i].TeacherCost +
                        "</td><td>" +
                        data[i].coursepaid +
                        "</td></tr>"
                    )
                }
                $('#final td').empty()
            })
        }
        // $.post('/', {}, res => {

        // }, "json")
    })
})
