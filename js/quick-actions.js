/* Quick Actions: isolated utility interactions. Does not touch booking/search/map logic. */
(function () {
  "use strict";

  function el(id) { return document.getElementById(id); }
  function q(selector) { return document.querySelector(selector); }

  var panel = el("quick-action-panel");
  var title = el("quick-action-panel-title");
  var kicker = el("quick-action-panel-kicker");
  var copy = el("quick-action-panel-copy");
  var formHost = el("quick-action-panel-form");
  var lastTrigger = null;

  if (!panel || !title || !copy || !formHost) return;

  var content = {
    pnr: {
      kicker: "Booking utility",
      title: "Check PNR Status",
      copy: "Enter your 10-digit PNR to continue. This demo keeps the interaction local and does not send your details anywhere.",
      form: '<label for="quick-pnr">PNR number</label><div class="quick-action-panel__row"><input id="quick-pnr" inputmode="numeric" maxlength="10" placeholder="10-digit PNR"><button type="button" class="btn btn--primary" data-demo-submit="pnr">Check</button></div><small>Demo interaction — live railway services are not connected.</small>'
    },
    status: {
      kicker: "Journey utility",
      title: "Track a Train",
      copy: "Enter a train number or name to open a lightweight status panel. Live running data can be connected here later without changing the booking flow.",
      form: '<label for="quick-train">Train number or name</label><div class="quick-action-panel__row"><input id="quick-train" placeholder="e.g. 12951 or Rajdhani"><button type="button" class="btn btn--primary" data-demo-submit="status">Track</button></div><small>Demo interaction — live running data is not connected.</small>'
    },
    bookings: {
      kicker: "Your journeys",
      title: "My Bookings",
      copy: "Your saved journeys will appear here once booking persistence is connected. For now, this panel confirms that the quick action is ready for that workflow.",
      form: '<div class="quick-action-panel__empty"><span aria-hidden="true">▣</span><strong>No saved bookings yet</strong><span>Search for a train to start a journey.</span><button type="button" class="btn btn--primary" data-jump-booking>Search trains</button></div>'
    },
    help: {
      kicker: "Support desk",
      title: "How can we help?",
      copy: "Choose a topic below. These are intentionally lightweight entry points so the page stays useful without turning into a support portal.",
      form: '<div class="quick-action-panel__help-grid"><button type="button" data-help-topic="Booking">Booking help</button><button type="button" data-help-topic="Classes">Classes &amp; fares</button><button type="button" data-help-topic="Cancellation">Cancellation</button><button type="button" data-help-topic="Travel">Travel guidance</button></div><small id="quick-help-feedback">Select a topic to see a short tip.</small>'
    }
  };

  function openPanel(key, trigger) {
    var item = content[key];
    if (!item) return;
    lastTrigger = trigger || null;
    kicker.textContent = item.kicker;
    title.textContent = item.title;
    copy.textContent = item.copy;
    formHost.innerHTML = item.form;
    panel.hidden = false;
    document.body.classList.add("quick-action-open");
    requestAnimationFrame(function () { panel.classList.add("is-visible"); });
    var firstInput = formHost.querySelector("input");
    if (firstInput) firstInput.focus();
    else q(".quick-action-panel__close").focus();
  }

  function closePanel() {
    panel.classList.remove("is-visible");
    document.body.classList.remove("quick-action-open");
    window.setTimeout(function () { panel.hidden = true; }, 180);
    if (lastTrigger) lastTrigger.focus();
  }

  document.querySelectorAll("[data-quick-action]").forEach(function (button) {
    button.addEventListener("click", function () {
      openPanel(button.getAttribute("data-quick-action"), button);
    });
  });

  panel.addEventListener("click", function (event) {
    var close = event.target.closest("[data-quick-close]");
    if (close) { closePanel(); return; }

    var submit = event.target.closest("[data-demo-submit]");
    if (submit) {
      var input = formHost.querySelector("input");
      if (!input || !input.value.trim()) {
        if (input) { input.focus(); input.classList.add("is-invalid"); }
        return;
      }
      input.classList.remove("is-invalid");
      var message = submit.getAttribute("data-demo-submit") === "pnr"
        ? "PNR accepted for the demo. Live status can be connected here later."
        : "Train reference accepted for the demo. Live running data can be connected here later.";
      var small = formHost.querySelector("small");
      if (small) small.textContent = message;
      return;
    }

    var jump = event.target.closest("[data-jump-booking]");
    if (jump) {
      closePanel();
      var booking = document.getElementById("booking-widget");
      if (booking) booking.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    var topic = event.target.closest("[data-help-topic]");
    if (topic) {
      var feedback = el("quick-help-feedback");
      if (feedback) feedback.textContent = topic.getAttribute("data-help-topic") + ": a concise help article can be connected to this topic in the next iteration.";
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !panel.hidden) closePanel();
  });
})();

/* --------------------------------------------------------------------------
   Services + footer information interactions
   Kept isolated from booking/search/route-preview logic.
   -------------------------------------------------------------------------- */
(function () {
  "use strict";

  document.querySelectorAll("[data-scroll-target]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      var targetId = link.getAttribute("data-scroll-target");
      var target = document.getElementById(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", "#" + targetId);
    });
  });

  document.querySelectorAll("[data-service]").forEach(function (card) {
    card.addEventListener("click", function (event) {
      event.preventDefault();
      var feedback = document.getElementById("service-feedback");
      var name = card.getAttribute("data-service");
      if (feedback) feedback.textContent = name + " is available as a service entry point. Live booking integration can be connected here later.";
    });
  });

  var modal = document.getElementById("footer-info");
  var title = document.getElementById("footer-info-title");
  var kicker = document.getElementById("footer-info-kicker");
  var content = document.getElementById("footer-info-content");
  if (!modal || !title || !content) return;

  var footerContent = {
    help: {
      kicker: "Support desk",
      title: "Help Desk",
      html: '<div class="footer-info__grid"><article><strong>Booking &amp; PNR</strong><p>Find quick guidance for ticket searches, PNR status, train running status and common booking questions.</p></article><article><strong>Cancellation &amp; refunds</strong><p>For a live IRCTC booking, use the official eQuery support channel for ticket-related queries.</p></article><article><strong>Travel guidance</strong><p>Check your journey details, station code and boarding information before departure.</p></article></div><a class="footer-info__official" href="https://equery.irctc.co.in/" target="_blank" rel="noopener noreferrer">Open IRCTC eQuery ↗</a>'
    },
    contact: {
      kicker: "Customer support",
      title: "Contact Us",
      html: '<div class="footer-info__contact"><div><span>Customer Care</span><strong>14646</strong><small>Within India · 24×7</small></div><div><span>Outside India</span><strong>+91-80-44647999</strong><small>IRCTC customer support</small></div><div><span>E-ticket queries</span><strong>etickets@irctc.co.in</strong><small>Use your registered email for ticket-related requests.</small></div></div><a class="footer-info__official" href="https://contents.irctc.co.in/en/ContactUsEn.html" target="_blank" rel="noopener noreferrer">View official IRCTC contact information ↗</a>'
    },
    terms: {
      kicker: "Before you travel",
      title: "Terms & Conditions",
      html: '<div class="footer-info__terms"><p>This redesign is a frontend demonstration and does not process real bookings or payments.</p><ul><li>Train availability, fares and journey information shown by the demo should not be treated as live railway data unless explicitly connected to an official service.</li><li>Do not enter real payment credentials or sensitive information into this demonstration.</li><li>For actual ticketing, refunds, cancellations and railway rules, refer to the official IRCTC terms and conditions.</li></ul></div><a class="footer-info__official" href="https://contents.irctc.co.in/en/Terms%20and%20conditions.pdf" target="_blank" rel="noopener noreferrer">Read official IRCTC terms ↗</a>'
    }
  };

  var lastTrigger = null;
  function openFooterInfo(key, trigger) {
    var item = footerContent[key];
    if (!item) return;
    lastTrigger = trigger || null;
    kicker.textContent = item.kicker;
    title.textContent = item.title;
    content.innerHTML = item.html;
    modal.hidden = false;
    document.body.classList.add("footer-info-open");
    requestAnimationFrame(function () { modal.classList.add("is-visible"); });
    var close = modal.querySelector(".footer-info__close");
    if (close) close.focus();
  }

  function closeFooterInfo() {
    modal.classList.remove("is-visible");
    document.body.classList.remove("footer-info-open");
    window.setTimeout(function () { modal.hidden = true; }, 180);
    if (lastTrigger) lastTrigger.focus();
  }

  document.querySelectorAll("[data-footer-link]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      openFooterInfo(link.getAttribute("data-footer-link"), link);
    });
  });

  modal.addEventListener("click", function (event) {
    if (event.target.closest("[data-footer-close]")) closeFooterInfo();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.hidden) closeFooterInfo();
  });
})();
