// Remove Gray Highlight When Tapping Links in Mobile Safari
document.addEventListener("touchstart", function() {}, true);

navbar.onclick = function() {
  if (
    navMenu.classList.contains("openMenu") == false &&
    contactForm.classList.contains("displayHidden") == true
  ) {
    scrollBodyToTop();
  }
};

navToggleBtn.onclick = function(event) {
  if (successOverlay.classList.contains("displayHidden") == true) {
    // changing nav toggle icon
    if (navToggleIcon.classList.contains("is-active")) {
      navToggleIcon.classList.remove("is-active");
    } else {
      navToggleIcon.classList.add("is-active");
    }

    if (navMenu.classList.contains("openMenu") == false) {
      navMenu.classList.add("openMenu");
      navOverlay.classList.remove("displayHidden");
      wrapper.classList.add("overflowHidden");
    } else {
      navMenu.classList.remove("openMenu");
      navOverlay.classList.add("displayHidden");
      wrapper.classList.remove("overflowHidden");
    }
  }

  event.stopPropagation();
};

navSocialMediaBtns.onclick = function() {};

for (let i = 0; i < navSocialMediaBtns.length; i++) {
  navSocialMediaBtns[i].onclick = function() {
    closeNavMenu();
  };
}

navOverlay.onclick = function() {
  navOverlay.classList.add("displayHidden");
  navMenu.classList.remove("openMenu");
  navToggleIcon.classList.remove("is-active");
  html.classList.remove("overflowHidden");
  body.classList.remove("overflowHidden");
  wrapper.classList.remove("overflowHidden");
};

messageBtn.onclick = function() {
  contactForm.classList.remove("displayHidden");
  html.classList.add("overflowHidden");
  body.classList.add("overflowHidden");
  wrapper.classList.add("overflowHidden");
  bodyScrollPosition = scrollingElement.scrollTop;
};

contactForm.onsubmit = function(event) {
  // preventDefault is a method of the event (action) object, stops form from auto sending
  event.preventDefault();

  scrollingElement.scrollTop = bodyScrollPosition;
  html.classList.remove("overflowHidden");
  body.classList.remove("overflowHidden");
  wrapper.classList.remove("overflowHidden");

  sendEmail();
};

contactFormBackArrow.onclick = function() {
  closeContactForm();
  scrollingElement.scrollTop = bodyScrollPosition;
};

contactFormCancelBtn.onclick = function() {
  closeContactForm();
  scrollingElement.scrollTop = bodyScrollPosition;
};

backToTopBtn.onclick = function(event) {
  event.preventDefault();
  event.stopPropagation();
  scrollBodyToTop();
};

let sections = [
  aboutUsSection,
  doctorSection,
  aboutBracesSection,
  faqSection,
  officeInfoSection
];

for (let i = 0; i < sections.length; i++) {
  navMenuOpt[i].onclick = function() {
    $(scrollingElement).animate({ scrollTop: sections[i].offsetTop - 40 });
    closeNavMenu();
    closeContactForm();
  };
}

body.onscroll = function() {
  if (scrollingElement.scrollTop > 0) {
    backToTopBtn.classList.remove("opacityZero");
  } else {
    backToTopBtn.classList.add("opacityZero");
  }

  // console.log(statCases.offsetTop);
  // position property affects statYear.offsetTop
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

for (let i = 0; i < formInputFields.length; i++) {
  // oninput: when user types in input field
  formInputFields[i].oninput = function() {
    if (isFormValid() == true) {
      contactFormSubmitBtn.disabled = false;
      contactFormSubmitBtn.classList.remove("formSubmitBtnDisabled");
      contactFormSubmitBtn.classList.add("formSubmitBtnReady");
    } else {
      contactFormSubmitBtn.classList.remove("formSubmitBtnReady");
      contactFormSubmitBtn.classList.add("formSubmitBtnDisabled");
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

let previousPhoneValue = "";

contactFormPhoneInput.addEventListener("input", function() {
  // selectionStart is the index # value of where the cursor is after a keystroke (even delete)
  let selectionStart = contactFormPhoneInput.selectionStart;

  let phoneValue = contactFormPhoneInput.value;
  // numbers is an array of the 'phoneValue' numbers, without any spaces/parenthesis
  let numbers = phoneValue.match(/\d+/g);
  let numbersString = "";
  if (numbers != null) {
    // joining the numbers array values to 1 string
    numbersString = numbers.join("");
  }

  if (numbersString.length == 10) {
    let formattedNumber =
      "(" +
      numbersString[0] +
      numbersString[1] +
      numbersString[2] +
      ") " +
      numbersString[3] +
      numbersString[4] +
      numbersString[5] +
      " " +
      numbersString[6] +
      numbersString[7] +
      numbersString[8] +
      numbersString[9];

    contactFormPhoneInput.value = formattedNumber;

    // If special characters were actually added this keypress
    if (phoneValue.length > previousPhoneValue.length) {
      // correcting selectionStart (cursor position) after we ADD spaces/parenthesis
      if (selectionStart > 5) {
        selectionStart += 4;
      } else if (selectionStart > 3) {
        selectionStart += 3;
      } else {
        selectionStart += 1;
      }
    }
  } else {
    contactFormPhoneInput.value = numbersString;
    // checking to see if we removed special characters on this keypress (from 10 to 9 or 10 to 11 numbers)
    if (numbersString != phoneValue) {
      let specialOffset = 0;
      // If REMOVING a digit (11 to 10)
      if (previousPhoneValue.length > phoneValue.length) {
        specialOffset = 1;
      }

      // correcting selectionStart (cursor position) after we REMOVE spaces/parenthesis
      if (selectionStart > 10 - specialOffset) {
        selectionStart -= 4;
      } else if (selectionStart > 6 - specialOffset) {
        selectionStart -= 3;
      } else if (selectionStart > 1 - specialOffset) {
        selectionStart -= 1;
      }
    }
  }

  contactFormPhoneInput.selectionStart = selectionStart;
  contactFormPhoneInput.selectionEnd = selectionStart;

  previousPhoneValue = contactFormPhoneInput.value;
});

$("#reviewSlider").on("swipe", function(event, slick, direction) {
  slick.slickPause();
});
