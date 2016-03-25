/**
 * Created by Lijingjing on 16/3/25.
 */
$(function () {
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
});