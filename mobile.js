// Remove Gray Highlight When Tapping Links in Mobile Safari
document.addEventListener("touchstart", function() {}, true);

let html = document.getElementsByTagName("html")[0];
let body = document.getElementsByTagName("body")[0];
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
let formInputFields = document.querySelectorAll("input, textarea");
let backToTopBtn = document.getElementById("backToTopBtn");

function scrollBodyToTop() {
  if (document.documentElement.scrollTop > 0) {
    document.documentElement.scrollTop =
      document.documentElement.scrollTop * 0.7;
    body.scrollTop = body.scrollTop * 0.7;
    setTimeout(function() {
      scrollBodyToTop();
    }, 40);
  }
}

for (let i = 0; i < formInputFields.length; i++) {
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

if (document.documentElement.scrollTop > 0) {
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
  if (document.documentElement.scrollTop > 0) {
    backToTopBtn.classList.remove("displayHidden");
  } else {
    backToTopBtn.classList.add("displayHidden");
  }
};

backToTopBtn.onclick = function() {
  scrollBodyToTop();
};
