/* Casa en Provenza (una planta, con muebles básicos). No hay plano ni medidas en la ficha: la distribución se armó con las fotos
   y la ficha; medidas aproximadas. Metros. x = ancho visto desde la calle, z = fondo. La calle queda en z negativo.
   Distribución: sala-comedor y cocina en una franja a la izquierda (la cocina al fondo, con la tarja bajo la ventana que da
   al patio, como en la foto); a la derecha, recámara 2 al frente, baño compartido en medio y recámara 1 al fondo con su baño. */
(function(){
// fotos: fachada blanca con marcos de cantera y ventanas de aluminio negro, entrada recesada con visera, jardín con andador,
// cocina en L con muebles oscuros, granito beige y doble tarja bajo la ventana, loseta gris-beige, patio con adoquín rojizo,
// lavadero junto a la puerta y barda de block, recámara con clóset-vestidor blanco de repisas y cajones
var T='#cfc8ba', EXT='#f4f2ec', CANT='#c8b99b', DARK='#2e2428', GRAN='#cdb99a', PTA='#eeece6';
function marco(x0,x1,y0,y1){var t=.1,z0=-.095,z1=-.07,c=CANT,o={mat:19};
  return [[x0-t,y0-t,z0,x0,y1+t,z1,c,o],[x1,y0-t,z0,x1+t,y1+t,z1,c,o],[x0-t,y1,z0,x1+t,y1+t,z1,c,o],[x0-t,y0-t,z0,x1+t,y0,z1,c,o]];}
var plan={
  sky:'#e9eef1', center:[3,0,4.6], frame:'#1d1d1f', tile:.33, gloss:.5, wallOut:EXT, wallMat:14, wallIn:'#f3f1ec', zoclo:'#cdc7b9',
  ground:[
    [-10,-0.09,-16,17,24,'#a69870',2],
    [-10,-0.06,-16,17,-8.4,'#6d6f72',0],
    [-10,-0.03,-8.4,17,-7.6,'#cfccc5',3],
    [-1,-0.04,-7.6,7,0,'#8a9060',2],
    [1.7,-0.03,-7.6,2.9,0,'#c9c5bc',3],[3.0,-0.03,-7.6,4.2,0,'#8d8a85',15],
    [0,-0.015,9,6,12.5,'#9a5e4c',15]
  ],
  floors:[[0,0,6,9,T]],
  ceilings:[[0,0,6,9]],
  walls:[
    /* fachada: ventana de la sala, entrada recesada y ventana de la recámara 2, con marcos de cantera */
    {ax:'x',c:0,from:0,to:6,t:.18,h:2.7,out:-1,open:[
      {from:.4,to:1.5,sill:1.0,head:2.1,kind:'window'},
      {from:1.95,to:2.85,head:2.2,kind:'door',hinge:'from',ang:1.0,color:'#3b3b3d',mat:6},
      {from:3.8,to:4.9,sill:1.0,head:2.1,kind:'window'}]},
    {ax:'z',c:0,from:0,to:9,t:.18,h:2.7},
    {ax:'z',c:6,from:0,to:9,t:.18,h:2.7},
    /* fondo: ventana sobre la tarja, puerta al patio y ventana de la recámara 1 */
    {ax:'x',c:9,from:0,to:6,t:.18,h:2.7,open:[
      {from:.45,to:1.55,sill:1.05,head:2.05,kind:'window'},
      {from:2.1,to:2.9,head:2.2,kind:'door',hinge:'to',ang:1.25,color:PTA,mat:6},
      {from:3.9,to:5.3,sill:1.0,head:2.1,kind:'window'}]},
    /* muro que separa la zona social de las recámaras y baños */
    {ax:'z',c:3.1,from:0,to:9,open:[
      {from:2.35,to:3.1,head:2.1,kind:'door',hinge:'to',ang:0,color:PTA,mat:6},
      {from:3.95,to:4.65,head:2.1,kind:'door',hinge:'from',ang:-1.2,color:PTA,mat:6},
      {from:5.25,to:6.0,head:2.1,kind:'door',hinge:'from',ang:-1.2,color:PTA,mat:6}]},
    {ax:'x',c:3.3,from:3.1,to:6},
    {ax:'x',c:5.0,from:3.1,to:6},
    /* baño de la recámara 1 */
    {ax:'z',c:4.5,from:5.0,to:6.9},
    {ax:'x',c:6.9,from:4.5,to:6,open:[{from:4.65,to:5.35,head:2.1,kind:'door',hinge:'from',ang:0,color:PTA,mat:6}]}
  ],
  boxes:marco(.4,1.5,1.0,2.1).concat(marco(3.8,4.9,1.0,2.1),[
    /* entrada recesada: nicho y visera oscura */
    [1.85,0,-.6,1.95,2.7,-.09,EXT,{mat:14}],[2.85,0,-.6,2.95,2.7,-.09,EXT,{mat:14}],[1.75,2.32,-.75,3.05,2.38,-.09,'#2b2b2d'],
    /* barda del patio y casas vecinas */
    [-.09,0,9,0,2.3,12.6,'#bfbcb6',{mat:3}],[6,0,9,6.09,2.3,12.6,'#bfbcb6',{mat:3}],[-.09,0,12.5,6.09,2.3,12.6,'#bfbcb6',{mat:3}],
    [-6.6,0,0,-.09,3.2,9,'#f1efe9',{mat:11}],[6.09,0,0,12,3.2,9,'#f1efe9',{mat:11}]
  ]),
  items:[
    /* sala */
    ['sofa',.08,1.9,90,{s:1,w:2.0,color:'#7f8c99',color2:'#93a0ad'}],
    ['tapete',1.6,1.9,90,{s:1,w:2.0,d:1.5,color:'#6f6259',color2:'#5f534b'}],['mesaCentro',1.55,1.9,90,{s:1}],
    ['tv',3.02,1.2,-90,{w:1.3}],['planta',.4,.4,0,{s:1}],
    /* comedor */
    ['mesa',1.55,5.0,0,{s:1,w:.9,d:1.3}],['silla',1.55,4.35,0,{s:1}],['silla',1.55,5.65,180,{s:1}],['silla',.9,5.0,90,{s:1}],['silla',2.2,5.0,-90,{s:1}],
    /* cocina en L: tarja doble bajo la ventana del fondo, estufa en el muro lateral, muebles oscuros y granito beige */
    ['barra',1.0,8.92,180,{len:1.9,tarja:0,color:DARK,mat:6,cubierta:GRAN,copete:false}],
    ['barra',.08,7.55,90,{len:1.6,estufa:0,color:DARK,mat:6,cubierta:GRAN,altos:[[-.75,.0]]}],
    ['refri',.08,6.3,90],
    /* recámara 2 (al frente) */
    ['cama',5.15,1.55,-90,{s:1,w:1.4,manta:'#5f7f8f'}],['buro',5.7,.55,-90,{s:1}],
    /* baño compartido */
    ['regadera',5.45,4.92,180,{w:.95,d:.9}],['wc',5.4,3.38,0],['lavabo',4.55,3.38,0],
    /* recámara 1 con clóset-vestidor blanco y baño propio */
    ['closetM',4.42,5.95,-90,{w:1.6,color:'#efede8'}],
    ['cama',4.15,7.9,90,{s:1,w:1.4,manta:'#8f8a6a'}],['buro',3.6,6.95,90,{s:1}],
    ['regadera',5.5,5.08,0,{w:.9,d:.85}],['wc',5.92,6.4,-90],['lavabo',4.58,6.15,90],
    /* patio: lavadero junto a la puerta */
    ['lavadero',1.0,9.08,0],['planta',5.5,12.0,0],
    ['plafon',1.55,1.9,0],['plafon',1.55,5.0,0],['plafon',1.55,7.8,0],['plafon',4.55,1.65,0],['plafon',4.55,4.15,0],['plafon',4.55,7.9,0]
  ]
};
var stops=[
  {n:'Vista general',d:'Casa de una planta con 2 recámaras y 2 baños, jardín al frente y patio trasero.',lvl:0,t:[3,.2,4.6],yaw:-.6,pitch:.9,dist:18,fov:.62,f:[],v:{dist:24}},
  {n:'Fachada',d:'Fachada blanca con marcos de cantera, ventanas negras y entrada recesada; jardín con andador al frente.',lvl:0,t:[3,1.3,0],yaw:-.45,pitch:.1,dist:10,fov:.72,f:[1]},
  {n:'Sala-comedor',d:'Sala al frente y comedor; al fondo, la cocina con salida al patio.',lvl:0,t:[2.6,1.5,.45],yaw:-.3,pitch:.2,dist:.01,fov:1.2,f:[]},
  {n:'Cocina',d:'Cocina en L con muebles oscuros, granito beige y doble tarja bajo la ventana al patio.',lvl:0,t:[2.7,1.55,6.1],yaw:-.6,pitch:.32,dist:.01,fov:1.3,f:[2]},
  {n:'Recámara 2',d:'Recámara al frente, con ventana a la calle.',lvl:0,t:[3.45,1.5,3.0],yaw:2.5,pitch:.26,dist:.01,fov:1.3,f:[]},
  {n:'Baño compartido',d:'Baño completo entre las dos recámaras.',lvl:0,t:[3.35,1.6,4.3],yaw:1.9,pitch:.4,dist:.01,fov:1.45,f:[]},
  {n:'Recámara 1',d:'Recámara con clóset-vestidor, ventana al patio y baño propio.',lvl:0,t:[5.6,1.5,7.15],yaw:-.85,pitch:.24,dist:.01,fov:1.3,f:[4]},
  {n:'Patio trasero',d:'Patio con piso de adoquín, lavadero junto a la puerta y barda de block.',lvl:0,t:[3,1.0,10.8],yaw:-.2,pitch:.55,dist:8,fov:.8,f:[3]}
];
var rooms=[['Sala',1.55,1.9],['Comedor',1.55,5.0],['Cocina',1.55,7.8],['Recámara 2',4.55,1.65],['Baño',4.55,4.15],['Baño',5.25,5.9],['Recámara 1',4.55,7.9],['Patio',3.0,10.8],['Jardín',3.0,-3.0]];
window.TOUR={levels:[{n:'Casa',plan:plan,rooms:rooms}],stops:stops};
})();
