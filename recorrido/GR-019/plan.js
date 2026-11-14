/* Casa en Viñedos (una planta), en esquina. Plano deducido de las fotos.
   Fachada (revisada con las fotos, 14 nov 2026): bloque de la cocina al frente con ventana de herrería blanca; remetido con la
   puerta blanca en un nicho profundo, pegada al bloque, y junto a ella el ventanal alto con herrería blanca y moldura;
   firme de concreto elevado frente a la entrada, banqueta lateral con poste de luz; detrás, la casa vecina de dos niveles con tinaco. */
(function(){
// fotos: casa blanca de estuco con franja verde, loseta beige rosada, muros interiores blanco cálido, cocina blanca con cubierta marmoleada
var W='#f3f1ec', T='#d6cabb', WOOD='#b08a62', SOFT='#8d99a6', LIN='#ece7dd', WHT='#f4f4f1';

/* Plano deducido de las fotos. Metros. x = ancho (0 = muro del vecino), z = fondo (0 = frente a la calle). */
var plan={
  sky:'#e9eef1', tile:.33, gloss:.45, wallOut:'#f2f1ee', wallMat:14, wallIn:'#f3eee8', zoclo:'#cdbfae',
  ground:[ // [x0, yTop, z0, x1, z1, color, material]  2 pasto, 3 concreto
    [-10,-0.09,-10,17,18,'#8fae6b',2],
    [-10,-0.06,-10,17,-2.7,'#7b7d80',0],
    [-10,-0.045,-6,1.4,-2.7,'#8fae6b',2],
    [-10,-0.03,-2.7,17,0.0,'#cfccc5',3],
    [6.48,-0.03,-2.7,8.3,18,'#cfccc5',3],
    [-.5,-0.02,-1.4,3.2,0,'#8fae6b',2],   // pasto frente al bloque de la cocina[8.3,-0.06,-10,17,18,'#7b7d80',0],
    [0,-0.015,8.6,6.4,10.4,'#c6c3bc',3]
  ],
  floors:[
    [0,0,2.4,3.4,T],[2.4,0,3.2,1.6,T],[2.4,1.6,6.4,5.4,T],[0,3.4,2.4,5.4,'#e4e2dc'],
    [0,5.4,2.9,8.6,T],[2.9,5.4,3.75,8.6,T],[3.75,5.4,6.4,8.6,T]
  ],
  ceilings:[[0,0,2.4,3.4],[2.4,0,3.2,1.6],[2.4,1.6,6.4,5.4],[0,3.4,2.4,5.4],[0,5.4,2.9,8.6],[2.9,5.4,3.75,8.6],[3.75,5.4,6.4,8.6]],
  walls:[
    // exteriores
    // bloque de la cocina al frente
    {ax:'x',c:0,from:0,to:3.2,t:.15,h:2.75,out:-1,open:[{from:.55,to:1.95,sill:.95,head:2.15,kind:'window',grille:true}]},
    {ax:'z',c:3.2,from:0,to:1.6,t:.15,h:2.75},
    // remetido: puerta blanca cerrada pegada al bloque y ventanal alto con herrería
    {ax:'x',c:1.6,from:3.2,to:6.4,t:.15,h:2.7,out:-1,open:[
      {from:3.32,to:4.12,head:2.15,kind:'door',hinge:'from',ang:0,color:'#e9e8e3',mat:0},
      {from:4.3,to:5.5,sill:.3,head:2.3,kind:'window',grille:true}]},
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
    {ax:'x',c:10.4,from:0,to:6.4,h:2.2,color:'#e4e1da'},
    {ax:'z',c:0,from:8.6,to:10.4,h:2.2,color:'#e4e1da'},
    {ax:'z',c:6.4,from:8.6,to:10.4,h:2.2,color:'#e4e1da'}
  ],
  boxes:[
    // contexto: casa vecina y pilastra verde de medidores
    [-3.2,0,0,-.09,2.7,8.6,'#e6e8e7',{top:'#c9ccca'}],
    [-.55,0,-.3,-.08,3.05,.12,'#a9c9a0',{mat:14}],[-.36,.2,-.31,-.3,2.9,-.29,'#8fb386'],
    [-.5,1.25,-.38,-.36,1.45,-.3,'#8e8e8a',{mat:16}],[-.24,1.25,-.38,-.1,1.45,-.3,'#8e8e8a',{mat:16}],   // medidores
    // remate de la azotea del bloque del frente
    [-.08,2.75,-.12,3.28,2.83,1.6,'#e9e7e2',{mat:14}],
    // lámparas: blanca al frente y negra en el costado del bloque, junto a la puerta
    [2.7,2.32,-.14,2.92,2.52,-.075,'#f4f4f1',{mat:9}],[3.275,2.15,.55,3.36,2.38,.72,'#1d1d1f',{mat:16}],
    // nicho de la puerta y moldura del ventanal
    [4.12,0,1.32,4.22,2.3,1.525,'#f2f1ee',{mat:14}],[3.2,2.15,1.32,4.22,2.3,1.525,'#f2f1ee',{mat:14}],
    [4.2,.2,1.46,5.6,.3,1.525,'#f4f3ef',{mat:14}],[4.2,2.3,1.46,5.6,2.4,1.525,'#f4f3ef',{mat:14}],
    [4.2,.3,1.46,4.3,2.3,1.525,'#f4f3ef',{mat:14}],[5.5,.3,1.46,5.6,2.3,1.525,'#f4f3ef',{mat:14}],
    // firme de concreto elevado frente a la entrada
    [3.2,0,.15,6.45,.1,1.52,'#c9c6bf',{mat:3}],
    // poste de luz en la banqueta
    [7.86,0,2.46,7.94,4.3,2.54,'#1d1d1f',{mat:16}],[7.8,4.3,2.4,8.0,4.6,2.6,'#e9e7e0',{mat:9}],
    // casa vecina de dos niveles detrás, con ventanitas al costado
    [.4,0,10.5,6.4,5.6,16,'#f1f0ec',{mat:11}],
    [6.4,3.6,11.2,6.43,4.3,11.6,'#3a4048',{mat:11}],[6.4,3.6,12.6,6.43,4.3,13.0,'#3a4048',{mat:11}],[6.4,3.6,14.0,6.43,4.3,14.4,'#3a4048',{mat:11}]
  ],
  // [mueble, x, z, ángulo, opciones]. Ángulo 0 = frente hacia el fondo de la casa; s:1 = mueble sugerido (se puede ocultar)
  items:[
    // fijos, como en las fotos
    ['barra',.08,1.85,90,{len:2.7,estufa:.05,tarja:-.92,altos:[[.38,1.35],[-1.3,-.28]],cubierta:'#dedbd4'}],
    ['regadera',.08,3.47,0,{w:.9,d:1.85}],['wc',1.5,3.47,0],['lavabo',2.05,3.47,0],
    ['closet',5.62,5.47,0,{w:1.4}],['closet',.95,5.47,0,{w:1.6}],
    ['tinaco',4.6,12.0,0,{y0:5.6,r:.45,h:.75,color:'#1f2022'}],
    ['lavadero',.75,10.33,180],['boiler',5.9,8.68,0],
    ['plafon',4.4,3.5,0],['plafon',1.2,1.7,0],['plafon',1.3,4.5,0],['plafon',5.05,7.0,0],['plafon',1.45,7.0,0],['plafon',3.32,7.0,0],
    // sugeridos
    ['refri',3.12,.55,-90,{s:1}],
    ['tapete',4.72,3.3,-90,{s:1,w:2.3,d:1.5}],['sofa',5.86,3.3,-90,{s:1,w:2.0}],['mesaCentro',4.75,3.3,-90,{s:1}],['planta',6.02,1.98,0,{s:1}],
    ['mesa',2.86,3.88,0,{s:1,w:.75,d:.75}],['silla',3.48,3.88,-90,{s:1}],['silla',2.86,3.28,0,{s:1}],
    ['cama',5.28,7.2,-90,{s:1,w:1.4,manta:'#b9703f'}],['buro',6.1,6.22,-90,{s:1}],['buro',6.1,8.18,-90,{s:1,lampara:false}],
    ['cama',1.12,7.25,90,{s:1,w:1.4,color:'#cfd8dc',manta:'#5f7f8f'}],['buro',.3,6.26,90,{s:1}]
  ]
};

var stops=[
  {n:'Vista general',d:'Casa de una planta con 2 recámaras, 1 baño y cocina equipada.',t:[3.2,.2,5.0],yaw:-.6,pitch:.9,dist:18.5,fov:.62,f:[],v:{dist:25}},
  {n:'Fachada',d:'Fachada blanca en esquina: ventana con herrería en el bloque del frente, puerta remetida y ventanal alto con herrería.',t:[3.6,1.3,1.1],yaw:-.85,pitch:.1,dist:9,fov:.72,f:[1,2]},
  {n:'Sala-comedor',d:'Ventanal de piso a techo hacia el frente.',t:[3.3,1.5,5.25],yaw:2.5,pitch:.24,dist:.01,fov:1.08,f:[6,5]},
  {n:'Cocina',d:'Cocina equipada con parrilla y gabinetes blancos.',t:[2.28,1.55,3.22],yaw:-2.5,pitch:.3,dist:.01,fov:1.15,f:[3]},
  {n:'Baño',d:'Baño completo con cancel en la regadera.',t:[2.27,1.6,5.27],yaw:-2.3,pitch:.5,dist:.01,fov:1.35,f:[4],v:{yaw:-2.6}},
  {n:'Recámara 1',d:'Recámara con clóset y ventana.',t:[4.3,1.5,5.7],yaw:.66,pitch:.26,dist:.01,fov:1.15,f:[7]},
  {n:'Recámara 2',d:'Recámara con clóset.',t:[2.62,1.55,8.25],yaw:-2.5,pitch:.24,dist:.01,fov:1.15,f:[8]},
  {n:'Patio',d:'Patio de servicio al fondo.',t:[6.0,1.5,9.6],yaw:-1.7,pitch:.3,dist:.01,fov:1.3,f:[]}
];
var rooms=[['Cocina',1.2,1.7],['Sala-comedor',4.5,3.5],['Baño',1.2,4.4],['Recámara 1',5.1,7.1],['Recámara 2',1.45,7.1],['Patio',3.2,9.5]];

window.TOUR={levels:[{n:'Casa',plan:plan,rooms:rooms}],stops:stops};
})();
