/* Casa en Viñedos, privada (dos niveles, sin muebles). No hay plano: la distribución se armó con las fotos, la descripción
   de Iñaki y la ficha (93 m² de construcción, 138.79 m² de terreno); medidas aproximadas.
   Metros. x = ancho visto desde la calle, z = fondo. La calle queda en z negativo. */
(function(){
// fotos: casa de estuco blanco con cantera rosa sobre la entrada y ventanas con celosía, estacionamiento con adoquines y
// pasto, loseta beige chica en toda la casa, escalera con barandal negro, cocina con muebles blancos y cubierta negra,
// patio de servicio con muro de block
var T='#cdbfa8', EXT='#f1f0ed', PUERTA='#eeece6', VID='#2b3540', CANT='#c99a8f';
var baja={
  sky:'#e9eef1', center:[2.75,0,5.5], frame:'#2a2a2a', tile:.33, gloss:.55, wallOut:EXT, wallMat:14, wallIn:'#f4f3f0', zoclo:'#cdbfa8',
  ground:[
    [-10,-0.09,-16,17,24,'#8fae6b',2],
    [-10,-0.06,-16,17,-9.2,'#6d6f72',0],
    [-10,-0.03,-9.2,17,-8.4,'#cfccc5',3],
    [-1,-0.04,-8.4,6.5,0,'#7fa05a',2],
    [0,-0.015,9.6,5.5,12.5,'#8f8d88',3]
  ].concat((function(){var a=[],i;for(i=0;i<5;i++){a.push([.35,-0.03,-1.0-i*1.55,2.15,.0,'#c9c5bc',3].slice(0,2).concat([-1.0-i*1.55-1.2,2.15,-1.0-i*1.55,'#c9c5bc',3]),[3.35,-0.03,-1.0-i*1.55-1.2,5.15,-1.0-i*1.55,'#c9c5bc',3]);}return a;})()),
  floors:[[0,0,5.5,9.6,T]],
  ceilings:[[0,0,5.5,3.0],[0,3.0,4.55,6.2],[5.45,3.0,5.5,6.2],[0,6.2,5.5,9.6]],
  walls:[
    /* fachada: ventanas con celosía y puerta de entrada */
    {ax:'x',c:0,from:0,to:5.5,t:.18,h:2.7,out:-1,open:[
      {from:.4,to:1.5,sill:.9,head:2.1,kind:'window',grille:true},
      {from:2.0,to:2.9,head:2.2,kind:'door',hinge:'from',ang:0,color:PUERTA,mat:6},
      {from:3.7,to:5.0,sill:.9,head:2.1,kind:'window',grille:true}]},
    {ax:'z',c:0,from:0,to:9.6,t:.18,h:2.7},
    {ax:'z',c:5.5,from:0,to:9.6,t:.18,h:2.7},
    /* fondo: puerta al patio desde el pasillo y ventana de la recámara */
    {ax:'x',c:9.6,from:0,to:5.5,t:.18,h:2.7,open:[
      {from:.45,to:1.4,head:2.2,kind:'door',hinge:'from',ang:1.3,color:'#d8d6d0',mat:6},
      {from:2.6,to:4.2,sill:.95,head:2.1,kind:'window'}]},
    /* baño entrando, a la derecha */
    {ax:'x',c:1.2,from:3.9,to:5.5},
    {ax:'x',c:3.0,from:3.9,to:5.5},
    {ax:'z',c:3.9,from:1.2,to:3.0,open:[{from:2.25,to:2.95,head:2.1,kind:'door',hinge:'from',ang:-1.3,color:PUERTA,mat:6}]},
    /* cocina-pasillo al patio y recámara, al fondo de la sala */
    {ax:'x',c:6.4,from:0,to:1.9,open:[{from:.3,to:1.6,head:2.2,kind:'gap'}]},
    {ax:'x',c:6.4,from:1.9,to:5.5,open:[{from:2.5,to:3.3,head:2.1,kind:'door',hinge:'from',ang:1.3,color:PUERTA,mat:6}]},
    {ax:'z',c:1.9,from:6.4,to:9.6}
  ],
  boxes:[
    /* cantera rosa sobre la entrada */
    [1.75,2.25,-.09,3.15,2.7,-.075,CANT,{mat:19}],
    /* planta alta vista desde la calle (se oculta al quitar el techo) */
    [-.075,2.7,-.075,5.575,5.4,9.675,EXT,{mat:34}],
    [3.7,3.4,-.09,5.0,4.5,-.075,VID,{mat:10}],[.4,3.4,-.09,1.5,4.5,-.075,VID,{mat:10}],
    /* patio: muro de block y casas vecinas */
    [-.09,0,9.6,0,2.3,12.6,'#8d8c88',{mat:3}],[5.5,0,9.6,5.59,2.3,12.6,'#8d8c88',{mat:3}],[-.09,0,12.5,5.59,2.3,12.6,'#8d8c88',{mat:3}],
    [-6.6,0,0,-.09,5.6,9.6,'#e9e8e4',{mat:11}],[5.59,0,0,12,5.6,9.6,'#e9e8e4',{mat:11}]
  ],
  items:[
    /* baño de planta baja */
    ['regadera',3.98,1.28,0,{w:.95,d:.92}],['wc',5.42,2.5,-90],['lavabo',5.42,1.85,-90],
    /* escalera con barandal negro, arranca junto al baño y sube hacia el fondo */
    ['escalera',5.0,3.0,0,{w:.9,n:13,huella:.245,alto:2.8,mat:1,color:'#d8cdb9',barandal:-1}],
    /* cocina: muebles blancos con cubierta negra, estufa y tarja */
    ['barra',.08,8.0,90,{len:2.6,estufa:.3,tarja:-.6,color:'#f1efe9',mat:6,cubierta:'#2b2b2d'}],
    ['lavadero',4.5,12.45,180],['boiler',.6,12.4,0],
    ['plafon',1.5,1.2,0],['plafon',3.2,3.4,0],['plafon',2.4,5.2,0],['plafon',3.7,8.0,0],['plafon',.95,8.0,0]
  ]
};
var alta={
  sky:'#e9eef1', center:[2.75,0,5.5], frame:'#2a2a2a', tile:.33, gloss:.55, wallOut:EXT, wallMat:14, wallIn:'#f4f3f0', zoclo:'#cdbfa8',
  ground:[[-10,-0.09,-16,17,24,'#d9dcde',0]],
  floors:[[0,0,5.5,3.0,T],[0,3.0,4.55,6.2,T],[5.45,3.0,5.5,6.2,T],[0,6.2,5.5,9.6,T]],
  ceilings:[[0,0,5.5,9.6]],
  walls:[
    {ax:'x',c:0,from:0,to:5.5,t:.18,h:2.7,open:[
      {from:.6,to:2.4,sill:.9,head:2.1,kind:'window',grille:true},
      {from:4.0,to:4.7,sill:1.6,head:2.1,kind:'window',mid:false}]},
    {ax:'z',c:0,from:0,to:9.6,t:.18,h:2.7},
    {ax:'z',c:5.5,from:0,to:9.6,t:.18,h:2.7},
    {ax:'x',c:9.6,from:0,to:5.5,t:.18,h:2.7,open:[
      {from:.8,to:2.4,sill:.9,head:2.1,kind:'window'},
      {from:4.0,to:4.7,sill:1.6,head:2.1,kind:'window',mid:false}]},
    /* recámara principal y su baño */
    {ax:'z',c:3.2,from:0,to:3.8},
    {ax:'x',c:3.8,from:0,to:3.2,open:[{from:1.0,to:1.8,head:2.1,kind:'door',hinge:'from',ang:1.3,color:PUERTA,mat:6}]},
    {ax:'x',c:2.4,from:3.2,to:5.5,open:[{from:4.3,to:5.1,head:2.1,kind:'door',hinge:'from',ang:-1.3,color:PUERTA,mat:6}]},
    /* recámara secundaria, baño completo y lavado */
    {ax:'x',c:6.5,from:0,to:3.2,open:[{from:1.0,to:1.8,head:2.1,kind:'door',hinge:'from',ang:0,color:PUERTA,mat:6}]},
    {ax:'z',c:3.2,from:6.5,to:9.6,open:[{from:8.7,to:9.4,head:2.1,kind:'door',hinge:'to',ang:-1.3,color:PUERTA,mat:6}]},
    {ax:'x',c:6.5,from:3.2,to:5.5,open:[{from:3.45,to:4.25,head:2.1,kind:'door',hinge:'from',ang:1.3,color:PUERTA,mat:6}]},
    {ax:'x',c:8.3,from:3.2,to:5.5}
  ],
  boxes:[[-6.6,0,0,-.09,3.4,9.6,'#e9e8e4',{mat:11}],[5.59,0,0,12,3.4,9.6,'#e9e8e4',{mat:11}]],
  items:[
    ['hueco',5.0,3.0,0,{w:.9,l:3.2,lados:[-1,1],color:'#d8cdb9'}],
    /* baño principal */
    ['regadera',3.28,.08,0,{w:.95,d:.92}],['wc',5.42,1.5,-90],['lavabo',5.42,.9,-90],
    /* baño completo */
    ['regadera',4.23,8.22,180,{w:.95,d:.92}],['wc',5.42,7.3,-90],['lavabo',5.42,6.85,-90],
    ['plafon',1.6,1.9,0],['plafon',2.7,5.0,0],['plafon',1.6,8.0,0],['plafon',4.35,1.2,0],['plafon',4.35,7.4,0]
  ]
};
var stops=[
  {n:'Vista general',d:'Casa de dos niveles en privada: sala-comedor, cocina y recámara abajo; recámaras, baños y sala de TV arriba.',lvl:0,t:[2.75,.2,5.5],yaw:-.6,pitch:.9,dist:18,fov:.62,f:[],v:{dist:24}},
  {n:'Fachada',d:'Entrada con cantera rosa y ventanas con celosía; estacionamiento con adoquines y pasto al frente.',lvl:0,t:[2.75,1.6,0],yaw:-.5,pitch:.1,dist:11,fov:.72,f:[1,2,3]},
  {n:'Sala-comedor',d:'Sala-comedor amplia con loseta beige; al fondo, la escalera, la recámara y el pasillo al patio.',lvl:0,t:[2.4,1.5,.5],yaw:.1,pitch:.2,dist:.01,fov:1.15,f:[4]},
  {n:'Baño',d:'Baño de planta baja, a la derecha de la entrada.',lvl:0,t:[4.3,1.6,1.4],yaw:.8,pitch:.4,dist:.01,fov:1.5,f:[]},
  {n:'Cocina',d:'Cocina con muebles blancos, cubierta negra, estufa y tarja, que se junta con el área de trastes y sale al patio.',lvl:0,t:[1.0,1.55,6.6],yaw:0,pitch:.28,dist:.01,fov:1.2,f:[5]},
  {n:'Recámara',d:'Recámara de planta baja con ventana al patio.',lvl:0,t:[2.3,1.5,6.7],yaw:.45,pitch:.22,dist:.01,fov:1.25,f:[]},
  {n:'Patio de servicio',d:'Patio con lavadero, muro de block y zona para el tanque de gas.',lvl:0,t:[2.75,1.0,11.0],yaw:-.2,pitch:.55,dist:8,fov:.8,f:[6]},
  {n:'Planta alta',d:'Recámara principal con baño y clóset, sala de TV, recámara secundaria y baño completo.',lvl:1,t:[2.75,.2,5.5],yaw:-.6,pitch:.9,dist:18,fov:.62,f:[],v:{dist:24}},
  {n:'Recámara principal',d:'Recámara principal con ventana a la calle y baño propio.',lvl:1,t:[2.6,1.5,3.4],yaw:3.14,pitch:.22,dist:.01,fov:1.25,f:[]},
  {n:'Sala de TV',d:'Sala de TV entre las recámaras, junto a la escalera.',lvl:1,t:[2.2,1.5,3.9],yaw:.2,pitch:.2,dist:.01,fov:1.25,f:[]},
  {n:'Recámara secundaria',d:'Recámara secundaria con ventana al patio y baño completo al lado.',lvl:1,t:[2.7,1.5,6.7],yaw:.5,pitch:.22,dist:.01,fov:1.25,f:[]}
];
var rooms0=[['Sala-comedor',2.0,2.8],['Baño',4.7,2.1],['Escalera',5.0,4.6],['Cocina',.95,7.6],['Recámara',3.7,8.0],['Patio',2.75,11.0],['Estacionamiento',2.75,-3.5]];
var rooms1=[['Recámara principal',1.6,1.9],['Baño',4.35,1.2],['Sala de TV',2.2,5.0],['Recámara secundaria',1.6,8.0],['Baño',4.35,7.4],['Lavado',4.35,8.95]];
window.TOUR={levels:[{n:'Planta baja',plan:baja,rooms:rooms0},{n:'Planta alta',plan:alta,rooms:rooms1}],stops:stops};
})();
