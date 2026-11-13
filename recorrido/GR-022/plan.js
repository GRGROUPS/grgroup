/* Casa en Mykonos Residencial II (109 m², dos plantas). Distribución tomada de los planos del modelo; medidas aproximadas.
   Metros. x = ancho visto desde la calle, z = fondo. */
(function(){
// fotos: fachada blanca con panel de piedra oscura y panel de cantera beige, porcelanato gris muy claro grande,
// cocina de madera gris topo con granito negro, puertas chocolate, tocador de madera oscura con cubierta negra
var T='#e2e0db', CAB='#857668', GRAN='#2a2b2e', DARK='#4a3a33', EXT='#f2f1ee';
var baja={
  sky:'#e9eef1', center:[3.2,0,4.3], frame:'#2e3033', tile:.6, gloss:.7, wallOut:EXT, wallMat:14, wallIn:'#f6f5f2', zoclo:'#d6d3cc', indoor:[[5.4,3.1,6.45,5.3]],
  ground:[
    [-10,-0.09,-14,17,21,'#8fae6b',2],
    [-10,-0.06,-14,17,-7.6,'#7b7d80',0],
    [-10,-0.03,-7.6,17,-6.3,'#cfccc5',3],
    [3.75,-0.02,-5.9,4.45,-5.3,'#e4e2dc',3],[3.75,-0.02,-4.9,4.45,-4.3,'#e4e2dc',3],[3.75,-0.02,-3.9,4.45,-3.3,'#e4e2dc',3],
    [3.75,-0.02,-2.9,4.45,-2.3,'#e4e2dc',3],[3.75,-0.02,-1.9,4.45,-1.3,'#e4e2dc',3],[3.75,-0.02,-.9,4.45,-.1,'#e4e2dc',3]
  ],
  floors:[[0,0,4.65,8.7,T],[4.65,1.15,6.45,3.1,T],[4.65,3.1,6.45,5.3,T],[4.65,5.3,6.45,8.7,T]],
  ceilings:[[0,0,4.65,8.7],[4.65,1.15,6.45,3.1],[4.65,3.1,5.4,5.3],[4.65,5.3,6.45,8.7]],
  walls:[
    {ax:'x',c:0,from:0,to:4.65,t:.15,h:2.7,open:[
      {from:.5,to:3.0,sill:.3,head:2.3,kind:'window'},
      {from:3.62,to:4.5,head:2.15,kind:'door',hinge:'to',ang:0,color:DARK,mat:6}]},
    {ax:'z',c:4.65,from:0,to:1.15,t:.15,h:2.7},
    {ax:'x',c:1.15,from:4.65,to:6.45,t:.15,h:2.7,open:[{from:5.3,to:5.9,sill:1.5,head:2.1,kind:'window',mid:false}]},
    {ax:'z',c:6.45,from:1.15,to:8.7,t:.15,h:2.7},
    {ax:'z',c:0,from:0,to:8.7,t:.15,h:2.7},
    {ax:'x',c:8.7,from:0,to:6.45,t:.15,h:2.7,open:[
      {from:.6,to:2.9,sill:.05,head:2.3,kind:'window'},
      {from:4.5,to:6.0,sill:1.1,head:2.1,kind:'window'}]},
    {ax:'z',c:4.65,from:1.15,to:3.1,open:[{from:1.9,to:2.65,head:2.1,kind:'gap'}]},
    {ax:'x',c:3.1,from:4.65,to:6.45},
    {ax:'x',c:5.3,from:4.65,to:6.45},
    {ax:'x',c:11.6,from:0,to:6.45,h:2.2,color:'#e3e1dc'},{ax:'z',c:0,from:8.7,to:11.6,h:2.2,color:'#e3e1dc'},{ax:'z',c:6.45,from:8.7,to:11.6,h:2.2,color:'#e3e1dc'}
  ],
  boxes:[
    [-.075,2.7,-.5,6.525,5.6,8.775,EXT,{mat:34}],
    [.3,2.9,-.56,2.9,5.3,-.5,'#55514d',{mat:32}],[.8,3.3,-.6,2.5,4.9,-.57,'#2b3540',{mat:10}],
    [3.4,3.0,-.56,6.2,5.3,-.5,'#cbbca2',{mat:39}],[4.0,3.5,-.6,5.6,4.7,-.57,'#2b3540',{mat:10}],
    [-6.6,0,0,-.08,5.6,8.7,'#e9e8e4',{mat:11}],[6.53,0,0,13,5.6,8.7,'#e9e8e4',{mat:11}]
  ],
  items:[
    ['escalera',5.93,5.22,180,{w:.95,n:10,huella:.21,mat:1,color:'#d9d7d1'}],
    ['barra',6.37,7.15,-90,{len:3.0,estufa:.6,horno:1,tarja:-.7,altos:[[-.2,1.4]],color:CAB,mat:6,cubierta:GRAN}],
    ['barra',4.45,5.9,0,{len:1.9,copete:false,color:CAB,mat:6,cubierta:GRAN}],
    ['wc',5.9,3.03,180],['tocadorF',6.38,1.85,-90,{w:.6,color:'#5a4a40',cubierta:GRAN}],
    ['plafon',1.8,1.7,0],['plafon',1.8,6.9,0],['plafon',3.2,4.2,0],['plafon',5.2,7.3,0],['plafon',5.5,2.1,0],
    ['refri',3.75,8.62,180,{s:1}],
    ['tapete',1.9,1.75,90,{s:1,w:2.6,d:2.0,color:'#6f6259',color2:'#5f534b'}],['sofa',.58,1.75,90,{s:1,w:2.2,color:'#c9c2b0',color2:'#d6cfbd'}],
    ['sofa',2.0,.56,0,{s:1,w:1.6,color:'#c9c2b0',color2:'#d6cfbd'}],['mesaCentro',2.0,1.85,90,{s:1}],['planta',3.3,.45,0,{s:1}],
    ['mesa',1.7,6.9,0,{s:1,w:.95,d:1.7}],['silla',.95,6.4,90,{s:1}],['silla',.95,7.4,90,{s:1}],['silla',2.45,6.4,-90,{s:1}],['silla',2.45,7.4,-90,{s:1}],
    ['silla',1.7,5.75,0,{s:1}],['silla',1.7,8.05,180,{s:1}]
  ]
};
var alta={
  sky:'#e9eef1', center:[3.2,0,4.3], frame:'#2e3033', tile:.6, gloss:.7, wallOut:EXT, wallMat:14, wallIn:'#f6f5f2', zoclo:'#d6d3cc',
  ground:[[-10,-0.09,-14,17,21,'#d9dcde',0]],
  floors:[[0,0,4.6,3.1,T],[4.6,0,6.45,3.1,'#e6e4de'],[0,3.1,2.1,5.3,'#e6e4de'],[2.1,3.1,6.45,5.3,T],[0,5.3,3.15,8.7,T],[3.15,5.3,6.45,8.7,T]],
  ceilings:[[0,0,4.6,3.1],[4.6,0,6.45,3.1],[0,3.1,2.1,5.3],[2.1,3.1,6.45,5.3],[0,5.3,3.15,8.7],[3.15,5.3,6.45,8.7]],
  walls:[
    {ax:'x',c:0,from:0,to:6.45,t:.15,h:2.7,open:[
      {from:.8,to:2.6,sill:.3,head:2.2,kind:'window'},
      {from:5.2,to:5.9,sill:1.5,head:2.1,kind:'window',mid:false}]},
    {ax:'z',c:0,from:0,to:8.7,t:.15,h:2.7,open:[{from:3.9,to:4.5,sill:1.5,head:2.1,kind:'window',mid:false}]},
    {ax:'z',c:6.45,from:0,to:8.7,t:.15,h:2.7},
    {ax:'x',c:8.7,from:0,to:6.45,t:.15,h:2.7,open:[
      {from:.8,to:2.4,sill:.95,head:2.1,kind:'window'},
      {from:4.0,to:5.6,sill:.95,head:2.1,kind:'window'}]},
    {ax:'x',c:3.1,from:0,to:6.45,open:[{from:2.6,to:3.4,head:2.1,kind:'gap'}]},
    {ax:'z',c:4.6,from:0,to:3.1,open:[{from:2.2,to:2.95,head:2.1,kind:'gap'}]},
    {ax:'z',c:2.1,from:3.1,to:5.3,open:[{from:3.9,to:4.65,head:2.1,kind:'gap'}]},
    {ax:'x',c:5.3,from:0,to:6.45,open:[{from:2.3,to:3.05,head:2.1,kind:'gap'},{from:3.3,to:4.05,head:2.1,kind:'gap'}]},
    {ax:'z',c:3.15,from:5.3,to:8.7}
  ],
  boxes:[],
  items:[
    ['hueco',5.93,3.2,0,{w:.95,l:2.0,lados:[-1],color:'#d9d7d1'}],
    ['regadera',6.37,.08,-90,{w:.9,d:1.69}],['wc',6.38,1.65,-90],['tocadorF',6.38,2.6,-90,{w:.7,color:'#5a4a40',cubierta:GRAN}],
    ['regadera',.08,3.18,0,{w:.9,d:2.04}],['wc',1.55,3.17,0],['tocadorF',1.5,5.23,180,{w:.7,color:'#5a4a40',cubierta:GRAN}],
    ['plafon',2.3,1.6,0],['plafon',5.5,1.6,0],['plafon',4.0,4.2,0],['plafon',1.05,4.2,0],['plafon',1.6,7.0,0],['plafon',4.8,7.0,0],
    ['cama',1.17,1.55,90,{s:1,w:1.8,manta:'#6b7f8f',cabecera:'#5f7d9a'}],['buro',.3,.38,90,{s:1}],['buro',.3,2.72,90,{s:1,lampara:false}],
    ['closet',3.6,3.02,180,{s:1,w:1.5}],
    ['cama',1.12,7.0,90,{s:1,w:1.5,manta:'#8f8a6a'}],['buro',.3,8.05,90,{s:1}],['closet',1.0,5.38,0,{s:1,w:1.5}],
    ['cama',5.33,7.2,-90,{s:1,w:1.5,manta:'#8f8a6a'}],['buro',6.15,8.2,-90,{s:1}],['closet',5.5,5.38,0,{s:1,w:1.5}]
  ]
};
var stops=[
  {n:'Planta baja',d:'Sala, comedor, cocina con barra, medio baño y jardín al fondo.',lvl:0,t:[3.2,.2,4.6],yaw:-.6,pitch:.9,dist:21,fov:.62,f:[],v:{dist:29}},
  {n:'Fachada',d:'Casa nueva de dos plantas con jardín al frente.',lvl:0,t:[3.2,2.5,0],yaw:-.5,pitch:.06,dist:15,fov:.75,f:[1],v:{dist:19}},
  {n:'Sala',d:'Sala con ventanal al jardín del frente.',lvl:0,t:[4.3,1.55,3.7],yaw:-2.28,pitch:.22,dist:.01,fov:1.15,f:[2]},
  {n:'Comedor',d:'Comedor con salida al jardín, abierto a la cocina.',lvl:0,t:[.5,1.55,4.5],yaw:.62,pitch:.25,dist:.01,fov:1.2,f:[2]},
  {n:'Cocina',d:'Cocina integral con barra y cubierta de granito.',lvl:0,t:[4.6,1.55,8.4],yaw:2.45,pitch:.32,dist:.01,fov:1.2,f:[3]},
  {n:'Medio baño',d:'Medio baño de visitas en planta baja.',lvl:0,t:[4.4,1.6,2.28],yaw:1.5,pitch:.5,dist:.01,fov:1.15,f:[]},
  {n:'Planta alta',d:'Tres recámaras y dos baños completos.',lvl:1,t:[3.2,.2,4.6],yaw:-.6,pitch:.9,dist:21,fov:.62,f:[],v:{dist:29}},
  {n:'Recámara principal',d:'Recámara principal con baño propio.',lvl:1,t:[4.3,1.55,.45],yaw:-.95,pitch:.25,dist:.01,fov:1.2,f:[4]},
  {n:'Baño principal',d:'Baño completo de la recámara principal.',lvl:1,t:[4.85,1.6,2.85],yaw:2.65,pitch:.45,dist:.01,fov:1.3,f:[5]},
  {n:'Recámara 2',d:'Recámara con ventana al jardín.',lvl:1,t:[2.85,1.55,5.6],yaw:-.75,pitch:.28,dist:.01,fov:1.2,f:[]},
  {n:'Recámara 3',d:'Recámara con ventana al jardín.',lvl:1,t:[3.45,1.55,8.4],yaw:2.28,pitch:.28,dist:.01,fov:1.2,f:[]},
  {n:'Baño compartido',d:'Baño completo para las recámaras 2 y 3.',lvl:1,t:[1.95,1.65,5.3],yaw:-2.6,pitch:.5,dist:.01,fov:1.35,f:[]}
];
window.TOUR={levels:[
  {n:'Planta baja',plan:baja,rooms:[['Sala',1.8,1.7],['Comedor',1.8,6.9],['Cocina',5.2,7.2],['Medio baño',5.5,2.1],['Escalera',5.9,4.2],['Jardín',3.2,10.2]]},
  {n:'Planta alta',plan:alta,rooms:[['Recámara principal',2.3,1.6],['Baño',5.5,1.6],['Baño',1.05,4.2],['Recámara 2',1.6,7.0],['Recámara 3',4.8,7.0]]}
],stops:stops};
})();
