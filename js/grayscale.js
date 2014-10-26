/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});


function init() {

}

function encode (str) {
  return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
}

$(document).ready(function () {

  $("a.tweetit").each(function (e) {
    var href= encode($(this).attr("href"));
    var tweet = encode($(this).attr("data-tweet"));
    $(this).attr("href","https://twitter.com/intent/tweet?via=wherewasbill&related=marylandrieu,wherewasbill,senlandrieu&text="+tweet+"&url="+href);
  });

  $("a.fbit").each(function (e) {
    var href= $(this).attr("href");
    $(this).attr("href","https://www.facebook.com/sharer/sharer.php?u="+href);
  });

  $("a.popup").each( function (e) {
    var href = $(this).attr("href");
    $(this).attr("href", 'javascript:window.open("'+href+'", "", "toolbar=no, scrollbars=no, resizable=no, width=600, height=280");');

  });
});