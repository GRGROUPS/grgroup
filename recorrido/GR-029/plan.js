/* Casa en Puertas del Nogal (dos plantas, 2 recámaras y 2 baños). No hay plano: la distribución se armó con las fotos
   (casa muestra y casa real) y la ficha; medidas aproximadas, distribución por confirmar con Iñaki.
   Metros. x = ancho visto desde la calle, z = fondo. La calle queda en z negativo. */
(function(){
// fotos: fachada de estuco blanco con marcos negros, recubrimiento de piedra en la entrada y bloque naranja; porcelanato
// blanco tipo mármol con vetas, muros de estuco, escalera de loseta con barandal negro, regadera de esquina con azulejo gris
var T='#ecebe7', FACH='#f1f0ec', DARK='#2a2b2e', STONE='#cfc7b6', ORA='#e0962f', LOS='#e6e4df', WOODC='#c9a275';
var D=8.0;
var rej=[], q; for(q=0;q<16;q++) rej.push([-2.36+q*.125,.1,-.14,-2.33+q*.125,2.06,-.11,'#16171a',{mat:3}]);
var baja={
  sky:'#e9eef1', center:[2.4,0,4.0], frame:DARK, tile:.6, gloss:.8, marble:1, indoor:[[0,3.1,1.05,5.5]], wallOut:FACH, wallMat:14, wallIn:'#f4f3f0', zoclo:'#dcdad5',
  ground:[
    [-9,-0.09,-13,14,21,'#8fae6b',2],
    [-9,-0.06,-13,14,-6.2,'#7b7d80',0],
    [-9,-0.03,-6.2,14,-4.8,'#cfccc5',3],
    [2.7,-0.02,-4.8,3.8,0,'#c6c3bc',3],[-2.5,-0.02,-4.8,-.1,0,'#c6c3bc',3],[3.8,-0.04,-4.8,4.8,0,'#79b44f',2]
  ],
  floors:[[0,0,4.8,3.1,T],[0,3.1,1.05,5.5,T],[1.05,3.1,4.8,5.5,T],[0,5.5,4.8,D,T]],
  ceilings:[[0,0,4.8,3.1],[1.05,3.1,3.7,5.5],[3.7,3.1,4.8,4.7],[3.7,4.7,4.8,5.5],[0,5.5,4.8,D]],
  walls:[
    {ax:'x',c:0,from:0,to:4.8,t:.15,h:2.7,color:FACH,open:[
      {from:1.3,to:2.5,sill:.75,head:2.05,kind:'window'},
      {from:2.85,to:3.65,head:2.1,kind:'door',hinge:'to',ang:0,color:DARK,mat:6,marco:'#222326'}]},
    {ax:'z',c:0,from:0,to:D,t:.15,h:2.7},
    {ax:'z',c:4.8,from:0,to:D,t:.15,h:2.7},
    {ax:'x',c:D,from:0,to:4.8,t:.15,h:2.7,open:[
      {from:.5,to:2.0,sill:.95,head:2.1,kind:'window'},
      {from:3.3,to:4.3,sill:.02,head:2.1,kind:'window'}]},
    // medio baño junto a la cocina
    {ax:'x',c:3.3,from:3.7,to:4.8},
    {ax:'z',c:3.7,from:3.3,to:4.7,open:[{from:3.55,to:4.3,head:2.1,kind:'gap'}]},
    {ax:'x',c:4.7,from:3.7,to:4.8},
    // patio trasero con pasto
    {ax:'x',c:D+2.4,from:0,to:4.8,h:2.0,color:'#d9d6cf'},{ax:'z',c:0,from:D,to:D+2.4,h:2.0,color:'#d9d6cf'},{ax:'z',c:4.8,from:D,to:D+2.4,h:2.0,color:'#d9d6cf'}
  ],
  boxes:[
    // planta alta, entrada de piedra y bloque naranja vistos desde la calle (se ocultan al ver la maqueta desde arriba)
    [-.075,2.7,-.075,4.875,5.5,D+.075,FACH,{mat:34}],
    // pilastra de piedra compartida con la casa vecina: sube hasta 3.3 m; bloque naranja con dos ventanas angostas
    [3.7,0,-.2,4.8,2.7,-.075,STONE,{mat:12}],[3.7,2.7,-.2,4.8,3.3,-.075,STONE,{mat:32}],
    [4.8,0,-.2,6.0,2.7,0,STONE,{mat:12}],[4.8,2.7,-.2,6.0,3.3,0,STONE,{mat:32}],
    [3.7,3.3,-.2,4.8,5.0,-.075,ORA,{mat:34}],
    [3.93,3.35,-.215,4.2,4.25,-.2,'#3d4a55',{mat:10}],[4.3,3.35,-.215,4.57,4.25,-.2,'#3d4a55',{mat:10}],
    [3.9,3.32,-.22,3.93,4.28,-.195,'#16171a',{mat:34}],[4.2,3.32,-.22,4.3,4.28,-.195,'#16171a',{mat:34}],[4.57,3.32,-.22,4.6,4.28,-.195,'#16171a',{mat:34}],
    [3.9,3.32,-.22,4.6,3.35,-.195,'#16171a',{mat:34}],[3.9,4.25,-.22,4.6,4.28,-.195,'#16171a',{mat:34}],
    [4.0,1.8,-.215,4.4,2.15,-.2,'#3d4a55',{mat:10}],
    // cobertizo gris sobre cada puerta
    [2.7,2.32,-.5,3.8,2.4,-.075,'#8d8f92',{mat:3}],[5.55,2.32,-.5,6.0,2.4,0,'#8d8f92',{mat:3}],
    // ventana grande de la recámara principal (2 x 2 cuadros, marco negro)
    [1.17,3.3,-.1,2.42,4.6,-.07,'#3d4a55',{mat:10}],
    [1.14,3.27,-.12,2.45,3.33,-.065,'#16171a',{mat:34}],[1.14,4.57,-.12,2.45,4.63,-.065,'#16171a',{mat:34}],
    [1.14,3.27,-.12,1.2,4.63,-.065,'#16171a',{mat:34}],[2.39,3.27,-.12,2.45,4.63,-.065,'#16171a',{mat:34}],
    [1.78,3.27,-.12,1.82,4.63,-.065,'#16171a',{mat:34}],[1.14,3.93,-.12,2.45,3.97,-.065,'#16171a',{mat:34}],
    // casa vecina: puerta negra y ventana
    [6.2,0,-.12,7.0,2.1,-.07,'#1f2023',{mat:6}],[7.5,.8,-.05,8.2,2.0,-.02,'#3d4a55',{mat:10}],
    // medidor naranja en el jardín
    [6.3,0,-1.7,7.1,.7,-1.1,'#e8a735',{mat:3}],
    // portón negro de la cochera lateral con pilastras blancas
    [-2.6,0,-.3,-2.4,2.4,-.1,FACH,{mat:14}],[-.4,0,-.3,-.2,2.4,-.1,FACH,{mat:14}],
    [-2.4,.1,-.14,-.4,.16,-.1,'#16171a',{mat:3}],[-2.4,2.0,-.14,-.4,2.06,-.1,'#16171a',{mat:3}],
    [-4.9,0,-.14,-2.6,1.9,-.02,FACH,{mat:14}],
    [-4.95,0,0,-.08,5.5,D,'#dddbd6',{mat:11}],[4.88,0,0,9.75,5.5,D,'#dddbd6',{mat:11}]
  ],
  items:[
    ['camioneta',-1.45,-2.55,180,{color:'#c9cdd0'}],
    ['escalera',.53,3.1,0,{w:.95,n:10,huella:.24,color:LOS,mat:4,barandal:1}],
    ['barra',4.72,6.7,-90,{len:2.6,estufa:.2,tarja:-.8,altos:[[-.35,.9]],color:WOODC,mat:6,cubierta:'#ecebe7'}],
    ['wc',4.3,4.63,180],['tocadorF',4.73,3.75,-90,{w:.5,color:WOODC,cubierta:WOODC}],
    ['refri',4.25,4.78,0,{s:1}],
    ['plafon',2.4,1.5,0],['plafon',2.4,4.3,0],['plafon',1.5,6.7,0],['plafon',3.6,6.7,0],['plafon',4.25,4.0,0],
    ['tapete',2.0,1.5,90,{s:1,w:2.2,d:1.5,color:'#bdb8ae',color2:'#aaa59b'}],['sofa',.58,1.5,90,{s:1,w:1.9,color:'#8a8d91',color2:'#9b9ea2'}],['mesaCentro',2.0,1.5,90,{s:1}],
    ['tv',4.72,1.5,-90,{s:1,w:1.4}],['planta',.4,2.8,0,{s:1}],
    ['mesa',1.6,6.7,0,{s:1,w:.95,d:.95,color:'#2a2623'}],['silla',1.6,6.05,0,{s:1,color:'#6b6e73'}],['silla',1.6,7.35,180,{s:1,color:'#6b6e73'}],['silla',.95,6.7,90,{s:1,color:'#6b6e73'}],['silla',2.25,6.7,-90,{s:1,color:'#6b6e73'}]
  ]
};
baja.boxes=baja.boxes.concat(rej);
var alta={
  sky:'#e9eef1', center:[2.4,0,4.0], frame:DARK, tile:.6, gloss:.8, marble:1, wallOut:FACH, wallMat:14, wallIn:'#f4f3f0', zoclo:'#dcdad5',
  ground:[[-9,-0.09,-13,14,21,'#d9dcde',0]],
  floors:[[0,0,4.8,3.3,T],[0,3.3,3.0,5.5,T],[3.0,3.3,4.8,5.5,'#e4e2dc'],[0,5.5,4.8,D,T]],
  ceilings:[[0,0,4.8,3.3],[0,3.3,3.0,5.5],[3.0,3.3,4.8,5.5],[0,5.5,4.8,D]],
  walls:[
    {ax:'x',c:0,from:0,to:4.8,t:.15,h:2.7,open:[
      {from:1.17,to:2.42,sill:.6,head:1.9,kind:'window'},
      {from:3.93,to:4.57,sill:.65,head:1.55,kind:'window'}]},
    {ax:'z',c:0,from:0,to:D,t:.15,h:2.7},
    {ax:'z',c:4.8,from:0,to:D,t:.15,h:2.7},
    {ax:'x',c:D,from:0,to:4.8,t:.15,h:2.7,open:[
      {from:.7,to:2.3,sill:.95,head:2.1,kind:'window'},
      {from:3.4,to:4.2,sill:1.2,head:2.1,kind:'window',mid:false}]},
    {ax:'x',c:3.3,from:0,to:4.8,open:[{from:1.5,to:2.3,head:2.1,kind:'gap'}]},
    {ax:'x',c:5.5,from:0,to:4.8,open:[{from:1.9,to:2.7,head:2.1,kind:'gap'}]},
    {ax:'z',c:3.0,from:3.3,to:5.5,open:[{from:4.65,to:5.4,head:2.1,kind:'gap'}]}
  ],
  boxes:[],
  items:[
    ['hueco',.55,3.42,0,{w:.95,l:2.4,lados:[1],color:LOS}],
    ['regadera',4.72,3.38,-90,{w:.9,d:1.34}],['wc',4.73,4.7,-90],['tocadorF',4.73,5.2,-90,{w:.5,color:WOODC,cubierta:'#ecebe7'}],
    ['plafon',2.4,1.6,0],['plafon',1.6,4.4,0],['plafon',3.9,4.4,0],['plafon',2.4,6.7,0],
    ['cama',1.15,1.65,90,{s:1,w:1.4,manta:'#8fc3ad'}],['buro',.3,.7,90,{s:1}],['buro',.3,2.6,90,{s:1,lampara:false}],
    ['closet',3.22,1.0,-90,{s:1,w:1.4}],
    ['cama',1.0,6.7,90,{s:1,w:.95,manta:'#e6a9c6'}],['closet',4.72,6.8,-90,{s:1,w:1.4}]
  ]
};
var stops=[
  {n:'Planta baja',d:'Sala, comedor, cocina, medio baño y patio trasero con pasto.',lvl:0,t:[2.4,.2,4.0],yaw:-.6,pitch:.9,dist:18,fov:.62,f:[],v:{dist:24}},
  {n:'Fachada',d:'Casa de dos plantas con entrada de piedra, cochera al frente y detalle naranja.',lvl:0,t:[2.4,2.5,0],yaw:-.5,pitch:.06,dist:12.5,fov:.75,f:[1],v:{dist:16}},
  {n:'Sala',d:'Sala amplia al frente, con la escalera a la vista.',lvl:0,t:[4.35,1.55,2.8],yaw:-2.2,pitch:.22,dist:.01,fov:1.15,f:[2]},
  {n:'Comedor',d:'Comedor con ventana al patio, junto a la cocina.',lvl:0,t:[.45,1.55,5.8],yaw:.75,pitch:.25,dist:.01,fov:1.2,f:[3]},
  {n:'Cocina',d:'Cocina con salida de vidrio al patio trasero.',lvl:0,t:[3.5,1.55,5.1],yaw:.12,pitch:.32,dist:.01,fov:1.2,f:[4]},
  {n:'Medio baño',d:'Medio baño de visitas en planta baja.',lvl:0,t:[3.2,1.6,3.88],yaw:1.5,pitch:.5,dist:.01,fov:1.15,f:[]},
  {n:'Planta alta',d:'Dos recámaras y baño completo con regadera.',lvl:1,t:[2.4,.2,4.0],yaw:-.6,pitch:.9,dist:18,fov:.62,f:[],v:{dist:24}},
  {n:'Escalera',d:'Escalera de loseta con barandal negro y ventana de luz natural.',lvl:1,t:[1.8,1.55,4.4],yaw:2.4,pitch:.4,dist:.01,fov:1.15,f:[5,10]},
  {n:'Recámara principal',d:'Recámara principal al frente, con ventana a la calle.',lvl:1,t:[3.0,1.55,2.9],yaw:-2.3,pitch:.25,dist:.01,fov:1.2,f:[6]},
  {n:'Baño completo',d:'Baño completo con regadera de esquina y ventana.',lvl:1,t:[3.4,1.6,5.35],yaw:1.1,pitch:.45,dist:.01,fov:1.3,f:[8,9]},
  {n:'Recámara 2',d:'Segunda recámara al fondo, con ventana al patio.',lvl:1,t:[3.0,1.55,7.3],yaw:-.75,pitch:.28,dist:.01,fov:1.2,f:[7]}
];
window.TOUR={levels:[
  {n:'Planta baja',plan:baja,rooms:[['Sala',2.4,1.5],['Escalera',.55,4.3],['Medio baño',4.25,4.0],['Cocina',4.0,6.7],['Comedor',1.6,6.7],['Patio',2.4,9.2]]},
  {n:'Planta alta',plan:alta,rooms:[['Recámara principal',1.6,1.7],['Pasillo',1.9,4.4],['Baño',3.9,4.4],['Recámara 2',2.4,6.7]]}
],stops:stops};
})();
