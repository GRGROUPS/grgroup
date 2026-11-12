/* GR GROUP · interfaz común de los recorridos 3D.
   Cada casa define window.TOUR = {levels:[{n, plan, rooms}], stops:[...]} en recorrido/GR-xxx/plan.js
   y la página (generada por tools/build.py) define window.TOUR_META = {code, name, precio, url, fotos}. */
(function(){
var T=window.TOUR, M=window.TOUR_META, levels=T.levels, stops=T.stops, F=M.fotos;
var $=function(i){return document.getElementById(i)}, cur=0, lvl=-1, labs=[], auto=false, timer=0;
function stopAuto(){if(!auto) return; auto=false; clearTimeout(timer); $('auto').setAttribute('aria-pressed','false'); $('auto').textContent='Ver casa completa'}
function queue(){clearTimeout(timer); timer=setTimeout(function(){if(!auto) return; if(cur===stops.length-1){stopAuto(); show(0)} else show(cur+1)},3600)}
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

function show(i,instant){
  cur=(i+stops.length)%stops.length; var s=stops[cur], g=s, k, L=s.lvl||0;
  if(s.v&&innerHeight>innerWidth){g={}; for(k in s) g[k]=s[k]; for(k in s.v) g[k]=s.v[k];} // ajustes para pantalla vertical
  if(L!==lvl){ // cambia de planta: se reconstruye la maqueta y la cámara salta
    var first=lvl<0; lvl=L; if(!first) v.setPlan(levels[L].plan); setLabels(); instant=true;
    if(!first){var c=$('c'); c.classList.remove('sw'); void c.offsetWidth; c.classList.add('sw');}
  }
  v.goTo(g,instant);
  $('capT').textContent=s.n; $('capD').textContent=s.d;
  Array.prototype.forEach.call($('stops').children,function(b,j){
    if(j===cur){b.setAttribute('aria-current','true'); if(b.scrollIntoView&&!instant) b.scrollIntoView({block:'nearest',inline:'center',behavior:'smooth'});}
    else b.removeAttribute('aria-current');
  });
  var th=$('th'); th.textContent='';
  (s.f||[]).forEach(function(n){
    var b=document.createElement('button'); b.type='button'; b.setAttribute('aria-label','Ampliar foto real de '+s.n);
    var im=new Image(); im.src=F+n+'.jpg'; im.alt='Foto real: '+s.n; im.loading='lazy'; b.appendChild(im);
    b.onclick=function(){$('dimg').src=F+n+'.jpg';$('dimg').alt='Foto real: '+s.n;$('dcap').textContent='Foto real: '+s.n;$('dlg').showModal()};
    th.appendChild(b);
  });
  $('foto').hidden=!(s.f&&s.f.length);
  if(cur>0) $('hint').classList.add('off');
}
stops.forEach(function(s,i){var b=document.createElement('button');b.type='button';b.textContent=s.n;b.onclick=function(){stopAuto();show(i)};$('stops').appendChild(b)});
$('furn').onclick=function(){var on=this.getAttribute('aria-pressed')!=='true';this.setAttribute('aria-pressed',on);v.setFurniture(on)};
$('auto').onclick=function(){
  if(auto){stopAuto();return}
  auto=true; this.setAttribute('aria-pressed','true'); this.textContent='Detener'; $('hint').classList.add('off');
  show(cur===stops.length-1?0:cur+1);
};
function toast(t){var e=$('toast'); e.textContent=t; e.classList.add('on'); setTimeout(function(){e.classList.remove('on')},2200)}
$('share').onclick=function(){
  var txt='Mira el recorrido 3D de esta casa: '+M.name+' ('+M.precio+')';
  if(navigator.share){navigator.share({title:document.title,text:txt,url:M.url}).catch(function(){});return}
  if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(M.url).then(function(){toast('Enlace copiado')},function(){toast(M.url)});
  else toast(M.url);
};
$('zin').onclick=function(){v.zoom(.85)}; $('zout').onclick=function(){v.zoom(1.18)};
$('dlg').addEventListener('click',function(e){if(e.target===this)this.close()});
document.addEventListener('keydown',function(e){
  if($('dlg').open) return;
  if(e.key==='ArrowRight'){stopAuto();show(cur+1)} else if(e.key==='ArrowLeft'){stopAuto();show(cur-1)}
});
setTimeout(function(){$('hint').classList.add('off')},6000);
show(0,true);
window.__visor={show:show,v:v};
if(/[?&]auto\b/.test(location.search)) setTimeout(function(){$('auto').click()},1200);
})();
