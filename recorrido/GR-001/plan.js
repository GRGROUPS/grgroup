/* Casa en Rancho San Pedro (dos niveles, dentro de privada; para remodelar). No hay plano: la distribución se armó con las fotos
   y la ficha (86 m² de construcción, 84 m² de terreno); medidas aproximadas, distribución aprobada por Iñaki.
   El visor muestra la casa limpia, con muebles básicos. Metros. x = ancho visto desde la calle, z = fondo. La calle queda en z negativo. */
(function(){
// fotos: fachada color crema y blanca, puerta con reja negra y ventana con reja, jardín con losas, cocina con lavatrastes y
// puerta de cristal al patio, baño con muros de azulejo blanco
var T='#d9c5a6', EXT='#ebe4d2', REJA='#1d1d1f', VID='#2b3540';
var baja={
  sky:'#e9eef1', center:[3,0,4.6], frame:'#e8e8e6', tile:.33, gloss:.4, wallOut:EXT, wallMat:14, wallIn:'#f1eee6', zoclo:'#cdbfaa',
  ground:[
    [-10,-0.09,-16,17,24,'#8fae6b',2],
    [-10,-0.06,-16,17,-8.0,'#6d6f72',0],
    [-10,-0.03,-8.0,17,-7.2,'#cfccc5',3],
    [-1,-0.04,-7.2,7,0,'#7fa05a',2],
    [.5,-0.03,-3.0,1.9,-2.3,'#c9c5bc',3],[.5,-0.03,-2.1,1.9,-1.4,'#c9c5bc',3],[.5,-0.03,-1.2,1.9,-.1,'#c9c5bc',3],
    [.5,-0.03,-5.5,5.8,-3.2,'#bdb8ad',3],
    [0,-0.015,7,6,10,'#a49c8f',3]
  ],
  floors:[[0,0,6,7,T]],
  ceilings:[[0,0,6,3.5],[0,3.5,4.65,6.5],[5.55,3.5,6,6.5],[0,6.5,6,7]],
  walls:[
    /* fachada: puerta con reja negra y ventana con reja */
    {ax:'x',c:0,from:0,to:6,t:.18,h:2.7,out:-1,open:[
      {from:.6,to:1.7,head:2.2,kind:'door',hinge:'from',ang:0,color:REJA,mat:16},
      {from:3.2,to:4.6,sill:1.0,head:2.1,kind:'window',grille:true}]},
    {ax:'z',c:0,from:0,to:7,t:.18,h:2.7},
    {ax:'z',c:6,from:0,to:7,t:.18,h:2.7},
    /* fondo: ventana de la cocina y puerta de cristal al patio */
    {ax:'x',c:7,from:0,to:6,t:.18,h:2.7,open:[
      {from:.7,to:1.6,head:2.2,kind:'door',hinge:'from',ang:0,color:'#c9d0d0',mat:6},
      {from:2.4,to:3.6,sill:1.0,head:2.0,kind:'window'}]},
    /* sala | cocina y escalera */
    {ax:'x',c:3.5,from:0,to:6,open:[{from:.8,to:3.4,head:2.1,kind:'gap'},{from:4.4,to:5.6,head:2.3,kind:'gap'}]},
    {ax:'z',c:4.2,from:3.5,to:7}
  ],
  boxes:[
    [-.075,2.7,-.075,6.075,5.4,7.075,EXT,{mat:34}],
    [.8,3.3,-.09,2.2,4.3,-.075,VID,{mat:10}],[3.8,3.3,-.09,5.2,4.3,-.075,VID,{mat:10}],
    [-.09,0,7,0,2.3,10.1,'#d9d6cf',{mat:3}],[6,0,7,6.09,2.3,10.1,'#d9d6cf',{mat:3}],[-.09,0,10,6.09,2.3,10.1,'#d9d6cf',{mat:3}],
    [-6.6,0,0,-.09,5.6,7,'#e9e8e4',{mat:11}],[6.09,0,0,12,5.6,7,'#e9e8e4',{mat:11}]
  ],
  items:[
    /* sala */
    ['tv',.08,1.8,90,{w:1.5}],['tapete',1.8,1.8,90,{s:1,w:2.2,d:1.7,color:'#6f6259',color2:'#5f534b'}],['sofa',3.15,1.8,-90,{s:1,w:2.0,color:'#7f8c99',color2:'#93a0ad'}],['mesaCentro',1.8,1.8,90,{s:1}],
    /* cocina-comedor con lavatrastes */
    ['barra',.08,5.6,90,{len:2.2,estufa:.5,tarja:-.5,color:'#d9d4c8',mat:6,cubierta:'#bdb8ad',altos:[[-.9,-.2],[.2,.9]]}],['refri',4.12,6.5,-90],
    ['mesa',2.4,4.5,0,{s:1,w:.9,d:1.3}],['silla',2.4,3.9,0,{s:1}],['silla',2.4,5.1,180,{s:1}],
    ['escalera',5.1,3.5,0,{w:.9,n:13,huella:.23,alto:2.8,mat:1,color:'#d8d4c8',barandal:-1}],
    ['lavadero',5.0,9.95,180],['boiler',.7,9.9,0],
    ['plafon',3.0,1.8,0],['plafon',1.8,5.2,0],['plafon',5.1,6.7,0]
  ]
};
var alta={
  sky:'#e9eef1', center:[3,0,4.6], frame:'#e8e8e6', tile:.33, gloss:.4, wallOut:EXT, wallMat:14, wallIn:'#f1eee6', zoclo:'#cdbfaa',
  ground:[[-10,-0.09,-16,17,24,'#d9dcde',0]],
  floors:[[0,0,6,3.5,T],[0,3.5,4.65,6.5,T],[5.55,3.5,6,6.5,T],[0,6.5,6,7,T]],
  ceilings:[[0,0,6,7]],
  walls:[
    {ax:'x',c:0,from:0,to:6,t:.18,h:2.7,out:-1,open:[
      {from:.8,to:2.2,sill:1.0,head:2.1,kind:'window',grille:true},
      {from:3.8,to:5.2,sill:1.0,head:2.1,kind:'window',grille:true}]},
    {ax:'z',c:0,from:0,to:7,t:.18,h:2.7},
    {ax:'z',c:6,from:0,to:7,t:.18,h:2.7},
    {ax:'x',c:7,from:0,to:6,t:.18,h:2.7,open:[{from:1.0,to:1.7,sill:1.6,head:2.1,kind:'window',mid:false},{from:3.0,to:4.2,sill:1.0,head:2.1,kind:'window'}]},
    /* recámaras, baño y pasillo */
    {ax:'z',c:3.2,from:0,to:3.5},
    {ax:'x',c:3.5,from:0,to:6,open:[
      {from:2.35,to:3.1,head:2.1,kind:'door',hinge:'from',ang:0,color:'#eeece6',mat:6},
      {from:3.4,to:4.2,head:2.1,kind:'door',hinge:'from',ang:0,color:'#eeece6',mat:6}]},
    {ax:'z',c:2.3,from:3.5,to:7,open:[{from:4.3,to:5.1,head:2.1,kind:'door',hinge:'from',ang:0,color:'#eeece6',mat:6}]}
  ],
  boxes:[[-6.6,0,0,-.09,3.4,7,'#e9e8e4',{mat:11}],[6.09,0,0,12,3.4,7,'#e9e8e4',{mat:11}]],
  items:[
    ['hueco',5.1,3.5,0,{w:.9,l:3.0,lados:[-1,1],color:'#d8d4c8'}],
    ['cama',.85,1.8,90,{s:1,w:1.4,manta:'#8f8a6a'}],['buro',.3,.9,90,{s:1}],
    ['cama',5.15,1.8,-90,{s:1,w:1.4,manta:'#5f7f8f'}],['buro',5.7,.9,-90,{s:1}],
    /* baño completo */
    ['regadera',2.2,6.92,180,{w:.95,d:.9}],['wc',.08,4.9,90],['lavabo',.08,4.3,90],
    ['plafon',1.6,1.8,0],['plafon',4.6,1.8,0],['plafon',3.2,5.0,0]
  ]
};
var stops=[
  {n:'Vista general',d:'Casa de dos niveles dentro de privada: sala, cocina y patio abajo; 2 recámaras y baño arriba.',lvl:0,t:[3,.2,4.6],yaw:-.6,pitch:.9,dist:17,fov:.62,f:[],v:{dist:23}},
  {n:'Fachada',d:'Fachada crema y blanca, con puerta de reja y jardín al frente con andador de losas.',lvl:0,t:[3,1.5,0],yaw:-.5,pitch:.1,dist:11,fov:.72,f:[1]},
  {n:'Sala',d:'Sala al frente de la casa.',lvl:0,t:[1.0,1.5,.55],yaw:.2,pitch:.2,dist:.01,fov:1.25,f:[]},
  {n:'Cocina-comedor',d:'Cocina abierta con lavatrastes y salida con puerta de cristal al patio.',lvl:0,t:[3.4,1.5,3.9],yaw:-.75,pitch:.28,dist:.01,fov:1.35,f:[2]},
  {n:'Patio',d:'Patio al fondo, con zona de lavado.',lvl:0,t:[3,1.0,8.8],yaw:3.14,pitch:1.0,dist:8.5,fov:.8,f:[]},
  {n:'Planta alta',d:'Dos recámaras, baño completo y pasillo.',lvl:1,t:[3,.2,4.6],yaw:-.6,pitch:.9,dist:17,fov:.62,f:[],v:{dist:23}},
  {n:'Recámara 1',d:'Recámara con ventana a la calle.',lvl:1,t:[2.9,1.5,2.5],yaw:-1.4,pitch:.22,dist:.01,fov:1.35,f:[3]},
  {n:'Recámara 2',d:'Recámara con ventana a la calle.',lvl:1,t:[3.4,1.5,2.5],yaw:1.4,pitch:.22,dist:.01,fov:1.35,f:[]},
  {n:'Baño',d:'Baño completo con regadera, WC y lavabo.',lvl:1,t:[1.9,1.6,3.9],yaw:-.6,pitch:.4,dist:.01,fov:1.45,f:[4,5]}
];
var rooms0=[['Sala',3.0,1.9],['Cocina-comedor',2.2,5.2],['Escalera',5.1,5.0],['Patio',3.0,8.5],['Jardín',3.0,-2.0]];
var rooms1=[['Recámara 1',1.6,1.8],['Recámara 2',4.6,1.8],['Baño',1.15,5.2],['Pasillo',3.2,5.2]];
window.TOUR={levels:[{n:'Planta baja',plan:baja,rooms:rooms0},{n:'Planta alta',plan:alta,rooms:rooms1}],stops:stops};
})();
