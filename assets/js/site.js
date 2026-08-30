(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const nav = document.querySelector(".nav");
  const topMarker = document.getElementById("top");
  if (nav && topMarker && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(([entry]) => {
      nav.classList.toggle("scrolled", !entry.isIntersecting);
    }, { rootMargin: "-20px 0px 0px" });
    observer.observe(topMarker);
  }

  const toggle = document.getElementById("mobToggle");
  const links = document.getElementById("mainNav");
  const closeMenu = () => {
    links?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Open navigation");
  };

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    links.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });
    document.addEventListener("click", event => {
      if (!links.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1020) closeMenu();
    });
  }
})();
