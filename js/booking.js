(function () {
  'use strict';
  var data = window.BookingUtils.load();
  var form = document.getElementById('passenger-form');
  var passengersWrap = document.getElementById('passenger-list');
  var contactForm = document.getElementById('contact-form');
  var proceed = document.getElementById('proceed-pay');
  var fareBox = document.getElementById('fare-breakdown');
  var status = document.getElementById('booking-validation');
  if (!data || !form) return;

  var U = window.BookingUtils;
  function renderJourney() {
    document.querySelectorAll('[data-booking-field]').forEach(function(el){
      var key=el.dataset.bookingField; var value=data.train[key];
      el.textContent = key==='date' ? U.dateLabel(value) : (value || '—');
    });
    document.getElementById('train-visual-name').textContent=data.train.name;
    document.getElementById('train-visual-number').textContent=data.train.number;
    document.getElementById('train-visual-route').textContent=data.train.source+' → '+data.train.destination;
    document.getElementById('train-visual-class').textContent=U.classLabel(data.train.class);
  }
  function passengerCard(p, i) {
    return '<fieldset class="passenger-card"><legend>Passenger '+(i+1)+'</legend>'+
      '<div class="form-grid">'+
      '<label>Full Name <span>*</span><input name="name" value="'+U.esc(p.name)+'" autocomplete="name" required></label>'+
      '<label>Age <span>*</span><input name="age" type="number" min="1" max="120" value="'+U.esc(p.age)+'" required></label>'+
      '<label>Gender <span>*</span><select name="gender" required><option value="">Select</option><option '+(p.gender==='Male'?'selected':'')+'>Male</option><option '+(p.gender==='Female'?'selected':'')+'>Female</option><option '+(p.gender==='Other'?'selected':'')+'>Other</option></select></label>'+
      '<label>Berth Preference<select name="berthPreference"><option '+(p.berthPreference==='No preference'?'selected':'')+'>No preference</option><option '+(p.berthPreference==='Lower'?'selected':'')+'>Lower</option><option '+(p.berthPreference==='Middle'?'selected':'')+'>Middle</option><option '+(p.berthPreference==='Upper'?'selected':'')+'>Upper</option><option '+(p.berthPreference==='Side Lower'?'selected':'')+'>Side Lower</option><option '+(p.berthPreference==='Side Upper'?'selected':'')+'>Side Upper</option></select></label>'+ 
      '<label>ID Type <span>*</span><select name="idType" required><option>Aadhaar</option><option>Passport</option><option>Driving Licence</option><option>Voter ID</option></select></label>'+
      '<label>ID Number <span>*</span><input name="idNumber" value="'+U.esc(p.idNumber)+'" required autocomplete="off"></label>'+
      '</div></fieldset>';
  }
  passengersWrap.innerHTML=data.passengers.map(passengerCard).join('');
  renderJourney();
  function collect() {
    var cards=[].slice.call(passengersWrap.querySelectorAll('.passenger-card'));
    data.passengers=cards.map(function(card){return {name:card.querySelector('[name=name]').value.trim(),age:card.querySelector('[name=age]').value,gender:card.querySelector('[name=gender]').value,berthPreference:card.querySelector('[name=berthPreference]').value,idType:card.querySelector('[name=idType]').value,idNumber:card.querySelector('[name=idNumber]').value.trim()};});
    data.contact={email:document.getElementById('email').value.trim(),mobile:document.getElementById('mobile').value.trim()};
    U.save(data);
  }
  function valid() {
    collect();
    var bad=null;
    data.passengers.some(function(p){ if(!p.name||!p.age||Number(p.age)<1||Number(p.age)>120||!p.gender||!p.idType||!p.idNumber){bad='Complete all required passenger fields.';return true;} return false;});
    if(!bad&&!U.validEmail(data.contact.email)) bad='Enter a valid email address.';
    if(!bad&&!U.validMobile(data.contact.mobile)) bad='Enter a valid 10-digit Indian mobile number.';
    status.textContent=bad||''; status.hidden=!bad; proceed.disabled=!!bad; return !bad;
  }
  function renderFare() {
    var f=data.fare;
    fareBox.innerHTML='<div class="fare-group"><div class="fare-group-title">Railway fare</div><div><span>Base fare · '+data.passengers.length+' passenger'+(data.passengers.length===1?'':'s')+'</span><strong>'+U.money(f.baseFare)+'</strong></div></div><div class="fare-group"><div class="fare-group-title">Booking &amp; taxation</div><div><span>Reservation / booking charge</span><strong>'+U.money(f.reservationCharges)+'</strong></div><div><span>GST on booking charge</span><strong>'+U.money(f.taxes)+'</strong></div></div><div class="fare-group"><div class="fare-group-title">Other fees</div><div><span>Other applicable charges</span><strong>'+U.money(f.otherCharges)+'</strong></div></div><div class="fare-total"><span>Total payable</span><strong>'+U.money(f.total)+'</strong></div><small>Demo fare snapshot. The train fare comes from this frontend timetable snapshot; booking charges and taxes are displayed separately.</small>';
  }
  renderFare();
  form.addEventListener('input',valid); form.addEventListener('change',valid); contactForm.addEventListener('input',valid); contactForm.addEventListener('change',valid);
  proceed.addEventListener('click',function(){ if(!valid()) return; window.location.href='payment.html'; });
})();
