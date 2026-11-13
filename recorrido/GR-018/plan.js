/* Casa en Hacienda Carlota, Privada Flandes (395 m² en tres niveles, terreno de 360 m²).
   Sin plano: distribución deducida de las fotos; medidas aproximadas. Metros. x = ancho visto desde la calle, z = fondo. */
(function(){
// colores tomados de las fotos: porcelanato crema, estuco arena, piedra café en la torre, cantera clara en el volumen del balcón,
// cocina de nogal con gabinetes altos blancos, clósets y tocadores de encino claro, duela de porcelanato en la terraza
var T='#d8d2c5', TAN='#c8ad85', STONE='#6f5a55', LSTONE='#d6cfbf', WOOD='#94755a', CLAR='#d6c2a1', GRAN='#d3ccbd', DARK='#6e442a', DECK='#8b6148', FR='#26282b', NEG='#1f2123',
    IN='#eee8da', ACC='#c9b08a', BEI='#dccbac', BLA='#f2f1ed';
var W=11, D=14;
function ext(o){o.t=.15; o.h=2.7; if(!o.color) o.color=TAN; if(!o.mat) o.mat=(o.color===STONE||o.color===LSTONE)?12:14; return o}
var baja={
  sky:'#e9eef1', center:[5.5,0,7], frame:FR, tile:.6, gloss:1, wallIn:IN, zoclo:'#e2dccd', indoor:[[2.2,0,4.4,4.5]],
  ground:[
    [-10,-0.09,-16,21,26,'#8fae6b',2],
    [-10,-0.06,-16,21,-8.2,'#a8978b',15],
    [-10,-0.03,-8.2,21,-6.6,'#cfccc5',3],
    [.5,-0.02,-6.6,2.0,0,'#d6d3cc',3],
    [3.0,-0.02,-6.6,3.9,0,'#d6d3cc',3],[4.6,-0.02,-6.6,5.5,0,'#d6d3cc',3],[6.2,-0.02,-6.6,7.1,0,'#d6d3cc',3],[7.8,-0.02,-6.6,8.7,0,'#d6d3cc',3],[9.4,-0.02,-6.6,10.3,0,'#d6d3cc',3],
    [0,-0.02,14,6.8,16.4,'#cfc8b8',3]
  ],
  floors:[[0,0,2.2,4.5,T],[2.2,0,4.4,4.5,T],[4.4,0,6.4,1.7,T],[4.4,1.7,6.4,2.9,T],[4.4,2.9,6.4,4.5,T],[6.4,0,W,4.5,T],
          [0,4.5,6.8,D,T],[6.8,4.5,8.6,7,T],[8.6,4.5,W,7,T],[6.8,7,W,8.5,T],[6.8,8.5,W,D,T]],
  ceilings:[[0,0,2.2,4.5],[4.4,0,6.4,1.7],[4.4,1.7,6.4,2.9],[4.4,2.9,6.4,4.5],[6.4,0,W,4.5],[0,4.5,6.8,D],[6.8,4.5,8.6,7],[8.6,4.5,W,7],[6.8,7,W,8.5],[6.8,8.5,W,D]],
  walls:[
    ext({ax:'x',c:0,from:0,to:2.2,open:[{from:.65,to:1.75,head:2.3,kind:'door',hinge:'from',ang:0,color:DARK,mat:6,marco:NEG}]}),
    ext({ax:'x',c:0,from:2.2,to:4.4,color:STONE,open:[{from:2.7,to:3.9,sill:1.75,head:2.1,kind:'window',mid:false}]}),
    ext({ax:'x',c:0,from:4.4,to:W,open:[{from:7.3,to:10.3,sill:1.0,head:2.1,kind:'window'}]}),
    ext({ax:'z',c:0,from:0,to:4.5,open:[{from:1.6,to:2.2,sill:.9,head:2.0,kind:'window',mid:false}]}),
    ext({ax:'z',c:0,from:4.5,to:D,cin:ACC}),   // muro de acento de la sala-comedor
    ext({ax:'z',c:W,from:0,to:D,open:[
      {from:5.4,to:6.3,sill:1.2,head:2.0,kind:'window',mid:false},
      {from:7.25,to:8.25,sill:1.15,head:2.1,kind:'window',mid:false},
      {from:11.3,to:13.2,sill:1.15,head:2.1,kind:'window'}]}),
    ext({ax:'x',c:D,from:0,to:W,open:[{from:1.0,to:5.6,sill:.05,head:2.35,kind:'window'}]}),
    {ax:'z',c:2.2,from:0,to:4.5},
    {ax:'z',c:4.4,from:0,to:4.5},
    {ax:'x',c:4.5,from:2.2,to:W,open:[{from:2.3,to:3.3,head:2.5,kind:'gap'},{from:4.8,to:5.55,head:2.1,kind:'gap'},{from:6.6,to:7.45,head:2.1,kind:'gap'}]},
    {ax:'z',c:6.4,from:0,to:4.5,open:[{from:.5,to:1.25,head:2.1,kind:'gap'},{from:1.95,to:2.7,head:2.1,kind:'gap'}]},
    {ax:'x',c:1.7,from:4.4,to:6.4},{ax:'x',c:2.9,from:4.4,to:6.4},
    {ax:'z',c:6.8,from:4.5,to:8.5},
    {ax:'z',c:8.6,from:4.5,to:7},
    {ax:'x',c:7,from:6.8,to:W,open:[{from:7.35,to:8.05,head:2.1,kind:'gap'},{from:9.2,to:9.95,head:2.1,kind:'gap'}]},
    {ax:'x',c:8.5,from:6.8,to:W,open:[{from:7.0,to:7.8,head:2.1,kind:'gap'}]},
    // bardas del jardín
    {ax:'x',c:21,from:-.5,to:11.5,h:2.2,color:TAN,mat:14},{ax:'z',c:-.5,from:14,to:21,h:2.2,color:TAN,mat:14},{ax:'z',c:11.5,from:14,to:21,h:2.2,color:TAN,mat:14}
  ],
  boxes:[
    // descanso de la escalera
    [2.25,1.2,.08,4.35,1.35,1.75,T],
    // marquesina de la entrada
    [.3,2.45,-1.1,2.3,2.57,0,NEG],
    // mueble alto de la cocina con nicho para refrigerador
    [8.2,0,8.58,9.3,2.3,9.2,WOOD,{mat:6}],[9.3,1.9,8.58,10.4,2.3,9.2,WOOD,{mat:6}],[10.4,0,8.58,10.47,2.3,9.2,WOOD,{mat:6}],[8.45,1.05,9.2,9.05,1.5,9.22,BLA],
    [8.74,.12,9.2,8.76,1.0,9.205,'#6f5642'],[8.74,1.55,9.2,8.76,2.26,9.205,'#6f5642'],[8.66,.5,9.2,8.68,.8,9.23,'#c9cdd0',{mat:16}],[8.82,.5,9.2,8.84,.8,9.23,'#c9cdd0',{mat:16}],[8.66,1.7,9.2,8.68,2.0,9.23,'#c9cdd0',{mat:16}],[8.82,1.7,9.2,8.84,2.0,9.23,'#c9cdd0',{mat:16}],
    // planta alta y tercer nivel vistos desde la calle (se ocultan al ver la maqueta desde arriba)
    [-.075,2.7,-.075,4.475,5.5,14.075,TAN,{mat:34}],
    [4.4,2.7,1.6,11.075,5.5,14.075,LSTONE,{mat:32}],
    [4.4,2.7,-.075,11.075,2.82,1.6,TAN,{mat:34}],
    [-.075,5.5,-.075,6.575,8.3,10.075,TAN,{mat:34}],
    [6.5,5.5,1.6,11.075,6.6,1.75,TAN,{mat:34}],[10.925,5.5,1.6,11.075,6.6,14.075,TAN,{mat:34}],
    [2.2,2.7,-.13,4.4,8.3,-.075,STONE,{mat:32}],
    [2.7,3.9,-.17,3.9,4.3,-.14,'#3d4a55',{mat:10}],[2.7,5.0,-.17,3.9,5.4,-.14,'#3d4a55',{mat:10}],[2.7,6.7,-.17,3.9,7.1,-.14,'#3d4a55',{mat:10}],
    [.5,3.6,-.11,1.0,4.6,-.08,'#3d4a55',{mat:10}],[.5,6.3,-.11,1.0,7.3,-.08,'#3d4a55',{mat:10}],
    [6.6,2.95,1.5,10.3,5.1,1.57,'#3d4a55',{mat:10}],
    [4.45,2.85,-.06,11.05,3.85,-.03,'#b9d0d6',{mat:10}],[4.45,3.85,-.08,11.05,3.9,-.01,'#c9cdd0',{mat:11}]
  ],
  items:[
    ['escalera',2.75,4.45,180,{w:1.0,n:9,alto:1.35,huella:.3,mat:1,color:T}],
    ['escalera',3.85,1.75,0,{w:1.0,n:9,alto:1.35,y0:1.35,huella:.3,mat:1,color:T}],
    // cocina en U
    ['barra',9.1,13.92,180,{len:3.5,estufa:0,horno:1,altos:[[-1.6,-.5],[.5,1.6]],color:WOOD,mat:6,colorAltos:BLA,cubierta:GRAN}],
    ['barra',10.92,12.3,-90,{len:2.1,tarja:0,color:WOOD,mat:6,cubierta:GRAN}],
    ['barra',6.95,12.55,90,{len:2.7,copete:false,color:WOOD,mat:6,cubierta:GRAN}],
    // recámara de planta baja: baño y vestidor
    ['regadera',4.48,.08,0,{w:.9,d:1.54}],['wc',5.5,.08,0],['tocadorF',5.85,1.62,180,{w:.8,color:CLAR}],
    ['vestidor',4.48,2.3,90,{w:1.0,color:CLAR}],
    // medio baño de visitas
    ['tocadorF',4.48,3.7,90,{w:1.3,color:CLAR}],['wc',5.9,2.98,0],
    // cuarto de servicio y lavado
    ['regadera',6.88,4.58,0,{w:.85,d:1.0}],['wc',8.1,4.58,0],['tocadorF',8.52,6.3,-90,{w:.7,color:CLAR}],
    ['lavadero',10.3,7.08,0],
    ['plafon',1.1,2.2,0],['plafon',8.7,2.2,0],['plafon',5.4,.85,0],['plafon',5.4,3.7,0],['plafon',3.4,7.0,0],['plafon',3.4,11.5,0],['plafon',9.0,11.5,0],['plafon',9.8,5.7,0],['plafon',8.9,7.75,0],['plafon',7.7,5.7,0],
    ['refri',9.85,8.62,0,{s:1}],
    ['silla',6.45,11.9,90,{s:1}],['silla',6.45,13.0,90,{s:1}],
    ['mesa',3.4,7.0,0,{s:1,w:2.2,d:1.0}],['silla',2.7,6.3,0,{s:1}],['silla',3.4,6.3,0,{s:1}],['silla',4.1,6.3,0,{s:1}],['silla',2.7,7.7,180,{s:1}],['silla',3.4,7.7,180,{s:1}],['silla',4.1,7.7,180,{s:1}],
    ['tapete',2.3,11.6,90,{s:1,w:2.6,d:2.0,color:'#d6d1c6',color2:'#bfb9ad'}],['sofa',3.9,11.6,-90,{s:1,w:2.4,color:'#8a8d91',color2:'#9b9ea2'}],['mesaCentro',2.3,11.6,90,{s:1}],
    ['tv',.1,11.6,90,{s:1,w:1.6}],['planta',.45,13.5,0,{s:1}],['planta',6.3,5.0,0,{s:1}],
    ['cama',9.95,2.5,-90,{s:1,w:1.8,manta:'#6f7f8f'}],['buro',10.7,1.25,-90,{s:1}],['buro',10.7,3.75,-90,{s:1,lampara:false}],
    ['cama',10.0,5.25,-90,{s:1,w:.95,manta:'#c9b18f'}],
    ['lavadora',8.9,7.08,0,{s:1}],
    ['planta',-.1,-1.2,0,{s:1,h:1.3}],['planta',2.6,-.5,0,{s:1,h:.9}],['planta',3.6,-.5,0,{s:1,h:.9}]
  ]
};
var alta={
  sky:'#e9eef1', center:[5.5,0,7], frame:FR, tile:.6, gloss:1, wallIn:IN, zoclo:'#e2dccd', indoor:[[2.2,0,4.4,4.5]],
  ground:[[-10,-0.09,-16,21,26,'#d9dcde',0]],
  floors:[[0,0,2.2,4.5,T],[2.2,0,4.4,.1,T],[0,4.5,4.4,8.8,T],[4.4,6,6,8.8,T],[4.4,1.6,W,6,T],[6,6,8.2,8.8,T],[8.2,6,W,8.8,T],
          [0,8.8,3.4,D,T],[3.4,8.8,5,11,T],[3.4,11,5,D,T],[5,8.8,9.2,D,T],[9.2,8.8,W,11,T],[9.2,11,W,D,T],[4.4,0,W,1.6,T]],
  ceilings:[[0,0,2.2,4.5],[0,4.5,4.4,8.8],[4.4,6,6,8.8],[4.4,1.6,W,6],[6,6,8.2,8.8],[8.2,6,W,8.8],[0,8.8,3.4,D],[3.4,8.8,5,11],[3.4,11,5,D],[5,8.8,9.2,D],[9.2,8.8,W,11],[9.2,11,W,D]],
  walls:[
    ext({ax:'x',c:0,from:0,to:2.2,open:[{from:.5,to:1.0,sill:.9,head:1.9,kind:'window',mid:false}]}),
    ext({ax:'x',c:0,from:2.2,to:4.4,color:STONE,open:[{from:2.7,to:3.9,sill:1.2,head:1.6,kind:'window',mid:false}]}),
    ext({ax:'z',c:4.4,from:0,to:1.6}),
    ext({ax:'x',c:1.6,from:4.4,to:W,color:LSTONE,cin:BEI,open:[{from:6.6,to:10.3,sill:.05,head:2.35,kind:'window',blind:.42}]}),
    ext({ax:'z',c:0,from:0,to:D}),
    ext({ax:'z',c:W,from:1.6,to:D,open:[
      {from:2.5,to:3.0,sill:.8,head:2.2,kind:'window',mid:false},{from:4.0,to:4.5,sill:.8,head:2.2,kind:'window',mid:false},
      {from:6.4,to:7.0,sill:1.3,head:2.1,kind:'window',mid:false}]}),
    ext({ax:'x',c:D,from:0,to:W,open:[
      {from:.7,to:2.8,sill:.9,head:2.2,kind:'window',blind:.4},{from:3.9,to:4.5,sill:1.3,head:2.1,kind:'window',mid:false},
      {from:5.9,to:8.3,sill:.9,head:2.2,kind:'window',blind:.4},{from:9.8,to:10.4,sill:1.3,head:2.1,kind:'window',mid:false}]}),
    // barandal de cristal del balcón
    {ax:'x',c:0,from:4.4,to:W,h:1.08,t:.06,color:'#c9cdd0',open:[{from:4.5,to:10.9,sill:.08,head:1.02,kind:'window',mid:false}]},
    {ax:'z',c:W,from:0,to:1.6,h:1.08,t:.1,color:TAN},
    {ax:'z',c:2.2,from:0,to:4.5},
    {ax:'z',c:4.4,from:1.6,to:6,cin:[null,BEI]},
    {ax:'x',c:6,from:4.4,to:W,cin:[BEI,null],open:[{from:4.55,to:5.4,head:2.1,kind:'gap'},{from:6.7,to:7.45,head:2.1,kind:'gap'},{from:9.0,to:9.75,head:2.1,kind:'gap'}]},
    {ax:'z',c:6,from:6,to:8.8},{ax:'z',c:8.2,from:6,to:8.8},
    {ax:'x',c:8.8,from:0,to:W,open:[{from:2.4,to:3.2,head:2.1,kind:'gap'},{from:5.1,to:5.9,head:2.1,kind:'gap'}]},
    {ax:'z',c:5,from:8.8,to:D},
    {ax:'z',c:3.4,from:8.8,to:D,open:[{from:9.5,to:10.25,head:2.1,kind:'gap'},{from:11.6,to:12.35,head:2.1,kind:'gap'}]},
    {ax:'x',c:11,from:3.4,to:5},
    {ax:'z',c:9.2,from:8.8,to:D,open:[{from:9.5,to:10.25,head:2.1,kind:'gap'},{from:11.6,to:12.35,head:2.1,kind:'gap'}]},
    {ax:'x',c:11,from:9.2,to:W}
  ],
  boxes:[[2.25,1.2,.08,4.35,1.35,1.75,T]],
  items:[
    ['escalera',2.75,4.45,180,{w:1.0,n:9,alto:1.35,huella:.3,mat:1,color:T}],
    ['escalera',3.85,1.75,0,{w:1.0,n:9,alto:1.35,y0:1.35,huella:.3,mat:1,color:T}],
    // recámara principal: vestidor y baño
    ['vestidor',6.08,7.5,90,{w:2.2,color:CLAR}],['vestidor',8.12,7.6,-90,{w:2.0,color:CLAR}],
    ['tocadorF',8.28,7.6,90,{w:1.5,n:2,color:CLAR}],['regadera',10.92,8.72,180,{w:1.2,d:1.4}],['wc',9.4,8.72,180],
    // recámara 2
    ['vestidor',4.92,9.9,-90,{w:1.8,color:CLAR}],['regadera',4.92,13.92,180,{w:1.44,d:1.0}],['wc',4.5,11.08,0],['tocadorF',4.92,12.3,-90,{w:.8,color:CLAR}],
    // recámara 3
    ['vestidor',10.92,9.9,-90,{w:1.8,color:CLAR}],['regadera',10.92,13.92,180,{w:1.64,d:1.0}],['wc',10.4,11.08,0],['tocadorF',10.92,12.3,-90,{w:.8,color:CLAR}],
    ['plafon',1.1,2.2,0],['plafon',2.4,6.7,0],['plafon',7.7,3.8,0],['plafon',7.1,7.4,0],['plafon',9.6,7.4,0],['plafon',1.7,11.4,0],['plafon',7.1,11.4,0],['plafon',4.2,9.9,0],['plafon',4.2,12.5,0],['plafon',10.1,9.9,0],['plafon',10.1,12.5,0],
    ['sofa',3.8,6.7,-90,{s:1,w:2.4,color:'#8a8d91',color2:'#9b9ea2'}],['tv',.1,6.7,90,{s:1,w:1.6}],['tapete',2.1,6.7,90,{s:1,w:2.4,d:1.8,color:'#d6d1c6',color2:'#bfb9ad'}],
    ['mesa',1.1,.6,0,{s:1,w:1.3,d:.6}],['silla',1.1,1.2,180,{s:1}],
    ['cama',8.0,4.9,180,{s:1,w:1.9,manta:'#6f7f8f'}],['buro',6.75,5.7,180,{s:1}],['buro',9.25,5.7,180,{s:1,lampara:false}],
    ['cama',1.1,11.6,90,{s:1,w:1.5,manta:'#c9b18f'}],['buro',.3,12.7,90,{s:1}],
    ['cama',6.1,11.6,90,{s:1,w:1.5,manta:'#8fa59a'}],['buro',5.3,12.7,90,{s:1}],
    ['mesa',9.6,.8,0,{s:1,w:.7,d:.7}],['silla',8.9,.8,90,{s:1}],['planta',10.6,.45,0,{s:1}]
  ]
};
var roof={
  sky:'#e9eef1', center:[5.5,0,7], frame:FR, tile:.6, gloss:1, wallIn:'#e9dfca', zoclo:'#e2dccd', indoor:[[2.2,0,4.4,4.5]],
  ground:[[-10,-0.09,-16,21,26,'#d9dcde',0]],
  floors:[[0,0,2.2,4.5,T],[2.2,0,4.4,.1,T],[0,4.5,6.5,10,T],[4.4,3.2,6.5,4.5,T],[4.4,1.6,6.5,3.2,DECK,13],[6.5,1.6,W,10,DECK,13],[0,10,W,D,DECK,13]],
  ceilings:[[0,0,2.2,4.5],[2.2,0,4.4,4.5],[0,4.5,6.5,10],[4.4,3.2,6.5,4.5],[4.4,1.6,6.5,3.2]],
  walls:[
    ext({ax:'x',c:0,from:0,to:2.2,open:[{from:.5,to:1.0,sill:.9,head:1.9,kind:'window',mid:false}]}),
    ext({ax:'x',c:0,from:2.2,to:4.4,color:STONE,open:[{from:2.7,to:3.9,sill:1.2,head:1.6,kind:'window',mid:false}]}),
    ext({ax:'z',c:0,from:0,to:10,open:[{from:6.0,to:8.6,sill:1.15,head:2.1,kind:'window'}]}),
    ext({ax:'z',c:4.4,from:0,to:1.6}),
    ext({ax:'x',c:1.6,from:4.4,to:6.5}),
    ext({ax:'z',c:6.5,from:1.6,to:10,open:[{from:2.0,to:2.8,head:2.05,kind:'gap'},{from:5.6,to:8.6,sill:.05,head:2.35,kind:'window'}]}),
    ext({ax:'x',c:10,from:0,to:6.5,open:[{from:1.6,to:4.4,sill:.05,head:2.35,kind:'window'}]}),
    {ax:'z',c:2.2,from:0,to:4.5},{ax:'z',c:4.4,from:1.6,to:4.5},
    {ax:'x',c:3.2,from:4.4,to:6.5},
    {ax:'x',c:4.5,from:0,to:6.5,open:[{from:3.4,to:4.3,head:2.1,kind:'glassdoor',mid:true,frame:NEG},{from:5.1,to:5.85,head:2.1,kind:'gap'}]},
    // pretiles de la terraza
    {ax:'x',c:1.6,from:6.5,to:W,h:1.2,t:.14,color:TAN,mat:14},{ax:'z',c:W,from:1.6,to:D,h:1.2,t:.14,color:TAN,mat:14},{ax:'x',c:D,from:0,to:W,h:1.2,t:.14,color:TAN,mat:14},{ax:'z',c:0,from:10,to:D,h:1.2,t:.14,color:TAN,mat:14}
  ],
  boxes:[
    // asador de obra
    [7.4,0,13.25,10.85,.82,13.92,TAN,{mat:14}],[7.35,.82,13.2,10.9,.9,13.93,GRAN],[9.5,.9,13.3,10.6,.98,13.85,NEG],
    // tragaluz
    [6.75,0,3.5,7.6,.3,4.6,'#c9c4b6'],[6.8,.3,3.55,7.55,.34,4.55,'#a9cfd2']
  ],
  items:[
    ['hueco',3.3,.1,0,{w:2.1,l:4.3,lados:[],color:T}],
    ['barra',.08,7.3,90,{len:3.0,tarja:-.8,color:CLAR,cubierta:GRAN}],
    ['wc',5.9,3.28,0],['tocadorF',4.48,3.9,90,{w:.7,color:CLAR}],
    ['lavadero',5.0,1.68,0],['boiler',4.48,2.7,90],
    ['plafon',3.2,7.2,0],['plafon',5.4,3.85,0],
    ['mesa',3.6,7.4,0,{s:1,w:1.8,d:.9}],['silla',3.0,6.75,0,{s:1}],['silla',4.2,6.75,0,{s:1}],['silla',3.0,8.05,180,{s:1}],['silla',4.2,8.05,180,{s:1}],
    ['sofa',2.6,5.1,0,{s:1,w:2.0,color:'#8a8d91',color2:'#9b9ea2'}],
    ['mesa',8.6,11.6,0,{s:1,w:1.6,d:.9}],['silla',8.0,10.95,0,{s:1}],['silla',9.2,10.95,0,{s:1}],['silla',8.0,12.25,180,{s:1}],['silla',9.2,12.25,180,{s:1}],
    ['planta',.5,13.4,0,{s:1,h:1.1}],['planta',10.5,2.1,0,{s:1,h:1.1}],['planta',6.0,13.4,0,{s:1}]
  ]
};
var stops=[
  {n:'Planta baja',d:'Sala-comedor, cocina integral, recámara con baño y vestidor, medio baño, cuarto de servicio y lavado.',lvl:0,t:[5.5,.2,7.4],yaw:-.6,pitch:.9,dist:36,fov:.62,f:[],v:{dist:41}},
  {n:'Fachada',d:'Casa de tres niveles con balcón de cristal y cochera para dos autos.',lvl:0,t:[5.5,3.8,0],yaw:-.4,pitch:.05,dist:27,fov:.75,f:[1],v:{dist:36}},
  {n:'Sala-comedor',d:'Sala-comedor amplia con la escalera al fondo y salida al jardín.',lvl:0,t:[6.2,1.55,13.3],yaw:-2.8,pitch:.2,dist:.01,fov:1.2,f:[5]},
  {n:'Cocina',d:'Cocina integral en U con cubierta de granito y barra.',lvl:0,t:[5.6,1.55,9.9],yaw:.75,pitch:.28,dist:.01,fov:1.2,f:[3,4]},
  {n:'Lavado',d:'Cuarto de lavado junto al cuarto de servicio con baño.',lvl:0,t:[7.05,1.55,7.75],yaw:1.5,pitch:.3,dist:.01,fov:1.25,f:[19]},
  {n:'Recámara en planta baja',d:'Recámara en planta baja con baño completo y vestidor.',lvl:0,t:[6.75,1.55,4.15],yaw:2.3,pitch:.25,dist:.01,fov:1.2,f:[]},
  {n:'Baño de visitas',d:'Medio baño con cubierta de mármol.',lvl:0,t:[5.25,1.6,4.4],yaw:-2.85,pitch:.5,dist:.01,fov:1.3,f:[11]},
  {n:'Planta alta',d:'Tres recámaras, cada una con baño y vestidor, sala de TV y balcón.',lvl:1,t:[5.5,.2,7.4],yaw:-.6,pitch:.9,dist:36,fov:.62,f:[],v:{dist:41}},
  {n:'Sala de TV',d:'Sala de TV al llegar de la escalera, que reparte a las recámaras.',lvl:1,t:[5.4,1.55,8.4],yaw:-2.2,pitch:.22,dist:.01,fov:1.2,f:[15]},
  {n:'Recámara principal',d:'Recámara principal con cancel corredizo al balcón de cristal.',lvl:1,t:[4.75,1.55,5.6],yaw:2.2,pitch:.22,dist:.01,fov:1.2,f:[6,7,8]},
  {n:'Vestidor',d:'Vestidor con repisas y cajoneras.',lvl:1,t:[7.1,1.6,6.05],yaw:.15,pitch:.3,dist:.01,fov:1.3,f:[9,10]},
  {n:'Baño principal',d:'Baño completo con tocador y cancel de cristal.',lvl:1,t:[9.4,1.6,6.2],yaw:.3,pitch:.45,dist:.01,fov:1.3,f:[13]},
  {n:'Recámara 2',d:'Recámara con baño y vestidor propios.',lvl:1,t:[3.0,1.55,9.2],yaw:-.5,pitch:.25,dist:.01,fov:1.2,f:[16]},
  {n:'Recámara 3',d:'Recámara con baño y vestidor propios.',lvl:1,t:[8.8,1.55,9.2],yaw:-.6,pitch:.25,dist:.01,fov:1.2,f:[12,14]},
  {n:'Roof garden',d:'Salón con medio baño, cuarto de servicio y terraza con asador.',lvl:2,t:[5.5,.2,7.4],yaw:-.6,pitch:.9,dist:36,fov:.62,f:[],v:{dist:41}},
  {n:'Salón del roof',d:'Salón con barra y canceles corredizos a la terraza.',lvl:2,t:[.6,1.55,5.0],yaw:.85,pitch:.2,dist:.01,fov:1.2,f:[20,17]},
  {n:'Terraza',d:'Terraza con piso tipo madera, asador de obra y vista abierta.',lvl:2,t:[10.4,1.55,2.3],yaw:-.4,pitch:.15,dist:.01,fov:1.2,f:[2,18]}
];
window.TOUR={levels:[
  {n:'Planta baja',plan:baja,rooms:[['Sala',2.6,11.6],['Comedor',3.4,7.0],['Cocina',9.0,11.5],['Recámara',8.7,2.2],['Medio baño',5.4,3.7],['Entrada',1.1,2.2],['Lavado',8.9,7.75],['Servicio',9.8,5.7]]},
  {n:'Planta alta',plan:alta,rooms:[['Sala de TV',2.4,6.7],['Recámara principal',7.7,3.8],['Vestidor',7.1,7.4],['Baño',9.6,7.4],['Recámara 2',1.7,11.4],['Recámara 3',7.1,11.4],['Balcón',7.7,.8],['Estudio',1.1,2.2]]},
  {n:'Roof garden',plan:roof,rooms:[['Salón',3.2,7.2],['Servicio',5.4,2.6],['Terraza',8.7,6.0],['Asador',9.0,12.5]]}
],stops:stops};
})();
