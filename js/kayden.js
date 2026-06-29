/*----------------------------------------------------------------------------------------------
* Template Name      :  Kayden - Personal Bootstrap 5 HTML Portfolio Template                   |
* Author             :  themesuccess                                                            |
* Version            :  1.0.0                                                                   |
* Created            :  May 2021                                                                |
* Updated            :  May 2021                                                                |
* File Description   :  Custom functions file for kayden template                               |
*-----------------------------------------------------------------------------------------------
*/

"use strict";

$('body').on("kaydenLoaded", function(){
    

    //AOS
    AOS.init({
        offset: 180,
        delay: 100,
        once: true
    });

    //Counter
    $('.tmcounter').each(function(){
        $(this).appear(function(){
            $(this).countTo();
        })
    });

    //Progress Bar
    $('.progress-bar-loadAnimation').each(function(){
        $(this).appear(function(){

            $(this).css({
                width: $(this).data('percent') + "%"
            })

        });
    });


    //Header
    $(window).on('scroll', function () {
        transparent_header()
    });

    //Typed JS
    var typed = new Typed('.typed_text', {
        strings: $('.typed_text').data('options').split(","),
        typeSpeed: 90,
        backDelay: 2000,
        backSpeed: 40,
        loop: true
    });

    //ScrollSpy
    $('a.kayden_scrollspy[href^="#"]:not([href="#"]').on('click', function(event){

        var $anchor = $(this);
        var offset = parseInt($('body').data('offset'));
        $('html, body').stop().animate({
            
            scrollTop: ( $($anchor.attr('href')).offset().top ) - ( offset - 1 )

        }, 1500, 'easeInOutExpo');

        event.preventDefault();
        
    });

    // Return to top button

    $(window).scroll(function(){
        if($(this).scrollTop() >= 350) {
            $('#return-to-top').fadeIn(200);
        } else {
            $('#return-to-top').fadeOut(200);
        }
    });

    $('#return-to-top').on('click', function() {
        event.preventDefault();
        $('body,html').animate({
            scrollTop : 0
        }, 1500, 'easeInOutExpo');
    });


});