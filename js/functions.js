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

function scrollBodyToTop() {
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
  $(scrollingElement).animate({ scrollTop: 0 });
}

function isFormValid() {
  for (let i = 0; i < formInputFields.length; i++) {
    // check for invalidity, NOT validity
    if (formInputFields[i].checkValidity() == false) {
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

function sendEmail() {
  // encodeURIComponent converts forwardslashes (/) to a useable text so it doesnt break the url query string
  let fullName = encodeURIComponent(contactFormNameInput.value);
  let emailAddress = encodeURIComponent(contactFormEmailInput.value);
  let phoneNumber = encodeURIComponent(contactFormPhoneInput.value);
  let message = encodeURIComponent(contactFormMessageInput.value);

  setTimeout(function() {
    loadingFormOverlay.classList.remove("displayHidden");
  }, 500);

  // fetch is JS function that lets you send http requests to servers,
  // we are REQUESTING sendEmail.php FILE from server to send the email through
  fetchWithTimeout(
    "sendEmail.php?name=" +
      fullName +
      "&email=" +
      emailAddress +
      "&phone=" +
      phoneNumber +
      "&msg=" +
      message,
    {},
    5000
  )
    // handles servers succesful response
    .then(function() {
      loadingFormOverlay.classList.add("displayHidden");
      successFormOverlay.classList.remove("displayHidden");
      confirmWindow.classList.add("visibleConfirmWindow");
      confirmWindow.classList.add("slide-in-left");
      contactFormButtonsBar.classList.add("displayHidden");

      setTimeout(function() {
        confirmWindow.classList.add("slide-out-right");
      }, 2500);

      setTimeout(function() {
        contactForm.scrollTop = 0;
        confirmWindow.classList.remove("visibleConfirmWindow");
        successFormOverlay.classList.add("displayHidden");
        contactForm.classList.add("displayHidden");
        contactFormButtonsBar.classList.remove("displayHidden");
        contactFormSubmitBtn.disabled = true;
        contactFormSubmitBtn.classList.add("formSubmitBtnDisabled");
        contactFormSubmitBtn.classList.remove("formSubmitBtnReady");
        contactForm.reset();
        confirmWindow.classList.remove("slide-in-left");
        confirmWindow.classList.remove("slide-out-right");
      }, 3000);

      console.log("sending complete");
    })
    // handling errors (server connection)
    // handles server if it doesnt respond OR if it responds with an error
    .catch(function(error) {
      loadingFormOverlay.classList.add("displayHidden");

      if (error.message == "REQUEST_TIMED_OUT") {
        errorFormOverlay.classList.remove("displayHidden");
        contactFormButtonsBar.classList.add("displayHidden");
        setTimeout(function() {
          errorFormOverlay.classList.add("displayHidden");
          contactFormButtonsBar.classList.remove("displayHidden");
        }, 4000);
      }
    });
}

function fetchWithTimeout(url, options, duration) {
  return Promise.race([
    fetch(url, options),
    new Promise(function(resolve, reject) {
      return setTimeout(function() {
        return reject(new Error("REQUEST_TIMED_OUT"));
      }, duration);
    })
  ]);
}
