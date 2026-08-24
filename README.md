# IRCTC Redesign

> **A modern, interactive railway journey experience inspired by IRCTC — built for the Fresher's Coding Club Competition.**

An experimental frontend redesign of the IRCTC railway booking experience, focused on making train discovery feel more visual, intuitive and engaging while retaining the identity and familiarity of the Indian railway ecosystem.

Instead of treating train search as a conventional form followed by a static list, this redesign turns the journey itself into the primary visual interaction.

---

## ✨ What Makes This Redesign Different?

Traditional railway booking interfaces tend to follow a straightforward pattern:

**Enter stations → Search → Read a list of trains**

This project explores a more immersive approach:

**Enter your journey → Watch the route come alive → Explore the available trains**

The centerpiece is an interactive India railway map that responds to the user's origin and destination.

When a journey is selected, the map:

* Identifies the origin and destination.
* Places a fluorescent green marker at the starting station.
* Places a fluorescent red marker at the destination.
* Draws the selected railway corridor progressively.
* Follows the route's calibrated waypoints.
* Uses a restrained fluorescent glow to distinguish the selected journey.
* Allows the route to settle into a subtle steady-state glow after the animation completes.

The intention is to make the first interaction feel like a **journey visualization**, rather than simply another form submission.

---

# 🎨 Design Direction

The interface deliberately moves away from the conventional bright railway-booking aesthetic and explores a **modern dark "midnight rail" visual language**.

### Visual principles

* Deep midnight backgrounds
* Muted blue railway/map layers
* Warm amber/orange IRCTC accents
* Restrained fluorescent route highlights
* Green/red endpoint markers
* Soft ambient gradients
* Glassy/dark elevated surfaces
* Moderate corner rounding
* High-contrast typography
* Subtle borders rather than heavy containers

The design intentionally avoids becoming a generic SaaS dashboard.

The goal was to create something that feels like:

> **IRCTC × modern railway navigation interface**

while preserving recognizable IRCTC branding and terminology.

---

# 🗺️ Interactive India Railway Map

The route-preview system is one of the core technical features of the project.

The India map is **not simply pasted onto the page as a static image**.

The visual map is composed from multiple independently controlled SVG layers:

```text
India Outline
      ↓
Railway Network
      ↓
Selected Route
      ↓
Origin / Destination Markers
```

This allows the application to independently control:

* India's outline
* Background railway network
* Selected journey
* Station markers
* Route glow
* Animation state

### Map states

The map supports multiple visual states including:

* `idle`
* `origin-set`
* `destination-set`
* `active`
* `unsupported-route`

This allows the map to remain visually subtle when no journey has been selected and become progressively more expressive as the user enters their journey.

---

# 🚆 Route Visualization

The route system uses curated railway journey data rather than drawing arbitrary straight lines between cities.

Each route can contain:

* Origin station
* Destination station
* Train/service identity
* Distance
* Duration
* Intermediate stations
* Geographic waypoints
* Calibrated map-space waypoints

The project currently contains **45 curated route definitions** for the map visualization.

The raw geographic coordinates are retained separately from the calibrated map-space representation.

This distinction was important because the Wikimedia railway artwork is an illustrative map rather than a mathematically perfect geographic projection.

Therefore, the system separates:

```text
Real geographic data
        +
Map-specific calibration
        ↓
Accurate visual placement on this particular map
```

This prevents the underlying geographic data from being altered simply to compensate for visual distortion in the artwork.

---

# 🌐 Northeast / Siliguri Corridor Calibration

One of the most important calibration cases in the project was the **Guwahati → New Delhi** journey.

The route was specifically calibrated so that the Northeast section follows the real railway corridor through the **Siliguri Corridor**, rather than visually cutting through Sikkim/Nepal due to projection differences.

The Guwahati → New Delhi route therefore became the reference case for validating the map-space calibration approach.

The same calibrated rendering architecture is then reusable for additional journeys.

---

# 💡 Route Animation

The route animation is powered by **Anime.js**.

The animation sequence is intentionally cinematic but restrained:

```text
1. Origin marker appears
          ↓
2. Destination marker appears
          ↓
3. Route begins drawing
          ↓
4. Route progressively follows its waypoints
          ↓
5. Route glow follows the drawing
          ↓
6. Route reaches destination
          ↓
7. Destination gives an arrival pulse
          ↓
8. Route settles into its steady glow
```

The animation is designed to create an immediate visual impression without becoming distracting.

The map is meant to feel **alive**, rather than behaving like a static illustration.

---

# 🟢🔴 Journey Endpoint Markers

The endpoints use their own visual language:

### Origin

* Fluorescent green
* Small footprint
* Soft green halo
* Pulsating entrance animation

### Destination

* Fluorescent red
* Small footprint
* Soft red halo
* Pulsating entrance animation
* Subtle arrival pulse when the route reaches it

The markers deliberately avoid the excessively bright "neon sign" appearance of some map visualizations.

---

# 🔎 Train Search

The booking interface contains:

* Origin station
* Destination station
* Journey date
* Travel class
* Passenger count
* Origin/destination swap control

The route preview responds to the entered stations, while the **Available Trains** section only becomes visible after the user submits the search.

This separates the two experiences:

### Before search

The user explores their journey visually.

### After search

The user receives structured train information.

---

# 🚉 Available Train Cards

The search-results system presents train information using a hybrid of:

**traditional railway timetable card + modern dark UI**

Each result can display:

* Train name
* Train number
* Departure time
* Arrival time
* Origin station
* Destination station
* Station codes
* Journey duration
* Running frequency
* Available travel classes
* Requested passenger count
* Selected class context

The frontend intentionally caps the display at **five train results per search** to keep the interface readable.

---

# 📊 Timetable Data

The current frontend contains a curated timetable snapshot rather than a live IRCTC/PRS connection.

The current dataset contains approximately:

* **60 directional city-pair timetable datasets**
* **246 train entries**
* Up to **5 results displayed per search**

The data covers the project's principal city network, including:

* Jaipur
* Delhi / New Delhi
* Lucknow
* Nagpur
* Ahmedabad
* Mumbai
* Chennai
* Guwahati
* Howrah (Kolkata)
* Bangalore (Bengaluru)

Train information includes scheduled times, station codes, classes and running frequency where represented by the project's curated data.

### Important

This is **not live ticket availability**.

The project does not currently communicate with the official IRCTC reservation/PRS system and therefore does not claim to provide:

* Live seat counts
* Live fares
* Live PNR information
* Real booking confirmation
* Real payment processing

The timetable information should therefore be treated as a **frontend demonstration dataset**.

---

# 🔄 Station & Route Architecture

The project uses a deliberately separated data architecture.

```text
js/
├── booking-form.js
├── main.js
├── quick-actions.js
├── route-preview.js
├── search-results.js
│
└── data/
    ├── stations.js
    ├── routes.js
    ├── train-data.js
    ├── network-lines.js
    ├── india-outline.js
    └── geo-calibration.js
```

### `stations.js`

Contains the station records used by the map and booking system.

Each station can contain:

```text
ID
Station code
Station name
Latitude
Longitude
```

The current project contains **29 station records**.

---

### `routes.js`

Contains the curated journey definitions used by the map.

Routes can include:

```text
Route ID
Train/service name
Train number
Origin
Destination
Distance
Duration
Intermediate stops
Geographic waypoints
Map-calibrated waypoints
```

The separation between geographic and map-space coordinates is intentional.

---

### `train-data.js`

Contains the timetable snapshot used by the Available Trains section.

This file is independent from the map animation system.

That means timetable changes can be made without modifying the geographic visualization.

---

### `route-preview.js`

Owns the interactive map experience.

It controls:

* Map rendering
* Railway network rendering
* Route rendering
* Station markers
* Route animation
* Map state
* Geographic-to-map conversion/calibration

This separation prevents changes to the train-result system from accidentally affecting the map animation.

---

### `search-results.js`

Owns the Available Trains section.

It:

1. Receives a submitted journey.
2. Resolves the station codes.
3. Looks up the corresponding timetable dataset.
4. Applies the requested class filter.
5. Limits results to five.
6. Builds the train cards.
7. Reveals and scrolls to the Available Trains section.

---

# ⚡ Quick Actions

The interface also contains a dedicated travel utility section.

Current entries include:

* **PNR Status**
* **Train Status**
* **My Bookings**
* **Help & Support**
* **Services**

These provide the structural foundation for future integrations without pretending that those backend systems already exist.

---

# 🧳 Services

The redesign includes a broader railway travel-services section containing entry points for:

* Hotels
* Holiday Packages
* Flights
* E-Catering
* Retiring Rooms
* Lounge Access
* Bus Tickets
* Tourism

These are currently frontend service entry points rather than fully integrated booking systems.

The architecture leaves room for future API integrations.

---

# 🌄 Railway Moments

A visual section was added to provide a more editorial interpretation of the railway experience.

Rather than making the website entirely transactional, this section introduces imagery representing:

* Indian railway trains
* Passenger interiors
* Railway spaces
* Travel atmosphere

The goal is to reinforce that railway travel is not simply a database of trains — it is also a cultural and visual experience.

Image sources are attributed to Wikimedia Commons in the project.

---

# 🌗 Dark / Light Mode

The project supports both:

* Dark mode
* Light mode

The dark experience is the primary visual direction.

The selected theme is stored using:

```text
localStorage
```

under:

```text
irctc-redesign-theme
```

so the user's preference persists between visits.

---

# 🕒 Live Clock

The navigation bar includes a live date/time display in IST.

The clock provides an additional real-world travel-interface detail while remaining independent from the train timetable system.

---

# ♿ Accessibility & UX

The project uses semantic HTML and accessibility attributes where appropriate.

Examples include:

* Semantic navigation
* Form labels
* ARIA labels
* ARIA live regions
* Keyboard-accessible buttons
* Accessible dialogs
* Focus restoration for modal interactions
* Alternative text for imagery
* `aria-selected` state for booking tabs
* Reduced reliance on color alone for interface meaning

The visual map itself is decorative from an accessibility perspective because the journey information is also represented through the booking form and train-result interface.

---

# 📱 Responsive Design

The interface is designed to adapt across screen sizes using:

* Responsive layouts
* Fluid typography
* CSS media queries
* Flexible grids
* Mobile-oriented stacking
* Responsive map presentation

The goal is to retain the same visual hierarchy rather than simply shrinking the desktop layout.

---

# 🧩 Technology Stack

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript

### Animation

* Anime.js 3.2.1

### Data visualization

* SVG
* Custom SVG layers
* Geographic coordinates
* Calibrated map-space coordinates

### Data

* Curated railway station data
* Curated railway route data
* Curated timetable snapshot

### Development approach

* No frontend framework
* No build step
* No bundler
* No backend required for the current demonstration

The project can therefore be opened directly in a modern browser or served using a simple local development server.

---

# 📁 Project Structure

```text
irctc-redesign/
│
├── index.html
│
├── assets/
│   ├── images/
│   │   └── irctc-logo.png
│   │
│   └── maps/
│       └── india-railways-network.svg
│
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── layout.css
│   ├── components.css
│   └── retouch.css
│
└── js/
    ├── main.js
    ├── booking-form.js
    ├── route-preview.js
    ├── search-results.js
    ├── quick-actions.js
    │
    └── data/
        ├── stations.js
        ├── routes.js
        ├── train-data.js
        ├── network-lines.js
        ├── india-outline.js
        └── geo-calibration.js
```

---

# 🧠 AI-Assisted / Vibe-Coded Development

This project was developed using an **AI-assisted / vibe-coding workflow**, which was permitted by the competition.

AI tools were used extensively for:

* Code generation
* Refactoring
* Debugging
* Data-structure implementation
* Animation implementation
* UI iteration
* Route visualization logic
* Geographic calibration assistance
* File-level architectural changes

However, the development process was **not simply "generate a website from one prompt."**

The project went through an iterative design and debugging process involving:

1. Establishing the original architecture.
2. Designing the visual direction.
3. Building the interactive map concept.
4. Inspecting the actual Wikimedia railway artwork.
5. Identifying its limitations as a traced/illustrative SVG.
6. Separating geographic data from map-space calibration.
7. Calibrating railway routes to the fixed visual map.
8. Correcting Northeast/Siliguri Corridor alignment.
9. Implementing endpoint animation.
10. Debugging route divergence caused by station-input resolution.
11. Building the train-result architecture separately from the map renderer.
12. Refining the overall IRCTC-inspired visual identity.

The final product therefore represents an **iterative human-directed + AI-assisted development workflow**.

---

# 🗺️ Data Sources & Attribution

### Railway Network Artwork

The project references the Indian Railways network artwork from:

**Wikimedia Commons**

[Indian Railways network-en.svg](https://commons.wikimedia.org/wiki/File:Indian_Railways_network-en.svg)

The artwork was used as a geographic/visual reference for the railway network and India map presentation.

Because the artwork is illustrative rather than a precise GIS projection, the project uses an additional calibration layer for visual route alignment.

---

### Station & Route Data

Railway station and route information is based on:

**DataMeet Railways / anandology/railways**

Repository:

https://github.com/anandology/railways

The project documentation identifies the dataset as CC0 licensed.

---

# ⚠️ Accuracy & Scope

A deliberate distinction is made between:

### Geographic source data

Real railway station coordinates and recorded route coordinates.

### Visual map representation

A calibrated representation of those journeys on the specific India railway artwork used by this project.

Therefore:

> **Journey previews are illustrative visualizations based on real railway corridors, not certified GIS track-centerline geometry.**

This distinction is important because the underlying railway artwork is an illustrative map rather than a survey-grade geographic projection.

---

# 🚧 Current Limitations

This is a frontend competition project rather than a production railway booking platform.

Currently it does not provide:

* Real IRCTC authentication
* Real ticket booking
* Real payment processing
* Live seat availability
* Live fares
* Live PNR status
* Live train-running status
* Real user accounts
* Production railway APIs

Some interface sections intentionally act as **future integration points**.

---

# 🔮 Future Scope

The architecture leaves room for several future extensions.

### Live Railway Data

Connect the frontend to an official or authorized railway API for:

* Live train schedules
* Seat availability
* Fare information
* PNR status
* Running status

### Real Booking

Introduce:

* Authentication
* Passenger profiles
* Payment processing
* Booking history
* Cancellation/refund workflows

### Smarter Search

Add:

* Station autocomplete
* Nearby station suggestions
* Multi-city journeys
* Date-aware availability
* Class-aware fare comparison
* Sort by duration / departure / arrival

### Better Route Visualization

The existing map architecture could evolve into a more complete geographic system using a true GIS/vector-tile foundation.

### Personalization

Potential additions:

* Saved journeys
* Recent searches
* Favorite stations
* Personalized travel shortcuts

---

# 🏆 Competition Goal

The purpose of this redesign is not to recreate every backend capability of IRCTC.

The goal is to explore a different answer to a simpler question:

> **What if booking a train could feel like starting a journey before the ticket is even booked?**

The project focuses on:

**Visual storytelling + interaction + railway identity + geographic visualization + clean frontend architecture**

rather than simply reproducing an existing booking form.

---

## Built for the Fresher's Coding Club Competition

**Project:** IRCTC Modern Frontend Redesign
**Category:** Frontend / AI-Assisted Vibe Coding
**Stack:** HTML · CSS · JavaScript · SVG · Anime.js

> *A redesign concept and frontend demonstration — not an official IRCTC product.*
