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
  var currentResults = [];
  var currentPage = 1;
  var PAGE_SIZE = 5;
  var MAX_PAGES = 3;

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
      '<div class="search-results__route-summary" aria-label="Search details">' +
        '<span class="search-results__route-label">Journey</span>' +
        '<div class="search-results__route-line">' +
          '<strong>' + escapeHTML(from) + '</strong>' +
          '<span class="search-results__route-arrow" aria-hidden="true">→</span>' +
          '<strong>' + escapeHTML(to) + '</strong>' +
        '</div>' +
        '<span class="search-results__meta">' +
          '<span>' + escapeHTML(dateLabel) + '</span>' +
          '<span>' + escapeHTML(travelClass ? selectedClassLabel(travelClass.toUpperCase()) : "All classes") + '</span>' +
          '<span>' + escapeHTML(passengers) + (passengers === 1 ? " passenger" : " passengers") + '</span>' +
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

  function formatFare(train, classCode) {
    var code = String(classCode || "").toUpperCase();
    var fare = train && train.fares ? train.fares[code] : null;

    // Some curated route entries predate the route-level fare snapshot.
    // Use the exact same class fallback as the booking flow so the Available
    // Trains preview never disagrees with the Fare Summary later.
    if (fare == null && window.BookingUtils && window.BookingUtils.baseFare) {
      fare = window.BookingUtils.baseFare(train, code);
    }

    if (fare == null || !isFinite(Number(fare))) {
      return "Fare snapshot unavailable";
    }

    return "₹" + Number(fare).toLocaleString("en-IN");
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
              '<span class="train-card__fare">' +
                escapeHTML(formatFare(train, classCode)) +
              '</span>' +
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
            ' · ' +
            (selectedClass
              ? 'Requested ' + escapeHTML(selectedClass.toUpperCase()) +
                ' · ' + escapeHTML(selectedClassLabel(selectedClass.toUpperCase()))
              : 'Indicative fares shown · timetable snapshot') +
          '</span>' +
          '<button type="button" class="btn btn--primary train-card__book" data-train-index="' + currentResults.indexOf(train) + '"' +
            ((selectedClass && displayedClasses.length) || (!selectedClass && classes.length) ? '' : ' disabled aria-disabled="true"') + '>' +
            'Book Train' +
          '</button>' +
        '</div>' +
      '</article>'
    );
  }

  function renderPagination(totalPages) {
    if (!list || totalPages <= 1) return "";

    var markup =
      '<nav class="search-results__pagination" aria-label="Train result pages">' +
        '<button type="button" class="search-results__page search-results__page--arrow" data-page="' +
          Math.max(1, currentPage - 1) + '"' +
          (currentPage === 1 ? ' disabled aria-disabled="true"' : '') +
          ' aria-label="Previous page">‹</button>';

    for (var page = 1; page <= totalPages; page += 1) {
      markup +=
        '<button type="button" class="search-results__page' +
        (page === currentPage ? ' is-active' : '') +
        '" data-page="' + page + '"' +
        (page === currentPage ? ' aria-current="page"' : '') +
        '>' + page + '</button>';
    }

    markup +=
        '<button type="button" class="search-results__page search-results__page--arrow" data-page="' +
          Math.min(totalPages, currentPage + 1) + '"' +
          (currentPage === totalPages ? ' disabled aria-disabled="true"' : '') +
          ' aria-label="Next page">›</button>' +
      '</nav>';

    return markup;
  }

  function renderPage() {
    if (!list) return;

    var totalPages = Math.min(
      MAX_PAGES,
      Math.max(1, Math.ceil(currentResults.length / PAGE_SIZE))
    );

    currentPage = Math.min(currentPage, totalPages);

    var startIndex = (currentPage - 1) * PAGE_SIZE;
    var pageItems = currentResults.slice(startIndex, startIndex + PAGE_SIZE);

    list.innerHTML = pageItems.map(function (train) {
      return renderCard(train, window.__irctcPassengers || 1, window.__irctcSelectedClass || "");
    }).join("") + renderPagination(totalPages);

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

    currentResults = filtered.slice(0, PAGE_SIZE * MAX_PAGES);
    currentPage = 1;
    window.__irctcPassengers = passengers;
    window.__irctcSelectedClass = selectedClass;
    window.__irctcJourneyDate = options.date || '';
    window.__irctcFrom = options.from || '';
    window.__irctcTo = options.to || '';

    if (!currentResults.length) {
      list.innerHTML =
        '<div class="train-card">' +
          '<h3 class="train-card__name">No trains match the selected class</h3>' +
          '<p class="train-card__availability">' +
            'Try All Classes or another class for this route.' +
          '</p>' +
        '</div>';
    } else {
      renderPage();
    }

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (list) {
    list.addEventListener("click", function (event) {
      var bookButton = event.target.closest(".train-card__book");
      if (bookButton && !bookButton.disabled) {
        var index = Number(bookButton.getAttribute('data-train-index'));
        var train = currentResults[index];
        if (!train || !window.BookingUtils) return;
        var chosenClass = (window.__irctcSelectedClass || (train.classes && train.classes[0]) || 'SL').toUpperCase();
        var booking = window.BookingUtils.createBooking(train, {
          travelClass: chosenClass,
          passengers: window.__irctcPassengers || 1,
          date: window.__irctcJourneyDate || ''
        });
        window.BookingUtils.save(booking);
        window.location.href = 'booking.html';
        return;
      }
      var button = event.target.closest(".search-results__page");
      if (!button || button.disabled) return;

      var page = Number(button.getAttribute("data-page"));
      if (!page || page === currentPage) return;

      currentPage = page;
      renderPage();

      var top = section ? section.getBoundingClientRect().top + window.scrollY - 24 : 0;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  }

  function hide() {
    if (!section) return;
    section.hidden = true;
    if (list) list.innerHTML = "";
    currentResults = [];
    currentPage = 1;
  }

  window.SearchResults = {
    render: render,
    hide: hide,
    resolveCode: resolveCode
  };
})();
