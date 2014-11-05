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
  
  var isMobile = $(".navbar-nav>li>a").attr("padding-top") === "10px"
  
  var panels = [];
  $("section").each(function () {
    panels.push($(this));
  });

  var panelCursor = 0;
  var panelTimeout = 25000;
  var timeoutHandle;
  var stackDepth = 0;
  var scrollNext = function () {
    
    var advanceCursor = function () {
      panelCursor++;
      if (panelCursor >= panels.length) {
        panelCursor = 0;
      }
    };
    
    if (($(document).scrollTop() > 20) && (Math.abs($(document).scrollTop() - panels[panelCursor].offset().top) > 20)) {
      advanceCursor();
      stackDepth++;
      if (stackDepth >= panels.length) {
        stackDepth = 0;
        timeoutHandle = setTimeout(scrollNext, panelTimeout);
      }
      else {
        scrollNext();
      }
    }
    else {
      if ($(document).scrollTop() < 20) {
        panelCursor = 0;
      }
      else {
        advanceCursor();
      }
      $('html, body').stop().animate({
          scrollTop: $(panels[panelCursor]).offset().top
      }, 1500, 'easeInOutExpo');
      timeoutHandle = setTimeout(scrollNext, panelTimeout);
    }
  }
  var windowWidth = window.screen.width < window.outerWidth ?
                    window.screen.width : window.outerWidth;
  var mobile = windowWidth < 768;
  if (!mobile) {
    timeoutHandle = setTimeout(scrollNext, panelTimeout);
  }

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
  
  $("#donation-amount").focus(function () {
    if ($(this).val() === "5") {
      $(this).val("");
    }
  });
  
  $("#donation-amount").blur(function () {
    var value = parseInt($(this).val().replace(/,/g, ''));
      console.log("foo");
      console.log(value);
    if ((value <= 0) || (isNaN(value))) {
      $(this).val("5");
    }
    else if (value > 2600) {
      $(this).val("2600");
    }
    else {
      $(this).val(value);
    }
  });
  
});
