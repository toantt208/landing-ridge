$(document).ready(function () {
    $(".accordion-header").click(function () {
        $(".accordion-content").not($(this).next()).slideUp();
        $(".accordion-header").not(this).removeClass("active");
        $(this).next().slideToggle();
        $(this).toggleClass("active");
    });

    $('.humberget').click(function() {
      $('.header_nav').toggleClass('header_nav-toggle');
      $('body').toggleClass('overlay');
    });

});
