// Remove Gray Highlight When Tapping Links in Mobile Safari
document.addEventListener("touchstart", function() {}, true);

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

  // workaround for css ignoring transitions when display:none is involved
  setTimeout(function() {
    confirmWindow.classList.add("visibleConfirmWindow");
    confirmWindow.classList.add("slide-in-left");
  }, 10);

  setTimeout(function() {
    confirmWindow.classList.add("slide-out-right");
  }, 2500);

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
    confirmWindow.classList.remove("slide-in-left");
    confirmWindow.classList.remove("slide-out-right");
  }, 3000);

  scrollingElement.scrollTop = bodyScrollPosition;
};

contactFormBackArrow.onclick = function() {
  html.classList.remove("overflowHidden");
  contactForm.classList.add("displayHidden");
  body.classList.remove("overflowHidden");
  wrapper.classList.remove("overflowHidden");
  scrollingElement.scrollTop = bodyScrollPosition;
};

contactFormCancelBtn.onclick = function() {
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
