/* Casa en Bolaños (dos niveles y terraza, sobre calle principal, en loma). No hay plano ni medidas en la ficha: la distribución
   se armó con las fotos y la ficha; medidas aproximadas, distribución aprobada por Iñaki.
   Metros. x = ancho visto desde la calle, z = fondo. La calle queda en z negativo. */
(function(){
// fotos: fachada de estuco gris con ventanas de aluminio y puerta blanca de herrería, loseta color arena, sala con arco,
// cocina de madera clara con cubierta de granito negro y estufa de 4 quemadores, escalera con escalones de loseta,
// recámara con clóset de madera oscura y puerta corrediza a la terraza, terraza con pretil de herrería y vista a la barranca
var T='#d9c5a6', EXT='#b8b3a8', BLANCO='#f1f1ee', VID='#2b3540', CLO='#4a2f2a';
var baja={
  sky:'#d7e3ee', center:[3,0,4.2], frame:'#e8e8e6', tile:.33, gloss:.4, wallOut:EXT, wallMat:14, wallIn:'#f0ede4', zoclo:'#cdbfaa',
  ground:[
    [-10,-0.09,-16,17,24,'#8fae6b',2],
    [-10,-0.06,-16,17,-1.6,'#6d6f72',0],
    [-10,-0.03,-1.6,17,0,'#cfccc5',3]
  ],
  floors:[[0,0,6,8.4,T]],
  ceilings:[[0,0,6,3.6],[0,3.6,5.0,6.2],[5.9,3.6,6,6.2],[0,6.2,6,8.4]],
  walls:[
    /* fachada: puerta blanca de herrería y ventana de aluminio */
    {ax:'x',c:0,from:0,to:6,t:.18,h:2.7,out:-1,open:[
      {from:.6,to:1.6,head:2.15,kind:'door',hinge:'from',ang:0,color:BLANCO,mat:16},
      {from:2.5,to:3.8,sill:1.2,head:2.0,kind:'window'}]},
    {ax:'z',c:0,from:0,to:8.4,t:.18,h:2.7},
    {ax:'z',c:6,from:0,to:8.4,t:.18,h:2.7},
    {ax:'x',c:8.4,from:0,to:6,t:.18,h:2.7,open:[{from:1.0,to:2.2,sill:1.0,head:2.0,kind:'window'}]},
    /* sala | cocina, baño y escalera (con arco) */
    {ax:'x',c:3.6,from:0,to:6,open:[
      {from:.6,to:2.4,head:2.3,kind:'gap'},
      {from:3.7,to:4.5,head:2.1,kind:'door',hinge:'from',ang:0,color:'#eeece6',mat:6},
      {from:5.0,to:5.9,head:2.3,kind:'gap'}]},
    {ax:'z',c:3.4,from:3.6,to:6.2},
    {ax:'z',c:4.9,from:3.6,to:6.2,open:[]},
    {ax:'x',c:6.2,from:0,to:4.9,open:[{from:1.0,to:1.8,head:2.1,kind:'door',hinge:'from',ang:0,color:'#eeece6',mat:6}]}
  ],
  boxes:[
    /* planta alta y terraza vistas desde la calle (se ocultan al quitar el techo) */
    [-.075,2.7,-.075,6.075,5.4,6.275,EXT,{mat:34}],
    [.6,3.3,-.09,2.0,4.3,-.075,VID,{mat:10}],[4.2,3.3,-.09,5.5,4.3,-.075,VID,{mat:10}],
    [-.075,5.4,-.075,6.075,6.4,.0,'#ecebe7',{mat:34}]
  ],
  items:[
    /* sala-comedor */
    ['tv',.08,1.8,90,{w:1.5}],['tapete',1.8,1.8,90,{s:1,w:2.2,d:1.7,color:'#6f6259',color2:'#5f534b'}],['sofa',3.15,1.8,-90,{s:1,w:2.0,color:'#7f8c99',color2:'#93a0ad'}],['mesaCentro',1.8,1.8,90,{s:1}],
    ['mesa',4.6,2.6,0,{s:1,w:.9,d:1.4}],['silla',4.6,1.9,0,{s:1}],['silla',4.6,3.3,180,{s:1}],['silla',3.95,2.6,90,{s:1}],['silla',5.3,2.6,-90,{s:1}],
    /* cocina: madera clara, granito negro, estufa */
    ['barra',.08,4.9,90,{len:2.2,estufa:.4,tarja:-.5,color:'#b8a58c',mat:6,cubierta:'#1c1c1e',altos:[[-.9,-.2],[.2,.9]]}],['refri',2.9,6.12,180],
    /* baño */
    ['regadera',4.4,6.12,180,{w:.95,d:.9}],['wc',4.82,4.9,-90],['lavabo',4.82,4.3,-90],
    /* escalera con escalones de loseta */
    ['escalera',5.45,3.6,0,{w:.9,n:12,huella:.22,alto:2.8,mat:1,color:'#b9714f',barandal:-1}],
    /* recámara 1 */
    ['cama',.85,7.3,90,{s:1,w:1.4,manta:'#8f8a6a'}],['buro',.3,6.5,90,{s:1}],
    ['plafon',3.0,1.8,0],['plafon',1.6,4.9,0],['plafon',3.0,7.3,0]
  ]
};
var alta={
  sky:'#d7e3ee', center:[3,0,4.2], frame:'#e8e8e6', tile:.33, gloss:.4, wallOut:EXT, wallMat:14, wallIn:'#f0ede4', zoclo:'#cdbfaa',
  ground:[[-10,-0.09,-16,17,24,'#c9d3b7',0]],
  floors:[[0,0,6,3.6,T],[0,3.6,5.0,6.2,T],[5.9,3.6,6,6.2,T],[0,6.2,6,8.4,'#c9c1b5',3]],
  ceilings:[[0,0,6,3.6],[0,3.6,5.0,6.2]],
  walls:[
    {ax:'x',c:0,from:0,to:6,t:.18,h:2.7,out:-1,open:[
      {from:.6,to:2.0,sill:1.0,head:2.0,kind:'window'},
      {from:4.2,to:5.5,sill:1.0,head:2.0,kind:'window'}]},
    {ax:'z',c:0,from:0,to:6.2,t:.18,h:2.7},
    {ax:'z',c:6,from:0,to:6.2,t:.18,h:2.7},
    /* terraza con pretil de herrería blanca */
    {ax:'z',c:0,from:6.2,to:8.4,t:.1,h:1.05,color:'#e9e9e6'},{ax:'z',c:6,from:6.2,to:8.4,t:.1,h:1.05,color:'#e9e9e6'},{ax:'x',c:8.4,from:0,to:6,t:.1,h:1.05,color:'#e9e9e6'},
    /* recámaras, pasillo y baño */
    {ax:'x',c:3.6,from:0,to:5.0,open:[
      {from:.7,to:1.5,head:2.1,kind:'door',hinge:'from',ang:0,color:'#eeece6',mat:6},
      {from:3.8,to:4.6,head:2.1,kind:'door',hinge:'from',ang:0,color:'#eeece6',mat:6}]},
    {ax:'z',c:3.4,from:0,to:3.6},
    {ax:'x',c:4.7,from:3.4,to:5.0,open:[{from:3.8,to:4.6,head:2.1,kind:'door',hinge:'from',ang:0,color:'#eeece6',mat:6}]},
    {ax:'z',c:3.4,from:4.7,to:6.2},
    {ax:'x',c:6.2,from:0,to:5.0,open:[{from:.6,to:2.6,sill:.05,head:2.2,kind:'window'}]}
  ],
  boxes:[],
  items:[
    ['hueco',5.45,3.6,0,{w:.9,l:2.6,lados:[-1,1],color:'#b9714f'}],
    ['cama',.85,1.8,90,{s:1,w:1.4,manta:'#5f7f8f'}],['buro',.3,.9,90,{s:1}],['closetM',2.5,3.52,180,{w:1.6,color:CLO}],
    ['cama',5.15,1.8,-90,{s:1,w:1.4,manta:'#b9703f'}],['buro',5.7,.9,-90,{s:1}],
    ['regadera',4.4,6.12,180,{w:.95,d:.9}],['wc',4.82,5.4,-90],['lavabo',4.82,4.95,-90],
    ['planta',.4,7.9,0,{s:1}],['planta',5.6,7.9,0,{s:1}],
    ['plafon',1.7,1.8,0],['plafon',4.7,1.8,0],['plafon',1.7,5.0,0]
  ]
};
var stops=[
  {n:'Vista general',d:'Casa de dos niveles con terraza: sala, cocina y baño abajo; recámaras y terraza arriba.',lvl:0,t:[3,.2,4.2],yaw:-.6,pitch:.9,dist:16,fov:.62,f:[],v:{dist:22}},
  {n:'Fachada',d:'Fachada de estuco gris con puerta blanca de herrería, sobre calle principal.',lvl:0,t:[3,2.0,0],yaw:-.5,pitch:.1,dist:13,fov:.72,f:[1]},
  {n:'Sala-comedor',d:'Sala-comedor con arco hacia la cocina y la escalera.',lvl:0,t:[1.0,1.5,.55],yaw:.2,pitch:.2,dist:.01,fov:1.25,f:[4]},
  {n:'Cocina',d:'Cocina con muebles de madera clara, cubierta de granito negro y estufa de 4 quemadores.',lvl:0,t:[2.7,1.5,4.0],yaw:-.9,pitch:.3,dist:.01,fov:1.35,f:[3]},
  {n:'Baño',d:'Baño de planta baja junto a la escalera.',lvl:0,t:[4.1,1.6,3.95],yaw:.7,pitch:.4,dist:.01,fov:1.45,f:[4]},
  {n:'Recámara de planta baja',d:'Recámara al fondo, con ventana al patio trasero.',lvl:0,t:[3.0,1.5,6.5],yaw:-.5,pitch:.22,dist:.01,fov:1.3,f:[]},
  {n:'Planta alta',d:'Dos recámaras, baño, sala de estar y terraza.',lvl:1,t:[3,.2,4.2],yaw:-.6,pitch:.9,dist:16,fov:.62,f:[],v:{dist:22}},
  {n:'Recámara 2',d:'Recámara con clóset de madera, ventana a la calle y puerta corrediza cerca de la terraza.',lvl:1,t:[3.0,1.5,.55],yaw:-.5,pitch:.22,dist:.01,fov:1.3,f:[5]},
  {n:'Recámara 3',d:'Recámara con ventana a la calle.',lvl:1,t:[4.0,1.5,.55],yaw:.5,pitch:.22,dist:.01,fov:1.3,f:[]},
  {n:'Terraza',d:'Terraza con pretil de herrería y vista a la barranca.',lvl:1,t:[3,1.0,7.0],yaw:.3,pitch:.5,dist:8,fov:.85,f:[2]}
];
var rooms0=[['Sala-comedor',2.6,2.0],['Cocina',1.6,4.9],['Baño',4.2,5.2],['Escalera',5.45,4.9],['Recámara 1',3.0,7.4]];
var rooms1=[['Recámara 2',1.7,1.8],['Recámara 3',4.7,1.8],['Baño',4.2,5.4],['Sala de estar',1.7,5.0],['Terraza',3.0,7.3]];
window.TOUR={levels:[{n:'Planta baja',plan:baja,rooms:rooms0},{n:'Planta alta',plan:alta,rooms:rooms1}],stops:stops};
})();
