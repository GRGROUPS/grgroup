/* Casa en Viñedos, privada (dos niveles). No hay plano: la distribución se armó con las fotos, la descripción
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
    [-1.3,-0.04,-8.4,6.5,0,'#7fa05a',2],
    [0,-0.015,9.6,5.5,12.5,'#8f8d88',3],
    /* nicho de la entrada (compartido con la casa vecina del dúplex) */
    [-1.2,-0.01,0,1.15,1.15,'#bdb8ad',3]
  ].concat((function(){var a=[],i;for(i=0;i<5;i++){a.push([.2,-0.03,-1.0-i*1.55-1.2,1.0,-1.0-i*1.55,'#c9c5bc',3],[1.6,-0.03,-1.0-i*1.55-1.2,2.8,-1.0-i*1.55,'#c9c5bc',3],[3.4,-0.03,-1.0-i*1.55-1.2,5.2,-1.0-i*1.55,'#c9c5bc',3]);}return a;})()),
  floors:[[1.15,0,5.5,1.15,T],[0,1.15,5.5,9.6,T]],
  ceilings:[[1.15,0,5.5,1.15],[0,1.15,5.5,3.0],[.95,3.0,5.5,6.4],[0,6.2,.95,6.4],[0,6.4,5.5,9.6]],
  walls:[
    /* fachada: ventana grande con celosía de la sala, a la derecha del nicho */
    {ax:'x',c:0,from:1.15,to:5.5,t:.18,h:2.7,out:-1,open:[{from:2.6,to:4.5,sill:.9,head:2.1,kind:'window',grille:true}]},
    /* nicho: al fondo la ventanita del baño; a la derecha, la puerta de entrada */
    {ax:'x',c:1.15,from:0,to:1.15,t:.18,h:2.7,out:-1,open:[{from:.3,to:.95,sill:1.5,head:2.05,kind:'window',mid:false}]},
    {ax:'z',c:1.15,from:0,to:1.15,t:.18,h:2.7,out:-1,open:[{from:.15,to:1.0,head:2.2,kind:'door',hinge:'from',ang:0,color:PUERTA,mat:6}]},
    {ax:'z',c:0,from:1.15,to:9.6,t:.18,h:2.7},
    {ax:'z',c:5.5,from:0,to:9.6,t:.18,h:2.7},
    /* fondo: ventana de la recámara y puerta al patio desde el pasillo de la cocina */
    {ax:'x',c:9.6,from:0,to:5.5,t:.18,h:2.7,open:[
      {from:1.0,to:2.6,sill:.95,head:2.1,kind:'window'},
      {from:3.85,to:4.75,head:2.2,kind:'door',hinge:'to',ang:-1.3,color:'#d8d6d0',mat:6}]},
    /* baño, detrás del nicho y pegado a la entrada */
    {ax:'x',c:1.15,from:1.15,to:1.6},
    {ax:'z',c:1.6,from:1.15,to:3.0,open:[{from:1.3,to:2.0,head:2.1,kind:'door',hinge:'from',ang:0,color:PUERTA,mat:6}]},
    {ax:'x',c:3.0,from:0,to:1.6},
    /* recámara al fondo y cocina-pasillo al patio */
    {ax:'x',c:6.4,from:0,to:3.6,open:[{from:1.4,to:2.2,head:2.1,kind:'door',hinge:'from',ang:1.3,color:PUERTA,mat:6}]},
    {ax:'x',c:6.4,from:3.6,to:5.5,open:[{from:3.75,to:5.35,head:2.2,kind:'gap'}]},
    {ax:'z',c:3.6,from:6.4,to:9.6}
  ],
  boxes:[
    /* cantera rosa sobre los nichos del dúplex, techo del nicho y pilar que lo divide */
    [-1.2,2.7,-.09,1.3,5.4,-.075,CANT,{mat:39}],[-1.2,2.5,0,1.15,2.7,1.15,EXT,{mat:34}],
    [-.1,0,0,.1,1.5,.3,EXT,{mat:14}],[-.18,1.5,-.05,.18,1.56,.35,EXT],
    /* planta alta vista desde la calle (se oculta al quitar el techo) */
    [-.075,2.7,1.075,5.575,5.4,9.675,EXT,{mat:34}],[1.075,2.7,-.075,5.575,5.4,1.2,EXT,{mat:34}],
    [3.0,3.4,-.09,4.6,4.5,-.075,VID,{mat:10}],
    /* patio: muro de block; casa vecina del dúplex y la del otro lado */
    [-.09,0,9.6,0,2.3,12.6,'#8d8c88',{mat:3}],[5.5,0,9.6,5.59,2.3,12.6,'#8d8c88',{mat:3}],[-.09,0,12.5,5.59,2.3,12.6,'#8d8c88',{mat:3}],
    [-6.6,0,0,-1.2,5.6,9.6,'#e9e8e4',{mat:11}],[-1.2,0,1.15,-.09,5.6,9.6,'#e9e8e4',{mat:11}],[5.59,0,0,12,5.6,9.6,'#e9e8e4',{mat:11}]
  ],
  items:[
    /* baño de planta baja */
    ['regadera',.55,2.92,180,{w:.95,d:.85}],['wc',.08,1.6,90],['lavabo',1.1,1.23,0],
    /* escalera con barandal negro, junto al baño, sube hacia el fondo */
    ['escalera',.5,3.0,0,{w:.9,n:13,huella:.245,alto:2.8,mat:1,color:'#d8cdb9',barandal:1}],
    /* cocina: muebles blancos con cubierta negra, estufa y tarja, contra el muro; el resto es pasillo al patio */
    ['barra',5.42,8.0,-90,{len:2.6,estufa:.3,tarja:-.6,color:'#f1efe9',mat:6,cubierta:'#2b2b2d'}],
    ['lavadero',1.0,12.45,180],['boiler',4.9,12.4,0],
    /* sala-comedor */
    ['tv',5.42,2.3,-90,{w:1.5}],['tapete',3.6,2.3,90,{s:1,w:2.2,d:1.7,color:'#6f6259',color2:'#5f534b'}],['sofa',2.05,2.3,90,{s:1,w:2.0,color:'#7f8c99',color2:'#93a0ad'}],['mesaCentro',3.6,2.3,90,{s:1}],
    ['mesa',3.3,5.0,0,{s:1,w:.9,d:1.4}],['silla',3.3,4.3,0,{s:1}],['silla',3.3,5.7,180,{s:1}],['silla',2.6,5.0,90,{s:1}],['silla',4.0,5.0,-90,{s:1}],
    /* recámara de planta baja */
    ['cama',.85,8.2,90,{s:1,w:1.4,manta:'#7f8c99'}],['buro',.3,7.3,90,{s:1}],
    ['plafon',3.3,2.0,0],['plafon',3.3,5.0,0],['plafon',1.8,8.0,0],['plafon',4.55,8.0,0],['plafon',.8,2.1,0]
  ]
};
var alta={
  sky:'#e9eef1', center:[2.75,0,5.5], frame:'#2a2a2a', tile:.33, gloss:.55, wallOut:EXT, wallMat:14, wallIn:'#f4f3f0', zoclo:'#cdbfa8',
  ground:[[-10,-0.09,-16,17,24,'#d9dcde',0]],
  floors:[[0,0,5.5,3.0,T],[.95,3.0,5.5,6.2,T],[0,6.2,5.5,9.6,T]],
  ceilings:[[0,0,5.5,9.6]],
  walls:[
    {ax:'x',c:0,from:0,to:5.5,t:.18,h:2.7,open:[
      {from:1.5,to:2.9,sill:.9,head:2.1,kind:'window',grille:true},
      {from:4.0,to:4.7,sill:1.6,head:2.1,kind:'window',mid:false}]},
    {ax:'z',c:0,from:0,to:9.6,t:.18,h:2.7},
    {ax:'z',c:5.5,from:0,to:9.6,t:.18,h:2.7},
    {ax:'x',c:9.6,from:0,to:5.5,t:.18,h:2.7,open:[
      {from:.8,to:2.4,sill:.9,head:2.1,kind:'window'},
      {from:4.0,to:4.7,sill:1.6,head:2.1,kind:'window',mid:false}]},
    /* recámara principal y su baño, al frente */
    {ax:'z',c:3.2,from:0,to:3.0},
    {ax:'x',c:3.0,from:.95,to:3.2,open:[{from:1.5,to:2.3,head:2.1,kind:'door',hinge:'from',ang:1.3,color:PUERTA,mat:6}]},
    {ax:'x',c:2.3,from:3.2,to:5.5,open:[{from:4.3,to:5.1,head:2.1,kind:'door',hinge:'from',ang:-1.3,color:PUERTA,mat:6}]},
    /* recámara secundaria, baño completo y lavado, al fondo */
    {ax:'x',c:6.5,from:0,to:3.2,open:[{from:1.4,to:2.2,head:2.1,kind:'door',hinge:'from',ang:0,color:PUERTA,mat:6}]},
    {ax:'z',c:3.2,from:6.5,to:9.6,open:[{from:8.7,to:9.4,head:2.1,kind:'door',hinge:'to',ang:-1.3,color:PUERTA,mat:6}]},
    {ax:'x',c:6.5,from:3.2,to:5.5,open:[{from:3.45,to:4.25,head:2.1,kind:'door',hinge:'from',ang:0,color:PUERTA,mat:6}]},
    {ax:'x',c:8.3,from:3.2,to:5.5}
  ],
  boxes:[[-6.6,0,0,-.09,3.4,9.6,'#e9e8e4',{mat:11}],[5.59,0,0,12,3.4,9.6,'#e9e8e4',{mat:11}]],
  items:[
    ['hueco',.5,3.0,0,{w:.9,l:3.2,lados:[1],color:'#d8cdb9'}],
    ['cama',.85,1.5,90,{s:1,w:1.5,manta:'#8f8a6a'}],['buro',.3,.45,90,{s:1}],['cama',.85,8.0,90,{s:1,w:1.2,manta:'#b9703f'}],['buro',.3,7.1,90,{s:1}],
    ['tv',5.42,4.6,-90,{w:1.5}],['sofa',2.2,4.6,90,{s:1,w:2.0,color:'#7f8c99',color2:'#93a0ad'}],['tapete',3.7,4.6,90,{s:1,w:2.0,d:1.5}],
    /* baño principal */
    ['regadera',3.28,.08,0,{w:.95,d:.9}],['wc',5.42,1.5,-90],['lavabo',5.42,.9,-90],
    /* baño completo */
    ['regadera',4.23,8.22,180,{w:.95,d:.92}],['wc',5.42,7.3,-90],['lavabo',5.42,6.85,-90],
    ['plafon',1.6,1.5,0],['plafon',3.2,4.6,0],['plafon',1.6,8.0,0],['plafon',4.35,1.2,0],['plafon',4.35,7.4,0]
  ]
};
var stops=[
  {n:'Vista general',d:'Casa de dos niveles en privada: sala-comedor, baño, cocina y recámara abajo; recámaras, baños y sala de TV arriba.',lvl:0,t:[2.75,.2,5.5],yaw:-.6,pitch:.9,dist:18,fov:.62,f:[],v:{dist:24}},
  {n:'Fachada',d:'Casa dúplex: cantera rosa arriba del nicho de la entrada, ventana con celosía y estacionamiento con adoquines y pasto.',lvl:0,t:[2.2,1.6,0],yaw:-.35,pitch:.1,dist:11,fov:.72,f:[1,2,3]},
  {n:'Entrada',d:'Entras al nicho y volteas a la derecha: ahí está la puerta. La ventanita del fondo es la del baño.',lvl:0,t:[.9,1.2,.6],yaw:.75,pitch:.12,dist:2.6,fov:.95,f:[1]},
  {n:'Sala-comedor',d:'Sala-comedor amplia con loseta beige; a la izquierda, el baño y la escalera; al fondo, la recámara y el pasillo al patio.',lvl:0,t:[4.6,1.5,.5],yaw:-.3,pitch:.2,dist:.01,fov:1.15,f:[4]},
  {n:'Baño',d:'Baño de planta baja, pegado a la entrada.',lvl:0,t:[1.3,1.6,2.7],yaw:-2.75,pitch:.42,dist:.01,fov:1.55,f:[]},
  {n:'Cocina',d:'Cocina con muebles blancos, cubierta negra, estufa y tarja, que se junta con el área de trastes y sale al patio.',lvl:0,t:[4.0,1.55,6.6],yaw:.25,pitch:.28,dist:.01,fov:1.2,f:[5]},
  {n:'Recámara',d:'Recámara de planta baja con ventana al patio.',lvl:0,t:[3.3,1.5,6.7],yaw:-.6,pitch:.22,dist:.01,fov:1.25,f:[]},
  {n:'Patio de servicio',d:'Patio con lavadero, muro de block y zona para el tanque de gas.',lvl:0,t:[2.75,1.0,11.0],yaw:3.14,pitch:1.0,dist:8.5,fov:.8,f:[6]},
  {n:'Planta alta',d:'Recámara principal con baño y clóset, sala de TV, recámara secundaria y baño completo.',lvl:1,t:[2.75,.2,5.5],yaw:-.6,pitch:.9,dist:18,fov:.62,f:[],v:{dist:24}},
  {n:'Recámara principal',d:'Recámara principal con ventana a la calle y baño propio.',lvl:1,t:[2.9,1.5,2.7],yaw:-2.5,pitch:.22,dist:.01,fov:1.25,f:[]},
  {n:'Sala de TV',d:'Sala de TV entre las recámaras, junto a la escalera.',lvl:1,t:[1.4,1.5,3.3],yaw:.7,pitch:.2,dist:.01,fov:1.25,f:[]},
  {n:'Recámara secundaria',d:'Recámara secundaria con ventana al patio y baño completo al lado.',lvl:1,t:[2.8,1.5,6.75],yaw:-.5,pitch:.22,dist:.01,fov:1.25,f:[]}
];
var rooms0=[['Entrada',.6,.55],['Baño',.8,2.1],['Escalera',.5,4.6],['Sala-comedor',3.4,3.2],['Recámara',1.8,8.0],['Cocina',4.55,8.0],['Patio',2.75,11.0],['Estacionamiento',2.75,-3.5]];
var rooms1=[['Recámara principal',1.6,1.5],['Baño',4.35,1.2],['Sala de TV',3.2,4.6],['Recámara secundaria',1.6,8.0],['Baño',4.35,7.4],['Lavado',4.35,8.95]];
window.TOUR={levels:[{n:'Planta baja',plan:baja,rooms:rooms0},{n:'Planta alta',plan:alta,rooms:rooms1}],stops:stops};
})();
