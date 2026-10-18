const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    navigation.classList.toggle("is-open", !expanded);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    });
  });
}

// Expand one guide section at a time is intentionally not enforced: readers can
// open several troubleshooting answers while comparing their deployment logs.


const tocNav = document.querySelector("#toc-nav");
const tocSearch = document.querySelector("#toc-search");
const tocLinks = tocNav ? [...tocNav.querySelectorAll("[data-toc-link]")] : [];
const tocProgress = document.querySelector("#toc-progress");
const tocProgressLabel = document.querySelector("#toc-progress-label");
const guideSections = tocLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

if (tocSearch && tocNav) {
  tocSearch.addEventListener("input", () => {
    const query = tocSearch.value.trim().toLowerCase();
    tocNav.querySelectorAll("[data-toc-link]").forEach((link) => {
      link.hidden = !link.textContent.toLowerCase().includes(query);
    });
    tocNav.querySelectorAll(".toc-group-label").forEach((group) => {
      let next = group.nextElementSibling;
      let hasVisibleLink = false;
      while (next && !next.classList.contains("toc-group-label") && !next.classList.contains("toc-support")) {
        if (next.matches("[data-toc-link]") && !next.hidden) hasVisibleLink = true;
        next = next.nextElementSibling;
      }
      group.hidden = !hasVisibleLink;
    });
  });
}

function updateGuideProgress() {
  if (!guideSections.length) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(100, Math.max(0, Math.round((window.scrollY / scrollable) * 100))) : 100;
  if (tocProgress) tocProgress.style.width = progress + "%";
  if (tocProgressLabel) tocProgressLabel.textContent = progress + "% read";
}

if ("IntersectionObserver" in window && guideSections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      tocLinks.forEach((link) => {
        const active = link.getAttribute("href") === "#" + entry.target.id;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-18% 0px -68% 0px", threshold: 0 });
  guideSections.forEach((section) => sectionObserver.observe(section));
}
window.addEventListener("scroll", updateGuideProgress, { passive: true });
window.addEventListener("resize", updateGuideProgress);
updateGuideProgress();
