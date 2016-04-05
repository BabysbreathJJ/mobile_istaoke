/**
 * Created by Lijingjing on 16/3/25.
 */
$(function () {
    //localStorage.removeItem("accessToken");
    //解析url参数
    (function ($) {
                $.getUrlParam = function (name) {
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                    var r = window.location.search.substr(1).match(reg);
                    if (r != null) return unescape(r[2]); return null;
                }
            })(jQuery);

    //拓展阅读id
    var subjectId = $.getUrlParam("subjectId");
    alert(subjectId);
    //判断登录

    if(localStorage["accessToken"]==null){
        alert("请登录");
        window.location.href='index.html?page=recommend_reading&subjectId=' + subjectId;
    }

    $('.more-case').hide();
    var selected = 0;
    $(".less-case-item").click(function () {
        $(".less-case-item").removeClass('selected-case-item');
        $(this).addClass('selected-case-item');
        selected = $(this).index();
        var title = $(this).text();
        $('.case-title').text(title);

    });

    $(".more-case-item").click(function () {
        $(".more-case-item").removeClass('selected-case-item');
        $(this).addClass('selected-case-item');
        selected = $(this).index();
        var title = $(this).text();
        $('.case-title').text(title);

    });

    $('.pack-up').click(function () {
        $(".more-case-item").removeClass('selected-case-item');
        $('.less-case-item').eq(selected).addClass('selected-case-item');
        $(".less-case").show();
        $(".more-case").hide();
    });

    $('.add-case').click(function () {
        $(".less-case-item").removeClass('selected-case-item');
        $('.more-case-item').eq(selected).addClass('selected-case-item');
        console.log(selected);
        $('.more-case').show();
        $('.less-case').hide();

    });

    
    //获取标题和内容
    $.ajax({
        
        beforeSend: function(request){
            request.setRequestHeader("Access-Token", "5bf8ff42582c968b74af78f148c912c1");
        },
        type:"GET",
        url:"/api/extendreadings/bysubject?subjectId=" + subjectId,
        success: function (msg){
            $.each(msg.data, function(i, item){
               if(i == 0){
                    $(".case-title").text(item.attributes.title);
                    $(".list").html(item.attributes.content);
               }
            });
        }
    });
});