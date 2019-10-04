// Remove Gray Highlight When Tapping Links in Mobile Safari
document.addEventListener("touchstart", function() {}, true);

let bodyScrollPosition = 0;
let html = document.getElementsByTagName("html")[0];
let body = document.getElementsByTagName("body")[0];
let wrapper = document.getElementById("wrapper");
let scrollingElement =
  document.scrollingElement || document.documentElement || body;
let mainDock = document.getElementById("mainDock");
let navbar = document.getElementById("navbar");
let navToggleBtn = document.getElementById("navToggleBtn");
let navToggleIcon = document.getElementById("navToggleIcon");
let navWindow = document.getElementById("navWindow");
let messageBtn = document.getElementById("messageBtn");
let contactForm = document.getElementById("contactForm");
let contactFormCancelBtn = document.getElementById("formCancelBtn");
let contactFromBackArrow = document.getElementById("backArrow");
let contactFormButtonsBar = document.getElementById("formButtons");
let contactFormSubmitBtn = document.getElementById("contactFormSubmitBtn");
let formInputFields = document.querySelectorAll("input, textarea");
let backToTopBtn = document.getElementById("backToTopBtn");
let statYear = document.getElementById("statYear");
let statCases = document.getElementById("statCases");
let statPercent = document.getElementById("statPercent");
let navOverlay = document.getElementById("navOverlay");
let formOverlay = document.getElementById("formOverlay");
let confirmWindow = document.getElementById("confirmWindow");
let main = document.querySelector("main");
let sideNavMenuOpt = document.getElementsByClassName("sideNavMenuOpt");
let dockContactBtns = document.getElementsByClassName("dockContactBtn");

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
  if (scrollingElement.scrollTop > 0.1) {
    if (
      previousScrollTop == scrollingElement.scrollTop ||
      previousScrollTop == -1
    ) {
      scrollingElement.scrollTop = scrollingElement.scrollTop * 0.7;
      let scrollTop = scrollingElement.scrollTop;
      setTimeout(function() {
        scrollBodyToTop(scrollTop);
      }, 40);
    }
  }
}

function isFormFilled() {
  for (let i = 0; i < formInputFields.length; i++) {
    if (formInputFields[i].value == "") {
      return false;
    }
  }
  return true;
}

// contact form
for (let i = 0; i < formInputFields.length; i++) {
  // oninput: when user types in input field
  formInputFields[i].oninput = function() {
    if (isFormFilled() == true) {
      contactFormSubmitBtn.disabled = false;
      contactFormSubmitBtn.classList.remove("formSubmitBtnDisabled");
      contactFormSubmitBtn.classList.add("formSubmitBtnReady");
    }
  };

  // onfocus: when input field is selected
  formInputFields[i].onfocus = function(event) {
    // event.currentTarget.style.backgroundColor = "red";
    let currentInput = this;

    setTimeout(function() {
      // .getBoundingClientRect().top gives distance from element to top of viewport
      let inputDistanceFromTop = currentInput.getBoundingClientRect().top;
      if (currentInput.tagName == "TEXTAREA") {
        // contactForm.scrollTop: how far contactForm is scrolled, 0 initially
        contactForm.scrollTop += inputDistanceFromTop - 104;
      } else {
        contactForm.scrollTop += inputDistanceFromTop - 214;
      }
    }, 100);

    contactFormButtonsBar.classList.add("displayHidden");
    mainDock.classList.add("displayHidden");
  };

  // onblur: when leaving an input field
  formInputFields[i].onblur = function() {
    contactFormButtonsBar.classList.remove("displayHidden");
    mainDock.classList.remove("displayHidden");
  };
}

if (scrollingElement.scrollTop > 0) {
  backToTopBtn.classList.remove("displayHidden");
}

navbar.onclick = function() {
  if (
    navWindow.classList.contains("openMenu") == false &&
    contactForm.classList.contains("displayHidden") == true
  ) {
    scrollBodyToTop();
  }
};

navToggleBtn.onclick = function(event) {
  if (formOverlay.classList.contains("displayHidden") == true) {
    // changing nav toggle icon
    if (navToggleIcon.classList.contains("fa-bars")) {
      navToggleIcon.classList.remove("fa-bars");
      navToggleIcon.classList.add("fa-times");
    } else {
      navToggleIcon.classList.remove("fa-times");
      navToggleIcon.classList.add("fa-bars");
    }

    if (navWindow.classList.contains("openMenu") == false) {
      navWindow.classList.add("openMenu");
      navOverlay.classList.remove("displayHidden");
      wrapper.classList.add("overflowHidden");
    } else {
      navWindow.classList.remove("openMenu");
      navOverlay.classList.add("displayHidden");
      wrapper.classList.remove("overflowHidden");
    }
  }

  event.stopPropagation();
};

navOverlay.onclick = function() {
  navOverlay.classList.add("displayHidden");
  navWindow.classList.remove("openMenu");
  navToggleIcon.classList.remove("fa-times");
  navToggleIcon.classList.add("fa-bars");
  html.classList.remove("overflowHidden");
  body.classList.remove("overflowHidden");
};

messageBtn.onclick = function() {
  html.classList.add("overflowHidden");
  contactForm.classList.remove("displayHidden");
  body.classList.add("overflowHidden");
  wrapper.classList.add("overflowHidden");
  bodyScrollPosition = scrollingElement.scrollTop;
};

contactForm.onsubmit = function(event) {
  // preventDefault is a method of the event (action) object, stops form from auto sending
  event.preventDefault();

  formOverlay.classList.remove("displayHidden");
  contactFormButtonsBar.classList.add("displayHidden");

  setTimeout(function() {
    confirmWindow.classList.add("visibleConfirmWindow");
  }, 10);

  setTimeout(function() {
    contactForm.scrollTop = 0;
    confirmWindow.classList.remove("visibleConfirmWindow");
    formOverlay.classList.add("displayHidden");
    contactForm.classList.add("displayHidden");
    contactFormButtonsBar.classList.remove("displayHidden");
    contactFormSubmitBtn.disabled = true;
    contactFormSubmitBtn.classList.add("formSubmitBtnDisabled");
    contactFormSubmitBtn.classList.remove("formSubmitBtnReady");
    contactForm.reset();
  }, 3000);

  scrollingElement.scrollTop = bodyScrollPosition;
};

contactFormCancelBtn.onclick = function() {
  html.classList.remove("overflowHidden");
  contactForm.classList.add("displayHidden");
  body.classList.remove("overflowHidden");
  wrapper.classList.remove("overflowHidden");
  scrollingElement.scrollTop = bodyScrollPosition;
};

contactFromBackArrow.onclick = function() {
  html.classList.remove("overflowHidden");
  contactForm.classList.add("displayHidden");
  body.classList.remove("overflowHidden");
  wrapper.classList.remove("overflowHidden");
  scrollingElement.scrollTop = bodyScrollPosition;
};

backToTopBtn.onclick = function() {
  scrollBodyToTop();
};

body.onscroll = function() {
  if (scrollingElement.scrollTop > 0) {
    backToTopBtn.classList.remove("displayHidden");
  } else {
    backToTopBtn.classList.add("displayHidden");
  }

  if (scrollingElement.scrollTop + screen.height - 80 > statYear.offsetTop) {
    if (statYear.innerHTML == 1) {
      scrollYearCounter();
    }
  }

  if (scrollingElement.scrollTop + screen.height - 80 > statCases.offsetTop) {
    if (statCases.innerHTML == 1) {
      scrollCasesCounter();
    }
  }

  if (scrollingElement.scrollTop + screen.height - 80 > statPercent.offsetTop) {
    if (statPercent.innerHTML == 1) {
      scrollPercentCounter();
    }
  }
};

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

disableScrollBehind(contactForm);
disableScrollBehind(navOverlay);
disableScrollBehind(navWindow);
disableScrollBehind(navbar);

for (let i = 0; i < dockContactBtns.length; i++) {
  disableScrollBehind(dockContactBtns[i]);
}

for (let i = 0; i < sideNavMenuOpt.length; i++) {
  disableScrollBehind(sideNavMenuOpt[i]);
}
