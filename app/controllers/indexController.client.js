/*global $ */

var POSITIONS = [
  "positionCenter",
  "positionRight",
  "queueRight",
  "queueLeft",
  "positionLeft"
];

var TRANSITION_NEXT = "next";
var TRANSITION_PREVIOUS = "previous";
var lastTransition = TRANSITION_NEXT;

function getCurrentTransitionClass(target) {
  var currentClass = "";
  $(target.attr('class').split(' ')).each(function() { 
        if (this.startsWith("position")
           || this.startsWith("queue")) {
            currentClass = this;
          return false;
        }    
    });
  return currentClass.toString();
}

function getPreviousTransitionClass(currentClass) {
  var newClass = "";
  $.each(POSITIONS, function(index) {
    if (this == currentClass) {
      var n = index + 1;
      if (n >= POSITIONS.length) n = 0;
      newClass = POSITIONS[n];
      return false;
    }
  });
  return newClass;
}

function getNextTransitionClass(currentClass) {
  var newClass = "";
  $.each(POSITIONS, function(index) {
    if (this == currentClass) {
      var n = index - 1;
      if (n < 0) n = POSITIONS.length - 1;
      newClass = POSITIONS[n];
      return false;
    }
  });
  return newClass;
}

function doTransition(target, reverse) {
  var currentTransition = getCurrentTransitionClass(target);
  var newTransition = (reverse ?  getPreviousTransitionClass(currentTransition) : getNextTransitionClass(currentTransition));
  
  target.switchClass(currentTransition, newTransition, 1000, "swing", updateTitle);
}


function showNextPic() {
  var pics = $(".gallery img");
  
  $.each(pics, function(index) {
    doTransition($(this), false);
  });
}

function showPreviousPic() {
  var pics = $(".gallery img");
  
  $.each(pics, function(index) {
    doTransition($(this), true);
  });
}

function updateTitle() {
  var title = $(".gallery .positionCenter").data("title");
  $("#portfolioDiv .itemTitle").text(title);
  
  
  $(".gallery img").each(function() {
    if ($(this).attr("class").startsWith("queue")) {
    $(this).hide();
  }
  else {
    $(this).show();
  }
  });
}

function initPics() {
  var pics = $(".gallery img");
  var picCount = pics.length;
  
  if (picCount > 5) {
    var extras = picCount - 5;
    var n, newPositions = [];
    for (n = 0; n < extras; n++) {
      POSITIONS.splice((3+n),0,"queue"+(n+1));
    }
  }
  
  $.each(pics, function(index) {
    var transitionClass = POSITIONS[index];
    if (!transitionClass.startsWith("queue")) {
      $(this).show();
    }
    $(this).addClass(transitionClass);
    
  });
  
  updateTitle();
}


function showLine(selector, callback) {
  $(selector).show();
  $(selector).addClass("warped").one('animationend webkitAnimationEnd', function() {
    window.setTimeout(function() {
      $(selector).removeClass().addClass("finished");
      if (callback != undefined) {
        callback();
      }
      }, 3000);
  });
}

$(document).ready(function() {
  showLine("#firstline", function() {
      showLine("#secondline");
    });
  
  initPics();
  $("#nextBtn").click(showNextPic);
  $("#previousBtn").click(showPreviousPic);
  
  $(".gallery img").click(function() {
    var link = $(this).data("link");
    
    if (link != null && link != undefined) {
      window.open(link);
    }
  });
});