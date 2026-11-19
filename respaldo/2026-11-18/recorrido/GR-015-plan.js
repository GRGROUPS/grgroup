/* Casa en El Mirador (126 m² en tres niveles). Plano deducido de las fotos; medidas aproximadas.
   Metros. x = ancho visto desde la calle, z = fondo. */
(function(){
// fotos: casa blanca con celosía de ladrillo rojo al frente, porcelanato gris claro grande, cocina con altos blancos
// y bajos de encino, granito blanco moteado, cancelería negra, pérgolas negras de duelas y terraza con duela de porcelanato
var T='#bcb7af', CAB='#c8a277', GRAN='#e2ded5', DARK='#2f2a2a', DECK='#a77d5c', FR='#232425', WH='#f6f6f4', EXT='#f3f3f1';
var baja={
  sky:'#e9eef1', center:[3,0,4.5], frame:FR, tile:.6, gloss:.6, wallOut:EXT, wallMat:14, wallIn:WH, zoclo:'#c9c4bb', indoor:[[4.0,1.5,6,4.1]],
  ground:[
    [-9,-0.09,-13,15,21,'#8fae6b',2],
    [-9,-0.06,-13,15,-6.6,'#7b7d80',0],
    [-9,-0.03,-6.6,15,-5.2,'#cfccc5',3],
    [.5,-0.02,-5.2,1.4,0,'#d6d3cc',3],[2.0,-0.02,-5.2,2.9,0,'#d6d3cc',3],[3.4,-0.02,-5.2,4.3,0,'#d6d3cc',3],[4.8,-0.02,-5.2,5.7,0,'#d6d3cc',3],
    [0,-0.015,0,2.6,2.2,'#bdb9af',3],
    [0,-0.02,8.5,6,12,'#b9a892',3]
  ],
  floors:[[0,2.2,2.6,5.6,T],[2.6,0,4.0,5.6,T],[4.0,0,6,1.5,T],[4.0,1.5,6,4.1,T],[4.0,4.1,6,5.6,T],[0,5.6,6,8.5,T]],
  ceilings:[[0,2.2,2.6,5.6],[2.6,0,4.0,5.6],[4.0,0,6,1.5],[4.0,4.1,6,5.6],[0,5.6,6,8.5]],
  walls:[
    {ax:'x',c:0,from:2.6,to:6,t:.15,h:2.7,open:[
      {from:2.85,to:3.75,head:2.15,kind:'door',hinge:'from',ang:0,color:DARK},
      {from:4.6,to:5.5,sill:1.35,head:1.95,kind:'window',mid:false}]},
    {ax:'x',c:0,from:0,to:2.6,t:.15,h:2.5,color:'#a2513a',mat:12},
    {ax:'z',c:0,from:0,to:8.5,t:.15,h:2.7},
    {ax:'z',c:6,from:0,to:8.5,t:.15,h:2.7},
    {ax:'x',c:2.2,from:0,to:2.6,t:.15,h:2.7,open:[{from:.95,to:1.75,head:2.1,kind:'glassdoor',mid:false}]},
    {ax:'x',c:8.5,from:0,to:6,t:.15,h:2.7,open:[
      {from:.3,to:2.7,sill:.05,head:2.3,kind:'window'},
      {from:3.1,to:5.7,sill:.05,head:2.3,kind:'window'}]},
    {ax:'z',c:2.6,from:0,to:5.0},
    {ax:'z',c:4.0,from:0,to:1.5,open:[{from:.4,to:1.1,head:2.1,kind:'gap'}]},
    {ax:'x',c:1.5,from:4.0,to:6},
    {ax:'x',c:12,from:0,to:6,h:2.6,color:'#f1f0ec'},{ax:'z',c:0,from:8.5,to:12,h:2.6,color:'#f1f0ec'},{ax:'z',c:6,from:8.5,to:12,h:2.6,color:'#f1f0ec'}
  ],
  boxes:[
    [4.05,1.2,1.55,5.95,1.35,1.97,'#ecebe6'],
    // niveles superiores y casas vecinas vistos desde la calle (se ocultan al ver la maqueta desde arriba)
    [-.075,2.7,-.075,6.075,5.5,8.575,'#f4f3ef',{mat:11}],
    [-.075,5.5,4.1,6.075,8.1,8.575,'#f4f3ef',{mat:11}],[3.9,5.5,1.4,6.075,8.1,4.1,'#f4f3ef',{mat:11}],
    [0,7.85,0,3.9,7.95,4.1,'#2b2b2b',{mat:11}],[.06,5.5,.06,.16,7.85,.16,'#2b2b2b',{mat:11}],
    [0,6.4,-.02,3.9,6.46,.02,'#2b2b2b',{mat:11}],[0,5.95,-.02,3.9,6.0,.02,'#2b2b2b',{mat:11}],
    [.6,3.3,-.1,2.4,5.0,-.07,'#3d4a55',{mat:10}],[.6,3.3,-.14,2.4,4.2,-.11,'#2b2b2b',{mat:11,a:1}],
    [3.6,4.6,-.1,5.2,4.95,-.07,'#3d4a55',{mat:10}],
    [-6.2,0,0,-.08,8.1,8.5,'#eeede9',{mat:11}],[6.08,0,0,12.2,8.1,8.5,'#eeede9',{mat:11}]
  ],
  items:[
    ['escalera',4.5,4.05,180,{w:.9,n:7,alto:1.35,huella:.3,mat:1,color:T}],
    ['escalera',5.5,1.97,0,{w:.9,n:7,alto:1.35,y0:1.35,huella:.3,mat:1,color:T}],
    ['barra',.08,3.7,90,{len:2.7,estufa:-.2,horno:1,tarja:.85,altos:[[-1.3,.5]],color:CAB,mat:6,colorAltos:WH,cubierta:GRAN}],
    ['barra',.98,5.02,0,{len:1.9,copete:false,color:CAB,mat:6,cubierta:GRAN}],
    ['barra',2.52,3.9,-90,{len:1.3,copete:false,color:CAB,mat:6,cubierta:GRAN}],
    ['wc',5.2,.08,0],['tocadorF',5.92,.9,-90,{w:.7,color:'#d8b98c',cubierta:'#d8b98c'}],
    ['pergola',1.6,11.0,180,{w:3.0,d:2.5,alto:2.5,color:'#2b2b2b',poste:'#2b2b2b',slats:.22}],
    ['plafon',1.3,3.8,0],['plafon',3.3,2.4,0],['plafon',1.6,7.0,0],['plafon',4.6,7.0,0],['plafon',5.0,.8,0],
    ['refri',2.2,2.3,0,{s:1}],
    ['silla',.6,5.95,180,{s:1}],['silla',1.4,5.95,180,{s:1}],
    ['mesa',1.5,7.25,0,{s:1,w:.9,d:1.5}],['silla',.85,6.9,90,{s:1}],['silla',.85,7.6,90,{s:1}],['silla',2.15,6.9,-90,{s:1}],['silla',2.15,7.6,-90,{s:1}],
    ['tapete',4.6,6.1,0,{s:1,w:2.2,d:1.8,color:'#c9c5bc',color2:'#b5b0a6'}],['sofa',4.6,7.6,180,{s:1,w:2.2,color:'#8a8d91',color2:'#9b9ea2'}],['mesaCentro',4.6,6.2,0,{s:1}],
    ['tv',5.0,4.18,0,{s:1,w:1.5}],['planta',5.65,8.1,0,{s:1}]
  ]
};
var uno={
  sky:'#e9eef1', center:[3,0,4.5], frame:FR, tile:.6, gloss:.6, wallOut:EXT, wallMat:14, wallIn:WH, zoclo:'#c9c4bb',
  ground:[[-9,-0.09,-13,15,21,'#d9dcde',0]],
  floors:[[0,0,2.9,3.6,T],[2.9,0,6,1.5,T],[2.9,1.5,4.0,5.0,T],[4.0,1.5,6,4.1,T],[0,3.6,2.9,5.0,T],[0,5.0,3.7,8.5,T],[3.7,5.0,6,8.5,T],[4.0,4.1,6,5.0,T]],
  ceilings:[[0,0,2.9,3.6],[2.9,0,6,1.5],[2.9,1.5,4.0,5.0],[0,3.6,2.9,5.0],[0,5.0,3.7,8.5],[3.7,5.0,6,8.5],[4.0,4.1,6,5.0]],
  walls:[
    {ax:'x',c:0,from:0,to:6,t:.15,h:2.7,open:[
      {from:.6,to:2.4,sill:.3,head:2.2,kind:'window'},
      {from:3.6,to:5.2,sill:1.6,head:2.05,kind:'window',mid:false}]},
    {ax:'z',c:0,from:0,to:8.5,t:.15,h:2.7},
    {ax:'z',c:6,from:0,to:8.5,t:.15,h:2.7},
    {ax:'x',c:8.5,from:0,to:6,t:.15,h:2.7,open:[
      {from:.9,to:2.7,sill:.9,head:2.1,kind:'window'},
      {from:4.1,to:5.5,sill:.9,head:2.1,kind:'window'}]},
    {ax:'z',c:2.9,from:0,to:5.0,open:[{from:2.6,to:3.35,head:2.1,kind:'gap'}]},
    {ax:'x',c:3.6,from:0,to:2.9},
    {ax:'x',c:1.5,from:2.9,to:6,open:[{from:3.05,to:3.8,head:2.1,kind:'gap'}]},
    {ax:'x',c:5.0,from:0,to:4.0,open:[{from:.8,to:1.5,head:2.1,kind:'gap'},{from:2.95,to:3.65,head:2.1,kind:'gap'}]},
    {ax:'z',c:4.0,from:4.1,to:5.0,open:[{from:4.2,to:4.92,head:2.1,kind:'gap'}]},
    {ax:'x',c:4.1,from:4.0,to:6},
    {ax:'z',c:3.7,from:5.0,to:8.5}
  ],
  boxes:[],
  items:[
    ['hueco',4.5,1.6,0,{w:.9,l:2.45,lados:[-1],color:T}],
    ['escalera',5.5,1.6,0,{w:.9,n:9,huella:.27,mat:1,color:T}],
    ['regadera',5.92,1.42,180,{w:.9,d:1.34}],['wc',4.5,.08,0],['tocadorF',2.98,.62,90,{w:.8,color:'#d8b98c',cubierta:'#d8b98c'}],
    ['regadera',.08,3.68,0,{w:.9,d:1.24}],['wc',1.6,3.68,0],['tocadorF',2.35,3.68,0,{w:.7,color:'#d8b98c',cubierta:'#d8b98c'}],
    ['plafon',1.4,1.8,0],['plafon',4.2,.75,0],['plafon',3.45,3.2,0],['plafon',1.5,4.3,0],['plafon',1.8,6.8,0],['plafon',4.85,6.8,0],
    ['cama',1.15,7.0,90,{s:1,w:1.8,manta:'#6f7f8f'}],['buro',.3,5.85,90,{s:1}],['buro',.3,8.15,90,{s:1,lampara:false}],['closet',2.2,5.08,0,{s:1,w:1.3}],
    ['cama',4.62,7.45,180,{s:1,w:1.4,manta:'#8fa59a'}],['closet',5.92,7.85,-90,{s:1,w:1.2}],
    ['cama',1.1,1.25,90,{s:1,w:1.4,manta:'#c9b18f'}],['buro',.3,2.3,90,{s:1}],['closet',1.3,3.52,180,{s:1,w:1.5}]
  ]
};
var dos={
  sky:'#e9eef1', center:[3,0,4.5], frame:FR, tile:.6, gloss:.6, wallOut:EXT, wallMat:14, wallIn:WH, zoclo:'#c9c4bb',
  ground:[[-9,-0.09,-13,15,21,'#d9dcde',0]],
  floors:[[0,4.1,6,7.2,T],[3.9,7.2,6,8.5,T],[4.0,1.5,6,4.1,T],[0,0,4.0,4.1,DECK,13],[0,7.2,3.9,8.5,DECK,13]],
  ceilings:[[0,4.1,6,7.2],[3.9,7.2,6,8.5]],
  walls:[
    {ax:'x',c:4.1,from:0,to:4.0,t:.15,h:2.7,open:[{from:.3,to:3.7,sill:.05,head:2.3,kind:'window'}]},
    {ax:'z',c:0,from:4.1,to:7.2,t:.15,h:2.7,open:[{from:5.0,to:6.4,sill:.9,head:2.1,kind:'window',mid:false}]},
    {ax:'z',c:6,from:1.5,to:8.5,t:.15,h:2.7},
    {ax:'z',c:4.0,from:1.5,to:4.1,t:.15,h:2.7},
    {ax:'x',c:1.5,from:4.0,to:6,t:.15,h:2.7},
    {ax:'x',c:7.2,from:0,to:6,t:.15,h:2.7,open:[{from:2.9,to:3.7,head:2.1,kind:'glassdoor',mid:false},{from:4.25,to:4.98,head:2.1,kind:'gap'}]},
    {ax:'z',c:3.9,from:7.2,to:8.5,t:.15,h:2.7},
    {ax:'x',c:8.5,from:3.9,to:6,t:.15,h:2.7,open:[{from:4.6,to:5.4,sill:1.6,head:2.05,kind:'window',mid:false}]},
    // pretiles de las terrazas
    {ax:'x',c:0,from:0,to:4.0,h:1.05,t:.1,color:EXT},{ax:'z',c:0,from:0,to:4.1,h:1.05,t:.1,color:EXT},
    {ax:'x',c:8.5,from:0,to:3.9,h:1.05,t:.1},{ax:'z',c:0,from:7.2,to:8.5,h:1.05,t:.1}
  ],
  boxes:[],
  items:[
    ['hueco',5.0,1.6,0,{w:1.8,l:2.4,lados:[],color:T}],
    ['pergola',2.0,.12,0,{w:3.8,d:3.9,alto:2.45,color:'#2b2b2b',poste:'#2b2b2b',slats:.22}],
    ['regadera',5.92,8.42,180,{w:.8,d:1.14}],['wc',4.65,8.42,180],['tocadorF',4.1,8.42,180,{w:.6,color:'#d8b98c',cubierta:'#d8b98c'}],
    ['plafon',2.6,5.6,0],['plafon',5.0,7.8,0],
    ['sofa',.58,6.1,90,{s:1,w:1.8,color:'#8a8d91',color2:'#9b9ea2'}],['mesa',1.9,6.75,0,{s:1,w:1.2,d:.6}],['silla',1.9,6.2,0,{s:1}],
    ['mesa',2.0,2.0,0,{s:1,w:.9,d:.9}],['silla',1.35,2.0,90,{s:1}],['silla',2.65,2.0,-90,{s:1}],['planta',.4,3.7,0,{s:1}],['planta',.4,.45,0,{s:1,h:1.0}]
  ]
};
var stops=[
  {n:'Planta baja',d:'Sala-comedor con salida al patio, cocina integral con barra, medio baño y patio de servicio.',lvl:0,t:[3,.2,4.8],yaw:-.6,pitch:.9,dist:22,fov:.62,f:[],v:{dist:30}},
  {n:'Fachada',d:'Casa de tres niveles con terraza y pérgola en la azotea.',lvl:0,t:[3,3.6,0],yaw:-.45,pitch:.05,dist:19,fov:.75,f:[1],v:{dist:24}},
  {n:'Sala-comedor',d:'Sala-comedor con dos canceles corredizos hacia el patio.',lvl:0,t:[.45,1.55,5.95],yaw:.9,pitch:.2,dist:.01,fov:1.2,f:[2,3]},
  {n:'Entrada y escalera',d:'Recibidor con escalera de barandal de cristal.',lvl:0,t:[3.3,1.55,5.45],yaw:3.14,pitch:.15,dist:.01,fov:1.2,f:[5]},
  {n:'Cocina',d:'Cocina integral con barra de granito y salida al patio de servicio.',lvl:0,t:[2.3,1.55,6.35],yaw:-2.75,pitch:.3,dist:.01,fov:1.2,f:[4,6]},
  {n:'Patio',d:'Patio trasero con pérgola.',lvl:0,t:[4.6,1.55,11.5],yaw:-2.75,pitch:.02,dist:.01,fov:1.2,f:[7]},
  {n:'Primer piso',d:'Tres recámaras y dos baños completos.',lvl:1,t:[3,.2,4.8],yaw:-.6,pitch:.9,dist:22,fov:.62,f:[],v:{dist:30}},
  {n:'Recámara principal',d:'Recámara principal con clóset y baño propio.',lvl:1,t:[3.4,1.55,5.3],yaw:-.78,pitch:.25,dist:.01,fov:1.2,f:[8]},
  {n:'Baño principal',d:'Baño completo con cancel de cristal.',lvl:1,t:[2.7,1.6,4.82],yaw:-2.2,pitch:.45,dist:.01,fov:1.3,f:[9]},
  {n:'Recámara 2',d:'Recámara con ventana al patio.',lvl:1,t:[4.25,1.55,4.4],yaw:.3,pitch:.25,dist:.01,fov:1.2,f:[]},
  {n:'Recámara 3',d:'Recámara al frente con ventanal.',lvl:1,t:[2.6,1.55,.4],yaw:-.78,pitch:.25,dist:.01,fov:1.2,f:[]},
  {n:'Baño',d:'Baño completo para las recámaras.',lvl:1,t:[3.1,1.6,1.32],yaw:1.95,pitch:.45,dist:.01,fov:1.3,f:[10]},
  {n:'Tercer nivel',d:'Estudio o cuarta recámara con baño y terraza con pérgola.',lvl:2,t:[3,.2,4.6],yaw:-.6,pitch:.9,dist:22,fov:.62,f:[],v:{dist:30}},
  {n:'Estudio',d:'Estudio o cuarta recámara, con baño y salida a la terraza.',lvl:2,t:[5.6,1.55,6.9],yaw:-2.1,pitch:.2,dist:.01,fov:1.2,f:[11,12]},
  {n:'Terraza',d:'Terraza con pérgola y vista a la ciudad.',lvl:2,t:[3.6,1.55,3.75],yaw:-2.5,pitch:.12,dist:.01,fov:1.2,f:[13]}
];
window.TOUR={levels:[
  {n:'Planta baja',plan:baja,rooms:[['Sala-comedor',3.2,7.0],['Cocina',1.3,3.8],['Entrada',3.3,1.5],['Medio baño',5.0,.8],['Patio de servicio',1.3,1.1],['Patio',3,10.3]]},
  {n:'Primer piso',plan:uno,rooms:[['Recámara principal',1.8,6.8],['Baño',1.5,4.3],['Recámara 2',4.85,6.8],['Recámara 3',1.4,1.8],['Baño',4.4,.75]]},
  {n:'Tercer nivel',plan:dos,rooms:[['Estudio',2.6,5.6],['Baño',5.0,7.85],['Terraza',2.0,2.0],['Balcón',1.9,7.85]]}
],stops:stops};
})();
