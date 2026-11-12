/* Departamento Colibrí 10 (56.25 m²). Plano tomado de la ficha del modelo; medidas aproximadas.
   Metros. x = ancho, z = fondo desde el acceso. */
(function(){
var T='#e4dfd5', DOOR='#a67c52', WOODC='#c9a97c';
var plan={
  sky:'#e9eef1', center:[4.7,0,3.2], frame:'#34363a',
  ground:[
    [-9,-0.09,-9,19,16,'#d9dcde',0],
    [-3.2,-0.06,-1.2,1.28,3.0,'#8fae6b',2]
  ],
  floors:[
    [1.35,0,9.35,3.0,T],[5.9,3.0,7.36,3.86,T],[7.36,3.0,9.35,4.24,T],
    [0,3.0,2.95,6.44,T],[2.95,3.0,5.9,6.44,T],[5.9,3.86,7.36,6.44,'#e6e4de'],[7.36,4.24,9.35,6.44,'#dcd9d2']
  ],
  ceilings:[[1.35,0,9.35,3.0],[5.9,3.0,7.36,3.86],[7.36,3.0,9.35,4.24],[0,3.0,2.95,6.44],[2.95,3.0,5.9,6.44],[5.9,3.86,7.36,6.44],[7.36,4.24,9.35,6.44]],
  walls:[
    {ax:'x',c:0,from:1.35,to:9.35,t:.15,h:2.7,open:[{from:6.1,to:7.0,head:2.1,kind:'door',hinge:'to',ang:0,color:DOOR}]},
    {ax:'z',c:1.35,from:0,to:3.0,t:.15,h:2.7,open:[{from:.55,to:2.45,sill:.05,head:2.2,kind:'window'}]},
    {ax:'x',c:3.0,from:0,to:5.9,t:.15,h:2.7,open:[
      {from:1.5,to:2.3,head:2.1,kind:'gap'},
      {from:3.85,to:4.65,head:2.1,kind:'gap'}]},
    {ax:'z',c:0,from:3.0,to:6.44,t:.15,h:2.7,open:[{from:4.5,to:5.8,sill:.95,head:2.1,kind:'window'}]},
    {ax:'x',c:6.44,from:0,to:9.35,t:.15,h:2.7,open:[
      {from:3.9,to:5.2,sill:.95,head:2.1,kind:'window'},
      {from:6.35,to:6.95,sill:1.6,head:2.1,kind:'window',mid:false},
      {from:7.9,to:9.0,sill:1.1,head:2.1,kind:'window'}]},
    {ax:'z',c:9.35,from:0,to:6.44,t:.15,h:2.7,open:[
      {from:2.7,to:3.8,sill:1.15,head:2.1,kind:'window'},
      {from:4.8,to:5.9,sill:1.15,head:2.1,kind:'window'}]},
    {ax:'z',c:2.95,from:3.0,to:6.44},
    {ax:'z',c:5.9,from:3.0,to:6.44},
    {ax:'x',c:3.86,from:5.9,to:7.36,open:[{from:6.25,to:7.0,head:2.1,kind:'gap'}]},
    {ax:'z',c:7.36,from:3.86,to:6.44},
    {ax:'x',c:4.24,from:7.36,to:9.35,open:[{from:7.5,to:8.25,head:2.1,kind:'gap'}]}
  ],
  boxes:[],
  items:[
    // cocina integral y barra, como en las fotos
    ['barra',9.27,2.0,-90,{len:3.5,estufa:-.6,tarja:.75,altos:[[-1.7,-1.0],[-.2,.4]],color:WOODC,cubierta:'#e9e7e2'}],
    ['barra',7.3,1.25,90,{len:1.8,copete:false,color:WOODC,cubierta:'#e9e7e2'}],
    ['refri',7.86,4.14,180,{s:1}],
    ['regadera',5.98,6.36,90,{w:.9,d:1.3}],['wc',5.97,4.85,90],['lavabo',7.29,4.55,-90],
    ['lavadero',8.8,6.36,180],
    ['plafon',3.2,1.5,0],['plafon',5.6,1.5,0],['plafon',8.4,2.0,0],['plafon',1.5,4.8,0],['plafon',4.4,4.8,0],['plafon',6.6,5.1,0],['plafon',8.4,5.3,0],
    // sugeridos
    ['lavadora',7.85,6.36,180,{s:1}],
    ['tapete',3.0,1.45,0,{s:1,w:2.2,d:1.5,color:'#b9b4ab',color2:'#a6a199'}],['sofa',3.0,.55,0,{s:1,w:1.9,color:'#8a8d91',color2:'#9b9ea2'}],['mesaCentro',3.0,1.6,0,{s:1}],
    ['tv',3.08,2.92,180,{s:1,w:1.3}],['planta',1.75,2.65,0,{s:1}],
    ['mesa',5.35,1.55,0,{s:1,w:.95,d:.95}],['silla',5.35,.9,0,{s:1}],['silla',5.35,2.2,180,{s:1}],['silla',4.7,1.55,90,{s:1}],['silla',6.0,1.55,-90,{s:1}],
    ['silla',7.0,.85,90,{s:1}],['silla',7.0,1.65,90,{s:1}],
    ['cama',1.12,4.15,90,{s:1,w:.95,manta:'#c9b18f'}],['cama',1.12,5.8,90,{s:1,w:.95,manta:'#c9b18f'}],['buro',.32,4.98,90,{s:1}],
    ['closet',2.87,4.25,-90,{s:1,w:1.5}],
    ['cama',4.05,4.75,90,{s:1,w:1.5,manta:'#6f8794'}],['buro',3.25,3.75,90,{s:1}],['buro',3.25,5.75,90,{s:1,lampara:false}],
    ['closet',5.82,4.15,-90,{s:1,w:1.5}]
  ]
};
var stops=[
  {n:'Vista general',d:'Departamento de 56.25 m² con 2 recámaras, 1 baño y área de servicio.',t:[4.7,.2,3.2],yaw:.55,pitch:.95,dist:21,fov:.62,f:[],v:{dist:27}},
  {n:'Sala',d:'Sala con ventanal corredizo hacia el jardín.',t:[6.2,1.55,2.5],yaw:-1.9,pitch:.2,dist:.01,fov:1.15,f:[2,1]},
  {n:'Comedor',d:'Comedor junto a la barra de la cocina.',t:[1.9,1.55,.45],yaw:1.3,pitch:.2,dist:.01,fov:1.15,f:[1]},
  {n:'Cocina',d:'Cocina integral con barra desayunadora.',t:[6.5,1.55,2.75],yaw:1.95,pitch:.3,dist:.01,fov:1.2,f:[3]},
  {n:'Recámara 1',d:'Recámara con ventana y espacio para dos camas individuales.',t:[2.55,1.55,6.05],yaw:-2.25,pitch:.3,dist:.01,fov:1.2,f:[]},
  {n:'Recámara 2',d:'Recámara principal con ventana al fondo.',t:[5.5,1.55,6.05],yaw:-2.25,pitch:.3,dist:.01,fov:1.2,f:[]},
  {n:'Baño',d:'Baño completo con regadera.',t:[6.62,1.6,3.3],yaw:0,pitch:.5,dist:.01,fov:1.15,f:[]},
  {n:'Área de servicio',d:'Cuarto de lavado con lavadero y ventilación.',t:[7.62,1.55,4.5],yaw:.55,pitch:.35,dist:.01,fov:1.25,f:[4,5]}
];
var rooms=[['Sala',3.0,1.5],['Comedor',5.4,1.5],['Cocina',8.4,2.0],['Recámara 1',1.5,4.8],['Recámara 2',4.4,4.8],['Baño',6.6,5.2],['Servicio',8.4,5.4]];
window.TOUR={levels:[{n:'Departamento',plan:plan,rooms:rooms}],stops:stops};
})();
