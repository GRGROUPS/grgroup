/* Casa en Misión de San Juan (una planta, 60 m² de construcción en terreno de 75 m²). Plano deducido de las fotos; medidas aproximadas.
   Metros. x = ancho visto desde la calle, z = fondo. */
(function(){
// fotos: muros de estuco blanco, bóveda de ladrillo en el patio techado, piso de concreto al frente,
// loseta beige chica adentro, puertas de madera oscura, muro de azulejo de colores en el comedor
var T='#e3d9c6', WOOD='#3b2820', EST='#eeebe4';
var boxes=[[0,2.62,0,5,2.78,4.6,'#a45a40',{mat:32}],[0,2.6,0,5,2.62,4.6,'#a8593c',{mat:32}]], i;
for(i=0;i<=33;i++) boxes.push([i*.151-.015,0,-.02,i*.151+.015,2.1,.01,'#232323']);   // portón y reja del frente
boxes.push([0,2.06,-.03,5,2.1,.02,'#232323'],[0,.1,-.03,5,.14,.02,'#232323']);
var plan={
  sky:'#e9eef1', center:[2.5,0,6.2], tile:.33, gloss:.35, indoor:[[0,0,5,4.6]], wallOut:EST, wallMat:14, wallIn:'#f2efe8', zoclo:'#e0d6c4',
  ground:[
    [-10,-0.09,-12,15,24,'#9aa07a',2],
    [-10,-0.06,-12,15,-1.6,'#7b7d80',0],
    [-10,-0.03,-1.6,15,0,'#cfccc5',3],
    [0,-0.02,0,5,4.6,'#aaa59b',3],
    [0,-0.02,11.6,5,13.4,'#b9b4aa',3]
  ],
  floors:[[0,4.6,3.3,8.2,T],[3.3,4.6,5,6.6,T],[3.3,6.6,5,8.2,'#e6e2da'],[0,8.2,2.5,11.6,T],[2.5,8.2,5,11.6,T]],
  ceilings:[[0,4.6,3.3,8.2],[3.3,4.6,5,6.6],[3.3,6.6,5,8.2],[0,8.2,2.5,11.6],[2.5,8.2,5,11.6]],
  walls:[
    {ax:'x',c:4.6,from:0,to:5,t:.15,h:2.7,open:[
      {from:1.2,to:2.6,head:2.15,kind:'door',hinge:'from',ang:0,color:WOOD,mat:6,marco:'#2a1d18'},
      {from:3.75,to:4.6,sill:1.1,head:2.1,kind:'window',mid:false}]},
    {ax:'z',c:0,from:0,to:4.6,t:.15,h:2.7},
    {ax:'z',c:0,from:4.6,to:8.2,t:.15,h:2.7,cin:'#c9a184'},   // muro de azulejo de colores del comedor
    {ax:'z',c:0,from:8.2,to:11.6,t:.15,h:2.7},
    {ax:'z',c:5,from:0,to:11.6,t:.15,h:2.7},
    {ax:'x',c:11.6,from:0,to:5,t:.15,h:2.7,open:[
      {from:.7,to:1.9,sill:.95,head:2.1,kind:'window'},
      {from:3.2,to:4.3,sill:.95,head:2.1,kind:'window'}]},
    {ax:'z',c:3.3,from:4.6,to:8.2,open:[{from:4.9,to:5.8,head:2.1,kind:'gap'},{from:7.0,to:7.72,head:2.1,kind:'gap'}]},
    {ax:'x',c:6.6,from:3.3,to:5},
    {ax:'x',c:8.2,from:0,to:5,open:[{from:.9,to:1.7,head:2.1,kind:'gap'},{from:2.56,to:3.24,head:2.1,kind:'gap'}]},
    {ax:'z',c:2.5,from:8.2,to:11.6},
    {ax:'x',c:13.4,from:0,to:5,h:2.2,color:'#cfcac0',mat:3},{ax:'z',c:0,from:11.6,to:13.4,h:2.2,color:'#cfcac0',mat:3},{ax:'z',c:5,from:11.6,to:13.4,h:2.2,color:'#cfcac0',mat:3}
  ],
  boxes:boxes,
  items:[
    ['escalera',4.45,.9,0,{w:.9,n:11,huella:.3,mat:3,color:'#c9c6bf'}],
    ['barra',4.92,5.6,-90,{len:1.8,estufa:.35,tarja:-.5,cubierta:'#d9d4cc',color:'#e2ddd2',mat:17,copete:false}],
    ['regadera',4.92,8.12,180,{w:.8,d:1.44}],['wc',3.78,6.68,0],['lavabo',3.8,8.13,180],
    ['plafon',1.6,6.4,0],['plafon',4.15,5.6,0],['plafon',4.15,7.4,0],['plafon',1.25,9.9,0],['plafon',3.75,9.9,0],
    ['refri',3.22,6.35,-90,{s:1}],
    ['mesa',1.3,6.3,0,{s:1,w:.9,d:1.4}],['silla',.68,5.95,90,{s:1,color:'#a8323c'}],['silla',.68,6.65,90,{s:1,color:'#a8323c'}],['silla',1.92,5.95,-90,{s:1,color:'#a8323c'}],['silla',1.92,6.65,-90,{s:1,color:'#a8323c'}],
    ['sofa',.56,2.3,90,{s:1,w:1.6,color:'#d9d2c2',color2:'#e6dfd0'}],['planta',.4,4.2,0,{s:1}],['planta',2.9,4.25,0,{s:1,h:1.0}],['planta',.4,.6,0,{s:1,h:1.4}],['planta',.4,1.4,0,{s:1,h:.9}],['planta',2.9,3.5,0,{s:1,h:1.3}],['planta',4.6,3.9,0,{s:1,h:.8}],['tapete',1.6,2.6,0,{s:1,w:1.4,d:.9,color:'#c86a6f',color2:'#d98a8f'}],
    ['cama',1.1,10.2,90,{s:1,w:1.4,manta:'#3d3f5c'}],['buro',.3,9.2,90,{s:1}],
    ['cama',3.9,10.6,180,{s:1,w:1.2,manta:'#c9a23c'}]
  ]
};
var stops=[
  {n:'Vista general',d:'Casa de una planta con 2 recámaras, 1 baño y patio techado al frente.',t:[2.5,.2,6.4],yaw:-.6,pitch:.9,dist:25,fov:.62,f:[],v:{dist:33}},
  {n:'Fachada',d:'Frente con portón y patio techado.',t:[2.5,1.3,0],yaw:-.5,pitch:.1,dist:11,fov:.72,f:[7,1],v:{dist:14}},
  {n:'Patio techado',d:'Patio techado al frente, útil como cochera o terraza, con escalera a la azotea.',t:[.45,1.55,.5],yaw:.62,pitch:.15,dist:.01,fov:1.2,f:[8,4,3]},
  {n:'Comedor',d:'Comedor al entrar, con paso a las recámaras.',t:[.4,1.55,4.95],yaw:.7,pitch:.25,dist:.01,fov:1.2,f:[10,11]},
  {n:'Cocina',d:'Cocina con barra y tarja.',t:[3.45,1.55,4.82],yaw:.72,pitch:.42,dist:.01,fov:1.25,f:[12,13]},
  {n:'Baño',d:'Baño completo.',t:[2.55,1.6,7.36],yaw:1.57,pitch:.42,dist:.01,fov:1.0,f:[17]},
  {n:'Recámara 1',d:'Recámara principal con ventana al fondo.',t:[2.2,1.55,8.5],yaw:-.62,pitch:.25,dist:.01,fov:1.2,f:[14,15]},
  {n:'Recámara 2',d:'Segunda recámara.',t:[2.8,1.55,8.5],yaw:.5,pitch:.25,dist:.01,fov:1.2,f:[16]}
];
var rooms=[['Patio techado',2.5,2.3],['Comedor',1.6,6.4],['Cocina',4.15,5.6],['Baño',4.15,7.4],['Recámara 1',1.25,9.9],['Recámara 2',3.75,9.9],['Patio',2.5,12.5]];
window.TOUR={levels:[{n:'Casa',plan:plan,rooms:rooms}],stops:stops};
})();
