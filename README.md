# IRCTC Redesign — Train Booking Demo

A frontend redesign of an IRCTC-style railway booking experience, built as a **Freshers' Coding Competition project**.

The project focuses on making a train-booking interface feel clearer, more modern and easier to navigate while keeping the core flow familiar: search a journey, inspect trains, enter passenger details, complete a mock payment, and view a generated ticket.

> **Important:** This is a frontend demonstration. It does not connect to IRCTC/Indian Railways booking, payment, PNR, or live train-running services.

## Features

### Train search and journey planning
- Book Ticket search interface with:
  - From / To city inputs
  - Journey date
  - Travel class
  - Passenger count
  - Swap origin/destination control
- Search results are displayed only after submitting the search form.
- Available-train cards show train number, name, route, timings, duration, operating days, classes and fare information where available.
- Pagination is used for larger result sets.
- A fare snapshot is shown alongside the search results and is carried into the booking flow.

### Route preview
- Interactive India railway route preview.
- Origin and destination changes update the route-preview state.
- Selected routes are highlighted with animated route treatment.
- Station markers and intermediate stops are represented on the map.
- The route geometry is based on curated recorded railway-route data and is presented as an **illustrative route**, rather than claiming to be survey-grade track geometry.

### Supported railway city network

The curated route/search data is built around these ten city endpoints:

- Ahmedabad
- Guwahati
- Lucknow
- Delhi
- Chennai
- Mumbai
- Nagpur
- Howrah
- Bangalore
- Jaipur

The project contains a curated route matrix between these endpoints, with station-code aliases such as **Howrah/Kolkata** and **Bangalore/Bengaluru** handled by the search layer.

### Quick Actions
The homepage includes a Quick Actions area with:

- **PNR Status**
  - Looks up a completed demo booking using its generated PNR or booking reference.
- **Train Status**
  - Accepts a train number, train name, booking ID or PNR.
  - Can display the saved journey state for a completed demo booking.
- **My Bookings**
  - Shows completed mock bookings saved locally in the browser.
- **Help & Support**
  - Provides lightweight entry points for booking, classes/fares, cancellation and travel guidance.

The PNR Status, Train Status and My Bookings entries in the navbar and booking widget open the corresponding Quick Action instead of maintaining duplicate versions of those tools.

### Mock booking flow

Selecting **Book Train** starts a multi-page booking flow:

1. **Passenger details**
   - One form per passenger.
   - Name, age, gender, berth preference, ID type and ID number.
   - Contact email and mobile number validation.
2. **Fare summary**
   - Railway/base fare
   - Reservation/booking charge
   - GST on the booking charge
   - Other applicable charges
   - Total payable
3. **Mock payment**
   - Demo payment methods.
   - No real payment gateway is connected.
4. **Booking confirmation**
   - Generated demo PNR
   - Booking ID
   - Transaction ID
   - Journey information
   - Passenger count
   - Total paid

### Fare calculation

The project calculates a demonstration fare from the selected train/class and passenger count.

Where a train record contains a class-specific fare, that value is used. A fallback fare table is also present for supported classes.

The demo calculation separates:

- Base railway fare
- Reservation/booking charge
- GST
- Other charges
- Total

These figures should **not be treated as live IRCTC/PRS fares**.

### Demo ticket and invoice PDFs

After a successful mock payment, the confirmation page can generate:

- A structured demo railway ticket PDF
- A separate demo invoice PDF

The documents include:

- IRCTC branding/logo used for the mock interface
- Journey details
- Train information
- Passenger details
- PNR
- Booking ID
- Transaction ID
- Fare breakdown
- Total paid
- Mock authorization marking
- Generated demo barcode
- Clear **DEMO / NOT VALID FOR TRAVEL** messaging

The PDFs are generated client-side and do not represent real railway tickets.

### Email, mobile and file sharing

The confirmation page provides:

- Send to Email
- Send to Mobile
- Share PDFs

Where the browser supports the Web Share API with files, the generated PDFs can be passed to the device's native share sheet.

Otherwise, the project opens the appropriate email/message composer and provides instructions for attaching the generated PDFs manually.

There is no backend email/SMS provider connected to this project.

### Dark and light mode

- Dark mode is the default first-load theme.
- Light mode is available through the floating theme toggle.
- The theme preference is remembered with `localStorage`.
- The homepage and booking-flow pages use the same theme state.
- Theme changes use a circular reveal transition.
- Light-mode text and UI contrast have been adjusted for readability without changing the dark-mode palette.

### Booking history and local state

The demo uses browser storage rather than a backend:

- `sessionStorage` keeps the active booking flow.
- `localStorage` keeps completed demo booking/PNR records.
- Booking history can therefore be revisited from **My Bookings** on the same browser.

There is also a deliberately hidden competition/demo reset shortcut:

**Ctrl + Alt + C**

This clears the completed demo booking history/PNR registry only. It does not intentionally clear the active booking snapshot or the selected theme.

### Services and footer interactions

The homepage includes UI entry points for:

- Hotels
- Holiday Packages
- Flights
- E-Catering
- Retiring Rooms
- Lounge Access
- Bus Tickets
- Tourism

These are presented as frontend service entry points rather than live integrations.

The footer includes lightweight panels for:

- Help Desk
- Contact Us
- Terms & Conditions

with links to relevant official IRCTC information where provided by the interface.

### Across the Network

The homepage includes an **Across the Network** visual section using locally bundled real railway photographs:

1. **The Line** — Indian railway train/railway landscape
2. **The Station** — Jaipur Railway Station
3. **The Journey** — railway landscape viewed from a train

The images are stored locally under `assets/images/` rather than relying on remote image loading.

## Technology

The project is intentionally lightweight and frontend-focused.

- **HTML5**
- **CSS3**
- **Vanilla JavaScript**
- **SVG** for map and interface graphics
- **Anime.js 3.2.1** for selected UI/route animations
- Browser `localStorage` / `sessionStorage`
- Client-side PDF generation
- Web Share API where supported

There is no server-side application or database in the repository.

## Project structure

```text
.
├── index.html
├── booking.html
├── payment.html
├── confirmation.html
│
├── css/
│   ├── variables.css
│   ├── reset.css
│   ├── layout.css
│   ├── components.css
│   ├── retouch.css
│   └── booking.css
│
├── js/
│   ├── main.js
│   ├── booking-form.js
│   ├── search-results.js
│   ├── route-preview.js
│   ├── quick-actions.js
│   ├── booking-utils.js
│   ├── booking.js
│   ├── payment.js
│   ├── confirmation.js
│   ├── email-template.js
│   ├── page-theme.js
│   │
│   └── data/
│       ├── train-data.js
│       ├── routes.js
│       ├── stations.js
│       ├── network-lines.js
│       ├── india-outline.js
│       └── geo-calibration.js
│
├── assets/
│   ├── images/
│   │   ├── irctc-logo.png
│   │   ├── Indian_Railways_Train_in_2025.jpg
│   │   ├── JAIPUR_RAILWAY_STATION.jpg
│   │   └── From_train_window.jpg
│   └── maps/
│       └── india-railways-network.svg
│
└── project/
    └── irctc-redesign/
        └── supporting route-preview/data files
```

## Running the project

This project does not require a build system.

For the simplest setup, serve the repository through a local static HTTP server rather than opening the HTML files directly.

For example, with Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

A static hosting service such as GitHub Pages can also be used.

## Data and limitations

This project deliberately uses a **curated demo dataset** rather than live railway APIs.

The train-data file describes its timetable information as a researched snapshot and explicitly states that it is **not live IRCTC/PRS availability**.

Likewise:

- PNR status is local demo data.
- Train status is a local demo tracker.
- Booking history is stored in the browser.
- Payments are simulated.
- PNRs, booking IDs and transaction IDs are generated for the demo.
- Generated PDFs are mock documents.
- Fare values are demonstration values and should not be used for actual travel planning or ticket purchasing.

For actual railway reservations and current railway information, users should use official Indian Railways/IRCTC services.

## Design approach

The design aims for a modern railway-booking interface without turning the project into a purely decorative redesign.

The main design decisions are:

- Strong visual hierarchy around the booking/search action.
- Dark mode as the default presentation.
- A restrained light mode with readable contrast.
- Small accent colours used to add depth without overwhelming the interface.
- Reusable cards and panels for booking, quick actions and services.
- Responsive layouts for smaller screens.
- Animated route/map feedback.
- Clear separation between journey information, passenger information, fare information and payment.
- Explicit demo labelling wherever the interface could otherwise be mistaken for a real railway service.

## AI assistance

**This project was developed with AI assistance.**

AI tools were used during development for tasks including:

- Code generation and modification
- UI/CSS iteration
- Debugging
- Layout and responsive-design refinements
- JavaScript logic refinement
- PDF-generation improvements
- Feature integration across the booking flow
- Reviewing and correcting interactions

The project was iteratively reviewed and directed by the developer, including decisions about the user experience, visual design, feature scope, route coverage, demo limitations and final behaviour.

AI assistance is disclosed here intentionally as part of the project's development process.

## Competition context

This project was created for a **Freshers' Coding Competition** as a practical demonstration of:

- Frontend development
- UI/UX thinking
- JavaScript state management
- Form handling and validation
- Responsive design
- Client-side data persistence
- Interactive visualisation
- Multi-page application flow
- Client-side document generation
- Working within the constraints of a frontend-only demo

The emphasis is on demonstrating a complete, understandable prototype rather than claiming production-level railway integration.

## Disclaimer

This repository is an educational/demo project.

It is **not affiliated with, operated by, or connected to IRCTC or Indian Railways**, and it does not provide real ticket booking, payment processing, live PNR information, or live train-running information.

Do not enter real payment credentials or other sensitive information into the demonstration.
