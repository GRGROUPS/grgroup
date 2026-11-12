/* Casa en Las Teresas (una planta, terreno de 105 m²). Plano deducido de las fotos; medidas aproximadas.
   Metros. x = ancho visto desde la calle, z = fondo. */
(function(){
var T='#e2d6c2', FACH='#ead9bd', IRON='#2f3a36', CAB='#4d3d35';
var boxes=[[.2,.95,5.0,1.4,1.0,5.42,'#d9cfc4',{mat:8}]], i;
for(i=0;i<=46;i++) boxes.push([i*.152-.015,0,-3.62,i*.152+.015,1.6,-3.59,'#2b2b2b']);   // reja del frente
boxes.push([0,1.56,-3.63,7,1.6,-3.58,'#2b2b2b'],[0,.1,-3.63,7,.14,-3.58,'#2b2b2b']);
var plan={
  sky:'#e9eef1', center:[3.5,0,5],
  ground:[
    [-10,-0.09,-13,17,22,'#9aa07a',2],
    [-10,-0.06,-13,17,-5.2,'#7b7d80',0],
    [-10,-0.03,-5.2,17,-3.7,'#cfccc5',3],
    [0,-0.02,-3.7,7,0,'#c9c4b8',3],
    [0,-0.015,8.4,2.6,11.6,'#bdb9af',3]
  ],
  floors:[[0,0,4.0,5.2,T,1],[4.0,0,7.0,3.3,T],[4.0,3.3,7.0,5.2,'#e6e2da'],[0,5.2,2.6,8.4,T],[2.6,5.2,3.5,8.4,T],[3.5,5.2,7.0,8.4,T],[2.6,8.4,7.0,11.6,T]],
  ceilings:[[0,0,4.0,5.2],[4.0,0,7.0,3.3],[4.0,3.3,7.0,5.2],[0,5.2,2.6,8.4],[2.6,5.2,3.5,8.4],[3.5,5.2,7.0,8.4],[2.6,8.4,7.0,11.6]],
  walls:[
    {ax:'x',c:0,from:0,to:7,t:.15,h:2.7,out:-1,color:FACH,open:[
      {from:.7,to:2.3,sill:.9,head:2.1,kind:'window',grille:true},
      {from:3.0,to:3.9,head:2.1,kind:'door',hinge:'to',ang:0,color:IRON},
      {from:4.7,to:6.3,sill:.9,head:2.1,kind:'window',grille:true}]},
    {ax:'z',c:0,from:0,to:8.4,t:.15,h:2.7},
    {ax:'z',c:7,from:0,to:11.6,t:.15,h:2.7,open:[{from:6.2,to:7.4,sill:.95,head:2.1,kind:'window'}]},
    {ax:'x',c:11.6,from:2.6,to:7,t:.15,h:2.7,open:[{from:4.0,to:5.6,sill:.95,head:2.1,kind:'window'}]},
    {ax:'z',c:2.6,from:8.4,to:11.6,t:.15,h:2.7,open:[{from:9.4,to:10.6,sill:.95,head:2.1,kind:'window'}]},
    {ax:'x',c:8.4,from:0,to:2.6,t:.15,h:2.7,open:[
      {from:.75,to:1.4,sill:1.1,head:2.1,kind:'window',mid:false},
      {from:1.6,to:2.4,head:2.1,kind:'door',hinge:'from',ang:0}]},
    {ax:'z',c:4.0,from:0,to:5.2,open:[{from:2.35,to:3.1,head:2.1,kind:'gap'},{from:3.9,to:4.65,head:2.1,kind:'gap'}]},
    {ax:'x',c:3.3,from:4.0,to:7},
    {ax:'x',c:5.2,from:0,to:7,open:[
      {from:.2,to:1.4,sill:.95,head:2.1,kind:'gap'},
      {from:1.6,to:2.5,head:2.1,kind:'gap'},
      {from:2.68,to:3.42,head:2.1,kind:'gap'}]},
    {ax:'z',c:2.6,from:5.2,to:8.4},
    {ax:'z',c:3.5,from:5.2,to:8.4,open:[{from:6.4,to:7.15,head:2.1,kind:'gap'}]},
    {ax:'x',c:8.4,from:2.6,to:7,open:[{from:2.68,to:3.42,head:2.1,kind:'gap'}]},
    {ax:'z',c:0,from:8.4,to:11.6,h:2.4,color:'#d9d2c2'},{ax:'x',c:11.6,from:0,to:2.6,h:2.4,color:'#d9d2c2'},
    {ax:'z',c:0,from:-3.6,to:0,h:1.6,t:.1,color:'#d9d2c2'},{ax:'z',c:7,from:-3.6,to:0,h:1.6,t:.1,color:'#d9d2c2'}
  ],
  boxes:boxes,
  items:[
    ['pergola',4.9,-3.45,0,{w:3.9,d:3.45,alto:2.35}],
    ['barra',.08,7.0,90,{len:2.6,estufa:.3,tarja:-.7,altos:[[-.2,1.2]],color:CAB,cubierta:'#d9cfc4'}],
    ['regadera',6.92,5.12,180,{w:.9,d:1.74}],['wc',5.4,3.38,0],['lavabo',4.7,3.38,0],
    ['lavadero',1.3,11.52,180],
    ['plafon',2.0,2.6,0],['plafon',5.5,1.7,0],['plafon',5.3,4.3,0],['plafon',1.3,6.8,0],['plafon',5.2,6.8,0],['plafon',4.8,10.0,0],
    ['refri',2.52,7.6,-90,{s:1}],
    ['tapete',1.9,1.9,90,{s:1,w:2.3,d:1.6,color:'#d9c9b4',color2:'#b98a6a'}],['sofa',.58,1.9,90,{s:1,w:2.0,color:'#6b5a4e',color2:'#7c6a5d'}],['mesaCentro',1.9,1.9,90,{s:1}],
    ['tv',3.92,1.2,-90,{s:1,w:1.3,color:'#5a4636'}],
    ['mesa',2.3,4.0,0,{s:1,w:.9,d:.9}],['silla',2.3,3.38,0,{s:1}],['silla',2.3,4.62,180,{s:1}],['silla',1.68,4.0,90,{s:1}],['silla',2.92,4.0,-90,{s:1}],
    ['cama',5.92,1.75,-90,{s:1,w:1.4,manta:'#a85a5a'}],['buro',6.72,.7,-90,{s:1}],['closet',5.6,3.22,180,{s:1,w:1.5}],
    ['cama',5.92,7.0,-90,{s:1,w:1.4,manta:'#8a6a8a'}],['closet',5.4,5.28,0,{s:1,w:1.5}],
    ['cama',5.95,9.3,-90,{s:1,w:.95,manta:'#c98a8a'}],['cama',5.95,10.8,-90,{s:1,w:.95,manta:'#c98a8a'}],['buro',6.72,10.05,-90,{s:1}]
  ]
};
var stops=[
  {n:'Vista general',d:'Casa de una planta con 3 recámaras, 1 baño, cochera techada y patio de servicio.',t:[3.5,.2,4.6],yaw:-.6,pitch:.9,dist:25,fov:.62,f:[],v:{dist:33}},
  {n:'Fachada',d:'Frente con reja, cochera techada y protecciones en ventanas.',t:[3.5,1.2,-1.5],yaw:-.5,pitch:.1,dist:12.5,fov:.72,f:[1],v:{dist:16}},
  {n:'Sala-comedor',d:'Sala y comedor amplios junto a la entrada.',t:[3.7,1.55,4.9],yaw:-2.36,pitch:.22,dist:.01,fov:1.15,f:[3,2]},
  {n:'Cocina',d:'Cocina con barra hacia el comedor y salida al patio.',t:[2.38,1.55,5.45],yaw:-.98,pitch:.3,dist:.01,fov:1.2,f:[4]},
  {n:'Baño',d:'Baño completo.',t:[4.25,1.6,5.0],yaw:2.28,pitch:.5,dist:.01,fov:1.3,f:[9]},
  {n:'Recámara 1',d:'Recámara al frente con ventana a la calle.',t:[4.35,1.55,3.0],yaw:2.28,pitch:.25,dist:.01,fov:1.2,f:[7]},
  {n:'Recámara 2',d:'Recámara con clóset.',t:[3.85,1.55,8.1],yaw:2.2,pitch:.25,dist:.01,fov:1.2,f:[8,6]},
  {n:'Recámara 3',d:'Recámara al fondo, con espacio para dos camas.',t:[2.9,1.55,8.7],yaw:.86,pitch:.25,dist:.01,fov:1.2,f:[5]},
  {n:'Patio',d:'Patio de servicio con lavadero.',t:[2.3,1.55,8.75],yaw:-.5,pitch:.2,dist:.01,fov:1.15,f:[10]}
];
var rooms=[['Cochera',4.9,-1.8],['Sala-comedor',2.0,2.6],['Recámara 1',5.5,1.7],['Baño',5.4,4.3],['Cocina',1.3,6.8],['Recámara 2',5.2,6.8],['Recámara 3',4.8,10.0],['Patio',1.3,10.0]];
window.TOUR={levels:[{n:'Casa',plan:plan,rooms:rooms}],stops:stops};
})();
