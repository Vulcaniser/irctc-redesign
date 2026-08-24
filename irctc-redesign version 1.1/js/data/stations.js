/* ==========================================================================
   stations.js
   Purpose: Verified railway station data used by the India journey map
   preview (route-preview.js) and the booking form's origin/destination
   matching (booking-form.js).

   SOURCE: github.com/anandology/railways (fork of datameet/railways),
   stations.json - CC0 licensed. Compiled by Sanjay Bhangar & Sajjad Anwar.
   https://github.com/anandology/railways

   Every entry below is a real, verified station coordinate pulled directly
   from that dataset - none of these coordinates are invented or guessed.
   This list intentionally contains ONLY the stations required by the five
   curated routes in routes.js (endpoints + major named junctions used for
   intermediate markers) - not the full ~9,000-station dataset.
   ========================================================================== */

const STATIONS = [
  { id: "abr", code: "ABR", name: "ABU ROAD", lat: 24.470775, lon: 72.775695 },
  { id: "adi", code: "ADI", name: "AHMEDABAD JN", lat: 23.025515, lon: 72.601516 },
  { id: "aii", code: "AII", name: "AJMER JN", lat: 26.456612, lon: 74.637464 },
  { id: "ajj", code: "AJJ", name: "ARAKKONAM", lat: 13.081512, lon: 79.667991 },
  { id: "ald", code: "ALD", name: "ALLAHABAD JN", lat: 25.446241, lon: 81.828816 },
  { id: "bct", code: "BCT", name: "Mumbai Central", lat: 18.970667, lon: 72.819383 },
  { id: "brc", code: "BRC", name: "VADODARA JN", lat: 22.310756, lon: 73.181065 },
  { id: "bwt", code: "BWT", name: "BANGARAPET", lat: 12.984808, lon: 78.178188 },
  { id: "cnb", code: "CNB", name: "KANPUR CENTRAL", lat: 26.45424, lon: 80.350966 },
  { id: "dhn", code: "DHN", name: "DHANBAD JN", lat: 23.790966, lon: 86.428956 },
  { id: "gaya", code: "GAYA", name: "GAYA JN", lat: 24.803978, lon: 84.999294 },
  { id: "ghy", code: "GHY", name: "GUWAHATI", lat: 26.182635, lon: 91.751851 },
  { id: "hwh", code: "HWH", name: "HOWRAH JN", lat: 22.584078, lon: 88.340999 },
  { id: "jp", code: "JP", name: "JAIPUR", lat: 26.920203, lon: 75.786923 },
  { id: "jtj", code: "JTJ", name: "JOLARPETTAI", lat: 12.560852, lon: 78.57782 },
  { id: "kota", code: "KOTA", name: "KOTA JN", lat: 25.223553, lon: 75.8805 },
  { id: "kpd", code: "KPD", name: "KATPADI JN", lat: 12.972734, lon: 79.135341 },
  { id: "mas", code: "MAS", name: "CHENNAI CENTRAL", lat: 13.084761, lon: 80.274856 },
  { id: "mgs", code: "MGS", name: "MUGHAL SARAI JN", lat: 25.278149, lon: 83.11925 },
  { id: "msh", code: "MSH", name: "MAHESANA JN", lat: 23.602623, lon: 72.388708 },
  { id: "mtj", code: "MTJ", name: "MATHURA JN", lat: 27.480145, lon: 77.673117 },
  { id: "ndls", code: "NDLS", name: "NEW DELHI", lat: 28.642314, lon: 77.220004 },
  { id: "njp", code: "NJP", name: "NEW JALPAIGURI", lat: 26.683025, lon: 88.443391 },
  { id: "pnbe", code: "PNBE", name: "PATNA JN", lat: 25.60256, lon: 85.136824 },
  { id: "re", code: "RE", name: "REWARI", lat: 28.202779, lon: 76.609414 },
  { id: "rtm", code: "RTM", name: "RATLAM JN", lat: 23.34038, lon: 75.050826 },
  { id: "sbc", code: "SBC", name: "BANGALORE CITY JN", lat: 12.977595, lon: 77.568083 },
  // Additional city endpoints requested for the expanded corridor preview.
  // These are real railway-station coordinates; each route's mapOrigin /
  // mapDestination snaps the rendered endpoint to this map's calibrated city
  // anchor so the marker remains aligned with the fixed visual map.
  { id: "lko", code: "LKO", name: "LUCKNOW JN", lat: 26.830607, lon: 80.931934 },
  { id: "ngp", code: "NGP", name: "NAGPUR JN", lat: 21.152100, lon: 79.088500 },

];

// Exposed as a global for the other plain-script files (booking-form.js,
// route-preview.js) to consume, consistent with this project's existing
// no-build-step / no-module architecture.
window.STATIONS = STATIONS;
