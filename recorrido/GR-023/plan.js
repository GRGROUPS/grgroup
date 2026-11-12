/* Casa Cardenal (85.71 m², dos plantas). Distribución tomada del plano del modelo; medidas aproximadas.
   Metros. x = ancho visto desde la calle, z = fondo. */
(function(){
var T='#e6e2da', WOODC='#c9a97c', FACH='#d6d4cf', DARK='#4a3428';
var baja={
  sky:'#e9eef1', center:[2.4,0,4.5], frame:'#3a3c40',
  ground:[
    [-9,-0.09,-13,14,21,'#8fae6b',2],
    [-9,-0.06,-13,14,-6.2,'#7b7d80',0],
    [-9,-0.03,-6.2,14,-4.8,'#cfccc5',3],
    [2.1,-0.02,-4.8,4.8,0,'#c6c3bc',3]
  ],
  floors:[[0,0,4.8,3.2,T],[0,3.2,1.05,5.7,T],[1.05,3.2,3.7,5.7,T],[3.7,3.2,4.8,4.6,T],[3.7,4.6,4.8,5.7,T],[0,5.7,4.8,9.0,T]],
  ceilings:[[0,0,4.8,3.2],[1.05,3.2,3.7,5.7],[3.7,3.2,4.8,4.6],[3.7,4.6,4.8,5.7],[0,5.7,4.8,9.0]],
  walls:[
    {ax:'x',c:0,from:0,to:4.8,t:.15,h:2.7,color:FACH,open:[
      {from:.4,to:2.0,sill:.5,head:2.2,kind:'window'},
      {from:2.4,to:3.3,head:2.15,kind:'door',hinge:'to',ang:0,color:DARK},
      {from:3.6,to:4.4,sill:.9,head:2.2,kind:'window',mid:false}]},
    {ax:'z',c:0,from:0,to:9.0,t:.15,h:2.7},
    {ax:'z',c:4.8,from:0,to:9.0,t:.15,h:2.7},
    {ax:'x',c:9.0,from:0,to:4.8,t:.15,h:2.7,open:[
      {from:.35,to:2.05,sill:.05,head:2.2,kind:'window'},
      {from:3.4,to:4.4,sill:1.1,head:2.1,kind:'window'}]},
    {ax:'z',c:1.05,from:3.5,to:5.7,t:.06,color:WOODC},
    {ax:'x',c:5.7,from:0,to:1.05},
    {ax:'x',c:3.2,from:3.7,to:4.8},
    {ax:'z',c:3.7,from:3.2,to:4.6,open:[{from:3.5,to:4.25,head:2.1,kind:'gap'}]},
    {ax:'x',c:4.6,from:3.7,to:4.8},
    // bardas del jardín
    {ax:'x',c:11.4,from:0,to:4.8,h:2.0,color:'#d9d6cf'},{ax:'z',c:0,from:9.0,to:11.4,h:2.0,color:'#d9d6cf'},{ax:'z',c:4.8,from:9.0,to:11.4,h:2.0,color:'#d9d6cf'}
  ],
  boxes:[
    // planta alta y casas vecinas vistas desde la calle (se ocultan al ver la maqueta desde arriba)
    [-.075,2.7,-.075,4.875,5.5,9.075,FACH,{mat:11}],
    [.9,2.62,-1.0,3.4,2.74,0,'#e9e7e2',{mat:11}],[.9,2.74,-1.0,3.4,3.6,-.96,'#9db4bf',{mat:10}],
    [1.2,2.85,-.1,3.0,4.95,-.07,'#3d4a55',{mat:10}],
    [3.5,3.6,-.1,4.4,4.6,-.07,'#3d4a55',{mat:10}],
    [-4.95,0,0,-.08,5.5,9.0,'#dddbd6',{mat:11}],[4.88,0,0,9.75,5.5,9.0,'#dddbd6',{mat:11}]
  ],
  items:[
    ['escalera',.53,3.3,0,{w:.95,n:10,huella:.24}],
    ['barra',4.72,7.35,-90,{len:3.1,estufa:.2,tarja:-.9,altos:[[-.35,.9]],color:WOODC,cubierta:'#e9e7e2'}],
    ['barra',2.75,6.95,90,{len:1.8,copete:false,color:WOODC,cubierta:'#e9e7e2'}],
    ['wc',4.3,4.53,180],['lavabo',4.73,3.62,-90],
    ['plafon',2.4,1.6,0],['plafon',2.4,4.4,0],['plafon',1.4,7.4,0],['plafon',4.0,7.4,0],['plafon',4.25,3.9,0],
    ['refri',4.25,4.68,0,{s:1}],
    ['tapete',2.0,1.6,90,{s:1,w:2.2,d:1.5,color:'#bdb8ae',color2:'#aaa59b'}],['sofa',.58,1.6,90,{s:1,w:2.0,color:'#b9b4aa',color2:'#c9c4ba'}],['mesaCentro',2.0,1.6,90,{s:1}],
    ['tv',4.72,1.6,-90,{s:1,w:1.5}],['planta',.4,2.95,0,{s:1}],
    ['mesa',1.3,7.45,0,{s:1,w:.95,d:.95}],['silla',1.3,6.8,0,{s:1}],['silla',1.3,8.1,180,{s:1}],['silla',.65,7.45,90,{s:1}],['silla',1.95,7.45,-90,{s:1}],
    ['silla',2.45,6.5,90,{s:1}],['silla',2.45,7.4,90,{s:1}]
  ]
};
var alta={
  sky:'#e9eef1', center:[2.4,0,4.5], frame:'#3a3c40',
  ground:[[-9,-0.09,-13,14,21,'#d9dcde',0]],
  floors:[[0,0,3.3,3.5,T],[3.3,0,4.8,3.5,'#e4e2dc'],[0,3.5,4.8,6.2,T],[0,6.2,3.3,9.0,T],[3.3,6.2,4.8,9.0,'#e4e2dc']],
  ceilings:[[0,0,3.3,3.5],[3.3,0,4.8,3.5],[0,3.5,4.8,6.2],[0,6.2,3.3,9.0],[3.3,6.2,4.8,9.0]],
  walls:[
    {ax:'x',c:0,from:0,to:4.8,t:.15,h:2.7,open:[
      {from:1.0,to:2.8,sill:.05,head:2.2,kind:'window'},
      {from:3.7,to:4.4,sill:1.5,head:2.1,kind:'window',mid:false}]},
    {ax:'z',c:0,from:0,to:9.0,t:.15,h:2.7},
    {ax:'z',c:4.8,from:0,to:9.0,t:.15,h:2.7},
    {ax:'x',c:9.0,from:0,to:4.8,t:.15,h:2.7,open:[
      {from:.8,to:2.4,sill:.95,head:2.1,kind:'window'},
      {from:3.7,to:4.4,sill:1.5,head:2.1,kind:'window',mid:false}]},
    {ax:'x',c:3.5,from:0,to:4.8,open:[{from:1.9,to:2.7,head:2.1,kind:'gap'}]},
    {ax:'z',c:3.3,from:0,to:3.5,open:[{from:2.45,to:3.2,head:2.1,kind:'gap'}]},
    {ax:'x',c:6.2,from:0,to:4.8,open:[{from:2.35,to:3.15,head:2.1,kind:'gap'},{from:3.55,to:4.3,head:2.1,kind:'gap'}]},
    {ax:'z',c:3.3,from:6.2,to:9.0}
  ],
  boxes:[],
  items:[
    ['hueco',.55,3.62,0,{w:.95,l:2.4,lados:[1]}],
    ['regadera',4.72,.08,-90,{w:.9,d:1.34}],['wc',4.73,1.7,-90],['lavabo',4.73,2.75,-90],
    ['regadera',3.38,8.92,90,{w:.9,d:1.34}],['wc',4.73,7.4,-90],['lavabo',4.73,6.65,-90],
    ['plafon',1.6,1.7,0],['plafon',4.05,1.7,0],['plafon',2.8,4.85,0],['plafon',1.6,7.6,0],['plafon',4.05,7.6,0],
    ['cama',1.12,1.7,90,{s:1,w:1.6,manta:'#6f8f86'}],['buro',.3,.6,90,{s:1}],['buro',.3,2.8,90,{s:1,lampara:false}],
    ['closet',3.22,1.2,-90,{s:1,w:1.5}],
    ['sofa',2.5,4.85,90,{s:1,w:1.6,color:'#8a8d91',color2:'#9b9ea2'}],['tv',4.72,4.85,-90,{s:1,w:1.4}],
    ['cama',1.1,7.4,90,{s:1,w:.95,manta:'#c9b18f'}],['cama',1.1,8.45,90,{s:1,w:.95,manta:'#c9b18f'}],
    ['closet',1.0,6.28,0,{s:1,w:1.5}]
  ]
};
var stops=[
  {n:'Planta baja',d:'Sala, comedor, cocina con barra, medio baño y jardín. Aquí se puede adaptar una tercera recámara.',lvl:0,t:[2.4,.2,4.8],yaw:-.6,pitch:.9,dist:20,fov:.62,f:[],v:{dist:27}},
  {n:'Fachada',d:'Casa de dos plantas con balcón al frente.',lvl:0,t:[2.4,2.5,0],yaw:-.5,pitch:.06,dist:13.5,fov:.75,f:[2,1],v:{dist:17}},
  {n:'Sala',d:'Sala al frente con ventanal y la escalera a la vista.',lvl:0,t:[4.35,1.55,2.95],yaw:-2.2,pitch:.22,dist:.01,fov:1.15,f:[3]},
  {n:'Comedor',d:'Comedor con salida al jardín, junto a la barra de la cocina.',lvl:0,t:[.45,1.55,5.95],yaw:.75,pitch:.25,dist:.01,fov:1.2,f:[]},
  {n:'Cocina',d:'Cocina integral con barra desayunadora.',lvl:0,t:[3.5,1.55,5.1],yaw:.12,pitch:.32,dist:.01,fov:1.2,f:[]},
  {n:'Medio baño',d:'Medio baño de visitas en planta baja.',lvl:0,t:[3.2,1.6,3.88],yaw:1.5,pitch:.5,dist:.01,fov:1.15,f:[4,6]},
  {n:'Planta alta',d:'Dos recámaras, cada una con su baño completo, y estancia.',lvl:1,t:[2.4,.2,4.8],yaw:-.6,pitch:.9,dist:20,fov:.62,f:[],v:{dist:27}},
  {n:'Recámara principal',d:'Recámara principal con balcón y baño propio.',lvl:1,t:[3.0,1.55,3.2],yaw:-2.3,pitch:.25,dist:.01,fov:1.2,f:[]},
  {n:'Baño principal',d:'Baño completo dentro de la recámara principal.',lvl:1,t:[3.55,1.6,3.25],yaw:2.75,pitch:.45,dist:.01,fov:1.3,f:[]},
  {n:'Estancia',d:'Estancia de televisión al llegar por la escalera.',lvl:1,t:[1.45,1.55,3.8],yaw:.95,pitch:.25,dist:.01,fov:1.2,f:[5]},
  {n:'Recámara 2',d:'Segunda recámara con ventana al jardín.',lvl:1,t:[3.0,1.55,6.5],yaw:-.75,pitch:.28,dist:.01,fov:1.2,f:[]},
  {n:'Baño 2',d:'Segundo baño completo.',lvl:1,t:[3.55,1.6,6.45],yaw:.4,pitch:.45,dist:.01,fov:1.3,f:[]}
];
window.TOUR={levels:[
  {n:'Planta baja',plan:baja,rooms:[['Sala',2.4,1.6],['Escalera',.55,4.5],['Medio baño',4.25,3.9],['Cocina',4.0,7.3],['Comedor',1.4,7.4],['Jardín',2.4,10.3]]},
  {n:'Planta alta',plan:alta,rooms:[['Recámara principal',1.6,1.7],['Baño',4.05,1.7],['Estancia',2.8,4.85],['Recámara 2',1.6,7.6],['Baño 2',4.05,7.6]]}
],stops:stops};
})();
