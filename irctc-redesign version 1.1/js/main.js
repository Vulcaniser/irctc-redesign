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
