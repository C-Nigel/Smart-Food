// ============================== For navbar fade in ===========================//
// $(window).scroll(function () {
//     // 100 = The point you would like to fade the nav in.

//     if ($(window).scrollTop() > 100) {

//         $('.fixed').addClass('is-sticky');

//     } else {

//         $('.fixed').removeClass('is-sticky');

//     };
// });

// ============================== For homepage slideshow ===========================//
(function ($) {
    // This function is for slide show, behind the search bar, at the top of the homepage 

    'use strict';

    var $slides = $('[data-slides]');
    var images = $slides.data('slides');
    var count = images.length;
    var slideshow = function () {
        $slides
            .css('background-image', 'url("' + images[Math.floor(Math.random() * count)] + '")')
            .show(0, function () {
                setTimeout(slideshow, 5000);
            });
    };

    slideshow();

}(jQuery));