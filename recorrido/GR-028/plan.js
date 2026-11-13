/* Casa nueva en Los Robles Juriquilla, modelo Maple (132.09 m², dos plantas). Distribución tomada del plano del modelo; medidas aproximadas.
   Metros. x = ancho visto desde la calle, z = fondo. La calle queda en z negativo. */
(function(){
var T='#e3e1dc', CAB='#4a3f39', GRAN='#c9c7c2', DARK='#3b3029';
var baja={
  sky:'#e9eef1', center:[3.25,0,5.4], frame:'#2e3033',
  ground:[
    [-10,-0.09,-14,17,21,'#8fae6b',2],
    [-10,-0.06,-14,17,-6.0,'#7b7d80',0],
    [-10,-0.03,-6.0,17,-4.6,'#cfccc5',3],
    [.2,-0.02,-4.0,3.1,-2.75,'#d8d5ce',3],[3.4,-0.02,-4.0,6.3,-2.75,'#d8d5ce',3],
    [.2,-0.02,-2.6,3.1,-1.35,'#d8d5ce',3],[3.4,-0.02,-2.6,6.3,-1.35,'#d8d5ce',3],
    [.2,-0.02,-1.2,3.1,-.05,'#d8d5ce',3],[3.4,-0.02,-1.2,6.3,-.05,'#d8d5ce',3],
    [2.2,-0.02,9.2,6.2,11.6,'#6f9a5c',2]
  ],
  floors:[[0,0,6.5,9.1,T],[0,9.1,2.0,11.7,T]],
  ceilings:[[0,0,6.5,9.1],[0,9.1,2.0,11.7]],
  walls:[
    {ax:'x',c:0,from:0,to:6.5,t:.15,h:2.7,open:[
      {from:2.1,to:3.0,head:2.15,kind:'door',hinge:'to',ang:0,color:DARK},
      {from:3.9,to:5.9,sill:.9,head:2.2,kind:'window'}]},
    {ax:'z',c:0,from:0,to:11.7,t:.15,h:2.7},
    {ax:'z',c:6.5,from:0,to:9.1,t:.15,h:2.7},
    {ax:'z',c:6.5,from:9.1,to:11.7,t:.15,h:2.2,color:T},
    /* fondo: salida al jardín y cuarto de lavado */
    {ax:'x',c:9.1,from:0,to:2.0,t:.15,h:2.7,open:[{from:.5,to:1.4,head:2.1,kind:'gap'}]},
    {ax:'x',c:9.1,from:2.0,to:6.5,t:.15,h:2.7,open:[{from:2.5,to:5.9,sill:.05,head:2.3,kind:'window'}]},
    {ax:'z',c:2.0,from:9.1,to:11.7,t:.15,h:2.7},
    {ax:'x',c:11.7,from:0,to:2.0,t:.15,h:2.7},
    {ax:'x',c:11.7,from:2.0,to:6.5,t:.15,h:2.2,color:T},
    /* medio baño */
    {ax:'z',c:2.0,from:0,to:2.9,h:2.7,open:[{from:.45,to:1.25,head:2.1,kind:'gap'}]},
    {ax:'x',c:2.9,from:0,to:2.0,h:2.7}
  ],
  boxes:[
    [-.075,2.7,-.5,6.575,5.6,9.175,'#f1f0ec',{mat:11}],
    [4.9,2.9,-.56,5.4,5.3,-.5,'#b98d5e',{mat:11}],[2.0,3.3,-.6,4.5,4.9,-.57,'#2b3540',{mat:10}],
    [.5,3.7,-.6,1.2,4.7,-.57,'#2b3540',{mat:10}],[5.6,3.7,-.6,6.2,4.7,-.57,'#2b3540',{mat:10}],
    [-6.6,0,0,-.08,5.6,11.7,'#e9e8e4',{mat:11}],[6.58,0,0,13,5.6,11.7,'#e9e8e4',{mat:11}]
  ],
  items:[
    /* medio baño */
    ['wc',.1,.8,90],['lavabo',1.5,.08,0],
    /* sala */
    ['tv',2.1,2.35,90,{w:1.1}],
    ['tapete',4.5,2.7,90,{s:1,w:2.4,d:1.9,color:'#6f6259',color2:'#5f534b'}],
    ['sofa',6.15,2.7,-90,{s:1,w:2.2,color:'#7f8c99',color2:'#93a0ad'}],['mesaCentro',4.6,2.7,90,{s:1}],
    ['silla',4.4,4.2,180,{s:1}],['planta',3.2,.5,0,{s:1}],
    /* escalera en U */
    ['escalera',.55,3.55,90,{w:.8,n:7,huella:.25,alto:1.35,mat:1,color:'#d9d7d1'}],
    ['escalera',2.3,4.65,-90,{w:.8,n:7,huella:.25,alto:1.35,y0:1.35,mat:1,color:'#d9d7d1'}],
    /* cocina: isla, cubierta y refri */
    ['barra',2.5,7.25,90,{len:2.3,copete:false,estufa:0,tarja:.7,color:CAB,cubierta:GRAN}],
    ['barra',.08,7.3,90,{len:2.1,color:CAB,cubierta:GRAN,copete:false}],
    ['refri',.08,5.85,90,{s:1}],
    ['silla',3.75,6.5,-90,{s:1}],['silla',3.75,7.2,-90,{s:1}],['silla',3.75,7.9,-90,{s:1}],
    /* comedor */
    ['mesa',4.85,6.8,0,{s:1,w:1.0,d:2.0}],
    ['silla',4.1,6.3,90,{s:1}],['silla',4.1,7.3,90,{s:1}],['silla',5.6,6.3,-90,{s:1}],['silla',5.6,7.3,-90,{s:1}],
    ['silla',4.85,5.6,0,{s:1}],['silla',4.85,8.0,180,{s:1}],
    /* lavado y alacena */
    ['lavadora',.55,11.62,180],['lavadora',1.4,11.62,180],['closet',.1,10.2,90,{s:1,w:1.2}],
    ['planta',3.0,10.0,0],['planta',5.2,10.9,0],['planta',5.9,9.6,0],
    ['plafon',3.2,2.6,0],['plafon',1.0,1.2,0],['plafon',3.0,6.8,0],['plafon',4.85,6.8,0],['plafon',1.5,10.3,0]
  ]
};
var alta={
  sky:'#e9eef1', center:[3.25,0,4.8], frame:'#2e3033',
  ground:[[-10,-0.09,-14,17,21,'#d9dcde',0]],
  floors:[[0,0,6.5,3.5,T],[0,3.5,6.5,5.5,'#e6e4de'],[0,5.5,3.25,9.1,T],[3.25,5.5,6.5,9.1,T]],
  ceilings:[[0,0,6.5,9.1]],
  walls:[
    {ax:'x',c:0,from:0,to:6.5,t:.15,h:2.7,open:[
      {from:1.0,to:1.7,sill:1.5,head:2.1,kind:'window',mid:false},
      {from:3.2,to:5.8,sill:.6,head:2.2,kind:'window'}]},
    {ax:'z',c:0,from:0,to:9.1,t:.15,h:2.7},
    {ax:'z',c:6.5,from:0,to:9.1,t:.15,h:2.7},
    {ax:'x',c:9.1,from:0,to:6.5,t:.15,h:2.7,open:[
      {from:.8,to:2.6,sill:.95,head:2.1,kind:'window'},
      {from:4.1,to:5.9,sill:.95,head:2.1,kind:'window'}]},
    /* baño principal y vestidor */
    {ax:'z',c:2.0,from:0,to:1.7,open:[{from:1.0,to:1.6,head:2.1,kind:'gap'}]},
    {ax:'x',c:1.7,from:0,to:2.0},
    {ax:'z',c:2.9,from:1.7,to:3.5,open:[{from:2.1,to:3.0,head:2.1,kind:'gap'}]},
    {ax:'x',c:3.5,from:0,to:6.5,open:[{from:3.0,to:3.8,head:2.1,kind:'gap'}]},
    /* baño compartido */
    {ax:'z',c:4.25,from:3.5,to:5.5,open:[{from:4.3,to:5.0,head:2.1,kind:'gap'}]},
    /* recámaras 2 y 3 */
    {ax:'x',c:5.5,from:0,to:6.5,open:[{from:2.4,to:3.1,head:2.1,kind:'gap'},{from:3.4,to:4.1,head:2.1,kind:'gap'}]},
    {ax:'z',c:3.25,from:5.5,to:9.1}
  ],
  boxes:[],
  items:[
    ['hueco',.55,3.75,90,{w:1.7,l:2.3,lados:[1],color:'#d9d7d1'}],
    /* baño principal */
    ['regadera',.08,.08,0,{w:.9,d:1.2}],['wc',1.6,.08,0],['lavabo',1.4,1.62,180],
    ['closet',.1,2.1,90,{s:1,w:1.0}],['closet',.1,3.1,90,{s:1,w:1.0}],
    /* baño compartido */
    ['regadera',4.33,3.58,0,{w:.9,d:1.0}],['wc',6.4,4.4,-90],['lavabo',5.2,5.42,180],
    /* recámara principal */
    ['cama',4.6,1.7,-90,{s:1,w:1.8,manta:'#b9703f',cabecera:'#8c7b68'}],['buro',5.75,.5,-90,{s:1}],['buro',5.75,2.9,-90,{s:1,lampara:false}],
    /* recámaras */
    ['cama',1.15,7.4,90,{s:1,w:1.5,manta:'#8f8a6a'}],['closet',2.1,5.58,0,{s:1,w:1.4}],['buro',.5,8.4,90,{s:1}],
    ['cama',4.9,8.05,180,{s:1,w:1.5,manta:'#8f8a6a'}],['closet',4.0,5.58,0,{s:1,w:1.4}],['buro',5.95,8.7,180,{s:1}],
    ['plafon',1.0,.9,0],['plafon',4.5,1.7,0],['plafon',1.45,2.6,0],['plafon',1.0,4.4,0],['plafon',5.4,4.5,0],['plafon',1.6,7.4,0],['plafon',4.85,7.4,0]
  ]
};
var stops=[
  {n:'Planta baja',d:'Sala de TV, sala de estar, comedor, cocina con isla, medio baño, lavado y jardín.',lvl:0,t:[3.25,.2,5.4],yaw:-.6,pitch:.9,dist:18,fov:.62,f:[],v:{dist:25}},
  {n:'Fachada',d:'Casa nueva de dos plantas con cochera para 2 autos.',lvl:0,t:[3.25,2.5,0],yaw:-.5,pitch:.06,dist:16,fov:.75,f:[1],v:{dist:20}},
  {n:'Sala',d:'Sala de TV o estudio con sala de estar.',lvl:0,t:[2.5,1.55,3.4],yaw:1.65,pitch:.2,dist:.01,fov:1.25,f:[2]},
  {n:'Comedor',d:'Comedor junto al jardín interior.',lvl:0,t:[3.5,1.55,4.7],yaw:.45,pitch:.15,dist:.01,fov:1.3,f:[3,4]},
  {n:'Cocina',d:'Cocina equipada con isla, alacena y centro de lavado.',lvl:0,t:[5.6,1.55,8.2],yaw:-1.75,pitch:.2,dist:.01,fov:1.3,f:[5,6,7]},
  {n:'Medio baño',d:'Medio baño de visitas en planta baja.',lvl:0,t:[1.55,1.6,1.7],yaw:-1.9,pitch:.4,dist:.01,fov:1.4,f:[]},
  {n:'Planta alta',d:'Recámara principal con vestidor y baño, dos recámaras y baño compartido.',lvl:1,t:[3.25,.2,4.8],yaw:-.6,pitch:.9,dist:18,fov:.62,f:[],v:{dist:25}},
  {n:'Recámara principal',d:'Recámara principal con vestidor, baño y preparación para minisplit.',lvl:1,t:[3.1,1.55,.6],yaw:.94,pitch:.25,dist:.01,fov:1.2,f:[]},
  {n:'Baño principal',d:'Baño completo de la recámara principal.',lvl:1,t:[1.5,1.6,1.4],yaw:-2.36,pitch:.45,dist:.01,fov:1.3,f:[]},
  {n:'Vestidor',d:'Vestidor de la recámara principal.',lvl:1,t:[2.4,1.6,3.2],yaw:-1.7,pitch:.3,dist:.01,fov:1.3,f:[]},
  {n:'Recámara 2',d:'Recámara secundaria con ventana al jardín.',lvl:1,t:[2.8,1.55,5.8],yaw:-.82,pitch:.28,dist:.01,fov:1.2,f:[]},
  {n:'Recámara 3',d:'Recámara secundaria con ventana al jardín.',lvl:1,t:[3.7,1.55,5.9],yaw:.52,pitch:.28,dist:.01,fov:1.2,f:[]},
  {n:'Baño compartido',d:'Baño completo para las recámaras 2 y 3.',lvl:1,t:[5.5,1.6,5.2],yaw:2.36,pitch:.4,dist:.01,fov:1.4,f:[]}
];
window.TOUR={levels:[
  {n:'Planta baja',plan:baja,rooms:[['Medio baño',1.0,1.2],['Sala',4.5,2.0],['Escalera',1.6,4.1],['Cocina',2.4,7.3],['Comedor',4.85,6.8],['Lavado',1.0,10.4],['Jardín',4.2,10.5],['Cochera',3.25,-2.3]]},
  {n:'Planta alta',plan:alta,rooms:[['Baño',1.0,.9],['Vestidor',1.45,2.6],['Recámara principal',4.4,1.7],['Escalera',1.5,4.5],['Baño',5.2,4.5],['Recámara 2',1.7,7.4],['Recámara 3',4.9,7.4]]}
],stops:stops};
})();
