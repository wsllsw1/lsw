const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navAnchors = navLinks ? Array.from(navLinks.querySelectorAll("a")) : [];
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("resourceSearch");
const toolsGrid = document.getElementById("toolsGrid");
const toolCards = toolsGrid ? Array.from(toolsGrid.querySelectorAll(".tool-card")) : [];
const emptyState = document.getElementById("emptyState");
const resultCount = document.getElementById("resultCount");
const categoryButtons = Array.from(document.querySelectorAll("[data-category]"));
const searchButtons = Array.from(document.querySelectorAll("[data-search]"));

let currentCategory = "all";
let currentQuery = "";

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
    threshold: 0.14,
    rootMargin: "0px 0px -30px 0px",
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const setActiveLink = () => {
  const scrollY = window.scrollY + 120;
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

const normalizeText = (text) => text.trim().toLowerCase();

const applyFilters = () => {
  let visibleCount = 0;
  const query = normalizeText(currentQuery);

  toolCards.forEach((card) => {
    const category = card.dataset.category || "";
    const text = normalizeText(`${card.innerText} ${card.dataset.keywords || ""}`);
    const matchesCategory = currentCategory === "all" || category === currentCategory;
    const matchesQuery = !query || text.includes(query);
    const isVisible = matchesCategory && matchesQuery;

    card.classList.toggle("hidden", !isVisible);

    if (isVisible) {
      visibleCount += 1;
    }
  });

  if (emptyState) {
    emptyState.classList.toggle("show", visibleCount === 0);
  }

  if (resultCount) {
    if (currentCategory === "all" && !query) {
      resultCount.textContent = "显示全部资源";
    } else {
      resultCount.textContent = `找到 ${visibleCount} 个资源`;
    }
  }
};

const setCategory = (category) => {
  currentCategory = category;

  categoryButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.category === category);
  });

  applyFilters();
};

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setCategory(button.dataset.category || "all");
    document.getElementById("tools")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

searchButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentQuery = button.dataset.search || "";
    currentCategory = "all";

    categoryButtons.forEach((categoryButton) => {
      categoryButton.classList.toggle("active", categoryButton.dataset.category === "all");
    });

    if (searchInput) {
      searchInput.value = currentQuery;
    }

    applyFilters();
    document.getElementById("tools")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

if (searchForm && searchInput) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    currentQuery = searchInput.value;
    applyFilters();
    document.getElementById("tools")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  searchInput.addEventListener("input", () => {
    currentQuery = searchInput.value;
    applyFilters();
  });
}

setActiveLink();
applyFilters();
window.addEventListener("scroll", setActiveLink);
