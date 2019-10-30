function scrollYearCounter() {
  if (statYear.innerHTML < 33) {
    statYear.innerHTML = parseInt(statYear.innerHTML) + 1;

    setTimeout(function() {
      scrollYearCounter();
    }, 45);
  }
}

function scrollCasesCounter() {
  if (statCases.innerHTML < 5000) {
    statCases.innerHTML = parseInt(statCases.innerHTML) + 73;

    setTimeout(function() {
      scrollCasesCounter();
    }, 20);
  } else {
    statCases.innerHTML = 5000;
  }
}

function scrollPercentCounter() {
  if (statPercent.innerHTML < 100) {
    statPercent.innerHTML = parseInt(statPercent.innerHTML) + 3;

    setTimeout(function() {
      scrollPercentCounter();
    }, 42);
  }
}

function scrollBodyToTop(previousScrollTop = -1) {
  // if (scrollingElement.scrollTop > 0.1) {
  //   if (
  //     previousScrollTop == scrollingElement.scrollTop ||
  //     previousScrollTop == -1
  //   ) {
  //     scrollingElement.scrollTop = scrollingElement.scrollTop * 0.7;
  //     let scrollTop = scrollingElement.scrollTop;
  //     setTimeout(function() {
  //       scrollBodyToTop(scrollTop);
  //     }, 80);
  //   }
  // }
  alert("test ");
  $(scrollingElement).animate({ scrollTop: 0 });
}

function isFormFilled() {
  for (let i = 0; i < formInputFields.length; i++) {
    if (formInputFields[i].value == "") {
      return false;
    }
  }
  return true;
}

function disableScrollBehind(overlay) {
  var _overlay = overlay;
  var _clientY = null; // remember Y position on touch start
  _overlay.addEventListener(
    "touchstart",
    function(event) {
      if (event.targetTouches.length === 1) {
        // detect single touch
        _clientY = event.targetTouches[0].clientY;
      }
    },
    false
  );
  _overlay.addEventListener(
    "touchmove",
    function(event) {
      if (event.targetTouches.length === 1) {
        // detect single touch
        disableRubberBand(event);
      }
    },
    false
  );
  function disableRubberBand(event) {
    var clientY = event.targetTouches[0].clientY - _clientY;
    if (_overlay.scrollTop === 0 && clientY > 0) {
      // element is at the top of its scroll
      event.preventDefault();
    }
    if (isOverlayTotallyScrolled() && clientY < 0) {
      //element is at the top of its scroll
      event.preventDefault();
    }
  }
  function isOverlayTotallyScrolled() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
    return _overlay.scrollHeight - _overlay.scrollTop <= _overlay.clientHeight;
  }
}

function sendEmail() {}
