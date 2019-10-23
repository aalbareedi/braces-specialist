let bodyScrollPosition = 0;

if (scrollingElement.scrollTop > 0) {
  backToTopBtn.classList.remove("displayHidden");
}

disableScrollBehind(contactForm);
disableScrollBehind(navOverlay);
disableScrollBehind(navMenu);
disableScrollBehind(navbar);

for (let i = 0; i < dockContactBtns.length; i++) {
  disableScrollBehind(dockContactBtns[i]);
}

for (let i = 0; i < navMenuOpt.length; i++) {
  disableScrollBehind(navMenuOpt[i]);
}

alert(screen.width + ", " + screen.height);
