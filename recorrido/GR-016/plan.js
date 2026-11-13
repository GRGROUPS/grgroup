/* Casa en Provenza (una planta, con muebles básicos). No hay plano ni medidas en la ficha: la distribución se armó con las fotos
   y la ficha; medidas aproximadas, distribución aprobada por Iñaki.
   Metros. x = ancho visto desde la calle, z = fondo. La calle queda en z negativo. */
(function(){
// fotos: fachada blanca con marcos de cantera y ventanas de aluminio negro, entrada recesada, jardín con andador, cocina con
// muebles oscuros, granito beige y doble tarja, loseta gris-beige, patio con adoquín y barda de block, clóset-vestidor blanco
var T='#cdc7b9', EXT='#f4f2ec', CANT='#c8b99b', DARK='#2e2428';
function marco(x0,x1,y0,y1){var t=.1,z0=-.095,z1=-.07,c=CANT,o={mat:19};
  return [[x0-t,y0-t,z0,x0,y1+t,z1,c,o],[x1,y0-t,z0,x1+t,y1+t,z1,c,o],[x0-t,y1,z0,x1+t,y1+t,z1,c,o],[x0-t,y0-t,z0,x1+t,y0,z1,c,o]];}
var plan={
  sky:'#e9eef1', center:[3,0,4.8], frame:'#1d1d1f', tile:.33, gloss:.5, wallOut:EXT, wallMat:14, wallIn:'#f3f1ec', zoclo:'#cdc7b9',
  ground:[
    [-10,-0.09,-16,17,24,'#a69870',2],
    [-10,-0.06,-16,17,-8.4,'#6d6f72',0],
    [-10,-0.03,-8.4,17,-7.6,'#cfccc5',3],
    [-1,-0.04,-7.6,7,0,'#8a9060',2],
    [1.7,-0.03,-7.6,2.9,0,'#c9c5bc',3],[3.0,-0.03,-7.6,4.2,0,'#a7825f',15],
    [0,-0.015,9,6,12.5,'#a7825f',15]
  ],
  floors:[[0,0,6,9,T]],
  ceilings:[[0,0,6,9]],
  walls:[
    /* fachada: entrada recesada y dos ventanas con marco de cantera */
    {ax:'x',c:0,from:0,to:6,t:.18,h:2.7,out:-1,open:[
      {from:.4,to:1.5,sill:1.0,head:2.1,kind:'window'},
      {from:1.9,to:2.8,head:2.2,kind:'door',hinge:'from',ang:1.0,color:'#3b3b3d',mat:6},
      {from:3.4,to:4.5,sill:1.0,head:2.1,kind:'window'}]},
    {ax:'z',c:0,from:0,to:9,t:.18,h:2.7},
    {ax:'z',c:6,from:0,to:9,t:.18,h:2.7},
    {ax:'x',c:9,from:0,to:6,t:.18,h:2.7,open:[
      {from:.4,to:1.4,sill:1.0,head:2.1,kind:'window'},
      {from:2.3,to:2.9,sill:1.6,head:2.1,kind:'window',mid:false},
      {from:3.35,to:4.05,head:2.2,kind:'door',hinge:'from',ang:1.3,color:'#d8d6d0',mat:6},
      {from:4.6,to:5.6,sill:1.0,head:2.1,kind:'window'}]},
    /* sala-comedor | cocina, pasillo y baño */
    {ax:'x',c:3.8,from:0,to:6,open:[
      {from:.8,to:2.4,head:2.1,kind:'gap'},
      {from:3.4,to:4.2,head:2.2,kind:'gap'},
      {from:4.8,to:5.6,head:2.1,kind:'door',hinge:'from',ang:0,color:'#eeece6',mat:6}]},
    {ax:'z',c:3.2,from:3.8,to:6},
    {ax:'z',c:4.4,from:3.8,to:6},
    /* recámaras y pasillo al patio */
    {ax:'x',c:6,from:0,to:3.2},{ax:'x',c:6,from:4.2,to:6},
    {ax:'z',c:3.2,from:6,to:9,open:[{from:6.5,to:7.3,head:2.1,kind:'door',hinge:'to',ang:0,color:'#eeece6',mat:6}]},
    {ax:'z',c:4.2,from:6,to:9,open:[{from:6.5,to:7.3,head:2.1,kind:'door',hinge:'from',ang:0,color:'#eeece6',mat:6}]},
    /* baño de la recámara 1 */
    {ax:'x',c:7.4,from:1.6,to:3.2,open:[{from:1.7,to:2.4,head:2.1,kind:'door',hinge:'from',ang:0,color:'#eeece6',mat:6}]},
    {ax:'z',c:1.6,from:7.4,to:9}
  ],
  boxes:marco(.4,1.5,1.0,2.1).concat(marco(3.4,4.5,1.0,2.1),[
    /* barda del patio y casas vecinas */
    [-.09,0,9,0,2.3,12.6,'#bfbcb6',{mat:3}],[6,0,9,6.09,2.3,12.6,'#bfbcb6',{mat:3}],[-.09,0,12.5,6.09,2.3,12.6,'#bfbcb6',{mat:3}],
    [-6.6,0,0,-.09,3.2,9,'#f1efe9',{mat:11}],[6.09,0,0,12,3.2,9,'#f1efe9',{mat:11}]
  ]),
  items:[
    /* sala-comedor */
    ['tv',.08,1.9,90,{w:1.5}],['tapete',1.8,1.9,90,{s:1,w:2.2,d:1.7,color:'#6f6259',color2:'#5f534b'}],['sofa',3.15,1.9,-90,{s:1,w:2.0,color:'#7f8c99',color2:'#93a0ad'}],['mesaCentro',1.8,1.9,90,{s:1}],
    ['mesa',4.7,2.5,0,{s:1,w:.9,d:1.4}],['silla',4.7,1.8,0,{s:1}],['silla',4.7,3.2,180,{s:1}],['silla',4.05,2.5,90,{s:1}],['silla',5.35,2.5,-90,{s:1}],
    /* cocina en L: muebles oscuros, granito beige, estufa y doble tarja */
    ['barra',.08,4.6,90,{len:1.4,estufa:.2,color:DARK,mat:6,cubierta:'#cdb99a',altos:[[-.6,.0]]}],['barra',1.4,5.92,180,{len:1.8,tarja:0,color:DARK,mat:6,cubierta:'#cdb99a'}],['refri',2.85,5.9,180],
    /* baño completo */
    ['regadera',5.35,5.92,180,{w:.95,d:.9}],['wc',5.92,4.65,-90],['lavabo',5.92,4.2,-90],
    /* recámara 1 con baño propio */
    ['cama',.95,7.05,0,{s:1,w:1.3,manta:'#8f8a6a'}],['buro',1.85,6.2,0,{s:1}],
    ['regadera',3.12,8.92,180,{w:.95,d:.9}],['wc',1.68,8.5,90],['lavabo',1.68,7.9,90],
    /* recámara 2 */
    ['cama',5.1,7.05,0,{s:1,w:1.2,manta:'#5f7f8f'}],['buro',4.45,6.2,0,{s:1}],
    ['lavadero',5.2,9.08,0],
    ['plafon',3.0,1.9,0],['plafon',1.6,4.9,0],['plafon',3.7,4.9,0],['plafon',1.6,6.9,0],['plafon',5.1,6.9,0]
  ]
};
var stops=[
  {n:'Vista general',d:'Casa de una planta con 2 recámaras y 2 baños, jardín al frente y patio trasero.',lvl:0,t:[3,.2,4.8],yaw:-.6,pitch:.9,dist:18,fov:.62,f:[],v:{dist:24}},
  {n:'Fachada',d:'Fachada blanca con marcos de cantera, ventanas negras y entrada recesada; jardín con andador al frente.',lvl:0,t:[3,1.3,0],yaw:-.45,pitch:.1,dist:10,fov:.72,f:[1]},
  {n:'Sala-comedor',d:'Sala y comedor al frente de la casa.',lvl:0,t:[1.0,1.5,.55],yaw:.2,pitch:.2,dist:.01,fov:1.25,f:[]},
  {n:'Cocina',d:'Cocina en L con muebles oscuros, granito beige y doble tarja.',lvl:0,t:[2.9,1.5,4.2],yaw:-.85,pitch:.3,dist:.01,fov:1.35,f:[2]},
  {n:'Baño completo',d:'Baño completo junto al pasillo.',lvl:0,t:[4.75,1.6,4.1],yaw:.9,pitch:.4,dist:.01,fov:1.45,f:[]},
  {n:'Recámara 1',d:'Recámara con clóset-vestidor y baño propio.',lvl:0,t:[2.9,1.5,6.3],yaw:-1.2,pitch:.22,dist:.01,fov:1.35,f:[4]},
  {n:'Recámara 2',d:'Recámara secundaria con ventana al patio.',lvl:0,t:[5.6,1.5,6.3],yaw:.1,pitch:.22,dist:.01,fov:1.35,f:[]},
  {n:'Patio trasero',d:'Patio trasero con piso de adoquín, lavadero y barda de block.',lvl:0,t:[3,1.0,10.8],yaw:-.2,pitch:.55,dist:8,fov:.8,f:[3]}
];
var rooms=[['Sala-comedor',3.0,2.0],['Cocina',1.6,4.9],['Pasillo',3.8,4.9],['Baño',5.2,4.9],['Recámara 1',.9,7.8],['Baño',2.3,8.4],['Pasillo',3.7,7.5],['Recámara 2',5.1,7.8],['Patio',3.0,10.8],['Jardín',3.0,-3.0]];
window.TOUR={levels:[{n:'Casa',plan:plan,rooms:rooms}],stops:stops};
})();
