const portfolioConfig = {
  name: "Julien",
  initials: "JS",
  githubUrl: "https://github.com/ton-pseudo",
  githubLabel: "github.com/ton-pseudo"
};

const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

document.querySelectorAll(".github-link").forEach((link) => {
  link.href = portfolioConfig.githubUrl;
  const strong = link.querySelector("strong");
  if (strong) {
    strong.textContent = portfolioConfig.githubLabel;
  }
});

const brandMark = document.querySelector(".brand-mark");
if (brandMark) {
  brandMark.textContent = portfolioConfig.initials;
}

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const selected = filter.dataset.filter;

    filters.forEach((button) => button.classList.remove("is-active"));
    filter.classList.add("is-active");

    projects.forEach((project) => {
      const categories = project.dataset.category.split(" ");
      const shouldShow = selected === "all" || categories.includes(selected);
      project.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const cursorGlow = document.querySelector(".cursor-glow");
if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.opacity = "1";
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });

  window.addEventListener("pointerleave", () => {
    cursorGlow.style.opacity = "0";
  });
}
