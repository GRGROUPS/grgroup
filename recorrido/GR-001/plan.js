/* Casa en Rancho San Pedro (una planta, ampliada hasta ocupar casi todo el terreno de 84 m²; 86 m² de construcción, dentro de privada; para remodelar).
   No hay plano: la distribución se armó con las fotos y la ficha; medidas aproximadas. Es una distribución propuesta (la original se amplió).
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
fb.push([-.09,2.7,-.09,6.09,2.82,12.49,'#bdb7ab',{mat:25}]);
// vecinos
fb.push([-6.6,0,0,-.09,2.9,14,'#e9e8e4',{mat:11}],[6.09,0,0,12,2.9,14,'#e9e8e4',{mat:11}]);
var plan={
  sky:'#dfe4e8', center:[3,0,7], frame:'#e8e8e6', tile:.33, gloss:.4, wallOut:EXT, wallMat:14, wallIn:'#f1eee6', zoclo:'#cdbfaa',
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
  floors:[[0,0,6,7.4,T],[0,7.4,2.7,9.6,'#e6e2da'],[0,9.6,2.7,12.4,T],[2.7,7.4,6,12.4,T],[0,12.4,6,14,'#a49c8f',3]],
  ceilings:[[0,0,6,12.4]],
  walls:[
    /* fachada en tres volúmenes de distinta altura */
    {ax:'x',c:0,from:0,to:2.8,t:.18,h:3.2,out:-1,color:BEI},
    {ax:'x',c:0,from:2.8,to:4.15,t:.18,h:2.95,out:-1,color:BLA,open:[
      {from:2.9,to:3.84,sill:1.0,head:2.2,kind:'window'}]},
    {ax:'x',c:0,from:4.15,to:6,t:.18,h:2.75,out:-1,color:BLA,open:[
      {from:4.3,to:5.08,head:2.15,kind:'door',hinge:'to',ang:0,color:DOOR,mat:6},
      {from:5.2,to:5.88,sill:.35,head:2.15,kind:'window',mid:false}]},
    {ax:'z',c:0,from:0,to:3.6,t:.18,h:3.2,color:BEI},
    {ax:'z',c:0,from:3.6,to:14,t:.18,h:2.7},
    {ax:'z',c:6,from:0,to:14,t:.18,h:2.7},
    /* fondo: patio de servicio */
    {ax:'x',c:14,from:0,to:6,t:.18,h:2.4},
    /* sala | cocina-comedor */
    {ax:'x',c:3.6,from:0,to:6,open:[{from:.6,to:4.4,head:2.1,kind:'gap'}]},
    /* cocina-comedor | recámaras, baño y pasillo */
    {ax:'x',c:7.4,from:0,to:6,open:[{from:2.7,to:3.6,head:2.1,kind:'gap'}]},
    {ax:'z',c:2.7,from:7.4,to:12.4,open:[
      {from:8.2,to:9.0,head:2.1,kind:'door',hinge:'from',ang:0,color:DOOR,mat:6},
      {from:9.8,to:10.6,head:2.1,kind:'door',hinge:'from',ang:0,color:DOOR,mat:6}]},
    {ax:'z',c:3.6,from:7.4,to:12.4,open:[{from:7.9,to:8.7,head:2.1,kind:'door',hinge:'from',ang:0,color:DOOR,mat:6}]},
    {ax:'x',c:9.6,from:0,to:2.7},
    /* al patio: ventanas de las recámaras y puerta de cristal al final del pasillo */
    {ax:'x',c:12.4,from:0,to:6,open:[
      {from:.4,to:2.3,sill:1.0,head:2.1,kind:'window'},
      {from:2.75,to:3.55,head:2.2,kind:'door',hinge:'from',ang:0,color:'#c9d0d0',mat:6},
      {from:3.9,to:5.5,sill:1.0,head:2.1,kind:'window'}]}
  ],
  boxes:fb,
  items:[
    /* sala */
    ['tv',.08,1.8,90,{w:1.5}],['tapete',1.8,1.8,90,{s:1,w:2.2,d:1.7,color:'#6f6259',color2:'#5f534b'}],['sofa',3.15,1.8,-90,{s:1,w:2.0,color:'#7f8c99',color2:'#93a0ad'}],['mesaCentro',1.8,1.8,90,{s:1}],
    /* cocina-comedor con lavatrastes */
    ['barra',.08,6.2,90,{len:2.2,estufa:.5,tarja:-.5,color:'#d9d4c8',mat:6,cubierta:'#bdb8ad',altos:[[-.9,-.2],[.2,.9]]}],['refri',5.92,6.8,-90],
    ['mesa',3.3,4.8,0,{s:1,w:.9,d:1.3}],['silla',3.3,4.2,0,{s:1}],['silla',3.3,5.4,180,{s:1}],
    /* baño */
    ['regadera',1.7,9.52,180,{w:.95,d:.9}],['wc',.08,8.2,90],['lavabo',.08,8.9,90],
    /* recámaras */
    ['cama',4.92,10.8,-90,{s:1,w:1.4,manta:'#5f7f8f'}],['buro',5.72,9.85,-90,{s:1}],
    ['cama',.85,11.4,90,{s:1,w:1.4,manta:'#8f8a6a'}],['buro',.3,10.2,90,{s:1}],
    /* tinaco en la azotea */
    ['tinaco',3.2,.75,0,{y0:2.7,r:.36,h:.5,color:'#9a5c6c'}],
    /* patio de servicio */
    ['lavadero',5.0,13.85,180],['boiler',.7,13.8,0],
    ['plafon',3.0,1.8,0],['plafon',3.0,5.0,0],['plafon',1.35,8.5,0],['plafon',3.15,10.0,0],['plafon',4.8,9.9,0],['plafon',1.35,11.0,0]
  ]
};
var stops=[
  {n:'Vista general',d:'Casa de una planta: sala, cocina-comedor, 2 recámaras, baño y patio de servicio al fondo.',t:[3,.2,7],yaw:-.6,pitch:.9,dist:24,fov:.62,f:[],v:{dist:32}},
  {n:'Fachada',d:'Fachada de una planta en crema y blanco, con ventana y puerta con reja, marquesina y jardín al frente con andadores de losas.',t:[3.3,1.6,0],yaw:-.18,pitch:.08,dist:10.5,fov:.72,f:[1]},
  {n:'Sala',d:'Sala al frente de la casa.',t:[5.3,1.5,.7],yaw:-.92,pitch:.2,dist:.01,fov:1.25,f:[]},
  {n:'Cocina-comedor',d:'Cocina con lavatrastes y comedor, abiertos a la sala.',t:[5.2,1.5,4.0],yaw:-1.09,pitch:.28,dist:.01,fov:1.35,f:[2]},
  {n:'Recámara 1',d:'Recámara principal, con ventana al patio.',t:[3.9,1.5,7.7],yaw:.31,pitch:.22,dist:.01,fov:1.35,f:[3]},
  {n:'Recámara 2',d:'Segunda recámara, con ventana al patio.',t:[2.4,1.5,9.8],yaw:-.75,pitch:.22,dist:.01,fov:1.35,f:[]},
  {n:'Baño',d:'Baño completo con regadera, WC y lavabo.',t:[2.3,1.6,7.6],yaw:-.31,pitch:.4,dist:.01,fov:1.45,f:[4,5]},
  {n:'Patio',d:'Patio de servicio al fondo, con zona de lavado.',t:[.7,1.5,12.6],yaw:1.35,pitch:.2,dist:.01,fov:1.3,f:[]}
];
var rooms=[['Sala',3.0,1.8],['Comedor',3.0,4.8],['Cocina',1.2,6.2],['Baño',1.35,8.5],['Pasillo',3.15,10.0],['Recámara 1',4.8,9.4],['Recámara 2',1.35,11.0],['Patio',3.0,13.2],['Jardín',3.0,-2.0]];
window.TOUR={levels:[{n:'Casa',plan:plan,rooms:rooms}],stops:stops};
})();
