/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);
  //validate if variable exists
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__Link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  //when each nav is clicked, remove show menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");
function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 60;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== SHOW SCROLL TOP ====================*/
function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");
  //when scroll is highger than 560 viewport height, add show-scroll class
  if (this.scrollY >= 200) {
    scrollTop.classList.add("show-scroll");
  } else {
    scrollTop.classList.remove("show-scroll");
  }
}
window.addEventListener("scroll", scrollTop);
/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

//previously selected topic(if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

//validate icon if user select dark theme
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  document.body.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

//validate if user change theme
if (selectedTheme) {
  //if condition fulfilled,activate or deactivate dark theme
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedTheme === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

//activate or deactivate manual with button
themeButton.addEventListener("click", () => {
  //add or remove icon theme button
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  //save current icon user choice
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
/*==================== REDUCE THE SIZE AND PRINT ON AN A4 SHEET ====================*/
function scaleCV() {
  document.body.classList.add("scale-cv");
}
/*==================== REMOVE THE SIZE WHEN THE CV IS DOWNLOADED ====================*/
function removeScale() {
  document.body.classList.remove("scale-cv");
}
/*==================== GENERATE PDF ====================*/
// PDF generated area
let areaCV = document.getElementById("area-cv");

let resumeButton = document.getElementById("resume-button");

// Html2pdf options
let opt = {
  margin: 0,
  filename: "Resume.pdf",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 4 },
  jsPDF: { format: "A4", orientation: "portrait" },
};
// Function to call areaCv and Html2Pdf options
function generateResume() {
  html2pdf(areaCV, opt);
}

// When the button is clicked, it executes the three functions
resumeButton.addEventListener("click", () => {
  // 1. The class .scale-cv is added to the body, where it reduces the size of the elements
  scaleCV();
  // 2. The PDF is generated
  generateResume();
  // 3. The .scale-cv class is removed from the body after 5 seconds to return to normal size.
  setTimeout(removeScale, 5000);
});
