/* Casa en Rancho San Pedro (una planta, ampliada; terreno de 84 m²; dentro de privada; para remodelar).
   No hay plano: distribución armada con las fotos y aprobada por Iñaki (14 nov 2026): recámara 1 y sala al frente, baño entre la
   recámara 1 y la cocina, cocina-comedor abierta; al fondo de la cocina: tarja con ventana al patio (se ve el boiler), puerta al patio
   con murete y puerta directa a la recámara 2. El patio llega hasta el fondo de la recámara 2. Medidas aproximadas.
   El visor muestra la casa limpia, con muebles básicos. Metros. x = ancho visto desde la calle, z = fondo. La calle queda en z negativo. */
(function(){
// fotos: fachada color crema y blanca de una planta, puerta con reja negra y ventana con reja, jardín con losas, cocina con lavatrastes y
// puerta de cristal al patio, baño con muros de azulejo blanco
var T='#d9c5a6', EXT='#ebe4d2', BEI='#c6b994', BLA='#ecebe5', COR='#e4ddcb', REJA='#1d1d1f', DOOR='#eeece6';
/* fachada en tres volúmenes, como en la foto: bloque crema alto (sin ventanas, con lámpara), bloque blanco con la ventana
   y bloque de la puerta, el más bajo, con marquesina; herrería negra en ventana y puerta */
var fb=[], i, x, y;
// bloque crema: sale un poco al frente, con cornisa clara
fb.push([-.09,0,-.24,2.8,3.2,-.09,BEI,{mat:14}],[-.16,3.02,-.31,2.86,3.2,-.09,COR,{mat:14}],[-.16,3.2,-.31,2.86,3.25,.2,COR,{mat:14}]);
fb.push([1.12,2.42,-.3,1.34,2.6,-.24,'#9a9890',{mat:16}],[1.16,2.46,-.33,1.3,2.56,-.3,'#d9d6cc',{mat:9}]);          // lámpara
// bloque blanco: cornisa, repisón y moldura bajo la ventana
fb.push([2.8,2.78,-.2,4.22,2.95,-.09,COR,{mat:14}],[2.8,2.95,-.2,4.22,3.0,.15,COR,{mat:14}]);
fb.push([2.84,.92,-.22,3.92,1.0,-.09,'#f2f1ec',{mat:14}],[2.84,.74,-.15,3.92,.86,-.09,'#e6e3da',{mat:14}]);
fb.push([3.15,0,-.24,3.35,.24,-.09,'#7a5a40',{mat:6}],[2.98,0,-.2,3.1,.12,-.09,'#8e8e8e',{mat:16}]);                 // registros
// bloque de la puerta: cornisa y marquesina
fb.push([4.15,2.6,-.17,6.09,2.75,-.09,COR,{mat:14}],[4.15,2.3,-.62,5.7,2.42,-.09,BLA,{mat:14}]);
// reja de la ventana
for(i=0;i<=5;i++){x=2.9+i*(.94/5); fb.push([x-.012,1.0,-.27,x+.012,2.22,-.245,REJA,{mat:16}]);}
[1.0,1.55,1.95,2.2].forEach(function(y){fb.push([2.88,y-.012,-.27,3.86,y+.012,-.245,REJA,{mat:16}]);});
fb.push([3.86,1.6,-.27,3.93,1.63,-.2,REJA,{mat:16}],[3.86,2.05,-.27,3.93,2.08,-.2,REJA,{mat:16}]);
// reja de la puerta: dos hojas frente a la puerta y la ventanilla
for(i=0;i<=13;i++){x=4.22+i*(1.72/13); fb.push([x-.011,0,-.24,x+.011,2.24,-.22,REJA,{mat:16}]);}
[.04,.32,.55,2.22].forEach(function(y){fb.push([4.2,y-.016,-.245,5.96,y+.016,-.215,REJA,{mat:16}]);});
fb.push([5.08,0,-.25,5.13,2.25,-.21,REJA,{mat:16}],[4.18,0,-.25,4.23,2.26,-.09,REJA,{mat:16}],[5.93,0,-.25,5.98,2.26,-.09,REJA,{mat:16}]);
fb.push([4.98,.98,-.27,5.05,1.18,-.24,'#3a3a3a',{mat:16}]);                                                             // chapa
// cortinas rosas detrás de la ventana
fb.push([2.95,1.05,-.026,3.35,2.15,-.012,'#6e2b3e',{mat:7}],[3.39,1.05,-.026,3.79,2.15,-.012,'#c04d74',{mat:7}]);
// azotea (se oculta en la vista general, cuando se quita el techo)
fb.push([-.09,2.7,-.09,6.09,2.82,7.69,'#bdb7ab',{mat:25}],[3.11,2.7,7.6,6.09,2.82,11.09,'#bdb7ab',{mat:25}]);
// vecinos
fb.push([-6.6,0,0,-1.0,2.9,11,'#e9e8e4',{mat:11}],[6.09,0,0,12,2.9,11,'#e9e8e4',{mat:11}],[-6.6,0,11.09,12,2.9,16,'#e9e8e4',{mat:11}]);
fb.push([2.38,0,6.95,2.52,1.1,7.51,BLA,{mat:14}]);                                                            // murete junto a la puerta del patio
var plan={
  sky:'#dfe4e8', center:[3,0,6], frame:'#e8e8e6', tile:.33, gloss:.4, wallOut:EXT, wallMat:14, wallIn:'#f1eee6', zoclo:'#cdbfaa',
  ground:[
    [-10,-0.09,-16,17,26,'#8fae6b',2],
    [-10,-0.06,-16,17,-8.0,'#6d6f72',0],
    [-10,-0.03,-8.0,17,-7.2,'#cfccc5',3],
    [-1,-0.04,-7.2,7,0,'#7fa05a',2],
    /* andador recto de losas hasta la puerta */
    [4.5,-0.03,-1.3,5.9,-.3,'#c9c5bc',3],[4.5,-0.03,-2.4,5.9,-1.5,'#c9c5bc',3],[4.5,-0.03,-3.5,5.9,-2.6,'#c9c5bc',3],
    [4.5,-0.03,-4.6,5.9,-3.7,'#c9c5bc',3],[4.5,-0.03,-5.7,5.9,-4.8,'#c9c5bc',3],[4.5,-0.03,-6.8,5.9,-5.9,'#c9c5bc',3],
    /* andador en diagonal entre el pasto */
    [2.2,-0.03,-1.6,3.0,-.8,'#c9c5bc',3],[1.85,-0.03,-2.7,2.65,-1.85,'#c9c5bc',3],[1.5,-0.03,-3.8,2.3,-2.95,'#c9c5bc',3],
    [1.15,-0.03,-4.9,1.95,-4.05,'#c9c5bc',3],[.8,-0.03,-6.0,1.6,-5.15,'#c9c5bc',3],[.45,-0.03,-7.1,1.25,-6.25,'#c9c5bc',3],
    [.2,-0.03,-1.0,1.3,-.55,'#c9c5bc',3]
  ],
  floors:[[0,0,6,3.6,T],[0,3.6,2.2,6.0,'#e6e2da'],[2.2,3.6,6,6.0,T],[0,6.0,6,7.6,T],[3.2,7.6,6,11,T],[0,7.6,3.2,11,'#a49c8f',3]],
  ceilings:[[0,0,6,7.6],[3.2,7.6,6,11]],
  walls:[
    /* fachada en tres volúmenes de distinta altura */
    {ax:'x',c:0,from:0,to:2.8,t:.18,h:3.2,out:-1,color:BEI},
    {ax:'x',c:0,from:2.8,to:4.15,t:.18,h:2.95,out:-1,color:BLA,open:[
      {from:2.9,to:3.84,sill:1.0,head:2.2,kind:'window'}]},
    {ax:'x',c:0,from:4.15,to:6,t:.18,h:2.75,out:-1,color:BLA,open:[
      {from:4.3,to:5.08,head:2.15,kind:'door',hinge:'to',ang:0,color:DOOR,mat:6},
      {from:5.2,to:5.88,sill:.35,head:2.15,kind:'window',mid:false}]},
    /* costado izquierdo: ventana de la recámara 1 y ventanita del baño */
    {ax:'z',c:0,from:0,to:3.6,t:.18,h:3.2,color:BEI,open:[{from:1.0,to:2.3,sill:1.0,head:2.1,kind:'window'}]},
    {ax:'z',c:0,from:3.6,to:7.6,t:.18,h:2.7,open:[{from:4.5,to:5.1,sill:1.5,head:2.1,kind:'window',mid:false}]},
    {ax:'z',c:0,from:7.6,to:11,t:.18,h:2.4},
    {ax:'z',c:6,from:0,to:11,t:.18,h:2.7},
    {ax:'x',c:11,from:0,to:3.2,t:.18,h:2.4},
    {ax:'x',c:11,from:3.2,to:6,t:.18,h:2.7},
    /* recámara 1 | sala */
    {ax:'z',c:2.8,from:0,to:3.6,open:[{from:2.75,to:3.5,head:2.1,kind:'door',hinge:'to',ang:0,color:DOOR,mat:6}]},
    /* recámara 1 | baño; sala abierta al comedor */
    {ax:'x',c:3.6,from:0,to:6,open:[{from:2.95,to:5.9,head:2.1,kind:'gap'}]},
    /* baño, con puerta al comedor */
    {ax:'z',c:2.2,from:3.6,to:6.0,open:[{from:4.4,to:5.15,head:2.1,kind:'door',hinge:'from',ang:0,color:DOOR,mat:6}]},
    {ax:'x',c:6.0,from:0,to:2.2},
    /* fondo de la cocina: tarja con ventana al patio, puerta con vidrios al patio y puerta directa a la recámara 2 */
    {ax:'x',c:7.6,from:0,to:6,t:.18,h:2.7,open:[
      {from:.2,to:1.3,sill:1.1,head:2.1,kind:'window'},
      {from:1.5,to:2.3,head:2.15,kind:'door',hinge:'from',ang:0,color:DOOR,mat:6},
      {from:3.4,to:4.2,head:2.1,kind:'door',hinge:'from',ang:0,color:DOOR,mat:6}]},
    /* recámara 2: ventana con reja al patio */
    {ax:'z',c:3.2,from:7.6,to:11,t:.18,h:2.7,out:-1,open:[{from:8.6,to:9.9,sill:1.0,head:2.1,kind:'window',grille:true}]}
  ],
  boxes:fb,
  items:[
    /* sala */
    ['tv',5.92,1.7,-90,{w:1.3}],['tapete',4.5,1.7,90,{s:1,w:1.7,d:1.5,color:'#6f6259',color2:'#5f534b'}],['sofa',3.3,1.7,90,{s:1,w:1.9,color:'#7f8c99',color2:'#93a0ad'}],['mesaCentro',4.5,1.7,90,{s:1}],
    /* recámara 1, al frente */
    ['cama',.85,2.3,90,{s:1,w:1.4,manta:'#8f8a6a'}],['buro',.3,3.3,90,{s:1}],['closet',1.25,.17,0,{s:1,w:1.5}],
    /* baño */
    ['regadera',1.03,5.92,180,{w:.95,d:.9}],['wc',.08,3.95,90],['lavabo',.08,4.7,90],
    /* cocina: tarja en la esquina bajo la ventana, estufa y refri */
    ['barra',.08,6.85,90,{len:1.4,estufa:-.35,tarja:.4,color:'#d9d4c8',mat:6,cubierta:'#bdb8ad'}],['refri',5.92,7.0,-90],
    /* murete junto a la puerta del patio */
    /* comedor */
    ['mesa',4.2,5.3,0,{s:1,w:.9,d:1.3}],['silla',4.2,4.65,0,{s:1}],['silla',4.2,5.95,180,{s:1}],['silla',3.55,5.3,90,{s:1}],['silla',4.85,5.3,-90,{s:1}],
    /* recámara 2 */
    ['cama',4.92,9.4,-90,{s:1,w:1.4,manta:'#5f7f8f'}],['buro',5.72,8.4,-90,{s:1}],['closet',4.6,10.92,180,{s:1,w:1.5}],
    /* tinaco en la azotea */
    ['tinaco',3.2,.75,0,{y0:2.7,r:.36,h:.5,color:'#9a5c6c'}],
    /* patio de servicio */
    ['lavadero',2.0,10.85,180],['boiler',.6,7.85,0],
    ['plafon',4.4,1.8,0],['plafon',1.4,1.8,0],['plafon',1.1,4.8,0],['plafon',4.1,5.0,0],['plafon',1.6,6.8,0],['plafon',4.6,9.3,0]
  ]
};
var stops=[
  {n:'Vista general',d:'Casa de una planta: recámara y sala al frente, baño, cocina-comedor abierta, recámara al fondo y patio de servicio.',t:[3,.2,5.5],yaw:-.6,pitch:.9,dist:20,fov:.62,f:[],v:{dist:27}},
  {n:'Fachada',d:'Fachada de una planta en crema y blanco, con ventana y puerta con reja, marquesina y jardín al frente con andadores de losas.',t:[3.3,1.6,0],yaw:-.18,pitch:.08,dist:10.5,fov:.72,f:[1]},
  {n:'Sala',d:'Sala junto a la entrada, abierta al comedor.',t:[3.2,1.5,3.3],yaw:2.4,pitch:.2,dist:.01,fov:1.25,f:[]},
  {n:'Recámara 1',d:'Recámara al frente, detrás del muro crema, con clóset.',t:[2.55,1.5,3.35],yaw:-2.3,pitch:.22,dist:.01,fov:1.35,f:[]},
  {n:'Cocina-comedor',d:'Cocina abierta al comedor: tarja con ventana al patio, puerta al patio y puerta directa a la recámara 2.',t:[5.7,1.55,4.0],yaw:-.85,pitch:.22,dist:.01,fov:1.35,f:[2]},
  {n:'Baño',d:'Baño completo con regadera, WC y lavabo, con puerta al comedor.',t:[2.0,1.6,4.8],yaw:-1.35,pitch:.4,dist:.01,fov:1.45,f:[4,5]},
  {n:'Recámara 2',d:'Recámara al fondo, con clóset y ventana con reja al patio.',t:[5.6,1.5,8.0],yaw:-.6,pitch:.22,dist:.01,fov:1.35,f:[3]},
  {n:'Patio',d:'Patio de servicio con boiler y lavadero, al lado de la recámara 2.',t:[2.8,1.5,10.6],yaw:-2.6,pitch:.2,dist:.01,fov:1.3,f:[]}
];
var rooms=[['Recámara 1',1.4,1.3],['Sala',4.4,2.9],['Baño',1.1,5.4],['Comedor',4.4,4.2],['Cocina',1.4,7.1],['Recámara 2',4.6,8.4],['Patio',1.6,9.6],['Jardín',3.0,-2.0]];
window.TOUR={levels:[{n:'Casa',plan:plan,rooms:rooms}],stops:stops};
})();
