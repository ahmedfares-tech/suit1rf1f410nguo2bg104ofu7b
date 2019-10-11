$(document).ready(() => {
    $('#UTeachIDC').on('keyup', e => {
        var teacherid = $('#UTeachIDC').val()
        $('#Ucode').empty()
        $('#UTH').val('')
        $('#UTM').val('')

        $('#totc').val('')
        $('#techc').val('')
        $('#centc').val('')
        $.post('/TU1', { TID: teacherid }, res => {
            //codes
            var codes = res.codes
            $('#Ucode').append("<option>Choose Course</option>")
            codes.forEach(element => {
                $('#Ucode').append("<option>" + element.CourseCode + "</option>")
            });
        })
    })
    $('#Ucode').change(e => {
        var teacherid = $('#UTeachIDC').val()
        var code = $('#Ucode').val()
        $.post('/TU2', { TID: teacherid, TCODE: code }, res => {
            //complete
            var complete = res.complete
            complete.forEach(element => {
                $('#UDay').select().val(element.TeacherCourseTime.CourseDay)
                var myString = element.TeacherCourseTime.CourseTime
                var mySplits = myString.split(/:/);
                var secondsplits = mySplits[1].split(' ')
                $('#UTH').val(mySplits[0])
                $('#UTM').val(secondsplits[0])
                $('#UTAP').select().val(secondsplits[1])
                $('#totc').val(element.TotalCost)
                $('#techc').val(element.CenterCost)
                $('#centc').val(element.TeacherCost)

            });
        })
    })
    
})