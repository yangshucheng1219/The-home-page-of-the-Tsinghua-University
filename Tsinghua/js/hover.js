var st = 180;
$('.nav>ul>li').mouseenter(function () {
    $(this).find('ul').stop(false, true).slideDown(st);
}).mouseleave(function () {
    $(this).find('ul').stop(false, true).slideUp(0);
});

