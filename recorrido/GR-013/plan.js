/* Casa en Punta Esmeralda (148 m² en dos plantas, terreno de 9 x 16 m). Plano deducido de las fotos; medidas aproximadas.
   Metros. x = ancho visto desde la calle, z = fondo. */
(function(){
var T='#a9a59c', WOODC='#7a3b22', GRAN='#b5b5b2', DARK='#3a2622', PISO='#9d9990';
var baja={
  sky:'#e9eef1', center:[4.5,0,4.1],
  ground:[
    [-9,-0.09,-13,18,20,'#8fae6b',2],
    [-9,-0.06,-13,18,-6.4,'#7b7d80',0],
    [-9,-0.03,-6.4,18,-5.0,'#cfccc5',3],
    [0,-0.02,-5.0,9,0,'#c6c3bc',3],
    [7.2,-0.015,0,9,1.6,'#c6c3bc',3],
    [0,-0.02,8.2,9,11.2,'#bdb9af',3]
  ],
  floors:[[0,1.6,9,8.2,T],[0,0,1.1,1.6,T],[1.1,0,2.5,1.6,T],[2.5,0,7.2,1.6,T]],
  ceilings:[[1.1,1.6,9,8.2],[0,4.5,1.1,8.2],[1.1,0,2.5,1.6],[2.5,0,7.2,1.6]],
  walls:[
    {ax:'x',c:0,from:0,to:7.2,t:.15,h:2.7,open:[
      {from:1.5,to:2.0,sill:1.6,head:2.1,kind:'window',mid:false},
      {from:3.4,to:6.4,sill:.3,head:2.2,kind:'window'}]},
    {ax:'z',c:7.2,from:0,to:1.6,t:.15,h:2.7,open:[{from:.35,to:1.3,head:2.15,kind:'door',hinge:'from',ang:0,color:DARK}]},
    {ax:'x',c:1.6,from:7.2,to:9,t:.15,h:2.7},
    {ax:'z',c:9,from:1.6,to:8.2,t:.15,h:2.7,open:[{from:5.9,to:7.3,sill:1.1,head:2.1,kind:'window'}]},
    {ax:'z',c:0,from:0,to:8.2,t:.15,h:2.7},
    {ax:'x',c:8.2,from:0,to:9,t:.15,h:2.7,open:[{from:.8,to:3.6,sill:.05,head:2.2,kind:'window'}]},
    {ax:'z',c:1.1,from:0,to:1.6},
    {ax:'z',c:2.5,from:0,to:1.6},
    {ax:'x',c:1.6,from:1.1,to:2.5,open:[{from:1.45,to:2.15,head:2.1,kind:'gap'}]},
    {ax:'z',c:5.4,from:5.5,to:8.2},
    // cuarto de lavado techado y bardas del patio
    {ax:'x',c:9.8,from:7.2,to:9,h:2.5},
    {ax:'x',c:11.2,from:0,to:9,h:2.4,color:'#e3e1dc'},{ax:'z',c:0,from:8.2,to:11.2,h:2.4,color:'#e3e1dc'},{ax:'z',c:9,from:8.2,to:11.2,h:2.5,color:'#e3e1dc'}
  ],
  boxes:[
    [-.075,2.7,-.075,9.075,5.5,8.275,'#f1f0ec',{mat:11}],
    [1.5,3.65,-.1,2.7,4.9,-.07,'#3d4a55',{mat:10}],[4.0,3.65,-.1,5.0,4.3,-.07,'#3d4a55',{mat:10}],[6.9,3.65,-.1,7.7,4.3,-.07,'#3d4a55',{mat:10}],
    [7.2,2.5,8.2,9,2.62,9.8,'#e3e1dc',{mat:11}]
  ],
  items:[
    ['escalera',.55,4.4,180,{w:1.0,n:12,huella:.26,mat:1,color:PISO,barandal:1}],
    ['barra',6.9,8.12,180,{len:2.8,estufa:.5,altos:[[-1.35,-.3],[.15,1.35]],color:WOODC,cubierta:GRAN}],
    ['barra',8.92,6.6,-90,{len:2.0,tarja:0,color:WOODC,cubierta:GRAN}],
    ['barra',7.47,4.7,0,{len:2.95,copete:false,color:WOODC,cubierta:GRAN}],
    ['wc',1.8,.08,0],['lavabo',2.42,1.0,-90],
    ['lavadero',8.3,9.72,180],['boiler',8.92,8.7,-90],
    ['plafon',2.3,6.4,0],['plafon',4.6,3.0,0],['plafon',7.2,6.6,0],['plafon',1.8,.8,0],['plafon',4.8,.8,0],
    ['refri',5.48,6.9,90,{s:1}],
    ['tapete',2.3,6.4,90,{s:1,w:2.4,d:1.7,color:'#d6d1c6',color2:'#bfb9ad'}],['sofa',.58,6.4,90,{s:1,w:2.2,color:'#7d8288',color2:'#8e9399'}],['mesaCentro',2.3,6.4,90,{s:1}],
    ['tv',5.32,6.9,-90,{s:1,w:1.5,color:'#4a2a22'}],['planta',.4,7.85,0,{s:1}],
    ['mesa',4.6,3.0,0,{s:1,w:1.7,d:.95}],['silla',4.1,2.35,0,{s:1}],['silla',5.1,2.35,0,{s:1}],['silla',4.1,3.65,180,{s:1}],['silla',5.1,3.65,180,{s:1}],
    ['silla',3.5,3.0,90,{s:1}],['silla',5.7,3.0,-90,{s:1}],
    ['silla',6.8,4.45,0,{s:1}],['silla',7.7,4.45,0,{s:1}]
  ]
};
var alta={
  sky:'#e9eef1', center:[4.5,0,4.1],
  ground:[[-9,-0.09,-13,18,20,'#d9dcde',0]],
  floors:[[0,0,3.4,5.2,T],[3.4,1.9,5.6,5.2,T],[3.4,0,5.6,1.9,T],[5.6,0,9,2.2,T],[5.6,2.2,9,4.0,T],[5.6,4.0,9,8.2,T],[0,5.2,2.8,8.2,T],[2.8,5.2,5.6,8.2,T]],
  ceilings:[[0,0,3.4,5.2],[3.4,1.9,5.6,5.2],[3.4,0,5.6,1.9],[5.6,0,9,2.2],[5.6,2.2,9,4.0],[5.6,4.0,9,8.2],[0,5.2,2.8,8.2],[2.8,5.2,5.6,8.2]],
  walls:[
    {ax:'x',c:0,from:0,to:9,t:.15,h:2.7,open:[
      {from:1.5,to:2.7,sill:.95,head:2.1,kind:'window'},
      {from:4.2,to:4.8,sill:1.5,head:2.1,kind:'window',mid:false},
      {from:7.0,to:7.6,sill:1.5,head:2.1,kind:'window',mid:false}]},
    {ax:'z',c:0,from:0,to:8.2,t:.15,h:2.7},
    {ax:'z',c:9,from:0,to:8.2,t:.15,h:2.7,open:[{from:5.2,to:7.2,sill:.3,head:2.2,kind:'window'}]},
    {ax:'x',c:8.2,from:0,to:9,t:.15,h:2.7,open:[
      {from:.7,to:2.1,sill:.95,head:2.1,kind:'window'},
      {from:3.5,to:4.9,sill:.95,head:2.1,kind:'window'}]},
    {ax:'z',c:5.6,from:0,to:8.2,open:[{from:4.3,to:5.08,head:2.1,kind:'gap'}]},
    {ax:'x',c:2.2,from:5.6,to:9,open:[{from:6.6,to:7.35,head:2.1,kind:'gap'}]},
    {ax:'x',c:4.0,from:5.6,to:9,open:[{from:7.55,to:8.25,head:2.1,kind:'gap'}]},
    {ax:'z',c:3.4,from:0,to:1.9,open:[{from:.6,to:1.35,head:2.1,kind:'gap'}]},
    {ax:'x',c:1.9,from:3.4,to:5.6},
    {ax:'x',c:5.2,from:0,to:5.6,open:[{from:1.5,to:2.25,head:2.1,kind:'gap'},{from:3.3,to:4.05,head:2.1,kind:'gap'}]},
    {ax:'z',c:2.8,from:5.2,to:8.2}
  ],
  boxes:[],
  items:[
    ['hueco',.55,1.3,0,{w:1.0,l:3.1,lados:[1],color:PISO}],
    ['regadera',5.52,1.82,180,{w:.85,d:1.74}],['wc',4.2,.08,0],['lavabo',3.9,1.83,180],
    ['tocador',5.68,1.05,90,{w:1.6}],['regadera',8.92,2.12,180,{w:.9,d:2.04}],['wc',7.4,.08,0],
    ['closetM',8.92,3.1,-90,{w:1.6}],['closetM',6.6,3.92,180,{w:1.8}],
    ['closetM',2.72,6.9,-90,{w:2.2}],['closetM',2.88,6.9,90,{w:2.2}],
    ['plafon',2.2,3.2,0],['plafon',4.5,3.6,0],['plafon',4.5,.95,0],['plafon',7.3,1.1,0],['plafon',7.3,3.1,0],['plafon',7.3,6.1,0],['plafon',1.4,6.7,0],['plafon',4.2,6.7,0],
    ['sofa',5.02,3.1,-90,{s:1,w:1.8,color:'#7d8288',color2:'#8e9399'}],['tv',4.5,1.98,0,{s:1,w:1.4,color:'#4a2a22'}],
    ['cama',7.3,7.15,180,{s:1,w:1.8,manta:'#6f7f8f'}],['buro',6.1,7.95,180,{s:1}],['buro',8.5,7.95,180,{s:1,lampara:false}],
    ['cama',.65,7.15,180,{s:1,w:.95,manta:'#c9b18f'}],
    ['cama',4.95,7.15,180,{s:1,w:.95,manta:'#8fa59a'}]
  ]
};
var stops=[
  {n:'Planta baja',d:'Sala, comedor, cocina integral con barra, medio baño, cuarto de lavado y patio.',lvl:0,t:[4.5,.2,4.6],yaw:-.6,pitch:.9,dist:23,fov:.62,f:[],v:{dist:31}},
  {n:'Entrada y comedor',d:'Recibidor con ventanal al frente y escalera a la planta alta.',lvl:0,t:[4.6,1.55,5.3],yaw:3.14,pitch:.2,dist:.01,fov:1.25,f:[3]},
  {n:'Sala',d:'Sala con cancel corredizo hacia el patio.',lvl:0,t:[4.9,1.55,4.9],yaw:-.78,pitch:.22,dist:.01,fov:1.15,f:[1]},
  {n:'Cocina',d:'Cocina integral en U con barra de granito.',lvl:0,t:[6.0,1.55,3.8],yaw:.46,pitch:.3,dist:.01,fov:1.2,f:[2]},
  {n:'Medio baño',d:'Medio baño de visitas junto a la escalera.',lvl:0,t:[1.8,1.6,2.75],yaw:3.14,pitch:.4,dist:.01,fov:1.0,f:[10]},
  {n:'Cuarto de lavado',d:'Área de lavado techada en el patio trasero.',lvl:0,t:[5.9,1.55,9.0],yaw:1.57,pitch:.25,dist:.01,fov:1.15,f:[11]},
  {n:'Planta alta',d:'Tres recámaras, dos baños completos y sala de TV.',lvl:1,t:[4.5,.2,4.6],yaw:-.6,pitch:.9,dist:23,fov:.62,f:[],v:{dist:31}},
  {n:'Sala de TV',d:'Estancia al llegar por la escalera, con paso a las recámaras.',lvl:1,t:[2.0,1.55,4.95],yaw:3.14,pitch:.2,dist:.01,fov:1.25,f:[9]},
  {n:'Recámara principal',d:'Recámara principal con vestidor y baño propio.',lvl:1,t:[5.95,1.55,4.35],yaw:.64,pitch:.25,dist:.01,fov:1.2,f:[4]},
  {n:'Vestidor',d:'Vestidor de madera con cajoneras y tubos para colgar.',lvl:1,t:[5.85,1.55,2.5],yaw:1.25,pitch:.25,dist:.01,fov:1.2,f:[5]},
  {n:'Baño principal',d:'Baño con tocador de dos lavabos.',lvl:1,t:[7.1,1.6,2.0],yaw:-2.45,pitch:.4,dist:.01,fov:1.3,f:[6]},
  {n:'Recámara 2',d:'Recámara con clóset de piso a techo.',lvl:1,t:[.4,1.55,5.55],yaw:.64,pitch:.25,dist:.01,fov:1.2,f:[7]},
  {n:'Recámara 3',d:'Recámara con clóset de piso a techo.',lvl:1,t:[5.2,1.55,5.55],yaw:-.64,pitch:.25,dist:.01,fov:1.2,f:[8]},
  {n:'Baño compartido',d:'Baño completo para las recámaras 2 y 3.',lvl:1,t:[3.6,1.6,1.7],yaw:2.2,pitch:.45,dist:.01,fov:1.3,f:[]}
];
window.TOUR={levels:[
  {n:'Planta baja',plan:baja,rooms:[['Comedor',4.6,3.0],['Sala',2.3,6.4],['Cocina',7.2,6.6],['Medio baño',1.8,.8],['Entrada',5.5,.8],['Lavado',8.1,9.0],['Patio',3.5,9.8]]},
  {n:'Planta alta',plan:alta,rooms:[['Sala de TV',3.6,3.4],['Baño',4.5,.95],['Baño principal',7.3,1.1],['Vestidor',7.3,3.1],['Recámara principal',7.3,6.1],['Recámara 2',1.4,6.7],['Recámara 3',4.2,6.7]]}
],stops:stops};
})();
