/**
 * Created by Lijingjing on 16/3/24.
 */

$(function () {
    $('.more-case').hide();
    var selected;
    $(".less-case-item").click(function () {
        $(".less-case-item").removeClass('selected-case-item');
        $(this).addClass('selected-case-item');
        selected = $(this).index();

    });

    $(".more-case-item").click(function () {
        $(".more-case-item").removeClass('selected-case-item');
        $(this).addClass('selected-case-item');
        selected = $(this).index();

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