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


// Context-aware, one-time support prompt. It appears only after meaningful
// reading activity, never immediately on page load, and can be dismissed.
(() => {
  const prompt = document.querySelector("#support-popover");
  const close = document.querySelector("#support-popover-close");
  const later = document.querySelector("#support-later");
  const coffeeLink = document.querySelector("#support-coffee-link");
  if (!prompt || !close || !later || !coffeeLink) return;

  let shown = false;
  let dismissed = false;
  let dwellTimer = 0;
  let activeSeconds = 0;
  let lastTick = Date.now();
  const minReadSeconds = 35;
  const minScrollDepth = 0.28;
  const storageKey = "code-family-support-prompt-v1";

  try {
    dismissed = sessionStorage.getItem(storageKey) === "dismissed" ||
      sessionStorage.getItem(storageKey) === "clicked";
  } catch (_) {}

  function scrollDepth() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? window.scrollY / max : 0;
  }

  function maybeShow() {
    if (shown || dismissed || document.hidden) return;
    if (activeSeconds < minReadSeconds || scrollDepth() < minScrollDepth) return;
    shown = true;
    prompt.hidden = false;
    prompt.classList.add("is-visible");
    prompt.setAttribute("aria-live", "polite");
  }

  function tickReadingTime() {
    const now = Date.now();
    if (!document.hidden && now - lastTick < 5000) activeSeconds += (now - lastTick) / 1000;
    lastTick = now;
    maybeShow();
  }

  function dismiss(reason = "dismissed") {
    dismissed = true;
    prompt.classList.remove("is-visible");
    prompt.hidden = true;
    try { sessionStorage.setItem(storageKey, reason); } catch (_) {}
  }

  close.addEventListener("click", () => dismiss());
  later.addEventListener("click", () => dismiss());
  coffeeLink.addEventListener("click", () => {
    try { sessionStorage.setItem(storageKey, "clicked"); } catch (_) {}
    prompt.classList.remove("is-visible");
    prompt.hidden = true;
  });

  window.addEventListener("scroll", maybeShow, { passive: true });
  document.addEventListener("visibilitychange", () => { lastTick = Date.now(); maybeShow(); });
  dwellTimer = window.setInterval(tickReadingTime, 5000);
  window.addEventListener("pagehide", () => window.clearInterval(dwellTimer), { once: true });
})();
