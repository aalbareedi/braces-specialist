// Remove Gray Highlight When Tapping Links in Mobile Safari
document.addEventListener("touchstart", function() {}, true);

navToggleBtn.onclick = function(event) {
  if (successOverlay.classList.contains("displayHidden") == true) {
    if (navMenu.classList.contains("openMenu") == false) {
      openNavMenu();
    } else {
      closeNavMenu();
    }
  }

  event.stopPropagation();
};

for (let i = 0; i < navSocialMediaBtns.length; i++) {
  navSocialMediaBtns[i].onclick = function() {
    closeNavMenu();
  };
}

navbar.onclick = function() {
  if (
    contactForm.classList.contains("displayHidden") == false &&
    navMenu.classList.contains("openMenu") == false
  ) {
    closeContactForm();
  }
};

navOverlay.onclick = function() {
  closeNavMenu();
};

messageBtn.onclick = function() {
  contactForm.classList.remove("displayHidden");
  html.classList.add("overflowHidden");
  body.classList.add("overflowHidden");
  body.classList.add("formOpen");
  wrapper.classList.add("overflowHidden");
  bodyScrollPosition = scrollingElement.scrollTop;
  navbar.setAttribute("href", "");
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
  // scrollBodyToTop();
};

for (let i = 0; i < navMenuOpt.length; i++) {
  navMenuOpt[i].onclick = function() {
    closeNavMenu();
    closeContactForm();
  };
}

for (let i = 0; i < desktopNavMenuOpt.length; i++) {
  desktopNavMenuOpt[i].onclick = function() {
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
  if (
    scrollingElement.scrollTop + screen.height - 110 >
    getAbsoluteOffsetTop(statYear)
  ) {
    if (statYear.innerHTML == 1) {
      scrollYearCounter();
    }
  }

  if (
    scrollingElement.scrollTop + screen.height - 110 >
    getAbsoluteOffsetTop(statCases)
  ) {
    if (statCases.innerHTML == 1) {
      scrollCasesCounter();
    }
  }

  if (
    scrollingElement.scrollTop + screen.height - 110 >
    getAbsoluteOffsetTop(statPercent)
  ) {
    if (statPercent.innerHTML == 1) {
      scrollPercentCounter();
    }
  }

  for (let i = 0; i < scrollToElements.length; i++) {
    if (
      scrollingElement.scrollTop + screen.height - 120 >
      getAbsoluteOffsetTop(scrollToElements[i])
    ) {
      scrollToElements[i].classList.add(
        scrollToElements[i].getAttribute("data-scrollToAnimation")
      );
      scrollToElements[i].classList.add("animated");
    }
  }

  if (
    scrollingElement.scrollTop + screen.height - 120 > bracesVideo.offsetTop &&
    scrollingElement.scrollTop + screen.height - 120 <
      bracesVideo.offsetTop + screen.height
  ) {
    bracesVideo.play();
  } else {
    bracesVideo.pause();
  }

  if (scrollingElement.scrollTop > screen.height) {
    bgImg.classList.add("displayHidden");
  } else {
    bgImg.classList.remove("displayHidden");
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

  let difference = phoneValue.length - numbersString.length;

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
    if (
      (contactFormPhoneInput.value.length > phoneValue.length &&
        difference == 0) ||
      difference >= 4
    ) {
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
    // checking to see if we removed SPECIAL CHARACTERS on this keypress (from 10 to 9 or 10 to 11 numbers)
    if (numbersString != phoneValue) {
      let offset = 0;
      // If removing a DIGIT on this keypress (from 10 to 9 numbers)
      if (previousPhoneValue.length > phoneValue.length) {
        offset = 1;
      }

      // correcting selectionStart (cursor position) after we REMOVE spaces/parenthesis
      if (selectionStart > 10 - offset) {
        selectionStart -= 4;
      } else if (selectionStart > 6 - offset) {
        selectionStart -= 3;
      } else if (
        selectionStart == 6 &&
        previousPhoneValue.length < phoneValue.length
      ) {
        selectionStart -= 2;
      } else if (selectionStart > 1 - offset) {
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

darkModeBtn.onchange = function() {
  if (darkModeBtn.checked == true) {
    contactForm.classList.remove("lightTheme");
  } else {
    contactForm.classList.add("lightTheme");
  }
};
