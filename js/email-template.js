(function () {
  'use strict';
  window.DemoEmailTemplate = function (booking) {
    var e = window.BookingUtils.esc, m = window.BookingUtils.money;
    var p = booking.passengers[0] || {name:'Passenger'};
    return {
      subject: 'Your Railway Booking Confirmation — Demo PNR ' + booking.pnr,
      body: 'Dear ' + (p.name || 'Passenger') + ',\n\nYour railway booking has been successfully completed in the demonstration booking environment.\n\nJourney Details\nTrain: ' + booking.train.name + ' (' + booking.train.number + ')\nFrom: ' + booking.train.source + '\nTo: ' + booking.train.destination + '\nJourney Date: ' + window.BookingUtils.dateLabel(booking.train.date) + '\nDeparture: ' + booking.train.departure + '\nArrival: ' + booking.train.arrival + '\n\nBooking Details\nDemo PNR: ' + booking.pnr + '\nBooking ID: ' + booking.bookingId + '\nTransaction ID: ' + booking.transactionId + '\nTotal Paid: ' + m(booking.fare.total) + '\n\nYour demo ticket and invoice are ready in the booking confirmation page.\n\nImportant: This is a demonstration booking. It does not represent a real railway reservation.\n\nRegards,\nRailway Booking Support'
    };
  };
})();
