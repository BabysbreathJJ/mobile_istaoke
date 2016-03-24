/**
 * Created by Lijingjing on 16/3/24.
 */
var login_identity;
$('.login-type').click(function () {
    if ($(this).text() == '学生登录')
        login_identity = 'student';
    else
        login_identity = 'teacher';
});
