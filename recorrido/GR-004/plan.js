/* Departamento Colibrí 10 (56.25 m²). Plano tomado de la ficha del modelo; medidas aproximadas.
   Metros. x = ancho, z = fondo desde el acceso. */
(function(){
// fotos: porcelanato gris claro grande, muros blancos, puertas y cocina de encino claro con marcos negros,
// lambrín de listones de madera, persiana enrollable blanca en el ventanal, mueble flotante blanco de TV
var T='#d9d5cd', DOOR='#b98d60', WOODC='#cfae84';
var slats=[], k; for(k=0;k<12;k++) slats.push([7.12+k*.068,0,.08,7.16+k*.068,2.55,.13,'#c79f72',{mat:6}]);
var plan={
  sky:'#e9eef1', center:[4.7,0,3.2], frame:'#34363a', tile:.6, gloss:.6, wallOut:'#eceae5', wallMat:14, wallIn:'#f4f3ef', zoclo:'#e4e1da',
  ground:[
    [-9,-0.09,-9,19,16,'#d9dcde',0],
    [-3.2,-0.06,-1.2,1.28,3.0,'#8fae6b',2]
  ],
  floors:[
    [1.35,0,9.35,3.0,T],[5.9,3.0,7.36,3.86,T],[7.36,3.0,9.35,4.24,T],
    [0,3.0,2.95,6.44,T],[2.95,3.0,5.9,6.44,T],[5.9,3.86,7.36,6.44,'#e6e4de'],[7.36,4.24,9.35,6.44,'#dcd9d2']
  ],
  ceilings:[[1.35,0,9.35,3.0],[5.9,3.0,7.36,3.86],[7.36,3.0,9.35,4.24],[0,3.0,2.95,6.44],[2.95,3.0,5.9,6.44],[5.9,3.86,7.36,6.44],[7.36,4.24,9.35,6.44]],
  walls:[
    {ax:'x',c:0,from:1.35,to:9.35,t:.15,h:2.7,open:[{from:6.1,to:7.0,head:2.1,kind:'door',hinge:'to',ang:0,color:DOOR,mat:6,marco:'#1f2023'}]},
    {ax:'z',c:1.35,from:0,to:3.0,t:.15,h:2.7,open:[{from:.55,to:2.45,sill:.05,head:2.2,kind:'window',blind:.3,roller:1,blindColor:'#eeece6'}]},
    {ax:'x',c:3.0,from:0,to:5.9,t:.15,h:2.7,open:[
      {from:1.5,to:2.3,head:2.1,kind:'gap'},
      {from:3.85,to:4.65,head:2.1,kind:'gap'}]},
    {ax:'z',c:0,from:3.0,to:6.44,t:.15,h:2.7,open:[{from:4.5,to:5.8,sill:.95,head:2.1,kind:'window'}]},
    {ax:'x',c:6.44,from:0,to:9.35,t:.15,h:2.7,open:[
      {from:3.9,to:5.2,sill:.95,head:2.1,kind:'window'},
      {from:6.35,to:6.95,sill:1.6,head:2.1,kind:'window',mid:false},
      {from:7.9,to:9.0,sill:1.1,head:2.1,kind:'window',blind:.55,blindColor:'#f4f4f2'}]},
    {ax:'z',c:9.35,from:0,to:6.44,t:.15,h:2.7,open:[
      {from:2.7,to:3.8,sill:1.15,head:2.1,kind:'window'},
      {from:4.8,to:5.9,sill:1.15,head:2.1,kind:'window'}]},
    {ax:'z',c:2.95,from:3.0,to:6.44},
    {ax:'z',c:5.9,from:3.0,to:6.44},
    {ax:'x',c:3.86,from:5.9,to:7.36,open:[{from:6.25,to:7.0,head:2.1,kind:'gap'}]},
    {ax:'z',c:7.36,from:3.86,to:6.44},
    {ax:'x',c:4.24,from:7.36,to:9.35,open:[{from:7.5,to:8.25,head:2.1,kind:'gap'}]}
  ],
  boxes:slats,
  items:[
    // cocina integral y barra, como en las fotos
    ['barra',9.27,2.0,-90,{len:3.5,estufa:-.6,tarja:.75,altos:[[-1.7,-1.0],[-.2,.4]],color:WOODC,mat:6,cubierta:'#ecebe7'}],
    ['barra',7.3,1.25,90,{len:1.8,copete:false,color:WOODC,mat:6,cubierta:'#ecebe7'}],
    ['refri',7.86,4.14,180,{s:1}],
    ['regadera',5.98,6.36,90,{w:.9,d:1.3}],['wc',5.97,4.85,90],['tocadorF',7.29,4.55,-90,{w:.7,color:WOODC,cubierta:'#ecebe7'}],
    ['lavadero',8.8,6.36,180],
    ['plafon',3.2,1.5,0],['plafon',5.6,1.5,0],['plafon',8.4,2.0,0],['plafon',1.5,4.8,0],['plafon',4.4,4.8,0],['plafon',6.6,5.1,0],['plafon',8.4,5.3,0],
    // sugeridos
    ['lavadora',7.85,6.36,180,{s:1}],
    ['tapete',3.0,1.45,0,{s:1,w:2.2,d:1.5,color:'#b9b4ab',color2:'#a6a199'}],['sofa',3.0,.55,0,{s:1,w:1.9,color:'#cdc6ba',color2:'#d9d3c8',accent:'#8c9a8a'}],['mesaCentro',3.0,1.6,0,{s:1}],
    ['tv',3.08,2.92,180,{s:1,w:1.6,color:'#f4f3f0'}],['planta',1.75,2.65,0,{s:1}],
    ['mesa',5.35,1.55,0,{s:1,w:.95,d:.95}],['silla',5.35,.9,0,{s:1,color:'#d9d2c4'}],['silla',5.35,2.2,180,{s:1,color:'#d9d2c4'}],['silla',4.7,1.55,90,{s:1,color:'#d9d2c4'}],['silla',6.0,1.55,-90,{s:1,color:'#d9d2c4'}],
    ['silla',7.0,.85,90,{s:1}],['silla',7.0,1.65,90,{s:1}],
    ['cama',1.12,4.15,90,{s:1,w:.95,manta:'#c9b18f'}],['cama',1.12,5.8,90,{s:1,w:.95,manta:'#c9b18f'}],['buro',.32,4.98,90,{s:1}],
    ['closet',2.87,4.25,-90,{s:1,w:1.5}],
    ['cama',4.05,4.75,90,{s:1,w:1.5,manta:'#6f8794'}],['buro',3.25,3.75,90,{s:1}],['buro',3.25,5.75,90,{s:1,lampara:false}],
    ['closet',5.82,4.15,-90,{s:1,w:1.5}]
  ]
};
var stops=[
  {n:'Vista general',d:'Departamento de 56.25 m² con 2 recámaras, 1 baño y área de servicio.',t:[4.7,.2,3.2],yaw:.55,pitch:.95,dist:21,fov:.62,f:[],v:{dist:27}},
  {n:'Sala',d:'Sala con ventanal corredizo hacia el jardín.',t:[6.2,1.55,2.5],yaw:-1.9,pitch:.2,dist:.01,fov:1.15,f:[2,1]},
  {n:'Comedor',d:'Comedor junto a la barra de la cocina.',t:[1.9,1.55,.45],yaw:1.3,pitch:.2,dist:.01,fov:1.15,f:[1]},
  {n:'Cocina',d:'Cocina integral con barra desayunadora.',t:[6.5,1.55,2.75],yaw:1.95,pitch:.3,dist:.01,fov:1.2,f:[3]},
  {n:'Recámara 1',d:'Recámara con ventana y espacio para dos camas individuales.',t:[2.55,1.55,6.05],yaw:-2.25,pitch:.3,dist:.01,fov:1.2,f:[]},
  {n:'Recámara 2',d:'Recámara principal con ventana al fondo.',t:[5.5,1.55,6.05],yaw:-2.25,pitch:.3,dist:.01,fov:1.2,f:[]},
  {n:'Baño',d:'Baño completo con regadera.',t:[6.62,1.6,3.3],yaw:0,pitch:.5,dist:.01,fov:1.15,f:[]},
  {n:'Área de servicio',d:'Cuarto de lavado con lavadero y ventilación.',t:[7.62,1.55,4.5],yaw:.55,pitch:.35,dist:.01,fov:1.25,f:[4,5]}
];
var rooms=[['Sala',3.0,1.5],['Comedor',5.4,1.5],['Cocina',8.4,2.0],['Recámara 1',1.5,4.8],['Recámara 2',4.4,4.8],['Baño',6.6,5.2],['Servicio',8.4,5.4]];
/* ---------- Edificio: 5 pisos, 2 departamentos por piso, ventanas a la calle ----------
   PISO y LADO marcan el departamento disponible (se resalta en la fachada y el recorrido entra a ese piso). */
var PISOS=[3,4], LADO=0, PISO=PISOS[0]; // pisos con depa disponible; LADO 0 = izquierda viendo desde la calle, 1 = derecha
var FH=2.9, NP=5, BW=21, BD=11, CX0=9.4, CX1=11.6;
/* diseño tomado del video de Gran Valle: fachada blanca con juntas marcadas, módulos blancos que sobresalen con
   ventanas de marco grueso, módulos hundidos color arena, remate plano; pérgola de madera, bugambilias, agaves y muro de piedra */
var BL='#d8d7d3', BL2='#cbcac6', JN='#bdbcb8', AR='#b39d86', AR2='#c9b6a0', VID='#2e3238', MAR='#3a3a3c', MAD='#7a5536', NAR='#f08a2c', LUZ='#ffd9a0';
var eb=[], y, p, u, k, H=NP*FH;
/* columnas grises que sobresalen, con la esquina en ángulo (se arma en escalones) y una ranura profunda a un lado
   donde va la ventana; entre ellas, el módulo color arena hundido con ventana y cejita; el cubo de escalera al centro */
function columna(xa,xb,ladoRanura){ // ladoRanura: +1 la ranura queda del lado xb, -1 del lado xa
  var r=1.15, sa=ladoRanura>0?xa:xa+r, sb=ladoRanura>0?xb-r:xb;
  eb.push([sa,0,-.75,sb,H+.9,BD,BL,{mat:14}]);
  /* esquina en ángulo: escalones de la cara frontal hacia el lado contrario a la ranura */
  var e=ladoRanura>0?sa:sb, d=ladoRanura>0?1:-1;
  eb.push([Math.min(e,e-d*.25),0,-.55,Math.max(e,e-d*.25),H+.9,BD,BL2,{mat:14}]);
  /* fondo de la ranura (más atrás) */
  var ra=ladoRanura>0?xb-r:xa, rb=ladoRanura>0?xb:xa+r;
  eb.push([ra,0,-.05,rb,H+.9,BD,BL2,{mat:14}]);
  return [ra,rb];
}
var ran=[];
for(u=0;u<2;u++){ var m=function(a,b){return u?[BW-b,BW-a]:[a,b];};
  var c1=m(0,3.3), c2=m(6.3,CX0), ar=m(3.3,6.3);
  ran.push(columna(c1[0],c1[1],u?-1:1), columna(c2[0],c2[1],u?1:-1));
  eb.push([ar[0],0,0,ar[1],H+.9,BD,AR,{mat:14}]);
}
eb.push([CX0,0,.35,CX1,H+1.6,BD-.35,'#e6e5e1',{mat:14}]);
/* juntas horizontales en las columnas */
for(k=1;k<NP*2;k++){ y=k*FH/2; [[0,2.15],[7.45,CX0],[CX1,BW-7.45],[BW-2.15,BW]].forEach(function(r){ eb.push([r[0],y-.015,-.77,r[1],y+.015,-.74,JN]); }); }
function vidrio(x0,x1,y0,y1,z,hot){
  eb.push([x0,y0,z-.03,x1,y1,z+.01,MAR],[x0+.05,y0+.05,z-.05,x1-.05,y1-.05,z-.02,hot?LUZ:VID,{mat:hot?9:16}],[x0+(x1-x0)/2-.02,y0+.05,z-.07,x0+(x1-x0)/2+.02,y1-.05,z-.04,MAR]);
}
for(p=0;p<NP;p++){ y=p*FH;
  for(u=0;u<2;u++){ var m2=function(a,b){return u?[BW-b,BW-a]:[a,b];}, hot=(PISOS.indexOf(p+1)>=0&&u===LADO), q, i;
    /* ventanas metidas en la ranura de cada columna */
    for(i=0;i<2;i++){ var R=ran[u*2+i]; vidrio(R[0]+.08,R[1]-.08,y+.95,y+2.15,-.05,hot);
      eb.push([R[0],y+.8,-.75,R[1],y+.95,-.05,BL2,{mat:14}]); }
    /* módulo arena: ventana con cejita que sobresale */
    q=m2(4.0,5.6); vidrio(q[0],q[1],y+.95,y+2.15,0,hot);
    q=m2(3.3,6.3); eb.push([q[0],y+2.35,-.35,q[1],y+2.47,0,AR2,{mat:14}]);
    if(hot){ var f=m2(-.12,CX0+.05);
      eb.push([f[0],y+.12,-1.0,f[1],y+.24,-.9,NAR,{mat:9}],[f[0],y+FH-.06,-1.0,f[1],y+FH+.06,-.9,NAR,{mat:9}],
              [f[0],y+.12,-1.0,f[0]+.12,y+FH+.06,-.9,NAR,{mat:9}],[f[1]-.12,y+.12,-1.0,f[1],y+FH+.06,-.9,NAR,{mat:9}]); }
  }
  eb.push([BW/2-.35,y+1.4,.31,BW/2+.35,y+2.1,.36,VID,{mat:16}]);
}
/* acceso al cubo de escalera */
eb.push([CX0+.3,0,.3,CX1-.3,2.3,.36,VID,{mat:16}],[CX0-.2,2.45,-1.2,CX1+.2,2.6,.36,MAR]);
/* lado y fondo: ventanas sencillas */
for(p=0;p<NP;p++){ y=p*FH; [[2,3.1],[6.5,7.6]].forEach(function(w){
  eb.push([-.04,y+1.0,w[0],.0,y+2.1,w[1],VID,{mat:16}],[BW,y+1.0,w[0],BW+.04,y+2.1,w[1],VID,{mat:16}]);
  eb.push([w[0]+1,y+1.0,BD,w[1]+1,y+2.1,BD+.04,VID,{mat:16}],[BW-w[1]-1,y+1.0,BD,BW-w[0]-1,y+2.1,BD+.04,VID,{mat:16}]); }); }
/* pérgola de madera con techo, como en el video */
(function(x0,z0){ var t=.16, W=3.4, D=3.4, h=2.5;
  [[0,0],[W-t,0],[0,D-t],[W-t,D-t]].forEach(function(c){ eb.push([x0+c[0],0,z0+c[1],x0+c[0]+t,h,z0+c[1]+t,MAD,{mat:6}]); });
  eb.push([x0-.15,h,z0-.15,x0+W+.15,h+.18,z0+D+.15,MAD,{mat:6}],[x0-.35,h+.18,z0-.35,x0+W+.35,h+.3,z0+D+.35,'#5b4a3c',{mat:6}],
          [x0+.4,h+.3,z0+.4,x0+W-.4,h+.62,z0+D-.4,'#4c4038',{mat:6}],[x0+.3,0,z0-.6,x0+W-.3,1.05,z0+.1,'#8a6a4a',{mat:6}],[x0+.2,1.05,z0-.7,x0+W-.2,1.12,z0+.2,'#6b4f3a',{mat:6}]);
})(1.2,-6.0);
/* bugambilias, agaves, muro de piedra y postes de luz */
[[.8,-2.2],[5.0,-1.9],[13.5,-2.1],[19.8,-2.0]].forEach(function(b){ eb.push([b[0]-.5,0,b[1]-.4,b[0]+.5,1.1,b[1]+.4,'#4f7a3a',{mat:2}],[b[0]-.45,.75,b[1]-.45,b[0]+.4,1.35,b[1]+.35,'#e98a6a',{mat:7}],[b[0]-.2,1.1,b[1]-.3,b[0]+.3,1.5,b[1]+.2,'#d9707f',{mat:7}]); });
[[3.2,-1.1],[8.2,-1.2],[16.5,-1.1]].forEach(function(a){ for(k=0;k<5;k++){ var dx=Math.cos(k*1.26)*.28, dz=Math.sin(k*1.26)*.28; eb.push([a[0]+dx-.07,0,a[1]+dz-.07,a[0]+dx+.07,.75,a[1]+dz+.07,'#6f8f62',{mat:2}]); } });
eb.push([-6,0,-8.4,-.6,1.4,-1.2,'#8e8476',{mat:12}],[BW+.6,0,-1.2,BW+6,1.6,BD+6,'#8e8476',{mat:12}]);
[[-1,-4.6],[11,-4.6],[23,-4.6]].forEach(function(l){ eb.push([l[0],0,l[1],l[0]+.12,6.5,l[1]+.12,'#5d6166'],[l[0],6.4,l[1]-.9,l[0]+.12,6.5,l[1]+.12,'#5d6166'],[l[0]-.12,6.25,l[1]-1.1,l[0]+.24,6.4,l[1]-.75,'#f4f1e6',{mat:9}]); });
/* otros edificios del fraccionamiento al fondo */
[[-26,8,-14,22],[30,4,38,16],[-8,28,8,38],[14,30,30,40]].forEach(function(t){
  eb.push([t[0],0,t[1],t[2],H+.6,t[3],BL,{mat:14}]);
  for(p=0;p<NP;p++) for(k=t[0]+1;k<t[2]-1;k+=2.4) eb.push([k,p*FH+1,t[1]-.04,k+1.1,p*FH+2.1,t[1],VID,{mat:16}]); });
/* amenidades: alberca, camastros, gimnasio */
eb.push([1.5,-.02,15,13.5,.12,22.5,'#e7e3da',{mat:19}],[2.2,-.3,15.7,12.8,.08,21.8,'#3fa6c9',{mat:16}],
        [15,0,14.5,20.5,3.0,21,BL,{mat:14}],[15,.4,14.46,20.5,2.6,14.5,VID,{mat:16}],[15,3.0,14.5,20.5,3.15,21,'#d9d6cf',{mat:3}]);
for(k=0;k<4;k++) eb.push([3+k*2.4,0,23.2,4.6+k*2.4,.35,24,'#f2f0ea',{mat:7}]);
var edif={
  sky:'#cfe2f3', center:[BW/2,0,BD/2+3], frame:'#2b2b2d', tile:0, gloss:.2, wallOut:BL, wallMat:14, wallIn:BL, zoclo:BL,
  ground:[
    [-20,-0.09,-30,42,40,'#8fae6b',2],
    [-20,-0.06,-14,42,-6.5,'#6d6f72',0],
    [-20,-0.03,-6.5,42,-4.8,'#cfccc5',3],
    [-6,-0.035,-8.4,BW+6,0,'#6f6d6a',12],[-1,-0.03,-1.2,BW+1,0,'#cfccc5',3],[1.0,-0.03,-6.4,4.8,-2.4,'#cfccc5',3],[CX0,-0.025,-4.8,CX1,-1.6,'#bdb8ad',3],
    [0,-0.03,BD,BW,27,'#9cb97a',2],[1,-0.025,BD,3,15,'#cfccc5',3]
  ],
  floors:[[CX0,0,CX1,BD,'#d9d6cf',3]],
  ceilings:[], walls:[], boxes:eb, items:[]
};
var ux=LADO?(CX1+(BW-CX1)/2):(CX0/2), uy=(PISO-1)*FH, NOM=PISOS.length>1?'pisos '+PISOS.join(' y '):'piso '+PISO;
var pre=[
  {n:'El edificio',d:'Torre de 5 pisos del fraccionamiento Gran Valle, con 2 departamentos por piso y ventanas a la calle; pérgola, áreas verdes, alberca y gimnasio.',lvl:0,t:[BW/2,7.5,2],yaw:-.45,pitch:.12,dist:33,fov:.75,f:[6],v:{dist:31}},
  {n:'Disponibles: '+NOM,d:'Quedan los departamentos de los '+NOM+', marcados en naranja; los dos son el mismo modelo. Entremos.',lvl:0,t:[ux,uy+FH*(PISOS.length>1?1:.5),0],yaw:LADO?.25:-.25,pitch:.04,dist:15,fov:.7,f:[],v:{dist:20}}
];
/* el depa está en un piso alto: el ventanal de la sala da al vacío, con barandal, y el jardín queda abajo */
var hy=-uy-.1;
plan.ground=[[-30,hy,-30,40,36,'#8fae6b',2],[-30,hy+.03,-30,40,-6,'#6d6f72',0]];
plan.boxes=plan.boxes.concat([[1.2,0,.6,1.24,1.0,2.4,'#2b2b2d'],[1.2,.98,.6,1.3,1.03,2.4,'#2b2b2d'],[-.2,-.25,-.2,9.6,0,6.7,'#d9d6cf',{mat:3}]]);
stops.forEach(function(s){ s.lvl=1; });
stops[0].d='Departamento de 56.25 m² (disponible en los '+NOM+'): 2 recámaras, 1 baño y área de servicio.';
stops[1].d='Sala con ventanal y barandal; en piso alto, con vista al conjunto.';
window.TOUR={levels:[{n:'Edificio',plan:edif,rooms:[]},{n:'Departamento',plan:plan,rooms:rooms}],stops:pre.concat(stops)};
})();
