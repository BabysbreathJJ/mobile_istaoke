/**
 * Created by Lijingjing on 16/3/24.
 */

$(function () {
    //解析url参数
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
    })(jQuery);

    //案列阅读id
    var subjectId = $.getUrlParam("subjectId");
    //判断登录

    if (localStorage["accessToken"] === undefined) {
        alert("请登录");
        window.location.href = 'index.html?page=recommend_reading&subjectId=' + subjectId;
    }
    
//获取标题和内容
    var selected = 0;
    $.ajax({
        
        beforeSend: function(request){
            request.setRequestHeader("Access-Token", "5bf8ff42582c968b74af78f148c912c1");
        },
        type:"GET",
        url:"/api/subjects/" + subjectId + "/onlinecases",
        success: function (msg){
            $.each(msg.data, function(i, item){
                    alert(item.attributes.name);
                    $('<span class="case-item less-case-item">'+item.attributes.name+'</span>').click(function(){
                        $(".case-title").text(item.attributes.name);
                        $(".list").html(item.attributes.content);
                        $(".less-case-item").removeClass('selected-case-item');
                        $(this).addClass('selected-case-item');
                        selected = $(this).index(".less-case-item");
                    }).appendTo('.less-case-items');
                    $('<span class="case-item more-case-item">'+item.attributes.name+'</span>').click(function(){
                        $(".case-title").text(item.attributes.name);
                        $(".list").html(item.attributes.content);
                        $(".more-case-item").removeClass('selected-case-item');
                        $(this).addClass('selected-case-item');
                        selected = $(this).index(".more-case-item");
                    }).appendTo('.more-case-items');
                    if(i == 0){
                        $(".case-title").text(item.attributes.name);
                        $(".list").html(item.attributes.content);
                        $(".less-case-item").addClass("selected-case-item");

                    }
               
            });
        },
        error:function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
    }
    });
    $('.more-case').hide();
    
    
    $('.pack-up').click(function () {
        $(".more-case-item").removeClass('selected-case-item');
        $('.less-case-item').eq(selected).addClass('selected-case-item');
        $(".less-case").show();
        $(".more-case").hide();
    });

    $('.add-case').click(function () {
        $(".less-case-item").removeClass('selected-case-item');
        $('.more-case-item').eq(selected).addClass('selected-case-item');
        $('.more-case').show();
        $('.less-case').hide();

    });

    
    
    $('#content').swipe({
        swipeLeft: function (event, direction, distance, duration, fingerCount) {
            console.log("You swiped " + direction + " ");
        },
        swipeRight: function (event, direction, distance, duration, fingerCount) {
            console.log("You swiped " + direction + " ");
        },

        //Default is 75px, set to 0 for demo so any distance triggers swipe
    });
});