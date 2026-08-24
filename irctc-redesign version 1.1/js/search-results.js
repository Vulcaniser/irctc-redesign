/* ==========================================================================
   search-results.js
   Purpose: Search and render the researched train timetable cards.

   Scope boundary:
   - This file owns ONLY the Available Trains section.
   - It does not touch the map, route-preview, calibration, Anime.js route
     animation, or any styling file.
   - Results appear only after the booking form is submitted.
   ========================================================================== */

(function () {
  "use strict";

  var section = document.querySelector(".search-results");
  var list = document.querySelector(".search-results__list");
  var title = document.querySelector(".search-results__title");
  var filters = document.querySelector(".search-results__filters");

  function normalize(value) {
    return String(value || "").trim().replace(/\s+/g, " ").toUpperCase();
  }

  var CITY_TO_CODE = {
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
    BANGALORE: "SBC"
  };

  function resolveCode(value) {
    var normalized = normalize(value);
    if (!normalized) return null;

    if (CITY_TO_CODE[normalized]) return CITY_TO_CODE[normalized];

    if (window.STATIONS) {
      var station = window.STATIONS.find(function (item) {
        return normalize(item.code) === normalized ||
          normalize(item.name) === normalized;
      });
      if (station) return station.code.toUpperCase();
    }

    return null;
  }

  function escapeHTML(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function selectedClassLabel(classCode) {
    var labels = {
      "1A": "AC First Class",
      "2A": "AC 2 Tier",
      "3A": "AC 3 Tier",
      "3E": "AC 3 Economy",
      "CC": "Chair Car",
      "EC": "Executive Chair Car",
      "SL": "Sleeper",
      "2S": "Second Sitting"
    };
    return labels[classCode] || classCode;
  }

  function createRouteSummary(from, to, date, travelClass, passengers) {
    var dateLabel = date
      ? new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric"
        })
      : "Flexible date";

    return (
      '<div class="search-results__route-summary">' +
        '<strong>' + escapeHTML(from) + '</strong>' +
        '<span aria-hidden="true">→</span>' +
        '<strong>' + escapeHTML(to) + '</strong>' +
        '<span class="search-results__meta">' +
          escapeHTML(dateLabel) + " · " +
          escapeHTML(travelClass ? selectedClassLabel(travelClass.toUpperCase()) : "All classes") +
          " · " + escapeHTML(passengers) + (passengers === 1 ? " passenger" : " passengers") +
        '</span>' +
      '</div>'
    );
  }

  function renderFilterSummary(travelClass, passengers) {
    if (!filters) return;

    filters.innerHTML =
      '<div class="search-results__filter-summary">' +
        '<strong>Journey preferences</strong>' +
        '<span>' + escapeHTML(
          travelClass ? selectedClassLabel(travelClass.toUpperCase()) : "All classes"
        ) + '</span>' +
        '<span>' + escapeHTML(passengers) +
          (passengers === 1 ? " passenger" : " passengers") + '</span>' +
        '<small>Seat counts are not live in this frontend snapshot.</small>' +
      '</div>';
  }

  function renderCard(train, passengerCount, selectedClass) {
    var classes = Array.isArray(train.classes) ? train.classes : [];
    var displayedClasses = selectedClass
      ? classes.filter(function (c) {
          return c.toUpperCase() === selectedClass.toUpperCase();
        })
      : classes;

    var classMarkup = displayedClasses.length
      ? displayedClasses.map(function (classCode) {
          return (
            '<div class="train-card__class-option">' +
              '<span class="train-card__class-name">' +
                escapeHTML(classCode) +
              '</span>' +
              '<span class="train-card__fare">Class offered</span>' +
              '<span class="train-card__availability">' +
                escapeHTML(selectedClassLabel(classCode)) +
              '</span>' +
            '</div>'
          );
        }).join("")
      : (
          '<div class="train-card__class-option">' +
            '<span class="train-card__class-name">Class unavailable</span>' +
            '<span class="train-card__availability">Not listed for this service</span>' +
          '</div>'
        );

    return (
      '<article class="train-card">' +
        '<div class="train-card__header">' +
          '<h3 class="train-card__name">' + escapeHTML(train.name) + '</h3>' +
          '<span class="train-card__number">Train ' + escapeHTML(train.number) + '</span>' +
        '</div>' +

        '<div class="train-card__route">' +
          '<div class="train-card__stop">' +
            '<span class="train-card__time">' + escapeHTML(train.fromTime) + '</span>' +
            '<span class="train-card__station">' +
              escapeHTML(train.fromName) + ' · ' + escapeHTML(train.fromCode) +
            '</span>' +
          '</div>' +

          '<div class="train-card__duration">' +
            '<span>' + escapeHTML(train.duration) + '</span>' +
            '<small>' + escapeHTML(train.days.join(" · ")) + '</small>' +
          '</div>' +

          '<div class="train-card__stop">' +
            '<span class="train-card__time">' + escapeHTML(train.toTime) + '</span>' +
            '<span class="train-card__station">' +
              escapeHTML(train.toName) + ' · ' + escapeHTML(train.toCode) +
            '</span>' +
          '</div>' +
        '</div>' +

        '<div class="train-card__classes">' + classMarkup + '</div>' +

        '<div class="train-card__actions">' +
          '<span class="train-card__availability">' +
            escapeHTML(passengerCount) +
            (passengerCount === 1 ? " passenger" : " passengers") +
            ' · Timetable snapshot' +
          '</span>' +
          '<button type="button" class="btn btn--primary" disabled aria-disabled="true">' +
            'Booking integration' +
          '</button>' +
        '</div>' +
      '</article>'
    );
  }

  function renderNoResults(fromCode, toCode) {
    list.innerHTML =
      '<div class="train-card">' +
        '<div class="train-card__header">' +
          '<h3 class="train-card__name">No curated timetable loaded</h3>' +
          '<span class="train-card__number">' +
            escapeHTML(fromCode) + ' → ' + escapeHTML(toCode) +
          '</span>' +
        '</div>' +
        '<p class="train-card__availability">' +
          'This city pair is part of the map-preview network, but a timetable ' +
          'snapshot has not been added to the frontend data file yet. ' +
          'No train information has been fabricated.' +
        '</p>' +
      '</div>';
  }

  function render(options) {
    if (!section || !list) return;

    var fromCode = resolveCode(options.from);
    var toCode = resolveCode(options.to);

    if (!fromCode || !toCode || fromCode === toCode) {
      return;
    }

    var key = fromCode + "-" + toCode;
    var data = window.TRAIN_DATA && window.TRAIN_DATA[key];
    var selectedClass = options.travelClass || "";
    var passengers = Number(options.passengers) || 1;

    section.hidden = false;

    if (title) {
      title.textContent = "Available Trains";
    }

    var header = section.querySelector(".search-results__header");
    if (header) {
      var oldSummary = header.querySelector(".search-results__route-summary");
      if (oldSummary) oldSummary.remove();
      header.insertAdjacentHTML(
        "beforeend",
        createRouteSummary(
          options.from,
          options.to,
          options.date,
          selectedClass,
          passengers
        )
      );
    }

    renderFilterSummary(selectedClass, passengers);

    if (!data || !data.length) {
      renderNoResults(fromCode, toCode);
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    var filtered = selectedClass
      ? data.filter(function (train) {
          return train.classes.some(function (classCode) {
            return classCode.toUpperCase() === selectedClass.toUpperCase();
          });
        })
      : data;

    // Hard cap: never render more than five cards.
    filtered = filtered.slice(0, 5);

    if (!filtered.length) {
      list.innerHTML =
        '<div class="train-card">' +
          '<h3 class="train-card__name">No trains match the selected class</h3>' +
          '<p class="train-card__availability">' +
            'Try All Classes or another class for this route.' +
          '</p>' +
        '</div>';
    } else {
      list.innerHTML = filtered.map(function (train) {
        return renderCard(train, passengers, selectedClass);
      }).join("");
    }

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function hide() {
    if (!section) return;
    section.hidden = true;
    if (list) list.innerHTML = "";
  }

  window.SearchResults = {
    render: render,
    hide: hide,
    resolveCode: resolveCode
  };
})();
