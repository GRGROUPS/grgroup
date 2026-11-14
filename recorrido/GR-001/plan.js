/* Casa en Rancho San Pedro (una planta, ampliada hasta ocupar casi todo el terreno de 84 m²; 86 m² de construcción, dentro de privada; para remodelar).
   No hay plano: la distribución se armó con las fotos y la ficha; medidas aproximadas. Es una distribución propuesta (la original se amplió).
   El visor muestra la casa limpia, con muebles básicos. Metros. x = ancho visto desde la calle, z = fondo. La calle queda en z negativo. */
(function(){
// fotos: fachada color crema y blanca de una planta, puerta con reja negra y ventana con reja, jardín con losas, cocina con lavatrastes y
// puerta de cristal al patio, baño con muros de azulejo blanco
var T='#d9c5a6', EXT='#ebe4d2', REJA='#1d1d1f', VID='#2b3540', DOOR='#eeece6';
var plan={
  sky:'#e9eef1', center:[3,0,7], frame:'#e8e8e6', tile:.33, gloss:.4, wallOut:EXT, wallMat:14, wallIn:'#f1eee6', zoclo:'#cdbfaa',
  ground:[
    [-10,-0.09,-16,17,26,'#8fae6b',2],
    [-10,-0.06,-16,17,-8.0,'#6d6f72',0],
    [-10,-0.03,-8.0,17,-7.2,'#cfccc5',3],
    [-1,-0.04,-7.2,7,0,'#7fa05a',2],
    [.5,-0.03,-3.0,1.9,-2.3,'#c9c5bc',3],[.5,-0.03,-2.1,1.9,-1.4,'#c9c5bc',3],[.5,-0.03,-1.2,1.9,-.1,'#c9c5bc',3],
    [.5,-0.03,-3.9,1.9,-3.2,'#c9c5bc',3],[.5,-0.03,-4.8,1.9,-4.1,'#c9c5bc',3],[.5,-0.03,-5.7,1.9,-5.0,'#c9c5bc',3],[.5,-0.03,-6.6,1.9,-5.9,'#c9c5bc',3]
  ],
  floors:[[0,0,6,7.4,T],[0,7.4,2.7,9.6,'#e6e2da'],[0,9.6,2.7,12.4,T],[2.7,7.4,6,12.4,T],[0,12.4,6,14,'#a49c8f',3]],
  ceilings:[[0,0,6,12.4]],
  walls:[
    /* fachada de una planta: ventana con reja, puerta con reja negra y ventanita lateral */
    {ax:'x',c:0,from:0,to:6,t:.18,h:2.7,out:-1,open:[
      {from:2.95,to:3.95,sill:1.0,head:2.1,kind:'window',grille:true},
      {from:4.4,to:5.3,head:2.2,kind:'door',hinge:'to',ang:0,color:REJA,mat:16},
      {from:5.4,to:5.85,sill:.9,head:2.1,kind:'window',grille:true,mid:false}]},
    {ax:'z',c:0,from:0,to:14,t:.18,h:2.7},
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
  boxes:[
    [-.075,2.7,-.075,6.075,3.0,.12,EXT,{mat:34}],
    [-6.6,0,0,-.09,2.9,14,'#e9e8e4',{mat:11}],[6.09,0,0,12,2.9,14,'#e9e8e4',{mat:11}]
  ],
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
    /* patio de servicio */
    ['lavadero',5.0,13.85,180],['boiler',.7,13.8,0],
    ['plafon',3.0,1.8,0],['plafon',3.0,5.0,0],['plafon',1.35,8.5,0],['plafon',3.15,10.0,0],['plafon',4.8,9.9,0],['plafon',1.35,11.0,0]
  ]
};
var stops=[
  {n:'Vista general',d:'Casa de una planta: sala, cocina-comedor, 2 recámaras, baño y patio de servicio al fondo.',t:[3,.2,7],yaw:-.6,pitch:.9,dist:24,fov:.62,f:[],v:{dist:32}},
  {n:'Fachada',d:'Fachada crema y blanca de una planta, con puerta de reja y jardín al frente con andador de losas.',t:[3,1.5,0],yaw:-.5,pitch:.1,dist:11,fov:.72,f:[1]},
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
