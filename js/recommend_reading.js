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
            if (r != null) return unescape(r[2]);
            return null;
        }
    })(jQuery);

    //拓展阅读id
    var subjectId = $.getUrlParam("subjectId");
    //alert(subjectId);
    //判断登录

    if (localStorage["accessToken"] == null) {
        alert("请登录");
        window.location.href = 'index.html?page=recommend_reading&subjectId=' + subjectId;
    }
    //alert(localStorage["accessToken"]);

//获取标题和内容
    var selected = 0;
    var contentData = "";
    $.ajax({
        
        beforeSend: function(request){
            request.setRequestHeader("Access-Token", localStorage["accessToken"]);
        },
        type: "GET",
        url: "/api/extendreadings/bysubject?subjectId=" + subjectId,
        success: function (msg) {
            contentData = msg.data;
            $.each(msg.data, function (i, item) {
                $('<span class="case-item less-case-item">' + item.attributes.title + '</span>').click(function () {
                    $(".case-title").text(item.attributes.title);
                    $(".list").html(item.attributes.content);
                    $(".less-case-item").removeClass('selected-case-item');
                    $(this).addClass('selected-case-item');
                    selected = $(this).index(".less-case-item");
                }).appendTo('.less-case-items');
                $('<span class="case-item more-case-item">' + item.attributes.title + '</span>').click(function () {
                    $(".case-title").text(item.attributes.title);
                    $(".list").html(item.attributes.content);
                    $(".more-case-item").removeClass('selected-case-item');
                    $(this).addClass('selected-case-item');
                    selected = $(this).index(".more-case-item");
                }).appendTo('.more-case-items');
                if (i == 0) {
                    $(".case-title").text(item.attributes.title);
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


    $('.case-lists').swipe({
        swipe:function(event, direction, distance, duration, fingerCount, fingerData){
            if(direction == "left" && distance >= 100){
                goLeft();
            }else if(direction == "right" && distance >= 100){
                goRight();
            }
            
        },
        
        threshold: 0,
        preventDefaultEvents: false,
        


    });

    function goLeft() {
        var item;
        if (selected == 0) {
            var length = contentData.length;
            item = contentData[length - 1];
            selected = length - 1;
            $(".less-case-item").addClass("selected-case-item");
        }
        else {
            selected--;
            item = contentData[selected];
        }

        $(".case-title").text(item.attributes.title);
        $(".list").html(item.attributes.content);
        $(".less-case-item").removeClass('selected-case-item');
        $('.less-case-item').eq(selected).addClass('selected-case-item');

        $(".more-case-item").removeClass('selected-case-item');
        $('.more-case-item').eq(selected).addClass('selected-case-item');
    }

    function goRight() {
        var item;
        if (selected == contentData.length) {
            item = contentData[0];
            selected = 0;
        }
        else {
            selected++;
            item = contentData[selected];
        }
        $(".case-title").text(item.attributes.title);
        $(".list").html(item.attributes.content);
        $(".less-case-item").removeClass('selected-case-item');
        $('.less-case-item').eq(selected).addClass('selected-case-item');

        $(".more-case-item").removeClass('selected-case-item');
        $('.more-case-item').eq(selected).addClass('selected-case-item');
    }

});
