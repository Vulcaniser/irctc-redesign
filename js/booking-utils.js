(function () {
  'use strict';

  var KEY = 'irctc-demo-booking';
  var CLASS_LABELS = {
    '1A':'AC First Class','2A':'AC 2 Tier','3A':'AC 3 Tier','3E':'AC 3 Economy',
    'CC':'Chair Car','EC':'Executive Chair Car','SL':'Sleeper','2S':'Second Sitting'
  };

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c];
    });
  }
  function classLabel(code) { return CLASS_LABELS[String(code || '').toUpperCase()] || code || 'Class'; }
  function save(data) { sessionStorage.setItem(KEY, JSON.stringify(data)); return data; }
  function savePNRRecord(data) {
    try {
      var key='irctc-demo-pnr-registry';
      var records=JSON.parse(localStorage.getItem(key)||'[]');
      var record={pnr:data.pnr,bookingId:data.bookingId,transactionId:data.transactionId,train:data.train,passengers:data.passengers.length,total:data.fare.total,status:data.payment.status,paidAt:data.paidAt||data.createdAt};
      records=records.filter(function(r){return r.pnr!==record.pnr;}); records.unshift(record);
      localStorage.setItem(key,JSON.stringify(records.slice(0,25)));
      return record;
    } catch(e){ return null; }
  }
  function getPNRRecords() {
    try { return JSON.parse(localStorage.getItem('irctc-demo-pnr-registry')||'[]'); } catch(e){ return []; }
  }
  function findPNR(pnr) {
    var value=String(pnr||'').trim().toUpperCase();
    return getPNRRecords().find(function(r){return String(r.pnr||'').toUpperCase()===value;})||null;
  }
  function findBookingRef(value) {
    var needle=String(value||'').trim().toUpperCase();
    if(!needle) return null;
    return getPNRRecords().find(function(r){
      return [r.pnr,r.bookingId,r.transactionId,r.train && r.train.number,r.train && r.train.name]
        .some(function(v){return String(v||'').toUpperCase()===needle;});
    })||null;
  }
  function listBookings() { return getPNRRecords(); }
  function clearBookingHistory() {
    try { localStorage.removeItem('irctc-demo-pnr-registry'); } catch(e) {}
    try { sessionStorage.removeItem(KEY); } catch(e) {}
  }
  function load() { try { return JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch (_) { return null; } }
  function clear() { sessionStorage.removeItem(KEY); }
  function money(n) { return '₹' + Number(n || 0).toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2}); }
  function dateLabel(value) {
    if (!value) return '—';
    return new Date(value + 'T00:00:00').toLocaleDateString('en-IN', {day:'2-digit', month:'short', year:'numeric'});
  }
  function nowLabel() { return new Date().toLocaleString('en-IN', {dateStyle:'medium', timeStyle:'short'}); }
  function id(prefix) { return prefix + Math.random().toString(36).slice(2, 7).toUpperCase() + Date.now().toString(36).slice(-4).toUpperCase(); }
  function normalizeMobile(value) { return String(value || '').replace(/\D/g, '').replace(/^91(?=\d{10}$)/, ''); }
  function validMobile(value) { return /^[6-9]\d{9}$/.test(normalizeMobile(value)); }
  function validEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || '').trim()); }
  function baseFare(train, code) {
    if (train && train.fares && train.fares[code] != null) return Number(train.fares[code]);
    var fallback = {SL:500,'2S':250,'3E':1100,'3A':1400,'2A':2100,'1A':3600,CC:900,EC:1600};
    return fallback[code] || 1000;
  }
  function calculateFare(train, code, passengers) {
    var count = Math.max(1, Number(passengers) || 1);
    var perPassenger = baseFare(train, code);
    var base = perPassenger * count;
    var convenienceNet = /^(SL|2S)$/.test(String(code).toUpperCase()) ? 15 : 30;
    var convenience = convenienceNet;
    var gst = convenienceNet * 0.18;
    var other = 0;
    return { baseFare: base, reservationCharges: convenience, taxes: gst, otherCharges: other, total: base + convenience + gst + other,
      perPassenger: perPassenger, convenienceFeeNet: convenienceNet, gstRate: 18 };
  }
  function createBooking(train, options) {
    var code = String(options.travelClass || train.classes[0] || 'SL').toUpperCase();
    var passengers = Math.max(1, Number(options.passengers) || 1);
    return {
      bookingId: id('BK-'), pnr: id('DEMO').slice(0, 10), transactionId: id('TXN-'),
      train: { number:train.number, name:train.name, source:train.fromName, destination:train.toName,
        sourceCode:train.fromCode, destinationCode:train.toCode, departure:train.fromTime, arrival:train.toTime,
        duration:train.duration, date:options.date || '', class:code, fares:train.fares || {} },
      passengers: Array.from({length:passengers}, function(_, i) { return {name:'',age:'',gender:'',berthPreference:'No preference',idType:'Aadhaar',idNumber:''}; }),
      contact:{email:'',mobile:''}, fare:calculateFare(train, code, passengers), payment:{method:'DEMO',status:'PENDING',transactionId:''},
      createdAt: nowLabel(), delivery:{email:false,mobile:false}
    };
  }
  function barcodeSvg(value) {
    var seed = String(value).split('').reduce(function(a,c){return (a*31+c.charCodeAt(0))>>>0;}, 7);
    var x=4, bars='';
    for (var i=0;i<72;i++) { seed=(seed*1664525+1013904223)>>>0; var w=(seed%3)+1; var gap=(seed>>>4)%2; bars += '<rect x="'+x+'" y="6" width="'+w+'" height="58" rx=".5" />'; x += w + gap + 1; }
    return '<svg class="mock-barcode" viewBox="0 0 '+(x+4)+' 72" role="img" aria-label="Demo barcode"><rect width="100%" height="100%" fill="white"/>'+bars+'<text x="6" y="69" font-size="5" font-family="monospace">DEMO BARCODE · '+esc(value)+'</text></svg>';
  }

  // Hidden demo reset shortcut: Ctrl + Alt + C clears ONLY completed booking history.
  // It deliberately leaves the current booking/session snapshot untouched so it
  // cannot interfere with search results, fare snapshots, route preview, or an
  // in-progress booking.
  window.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.altKey && String(event.key).toLowerCase() === 'c') {
      event.preventDefault();
      event.stopPropagation();
      try {
        localStorage.removeItem('irctc-demo-pnr-registry');
        window.dispatchEvent(new CustomEvent('irctc-bookings-cleared'));
      } catch (e) {}
    }
  }, true);

  window.BookingUtils = {esc:esc,classLabel:classLabel,save:save,load:load,clear:clear,money:money,dateLabel:dateLabel,nowLabel:nowLabel,validMobile:validMobile,validEmail:validEmail,normalizeMobile:normalizeMobile,baseFare:baseFare,calculateFare:calculateFare,createBooking:createBooking,barcodeSvg:barcodeSvg,savePNRRecord:savePNRRecord,findPNR:findPNR,findBookingRef:findBookingRef,listBookings:listBookings,clearBookingHistory:clearBookingHistory};
})();
