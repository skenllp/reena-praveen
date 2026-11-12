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
attendanceRadios.forEach(function(radio){radio.addEventListener('change',function(){eventsGroup.style.display=radio.value==='yes'?'block':'none'})});
rsvpForm.addEventListener('submit',function(e){e.preventDefault();
var submitBtn=rsvpForm.querySelector('.rsvp-submit');
var status=document.getElementById('rsvpStatus');
submitBtn.disabled=true;
submitBtn.textContent='Submitting...';
var formData={name:document.getElementById('guestName').value,email:document.getElementById('guestEmail').value,phone:document.getElementById('guestPhone').value,attendance:document.querySelector('input[name="attendance"]:checked').value,events:Array.from(document.querySelectorAll('input[name="events"]:checked')).map(function(cb){return cb.value}),guestCount:document.getElementById('guestCount').value,dietary:document.getElementById('dietaryReq').value,message:document.getElementById('message').value};
var SCRIPT_URL='https://script.google.com/macros/s/AKfycbzM8as6O4Paq9sSyxuXeCzLcHMud5W2iH-jMtWGGnugYSIV56X865Yzz9s9bsFSVJw35g/exec';
fetch(SCRIPT_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(formData)}).then(function(){status.className='rsvp-status success';status.textContent='Thank you! Your RSVP has been received. We look forward to celebrating with you!';rsvpForm.reset();eventsGroup.style.display='none';submitBtn.disabled=false;submitBtn.textContent='Submit RSVP';petals(30);setTimeout(function(){status.style.display='none'},8000)}).catch(function(err){status.className='rsvp-status error';status.textContent='Sorry, there was an error submitting your RSVP. Please try again or contact us directly.';submitBtn.disabled=false;submitBtn.textContent='Submit RSVP';setTimeout(function(){status.style.display='none'},8000)})})}
})();
