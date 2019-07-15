// Remove Gray Highlight When Tapping Links in Mobile Safari
document.addEventListener("touchstart", function() {}, true);

let mainNavBar = document.getElementById("mainSiteNavbar");
let navToggleBtn = document.getElementById("navToggleBtn");
let navToggleIcon = document.getElementById("navToggleIcon");
let navWindow = document.getElementById("sideNavWindow");
let messageBtn = document.getElementById("messageBtn");
let contactForm = document.getElementById("contactWindow");
let contactFormCancelBtn = document.getElementById("formCancelBtn");
let contactFromBackArrow = document.getElementById("backArrow");
let body = document.documentElement;

mainNavBar.onclick = function() {
  body.scrollTop = 0;
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
  contactForm.classList.remove("displayHidden");
  body.classList.add("overflowHidden");
};

contactFormCancelBtn.onclick = function() {
  contactForm.classList.add("displayHidden");
  body.classList.remove("overflowHidden");
};

contactFromBackArrow.onclick = function() {
  contactForm.classList.add("displayHidden");
  body.classList.remove("overflowHidden");
};
