/* ==========================================================================
   booking-form.js
   Purpose: Logic specific to the booking widget - from/to station
   autocomplete, swap button behavior, date validation, passenger
   count controls, and form submission handling.

   Map integration: this file is responsible only for reading the
   from/to inputs and telling route-preview.js what the user typed.
   It does not know how the map renders stations or routes - all of
   that lives in route-preview.js (see js/route-preview.js).

   IMPORTANT ROUTE-PREVIEW BUG FIX:
   The route preview must NOT be fed every partial substring while a user
   types. route-preview.js historically used substring matching, which meant
   a first character such as "M" could resolve to AHMEDABAD, "C" could resolve
   to MUMBAI CENTRAL, and "J"/"N" could also resolve to AHMEDABAD. That caused
   a valid route to be drawn for an intermediate keystroke and then another
   route to be drawn on top of it.

   This file therefore gates preview updates at the input boundary:
   - only a complete, unambiguous station/city value is sent to RoutePreview;
   - partial text is ignored while typing;
   - clearing an input is still forwarded so the preview can reset;
   - geographic calibration, route geometry, and route-preview rendering are
     untouched.
   ========================================================================== */

(function () {
  "use strict";

  var fromInput = document.getElementById("from-station");
  var toInput = document.getElementById("to-station");
  var swapBtn = document.querySelector(".swap-btn");
  var form = document.querySelector(".booking-form");

  /*
   * These are INPUT ALIASES, not geographic data.
   * They map the city names a user naturally types to the already-existing
   * calibrated endpoint station records in STATIONS.
   *
   * No coordinates, route geometry, or calibration values are changed here.
   */
  var CITY_ALIASES = {
    GUWAHATI: "GHY",
    DELHI: "NDLS",
    "NEW DELHI": "NDLS",
    JAIPUR: "JP",
    LUCKNOW: "LKO",
    NAGPUR: "NGP",
    AHMEDABAD: "ADI",
    MUMBAI: "BCT",
    CHENNAI: "MAS",
    KOLKATA: "HWH",
    HOWRAH: "HWH",
    BENGALURU: "SBC",
    BANGALORE: "SBC",
  };

  function normalize(value) {
    return String(value || "")
      .trim()
      .replace(/\s+/g, " ")
      .toUpperCase();
  }

  function resolveCompleteStation(value) {
    var normalized = normalize(value);
    if (!normalized || !window.STATIONS) return null;

    /* Exact station code. */
    var byCode = window.STATIONS.find(function (station) {
      return station.code.toUpperCase() === normalized;
    });
    if (byCode) return byCode;

    /* Exact full station name. */
    var byName = window.STATIONS.find(function (station) {
      return normalize(station.name) === normalized;
    });
    if (byName) return byName;

    /* Natural city-name aliases for the calibrated endpoint stations. */
    var aliasCode = CITY_ALIASES[normalized];
    if (aliasCode) {
      return window.STATIONS.find(function (station) {
        return station.code.toUpperCase() === aliasCode;
      }) || null;
    }

    return null;
  }

  /*
   * Only send a value to RoutePreview when it is complete.
   *
   * This is deliberately different from route-preview.js's internal
   * substring matcher. We do NOT change that matcher or the preview system;
   * we simply stop partial keystrokes from reaching it.
   */
  function notifyOrigin() {
    if (!window.RoutePreview || !fromInput) return;

    if (fromInput.value.trim() === "") {
      window.RoutePreview.setOriginStation("");
      return;
    }

    if (resolveCompleteStation(fromInput.value)) {
      window.RoutePreview.setOriginStation(fromInput.value);
    }
    /* Partial/unrecognized input: leave the current preview untouched. */
  }

  function notifyDestination() {
    if (!window.RoutePreview || !toInput) return;

    if (toInput.value.trim() === "") {
      window.RoutePreview.setDestinationStation("");
      return;
    }

    if (resolveCompleteStation(toInput.value)) {
      window.RoutePreview.setDestinationStation(toInput.value);
    }
    /* Partial/unrecognized input: leave the current preview untouched. */
  }

  if (fromInput) {
    fromInput.addEventListener("input", notifyOrigin);
  }

  if (toInput) {
    toInput.addEventListener("input", notifyDestination);
  }

  // Swapping the two fields should swap the map's origin/destination too,
  // not just the text values.
  if (swapBtn && fromInput && toInput) {
    swapBtn.addEventListener("click", function () {
      var temp = fromInput.value;
      fromInput.value = toInput.value;
      toInput.value = temp;
      notifyOrigin();
      notifyDestination();
    });
  }

  // Search results are rendered only after the user explicitly submits
  // the booking form. This does not alter the route-preview system.
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (window.RoutePreview) {
        window.RoutePreview.highlightRoute();
      }

      if (window.SearchResults) {
        window.SearchResults.render({
          from: fromInput ? fromInput.value : "",
          to: toInput ? toInput.value : "",
          date: document.getElementById("journey-date")
            ? document.getElementById("journey-date").value
            : "",
          travelClass: document.getElementById("travel-class")
            ? document.getElementById("travel-class").value
            : "",
          passengers: document.getElementById("passenger-count")
            ? Number(document.getElementById("passenger-count").value) || 1
            : 1
        });
      }
    });
  }
})();
