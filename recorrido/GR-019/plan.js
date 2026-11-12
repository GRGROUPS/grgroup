/* Casa en Viñedos (una planta). Plano deducido de las fotos. */
(function(){
var W='#f3f1ec', T='#d8cfc0', WOOD='#b08a62', SOFT='#8d99a6', LIN='#ece7dd', WHT='#f4f4f1';

/* Plano deducido de las fotos. Metros. x = ancho (0 = muro del vecino), z = fondo (0 = frente a la calle). */
var plan={
  sky:'#e9eef1',
  ground:[ // [x0, yTop, z0, x1, z1, color, material]  2 pasto, 3 concreto
    [-10,-0.09,-10,17,18,'#8fae6b',2],
    [-10,-0.06,-10,17,-2.7,'#7b7d80',0],
    [-10,-0.045,-6,1.4,-2.7,'#8fae6b',2],
    [-10,-0.03,-2.7,17,0.0,'#cfccc5',3],
    [2.4,-0.015,0,6.48,1.6,'#c6c3bc',3],
    [0,-0.015,8.6,6.4,10.4,'#c6c3bc',3]
  ],
  floors:[
    [0,0,2.4,3.4,T],[2.4,1.6,6.4,5.4,T],[0,3.4,2.4,5.4,'#e4e2dc'],
    [0,5.4,2.9,8.6,T],[2.9,5.4,3.75,8.6,T],[3.75,5.4,6.4,8.6,T]
  ],
  ceilings:[[0,0,2.4,3.4],[2.4,1.6,6.4,5.4],[0,3.4,2.4,5.4],[0,5.4,2.9,8.6],[2.9,5.4,3.75,8.6],[3.75,5.4,6.4,8.6]],
  walls:[
    // exteriores
    {ax:'x',c:0,from:0,to:2.4,t:.15,h:2.7,out:-1,open:[{from:.55,to:1.9,sill:.95,head:2.1,kind:'window',grille:true}]},
    {ax:'z',c:2.4,from:0,to:1.6,t:.15,h:2.7},
    {ax:'x',c:1.6,from:2.4,to:6.4,t:.15,h:2.7,out:-1,open:[
      {from:2.62,to:3.5,head:2.1,kind:'door',hinge:'from',ang:-1.35},
      {from:4.3,to:5.5,sill:.08,head:2.25,kind:'window',grille:true}]},
    {ax:'z',c:6.4,from:1.6,to:8.6,t:.15,h:2.7},
    {ax:'x',c:8.6,from:0,to:6.4,t:.15,h:2.7,out:1,open:[
      {from:.85,to:2.05,sill:.95,head:2.1,kind:'window'},
      {from:2.98,to:3.67,head:2.1,kind:'glassdoor',mid:false},
      {from:4.6,to:5.8,sill:.95,head:2.1,kind:'window'}]},
    {ax:'z',c:0,from:0,to:8.6,t:.15,h:2.7},
    // interiores
    {ax:'z',c:2.4,from:1.6,to:3.4,open:[{from:2.48,to:3.3,head:2.1,kind:'gap'}]},
    {ax:'x',c:3.4,from:0,to:2.4},
    {ax:'z',c:2.4,from:3.4,to:5.4,open:[{from:4.3,to:5.05,head:2.1,kind:'door',hinge:'from',ang:1.3}]},
    {ax:'x',c:5.4,from:0,to:6.4,open:[
      {from:2.98,to:3.67,head:2.5,kind:'gap'},
      {from:4.0,to:4.8,head:2.1,kind:'door',hinge:'from',ang:-1.35}]},
    {ax:'z',c:2.9,from:5.4,to:8.6,open:[{from:5.7,to:6.5,head:2.1,kind:'door',hinge:'from',ang:-1.35}]},
    {ax:'z',c:3.75,from:5.4,to:8.6},
    // bardas del patio
    {ax:'x',c:10.4,from:0,to:6.4,h:2.2,color:'#d9d6cf'},
    {ax:'z',c:0,from:8.6,to:10.4,h:2.2,color:'#d9d6cf'},
    {ax:'z',c:6.4,from:8.6,to:10.4,h:2.2,color:'#d9d6cf'}
  ],
  boxes:[
    // contexto: casa vecina y pilastra verde de medidores
    [-3.2,0,0,-.09,2.7,8.6,'#e6e8e7',{top:'#c9ccca'}],
    [-.5,0,-.08,-.08,3.05,.12,'#a9c9a0']
  ],
  // [mueble, x, z, ángulo, opciones]. Ángulo 0 = frente hacia el fondo de la casa; s:1 = mueble sugerido (se puede ocultar)
  items:[
    // fijos, como en las fotos
    ['barra',.08,1.85,90,{len:2.7,estufa:.05,tarja:-.92,altos:[[.38,1.35],[-1.3,-.28]]}],
    ['regadera',.08,3.47,0,{w:.9,d:1.85}],['wc',1.5,3.47,0],['lavabo',2.05,3.47,0],
    ['closet',5.62,5.47,0,{w:1.4}],['closet',.95,5.47,0,{w:1.6}],
    ['lavadero',.75,10.33,180],['boiler',5.9,8.68,0],
    ['plafon',4.4,3.5,0],['plafon',1.2,1.7,0],['plafon',1.3,4.5,0],['plafon',5.05,7.0,0],['plafon',1.45,7.0,0],['plafon',3.32,7.0,0],
    // sugeridos
    ['refri',2.32,.55,-90,{s:1}],
    ['tapete',4.72,3.3,-90,{s:1,w:2.3,d:1.5}],['sofa',5.86,3.3,-90,{s:1,w:2.0}],['mesaCentro',4.75,3.3,-90,{s:1}],['planta',6.02,1.98,0,{s:1}],
    ['mesa',2.86,3.88,0,{s:1,w:.75,d:.75}],['silla',3.48,3.88,-90,{s:1}],['silla',2.86,3.28,0,{s:1}],
    ['cama',5.28,7.2,-90,{s:1,w:1.4,manta:'#b9703f'}],['buro',6.1,6.22,-90,{s:1}],['buro',6.1,8.18,-90,{s:1,lampara:false}],
    ['cama',1.12,7.25,90,{s:1,w:1.4,color:'#cfd8dc',manta:'#5f7f8f'}],['buro',.3,6.26,90,{s:1}]
  ]
};

var stops=[
  {n:'Vista general',d:'Casa de una planta con 2 recámaras, 1 baño y cocina equipada.',t:[3.2,.2,5.0],yaw:-.6,pitch:.9,dist:18.5,fov:.62,f:[],v:{dist:25}},
  {n:'Fachada',d:'Fachada blanca con herrería en puerta y ventanas.',t:[3.3,1.25,1.2],yaw:-.6,pitch:.1,dist:9.5,fov:.72,f:[1,2]},
  {n:'Sala-comedor',d:'Ventanal de piso a techo hacia el frente.',t:[3.3,1.5,5.25],yaw:2.5,pitch:.24,dist:.01,fov:1.08,f:[6,5]},
  {n:'Cocina',d:'Cocina equipada con parrilla y gabinetes blancos.',t:[2.28,1.55,3.22],yaw:-2.5,pitch:.3,dist:.01,fov:1.15,f:[3]},
  {n:'Baño',d:'Baño completo con cancel en la regadera.',t:[2.27,1.6,5.27],yaw:-2.3,pitch:.5,dist:.01,fov:1.35,f:[4],v:{yaw:-2.6}},
  {n:'Recámara 1',d:'Recámara con clóset y ventana.',t:[4.3,1.5,5.7],yaw:.66,pitch:.26,dist:.01,fov:1.15,f:[7]},
  {n:'Recámara 2',d:'Recámara con clóset.',t:[2.62,1.55,8.25],yaw:-2.5,pitch:.24,dist:.01,fov:1.15,f:[8]},
  {n:'Patio',d:'Patio de servicio al fondo.',t:[5.9,1.5,10.1],yaw:-1.95,pitch:.2,dist:.01,fov:1.08,f:[]}
];
var rooms=[['Cocina',1.2,1.7],['Sala-comedor',4.5,3.5],['Baño',1.2,4.4],['Recámara 1',5.1,7.1],['Recámara 2',1.45,7.1],['Patio',3.2,9.5]];

window.TOUR={levels:[{n:'Casa',plan:plan,rooms:rooms}],stops:stops};
})();
