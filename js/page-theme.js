(function(){
  'use strict';
  var root=document.documentElement;
  var key='irctc-redesign-theme';
  var toggle=document.getElementById('page-theme-toggle');
  var transition=document.getElementById('page-theme-transition');
  var saved=localStorage.getItem(key);
  root.dataset.theme=saved==='light'?'light':'dark';
  if(!toggle)return;

  function sync(){
    var light=root.dataset.theme==='light';
    toggle.setAttribute('aria-pressed',String(light));
    toggle.setAttribute('aria-label',light?'Switch to dark mode':'Switch to light mode');
    toggle.setAttribute('title',light?'Switch to dark mode':'Switch to light mode');
    var sr=toggle.querySelector('.page-theme-toggle__sr');
    if(sr)sr.textContent=light?'Switch to dark mode':'Switch to light mode';
  }
  sync();

  function setTheme(next){
    var current=root.dataset.theme||'dark';
    if(next===current)return;
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!transition||reduce){
      root.dataset.theme=next;localStorage.setItem(key,next);sync();return;
    }
    var rect=toggle.getBoundingClientRect();
    var x=rect.left+rect.width/2, y=rect.top+rect.height/2;
    var radius=Math.hypot(Math.max(x,window.innerWidth-x),Math.max(y,window.innerHeight-y))+24;
    transition.style.background=next==='light'?'#f5f1e9':'#050810';
    transition.style.opacity='1';
    transition.style.clipPath='circle(0px at '+x+'px '+y+'px)';
    var start=performance.now(), duration=680;
    function frame(now){
      var t=Math.min(1,(now-start)/duration);
      var eased=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
      transition.style.clipPath='circle('+(radius*eased)+'px at '+x+'px '+y+'px)';
      if(t<1){requestAnimationFrame(frame);return;}
      root.dataset.theme=next;localStorage.setItem(key,next);sync();
      var fadeStart=performance.now(), fadeDuration=440;
      function fade(now2){
        var f=Math.min(1,(now2-fadeStart)/fadeDuration);
        transition.style.opacity=String(1-f);
        if(f<1){requestAnimationFrame(fade);return;}
        transition.style.clipPath='circle(0px at 50% 50%)';
      }
      requestAnimationFrame(fade);
    }
    requestAnimationFrame(frame);
  }
  toggle.addEventListener('click',function(){setTheme(root.dataset.theme==='light'?'dark':'light');});
})();
