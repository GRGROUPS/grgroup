/* Casa en Paseos del Bosque (dos niveles). No hay plano: la distribución se armó con las fotos y la ficha;
   medidas aproximadas, distribución aprobada por Iñaki. Metros. x = ancho visto desde la calle, z = fondo. La calle queda en z negativo. */
(function(){
// fotos: casa de dos niveles, planta baja con muro gris y ventanal de reja, puerta recesada oscura, loseta beige-gris,
// cocina en L con muebles oscuros, cubierta de granito moteado, estufa y doble tarja, área de lavado techada con lavadero
var T='#cfc9bb', EXT='#efeeea', GRIS='#9c9d99', OSC='#2d2829', GRAN='#7b6a58', VID='#2b3540';
var baja={
  sky:'#e9eef1', center:[3,0,5.2], frame:'#e8e8e6', tile:.33, gloss:.5, wallOut:EXT, wallMat:14, wallIn:'#f4f3f0', zoclo:'#cfc9bb',
  ground:[
    [-10,-0.09,-16,17,24,'#8fae6b',2],
    [-10,-0.06,-16,17,-8.8,'#6d6f72',0],
    [-10,-0.03,-8.8,17,-8.0,'#cfccc5',3],
    [-1,-0.04,-8.0,2.4,0,'#7fa05a',2],
    [.55,-0.025,-3.6,1.65,-3.0,'#c9c5bc',3],[.55,-0.025,-4.4,1.65,-3.8,'#c9c5bc',3],[.55,-0.025,-5.2,1.65,-4.6,'#c9c5bc',3],
    [.55,-0.025,-2.2,1.65,-1.6,'#c9c5bc',3],[.55,-0.025,-1.4,1.65,-.8,'#c9c5bc',3],[.55,-0.025,-2.9,1.65,-2.3,'#c9c5bc',3],
    [0,-0.015,8.2,6,11.6,'#b9b3a8',3]
  ],
  floors:[[0,0,6,8.2,T]],
  ceilings:[[0,0,6,1.8],[0,1.8,5.05,5.0],[5.95,1.8,6,5.0],[0,5.0,6,8.2]],
  walls:[
    /* fachada: puerta recesada oscura y ventanal con reja */
    {ax:'x',c:0,from:0,to:6,t:.18,h:2.7,out:-1,open:[
      {from:.6,to:1.6,head:2.2,kind:'door',hinge:'from',ang:0,color:OSC,mat:6},
      {from:2.6,to:5.2,sill:.9,head:2.1,kind:'window',grille:true}]},
    {ax:'z',c:0,from:0,to:8.2,t:.18,h:2.7},
    {ax:'z',c:6,from:0,to:8.2,t:.18,h:2.7},
    /* fondo: ventana sobre la tarja, cancel al patio y ventana del lavado */
    {ax:'x',c:8.2,from:0,to:6,t:.18,h:2.7,open:[
      {from:.5,to:1.9,sill:1.05,head:2.0,kind:'window'},
      {from:2.3,to:3.6,sill:.05,head:2.3,kind:'window'},
      {from:4.5,to:5.3,sill:1.3,head:2.1,kind:'window',grille:true}]},
    /* medio baño */
    {ax:'x',c:3.6,from:0,to:1.5},
    {ax:'z',c:1.5,from:3.6,to:5.0,open:[{from:4.1,to:4.8,head:2.1,kind:'door',hinge:'from',ang:0,color:'#eeece6',mat:6}]},
    /* sala | cocina y lavado */
    {ax:'x',c:5.0,from:0,to:6,open:[{from:1.6,to:3.6,head:2.2,kind:'gap'}]},
    {ax:'z',c:3.8,from:5.0,to:8.2,open:[{from:7.0,to:7.8,head:2.1,kind:'door',hinge:'from',ang:0,color:'#eeece6',mat:6}]}
  ],
  boxes:[
    /* muro gris de la planta baja y planta alta vista desde la calle (se oculta al quitar el techo) */
    /* volumen gris que sobresale con el ventanal de reja (recortado alrededor de la ventana) */
    [1.85,0,-.4,2.6,2.7,-.09,GRIS,{mat:14}],[5.2,0,-.4,5.7,2.7,-.09,GRIS,{mat:14}],
    [2.6,0,-.4,5.2,.9,-.09,GRIS,{mat:14}],[2.6,2.1,-.4,5.2,2.7,-.09,GRIS,{mat:14}],
    [4.95,.25,-.42,5.4,.6,-.4,'#e6e4de',{mat:3}],
    /* pórtico blanco de la entrada: la puerta queda metida */
    [.3,0,-.75,.45,2.7,-.09,EXT,{mat:14}],[1.7,0,-.75,1.85,2.7,-.09,EXT,{mat:14}],[.3,2.3,-.75,1.85,2.7,-.09,EXT,{mat:14}],
    /* volado de la planta alta con plafón gris */
    [.3,2.7,-.75,5.7,2.95,-.09,'#b9b8b3',{mat:14}],
    [-.075,2.7,-.075,6.075,5.4,8.275,EXT,{mat:34}],
    [1.0,3.4,-.09,2.8,4.5,-.075,VID,{mat:10}],[4.2,3.6,-.09,4.9,4.4,-.075,VID,{mat:10}],
    /* patio: muro y casas vecinas */
    [-.09,0,8.2,0,2.3,11.7,'#d9d6cf',{mat:3}],[6,0,8.2,6.09,2.3,11.7,'#d9d6cf',{mat:3}],[-.09,0,11.6,6.09,2.3,11.7,'#d9d6cf',{mat:3}],
    [-6.6,0,0,-.09,5.6,8.2,'#e9e8e4',{mat:11}],[6.09,0,0,12,5.6,8.2,'#e9e8e4',{mat:11}]
  ],
  items:[
    ['wc',.08,4.35,90],['lavabo',.08,3.9,90],
    /* escalera: arranca junto a la ventana del frente y sube hacia la cocina */
    ['escalera',5.5,1.8,0,{w:.9,n:13,huella:.245,alto:2.8,mat:1,color:'#d8d4c8',barandal:-1}],
    /* cocina en L: muebles oscuros, cubierta de granito, estufa y tarja doble bajo la ventana */
    ['barra',.08,6.4,90,{len:2.4,estufa:0,color:OSC,mat:6,cubierta:GRAN,altos:[[-1.0,-.3],[.3,1.0]]}],
    ['barra',1.35,8.12,180,{len:2.2,tarja:0,color:OSC,mat:6,cubierta:GRAN}],
    /* área de lavado */
    ['lavadero',5.3,8.12,180],['boiler',4.3,8.12,0],
    /* sala-comedor */
    ['tv',.08,2.0,90,{w:1.5}],['tapete',1.8,2.0,90,{s:1,w:2.2,d:1.7,color:'#6f6259',color2:'#5f534b'}],['sofa',3.3,2.0,-90,{s:1,w:2.0,color:'#7f8c99',color2:'#93a0ad'}],['mesaCentro',1.8,2.0,90,{s:1}],
    ['mesa',3.0,4.2,0,{s:1,w:.9,d:1.4}],['silla',3.0,3.5,0,{s:1}],['silla',3.0,4.9,180,{s:1}],['silla',2.35,4.2,90,{s:1}],['silla',3.65,4.2,-90,{s:1}],
    ['plafon',3.0,1.2,0],['plafon',3.0,3.6,0],['plafon',1.9,6.6,0],['plafon',5.0,6.6,0]
  ]
};
var alta={
  sky:'#e9eef1', center:[3,0,5.2], frame:'#e8e8e6', tile:.33, gloss:.5, wallOut:EXT, wallMat:14, wallIn:'#f4f3f0', zoclo:'#cfc9bb',
  ground:[[-10,-0.09,-16,17,24,'#d9dcde',0]],
  floors:[[0,0,6,1.8,T],[0,1.8,5.05,5.0,T],[5.95,1.8,6,5.0,T],[0,5.0,6,8.2,T]],
  ceilings:[[0,0,6,8.2]],
  walls:[
    {ax:'x',c:0,from:0,to:6,t:.18,h:2.7,open:[
      {from:1.0,to:2.8,sill:.9,head:2.1,kind:'window',grille:true},
      {from:4.2,to:4.9,sill:1.6,head:2.1,kind:'window',mid:false}]},
    {ax:'z',c:0,from:0,to:8.2,t:.18,h:2.7},
    {ax:'z',c:6,from:0,to:8.2,t:.18,h:2.7},
    {ax:'x',c:8.2,from:0,to:6,t:.18,h:2.7,open:[
      {from:.8,to:2.2,sill:.9,head:2.1,kind:'window'},
      {from:3.9,to:5.3,sill:.9,head:2.1,kind:'window'}]},
    /* recámara principal y su baño */
    {ax:'x',c:3.6,from:0,to:3.6,open:[{from:1.0,to:1.8,head:2.1,kind:'door',hinge:'from',ang:0,color:'#eeece6',mat:6}]},
    {ax:'z',c:3.6,from:0,to:3.6,open:[{from:.6,to:1.4,head:2.1,kind:'door',hinge:'from',ang:0,color:'#eeece6',mat:6}]},
    {ax:'x',c:1.8,from:3.6,to:6},
    /* pasillo y recámaras al fondo */
    {ax:'x',c:5.0,from:0,to:6,open:[
      {from:1.2,to:2.0,head:2.1,kind:'door',hinge:'from',ang:0,color:'#eeece6',mat:6},
      {from:3.3,to:4.1,head:2.1,kind:'door',hinge:'from',ang:0,color:'#eeece6',mat:6}]},
    {ax:'z',c:3.0,from:5.0,to:8.2},
    /* baño compartido, en el pasillo frente a la escalera */
    {ax:'z',c:2.0,from:3.6,to:5.0,open:[{from:3.75,to:4.45,head:2.1,kind:'door',hinge:'from',ang:0,color:'#eeece6',mat:6}]}
  ],
  boxes:[[-6.6,0,0,-.09,3.4,8.2,'#e9e8e4',{mat:11}],[6.09,0,0,12,3.4,8.2,'#e9e8e4',{mat:11}]],
  items:[
    ['hueco',5.5,1.8,0,{w:.9,l:3.2,lados:[-1,1],color:'#d8d4c8'}],
    ['cama',.85,2.2,90,{s:1,w:1.6,manta:'#8f8a6a'}],['buro',.3,1.2,90,{s:1}],['cama',.85,6.6,90,{s:1,w:1.3,manta:'#b9703f'}],['buro',.3,5.7,90,{s:1}],['cama',5.15,6.6,-90,{s:1,w:1.4,manta:'#5f7f8f'}],['buro',5.7,5.7,-90,{s:1}],
    /* baño principal */
    ['regadera',3.68,.08,0,{w:.95,d:.9}],['wc',5.92,1.2,-90],['lavabo',5.92,.65,-90],
    /* baño compartido */
    ['regadera',.55,3.68,0,{w:.9,d:.85}],['wc',1.3,4.92,180],['lavabo',1.7,3.68,0],
    ['plafon',1.8,1.8,0],['plafon',2.4,4.3,0],['plafon',1.5,6.6,0],['plafon',4.5,6.6,0],['plafon',1.0,4.3,0],['plafon',4.8,.9,0]
  ]
};
var stops=[
  {n:'Vista general',d:'Casa de dos niveles: sala-comedor, cocina y lavado abajo; 3 recámaras y 2 baños arriba.',lvl:0,t:[3,.2,5.2],yaw:-.6,pitch:.9,dist:18,fov:.62,f:[],v:{dist:24}},
  {n:'Fachada',d:'Fachada de dos niveles con ventanal de reja, jardín al frente y estacionamiento para 2 autos.',lvl:0,t:[3,1.6,0],yaw:-.5,pitch:.1,dist:11,fov:.72,f:[1]},
  {n:'Sala-comedor',d:'Sala-comedor amplia con loseta; la escalera sube junto al ventanal del frente.',lvl:0,t:[1.2,1.5,.5],yaw:.15,pitch:.2,dist:.01,fov:1.2,f:[2,6]},
  {n:'Cocina',d:'Cocina en L con muebles oscuros, cubierta de granito, estufa y doble tarja.',lvl:0,t:[3.2,1.5,5.3],yaw:-.9,pitch:.3,dist:.01,fov:1.3,f:[3,4]},
  {n:'Área de lavado',d:'Área de lavado techada con lavadero y boiler.',lvl:0,t:[4.1,1.6,5.4],yaw:.4,pitch:.28,dist:.01,fov:1.3,f:[5]},
  {n:'Medio baño',d:'Medio baño para visitas.',lvl:0,t:[1.3,1.6,3.7],yaw:-1.1,pitch:.4,dist:.01,fov:1.45,f:[]},
  {n:'Patio trasero',d:'Patio al fondo, con salida desde la cocina.',lvl:0,t:[3,1.0,10.0],yaw:3.14,pitch:1.0,dist:8.5,fov:.8,f:[]},
  {n:'Planta alta',d:'Recámara principal con baño, dos recámaras más y baño compartido.',lvl:1,t:[3,.2,5.2],yaw:-.6,pitch:.9,dist:18,fov:.62,f:[],v:{dist:24}},
  {n:'Recámara principal',d:'Recámara principal con clóset, ventana a la calle y baño propio.',lvl:1,t:[3.0,1.5,3.25],yaw:3.14,pitch:.22,dist:.01,fov:1.25,f:[]},
  {n:'Baño principal',d:'Baño completo de la recámara principal.',lvl:1,t:[5.1,1.6,1.55],yaw:-2.5,pitch:.42,dist:.01,fov:1.45,f:[]},
  {n:'Recámara 2',d:'Recámara con clóset y ventana al patio.',lvl:1,t:[2.7,1.5,5.3],yaw:-.5,pitch:.22,dist:.01,fov:1.25,f:[]},
  {n:'Recámara 3',d:'Recámara con clóset y ventana al patio.',lvl:1,t:[3.3,1.5,5.3],yaw:.6,pitch:.22,dist:.01,fov:1.3,f:[]}
];
var rooms0=[['Sala-comedor',2.6,2.8],['Escalera',5.5,3.4],['Medio baño',.8,4.3],['Cocina',1.9,6.6],['Lavado',4.9,6.6],['Patio',3.0,10.0],['Estacionamiento',4.3,-3.5]];
var rooms1=[['Recámara principal',1.8,1.8],['Baño',4.8,.9],['Pasillo',3.4,4.3],['Recámara 2',1.5,6.6],['Baño',1.0,4.3],['Recámara 3',4.5,6.6]];
window.TOUR={levels:[{n:'Planta baja',plan:baja,rooms:rooms0},{n:'Planta alta',plan:alta,rooms:rooms1}],stops:stops};
})();
