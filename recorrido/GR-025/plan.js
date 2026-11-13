/* Casa en Fray Junípero Serra (una planta). Plano deducido de las fotos; medidas aproximadas. */
(function(){
// fotos: casa de estuco blanco, loseta beige chica muy brillante, patio del frente con piso de barro decorado y barda con
// piedra beige, cocina de obra con tarja de acero, baño con muros tipo mármol, patio trasero con muros de block
var T='#dcd3c6';

/* Metros. x = ancho (0 = muro del vecino), z = fondo (0 = frente a la calle). */
var plan={
  sky:'#e9eef1', tile:.33, gloss:.7, wallOut:'#efeeea', wallMat:14, wallIn:'#f1efeb', zoclo:'#d2c8ba',
  ground:[
    [-10,-0.09,-10,17,18,'#8fae6b',2],
    [-10,-0.06,-10,17,-2.7,'#7b7d80',0],
    [-10,-0.03,-2.7,17,0.0,'#cfccc5',3],
    [0,-0.015,0,5,2.6,'#b49784',1],
    [0,-0.015,9.6,5,12,'#c6c3bc',3]
  ],
  floors:[
    [0,2.6,5,5.4,T],[0,5.4,2.2,7.6,T],[0,7.6,2.2,9.6,'#e4e2dc'],
    [2.2,5.4,3,9.6,T],[3,5.4,5,7.5,T],[3,7.5,5,9.6,T]
  ],
  ceilings:[[0,2.6,5,5.4],[0,5.4,2.2,7.6],[0,7.6,2.2,9.6],[2.2,5.4,3,9.6],[3,5.4,5,7.5],[3,7.5,5,9.6]],
  walls:[
    // exteriores
    {ax:'x',c:2.6,from:0,to:5,t:.15,h:2.7,out:-1,open:[
      {from:.9,to:1.8,head:2.1,kind:'door',hinge:'from',ang:-1.35},
      {from:3.0,to:4.3,sill:.95,head:2.1,kind:'window',grille:true}]},
    {ax:'z',c:0,from:2.6,to:9.6,t:.15,h:2.7},
    {ax:'z',c:5,from:2.6,to:9.6,t:.15,h:2.7,out:1,open:[
      {from:6.0,to:7.0,sill:.95,head:2.1,kind:'window'},
      {from:8.3,to:9.3,sill:.95,head:2.1,kind:'window'}]},
    {ax:'x',c:9.6,from:0,to:5,t:.15,h:2.7,out:1,open:[
      {from:2.3,to:2.9,head:2.1,kind:'door',hinge:'from',ang:1.3},
      {from:.5,to:1.2,sill:1.3,head:2.0,kind:'window'}]},
    // interiores
    {ax:'z',c:2.2,from:5.4,to:7.6,open:[{from:5.7,to:7.0,head:2.1,kind:'gap'}]},
    {ax:'z',c:2.2,from:7.6,to:9.6,open:[{from:8.0,to:8.8,head:2.1,kind:'door',hinge:'from',ang:-1.3}]},
    {ax:'x',c:7.6,from:0,to:2.2},
    {ax:'z',c:3,from:5.4,to:9.6,open:[
      {from:5.7,to:6.5,head:2.1,kind:'door',hinge:'from',ang:1.35},
      {from:8.1,to:8.9,head:2.1,kind:'door',hinge:'from',ang:1.35}]},
    {ax:'x',c:7.5,from:3,to:5},
    // bardas
    {ax:'x',c:0,from:0,to:5,h:1.1,color:'#cdb391',mat:12},
    {ax:'z',c:0,from:0,to:2.6,h:2.2,color:'#d9d6cf'},
    {ax:'z',c:5,from:0,to:2.6,h:2.2,color:'#d9d6cf'},
    {ax:'x',c:12,from:0,to:5,h:2.2,color:'#c9c7c1',mat:12},
    {ax:'z',c:0,from:9.6,to:12,h:2.2,color:'#c9c7c1',mat:12},
    {ax:'z',c:5,from:9.6,to:12,h:2.2,color:'#c9c7c1',mat:12}
  ],
  boxes:[
    [-3.2,0,2.6,-.09,2.7,9.6,'#e6e8e7',{top:'#c9ccca'}]
  ],
  items:[
    ['barra',.08,6.6,90,{len:2.0,estufa:.05,tarja:-.7,color:'#eceae4',mat:17,cubierta:'#dcdad4',copete:false}],
    ['regadera',.08,7.68,0,{w:.8,d:1.9}],['wc',1.3,7.68,0],['lavabo',1.85,7.68,0],
    ['lavadero',.75,11.93,180],['boiler',4.0,9.68,0],
    ['plafon',2.5,4.0,0],['plafon',1.1,6.5,0],['plafon',1.1,8.6,0],['plafon',4.0,6.4,0],['plafon',4.0,8.5,0],
    ['tapete',3.3,3.9,0,{s:1,w:2.3,d:1.5}],['sofa',3.3,5.2,180,{s:1,w:2.0}],
    ['mesa',1.0,4.0,0,{s:1,w:.75,d:.75}],['silla',1.0,3.4,0,{s:1}],['silla',1.0,4.6,180,{s:1}],
    ['cama',4.2,6.4,-90,{s:1,w:1.4,manta:'#b9703f'}],['buro',4.8,5.6,-90,{s:1}],
    ['cama',4.2,8.5,-90,{s:1,w:1.4,color:'#cfd8dc',manta:'#5f7f8f'}],['buro',4.8,9.3,-90,{s:1,lampara:false}]
  ]
};

var stops=[
  {n:'Vista general',d:'Casa de una planta con 3 recámaras y 1 baño, a pie de calle.',t:[2.5,.2,6.0],yaw:-.6,pitch:.9,dist:18.5,fov:.62,f:[],v:{dist:25}},
  {n:'Fachada',d:'Patio al frente con escalones y acabado en piedra.',t:[2.5,1.25,1.8],yaw:-.6,pitch:.1,dist:9.5,fov:.72,f:[1,2,3]},
  {n:'Sala-comedor',d:'Espacio amplio y luminoso, recién remodelado.',t:[2.5,1.5,3.0],yaw:0,pitch:.2,dist:.01,fov:1.08,f:[4]},
  {n:'Pasillo',d:'Pasillo que comunica recámaras y baño.',t:[2.6,1.5,9.35],yaw:3.14,pitch:.12,dist:.01,fov:1.1,f:[5,15]},
  {n:'Cocina',d:'Cocina con tarja y barra; salida al patio.',t:[1.8,1.55,5.6],yaw:-1.9,pitch:.3,dist:.01,fov:1.15,f:[8,6,9]},
  {n:'Baño',d:'Baño completo con regadera en acabado tipo mármol.',t:[2.0,1.6,9.4],yaw:-2.6,pitch:.5,dist:.01,fov:1.35,f:[13,14]},
  {n:'Recámara 1',d:'Recámara con ventana.',t:[3.3,1.5,5.65],yaw:1.1,pitch:.26,dist:.01,fov:1.15,f:[7,17]},
  {n:'Recámara 2',d:'Recámara con ventana y piso cerámico.',t:[3.3,1.5,7.6],yaw:.96,pitch:.26,dist:.01,fov:1.15,f:[16]},
  {n:'Patio de servicio',d:'Patio al fondo con lavadero y espacio para lavadora.',t:[4.6,1.5,9.9],yaw:-1.07,pitch:.2,dist:.01,fov:1.08,f:[10,11,12]}
];
var rooms=[['Sala-comedor',2.5,4.0],['Cocina',1.1,6.5],['Baño',1.1,8.6],['Recámara 1',4.0,6.4],['Recámara 2',4.0,8.5],['Patio',2.5,10.8]];

window.TOUR={levels:[{n:'Casa',plan:plan,rooms:rooms}],stops:stops};
})();
