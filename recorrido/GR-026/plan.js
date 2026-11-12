/* Casa nueva en Los Robles Juriquilla, modelo Acacia (126.39 m², dos plantas). Distribución tomada del plano del modelo; medidas aproximadas.
   Metros. x = ancho visto desde la calle, z = fondo. La calle queda en z negativo. */
(function(){
var T='#e3e1dc', CAB='#8a7762', GRAN='#4a4b4e', DARK='#3b3029';
var baja={
  sky:'#e9eef1', center:[3.25,0,5.0], frame:'#2e3033',
  ground:[
    [-10,-0.09,-14,17,21,'#8fae6b',2],
    [-10,-0.06,-14,17,-6.0,'#7b7d80',0],
    [-10,-0.03,-6.0,17,-4.6,'#cfccc5',3],
    [.2,-0.02,-4.0,3.1,-2.75,'#d8d5ce',3],[3.4,-0.02,-4.0,6.3,-2.75,'#d8d5ce',3],
    [.2,-0.02,-2.6,3.1,-1.35,'#d8d5ce',3],[3.4,-0.02,-2.6,6.3,-1.35,'#d8d5ce',3],
    [.2,-0.02,-1.2,3.1,-.05,'#d8d5ce',3],[3.4,-0.02,-1.2,6.3,-.05,'#d8d5ce',3],
    [.2,-0.02,8.3,4.7,10.8,'#6f9a5c',2]
  ],
  floors:[[0,0,6.5,8.3,T],[4.95,8.3,6.5,10.95,T]],
  ceilings:[[0,0,6.5,8.3],[4.95,8.3,6.5,10.95]],
  walls:[
    /* fachada */
    {ax:'x',c:0,from:0,to:6.5,t:.15,h:2.7,open:[
      {from:.5,to:2.7,sill:.9,head:2.2,kind:'window'},
      {from:3.3,to:4.2,head:2.15,kind:'door',hinge:'to',ang:0,color:DARK}]},
    /* muros laterales y fondo */
    {ax:'z',c:0,from:0,to:8.3,t:.15,h:2.7},
    {ax:'z',c:6.5,from:0,to:10.95,t:.15,h:2.7},
    {ax:'x',c:8.3,from:0,to:4.9,t:.15,h:2.7,open:[{from:.7,to:2.7,sill:.05,head:2.3,kind:'window'}]},
    {ax:'x',c:8.3,from:4.9,to:6.5,t:.15,h:2.7,open:[{from:5.3,to:6.1,head:2.1,kind:'gap'}]},
    {ax:'z',c:4.9,from:8.3,to:10.95,t:.15,h:2.7},
    {ax:'x',c:10.95,from:4.9,to:6.5,t:.15,h:2.7},
    /* cocina */
    {ax:'z',c:3.0,from:1.1,to:4.3,t:.12,h:2.7},
    /* medio baño */
    {ax:'x',c:3.0,from:4.25,to:6.5,h:2.7},
    {ax:'x',c:4.6,from:4.25,to:6.5,h:2.7},
    {ax:'z',c:4.25,from:3.0,to:4.6,h:2.7,open:[{from:3.5,to:4.3,head:2.1,kind:'gap'}]},
    /* jardín trasero */
    {ax:'z',c:0,from:8.3,to:10.95,h:2.2,color:'#e3e1dc'},
    {ax:'x',c:10.95,from:0,to:4.9,h:2.2,color:'#e3e1dc'}
  ],
  boxes:[
    [-.075,2.7,-.5,6.575,5.6,8.375,'#f1f0ec',{mat:11}],
    [2.2,2.9,-.56,4.7,5.3,-.5,'#b98d5e',{mat:11}],[2.7,3.3,-.6,4.2,4.9,-.57,'#2b3540',{mat:10}],
    [.45,3.7,-.6,1.2,4.7,-.57,'#2b3540',{mat:10}],
    [-6.6,0,0,-.08,5.6,10.95,'#e9e8e4',{mat:11}],[6.58,0,0,13,5.6,10.95,'#e9e8e4',{mat:11}]
  ],
  items:[
    /* escalera y medio baño */
    ['escalera',6.0,.15,0,{w:.9,n:12,huella:.23,mat:1,color:'#d9d7d1'}],
    ['wc',6.38,3.75,-90],['lavabo',4.85,3.08,0],
    /* cocina en L con barra */
    ['barra',1.65,2.6,0,{len:2.7,copete:false,estufa:.15,tarja:-.8,color:CAB,cubierta:GRAN}],
    ['barra',.08,1.65,90,{len:1.7,color:CAB,cubierta:GRAN,copete:false}],
    ['silla',.9,3.95,180,{s:1}],['silla',1.5,3.95,180,{s:1}],['silla',2.1,3.95,180,{s:1}],['silla',2.7,3.95,180,{s:1}],
    ['refri',2.65,.07,0,{s:1}],['lavadora',1.3,.08,0],
    /* comedor */
    ['mesa',1.9,6.0,0,{s:1,w:1.2,d:2.0}],
    ['silla',1.0,5.5,90,{s:1}],['silla',1.0,6.5,90,{s:1}],['silla',2.8,5.5,-90,{s:1}],['silla',2.8,6.5,-90,{s:1}],
    ['silla',1.9,4.8,0,{s:1}],['silla',1.9,7.2,180,{s:1}],
    /* sala de TV */
    ['tapete',5.2,6.7,90,{s:1,w:2.4,d:1.9,color:'#6f6259',color2:'#5f534b'}],
    ['sofa',4.15,6.7,90,{s:1,w:2.2,color:'#c9c2b0',color2:'#d6cfbd'}],['mesaCentro',5.2,6.7,90,{s:1}],
    ['tv',6.43,6.7,-90,{w:1.5}],['planta',4.2,7.95,0,{s:1}],
    /* sala de estar a la entrada */
    ['tapete',4.2,1.9,0,{s:1,w:1.5,d:1.5,color:'#7d7468',color2:'#6a6158'}],
    ['silla',3.75,1.9,90,{s:1}],['silla',4.65,1.9,-90,{s:1}],['planta',3.5,.5,0,{s:1}],
    /* alacena y jardín */
    ['closet',5.75,10.87,180,{s:1,w:1.4}],
    ['planta',1.0,9.3,0],['planta',3.9,10.0,0],['planta',2.4,10.55,0],
    ['plafon',1.9,1.2,0],['plafon',3.2,5.0,0],['plafon',1.9,6.0,0],['plafon',5.2,6.7,0],['plafon',5.4,3.8,0],['plafon',3.6,2.0,0]
  ]
};
var alta={
  sky:'#e9eef1', center:[3.25,0,4.2], frame:'#2e3033',
  ground:[[-10,-0.09,-14,17,21,'#d9dcde',0]],
  floors:[[0,0,5.5,3.4,T],[5.5,2.9,6.5,3.4,T],[0,3.4,6.5,5.1,'#e6e4de'],[0,5.1,3.2,8.3,T],[3.2,5.1,6.5,8.3,T]],
  ceilings:[[0,0,6.5,8.3]],
  walls:[
    /* perímetro */
    {ax:'x',c:0,from:0,to:6.5,t:.15,h:2.7,open:[
      {from:1.25,to:2.0,sill:1.5,head:2.1,kind:'window',mid:false},
      {from:2.9,to:5.0,sill:.6,head:2.2,kind:'window'}]},
    {ax:'z',c:0,from:0,to:8.3,t:.15,h:2.7},
    {ax:'z',c:6.5,from:0,to:8.3,t:.15,h:2.7},
    {ax:'x',c:8.3,from:0,to:6.5,t:.15,h:2.7,open:[
      {from:.7,to:2.4,sill:.95,head:2.1,kind:'window'},
      {from:4.0,to:5.7,sill:.95,head:2.1,kind:'window'}]},
    /* recámara principal, baño y vestidor */
    {ax:'z',c:2.3,from:0,to:3.6,open:[{from:1.0,to:1.6,head:2.1,kind:'gap'},{from:2.1,to:2.9,head:2.1,kind:'gap'}]},
    {ax:'x',c:1.7,from:0,to:2.3},
    {ax:'x',c:3.6,from:0,to:2.3},
    {ax:'z',c:5.5,from:0,to:2.9},
    {ax:'x',c:3.4,from:2.3,to:5.5,open:[{from:2.45,to:3.25,head:2.1,kind:'gap'}]},
    /* baño compartido */
    {ax:'z',c:2.1,from:3.6,to:5.1,open:[{from:4.5,to:5.05,head:2.1,kind:'gap'}]},
    /* recámaras 2 y 3 */
    {ax:'x',c:5.1,from:0,to:6.5,open:[{from:2.35,to:3.1,head:2.1,kind:'gap'},{from:3.3,to:4.05,head:2.1,kind:'gap'}]},
    {ax:'z',c:3.2,from:5.1,to:8.3}
  ],
  boxes:[],
  items:[
    ['hueco',6.0,.2,0,{w:.9,l:2.7,lados:[-1],color:'#d9d7d1'}],
    /* baño principal */
    ['regadera',.08,.08,0,{w:.9,d:1.2}],['wc',1.6,.08,0],['lavabo',1.4,1.62,180],
    /* vestidor */
    ['closet',.1,2.1,90,{s:1,w:1.0}],['closet',.1,3.2,90,{s:1,w:1.0}],
    /* baño compartido */
    ['regadera',.08,3.68,0,{w:.9,d:1.2}],['wc',1.5,5.03,180],['lavabo',2.05,4.0,-90],
    ['plafon',1.15,.9,0],['plafon',1.15,2.65,0],['plafon',4.0,1.7,0],['plafon',1.05,4.35,0],['plafon',4.0,4.2,0],
    ['plafon',1.6,6.7,0],['plafon',4.85,6.7,0],
    /* recámara principal */
    ['cama',4.15,1.9,-90,{s:1,w:1.8,manta:'#6b7f8f',cabecera:'#5f7d9a'}],['buro',4.95,.7,-90,{s:1}],['buro',4.95,3.1,-90,{s:1,lampara:false}],
    /* recámara 2 */
    ['cama',1.5,7.2,180,{s:1,w:1.5,manta:'#8f8a6a'}],['buro',.5,7.95,180,{s:1}],['closet',2.0,5.18,0,{s:1,w:1.4}],
    /* recámara 3 */
    ['cama',4.85,7.2,180,{s:1,w:1.5,manta:'#8f8a6a'}],['buro',5.95,7.95,180,{s:1}],['closet',4.0,5.18,0,{s:1,w:1.4}]
  ]
};
var stops=[
  {n:'Planta baja',d:'Sala de TV, sala de estar, comedor, cocina con barra, medio baño, alacena y jardín.',lvl:0,t:[3.25,.2,5.2],yaw:-.6,pitch:.9,dist:17,fov:.62,f:[],v:{dist:24}},
  {n:'Fachada',d:'Casa nueva de dos plantas con cochera para 2 autos.',lvl:0,t:[3.25,2.5,0],yaw:-.5,pitch:.06,dist:16,fov:.75,f:[1,2],v:{dist:20}},
  {n:'Sala de TV',d:'Sala de TV o estudio, abierta al comedor.',lvl:0,t:[3.6,1.55,4.6],yaw:.9,pitch:.22,dist:.01,fov:1.15,f:[3,4]},
  {n:'Comedor',d:'Comedor con salida al jardín trasero.',lvl:0,t:[2.2,1.55,4.3],yaw:.1,pitch:.2,dist:.01,fov:1.2,f:[5]},
  {n:'Cocina',d:'Cocina equipada en L con barra y alacena.',lvl:0,t:[2.4,1.55,4.7],yaw:-2.9,pitch:.3,dist:.01,fov:1.2,f:[6,7]},
  {n:'Medio baño',d:'Medio baño de visitas en planta baja.',lvl:0,t:[4.5,1.6,3.25],yaw:1.35,pitch:.35,dist:.01,fov:1.3,f:[]},
  {n:'Planta alta',d:'Recámara principal con vestidor y baño, dos recámaras y baño compartido.',lvl:1,t:[3.25,.2,4.2],yaw:-.6,pitch:.9,dist:17,fov:.62,f:[],v:{dist:24}},
  {n:'Recámara principal',d:'Recámara principal con vestidor, baño y preparación para minisplit.',lvl:1,t:[2.7,1.55,.6],yaw:.82,pitch:.25,dist:.01,fov:1.2,f:[]},
  {n:'Baño principal',d:'Baño completo de la recámara principal.',lvl:1,t:[1.9,1.6,1.45],yaw:-2.2,pitch:.45,dist:.01,fov:1.3,f:[]},
  {n:'Vestidor',d:'Vestidor de la recámara principal.',lvl:1,t:[2.0,1.6,3.4],yaw:-2.0,pitch:.3,dist:.01,fov:1.3,f:[]},
  {n:'Recámara 2',d:'Recámara secundaria con ventana al jardín.',lvl:1,t:[2.8,1.55,5.45],yaw:-.6,pitch:.28,dist:.01,fov:1.2,f:[]},
  {n:'Recámara 3',d:'Recámara secundaria con ventana al jardín.',lvl:1,t:[3.9,1.55,5.7],yaw:.5,pitch:.28,dist:.01,fov:1.2,f:[]},
  {n:'Baño compartido',d:'Baño completo para las recámaras 2 y 3.',lvl:1,t:[1.45,1.6,3.75],yaw:.35,pitch:.42,dist:.01,fov:1.4,f:[]}
];
window.TOUR={levels:[
  {n:'Planta baja',plan:baja,rooms:[['Cocina',1.7,3.0],['Comedor',1.9,6.0],['Sala de TV',5.2,6.7],['Medio baño',5.4,3.8],['Escalera',6.0,1.5],['Alacena',5.75,9.6],['Jardín',2.4,9.5],['Cochera',3.25,-2.3]]},
  {n:'Planta alta',plan:alta,rooms:[['Recámara principal',3.9,1.7],['Baño',1.15,.9],['Vestidor',1.15,2.65],['Baño',1.05,4.35],['Recámara 2',1.6,6.7],['Recámara 3',4.85,6.7]]}
],stops:stops};
})();
