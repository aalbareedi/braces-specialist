let html = document.getElementsByTagName("html")[0];
let body = document.getElementsByTagName("body")[0];
let scrollingElement =
  document.scrollingElement || document.documentElement || body;

let wrapper = document.getElementById("wrapper");
let main = document.querySelector("main");
let mainDock = document.getElementById("mainDock");
let dockContactBtns = document.getElementsByClassName("dockContactBtn");
let messageBtn = document.getElementById("messageBtn");
let backToTopBtn = document.getElementById("backToTopBtn");
let aboutUsSection = document.getElementById("aboutUs");
let doctorSection = document.getElementById("doctor");
let aboutBracesSection = document.getElementById("aboutBraces");
let officeInfoSection = document.getElementById("officeInfo");
let faqSection = document.getElementById("faq");
let stats = document.getElementById("stats");
let statYear = document.getElementById("statYear");
let statCases = document.getElementById("statCases");
let statPercent = document.getElementById("statPercent");
let scrollAwaiters = document.getElementsByClassName("awaitsScrolling");
let scrollToElements = document.querySelectorAll("[data-scrollToAnimation]");
// nav
let navbar = document.getElementById("navbar");
let navToggleBtn = document.getElementById("navToggleBtn");
let navToggleIcon = document.getElementById("navToggleIcon");
let navMenu = document.getElementById("navMenu");
let navOverlay = document.getElementById("navOverlay");
let navMenuOpt = document.getElementsByClassName("navMenuOpt");
let navSocialMediaBtns = document.getElementsByClassName("navSocialMediaBtn");
// contact form
let contactForm = document.getElementById("contactForm");
let contactFormCancelBtn = document.getElementById("formCancelBtn");
let contactFormBackArrow = document.getElementById("backArrow");
let contactFormButtonsBar = document.getElementById("formButtons");
let contactFormSubmitBtn = document.getElementById("contactFormSubmitBtn");
let formInputFields = document.querySelectorAll("input, textarea");
let contactFormNameInput = document.getElementById("nameInput");
let contactFormEmailInput = document.getElementById("emailInput");
let contactFormPhoneInput = document.getElementById("phoneInput");
let contactFormMessageInput = document.getElementById("messageInput");
let loadingOverlay = document.getElementById("loadingOverlay");
let successOverlay = document.getElementById("successOverlay");
let errorOverlay = document.getElementById("errorOverlay");
let connectionErrorOverlay = document.getElementById("connectionErrorOverlay");
let confirmWindow = document.getElementById("confirmWindow");
let errorText = document.getElementById("errorText");
