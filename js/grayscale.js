/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */



var encode = function (str) {
  return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
}

var gaTrack = function (category, action, label, value) {
  if ((typeof ga) === "function") {
    ga("send", "event", category, action, label, value);
  }
  console.log("Category: "+category+", Action: "+action+", Label: "+label+", Value: "+value);
}

var getSectionId = function (element) {
  if (element.prop("tagName") == "SECTION") {
    return element.attr("id")
  }
  return getSectionId(element.parent());
}

var siteUrl = encode("http://wherewasbill.com");


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
    
    $('header a.page-scroll, section a.page-scroll').bind('click', function (event) {
      var $anchor = $(this);
      var target = $anchor.attr('href').substr(1);
      gaTrack("navigate", "scroll", target);
    });

    $('ul.nav a.page-scroll, a.issue-link').bind('click', function (event) {
      var $anchor = $(this);
      var target = $anchor.attr('href').substr(1);
      gaTrack("navigate", "click_nav", target);
    });
    
    $('ul.banner-social-buttons li a').bind('click', function (event) {
      var cat, act;
      if ($(this).hasClass("tweetit")) {
        cat = "twitter";
        act = "share";
      }
      else if ($(this).hasClass("fbit")) {
        cat = "facebook";
        act = "share";
      }
      else {
        cat = "navigate";
        act = "click_page";
      }
      var $anchor = $(this);
      gaTrack(cat, act, getSectionId($anchor));
    });

});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});


function init() {

}


$(document).ready(function () {
  
  var isMobile = $(".navbar-nav>li>a").attr("padding-top") === "10px"
  
  var panels = [];
  $("section").each(function () {
    panels.push($(this));
  });

  var panelCursor = 0;
  var panelTimeout = 14000;
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
      var target = $(panels[panelCursor]).attr("id");
      gaTrack("scrolling", "auto", target, {"nonInteraction": 1});
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
    var href= encode($(this).attr("href").substr(1));
    var tweet = encode($(this).attr("data-tweet"));
    $(this).attr("href","https://twitter.com/intent/tweet?via=wherewasbill&related=marylandrieu,wherewasbill,senlandrieu&text="+tweet+"&url="+siteUrl+href);
  });

  $("a.fbit").each(function (e) {
    var href= encode($(this).attr("href").substr(1));
    $(this).attr("href","https://www.facebook.com/sharer/sharer.php?u="+siteUrl+href);
  });

  $("a.popup").each( function (e) {
    var href = $(this).attr("href");
    $(this).attr("href", 'javascript:window.open("'+href+'", "", "toolbar=no, scrollbars=no, resizable=no, width=600, height=280");');
  });
  
  $("#donation-amount").focus(function () {
    gaTrack("donation", "focus", location.pathname);
    if ($(this).val() === "5") {
      $(this).val("");
    }
  });
  
  $("#donation-amount").blur(function () {
    var value = parseInt($(this).val().replace(/,/g, ''));
    if ((value <= 0) || (isNaN(value))) {
      $(this).val("5");
    }
    else if (value > 2600) {
      $(this).val("2600");
    }
    else {
      $(this).val(value);
    }
    gaTrack("donation", "blur", location.pathname, $(this).val());
  });
  
  $(".donatebutton button").click(function (event) {
    event.preventDefault();
    gaTrack("donation", "submit", location.pathname, $("#donation-amount").val());
    $(".donate form").submit();
  });
  
});
