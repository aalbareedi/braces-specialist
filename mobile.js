// Remove Gray Highlight When Tapping Links in Mobile Safari
document.addEventListener("touchstart", function() {}, true);

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
let screenOverlay = document.getElementById("screenOverlay");

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

function isFormFilled() {
  for (let i = 0; i < formInputFields.length; i++) {
    if (formInputFields[i].value == "") {
      return false;
    }
  }
  return true;
}

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
  formInputFields[i].onfocus = function() {
    let currentInput = this;

    setTimeout(function() {
      // .getBoundingClientRect().top gives distance from element to top of viewport
      let inputDistanceFromTop = currentInput.getBoundingClientRect().top;
      if (currentInput.tagName == "TEXTAREA") {
        // contactForm.scrollTop: how far contactForm is scrolled, 0 initially
        contactForm.scrollTop += inputDistanceFromTop - 104;
      } else {
        contactForm.scrollTop += inputDistanceFromTop - 164;
      }
    }, 10);

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
  if (navWindow.classList.contains("openMenu") == false) {
    scrollBodyToTop();
  }
};

navToggleBtn.onclick = function(event) {
  if (navToggleIcon.classList.contains("fa-bars")) {
    navToggleIcon.classList.remove("fa-bars");
    navToggleIcon.classList.add("fa-times");
  } else {
    navToggleIcon.classList.remove("fa-times");
    navToggleIcon.classList.add("fa-bars");
  }

  if (navWindow.classList.contains("openMenu") == false) {
    navWindow.classList.add("openMenu");
    screenOverlay.classList.remove("displayHidden");
    wrapper.classList.add("overflowHidden");
  } else {
    navWindow.classList.remove("openMenu");
    screenOverlay.classList.add("displayHidden");
    wrapper.classList.remove("overflowHidden");
  }

  event.stopPropagation();
};

messageBtn.onclick = function() {
  html.classList.add("overflowHidden");
  contactForm.classList.remove("displayHidden");
  body.classList.add("overflowHidden");
};

contactFormCancelBtn.onclick = function() {
  html.classList.remove("overflowHidden");
  contactForm.classList.add("displayHidden");
  body.classList.remove("overflowHidden");
};

contactFromBackArrow.onclick = function() {
  html.classList.remove("overflowHidden");
  contactForm.classList.add("displayHidden");
  body.classList.remove("overflowHidden");
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

backToTopBtn.onclick = function() {
  scrollBodyToTop();
};

screenOverlay.onclick = function() {
  screenOverlay.classList.add("displayHidden");
  navWindow.classList.remove("openMenu");
  navToggleIcon.classList.remove("fa-times");
  navToggleIcon.classList.add("fa-bars");
  html.classList.remove("overflowHidden");
  body.classList.remove("overflowHidden");
};
