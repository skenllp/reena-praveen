(function(){
var intro=document.getElementById('intro'),seal=document.getElementById('seal');
var music=document.getElementById('bgMusic');
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
function petals(n){if(rm)return;for(var i=0;i<n;i++){var p=document.createElement('i');p.className='petal';
p.style.left=Math.random()*100+'vw';p.style.setProperty('--dx',(Math.random()*160-80)+'px');p.style.setProperty('--r',(Math.random()*720)+'deg');
p.style.animationDuration=(6+Math.random()*6)+'s';p.style.animationDelay=(Math.random()*3)+'s';p.style.opacity=.5+Math.random()*.4;
document.body.appendChild(p);setTimeout(function(q){q.remove()}.bind(null,p),14000)}}
function open(){if(intro.classList.contains('open'))return;intro.classList.add('open');music.play().catch(function(){});setTimeout(function(){document.body.classList.remove('lock');petals(40)},900);setInterval(function(){petals(8)},6000)}
seal.addEventListener('click',open);intro.addEventListener('click',open);
var T=Date.UTC(2027,0,25,5,30),cd=document.getElementById('cd'),prev=[],els=null;
function tick(){var d=T-Date.now();if(d<=0){cd.innerHTML='<div class="day">Today is the day.</div>';els=null;return}
var v=[Math.floor(d/864e5),Math.floor(d/36e5)%24,Math.floor(d/6e4)%60,Math.floor(d/1e3)%60],l=['Days','Hours','Min','Sec'];
if(!els){cd.innerHTML=v.map(function(x,i){return '<div><strong>'+x+'</strong><small>'+l[i]+'</small></div>'}).join('');els=cd.querySelectorAll('strong');prev=v.slice();return}
v.forEach(function(x,i){if(x!==prev[i]){prev[i]=x;var s=els[i];s.textContent=x;s.classList.remove('tick');void s.offsetWidth;s.classList.add('tick')}})}
tick();setInterval(tick,1000);
if(!rm&&'IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.2});
cd.classList.add('rv');io.observe(cd);document.querySelectorAll('#gal figure').forEach(function(f,i){f.style.setProperty('--d',(i*.18)+'s');f.classList.add('rv');io.observe(f)})}
var lb=document.getElementById('lb');document.getElementById('gal').addEventListener('click',function(e){if(e.target.tagName=='IMG'){lb.firstChild.src=e.target.src;lb.classList.add('on')}});lb.addEventListener('click',function(){lb.classList.remove('on')});document.addEventListener('keydown',function(e){if(e.key=='Escape')lb.classList.remove('on')});
// RSVP Form with Google Sheets Integration
var rsvpForm=document.getElementById('rsvpForm');
if(rsvpForm){
var attendanceRadios=document.querySelectorAll('input[name="attendance"]');
var eventsGroup=document.getElementById('eventsGroup');
  var guestCountDiv=document.getElementById('guestCount').parentElement;
  // hide guest count initially
  guestCountDiv.style.display='none';
  document.getElementById('guestCount').required=false;
attendanceRadios.forEach(function(radio){
  radio.addEventListener('change',function(){
    var show=radio.value==='yes';
    eventsGroup.style.display=show?'block':'none';
    guestCountDiv.style.display=show?'block':'none';
    document.getElementById('guestCount').required=show;
  })});
rsvpForm.addEventListener('submit',function(e){
  e.preventDefault();
  var submitBtn=rsvpForm.querySelector('.rsvp-submit');
  var status=document.getElementById('rsvpStatus');
  // Immediate feedback
  status.className='rsvp-status success';
  status.textContent='Thank you! Your RSVP has been received. We look forward to celebrating with you!';
  status.style.display='block';
  rsvpForm.style.display='none';
  petals(30);

  var emailField = document.getElementById('guestEmail');
  var phoneField = document.getElementById('guestPhone');
  var guestCountField = document.getElementById('guestCount');
  var messageField = document.getElementById('message');

  var formData = {
    name: document.getElementById('guestName').value,
    email: emailField ? emailField.value : '',
    phone: phoneField ? phoneField.value : '',
    attendance: document.querySelector('input[name="attendance"]:checked').value,
    events: Array.from(document.querySelectorAll('input[name="events"]:checked')).map(function(cb) {
      return cb.value;
    }),
    guestCount: guestCountField ? guestCountField.value : '',
    message: messageField ? messageField.value : ''
  };
  var SCRIPT_URL='https://script.google.com/macros/s/AKfycbzM8as6O4Paq9sSyxuXeCzLcHMud5W2iH-jMtWGGnugYSIV56X865Yzz9s9bsFSVJw35g/exec';
  fetch(SCRIPT_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(formData)})
    .catch(function(err){
      console.warn('Background sync note:', err);
    });
});
}

// Clean any ?v=2 or other query parameters from address bar on load
if(window.location.search){
  var cleanUrl=window.location.origin+window.location.pathname;
  window.history.replaceState({},document.title,cleanUrl);
}

// Sharing functions using clean canonical URL
var CANONICAL_URL='https://reena-praveen.vercel.app/';
var SHARE_TITLE='Reena & Praveen – Wedding Invitation';
var SHARE_TEXT='You are invited to the wedding of Reena & Praveen. Thu 21 • Mon 25 • January • 2027';

var btnShareNative=document.getElementById('btnShareNative');
var btnShareWhatsApp=document.getElementById('btnShareWhatsApp');
var btnCopyLink=document.getElementById('btnCopyLink');
var shareStatus=document.getElementById('shareStatus');

function showShareToast(msg){
  if(!shareStatus)return;
  shareStatus.textContent=msg;
  shareStatus.style.display='block';
  setTimeout(function(){shareStatus.style.display='none'},4000);
}

function copyCleanUrl(){
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(CANONICAL_URL).then(function(){
      showShareToast('Link copied: '+CANONICAL_URL);
    }).catch(function(){
      fallbackCopyCleanUrl();
    });
  }else{
    fallbackCopyCleanUrl();
  }
}

function fallbackCopyCleanUrl(){
  var ta=document.createElement('textarea');
  ta.value=CANONICAL_URL;
  ta.style.position='fixed';
  ta.style.opacity='0';
  document.body.appendChild(ta);
  ta.select();
  try{
    document.execCommand('copy');
    showShareToast('Link copied: '+CANONICAL_URL);
  }catch(e){}
  document.body.removeChild(ta);
}

if(btnShareNative){
  btnShareNative.addEventListener('click',function(){
    if(navigator.share){
      navigator.share({
        title:SHARE_TITLE,
        text:SHARE_TEXT,
        url:CANONICAL_URL
      }).catch(function(){});
    }else{
      copyCleanUrl();
    }
  });
}

if(btnShareWhatsApp){
  btnShareWhatsApp.addEventListener('click',function(e){
    e.preventDefault();
    var waText=encodeURIComponent(SHARE_TITLE+'\n'+SHARE_TEXT+'\n'+CANONICAL_URL);
    window.open('https://api.whatsapp.com/send?text='+waText,'_blank','noopener,noreferrer');
  });
}

if(btnCopyLink){
  btnCopyLink.addEventListener('click',function(e){
    e.preventDefault();
    copyCleanUrl();
  });
}
})();
