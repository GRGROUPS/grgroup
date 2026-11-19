/* Casa en Viñedos (una planta), en esquina. Medidas aproximadas, deducidas de las fotos; distribución aprobada por Iñaki (14 nov 2026).
   Casa de 4.4 m de frente: bloque del frente (recámara 1 con ventana de herrería blanca) y remetido con la entrada pegada al bloque
   y el ventanal alto de la sala. Adentro: recámara 1 y baño del lado del vecino, sala con el ventanal, cocina-comedor detrás de la sala
   con salida al patio, recámara 2 detrás del baño. Al costado, banqueta de la esquina con poste; detrás, la casa vecina de dos niveles con tinaco.
   Metros. x = ancho (0 = muro del vecino), z = fondo (0 = frente a la calle). */
(function(){
var T='#d6cabb', WHT='#f3f2ee', MOL='#f4f3ef';
var plan={
  sky:'#e9eef1', tile:.33, gloss:.45, wallOut:'#f2f1ee', wallMat:14, wallIn:'#f3eee8', zoclo:'#cdbfae', center:[2.2,0,5],
  ground:[ // [x0, yTop, z0, x1, z1, color, material]  2 pasto, 3 concreto
    [-10,-0.09,-10,17,18,'#8fae6b',2],
    [-10,-0.06,-10,17,-2.7,'#7b7d80',0],
    [-10,-0.045,-6,1.4,-2.7,'#8fae6b',2],
    [-10,-0.03,-2.7,17,0.0,'#cfccc5',3],
    [4.48,-0.03,-2.7,6.3,18,'#cfccc5',3],[6.3,-0.06,-10,17,18,'#7b7d80',0],
    [-.5,-0.02,-1.4,2.4,0,'#8fae6b',2],
    [0,-0.015,8.6,4.4,10.4,'#c6c3bc',3]
  ],
  floors:[[0,0,2.4,3.0,T],[0,3.0,2.4,5.0,'#e4e2dc'],[2.4,1.6,4.4,5.0,T],[2.4,5.0,4.4,8.6,T],[0,5.0,2.4,8.6,T]],
  ceilings:[[0,0,2.4,3.0],[0,3.0,2.4,5.0],[2.4,1.6,4.4,5.0],[2.4,5.0,4.4,8.6],[0,5.0,2.4,8.6]],
  walls:[
    // bloque del frente: recámara 1 con ventana de herrería blanca
    {ax:'x',c:0,from:0,to:2.4,t:.15,h:2.75,out:-1,open:[{from:.5,to:1.9,sill:.95,head:2.15,kind:'window',grille:true}]},
    {ax:'z',c:2.4,from:0,to:1.6,t:.15,h:2.75},
    // remetido: entrada pegada al bloque y ventanal alto de la sala
    {ax:'x',c:1.6,from:2.4,to:4.4,t:.15,h:2.7,out:-1,open:[
      {from:2.47,to:3.17,head:2.15,kind:'door',hinge:'from',ang:0,color:'#e9e8e3',mat:0},
      {from:3.27,to:4.27,sill:.3,head:2.3,kind:'window',grille:true}]},
    // costado a la banqueta y muro del vecino
    {ax:'z',c:4.4,from:1.6,to:8.6,t:.15,h:2.7},
    {ax:'z',c:0,from:0,to:8.6,t:.15,h:2.7},
    // fondo: ventana de la recámara 2 y puerta de la cocina al patio
    {ax:'x',c:8.6,from:0,to:4.4,t:.15,h:2.7,open:[
      {from:.6,to:1.8,sill:.95,head:2.1,kind:'window'},
      {from:3.2,to:3.95,head:2.1,kind:'glassdoor',mid:false}]},
    // interiores
    {ax:'x',c:3.0,from:0,to:2.4},
    {ax:'x',c:5.0,from:0,to:2.4},
    {ax:'z',c:2.4,from:1.6,to:8.6,open:[
      {from:1.75,to:2.5,head:2.1,kind:'door',hinge:'from',ang:0},
      {from:3.4,to:4.1,head:2.1,kind:'door',hinge:'from',ang:0},
      {from:5.3,to:6.05,head:2.1,kind:'door',hinge:'from',ang:0}]},
    // bardas del patio
    {ax:'x',c:10.4,from:0,to:4.4,h:2.2,color:'#e4e1da'},
    {ax:'z',c:0,from:8.6,to:10.4,h:2.2,color:'#e4e1da'},
    {ax:'z',c:4.4,from:8.6,to:10.4,h:2.2,color:'#e4e1da'}
  ],
  boxes:[
    // casa vecina y pilastra verde con medidores
    [-3.2,0,0,-.09,2.7,8.6,'#e6e8e7',{top:'#c9ccca'}],
    [-.55,0,-.3,-.08,3.05,.12,'#a9c9a0',{mat:14}],[-.36,.2,-.31,-.3,2.9,-.29,'#8fb386'],
    [-.5,1.25,-.38,-.36,1.45,-.3,'#8e8e8a',{mat:16}],[-.24,1.25,-.38,-.1,1.45,-.3,'#8e8e8a',{mat:16}],
    // remate del bloque del frente
    [-.08,2.75,-.12,2.48,2.83,1.6,'#e9e7e2',{mat:14}],
    // lámparas: blanca al frente y negra en el costado del bloque
    [1.95,2.32,-.14,2.17,2.52,-.075,'#f4f4f1',{mat:9}],[2.475,2.15,1.1,2.56,2.38,1.27,'#1d1d1f',{mat:16}],
    // nicho de la entrada y moldura del ventanal
    [3.17,0,1.32,3.24,2.3,1.525,WHT,{mat:14}],[2.475,2.15,1.32,3.24,2.3,1.525,WHT,{mat:14}],
    [3.2,.2,1.46,4.34,.3,1.525,MOL,{mat:14}],[3.2,2.3,1.46,4.34,2.4,1.525,MOL,{mat:14}],
    [3.2,.3,1.46,3.27,2.3,1.525,MOL,{mat:14}],[4.27,.3,1.46,4.34,2.3,1.525,MOL,{mat:14}],
    // firme de concreto elevado frente a la entrada
    [2.475,0,.15,4.48,.1,1.52,'#c9c6bf',{mat:3}],
    // poste de luz en la banqueta
    [5.86,0,2.46,5.94,4.3,2.54,'#1d1d1f',{mat:16}],[5.8,4.3,2.4,6.0,4.6,2.6,'#e9e7e0',{mat:9}],
    // casa vecina de dos niveles detrás, con ventanitas al costado
    [.4,0,10.5,4.4,5.6,16,'#f1f0ec',{mat:11}],
    [4.4,3.6,11.2,4.43,4.3,11.6,'#3a4048',{mat:11}],[4.4,3.6,12.6,4.43,4.3,13.0,'#3a4048',{mat:11}],[4.4,3.6,14.0,4.43,4.3,14.4,'#3a4048',{mat:11}]
  ],
  // [mueble, x, z, ángulo, opciones]; s:1 = mueble sugerido (se puede ocultar)
  items:[
    ['camioneta',3.2,-3.8,270,{color:'#b9bdc2'}],
    // fijos, como en las fotos
    ['barra',4.32,7.1,-90,{len:2.3,estufa:.1,tarja:-.75,altos:[[-1.1,-.2],[.25,1.1]],cubierta:'#dedbd4'}],
    ['regadera',.08,3.08,0,{w:.9,d:1.85}],['lavabo',1.45,3.08,0],['wc',1.45,4.92,180],
    ['closet',1.2,2.92,180,{w:1.4}],['closet',1.0,5.08,0,{w:1.4}],
    ['lavadero',.75,10.33,180],['boiler',4.1,8.68,0],
    ['tinaco',3.0,12.0,0,{y0:5.6,r:.45,h:.75,color:'#1f2022'}],
    ['plafon',1.2,1.5,0],['plafon',1.2,4.0,0],['plafon',3.4,3.3,0],['plafon',3.4,6.8,0],['plafon',1.2,7.0,0],
    // sugeridos
    ['refri',4.32,5.45,-90,{s:1}],
    ['sofa',3.86,3.6,-90,{s:1,w:1.8}],['mesaCentro',3.0,3.6,-90,{s:1}],['planta',4.15,1.95,0,{s:1}],
    ['mesa',3.0,6.6,0,{s:1,w:.75,d:.75}],['silla',3.0,6.0,0,{s:1}],['silla',3.0,7.2,180,{s:1}],
    ['cama',1.12,1.5,90,{s:1,w:1.4,manta:'#b9703f'}],['buro',.3,.45,90,{s:1}],
    ['cama',1.12,7.3,90,{s:1,w:1.4,color:'#cfd8dc',manta:'#5f7f8f'}],['buro',.3,8.3,90,{s:1}]
  ]
};

var stops=[
  {n:'Vista general',d:'Casa de una planta en esquina, de 4.4 m de frente: 2 recámaras, 1 baño, sala, cocina-comedor y patio.',t:[2.2,.2,5.0],yaw:-.6,pitch:.9,dist:17,fov:.62,f:[],v:{dist:23}},
  {n:'Fachada',d:'Fachada blanca en esquina: ventana con herrería en el bloque del frente, entrada pegada al bloque y ventanal alto con herrería.',t:[3.0,1.3,1.1],yaw:-.85,pitch:.1,dist:9,fov:.72,f:[1,2]},
  {n:'Sala',d:'Sala con el ventanal a la calle; junto a la entrada, la puerta de la recámara 1 y la del baño.',t:[4.1,1.5,4.7],yaw:-2.61,pitch:.22,dist:.01,fov:1.15,f:[6,5]},
  {n:'Recámara 1',d:'Recámara al frente, con clóset y ventana a la calle.',t:[2.2,1.5,2.6],yaw:-2.46,pitch:.26,dist:.01,fov:1.2,f:[7]},
  {n:'Baño',d:'Baño completo con cancel en la regadera.',t:[2.2,1.6,3.75],yaw:-1.57,pitch:.45,dist:.01,fov:1.35,f:[4]},
  {n:'Cocina-comedor',d:'Cocina equipada con parrilla y gabinetes blancos, detrás de la sala, con salida al patio.',t:[2.7,1.55,5.3],yaw:.66,pitch:.3,dist:.01,fov:1.15,f:[3]},
  {n:'Recámara 2',d:'Recámara al fondo, con clóset y ventana al patio.',t:[2.2,1.5,5.6],yaw:-.62,pitch:.24,dist:.01,fov:1.15,f:[8]},
  {n:'Patio',d:'Patio de servicio al fondo.',t:[3.4,1.5,9.2],yaw:-1.7,pitch:.3,dist:.01,fov:1.3,f:[]}
];
var rooms=[['Recámara 1',1.2,1.0],['Baño',1.2,4.0],['Sala',3.4,2.6],['Cocina-comedor',3.4,7.6],['Recámara 2',1.2,6.6],['Patio',2.2,9.5]];

window.TOUR={levels:[{n:'Casa',plan:plan,rooms:rooms}],stops:stops};
})();
