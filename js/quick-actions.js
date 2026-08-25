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
      copy: "Enter your demo PNR or booking reference to continue. This demo keeps the interaction local and does not send your details anywhere.",
      form: '<label for="quick-pnr">PNR number</label><div class="quick-action-panel__row"><input id="quick-pnr" inputmode="numeric" maxlength="24" placeholder="Demo PNR or booking ID"><button type="button" class="btn btn--primary" data-demo-submit="pnr">Check</button></div><small>Demo interaction — live railway services are not connected.</small>'
    },
    status: {
      kicker: "Journey utility",
      title: "Track a Train",
      copy: "Enter a train number, train name, booking ID or PNR. A completed demo booking can show its saved journey tracking state.",
      form: '<label for="quick-train">Train number, name, booking ID or PNR</label><div class="quick-action-panel__row"><input id="quick-train" placeholder="e.g. 12951, BK-..., or DEMO..."><button type="button" class="btn btn--primary" data-demo-submit="status">Track</button></div><small>Demo tracker — live railway running data is not connected.</small>'
    },
    bookings: {
      kicker: "Your journeys",
      title: "My Bookings",
      copy: "Completed mock bookings are saved locally on this browser so you can revisit their journey details.",
      form: '<div class="quick-action-panel__empty"><span aria-hidden="true">▣</span><strong>Loading your saved journeys...</strong></div>'
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
    if (key === 'bookings') renderMyBookings();
    panel.hidden = false;
    document.body.classList.add("quick-action-open");
    requestAnimationFrame(function () { panel.classList.add("is-visible"); });
    var firstInput = formHost.querySelector("input");
    if (firstInput) firstInput.focus();
    else q(".quick-action-panel__close").focus();
  }


  function money(value) {
    return '₹'+Number(value||0).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2});
  }
  function renderMyBookings(){
    var records=window.BookingUtils&&window.BookingUtils.listBookings?window.BookingUtils.listBookings():[];
    if(!records.length){
      formHost.innerHTML='<div class="quick-action-panel__empty"><span aria-hidden="true">▣</span><strong>No saved bookings yet</strong><span>Complete a mock booking and it will appear here.</span><button type="button" class="btn btn--primary" data-jump-booking>Search trains</button></div>';
      return;
    }
    formHost.innerHTML='<div class="quick-bookings-list">'+records.map(function(r){
      var t=r.train||{};
      return '<article class="quick-booking-item"><div><strong>'+window.BookingUtils.esc(t.name||'Train')+'</strong><span>'+window.BookingUtils.esc(t.number||'')+' · '+window.BookingUtils.esc(t.source||'')+' → '+window.BookingUtils.esc(t.destination||'')+'</span><small>PNR '+window.BookingUtils.esc(r.pnr)+' · Booking '+window.BookingUtils.esc(r.bookingId||'')+' · '+window.BookingUtils.esc(t.date||'')+'</small></div><div class="quick-booking-item__meta"><b>'+window.BookingUtils.esc(r.status||'SUCCESS')+'</b><strong>'+money(r.total)+'</strong></div></article>';
    }).join('')+'</div>';
  }
  function findTrackRecord(value){
    var U=window.BookingUtils;
    if(!U)return null;
    var exact=U.findBookingRef?U.findBookingRef(value):null;
    if(exact)return exact;
    var needle=String(value||'').trim().toUpperCase();
    return (U.listBookings?U.listBookings():[]).find(function(r){
      var t=r.train||{};
      return [t.number,t.name].some(function(v){return String(v||'').toUpperCase().indexOf(needle)>=0;});
    })||null;
  }
  function renderTrackResult(record, inputValue){
    var small=formHost.querySelector('small');
    if(!small)return;
    if(!record){
      small.textContent='No saved demo booking matches '+inputValue+'. Enter a train number/name, booking ID or PNR from a completed mock booking.';
      return;
    }
    var t=record.train||{};
    small.innerHTML='<strong>Demo journey found.</strong> '+window.BookingUtils.esc(t.name||'Train')+' · '+window.BookingUtils.esc(t.number||'')+'<br>'+window.BookingUtils.esc(t.source||'')+' → '+window.BookingUtils.esc(t.destination||'')+' · '+window.BookingUtils.dateLabel(t.date)+'<br><b>Journey status:</b> Scheduled · <b>Booking:</b> '+window.BookingUtils.esc(record.bookingId||record.pnr)+' · <b>PNR:</b> '+window.BookingUtils.esc(record.pnr)+'<br><b>Payment:</b> '+window.BookingUtils.esc(record.status||'SUCCESS')+' · <b>Fare:</b> '+money(record.total);
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
      if (submit.getAttribute("data-demo-submit") === "pnr") {
        var record = window.BookingUtils && window.BookingUtils.findBookingRef ? window.BookingUtils.findBookingRef(input.value) : null;
        var small = formHost.querySelector("small");
        if (record) {
          small.innerHTML = '<strong>Demo booking found.</strong> '+window.BookingUtils.esc(record.train.name)+' · '+window.BookingUtils.esc(record.train.number)+'<br>'+window.BookingUtils.esc(record.train.source)+' → '+window.BookingUtils.esc(record.train.destination)+' · '+window.BookingUtils.dateLabel(record.train.date)+' · '+record.passengers+' passenger'+(record.passengers===1?'':'s')+'<br>Status: <b>'+window.BookingUtils.esc(record.status)+'</b> · Total: <b>'+money(record.total)+'</b>';
        } else {
          small.textContent = 'No demo booking was found for that PNR or booking reference on this browser. Complete a mock booking first.';
        }
      } else {
        renderTrackResult(findTrackRecord(input.value), input.value.trim());
      }
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
