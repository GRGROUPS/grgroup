/* GR GROUP · interfaz común de los recorridos 3D.
   Cada casa define window.TOUR = {levels:[{n, plan, rooms}], stops:[...]} en recorrido/GR-xxx/plan.js
   y la página (generada por tools/build.py) define window.TOUR_META = {code, name, precio, url, fotos}. */
(function(){
var T=window.TOUR, M=window.TOUR_META, levels=T.levels, stops=T.stops, F=M.fotos;
var $=function(i){return document.getElementById(i)}, cur=0, lvl=-1, labs=[], auto=false, timer=0;
// velocidad del recorrido automático: cambia la pausa en cada espacio y lo que tarda la cámara en moverse
var VEL=[.5,.75,1,1.5,2], vi=2; try{var vs=+localStorage.getItem('grVel'); if(VEL.indexOf(vs)>=0) vi=VEL.indexOf(vs)}catch(e){}
function setVel(d){vi=Math.max(0,Math.min(VEL.length-1,vi+d)); var v=VEL[vi]; $('vtxt').textContent=(v===.5?'½':v===.75?'¾':v===1.5?'1½':v)+'×';
  $('vmenos').disabled=vi===0; $('vmas').disabled=vi===VEL.length-1; try{localStorage.setItem('grVel',v)}catch(e){}
  if(auto) queue()}
function stopAuto(){if(!auto) return; auto=false; clearTimeout(timer); $('auto').setAttribute('aria-pressed','false'); $('auto').textContent='▶ Empezar recorrido'}
function queue(){clearTimeout(timer); timer=setTimeout(function(){if(!auto) return; if(cur===stops.length-1){stopAuto(); show(0)} else show(cur+1)},3600/VEL[vi])}
function setLabels(){
  $('labels').textContent=''; labs=[];
  (levels[lvl].rooms||[]).forEach(function(r){var e=document.createElement('div');e.className='lab';e.textContent=r[0];e.style.opacity=0;$('labels').appendChild(e);labs.push(e)});
}

var v=GRVisor($('c'),levels[stops[0].lvl||0].plan,{
  onFail:function(){$('fail').hidden=false},
  onTouch:function(){$('hint').classList.add('off');stopAuto()},
  onArrive:function(){if(auto) queue()},
  onFrame:function(api){
    var high=api.eye()[1]>4&&api.pitch()>.5, rooms=levels[lvl<0?0:lvl].rooms||[];
    labs.forEach(function(e,i){
      var r=rooms[i], p=high&&r?api.project([r[1],2.6,r[2]]):null;
      e.style.opacity=p?1:0;
      if(p) e.style.transform='translate(-50%,-50%) translate('+p[0].toFixed(1)+'px,'+p[1].toFixed(1)+'px)';
    });
  }
});
if(!v) return;
function inset(){var d=document.querySelector('.dock'); if(d) v.setInset((innerHeight-d.getBoundingClientRect().top)/innerHeight)}
addEventListener('resize',inset);

function show(i,instant){
  cur=(i+stops.length)%stops.length; var s=stops[cur], g=s, k, L=s.lvl||0;
  if(s.v&&innerHeight>innerWidth){g={}; for(k in s) g[k]=s[k]; for(k in s.v) g[k]=s.v[k];} // ajustes para pantalla vertical
  if(L!==lvl){ // cambia de planta: se reconstruye la maqueta y la cámara salta
    var first=lvl<0; lvl=L; if(!first) v.setPlan(levels[L].plan); setLabels(); instant=true;
    if(!first){var c=$('c'); c.classList.remove('sw'); void c.offsetWidth; c.classList.add('sw');}
  }
  if(auto){if(g===s){g={}; for(k in s) g[k]=s[k];} g.ms=(s.ms||1400)/Math.sqrt(VEL[vi]);}
  v.goTo(g,instant);
  setTimeout(inset,0);
  $('capT').textContent=s.n; $('capD').textContent=s.d;
  $('capB').hidden=!s.badge; $('capB').textContent=s.badge||'';
  if(history.replaceState&&!instant) history.replaceState(null,'',location.pathname+location.search+(cur>0?'#'+slug(s.n):''));
  Array.prototype.forEach.call($('stops').children,function(b,j){
    if(j===cur){b.setAttribute('aria-current','true'); if(b.scrollIntoView&&!instant) b.scrollIntoView({block:'nearest',inline:'center',behavior:'smooth'});}
    else b.removeAttribute('aria-current');
  });
  var th=$('th'), fl=s.f||[]; th.textContent='';
  fl.forEach(function(n,j){
    var b=document.createElement('button'); b.type='button'; b.setAttribute('aria-label','Ampliar foto real de '+s.n);
    var im=new Image(); im.src=F+n+'.jpg'; im.alt='Foto real: '+s.n; im.loading='lazy'; b.appendChild(im);
    b.onclick=function(){verFoto(s.n,fl,j);$('dlg').showModal()};
    th.appendChild(b);
  });
  $('fn').textContent='📷 Foto real'+(fl.length>1?' · '+fl.length:'');
  $('foto').hidden=!fl.length;
  $('capD').classList.remove('full');
  if(cur>0) $('hint').classList.add('off');
}
stops.forEach(function(s,i){var b=document.createElement('button');b.type='button';b.textContent=s.n;b.onclick=function(){stopAuto();show(i)};$('stops').appendChild(b)});
$('furn').onclick=function(){var on=this.getAttribute('aria-pressed')!=='true';this.setAttribute('aria-pressed',on);v.setFurniture(on)};
$('vmenos').onclick=function(){setVel(-1)}; $('vmas').onclick=function(){setVel(1)}; setVel(0);
$('auto').onclick=function(){
  if(auto){stopAuto();return}
  auto=true; this.setAttribute('aria-pressed','true'); this.textContent='❚❚ Detener'; $('hint').classList.add('off');
  show(cur===stops.length-1?0:cur+1);
};
function verFoto(nom,fl,j){ j=(j+fl.length)%fl.length;
  $('dimg').src=F+fl[j]+'.jpg'; $('dimg').alt='Foto real: '+nom;
  $('dcap').textContent='Foto real: '+nom+(fl.length>1?' ('+(j+1)+' de '+fl.length+')':'');
  var nx=$('dnext'); nx.hidden=fl.length<2; nx.onclick=function(){verFoto(nom,fl,j+1)};
}
$('capD').onclick=function(){this.classList.toggle('full')};
function slug(t){return String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function toast(t){var e=$('toast'); e.textContent=t; e.classList.add('on'); setTimeout(function(){e.classList.remove('on')},2200)}
$('share').onclick=function(){
  var s=stops[cur], u=M.url+(cur>0?'#'+slug(s.n):'');
  var txt=cur>0?'Mira «'+s.n+'» en el recorrido 3D de '+M.name+' ('+M.precio+')':'Mira el recorrido 3D de esta casa: '+M.name+' ('+M.precio+')';
  if(navigator.share){navigator.share({title:document.title,text:txt,url:u}).catch(function(){});return}
  if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(u).then(function(){toast('Enlace copiado')},function(){toast(u)});
  else toast(u);
};
$('zin').onclick=function(){v.zoom(.85)}; $('zout').onclick=function(){v.zoom(1.18)};
$('dlg').addEventListener('click',function(e){if(e.target===this)this.close()});
document.addEventListener('keydown',function(e){
  if($('dlg').open) return;
  if(e.key==='ArrowRight'){stopAuto();show(cur+1)} else if(e.key==='ArrowLeft'){stopAuto();show(cur-1)}
});
setTimeout(function(){$('hint').classList.add('off')},6000);
var h0=0, hs=decodeURIComponent((location.hash||'').slice(1));
if(hs) stops.forEach(function(s,i){ if(slug(s.n)===hs) h0=i; });
show(h0,true);
if(h0){var cb=$('stops').children[h0]; setTimeout(function(){cb.scrollIntoView({block:'nearest',inline:'center'})},50);}
window.__visor={show:show,v:v};
if(/[?&]auto\b/.test(location.search)) setTimeout(function(){$('auto').click()},1200);
})();
