/* Casa en Santa María Magdalena (dos niveles, segundo nivel en obra negra). Sin muebles.
   No hay plano: la distribución se armó a partir de pocas fotos y de la ficha (160 m² de terreno, 120 m² de construcción);
   medidas y posición de los cuartos aproximadas. Metros. x = ancho visto desde la calle, z = fondo. La calle queda en z negativo. */
(function(){
// fotos: fachada de muro desconchado verde y blanco con zaguán negro y puerta azul, pisos de concreto gris, muros de
// repello blanco desgastado, ventana con repisa profunda y marco oscuro, puerta verde, azotea con muros de tabique rojo
var CON='#7f7d79', BRK='#b4603f', DOOR1='#1d1c1b', DOOR2='#3b6fb5', DOOR3='#4f8a7c';
var baja={
  sky:'#e9eef1', center:[4,0,8], frame:'#242424', tile:0, gloss:.1, wallOut:'#cfe0d3', wallMat:14, wallIn:'#e3dccf', zoclo:'#d6cfc2',
  ground:[
    [-10,-0.09,-14,18,24,'#9aa27a',2],
    [-10,-0.06,-14,18,-5.2,'#6f7174',0],
    [-10,-0.03,-5.2,18,0,'#bdb8ad',3],
    [0,-0.015,11.5,8,20,'#a49c8f',3]
  ],
  floors:[[0,0,8,11.5,CON,3]],
  ceilings:[[0,0,8,4.5],[0,4.5,6.75,8],[7.65,4.5,8,8],[0,8,8,11.5]],
  walls:[
    /* fachada: zaguán negro y puerta azul, como en las fotos */
    {ax:'x',c:0,from:0,to:8,t:.2,h:2.9,out:-1,open:[
      {from:.5,to:3.0,head:2.5,kind:'door',hinge:'to',ang:0,color:DOOR1,mat:6},
      {from:4.3,to:6.3,head:2.5,kind:'door',hinge:'to',ang:0,color:DOOR2,mat:6}]},
    {ax:'z',c:0,from:0,to:11.5,t:.2,h:2.9},
    {ax:'z',c:8,from:0,to:11.5,t:.2,h:2.9},
    /* fondo: ventana de la recámara 1, puerta al patio y ventana de la recámara 2 */
    {ax:'x',c:11.5,from:0,to:8,t:.2,h:2.9,open:[
      {from:.9,to:2.3,sill:.95,head:2.1,kind:'window'},
      {from:3.5,to:4.5,head:2.2,kind:'door',hinge:'from',ang:1.2,color:DOOR1,mat:6},
      {from:5.6,to:7.0,sill:.95,head:2.1,kind:'window'}]},
    /* zaguán | sala, y frente | zona media */
    {ax:'z',c:3.4,from:0,to:4.5,open:[{from:1.4,to:2.4,head:2.2,kind:'gap'}]},
    {ax:'x',c:4.5,from:0,to:8,open:[
      {from:2.3,to:3.1,head:2.1,kind:'door',hinge:'from',ang:1.2,color:DOOR3,mat:6},
      {from:5.9,to:6.9,head:2.2,kind:'gap'}]},
    /* baño | cocina | recibidor con la escalera */
    {ax:'z',c:2.2,from:4.5,to:8,open:[{from:7.0,to:7.7,head:2.1,kind:'door',hinge:'from',ang:-1.2,color:DOOR3,mat:6}]},
    {ax:'z',c:5.2,from:4.5,to:8,open:[{from:5.0,to:6.4,head:2.2,kind:'gap'}]},
    /* recámaras al fondo y pasillo al patio */
    {ax:'x',c:8,from:0,to:8,open:[{from:3.2,to:4.8,head:2.2,kind:'gap'},{from:5.4,to:6.2,head:2.1,kind:'door',hinge:'from',ang:1.2,color:DOOR3,mat:6}]},
    {ax:'z',c:3.2,from:8,to:11.5,open:[{from:8.6,to:9.4,head:2.1,kind:'door',hinge:'to',ang:-1.2,color:DOOR3,mat:6}]},
    {ax:'z',c:4.8,from:8,to:11.5}
  ],
  boxes:[
    /* barda del patio y casas vecinas */
    [-.1,0,11.5,0,2.4,20.1,'#b9b4aa',{mat:3}],[8,0,11.5,8.1,2.4,20.1,'#b9b4aa',{mat:3}],[-.1,0,20,8.1,2.4,20.12,'#b9b4aa',{mat:3}],
    [-6.6,0,0,-.1,6.2,11.5,'#e2dfd7',{mat:11}],[8.1,0,0,14,6.2,11.5,'#e2dfd7',{mat:11}],
    /* segundo nivel visto desde la calle: muros de tabique (se oculta al quitar el techo) */
    [-.1,2.9,7.9,.1,5.5,11.6,BRK,{mat:32}],[7.9,2.9,7.9,8.1,5.5,11.6,BRK,{mat:32}],[-.1,2.9,11.4,8.1,5.5,11.6,BRK,{mat:32}],
    [-.1,2.9,-.1,8.1,3.95,.1,BRK,{mat:32}]
  ],
  items:[
    ['wc',.45,4.58,0],['regadera',1.5,7.95,180,{w:.9,d:1.0}],
    ['plafon',1.7,2.2,0],['plafon',5.7,2.2,0]
  ]
};
var alta={
  sky:'#e9eef1', center:[4,0,8], frame:'#242424', tile:0, gloss:.1, wallOut:BRK, wallMat:12, wallIn:BRK, zoclo:'#7f7d79',
  ground:[[-10,-0.09,-14,18,24,'#d9dcde',0]],
  floors:[[0,0,8,4.5,CON,3],[0,4.5,6.75,8,CON,3],[7.65,4.5,8,8,CON,3],[0,8,8,11.5,CON,3]],
  walls:[
    /* azotea: pretiles bajos de tabique, como en la foto */
    {ax:'x',c:0,from:0,to:8,t:.2,h:1.1,color:BRK,mat:12},
    {ax:'z',c:0,from:0,to:8,t:.2,h:1.1,color:BRK,mat:12},
    {ax:'z',c:8,from:0,to:8,t:.2,h:1.1,color:BRK,mat:12},
    /* segundo nivel en obra negra: muros de tabique sin repellar y sin techo */
    {ax:'z',c:0,from:8,to:11.5,t:.2,h:2.7,color:BRK,mat:12},
    {ax:'z',c:8,from:8,to:11.5,t:.2,h:2.7,color:BRK,mat:12},
    {ax:'x',c:11.5,from:0,to:8,t:.2,h:2.7,color:BRK,mat:12,open:[
      {from:1.0,to:2.4,sill:.95,head:2.1,kind:'gap'},{from:5.6,to:7.0,sill:.95,head:2.1,kind:'gap'}]},
    {ax:'x',c:8,from:0,to:8,t:.2,h:2.7,color:BRK,mat:12,open:[
      {from:1.0,to:1.9,head:2.1,kind:'gap'},{from:6.75,to:7.65,head:2.2,kind:'gap'}]},
    {ax:'z',c:4,from:8,to:11.5,t:.15,h:2.7,color:BRK,mat:12,open:[{from:9.0,to:9.9,head:2.1,kind:'gap'}]}
  ],
  boxes:[[-6.6,0,0,-.1,3.4,11.5,'#e2dfd7',{mat:11}],[8.1,0,0,14,3.4,11.5,'#e2dfd7',{mat:11}]],
  items:[
    ['hueco',7.2,4.5,0,{w:.9,l:3.5,lados:[1,-1],color:'#8c8a86'}]
  ]
};
/* escalera de concreto al segundo nivel, arranca en el recibidor y sube hacia el fondo */
baja.items.push(['escalera',7.2,4.5,0,{w:.9,n:13,huella:.27,alto:2.8,mat:3,color:'#8c8a86'}]);
var stops=[
  {n:'Vista general',d:'Casa de dos niveles en terreno de 160 m²; el segundo nivel está en obra negra, listo para terminar a tu gusto.',lvl:0,t:[4,.2,8],yaw:-.6,pitch:.9,dist:19,fov:.62,f:[],v:{dist:25}},
  {n:'Fachada',d:'Zaguán negro y puerta azul de entrada, a pie de calle.',lvl:0,t:[4,1.4,0],yaw:-.5,pitch:.08,dist:11,fov:.72,f:[6,11]},
  {n:'Sala',d:'Sala al frente, con piso de concreto listo para el acabado que prefieras.',lvl:0,t:[5.7,1.5,.5],yaw:.8,pitch:.2,dist:.01,fov:1.25,f:[4]},
  {n:'Recámara 1',d:'Recámara al fondo con ventana de repisa profunda.',lvl:0,t:[2.9,1.5,8.2],yaw:-.45,pitch:.22,dist:.01,fov:1.25,f:[2,8]},
  {n:'Baño',d:'Baño de planta baja junto a la cocina.',lvl:0,t:[1.5,1.6,7.0],yaw:-2.4,pitch:.45,dist:.01,fov:1.45,f:[3,9]},
  {n:'Recámara 2',d:'Recámara con puerta verde y salida al pasillo.',lvl:0,t:[7.5,1.5,8.25],yaw:.15,pitch:.22,dist:.01,fov:1.25,f:[5,10]},
  {n:'Patio',d:'Zona de patio al fondo del terreno.',lvl:0,t:[4,1.0,13.2],yaw:0,pitch:.5,dist:8,fov:.8,f:[]},
  {n:'Segundo nivel',d:'Dos recámaras más en obra negra, con muros de tabique, para terminar a tu gusto.',lvl:1,t:[4,.2,8],yaw:-.6,pitch:.9,dist:19,fov:.62,f:[],v:{dist:25}},
  {n:'Azotea',d:'Azotea al frente del segundo nivel, con pretiles de tabique y la escalera.',lvl:1,t:[3.2,1.0,2.0],yaw:-.9,pitch:.5,dist:8,fov:.85,f:[1,7]},
  {n:'Recámaras en obra negra',d:'Dos recámaras con ventana al patio, listas para repellar y poner piso.',lvl:1,t:[2.0,1.5,8.25],yaw:.5,pitch:.2,dist:.01,fov:1.3,f:[]}
];
var rooms0=[['Zaguán',1.7,2.2],['Sala',5.7,2.2],['Baño',1.1,6.2],['Cocina',3.7,6.2],['Escalera',6.4,6.2],['Recámara 1',1.6,9.8],['Pasillo',4.0,9.8],['Recámara 2',6.4,9.8],['Patio',4,15.5]];
var rooms1=[['Azotea',3.4,2.2],['Escalera',7.2,6.2],['Recámara 3',2.0,9.8],['Recámara 4',6.0,9.8]];
window.TOUR={levels:[{n:'Planta baja',plan:baja,rooms:rooms0},{n:'Segundo nivel',plan:alta,rooms:rooms1}],stops:stops};
})();
