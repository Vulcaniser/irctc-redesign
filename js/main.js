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
