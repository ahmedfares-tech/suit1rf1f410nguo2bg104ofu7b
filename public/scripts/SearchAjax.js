$(document).ready(() => {





    $("#ajaxstudentl").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#studentltb tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#ajaxstudentcl").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#studentlctb tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#ajaxteacherl").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#teachtb tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#ajaxstuteachl").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#stcoli tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#ajaxteachcol").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#teacherscourse tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#ajaxsearch").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tableetest tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });


    $("#teacherid").on("keyup", function () {
        $('#checkidteach').empty()
        var value = $(this).val().replace(/\s+/g, '')
        $.post('/Tsearchforid', { id1: value }, res => {
            if (res.data == "NO Such Student Registed") {
                $('#checkidteach').append('<div class="alert alert-danger"><strong>' + res.data + '</strong></div>')

            } else {
                $('#checkidteach').append('<div class="alert alert-success"><strong>' + res.data + '</strong></div>')

            }

        })
    })

    $("#testnewcollect").on("keyup", function () {
        var checkattend = $('#atchan').val().toLowerCase();
        if (checkattend == 'all') {
            var value = $(this).val().toLowerCase();
            $("#testingtb tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        } else {
            var value = $(this).val().toLowerCase();
            $("#testingtb tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });

            $('#tbhead th').each(function (i) {

                calculateColumn(i);

            });

            function calculateColumn(index) {

                var total = 0;
                $('table tr').each(function () {

                    if ($(this).css('display') == 'none') {

                    }
                    else {

                        var value = parseInt($('td', this).eq(index).text());
                        if (!isNaN(value)) {
                            total += value;
                        }
                        $('#final td').eq(index).empty()
                    }

                });

                $('#final td').eq(index).text(total)

            }
        }

    });






})


/**
 * !Fun Code XD :D
 *             var somthing = $('table tfoot td').get(index).textContent
            console.log(somthing)
            $('table tfoot td').append("<td>"+somthing+"</td>")
 */
            // $('table tfoot td').eq(index).text(total);
            // var s = total


        //     console.log($('#dongoaway').css('display') == 'none')

        // var search = this.value.split(';');
        // $('#testingtb tr').each(function (index, element) {
        //     var text = $(element).text().toLowerCase();
        //     if ($(this).css('display') == 'none') {

        //     }
        //     if ($(this).css('display') == 'none' && search == '') {
        //         $(element).toggle(show);
        //     }
        //     else {
        //         var show = search.filter(function (e) {
        //             return e != '' && text.indexOf(e.toLowerCase()) >= 0;
        //         }).length > 0;
        //         $(element).toggle(show);
        //     }

        // });

        // if ($('table tr').css('display') == 'none') {

        // }else{
        //     $('#tbtable').tableTotal({
        //         totalRow: true,
        //         totalCol: false,
        //     });
        // }
