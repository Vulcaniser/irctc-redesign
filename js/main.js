/* ==========================================================================
   main.js
   Purpose: Application entry point - initializes other modules, wires up
   global event listeners (e.g. sticky navbar behavior, tab switching
   between Book Ticket / PNR Status / Live Status).
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  if (window.RoutePreview) {
    window.RoutePreview.initializeRoutePreview();
  }
});

/* --------------------------------------------------------------------------
   Live date/time widget
   Keeps the display tied to the browser/system clock. The presentation uses
   the same compact utility-style treatment as IRCTC's date/time indicator,
   with restrained motion supplied by Anime.js when available.
   -------------------------------------------------------------------------- */
function initializeLiveClock() {
  const clock = document.getElementById("live-clock");
  const dateElement = document.getElementById("live-date");
  const timeElement = document.getElementById("live-time");

  if (!clock || !dateElement || !timeElement) return;

  const dateFormatter = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  const pad = (value) => String(value).padStart(2, "0");

  function updateClock() {
    const now = new Date();
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    dateElement.textContent = dateFormatter.format(now);
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    timeElement.dateTime = now.toISOString();

    if (window.anime && seconds === "00") {
      window.anime({
        targets: clock,
        translateY: [-2, 0],
        opacity: [0.82, 1],
        duration: 500,
        easing: "easeOutQuad"
      });
    }
  }

  updateClock();
  window.setInterval(updateClock, 1000);

  if (window.anime) {
    window.anime({
      targets: clock,
      opacity: [0, 1],
      translateY: [-5, 0],
      duration: 650,
      easing: "easeOutCubic"
    });
  }
}

document.addEventListener("DOMContentLoaded", initializeLiveClock);


/* --------------------------------------------------------------------------
   Theme controller
   Dark mode is the first-load default. A user's explicit choice is remembered
   locally, while the route-preview/search modules remain independent.
   -------------------------------------------------------------------------- */
function initializeThemeToggle() {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const transition = document.getElementById("theme-transition");

  if (!toggle) return;

  const STORAGE_KEY = "irctc-redesign-theme";
  const savedTheme = window.localStorage.getItem(STORAGE_KEY);
  const initialTheme = savedTheme === "light" ? "light" : "dark";

  root.dataset.theme = initialTheme;

  function updateToggle(theme) {
    const isLight = theme === "light";
    toggle.setAttribute("aria-pressed", String(isLight));
    toggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
    toggle.setAttribute("title", isLight ? "Switch to dark mode" : "Switch to light mode");

    const sr = toggle.querySelector(".theme-toggle__sr");
    if (sr) sr.textContent = isLight ? "Switch to dark mode" : "Switch to light mode";
  }

  updateToggle(initialTheme);

  function setTheme(nextTheme) {
    const currentTheme = root.dataset.theme || "dark";
    if (nextTheme === currentTheme) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const rect = toggle.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY)
    ) + 24;

    if (reduceMotion || !transition) {
      root.dataset.theme = nextTheme;
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
      updateToggle(nextTheme);
      return;
    }

    transition.style.background = nextTheme === "light" ? "#f5f1e9" : "#050810";
    transition.style.opacity = "1";
    transition.style.clipPath = `circle(0px at ${originX}px ${originY}px)`;

    const reveal = {
      radius: 0
    };

    const finish = () => {
      root.dataset.theme = nextTheme;
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
      updateToggle(nextTheme);
    };

    if (window.anime) {
      window.anime({
        targets: reveal,
        radius,
        duration: 680,
        easing: "easeInOutCubic",
        update: () => {
          transition.style.clipPath =
            `circle(${reveal.radius}px at ${originX}px ${originY}px)`;
        },
        complete: () => {
          finish();

          window.anime({
            targets: transition,
            opacity: [1, 0],
            duration: 440,
            delay: 30,
            easing: "easeOutCubic",
            complete: () => {
              transition.style.clipPath = "circle(0px at 50% 50%)";
            }
          });
        }
      });
    } else {
      transition.style.transition = "clip-path .68s cubic-bezier(.22,.61,.36,1)";
      requestAnimationFrame(() => {
        transition.style.clipPath =
          `circle(${radius}px at ${originX}px ${originY}px)`;

        window.setTimeout(() => {
          finish();
          transition.style.transition = "opacity .44s cubic-bezier(.22,.61,.36,1)";
          transition.style.opacity = "0";
          window.setTimeout(() => {
            transition.style.clipPath = "circle(0px at 50% 50%)";
            transition.style.transition = "";
          }, 450);
        }, 700);
      });
    }
  }

  toggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  });
}

document.addEventListener("DOMContentLoaded", initializeThemeToggle);

/* --------------------------------------------------------------------------
   Scroll reveal
   Lightweight viewport-based reveals for the page sections. The animation
   starts as soon as content enters view, with no artificial waiting period.
   -------------------------------------------------------------------------- */
function initializeScrollReveal() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;

  const style = document.createElement("style");
  style.id = "scroll-reveal-styles";
  style.textContent = `
    .scroll-reveal {
      opacity: 0;
      transform: translate3d(0, 24px, 0);
      transition:
        opacity 520ms cubic-bezier(.22,.61,.36,1),
        transform 520ms cubic-bezier(.22,.61,.36,1);
      will-change: opacity, transform;
    }

    .scroll-reveal.is-revealed {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      will-change: auto;
    }

    .scroll-reveal-item {
      opacity: 0;
      transform: translate3d(0, 18px, 0);
      transition:
        opacity 460ms cubic-bezier(.22,.61,.36,1),
        transform 460ms cubic-bezier(.22,.61,.36,1);
      transition-delay: var(--reveal-delay, 0ms);
      will-change: opacity, transform;
    }

    .scroll-reveal.is-revealed .scroll-reveal-item {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      will-change: auto;
    }
  `;
  document.head.appendChild(style);

  const sections = document.querySelectorAll(
    "main > section:not(.hero), .site-footer"
  );

  const observer = new IntersectionObserver((entries, revealObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.querySelectorAll(
        ".quick-action-card, .train-card, .service-card, .railway-moment-card"
      ).forEach((item, index) => {
        item.classList.add("scroll-reveal-item");
        item.style.setProperty(
          "--reveal-delay",
          `${Math.min(index * 45, 180)}ms`
        );
      });

      requestAnimationFrame(() => {
        entry.target.classList.add("is-revealed");
      });

      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -7% 0px"
  });

  sections.forEach((section) => {
    section.classList.add("scroll-reveal");
    observer.observe(section);
  });
}

document.addEventListener("DOMContentLoaded", initializeScrollReveal);


/* --------------------------------------------------------------------------
   Booking-widget shortcuts
   The PNR Status and Live Status tabs in the booking card are entry points
   into the corresponding Quick Actions tools.  They intentionally open the
   existing Quick Action panel instead of maintaining a second status UI.
   -------------------------------------------------------------------------- */
function initializeBookingStatusShortcuts() {
  const quickActionSelector = {
    pnr: '[data-quick-action="pnr"]',
    train: '[data-quick-action="status"]',
    bookings: '[data-quick-action="bookings"]'
  };

  function openQuickAction(type) {
    const target = document.querySelector(quickActionSelector[type]);
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    // Let the scroll settle before invoking the existing Quick Actions
    // handler. This preserves its current panel/animation behaviour.
    window.setTimeout(function () {
      target.click();
    }, 220);
  }

  const pnrTab = document.getElementById("tab-pnr-status");
  const liveTab = document.getElementById("tab-live-status");

  if (pnrTab) {
    pnrTab.addEventListener("click", function () {
      openQuickAction("pnr");
    });
  }

  if (liveTab) {
    liveTab.addEventListener("click", function () {
      openQuickAction("train");
    });
  }

  // Navbar links should open the same Quick Actions rather than merely
  // jumping to the card's anchor.
  document.querySelectorAll('.navbar__link[href="#pnr-status"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      openQuickAction("pnr");
    });
  });

  document.querySelectorAll('.navbar__link[href="#train-status"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      openQuickAction("train");
    });
  });

  document.querySelectorAll('.navbar__link[href="#my-bookings"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      openQuickAction("bookings");
    });
  });
}

document.addEventListener("DOMContentLoaded", initializeBookingStatusShortcuts);
