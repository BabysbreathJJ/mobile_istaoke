/**
 * Created by Lulifei on 16/3/25.
 */
 //获取url参数，生成登录后href（sby）

 var href = 'online-case.html';
 (function ($) {
                $.getUrlParam = function (name) {
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                    var r = window.location.search.substr(1).match(reg);
                    if (r != null) return unescape(r[2]); return null;
                }
            })(jQuery);
 var page = $.getUrlParam("page");
//以recommend_reading为例，其他参数如果不是id之后再添加
 var subjectId = $.getUrlParam("subjectId");
 if(page != null){
 	href = page + '.html?subjectId=' + subjectId;
 }

var accesstoken;
var currentUser;

var currentUserChangedCallbacks = [];

var coverAuth = {
    currentUser: null,
    setCurrentUser: setCurrentUser,
    onCurrentUserChange: onCurrentUserChange
   // login: login,
  //  logout: logout
};

function setCurrentUser(currentUser) {
    coverAuth.currentUser = currentUser;
    currentUserChangedCallbacks.forEach(function (callback) {
        callback(currentUser);
    });
}

function onCurrentUserChange(callback) {
    currentUserChangedCallbacks.push(callback);
}

//登录用户类型
    var login_identity;
    $('.login-type').click(function () {
        $('.login-type').removeClass('selected-item');
        $(this).addClass('selected-item');
            if ( $(this).text() == '学生登陆')
                login_identity = 'student';
            else
                login_identity = 'teacher';
    });


var role;
function getRoleOfUser(){
    if(login_identity=='student')
       role="5";
    else
       role="4";
}


$("button").click(function() {
       getRoleOfUser();
        var user ={
            "username": $("#username").val(),
            "password": $("#password").val(),
            "role": role
        };

       alert( JSON.stringify(user));

    $.ajax({
            type: 'POST',
            url:  '/api/account/login',
            //url:  'http://localhost:8080/VideoPlatform/account/login',
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(user),
            dataType:'json',
            crossDomain: true,

            success: function(data) {

                alert("登陆成功！");
                console.log(data);
                window.location.href = href; //登录成功后的跳转页面

                accesstoken = data.tokern;
                localStorage['accessToken'] = accesstoken;
                currentuser = JSONApiOrg.parse(data.user);
                setCurrentUser(currentUser);
                currentuser.$token = accesstoken;
                console.log(accesstoken);
                console.log(currentuser.username);

                if (!sessionStorage['history']) {
                    $state.go('information.list', {
                        reload: true
                    });
                }
                else {
                    $location.path(sessionStorage['history']);
                }
            },

        error:function(){
            alert("用户名或密码错误");
        }
    });
});


//忘记密码
    $("#forget-pwd").click(function () {
        alert("忘记密码");
        window.location.href = "";//密码找回页面
    });





