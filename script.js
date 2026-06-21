const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navAnchors = navLinks ? Array.from(navLinks.querySelectorAll("a")) : [];
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navAnchors.forEach((anchor) => {
    anchor.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const setActiveLink = () => {
  const scrollY = window.scrollY + 140;
  let currentId = "";

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;

    if (scrollY >= top && scrollY < top + height) {
      currentId = section.id;
    }
  });

  navAnchors.forEach((anchor) => {
    const target = anchor.getAttribute("href")?.replace("#", "");
    anchor.classList.toggle("active", target === currentId);
  });
};

setActiveLink();
window.addEventListener("scroll", setActiveLink);