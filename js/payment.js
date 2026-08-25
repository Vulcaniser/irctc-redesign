(function(){'use strict';
var U=window.BookingUtils,data=U.load();
if(!data){location.href='index.html';return;}
/* Rebuild the fare snapshot from the selected train/class so payment can never
   drift from the booking form after a city search. */
data.fare=U.calculateFare(data.train,data.train.class,data.passengers.length);
U.save(data);
var amount=document.getElementById('payment-amount'), methods=document.querySelectorAll('[name=payment-method]'), confirm=document.getElementById('confirm-payment'), state=document.getElementById('payment-state');
amount.textContent=U.money(data.fare.total); document.getElementById('payment-pnr').textContent=data.pnr;
function fareLine(label,value,cls){return '<div class="payment-fare-row '+(cls||'')+'"><span>'+label+'</span><strong>'+U.money(value)+'</strong></div>';}
document.getElementById('payment-fare-breakdown').innerHTML=
  fareLine('Base railway fare',data.fare.baseFare)+
  fareLine('Reservation / booking charge',data.fare.reservationCharges)+
  fareLine('GST on booking charge',data.fare.taxes)+
  fareLine('Other applicable charges',data.fare.otherCharges)+
  fareLine('Total payable',data.fare.total,'payment-fare-total');
methods.forEach(function(m){m.addEventListener('change',function(){confirm.disabled=false;});});
confirm.addEventListener('click',function(){
  var chosen=document.querySelector('[name=payment-method]:checked'); if(!chosen)return;
  confirm.disabled=true;state.hidden=false;state.textContent='Processing secure demo payment…';
  setTimeout(function(){data.payment.method=chosen.value;data.payment.status='SUCCESS';data.payment.transactionId=data.transactionId;data.paidAt=U.nowLabel();U.save(data);U.savePNRRecord(data);location.href='confirmation.html';},1000);
});
})();
