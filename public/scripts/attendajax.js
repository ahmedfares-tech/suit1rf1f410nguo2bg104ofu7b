$(document).ready(() => {
    // var attendbutton = $('#attendadd').val()
    var attendbutton = $('button[name ="attendadd"]')
    // var removebutton = $('#attendremove').val()
    var removebutton = $('button[name ="attendremove"]')
    var coursecode = $('#coursecod').val()
    $(attendbutton).click(e => {

        $.post(

            "/ajaxattendbutton",
            { CCO: coursecode },
            res => {
                console.log(res.getthat)
                $('#counter').empty();
                $('#counter').append('<div class="alert alert-dark" role="alert" ><h3> Total Attended:' + res.getthat + '</h3></div>')
            },

        );
    })
    $(removebutton).click(e => {
        $.post(

            "/ajaxremovebutton",
            { CCO: coursecode },
            res => {
                console.log(res.getthat)
                $('#counter').empty();
                $('#counter').append('<div class="alert alert-dark" role="alert" ><h3>Total Attended:' + res.getthat + '</h3></div>')
            },

        );
    })

}, 10000)