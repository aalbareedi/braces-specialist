let bodyScrollPosition = 0;

if (scrollingElement.scrollTop > 0) {
  backToTopBtn.classList.remove("displayHidden");
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
