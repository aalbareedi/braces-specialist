function scrollCasesCounter() {
  if (statCases.innerHTML < 9000) {
    statCases.innerHTML = parseInt(statCases.innerHTML) + 119;

    setTimeout(function() {
      scrollCasesCounter();
    }, 20);
  } else {
    statCases.innerHTML = 9000;
  }
}

function scrollYearCounter() {
  if (statYear.innerHTML < 34) {
    statYear.innerHTML = parseInt(statYear.innerHTML) + 1;

    setTimeout(function() {
      scrollYearCounter();
    }, 45);
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

function closeNavMenu() {
  navToggleIcon.classList.remove("is-active");
  navMenu.classList.remove("openMenu");
  navOverlay.classList.add("displayHidden");
  wrapper.classList.remove("overflowHidden");
  navbar.setAttribute("href", "#landingBox");
}

function openNavMenu() {
  navToggleIcon.classList.add("is-active");
  navMenu.classList.add("openMenu");
  navOverlay.classList.remove("displayHidden");
  wrapper.classList.add("overflowHidden");
  navbar.setAttribute("href", "");
}

function closeContactForm() {
  html.classList.remove("overflowHidden");
  contactForm.classList.add("displayHidden");
  body.classList.remove("overflowHidden");
  body.classList.remove("formOpen");
  wrapper.classList.remove("overflowHidden");
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
  let isLoading = true;
  // stopping overlay from appearing for a split second in case emails sends right away
  setTimeout(function() {
    if (isLoading == true) {
      loadingOverlay.classList.remove("displayHidden");
    }
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
    .then(function(response) {
      console.log(response);
      // alert(isLoading);
      // setTimeout(function() {
      isLoading = false;
      loadingOverlay.classList.add("displayHidden");
      contactFormButtonsBar.classList.add("displayHidden");

      if (response.status != 200) {
        errorText.innerHTML = "Error " + response.status;
        errorOverlay.classList.remove("displayHidden");
        setTimeout(function() {
          errorOverlay.classList.add("displayHidden");
          contactFormButtonsBar.classList.remove("displayHidden");
          errorText.innerHTML = "Error";
        }, 4000);
      } else {
        successOverlay.classList.remove("displayHidden");
        confirmWindow.classList.add("visibleConfirmWindow");
        confirmWindow.classList.add("slide-in-left");
        setTimeout(function() {
          confirmWindow.classList.add("slide-out-right");
        }, 2500);

        // close/reset contact form & overlays
        setTimeout(function() {
          contactForm.scrollTop = 0;
          confirmWindow.classList.remove("visibleConfirmWindow");
          successOverlay.classList.add("displayHidden");
          contactForm.classList.add("displayHidden");
          contactFormButtonsBar.classList.remove("displayHidden");
          contactFormSubmitBtn.disabled = true;
          contactFormSubmitBtn.classList.add("formSubmitBtnDisabled");
          contactFormSubmitBtn.classList.remove("formSubmitBtnReady");
          contactForm.reset();
          confirmWindow.classList.remove("slide-in-left");
          confirmWindow.classList.remove("slide-out-right");
        }, 3000);
      }

      console.log("sending complete");
      // }, 600);
    })
    // handling errors (server connection)
    // handles server if it doesnt respond OR if it responds with an error
    .catch(function(error) {
      isLoading = false;
      loadingOverlay.classList.add("displayHidden");
      console.log(error);
      console.log(typeof error);
      console.log(Object.getOwnPropertyNames(error));
      console.log(error.message);

      if (error.message == "REQUEST_TIMED_OUT") {
        errorOverlay.classList.remove("displayHidden");
        contactFormButtonsBar.classList.add("displayHidden");
        setTimeout(function() {
          errorOverlay.classList.add("displayHidden");
          contactFormButtonsBar.classList.remove("displayHidden");
        }, 4000);
      } else if (navigator.onLine == false) {
        connectionErrorOverlay.classList.remove("displayHidden");
        contactFormButtonsBar.classList.add("displayHidden");
        setTimeout(function() {
          connectionErrorOverlay.classList.add("displayHidden");
          contactFormButtonsBar.classList.remove("displayHidden");
        }, 4000);
      } else {
        errorOverlay.classList.remove("displayHidden");
        contactFormButtonsBar.classList.add("displayHidden");
        setTimeout(function() {
          errorOverlay.classList.add("displayHidden");
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
