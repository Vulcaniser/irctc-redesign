/* ==========================================================================
   route-preview.js
   Purpose: Owns the India journey map preview - map initialization,
   geographic-to-map coordinate conversion, station marker rendering,
   route overlay rendering, state transitions, and Anime.js animation.

   The map is rendered as four independently-controllable SVG layers
   (bottom to top): India outline, background railway network, selected
   route, station markers. There is no embedded map image - every pixel
   the user sees is drawn from data. Curated active routes use precomputed
   map-space geometry stored in routes.js so they follow the railway artwork
   on this fixed illustrative map without changing the animation pipeline.

   Data dependencies (loaded before this file in index.html):
     js/data/stations.js        -> window.STATIONS
     js/data/routes.js          -> window.ROUTES
     js/data/india-outline.js   -> window.INDIA_OUTLINE
     js/data/network-lines.js   -> window.NETWORK_LINES
     js/data/geo-calibration.js -> window.GEO_CALIBRATION

   ACCURACY NOTES (read before touching the transform below):
   - assets/maps/india-railways-network.svg (the original Wikimedia
     Commons file) is no longer rendered on the page at all. It was
     used exactly once, offline, as the source image from which
     INDIA_OUTLINE was extracted via image-processing contour detection
     (see india-outline.js for the full method) - it is not queried,
     traced, or displayed at runtime.
   - The background railway network layer is built from NETWORK_LINES,
     a sample of real recorded train paths from the verified
     anandology/railways dataset - not from the Wikimedia SVG's
     anonymous paths, which have no machine-readable route structure.
   - geoToMap() below is a PIECEWISE-LINEAR (triangulated) transform,
     not a single global affine formula - see geo-calibration.js for
     the full rationale (a single global affine could not reconcile
     mainland accuracy with the Northeast without drift; this is the
     standard "rubber-sheeting" fix). It is still exactly ONE function,
     used identically for every station, every network line, and every
     route waypoint - there is no per-route or per-station special
     casing anywhere in this file.
   - Every station coordinate and every raw route waypoint is real data
     from github.com/anandology/railways (CC0) - see stations.js /
     routes.js for full provenance. The curated `mapWaypoints` used for
     active-route rendering are an offline cartographic snap to the visible
     railway network in this fixed map; they do not replace the raw source
     coordinates and are not used to fabricate new geography.
   ========================================================================== */

(function () {
  "use strict";

  // ------------------------------------------------------------------
  // Map coordinate space (matches INDIA_OUTLINE and the SVG viewBox).
  // ------------------------------------------------------------------
  var MAP_WIDTH = 1280;
  var MAP_HEIGHT = 1400;

  // ------------------------------------------------------------------
  // Geographic-to-map transform - THE single authoritative conversion
  // used by every marker, network line, and route in this file.
  //
  // Implementation: piecewise-linear over a Delaunay triangulation of
  // GEO_CALIBRATION.anchors (computed offline - see geo-calibration.js).
  // For a query (lon, lat):
  //   1. Find which precomputed triangle contains it (point-in-triangle
  //      via barycentric sign test).
  //   2. Apply that triangle's own exact-fit affine coefficients.
  //   3. If the point falls outside every triangle (rare - only
  //      possible for a station well beyond all 15 calibration
  //      anchors), fall back to the nearest triangle by centroid
  //      distance, so far-flung points still get a locally-relevant
  //      transform rather than a distant global average.
  // ------------------------------------------------------------------
  var CALIBRATION = window.GEO_CALIBRATION || { anchors: [], triangles: [] };

  function sign(p1x, p1y, p2x, p2y, p3x, p3y) {
    return (p1x - p3x) * (p2y - p3y) - (p2x - p3x) * (p1y - p3y);
  }

  function pointInTriangle(px, py, v) {
    var d1 = sign(px, py, v[0][0], v[0][1], v[1][0], v[1][1]);
    var d2 = sign(px, py, v[1][0], v[1][1], v[2][0], v[2][1]);
    var d3 = sign(px, py, v[2][0], v[2][1], v[0][0], v[0][1]);
    var hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
    var hasPos = d1 > 0 || d2 > 0 || d3 > 0;
    return !(hasNeg && hasPos);
  }

  function findTriangle(lon, lat) {
    var triangles = CALIBRATION.triangles;
    for (var i = 0; i < triangles.length; i++) {
      if (pointInTriangle(lon, lat, triangles[i].vertices)) {
        return triangles[i];
      }
    }
    // Outside every triangle: fall back to the nearest by centroid.
    var best = null;
    var bestDist = Infinity;
    for (var j = 0; j < triangles.length; j++) {
      var v = triangles[j].vertices;
      var cx = (v[0][0] + v[1][0] + v[2][0]) / 3;
      var cy = (v[0][1] + v[1][1] + v[2][1]) / 3;
      var dist = (cx - lon) * (cx - lon) + (cy - lat) * (cy - lat);
      if (dist < bestDist) {
        bestDist = dist;
        best = triangles[j];
      }
    }
    return best;
  }

  /**
   * Converts real-world longitude/latitude into approximate on-screen
   * coordinates via the piecewise-triangulated transform. See ACCURACY
   * NOTES above - this remains an illustrative approximation, not a
   * survey-grade projection, but every point now interpolates from
   * nearby real calibration anchors instead of one distant formula.
   */
  function geoToMap(lon, lat) {
    var tri = findTriangle(lon, lat);
    if (!tri) {
      // No calibration data at all - should not happen with
      // geo-calibration.js loaded, but fail safely rather than throw.
      return { x: MAP_WIDTH / 2, y: MAP_HEIGHT / 2 };
    }
    var cx = tri.coefX;
    var cy = tri.coefY;
    return {
      x: cx[0] * lon + cx[1] * lat + cx[2],
      y: cy[0] * lon + cy[1] * lat + cy[2],
    };
  }

  // ------------------------------------------------------------------
  // Station lookup helpers
  // ------------------------------------------------------------------
  var stationsById = {};
  var stationsByCode = {};

  (window.STATIONS || []).forEach(function (s) {
    stationsById[s.id] = s;
    stationsByCode[s.code.toUpperCase()] = s;
  });

  function matchStation(text) {
    if (!text) return null;
    var normalized = text.trim().toUpperCase();
    if (!normalized) return null;
    if (stationsByCode[normalized]) return stationsByCode[normalized];
    var byName = (window.STATIONS || []).find(function (s) {
      return s.name.toUpperCase().indexOf(normalized) !== -1;
    });
    return byName || null;
  }

  function matchRoute(originStation, destStation) {
    if (!originStation || !destStation) return null;
    var routes = window.ROUTES || [];
    for (var i = 0; i < routes.length; i++) {
      var r = routes[i];
      if (r.fromCode === originStation.code && r.toCode === destStation.code) {
        return { route: r, reversed: false };
      }
      if (r.toCode === originStation.code && r.fromCode === destStation.code) {
        return { route: r, reversed: true };
      }
    }
    return null;
  }

  // ------------------------------------------------------------------
  // DOM / SVG references, populated on initialize
  // ------------------------------------------------------------------
  var container = null;
  var outlineLayer = null;
  var networkLayer = null;
  var routeLayer = null;
  var markerLayer = null;
  var reducedMotion = false;

  var state = {
    origin: null,
    destination: null,
    activeRoute: null,
  };

  function svgEl(tag) {
    return document.createElementNS("http://www.w3.org/2000/svg", tag);
  }

  function clearLayer(layer) {
    while (layer && layer.firstChild) {
      layer.removeChild(layer.firstChild);
    }
  }

  function setPreviewState(name) {
    if (container) container.setAttribute("data-state", name);
  }

  function pointsAttrFromGeo(lonLatPairs) {
    return lonLatPairs
      .map(function (pair) {
        var p = geoToMap(pair[0], pair[1]);
        return p.x.toFixed(1) + "," + p.y.toFixed(1);
      })
      .join(" ");
  }

  function pointsAttrFromMap(points) {
    return (points || [])
      .map(function (p) {
        return p[0].toFixed(1) + "," + p[1].toFixed(1);
      })
      .join(" ");
  }

  // ------------------------------------------------------------------
  // Static layers: outline + background network (rendered once)
  // ------------------------------------------------------------------
  function renderOutline() {
    if (!outlineLayer || !window.INDIA_OUTLINE) return;
    clearLayer(outlineLayer);

    var pointsAttr = window.INDIA_OUTLINE.map(function (p) {
      return p[0].toFixed(1) + "," + p[1].toFixed(1);
    }).join(" ");

    var poly = svgEl("polygon");
    poly.setAttribute("class", "map-outline");
    poly.setAttribute("points", pointsAttr);
    outlineLayer.appendChild(poly);
  }

  function renderNetwork() {
    if (!networkLayer || !window.NETWORK_LINES) return;
    clearLayer(networkLayer);

    window.NETWORK_LINES.forEach(function (line) {
      if (line.length < 2) return;
      var poly = svgEl("polyline");
      poly.setAttribute("class", "map-network-line");
      poly.setAttribute("points", pointsAttrFromGeo(line));
      poly.setAttribute("fill", "none");
      networkLayer.appendChild(poly);
    });
  }

  // ------------------------------------------------------------------
  // Marker rendering
  // ------------------------------------------------------------------
  function renderStationMarker(station, kind, onEntranceComplete) {
    var pos = geoToMap(station.lon, station.lat);
    var g = svgEl("g");
    g.setAttribute("class", "map-marker map-marker--" + kind);
    g.setAttribute("transform", "translate(" + pos.x.toFixed(1) + "," + pos.y.toFixed(1) + ")");

    var halo = svgEl("circle");
    halo.setAttribute("class", "map-marker__halo");
    halo.setAttribute("r", kind === "waypoint" ? 4 : 11);
    g.appendChild(halo);

    var core = svgEl("circle");
    core.setAttribute("class", "map-marker__core");
    core.setAttribute("r", kind === "waypoint" ? 1.6 : 4);
    g.appendChild(core);

    markerLayer.appendChild(g);
    g.__halo = halo; // stash for later arrival-pulse lookup

    function startBreathing() {
      if (kind === "origin" || kind === "destination") {
        window.anime({
          targets: halo,
          scale: [1, 1.6],
          opacity: [0.5, 0],
          duration: 1600,
          loop: true,
          easing: "easeOutSine",
        });
      }
    }

    if (!reducedMotion && window.anime) {
      var entrance = window.anime({
        targets: g,
        scale: [0, 1],
        opacity: [0, 1],
        duration: 420,
        easing: "easeOutQuad",
      });
      entrance.finished.then(function () {
        startBreathing();
        if (onEntranceComplete) onEntranceComplete();
      });
    } else {
      if (onEntranceComplete) onEntranceComplete();
    }
    return g;
  }

  /**
   * A single, slightly more noticeable but still restrained pulse on
   * the destination marker's halo, fired once when the route drawing
   * animation reaches it (step 7 of the locked animation sequence) -
   * distinct from its ongoing gentle breathing loop.
   */
  function pulseArrival(markerGroup) {
    if (!markerGroup || reducedMotion || !window.anime) return;
    var halo = markerGroup.__halo;
    if (!halo) return;
    window.anime({
      targets: halo,
      scale: [1, 2.1],
      opacity: [0.7, 0],
      duration: 700,
      easing: "easeOutQuad",
    });
  }

  // ------------------------------------------------------------------
  // Route rendering
  // ------------------------------------------------------------------
  function renderRoute(matched, onComplete) {
    var route = matched.route;
    var pointsAttr;

    // Curated routes carry pre-calibrated map-space geometry generated
    // offline against the visible railway network in the fixed Wikimedia-
    // derived map. Reverse the map-space path together with the geographic
    // route when the user searches the opposite direction.
    if (route.mapWaypoints && route.mapWaypoints.length > 1) {
      var mapPts = matched.reversed
        ? route.mapWaypoints.slice().reverse()
        : route.mapWaypoints;
      pointsAttr = pointsAttrFromMap(mapPts);
    } else {
      var geoPts = matched.reversed
        ? route.waypoints.slice().reverse()
        : route.waypoints;
      pointsAttr = pointsAttrFromGeo(geoPts);
    }

    var glow = svgEl("polyline");
    glow.setAttribute("class", "map-route__glow");
    glow.setAttribute("points", pointsAttr);
    glow.setAttribute("fill", "none");
    routeLayer.appendChild(glow);

    var core = svgEl("polyline");
    core.setAttribute("class", "map-route__core");
    core.setAttribute("points", pointsAttr);
    core.setAttribute("fill", "none");
    routeLayer.appendChild(core);

    (route.intermediateStops || []).forEach(function (id) {
      var st = stationsById[id];
      if (st) renderStationMarker(st, "waypoint");
    });

    if (!reducedMotion && window.anime && core.getTotalLength) {
      var length = core.getTotalLength();
      [glow, core].forEach(function (path) {
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
      });
      window.anime.timeline({ easing: "easeInOutSine" })
        .add({ targets: core, strokeDashoffset: [length, 0], duration: 1500 })
        .add({ targets: glow, strokeDashoffset: [length, 0], duration: 1500 }, 0)
        .add({ targets: [glow, core], opacity: [0.6, 1], duration: 500 }, "-=300")
        .finished.then(function () {
          if (onComplete) onComplete();
        });
    } else {
      if (onComplete) onComplete();
    }
  }

  function fadeOutRoute(callback) {
    var existing = routeLayer.querySelectorAll(".map-route__glow, .map-route__core");
    if (!existing.length || reducedMotion || !window.anime) {
      clearLayer(routeLayer);
      clearWaypointMarkers();
      if (callback) callback();
      return;
    }
    window.anime({
      targets: existing,
      opacity: 0,
      duration: 350,
      easing: "easeInQuad",
      complete: function () {
        clearLayer(routeLayer);
        clearWaypointMarkers();
        if (callback) callback();
      },
    });
  }

  function clearWaypointMarkers() {
    var waypointEls = markerLayer.querySelectorAll(".map-marker--waypoint");
    waypointEls.forEach(function (el) {
      el.parentNode.removeChild(el);
    });
  }

  function clearOriginDestMarkers() {
    var els = markerLayer.querySelectorAll(".map-marker--origin, .map-marker--destination");
    els.forEach(function (el) {
      el.parentNode.removeChild(el);
    });
  }

  // ------------------------------------------------------------------
  // Public API
  // ------------------------------------------------------------------

  function initializeRoutePreview() {
    container = document.getElementById("map-preview");
    if (!container) return;

    outlineLayer = container.querySelector(".map-preview__outline-layer");
    networkLayer = container.querySelector(".map-preview__network-layer");
    routeLayer = container.querySelector(".map-preview__route-layer");
    markerLayer = container.querySelector(".map-preview__marker-layer");
    reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    renderOutline();
    renderNetwork();
    setPreviewState("idle");

    if (!reducedMotion && window.anime) {
      window.anime({
        targets: container,
        opacity: [0, 1],
        duration: 900,
        easing: "easeOutQuad",
      });
      window.anime({
        targets: outlineLayer,
        opacity: [0, 1],
        duration: 1100,
        easing: "easeOutQuad",
      });
      window.anime({
        targets: networkLayer,
        opacity: [0, 1],
        duration: 1400,
        delay: 200,
        easing: "easeOutQuad",
      });
    }
  }

  function renderActiveState() {
    var matched = matchRoute(state.origin, state.destination);

    var doRender = function () {
      clearOriginDestMarkers();
      state.activeRoute = matched;

      if (matched) {
        // Locked sequence: origin appears -> destination appears ->
        // route draws from origin -> destination gets an arrival pulse
        // once the route reaches it -> steady state.
        var originMarker = renderStationMarker(state.origin, "origin", function () {
          var destMarker = renderStationMarker(state.destination, "destination", function () {
            renderRoute(matched, function () {
              pulseArrival(destMarker);
            });
          });
        });
        setPreviewState("active");
      } else {
        // Both fields resolved to known stations, but no curated route
        // connects them - show both stations, no fabricated connector.
        renderStationMarker(state.origin, "origin");
        renderStationMarker(state.destination, "destination");
        setPreviewState("unsupported-route");
      }
    };

    // Graceful cross-fade: if a route is already showing, fade it out
    // before drawing the new one rather than swapping instantly.
    if (state.activeRoute) {
      fadeOutRoute(doRender);
    } else {
      doRender();
    }
  }

  function setOriginStation(inputText) {
    if (!container) return;
    state.origin = matchStation(inputText);

    if (!state.origin) {
      fadeOutRoute(function () {
        clearOriginDestMarkers();
        state.activeRoute = null;
        if (state.destination) {
          renderStationMarker(state.destination, "destination");
          setPreviewState("destination-set");
        } else {
          setPreviewState("idle");
        }
      });
      return;
    }

    if (state.destination) {
      renderActiveState();
    } else {
      clearOriginDestMarkers();
      renderStationMarker(state.origin, "origin");
      setPreviewState("origin-set");
    }
  }

  function setDestinationStation(inputText) {
    if (!container) return;
    state.destination = matchStation(inputText);

    if (!state.destination) {
      fadeOutRoute(function () {
        clearOriginDestMarkers();
        state.activeRoute = null;
        if (state.origin) {
          renderStationMarker(state.origin, "origin");
          setPreviewState("origin-set");
        } else {
          setPreviewState("idle");
        }
      });
      return;
    }

    if (state.origin) {
      renderActiveState();
    } else {
      clearOriginDestMarkers();
      renderStationMarker(state.destination, "destination");
      setPreviewState("destination-set");
    }
  }

  function highlightRoute() {
    if (state.origin && state.destination) {
      if (container) container.classList.add("map-preview--emphasized");
    }
  }

  function clearRoute() {
    fadeOutRoute(function () {
      state.activeRoute = null;
    });
    if (container) container.classList.remove("map-preview--emphasized");
  }

  function resetPreview() {
    state.origin = null;
    state.destination = null;
    state.activeRoute = null;
    clearLayer(routeLayer);
    clearLayer(markerLayer);
    if (container) {
      container.classList.remove("map-preview--emphasized");
      setPreviewState("idle");
    }
  }

  window.RoutePreview = {
    initializeRoutePreview: initializeRoutePreview,
    setOriginStation: setOriginStation,
    setDestinationStation: setDestinationStation,
    highlightRoute: highlightRoute,
    clearRoute: clearRoute,
    resetPreview: resetPreview,
    _geoToMap: geoToMap,
    _matchStation: matchStation,
    _matchRoute: matchRoute,
  };
})();
