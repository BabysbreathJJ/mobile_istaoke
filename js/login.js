/**
 * Created by Lijingjing on 16/3/24.
 */
var login_identity;
$('.login-type').click(function () {
    $('.login-type').removeClass('selected-item');
    $(this).addClass('selected-item');
    console.log($(this).text());
    if ($(this).text() == '学生登陆')
        login_identity = 'student';
    else
        login_identity = 'teacher';
});

