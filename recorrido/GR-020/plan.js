/* Casa en Lomas de San Pedro (esquina, tres niveles, amueblada como en las fotos). No hay plano: la distribución se armó
   con las fotos y la ficha (67.5 m² de terreno, 117 m² de construcción); medidas aproximadas, distribución aprobada por Iñaki.
   Metros. x = ancho visto desde la calle, z = fondo. La calle queda en z negativo. */
(function(){
// fotos: casa en esquina de estuco claro, puerta de madera, ventanas con reja, balcón con barandal negro en el 2º nivel,
// loseta beige grande, cocina con muebles de madera naranja y cubierta de granito, escalera junto a la sala,
// medio baño con lavabo de piedra
var T='#d4c7b0', EXT='#ece6da', MAD='#a8643a', OSC='#1d1d1f', VID='#2b3540';
function base(gnd){return {sky:'#e9eef1',center:[2.25,0,4.4],frame:'#d8d2c6',tile:.4,gloss:.5,wallOut:EXT,wallMat:14,wallIn:'#f1eee6',zoclo:'#cdbfaa',ground:gnd};}
var baja=base([
  [-10,-0.09,-16,18,24,'#8fae6b',2],
  [-10,-0.06,-16,18,-8.0,'#6d6f72',0],
  [-10,-0.03,-8.0,18,-7.2,'#cfccc5',3],
  [4.7,-0.05,-8,11,13,'#6d6f72',0],
  [-1,-0.04,-7.2,4.6,0,'#7fa05a',2],
  [.3,-0.03,-3.4,3.1,-.4,'#c9c5bc',3],
  [3.2,-0.03,-5.2,4.6,0,'#b49784',1]
]);
baja.floors=[[0,0,4.5,8.7,T]];
baja.ceilings=[[0,0,4.5,3.6],[0,3.6,3.2,8.7],[4.1,3.6,4.5,6.6],[3.2,6.6,4.5,8.7]];
baja.walls=[
  {ax:'x',c:0,from:0,to:4.5,t:.18,h:2.7,out:-1,open:[
    {from:.6,to:1.5,head:2.2,kind:'door',hinge:'from',ang:0,color:MAD,mat:6},
    {from:2.4,to:3.9,sill:.9,head:2.1,kind:'window',grille:true}]},
  {ax:'z',c:0,from:0,to:8.7,t:.18,h:2.7},
  {ax:'z',c:4.5,from:0,to:8.7,t:.18,h:2.7,out:1,open:[{from:1.0,to:2.2,sill:.9,head:2.1,kind:'window',grille:true}]},
  {ax:'x',c:8.7,from:0,to:4.5,t:.18,h:2.7,open:[{from:.4,to:1.1,sill:1.4,head:2.1,kind:'window',mid:false},{from:3.3,to:4.0,sill:1.3,head:2.1,kind:'window',grille:true}]},
  /* cocina con arco hacia la sala */
  {ax:'x',c:3.6,from:0,to:2.8,open:[{from:.7,to:2.1,head:2.1,kind:'gap'}]},
  {ax:'z',c:2.8,from:3.6,to:6.6},
  {ax:'x',c:5.8,from:0,to:2.8,open:[{from:1.6,to:2.7,head:2.1,kind:'gap'}]},
  /* medio baño, lavado y pasillo */
  {ax:'z',c:1.5,from:5.8,to:7.2,open:[{from:6.2,to:6.9,head:2.1,kind:'door',hinge:'from',ang:0,color:MAD,mat:6}]},
  {ax:'x',c:7.2,from:0,to:1.5},
  {ax:'z',c:1.5,from:7.2,to:8.7,open:[{from:7.7,to:8.4,head:2.1,kind:'door',hinge:'from',ang:0,color:MAD,mat:6}]},
  {ax:'z',c:2.8,from:6.6,to:8.7,open:[{from:7.5,to:8.3,head:2.1,kind:'gap'}]},
  {ax:'x',c:6.6,from:2.8,to:4.5}
];
baja.boxes=[
  [-.075,2.8,-.075,4.575,8.4,8.775,EXT,{mat:34}],
  [.6,3.2,-.09,3.9,4.6,-.075,VID,{mat:10}],
  [-.05,2.8,-.92,4.55,3.85,-.87,OSC],[-.05,2.8,-.92,0,3.85,0,OSC],[4.5,2.8,-.92,4.55,3.85,0,OSC],

  [-6.6,0,0,-.09,8.4,8.7,'#e9e8e4',{mat:11}]
];
baja.items=[
  /* sala-comedor */
  ['tv',.08,1.5,90,{w:1.4}],['tapete',1.9,1.5,90,{s:1,w:1.9,d:1.5,color:'#8a7f74',color2:'#79706a'}],['mesaCentro',1.9,1.5,90,{s:1}],
  ['sofa',4.0,1.5,-90,{s:1,w:2.0,color:'#7a5f5d',color2:'#8a6f6c'}],
  ['mesa',1.4,3.0,0,{s:1,w:1.0,d:.8}],['silla',.7,3.0,90,{s:1}],['silla',2.1,3.0,-90,{s:1}],['silla',1.4,2.45,0,{s:1}],
  /* cocina de madera con cubierta de granito y estufa */
  ['barra',.08,4.7,90,{len:2.0,estufa:.4,color:'#a65a2b',mat:6,cubierta:'#8a8a86',altos:[[-.7,-.1],[.2,.8]]}],['refri',2.7,5.6,-90],
  /* medio baño y lavado */
  ['wc',.08,6.25,90],['lavabo',.08,6.85,90],['lavadero',.75,8.62,180],['lavadora',1.2,8.35,180],
  /* escalera junto a la sala */
  ['escalera',3.65,3.6,0,{w:.9,n:13,huella:.23,alto:2.8,mat:1,color:'#d8c9b0',barandal:-1}],
  ['plafon',2.25,1.8,0],['plafon',1.4,4.7,0],['plafon',2.1,7.0,0]
];
var med=base([[-10,-0.09,-16,18,24,'#d9dcde',0]]);
med.floors=[[0,0,4.5,3.6,T],[0,3.6,3.2,7.4,T],[4.1,3.6,4.5,6.6,T],[3.2,6.6,4.5,8.7,T],[0,7.4,3.2,8.7,T],[-0,-0.9,4.5,0,'#c9c5bc',3]];
med.ceilings=[[0,0,4.5,3.6],[0,3.6,3.2,8.7],[4.1,3.6,4.5,6.6],[3.2,6.6,4.5,8.7]];
med.walls=[
  {ax:'x',c:0,from:0,to:4.5,t:.18,h:2.7,out:-1,open:[{from:.8,to:3.7,sill:.05,head:2.3,kind:'window'}]},
  {ax:'z',c:0,from:0,to:8.7,t:.18,h:2.7},
  {ax:'z',c:4.5,from:0,to:8.7,t:.18,h:2.7,out:1,open:[{from:1.0,to:2.2,sill:.9,head:2.1,kind:'window',grille:true}]},
  {ax:'x',c:8.7,from:0,to:4.5,t:.18,h:2.7,open:[{from:.4,to:1.1,sill:1.0,head:2.1,kind:'window'},{from:3.3,to:4.0,sill:1.3,head:2.1,kind:'window',mid:false}]},
  /* balcón con barandal negro */
  {ax:'x',c:-.9,from:-.9,to:4.5,t:.05,h:1.05,color:OSC},{ax:'z',c:-.9,from:-.9,to:0,t:.05,h:1.05,color:OSC},{ax:'z',c:4.5,from:-.9,to:0,t:.05,h:1.05,color:OSC},
  /* recámaras y baño */
  {ax:'x',c:3.6,from:0,to:2.8,open:[{from:.7,to:1.5,head:2.1,kind:'door',hinge:'from',ang:0,color:MAD,mat:6}]},
  {ax:'z',c:2.8,from:3.6,to:7.4,open:[{from:4.2,to:5.0,head:2.1,kind:'door',hinge:'from',ang:0,color:MAD,mat:6},{from:6.65,to:7.35,head:2.1,kind:'door',hinge:'from',ang:0,color:MAD,mat:6}]},
  {ax:'x',c:5.9,from:0,to:2.8},
  {ax:'x',c:7.4,from:2.8,to:4.5,open:[{from:3.0,to:3.8,head:2.1,kind:'door',hinge:'from',ang:0,color:'#eeece6',mat:6}]},
  {ax:'z',c:2.8,from:7.4,to:8.7}
];
med.boxes=[[-6.6,0,0,-.09,3.4,8.7,'#e9e8e4',{mat:11}]];
med.items=[
  ['escalera',3.65,6.6,180,{w:.9,n:13,huella:.23,alto:2.8,mat:1,color:'#d8c9b0',barandal:-1}],
  /* recámara 1 con TV, clóset y balcón */
  ['cama',.85,2.0,90,{s:1,w:1.6,manta:'#1f2a5a'}],['buro',.3,1.0,90,{s:1}],['tv',4.42,2.0,-90,{w:1.2}],
  ['cama',.85,4.7,90,{s:1,w:1.2,manta:'#8f8a6a'}],['buro',.3,3.9,90,{s:1}],['cama',.85,7.1,90,{s:1,w:1.2,manta:'#5f7f8f'}],['buro',.3,6.3,90,{s:1}],
  ['regadera',3.8,8.65,180,{w:.95,d:.9}],['wc',4.42,8.1,-90],['lavabo',4.42,7.75,-90],
  ['plafon',2.25,1.8,0],['plafon',1.4,4.7,0],['plafon',1.4,7.3,0]
];
var alta=base([[-10,-0.09,-16,18,24,'#d9dcde',0]]);
alta.floors=[[0,0,4.5,3.6,T],[0,3.6,2.8,6.0,T],[0,6.0,4.5,8.7,'#a9a39a',3],[2.8,6.0,4.5,6.6,'#a9a39a',3],[4.1,3.6,4.5,6.0,T],[3.2,3.6,4.1,3.7,T],[2.8,3.6,3.2,6.0,T]];
alta.ceilings=[[0,0,4.5,3.6],[0,3.6,2.8,6.0]];
alta.walls=[
  {ax:'x',c:0,from:0,to:4.5,t:.18,h:2.7,out:-1,open:[{from:1.0,to:3.5,sill:.9,head:2.1,kind:'window',grille:true}]},
  {ax:'z',c:0,from:0,to:6.0,t:.18,h:2.7},
  {ax:'z',c:4.5,from:0,to:3.6,t:.18,h:2.7,out:1,open:[{from:1.0,to:2.2,sill:.9,head:2.1,kind:'window',grille:true}]},
  {ax:'x',c:3.6,from:2.8,to:4.5,h:2.7},
  {ax:'x',c:6.0,from:0,to:2.8,h:2.7,open:[{from:.9,to:1.8,head:2.1,kind:'door',hinge:'from',ang:0,color:MAD,mat:6}]},
  {ax:'z',c:2.8,from:3.6,to:6.0,open:[{from:4.2,to:5.0,head:2.1,kind:'door',hinge:'from',ang:0,color:MAD,mat:6}]},
  /* baño de la recámara principal */
  {ax:'x',c:2.2,from:0,to:1.6},
  {ax:'z',c:1.6,from:2.2,to:3.6,open:[{from:2.55,to:3.25,head:2.1,kind:'door',hinge:'from',ang:0,color:'#eeece6',mat:6}]},
  /* roof garden con pretiles */
  {ax:'x',c:8.7,from:0,to:4.5,t:.18,h:1.1},{ax:'z',c:0,from:6.0,to:8.7,t:.18,h:1.1},{ax:'z',c:4.5,from:3.6,to:8.7,t:.18,h:1.1}
];
alta.boxes=[[-6.6,0,0,-.09,2.4,8.7,'#e9e8e4',{mat:11}],
  /* jardineras del roof garden */
  [.2,0,6.2,1.0,.5,8.5,'#a89b8a',{mat:3}],[3.6,0,7.0,4.3,.5,8.5,'#a89b8a',{mat:3}],[.25,.5,6.25,.95,.9,8.45,'#6f8f4a',{mat:2}],[3.65,.5,7.05,4.25,.9,8.45,'#6f8f4a',{mat:2}]];
alta.items=[
  ['hueco',3.65,3.6,0,{w:.9,l:3.0,lados:[-1,1],color:'#d8c9b0'}],
  ['cama',.85,.9,90,{s:1,w:1.6,manta:'#6f3f3a'}],['buro',.3,.1,90,{s:1}],
  ['regadera',.08,2.28,0,{w:.95,d:.9}],['wc',1.52,3.1,-90],['lavabo',1.52,2.55,-90],
  ['cama',.85,4.8,90,{s:1,w:1.2,manta:'#b9703f'}],['buro',.3,4.0,90,{s:1}],
  ['plafon',2.25,1.4,0],['plafon',1.4,4.8,0]
];
var stops=[
  {n:'Vista general',d:'Casa en esquina de tres niveles: sala, cocina y medio baño abajo; recámaras y balcón en el 2º nivel; recámara principal y roof garden arriba.',lvl:0,t:[2.25,.2,4.4],yaw:-.6,pitch:.9,dist:16,fov:.62,f:[],v:{dist:22}},
  {n:'Fachada',d:'Fachada con puerta de madera, ventanas con reja y balcón con barandal negro; jardín al frente y un cajón de estacionamiento.',lvl:0,t:[2.25,3.3,0],yaw:-.5,pitch:.1,dist:15,fov:.72,f:[1]},
  {n:'Sala-comedor',d:'Sala y comedor, con la escalera junto al sofá.',lvl:0,t:[1.0,1.5,.55],yaw:-.1,pitch:.2,dist:.01,fov:1.3,f:[2]},
  {n:'Cocina',d:'Cocina con arco hacia la sala, muebles de madera y cubierta de granito.',lvl:0,t:[2.3,1.5,3.8],yaw:-1.0,pitch:.3,dist:.01,fov:1.35,f:[3]},
  {n:'Medio baño',d:'Medio baño con lavabo de piedra.',lvl:0,t:[1.2,1.6,6.0],yaw:-1.1,pitch:.4,dist:.01,fov:1.45,f:[6]},
  {n:'Nivel 2',d:'Tres recámaras, baño y balcón al frente.',lvl:1,t:[2.25,.2,4.4],yaw:-.6,pitch:.9,dist:16,fov:.62,f:[],v:{dist:22}},
  {n:'Recámara 1 y balcón',d:'Recámara con TV y clóset de espejo; sale al balcón con barandal negro.',lvl:1,t:[4.1,1.5,2.7],yaw:-1.35,pitch:.22,dist:.01,fov:1.3,f:[4,5]},
  {n:'Recámara 2',d:'Recámara con ventana a la calle lateral.',lvl:1,t:[2.4,1.5,4.0],yaw:-.9,pitch:.22,dist:.01,fov:1.3,f:[]},
  {n:'Nivel 3',d:'Recámara principal con baño, otra recámara y roof garden.',lvl:2,t:[2.25,.2,4.4],yaw:-.6,pitch:.9,dist:16,fov:.62,f:[],v:{dist:22}},
  {n:'Recámara principal',d:'Recámara principal con baño propio.',lvl:2,t:[4.1,1.5,2.7],yaw:-1.35,pitch:.22,dist:.01,fov:1.3,f:[]},
  {n:'Roof garden',d:'Terraza en el último nivel, con jardineras.',lvl:2,t:[2.25,.8,7.0],yaw:.3,pitch:.5,dist:8,fov:.8,f:[]}
];
var rooms0=[['Sala-comedor',2.2,1.8],['Cocina',1.4,4.7],['Escalera',3.65,5.1],['Medio baño',.75,6.5],['Lavado',.75,8.0],['Jardín',2.25,-2.0]];
var rooms1=[['Balcón',2.25,-.45],['Recámara 1',1.6,1.8],['Recámara 2',1.4,4.7],['Recámara 3',1.4,7.2],['Baño',3.65,8.1]];
var rooms2=[['Recámara principal',2.6,1.4],['Baño',.8,2.9],['Recámara 4',1.4,4.8],['Roof garden',2.25,7.4]];
window.TOUR={levels:[{n:'Nivel 1',plan:baja,rooms:rooms0},{n:'Nivel 2',plan:med,rooms:rooms1},{n:'Nivel 3',plan:alta,rooms:rooms2}],stops:stops};
})();
