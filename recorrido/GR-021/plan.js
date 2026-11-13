/* Casa remodelada en Paseo de San Miguel (una planta, amueblada con muebles básicos). No hay plano: la distribución se armó
   con las fotos y la ficha; medidas aproximadas, distribución aprobada por Iñaki.
   Metros. x = ancho visto desde la calle, z = fondo. La calle queda en z negativo. */
(function(){
// fotos: fachada de estuco gris con puerta y ventana en café oscuro y panel de madera, losas de concreto al frente,
// loseta crema grande y muros blancos, ventana con reja
var T='#e4dfd2', GR='#c9c6c0', CAF='#4a2a26', MADP='#9b6a45', VID='#2b3540';
var plan={
  sky:'#e9eef1', center:[3.25,0,5.5], frame:CAF, tile:.6, gloss:.7, wallOut:GR, wallMat:14, wallIn:'#f5f4f0', zoclo:'#e0dbce',
  ground:[
    [-10,-0.09,-16,17,24,'#8fae6b',2],
    [-10,-0.06,-16,17,-8.6,'#6d6f72',0],
    [-10,-0.03,-8.6,17,-7.8,'#cfccc5',3],
    [-1,-0.04,-7.8,7.5,0,'#97a06b',2],
    [.2,-0.03,-5.0,2.5,-3.4,'#cdbf9f',3],[.2,-0.03,-3.3,2.5,-1.7,'#cdbf9f',3],[.2,-0.03,-1.6,2.5,-.2,'#cdbf9f',3],
    [3.3,-0.03,-5.0,4.0,-.2,'#c9c5bc',3],[4.8,-0.03,-5.0,6.1,-.2,'#c9c5bc',3],
    [0,-0.015,9,6.5,11.5,'#b9b3a8',3]
  ],
  floors:[[0,0,6.5,9,T]],
  ceilings:[[0,0,6.5,9]],
  walls:[
    /* fachada: puerta y ventana en café oscuro */
    {ax:'x',c:0,from:0,to:6.5,t:.18,h:2.8,out:-1,open:[
      {from:.6,to:1.6,head:2.2,kind:'door',hinge:'from',ang:0,color:CAF,mat:6},
      {from:3.2,to:5.2,sill:.9,head:2.15,kind:'window'}]},
    {ax:'z',c:0,from:0,to:9,t:.18,h:2.8,open:[{from:4.4,to:5.6,sill:1.0,head:2.1,kind:'window',grille:true}]},
    {ax:'z',c:6.5,from:0,to:9,t:.18,h:2.8,open:[{from:4.4,to:5.2,sill:1.6,head:2.1,kind:'window',mid:false}]},
    /* fondo: ventanas de las recámaras y puerta al patio desde el pasillo */
    {ax:'x',c:9,from:0,to:6.5,t:.18,h:2.8,open:[
      {from:.8,to:2.4,sill:.95,head:2.1,kind:'window',grille:true},
      {from:3.4,to:4.1,head:2.2,kind:'door',hinge:'from',ang:1.3,color:'#d8d6d0',mat:6},
      {from:4.9,to:5.9,sill:.95,head:2.1,kind:'window',grille:true}]},
    /* sala-comedor | cocina, pasillo y baño */
    {ax:'x',c:3.8,from:0,to:6.5,open:[{from:.8,to:2.4,head:2.1,kind:'gap'},{from:3.4,to:4.5,head:2.2,kind:'gap'}]},
    {ax:'z',c:3.2,from:3.8,to:9,open:[{from:4.4,to:5.6,head:2.1,kind:'gap'},{from:6.5,to:7.3,head:2.1,kind:'door',hinge:'to',ang:0,color:MADP,mat:6}]},
    {ax:'z',c:4.7,from:3.8,to:6,open:[{from:4.4,to:5.2,head:2.1,kind:'door',hinge:'from',ang:0,color:MADP,mat:6}]},
    {ax:'z',c:4.2,from:6,to:9,open:[{from:6.5,to:7.3,head:2.1,kind:'door',hinge:'from',ang:0,color:MADP,mat:6}]},
    {ax:'x',c:6,from:0,to:3.2},
    {ax:'x',c:6,from:4.2,to:6.5}
  ],
  boxes:[
    /* panel de madera junto a la ventana y base oscura de la ventana */
    [5.25,.9,-.09,5.85,2.3,-.075,MADP,{mat:6}],[3.2,0,-.09,5.2,.9,-.075,CAF,{mat:12}],
    /* barda del patio y casas vecinas */
    [-.09,0,9,0,2.3,11.6,'#d9d6cf',{mat:3}],[6.5,0,9,6.59,2.3,11.6,'#d9d6cf',{mat:3}],[-.09,0,11.5,6.59,2.3,11.6,'#d9d6cf',{mat:3}],
    [-6.6,0,0,-.09,3.6,9,'#e9e8e4',{mat:11}],[6.59,0,0,12,3.6,9,'#e9e8e4',{mat:11}]
  ],
  items:[
    /* sala-comedor */
    ['tv',.08,1.6,90,{w:1.5}],['tapete',2.0,1.6,90,{s:1,w:2.2,d:1.7,color:'#6f6259',color2:'#5f534b'}],['sofa',3.55,1.6,-90,{s:1,w:2.0,color:'#7f8c99',color2:'#93a0ad'}],['mesaCentro',2.0,1.6,90,{s:1}],
    ['mesa',4.9,2.9,0,{s:1,w:.9,d:1.4}],['silla',4.9,2.2,0,{s:1}],['silla',4.9,3.6,180,{s:1}],['silla',4.2,2.9,90,{s:1}],['silla',5.6,2.9,-90,{s:1}],
    /* cocina */
    ['barra',.08,4.9,90,{len:2.0,estufa:.4,color:'#d9d4c8',mat:6,cubierta:'#6b6a68',altos:[[-.7,-.1],[.2,.8]]}],['refri',1.6,5.88,180],
    /* baño */
    ['regadera',5.95,5.92,180,{w:.95,d:.9}],['wc',5.2,3.88,0],['lavabo',6.1,3.88,0],
    /* recámaras */
    ['cama',.85,7.5,90,{s:1,w:1.4,manta:'#8f8a6a'}],['buro',.3,6.6,90,{s:1}],
    ['cama',5.6,7.5,-90,{s:1,w:1.4,manta:'#5f7f8f'}],['buro',6.2,6.6,-90,{s:1}],
    ['lavadero',.9,11.45,180],['boiler',5.6,11.4,0],
    ['plafon',3.25,1.9,0],['plafon',1.6,4.9,0],['plafon',3.9,4.9,0],['plafon',1.6,7.5,0],['plafon',5.3,7.5,0]
  ]
};
var stops=[
  {n:'Vista general',d:'Casa remodelada de una planta: sala-comedor, cocina, baño y 2 recámaras, con cochera para 2 autos.',lvl:0,t:[3.25,.2,5.5],yaw:-.6,pitch:.9,dist:18,fov:.62,f:[],v:{dist:24}},
  {n:'Fachada',d:'Fachada gris con puerta y ventana en café oscuro; al frente, cochera para 2 autos.',lvl:0,t:[3.25,1.4,0],yaw:-.45,pitch:.1,dist:11,fov:.72,f:[1,2]},
  {n:'Sala-comedor',d:'Sala-comedor al frente, con loseta clara y mucha luz.',lvl:0,t:[1.0,1.5,.55],yaw:.2,pitch:.2,dist:.01,fov:1.25,f:[]},
  {n:'Cocina',d:'Cocina abierta hacia la sala.',lvl:0,t:[2.7,1.5,4.2],yaw:-.9,pitch:.28,dist:.01,fov:1.3,f:[]},
  {n:'Pasillo',d:'Pasillo que comunica el baño, las recámaras y el patio.',lvl:0,t:[3.7,1.5,3.95],yaw:0,pitch:.15,dist:.01,fov:1.2,f:[]},
  {n:'Baño',d:'Baño completo con regadera.',lvl:0,t:[4.8,1.6,4.8],yaw:1.35,pitch:.4,dist:.01,fov:1.45,f:[]},
  {n:'Recámara 1',d:'Recámara con ventana con reja y piso de loseta.',lvl:0,t:[2.9,1.5,6.25],yaw:-.55,pitch:.22,dist:.01,fov:1.3,f:[3,4]},
  {n:'Recámara 2',d:'Recámara con ventana al patio.',lvl:0,t:[4.4,1.5,6.25],yaw:.5,pitch:.22,dist:.01,fov:1.3,f:[5,6]},
  {n:'Patio de servicio',d:'Patio al fondo con lavadero.',lvl:0,t:[3.25,1.0,10.5],yaw:3.14,pitch:1.0,dist:8.5,fov:.8,f:[]}
];
var rooms=[['Sala-comedor',3.25,1.9],['Cocina',1.6,4.9],['Pasillo',3.95,4.9],['Baño',5.6,4.9],['Recámara 1',1.6,7.5],['Recámara 2',5.3,7.5],['Patio',3.25,10.3],['Cochera',3.25,-2.5]];
window.TOUR={levels:[{n:'Casa',plan:plan,rooms:rooms}],stops:stops};
})();
