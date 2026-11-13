/* Casa en Condominio Ciprés, San Isidro Juriquilla (dos niveles con terraza). No hay plano: la distribución
   se armó a partir de las fotos y de la ficha (128 m² de terreno, 116 m² de construcción); medidas aproximadas.
   Metros. x = ancho visto desde la calle, z = fondo. La calle queda en z negativo. */
(function(){
// fotos: casa blanca de estuco, porcelanato blanco tipo mármol con vetas grises en toda la casa (también terraza),
// cocina de madera gris claro con granito gris, puertas y clósets de nogal oscuro, baño principal con cubierta flotante
// oscura y lavabos de sobreponer
var T='#ecebe8', DARK='#4b2a22', MAD='#6e3524', CAB='#c6b8a4', GRAN='#8f8e8a', CLO='#4a413c', EXT='#f1f0ed', VID='#2b3540';
var baja={
  sky:'#e9eef1', center:[3.75,0,4.7], frame:'#1f2124', tile:.6, gloss:.8, marble:1, wallOut:EXT, wallMat:14, wallIn:'#f5f4f1', zoclo:'#dddcd8',
  ground:[
    [-10,-0.09,-14,17.5,22,'#9fae7f',2],
    [-10,-0.06,-14,17.5,-6.7,'#7b7d80',0],
    [-10,-0.03,-6.7,17.5,-5.3,'#cfccc5',3],
    /* cochera: franjas de concreto y piedra negra, como en la foto */
    [0,-0.04,-5.3,7.5,0,'#3f3d3c',0],
    [.0,-0.02,-5.3,.55,0,'#dedbd3',3],[1.45,-0.02,-5.3,2.2,0,'#dedbd3',3],[3.1,-0.02,-5.3,3.85,0,'#dedbd3',3],
    [4.75,-0.02,-5.3,5.5,0,'#dedbd3',3],[6.4,-0.02,-5.3,7.15,0,'#dedbd3',3],
    /* patio trasero: andador de concreto y piedra */
    [0,-0.04,9.4,7.5,11.0,'#4a4744',0],[0,-0.02,9.4,7.5,10.0,'#dedbd3',3]
  ],
  floors:[[0,0,7.5,9.4,T]],
  ceilings:[[0,0,7.5,9.4]],
  walls:[
    /* fachada: ventanita del medio baño, ventana, puerta de madera y cancel corredizo */
    {ax:'x',c:0,from:0,to:7.5,t:.15,h:2.7,open:[
      {from:.75,to:1.35,sill:1.7,head:2.05,kind:'window',mid:false},
      {from:2.35,to:3.25,sill:.9,head:2.15,kind:'window',mid:false},
      {from:3.85,to:4.8,head:2.3,kind:'door',hinge:'to',ang:0,color:MAD,mat:6},
      {from:5.5,to:7.1,sill:.05,head:2.3,kind:'window'}]},
    {ax:'z',c:0,from:0,to:9.4,t:.15,h:2.7},
    {ax:'z',c:7.5,from:0,to:9.4,t:.15,h:2.7},
    /* fondo: ventana de la cocina y cancel de la recámara al patio */
    {ax:'x',c:9.4,from:0,to:7.5,t:.15,h:2.7,open:[
      {from:.45,to:2.05,sill:.95,head:2.1,kind:'window'},
      {from:4.6,to:6.6,sill:.05,head:2.3,kind:'window'}]},
    /* medio baño (frente, en la torre de la escalera) */
    {ax:'x',c:1.6,from:0,to:2.0,h:2.7},
    {ax:'z',c:2.0,from:0,to:1.6,h:2.7,open:[{from:.55,to:1.3,head:2.1,kind:'door',hinge:'from',ang:-80,color:DARK}]},
    /* escalera y baño completo debajo de ella */
    {ax:'z',c:2.0,from:1.6,to:4.3,h:2.7},
    {ax:'z',c:3.2,from:1.6,to:4.3,h:2.7},
    {ax:'x',c:1.6,from:2.0,to:3.2,h:2.7},
    {ax:'x',c:4.3,from:0,to:3.2,h:2.7,open:[{from:1.0,to:1.95,head:2.2,kind:'gap'},{from:2.25,to:3.0,head:2.1,kind:'door',hinge:'to',ang:35,color:DARK}]},
    /* recámara de planta baja */
    {ax:'x',c:6.2,from:3.6,to:7.5,h:2.7,open:[{from:3.75,to:4.5,head:2.1,kind:'door',hinge:'from',ang:0,color:DARK}]},
    {ax:'z',c:3.6,from:6.2,to:9.4,h:2.7}
  ],
  boxes:[
    /* planta alta vista desde la calle (se oculta al quitar el techo) */
    [-.075,2.7,-.075,2.9,5.6,7.675,EXT,{mat:34}],
    [2.9,2.7,1.4,7.575,5.6,7.675,EXT,{mat:34}],
    [-.075,5.6,-.075,2.0,6.5,4.3,EXT,{mat:34}],
    [2.9,2.7,-.075,7.575,3.7,.075,EXT,{mat:34}],
    [2.9,5.35,-.075,7.575,5.6,1.4,EXT,{mat:34}],[7.4,3.7,-.075,7.575,5.35,1.4,EXT,{mat:34}],
    [4.0,2.8,1.38,6.8,5.0,1.4,VID,{mat:10}],
    [.7,4.4,-.09,1.3,4.85,-.075,VID,{mat:10}],[.7,6.0,-.09,1.5,6.25,-.075,VID,{mat:10}],
    [-.075,2.6,7.675,7.575,2.72,9.475,EXT,{mat:34}],
    [-.075,2.7,9.3,7.575,3.7,9.475,EXT,{mat:34}],[-.075,2.7,7.675,.075,3.7,9.3,EXT,{mat:34}],[7.425,2.7,7.675,7.575,3.7,9.3,EXT,{mat:34}],
    /* descanso de la escalera */
    [.0,1.2,1.6,2.0,1.35,2.5,'#e1e0dc',{mat:1}],
    /* bardas de la cochera y del patio; casas vecinas */
    [-.075,0,-5.3,.1,1.0,0,'#ecebe6'],[7.4,0,-5.3,7.575,1.0,0,'#ecebe6'],
    [-.075,0,11.0,7.575,3.4,11.15,'#ecebe6'],
    [-6.6,0,0,-.08,5.6,11.0,'#e9e8e4',{mat:11}],[7.58,0,0,14,5.6,11.0,'#e9e8e4',{mat:11}]
  ],
  items:[
    /* medio baño */
    ['wc',.6,.08,0],['lavabo',1.65,1.52,180],
    /* escalera en U: arranca junto a la cocina, descansa al frente y regresa */
    ['escalera',1.5,4.25,180,{w:.9,n:7,huella:.25,alto:1.35,mat:1,color:'#e1e0dc'}],
    ['escalera',.5,2.5,0,{w:.9,n:7,huella:.25,alto:1.35,y0:1.35,mat:1,color:'#e1e0dc'}],
    /* baño completo de planta baja */
    ['regadera',2.08,1.68,0,{w:1.05,d:1.0}],['wc',3.12,2.9,-90],['lavabo',3.12,3.75,-90],
    /* sala */
    ['tv',3.35,2.6,90,{w:1.6}],
    ['tapete',5.3,2.4,90,{s:1,w:2.4,d:1.9,color:'#6f6259',color2:'#5f534b'}],
    ['sofa',7.0,2.4,-90,{s:1,w:2.2,color:'#7f8c99',color2:'#93a0ad'}],['mesaCentro',5.5,2.4,90,{s:1}],
    ['planta',3.5,.4,0,{s:1}],
    /* comedor */
    ['mesa',5.4,5.25,90,{s:1,w:1.0,d:1.8}],
    ['silla',5.0,4.5,0,{s:1}],['silla',5.8,4.5,0,{s:1}],['silla',5.0,6.0,180,{s:1}],['silla',5.8,6.0,180,{s:1}],['silla',4.25,5.25,90,{s:1}],['silla',6.55,5.25,-90,{s:1}],
    /* cocina: barra en L con tarja bajo la ventana, estufa e isla con cubierta de granito */
    ['barra',1.35,9.32,180,{len:2.5,tarja:.1,color:CAB,mat:6,cubierta:GRAN,altos:[[-1.25,-.75]]}],
    ['barra',.08,7.65,90,{len:1.9,estufa:0,horno:1,color:CAB,mat:6,cubierta:GRAN,altos:[[-.95,-.35],[.35,.95]]}],
    ['barra',2.15,7.4,90,{len:1.4,copete:false,color:CAB,mat:6,cubierta:GRAN}],
    ['refri',.08,6.35,90],
    ['silla',3.1,7.1,-90,{s:1}],['silla',3.1,7.75,-90,{s:1}],
    /* recámara de planta baja, con clóset y salida al patio */
    ['closetM',7.42,7.6,-90,{w:2.2,color:CLO}],
    ['cama',5.4,7.25,0,{s:1,w:1.5,manta:'#8f8a6a'}],
    /* patio: zona de lavado */
    ['lavadero',.5,10.95,180],['lavadora',1.45,10.95,180],['planta',6.6,10.6,0],
    ['plafon',5.0,2.4,0],['plafon',3.0,.8,0],['plafon',5.4,5.25,0],['plafon',1.6,7.8,0],['plafon',5.5,7.8,0],['plafon',1.0,.8,0],['plafon',2.6,3.0,0]
  ]
};
var alta={
  sky:'#e9eef1', center:[3.75,0,4.7], frame:'#1f2124', tile:.6, gloss:.8, marble:1, wallOut:EXT, wallMat:14, wallIn:'#f5f4f1', zoclo:'#dddcd8',
  ground:[[-10,-0.09,-14,17.5,22,'#d9dcde',0]],
  floors:[[0,0,2.9,5.1,T],[2.9,1.4,7.5,4.3,T],[4.4,4.3,7.5,7.6,T],[0,5.1,4.4,7.6,T],[2.9,4.3,4.4,5.1,T],
          [2.9,0,7.5,1.4,T],[0,7.6,7.5,9.4,T]],
  ceilings:[[0,0,2.9,7.6],[2.9,1.4,7.5,7.6]],
  walls:[
    /* fachada: torre con ventanita y balcón con pretil */
    {ax:'x',c:0,from:0,to:2.9,t:.15,h:2.7,open:[{from:.7,to:1.3,sill:1.6,head:2.1,kind:'window',mid:false}]},
    {ax:'x',c:0,from:2.9,to:7.5,t:.15,h:1.0,color:EXT},
    {ax:'z',c:2.9,from:0,to:1.4,t:.15,h:2.7},
    {ax:'x',c:1.4,from:2.9,to:7.5,t:.15,h:2.7,open:[{from:4.0,to:6.8,sill:.05,head:2.3,kind:'window'}]},
    {ax:'z',c:0,from:0,to:7.6,t:.15,h:2.7},
    {ax:'z',c:7.5,from:0,to:7.6,t:.15,h:2.7},
    /* fondo: cancel de la recámara 2 y puerta a la terraza */
    {ax:'x',c:7.6,from:0,to:7.5,t:.15,h:2.7,open:[
      {from:2.0,to:3.6,sill:.05,head:2.3,kind:'window'},
      {from:3.7,to:4.3,sill:.95,head:2.1,kind:'window',mid:false}]},
    /* pretiles de la terraza */
    {ax:'z',c:0,from:7.6,to:9.4,t:.15,h:1.0,color:EXT},
    {ax:'z',c:7.5,from:7.6,to:9.4,t:.15,h:1.0,color:EXT},
    {ax:'x',c:9.4,from:0,to:7.5,t:.15,h:1.0,color:EXT},
    /* recámara principal: puerta al pasillo; vestidor y baño al fondo */
    {ax:'z',c:2.9,from:1.4,to:5.1,open:[{from:3.25,to:4.05,head:2.1,kind:'door',hinge:'to',ang:70,color:DARK}]},
    {ax:'x',c:4.3,from:2.9,to:7.5,open:[{from:5.5,to:6.3,head:2.1,kind:'gap'}]},
    {ax:'z',c:4.4,from:4.3,to:7.6},
    {ax:'x',c:5.8,from:4.4,to:7.5,open:[{from:5.5,to:6.3,head:2.1,kind:'gap'}]},
    /* baño compartido y recámara 2 */
    {ax:'x',c:5.1,from:0,to:2.9,open:[{from:.35,to:1.05,head:2.1,kind:'door',hinge:'from',ang:-60,color:DARK},{from:1.85,to:2.65,head:2.1,kind:'door',hinge:'to',ang:60,color:DARK}]},
    {ax:'z',c:1.5,from:5.1,to:7.6}
  ],
  boxes:[
    /* credenza flotante de la recámara principal */
    [3.6,.42,3.85,5.3,.72,4.24,'#4a3f39',{mat:6}]
  ],
  items:[
    ['hueco',1.0,1.6,0,{w:1.95,l:2.65,lados:[1],color:'#e1e0dc'}],
    /* baño compartido */
    ['regadera',.08,6.55,0,{w:1.3,d:.98}],['wc',1.42,6.1,-90],['lavabo',.08,5.9,90],
    /* recámara 2 */
    ['closetM',3.65,4.38,0,{w:1.4,color:CLO}],
    ['cama',3.28,6.55,-90,{s:1,w:1.4,manta:'#8f8a6a'}],['buro',3.95,5.6,-90,{s:1}],
    /* recámara principal */
    ['cama',6.4,2.75,-90,{s:1,w:1.8,manta:'#b9703f',cabecera:'#8c7b68'}],['buro',7.2,1.65,-90,{s:1}],['buro',7.2,3.9,-90,{s:1,lampara:false}],
    ['tv',3.0,2.75,90,{s:1,w:1.2}],
    /* vestidor */
    ['closetM',4.48,5.05,90,{w:1.4,color:CLO}],['closetM',7.42,5.05,-90,{w:1.4,color:CLO}],
    /* baño principal: doble lavabo y regadera */
    ['tocadorF',6.45,7.52,180,{w:1.7,n:2,color:'#3a3a3c',cubierta:'#3a3a3c'}],
    ['regadera',4.48,5.88,0,{w:1.1,d:1.65}],['wc',7.42,6.25,-90],
    /* balcón y terraza */
    ['planta',3.3,.45,0,{s:1}],['planta',7.1,.45,0,{s:1}],
    ['mesa',5.5,8.5,0,{s:1,w:.8,d:.8}],['silla',5.0,8.5,90,{s:1}],['silla',6.0,8.5,-90,{s:1}],
    ['planta',.4,9.0,0,{s:1}],['planta',7.1,9.0,0,{s:1}],
    ['plafon',1.2,.8,0],['plafon',5.2,2.75,0],['plafon',3.0,6.3,0],['plafon',.75,6.3,0],['plafon',5.95,5.05,0],['plafon',5.95,6.7,0],['plafon',2.45,3.0,0]
  ]
};
// azulejo pizarra en la regadera del baño principal, como en las fotos
alta.boxes=(alta.boxes||[]).concat([[4.47,.03,5.9,4.49,2.45,7.5,'#45474b',{mat:17}],[4.49,.03,7.49,5.6,2.45,7.51,'#45474b',{mat:17}]]);
var stops=[
  {n:'Planta baja',d:'Sala, comedor, cocina con isla, medio baño, baño completo y una recámara con salida al patio.',lvl:0,t:[3.75,.2,4.7],yaw:-.6,pitch:.9,dist:19,fov:.62,f:[],v:{dist:26}},
  {n:'Fachada',d:'Casa de dos niveles con balcón y cochera para 2 autos.',lvl:0,t:[3.75,2.6,0],yaw:-.45,pitch:.06,dist:17,fov:.75,f:[1,2],v:{dist:21}},
  {n:'Sala',d:'Sala con cancel al frente y mucha luz natural.',lvl:0,t:[3.6,1.55,.6],yaw:.75,pitch:.18,dist:.01,fov:1.3,f:[]},
  {n:'Cocina',d:'Cocina equipada con isla y cubierta de granito.',lvl:0,t:[3.4,1.6,5.4],yaw:-.55,pitch:.3,dist:.01,fov:1.3,f:[3,4]},
  {n:'Escalera',d:'Escalera con tragaluz; al lado, el baño completo de planta baja.',lvl:0,t:[2.3,1.6,6.6],yaw:3.3,pitch:.12,dist:.01,fov:1.2,f:[10,11]},
  {n:'Baño de planta baja',d:'Baño completo bajo la escalera, con tragaluz.',lvl:0,t:[2.6,1.65,4.15],yaw:3.14,pitch:.38,dist:.01,fov:1.5,f:[22,23]},
  {n:'Medio baño',d:'Medio baño para visitas.',lvl:0,t:[1.9,1.6,1.45],yaw:-2.3,pitch:.4,dist:.01,fov:1.45,f:[24,25]},
  {n:'Recámara planta baja',d:'Recámara con clóset y cancel al patio.',lvl:0,t:[4.0,1.55,6.45],yaw:.85,pitch:.25,dist:.01,fov:1.25,f:[12]},
  {n:'Patio',d:'Patio trasero con zona de lavado.',lvl:0,t:[3.75,1.0,10.3],yaw:-.2,pitch:.55,dist:8,fov:.8,f:[26]},
  {n:'Planta alta',d:'Recámara principal con balcón, vestidor y baño; recámara 2, baño compartido y terraza.',lvl:1,t:[3.75,.2,4.7],yaw:-.6,pitch:.9,dist:19,fov:.62,f:[],v:{dist:26}},
  {n:'Recámara principal',d:'Recámara principal con balcón al frente y credenza.',lvl:1,t:[3.3,1.55,3.9],yaw:2.35,pitch:.2,dist:.01,fov:1.25,f:[5,6,7]},
  {n:'Vestidor',d:'Vestidor con dos muebles, entre la recámara y el baño.',lvl:1,t:[5.9,1.6,3.5],yaw:0,pitch:.22,dist:.01,fov:1.3,f:[16,17,20]},
  {n:'Baño principal',d:'Baño con doble lavabo, regadera amplia y tragaluz.',lvl:1,t:[6.9,1.6,5.75],yaw:-.5,pitch:.35,dist:.01,fov:1.35,f:[18,19]},
  {n:'Recámara 2',d:'Recámara con clóset y salida a la terraza.',lvl:1,t:[2.0,1.55,5.45],yaw:.8,pitch:.2,dist:.01,fov:1.25,f:[13,14,15]},
  {n:'Baño compartido',d:'Baño completo para la recámara 2.',lvl:1,t:[.75,1.6,4.6],yaw:.15,pitch:.4,dist:.01,fov:1.35,f:[21]},
  {n:'Terraza',d:'Terraza en planta alta, con vista al desarrollo.',lvl:1,t:[3.75,.8,8.5],yaw:3.0,pitch:.5,dist:9,fov:.8,f:[8,9,27]}
];
window.TOUR={levels:[
  {n:'Planta baja',plan:baja,rooms:[['Medio baño',1.0,.8],['Escalera',1.0,3.0],['Baño',2.6,2.9],['Sala',5.4,2.0],['Comedor',5.4,5.25],['Cocina',1.6,7.6],['Recámara',5.5,7.8],['Patio',3.75,10.4],['Cochera',3.75,-2.6]]},
  {n:'Planta alta',plan:alta,rooms:[['Escalera',1.0,3.0],['Balcón',5.2,.7],['Recámara principal',5.2,2.75],['Vestidor',5.9,5.05],['Baño',5.95,6.7],['Baño',.75,6.3],['Recámara 2',3.0,6.3],['Terraza',3.75,8.5]]}
],stops:stops};
})();
