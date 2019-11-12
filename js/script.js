let bodyScrollPosition = 0;

if (scrollingElement.scrollTop > 0) {
  backToTopBtn.classList.remove("displayHidden");
}

disableScrollBehind(contactForm);
disableScrollBehind(navOverlay);
disableScrollBehind(navMenu);
disableScrollBehind(navbar);
disableScrollBehind(successOverlay);
disableScrollBehind(errorOverlay);
disableScrollBehind(loadingOverlay);
disableScrollBehind(connectionErrorOverlay);

for (let i = 0; i < dockContactBtns.length; i++) {
  disableScrollBehind(dockContactBtns[i]);
}

for (let i = 0; i < navMenuOpt.length; i++) {
  disableScrollBehind(navMenuOpt[i]);
}

$("#reviewSlider").slick({
  dots: true,
  arrows: false,
  autoplay: true,
  pauseOnDotsHover: true
});

/* Slick dots sticky touch hover workaround - JS portion (also see CSS portion)
 * https://github.com/kenwheeler/slick/issues/1945#issuecomment-230158398
 * http://stackoverflow.com/a/4734092/4747661
 * Marks the slick-dots container as a touch-device so CSS can work it's magic
 */
// if ("ontouchstart" in document) {
this.$(".slick-dots").addClass("touch-device");
// }

// setTimeout(function() {
//   alert(window.innerWidth + "," + window.innerHeight);
// }, 3000);
