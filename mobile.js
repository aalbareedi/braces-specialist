// Remove Gray Highlight When Tapping Links in Mobile Safari
document.addEventListener("touchstart", function() {}, true);

let html = document.getElementsByTagName("html")[0];
let body = document.getElementsByTagName("body")[0];
let scrollingElement =
  document.scrollingElement || document.documentElement || body;
let mainDock = document.getElementById("mainDock");
let mainNavBar = document.getElementById("mainSiteNavbar");
let navToggleBtn = document.getElementById("navToggleBtn");
let navToggleIcon = document.getElementById("navToggleIcon");
let navWindow = document.getElementById("sideNavWindow");
let messageBtn = document.getElementById("messageBtn");
let contactForm = document.getElementById("contactWindow");
let contactFormCancelBtn = document.getElementById("formCancelBtn");
let contactFromBackArrow = document.getElementById("backArrow");
let contactFormButtonsBar = document.getElementById("contactFormButtons");
let contactFormSubmitBtn = document.getElementById("contactFormSubmitBtn");
let formInputFields = document.querySelectorAll("input, textarea");
let backToTopBtn = document.getElementById("backToTopBtn");
let statYear = document.getElementById("statYear");
let statCases = document.getElementById("statCases");
let statPercent = document.getElementById("statPercent");

function scrollBodyToTop() {
  if (scrollingElement.scrollTop > 0.1) {
    scrollingElement.scrollTop = scrollingElement.scrollTop * 0.7;
    setTimeout(function() {
      scrollBodyToTop();
    }, 40);
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
    statCases.innerHTML = parseInt(statCases.innerHTML) + 13;

    setTimeout(function() {
      scrollCasesCounter();
    }, 5);
  } else {
    statCases.innerHTML = 5000;
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
      contactFormSubmitBtn.classList.remove("formSubmitBtn");
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

mainNavBar.onclick = function() {
  // body.scrollTop = 0;
  // workaround for Chrome scroll to top
  // document.documentElement.scrollTop = 0;

  scrollBodyToTop();
};

navToggleBtn.onclick = function(event) {
  if (navWindow.classList.contains("displayHidden")) {
    navWindow.classList.remove("displayHidden");
  } else {
    navWindow.classList.add("displayHidden");
  }

  if (navToggleIcon.classList.contains("fa-bars")) {
    navToggleIcon.classList.remove("fa-bars");
    navToggleIcon.classList.add("fa-times");
  } else {
    navToggleIcon.classList.remove("fa-times");
    navToggleIcon.classList.add("fa-bars");
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

  if (scrollingElement.scrollTop + screen.height - 65 > statYear.offsetTop) {
    if (statYear.innerHTML == 1) {
      scrollYearCounter();
    }
  }

  if (scrollingElement.scrollTop + screen.height - 65 > statCases.offsetTop) {
    // console.log("test");
    // console.log(screen.height);
    if (statCases.innerHTML == 1) {
      scrollCasesCounter();
    }
  }
};

backToTopBtn.onclick = function() {
  scrollBodyToTop();
};
