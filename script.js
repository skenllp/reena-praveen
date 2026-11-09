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
var wall=document.getElementById('wall'),K='rp-wishes',list=[];
try{list=JSON.parse(localStorage.getItem(K)||'[]')}catch(e){list=[]}
function esc(s){return s.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function draw(){wall.innerHTML=list.length?list.map(function(w){return '<div class="w"><p>&ldquo;'+esc(w.t)+'&rdquo;</p><small>'+esc(w.n)+'</small></div>'}).join(''):'<div class="empty">Be the first to leave a wish below.</div>'}
draw();
document.getElementById('send').addEventListener('click',function(){var n=document.getElementById('wn').value.trim(),t=document.getElementById('wt').value.trim();
if(!n||!t){alert('Please add your name and a wish.');return}
list.unshift({n:n,t:t});try{localStorage.setItem(K,JSON.stringify(list))}catch(e){}
draw();document.getElementById('wn').value='';document.getElementById('wt').value='';petals(20);wall.scrollIntoView({behavior:'smooth',block:'center'})});
})();
