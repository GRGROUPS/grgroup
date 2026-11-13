/* GR GROUP · Visor de recorrido 3D (WebGL puro, sin librerías).
   Cada casa define su plano en recorrido/GR-xxx/index.html y llama a GRVisor(canvas, plano).
   Incluye: sombras del sol (shadow map), oclusión en esquinas, sombras de contacto y una
   pequeña biblioteca de muebles modelados (LIB).
   v2: luz en espacio lineal con mapeo de tonos, luz de ventanas horneada, reflejo en el piso y materiales
   con textura (porcelanato, madera, piedra, estuco, duela, adoquín, acero). */
(function () {
  'use strict';

  /* ---------- matemáticas ---------- */
  function persp(fov, asp, n, f) {
    var t = 1 / Math.tan(fov / 2), m = new Float32Array(16);
    m[0] = t / asp; m[5] = t; m[10] = (f + n) / (n - f); m[11] = -1; m[14] = 2 * f * n / (n - f);
    return m;
  }
  function ortho(l, r, b, t, n, f) {
    var m = new Float32Array(16);
    m[0] = 2 / (r - l); m[5] = 2 / (t - b); m[10] = -2 / (f - n);
    m[12] = -(r + l) / (r - l); m[13] = -(t + b) / (t - b); m[14] = -(f + n) / (f - n); m[15] = 1;
    return m;
  }
  function lookAt(e, c, u) {
    var zx = e[0] - c[0], zy = e[1] - c[1], zz = e[2] - c[2];
    var l = Math.hypot(zx, zy, zz) || 1; zx /= l; zy /= l; zz /= l;
    var xx = u[1] * zz - u[2] * zy, xy = u[2] * zx - u[0] * zz, xz = u[0] * zy - u[1] * zx;
    l = Math.hypot(xx, xy, xz) || 1; xx /= l; xy /= l; xz /= l;
    var yx = zy * xz - zz * xy, yy = zz * xx - zx * xz, yz = zx * xy - zy * xx;
    var m = new Float32Array(16);
    m[0] = xx; m[1] = yx; m[2] = zx; m[4] = xy; m[5] = yy; m[6] = zy; m[8] = xz; m[9] = yz; m[10] = zz;
    m[12] = -(xx * e[0] + xy * e[1] + xz * e[2]);
    m[13] = -(yx * e[0] + yy * e[1] + yz * e[2]);
    m[14] = -(zx * e[0] + zy * e[1] + zz * e[2]); m[15] = 1;
    return m;
  }
  function mul(a, b) {
    var o = new Float32Array(16), i, j;
    for (i = 0; i < 4; i++) for (j = 0; j < 4; j++)
      o[j * 4 + i] = a[i] * b[j * 4] + a[4 + i] * b[j * 4 + 1] + a[8 + i] * b[j * 4 + 2] + a[12 + i] * b[j * 4 + 3];
    return o;
  }
  function hex(c) {
    var n = parseInt(c.slice(1), 16);
    return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
  }

  /* ---------- geometría ----------
     vértice: pos(3) normal(3) color(4) material(1)
     materiales: 0 liso, 1 loseta, 2 pasto, 3 concreto, 4 muro, 5 techo, 6 madera, 7 tela, 8 granito, 9 luminoso,
     10 luminoso que se oculta al quitar el techo, 11 volumen superior (planta alta vista desde la calle; se oculta igual),
     12 piedra, 13 duela, 14 estuco, 15 adoquín, 16 acero/espejo, 17 azulejo de muro, 18 mármol, 19 cantera en placas.
     Sumar 20 a un material (32 piedra, 34 estuco…) lo vuelve parte del volumen superior: se oculta al quitar el techo. */
  function Geo() { this.v = []; this.xf = null; this.occW = []; this.occF = []; this.occL = []; }
  Geo.prototype.push = function (x, z, deg) { var a = (deg || 0) * Math.PI / 180; this.xf = { x: x, z: z, c: Math.cos(a), s: Math.sin(a) }; };
  Geo.prototype.pop = function () { this.xf = null; };
  Geo.prototype.X = function (p) { var t = this.xf; return t ? [p[0] * t.c + p[2] * t.s + t.x, p[1], -p[0] * t.s + p[2] * t.c + t.z] : p; };
  Geo.prototype.XN = function (n) { var t = this.xf; return t ? [n[0] * t.c + n[2] * t.s, n[1], -n[0] * t.s + n[2] * t.c] : n; };
  Geo.prototype.vert = function (p, n, c, a, m) { this.v.push(p[0], p[1], p[2], n[0], n[1], n[2], c[0], c[1], c[2], a, m); };
  Geo.prototype.quad = function (p, n, col, a, mat) {
    var idx = [0, 1, 2, 0, 2, 3], i;
    for (i = 0; i < 6; i++) this.vert(p[idx[i]], n, col, a, mat);
  };
  // triángulo con normales por vértice; corrige el sentido para que mire hacia afuera
  Geo.prototype.tri = function (p0, p1, p2, n0, n1, n2, col, a, mat) {
    var ux = p1[0] - p0[0], uy = p1[1] - p0[1], uz = p1[2] - p0[2], vx = p2[0] - p0[0], vy = p2[1] - p0[1], vz = p2[2] - p0[2];
    var d = (uy * vz - uz * vy) * (n0[0] + n1[0] + n2[0]) + (uz * vx - ux * vz) * (n0[1] + n1[1] + n2[1]) + (ux * vy - uy * vx) * (n0[2] + n1[2] + n2[2]);
    this.vert(p0, n0, col, a, mat);
    if (d < 0) { this.vert(p2, n2, col, a, mat); this.vert(p1, n1, col, a, mat); }
    else { this.vert(p1, n1, col, a, mat); this.vert(p2, n2, col, a, mat); }
  };
  // caja; o = {mat, top, matTop, a, rot:{px,pz,ang}}
  Geo.prototype.box = function (x0, y0, z0, x1, y1, z1, color, o) {
    o = o || {};
    var t;
    if (x0 > x1) { t = x0; x0 = x1; x1 = t; } if (y0 > y1) { t = y0; y0 = y1; y1 = t; } if (z0 > z1) { t = z0; z0 = z1; z1 = t; }
    var c = hex(color), ct = o.top ? hex(o.top) : c, a = o.a == null ? 1 : o.a, mat = o.mat || 0, r = o.rot, self = this;
    var cs = r ? Math.cos(r.ang) : 1, sn = r ? Math.sin(r.ang) : 0;
    function P(q) { var x = q[0], z = q[2]; if (r) { var dx = x - r.px, dz = z - r.pz; x = r.px + dx * cs + dz * sn; z = r.pz - dx * sn + dz * cs; } return self.X([x, q[1], z]); }
    function N(q) { return self.XN(r ? [q[0] * cs + q[2] * sn, q[1], -q[0] * sn + q[2] * cs] : q); }
    function f(a0, b0, c0, d0, n, col, m) { self.quad([P(a0), P(b0), P(c0), P(d0)], N(n), col, a, m); }
    f([x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1], [1, 0, 0], c, mat);
    f([x0, y0, z1], [x0, y1, z1], [x0, y1, z0], [x0, y0, z0], [-1, 0, 0], c, mat);
    f([x0, y1, z0], [x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [0, 1, 0], ct, o.matTop == null ? mat : o.matTop);
    f([x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], [0, -1, 0], c, mat);
    f([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], [0, 0, 1], c, mat);
    f([x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0], [0, 0, -1], c, mat);
  };
  // caja redondeada (supercuádrica) con sombreado suave: cojines, colchones, loza
  Geo.prototype.rbox = function (x0, y0, z0, x1, y1, z1, color, o) {
    o = o || {};
    var cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, cz = (z0 + z1) / 2, rx = Math.abs(x1 - x0) / 2, ry = Math.abs(y1 - y0) / 2, rz = Math.abs(z1 - z0) / 2;
    var e = o.e || 0.3, nu = o.nu || 16, nv = o.nv || 8, col = hex(color), a = o.a == null ? 1 : o.a, mat = o.mat || 0, self = this;
    function f(v, p) { return (v < 0 ? -1 : 1) * Math.pow(Math.abs(v), p); }
    var P = [], N = [], i, j;
    for (j = 0; j <= nv; j++) {
      var v = -Math.PI / 2 + Math.PI * j / nv, cv = Math.cos(v), sv = Math.sin(v);
      for (i = 0; i <= nu; i++) {
        var u = -Math.PI + 2 * Math.PI * i / nu, cu = Math.cos(u), su = Math.sin(u);
        P.push(self.X([cx + rx * f(cv, e) * f(cu, e), cy + ry * f(sv, e), cz + rz * f(cv, e) * f(su, e)]));
        var nx = f(cv, 2 - e) * f(cu, 2 - e) / rx, ny = f(sv, 2 - e) / ry, nz = f(cv, 2 - e) * f(su, 2 - e) / rz, l = Math.hypot(nx, ny, nz) || 1;
        N.push(self.XN([nx / l, ny / l, nz / l]));
      }
    }
    for (j = 0; j < nv; j++) for (i = 0; i < nu; i++) {
      var k = j * (nu + 1) + i, k1 = k + 1, k2 = k + nu + 2, k3 = k + nu + 1;
      self.tri(P[k], P[k1], P[k2], N[k], N[k1], N[k2], col, a, mat);
      self.tri(P[k], P[k2], P[k3], N[k], N[k2], N[k3], col, a, mat);
    }
  };
  // cilindro o cono truncado vertical (r0 abajo, r1 arriba)
  Geo.prototype.cyl = function (cx, cz, y0, y1, r0, r1, color, o) {
    o = o || {};
    var seg = o.seg || 12, col = hex(color), a = o.a == null ? 1 : o.a, mat = o.mat || 0, self = this, i;
    if (r1 == null) r1 = r0;
    for (i = 0; i < seg; i++) {
      var a0 = 2 * Math.PI * i / seg, a1 = 2 * Math.PI * (i + 1) / seg, c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
      var p0 = self.X([cx + r0 * c0, y0, cz + r0 * s0]), p1 = self.X([cx + r0 * c1, y0, cz + r0 * s1]);
      var p2 = self.X([cx + r1 * c1, y1, cz + r1 * s1]), p3 = self.X([cx + r1 * c0, y1, cz + r1 * s0]);
      var n0 = self.XN([c0, 0, s0]), n1 = self.XN([c1, 0, s1]);
      self.tri(p0, p1, p2, n0, n1, n1, col, a, mat); self.tri(p0, p2, p3, n0, n1, n0, col, a, mat);
      if (o.cap !== false && r1 > 0.001) { var up = [0, 1, 0]; self.tri(self.X([cx, y1, cz]), p3, p2, up, up, up, col, a, mat); }
    }
  };
  // hoja: rombo curvo de doble cara que sale de p0 en dirección d (para plantas)
  Geo.prototype.leaf = function (p0, d, len, wid, color, o) {
    o = o || {};
    var l = Math.hypot(d[0], d[1], d[2]) || 1, dx = d[0] / l, dy = d[1] / l, dz = d[2] / l;
    var sx = -dz, sz = dx, sl = Math.hypot(sx, sz) || 1; sx /= sl; sz /= sl;            // lado (horizontal)
    var nx = sz * dy - 0, ny = dz * sx - dx * sz, nz = -sx * dy; var nl = Math.hypot(nx, ny, nz) || 1; nx /= nl; ny /= nl; nz /= nl;
    if (ny < 0) { nx = -nx; ny = -ny; nz = -nz; }
    var droop = o.droop == null ? 0.25 : o.droop, c = hex(color), self = this, q = function (a, b, s) {   // a: avance, b: lado
      var y = -droop * a * a * len;
      return self.X([p0[0] + dx * a * len + sx * b * wid + nx * s, p0[1] + dy * a * len + y + ny * s, p0[2] + dz * a * len + sz * b * wid + nz * s]);
    };
    var N = this.XN([nx, ny, nz]), M = [-N[0], -N[1], -N[2]], fold = 0.012;
    var P = [q(0, 0, 0), q(0.35, 0.5, fold), q(0.75, 0.32, fold), q(1, 0, 0), q(0.35, -0.5, fold), q(0.75, -0.32, fold), q(0.55, 0, -0.004)];
    [[0, 1, 6], [1, 2, 6], [2, 3, 6], [0, 6, 4], [4, 6, 5], [5, 6, 3]].forEach(function (t) {
      self.tri(P[t[0]], P[t[1]], P[t[2]], N, N, N, c, 1, o.mat || 0);
      self.tri(P[t[0]], P[t[2]], P[t[1]], M, M, M, c, 1, o.mat || 0);
    });
  };
  // huella en el piso (para la sombra de contacto del mueble)
  Geo.prototype.foot = function (x0, z0, x1, z1) { this.occF.push({ t: this.xf, r: [Math.min(x0, x1), Math.min(z0, z1), Math.max(x0, x1), Math.max(z0, z1)] }); };

  var COL = { wall: '#f4f2ed', wallTop: '#3c3a37', frame: '#e6e6e2', grille: '#fbfbfb', door: '#f6f4ee', glass: '#a9cfe0', zoclo: '#cbbfa9',
    wood: '#b3895c', woodDk: '#8a6744', white: '#f4f4f1', steel: '#b9bec2', dark: '#2a2a2c' };

  /* ---------- biblioteca de muebles ----------
     Cada mueble se modela en coordenadas locales: origen al centro, frente hacia +z, y hacia arriba. */
  var LIB = {
    sofa: function (g, gt, o) {
      var w = o.w || 2.0, c = o.color || '#7f8c99', c2 = o.color2 || '#93a0ad', hw = w / 2, n = w > 1.7 ? 3 : 2, i, F = { mat: 7 };
      g.foot(-hw, -0.45, hw, 0.45);
      [[-hw + 0.1, -0.36], [hw - 0.1, -0.36], [-hw + 0.1, 0.36], [hw - 0.1, 0.36]].forEach(function (p) { g.cyl(p[0], p[1], 0, 0.13, 0.014, 0.024, o.patas || '#2a2522', { mat: 6, seg: 10 }); });
      g.rbox(-hw, 0.12, -0.45, hw, 0.33, 0.44, c, { mat: 7, e: 0.12, nu: 20, nv: 6 });                       // base
      g.rbox(-hw + 0.02, 0.26, -0.46, hw - 0.02, 0.8, -0.27, c, { mat: 7, e: 0.18, nu: 20 });                // respaldo
      g.rbox(-hw - 0.005, 0.15, -0.45, -hw + 0.15, 0.6, 0.45, c, { mat: 7, e: 0.2 });                         // brazos delgados
      g.rbox(hw - 0.15, 0.15, -0.45, hw + 0.005, 0.6, 0.45, c, { mat: 7, e: 0.2 });
      var cw = (w - 0.3) / n;
      for (i = 0; i < n; i++) {
        var x0 = -hw + 0.15 + cw * i;
        g.rbox(x0 + 0.008, 0.31, -0.27, x0 + cw - 0.008, 0.45, 0.44, c2, { mat: 7, e: 0.22, nu: 18, nv: 8 });   // cojín del asiento
        g.rbox(x0 + 0.012, 0.42, -0.33, x0 + cw - 0.012, 0.86, -0.13, c2, { mat: 7, e: 0.3, nu: 18, nv: 10 });  // cojín del respaldo
      }
      g.rbox(-hw + 0.17, 0.45, -0.17, -hw + 0.55, 0.8, -0.03, o.accent || '#d9a15e', { mat: 7, e: 0.55 });
      g.rbox(-hw + 0.42, 0.44, -0.12, -hw + 0.72, 0.7, 0.0, '#ece6da', { mat: 7, e: 0.55 });
      g.rbox(hw - 0.55, 0.45, -0.16, hw - 0.17, 0.79, -0.03, '#ece6da', { mat: 7, e: 0.55 });
    },
    mesaCentro: function (g, gt, o) {
      var w = o.w || 0.95, d = o.d || 0.55, hw = w / 2, hd = d / 2, W = { mat: 6 };
      g.foot(-hw, -hd, hw, hd);
      g.rbox(-hw, 0.37, -hd, hw, 0.41, hd, o.color || '#8a6142', { mat: 6, e: 0.06, nu: 20, nv: 4 });
      g.box(-hw + 0.05, 0.12, -hd + 0.05, hw - 0.05, 0.14, hd - 0.05, o.color || '#8a6142', W);
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (s) { g.cyl(s[0] * (hw - 0.06), s[1] * (hd - 0.06), 0, 0.37, 0.012, 0.016, '#232323', { mat: 16, seg: 8 }); });
      g.rbox(-0.24, 0.41, -0.12, 0.02, 0.43, 0.08, '#2d3b45', { e: 0.15, nu: 10, nv: 4 }); g.rbox(-0.22, 0.43, -0.1, 0.0, 0.448, 0.07, '#e9e2d2', { e: 0.15, nu: 10, nv: 4 });  // libros
      g.cyl(0.22, 0.02, 0.41, 0.43, 0.06, 0.11, '#d9d4cb', { seg: 16 });                                      // charola
      g.rbox(0.17, 0.43, -0.02, 0.24, 0.48, 0.05, '#c9a36a', { e: 0.9, nu: 10, nv: 6 });
    },
    tapete: function (g, gt, o) {
      var hw = (o.w || 2) / 2, hd = (o.d || 1.4) / 2;
      g.rbox(-hw, 0.0, -hd, hw, 0.016, hd, o.color || '#d8cdbb', { mat: 7, e: 0.06, nu: 20, nv: 3 });
      g.box(-hw + 0.1, 0.012, -hd + 0.1, hw - 0.1, 0.0165, hd - 0.1, o.color2 || '#c4b59d', { mat: 7 });
    },
    mesa: function (g, gt, o) {
      var hw = (o.w || 0.9) / 2, hd = (o.d || 0.9) / 2, cw = o.color || '#9b6f48';
      g.foot(-hw, -hd, hw, hd);
      g.rbox(-hw, 0.725, -hd, hw, 0.76, hd, cw, { mat: 6, e: 0.05, nu: 24, nv: 4 });
      g.box(-hw + 0.07, 0.66, -hd + 0.07, hw - 0.07, 0.725, hd - 0.07, cw, { mat: 6 });
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (s) { g.cyl(s[0] * (hw - 0.09), s[1] * (hd - 0.09), 0, 0.72, 0.016, 0.028, cw, { mat: 6, seg: 10 }); });
      g.cyl(0, 0, 0.76, 0.81, 0.07, 0.15, '#e9e5dc', { seg: 20 });                                            // frutero
      g.rbox(-0.07, 0.785, -0.06, 0.03, 0.87, 0.04, '#d9793b', { e: 1, nu: 12, nv: 8 });
      g.rbox(0.0, 0.785, 0.0, 0.1, 0.865, 0.09, '#c94f3a', { e: 1, nu: 12, nv: 8 });
      g.rbox(-0.02, 0.785, -0.11, 0.06, 0.86, -0.03, '#d8c25a', { e: 1, nu: 12, nv: 8 });
      if (hw > 0.6) { var vx = hw * 0.55, b; g.cyl(vx, 0, 0.76, 0.98, 0.04, 0.05, '#cfc7b8', { seg: 16 }); g.cyl(vx, 0, 0.98, 1.0, 0.05, 0.03, '#cfc7b8', { seg: 16 });   // florero con ramas
        for (b = 0; b < 7; b++) { var a = b * 0.9; g.cyl(vx, 0, 0.98, 1.2 + 0.05 * (b % 3), 0.004, 0.003, '#6b5a3e', { seg: 4, cap: false }); g.leaf([vx, 1.12 + 0.04 * (b % 3), 0], [Math.cos(a) * 0.7, 0.6, Math.sin(a) * 0.7], 0.14, 0.06, b % 2 ? '#7e9a6a' : '#6c8a5c', { droop: 0.2 }); } }
    },
    silla: function (g, gt, o) {   // silla tapizada tipo parsons, respaldo hacia -z
      var c = o.color || '#e4ded2', lg = o.patas || '#6e4e35';
      g.foot(-0.22, -0.22, 0.22, 0.22);
      [[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]].forEach(function (p) { g.cyl(p[0], p[1], 0, 0.42, 0.012, 0.019, lg, { mat: 6, seg: 10 }); });
      g.rbox(-0.215, 0.4, -0.2, 0.215, 0.5, 0.225, c, { mat: 7, e: 0.2, nu: 16, nv: 6 });                   // asiento
      g.rbox(-0.21, 0.47, -0.235, 0.21, 0.97, -0.16, c, { mat: 7, e: 0.22, nu: 16, nv: 10 });                 // respaldo
      g.rbox(-0.2, 0.5, -0.17, 0.2, 0.92, -0.135, c, { mat: 7, e: 0.4, nu: 14, nv: 8 });                      // acolchado del respaldo
    },
    cama: function (g, gt, o) {
      var w = o.w || 1.4, l = o.l || 1.9, hw = w / 2, hl = l / 2, c = o.color || '#e7e1d4', i, n = Math.max(3, Math.round(w / 0.24));
      g.foot(-hw - 0.06, -hl - 0.08, hw + 0.06, hl + 0.04);
      var cb = o.cabecera || '#8c7b68';
      g.box(-hw - 0.06, 0.08, -hl - 0.09, hw + 0.06, 1.15, -hl - 0.03, cb, { mat: 7 });                       // cabecera tapizada con canales
      for (i = 0; i < n; i++) { var x0 = -hw - 0.06 + (w + 0.12) * i / n; g.rbox(x0 + 0.004, 0.1, -hl - 0.05, x0 + (w + 0.12) / n - 0.004, 1.17, -hl + 0.02, cb, { mat: 7, e: 0.35, nu: 10, nv: 8 }); }
      g.rbox(-hw - 0.02, 0.06, -hl, hw + 0.02, 0.3, hl + 0.02, o.base || cb, { mat: 7, e: 0.1, nu: 16, nv: 4 });  // base tapizada
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (s) { g.cyl(s[0] * (hw - 0.06), s[1] * (hl - 0.06), 0, 0.07, 0.02, 0.025, '#2a2522', { seg: 8 }); });
      g.rbox(-hw + 0.01, 0.28, -hl + 0.01, hw - 0.01, 0.5, hl - 0.01, '#f6f4ef', { mat: 7, e: 0.15 });        // colchón
      g.rbox(-hw - 0.05, 0.3, -hl + 0.55, hw + 0.05, 0.56, hl + 0.05, c, { mat: 7, e: 0.14, nu: 22, nv: 8 });   // edredón que cae a los lados
      g.rbox(-hw - 0.05, 0.47, -hl + 0.5, hw + 0.05, 0.59, -hl + 0.78, '#f8f6f1', { mat: 7, e: 0.4, nu: 20 });   // doblez de la sábana
      var xs = w > 1.2 ? [-w / 4, w / 4] : [0], pw = w > 1.2 ? w / 2 - 0.08 : w - 0.22;
      xs.forEach(function (x) {
        g.rbox(x - pw / 2, 0.48, -hl + 0.04, x + pw / 2, 0.7, -hl + 0.22, '#fbfaf7', { mat: 7, e: 0.6, nu: 16, nv: 8 });   // almohada recargada
        g.rbox(x - pw / 2 + 0.02, 0.48, -hl + 0.2, x + pw / 2 - 0.02, 0.64, -hl + 0.44, '#f3f0ea', { mat: 7, e: 0.6, nu: 16, nv: 8 });
      });
      g.rbox(-0.2, 0.52, -hl + 0.4, 0.2, 0.72, -hl + 0.52, o.cojin || o.manta || '#b9703f', { mat: 7, e: 0.6 });  // cojín decorativo
      if (o.manta !== false) g.rbox(-hw - 0.07, 0.4, hl - 0.6, hw + 0.07, 0.6, hl - 0.14, o.manta || '#b9703f', { mat: 7, e: 0.2, nu: 20, nv: 6 });
    },
    buro: function (g, gt, o) {
      g.foot(-0.22, -0.2, 0.22, 0.2);
      g.box(-0.22, 0.06, -0.2, 0.22, 0.5, 0.2, COL.wood, { mat: 6 });
      g.box(-0.2, 0.3, 0.2, 0.2, 0.47, 0.206, COL.woodDk, { mat: 6 }); g.box(-0.2, 0.1, 0.2, 0.2, 0.27, 0.206, COL.woodDk, { mat: 6 });
      g.box(-0.04, 0.37, 0.206, 0.04, 0.385, 0.22, COL.steel); g.box(-0.04, 0.17, 0.206, 0.04, 0.185, 0.22, COL.steel);
      [[-0.18, -0.16], [0.18, -0.16], [-0.18, 0.16], [0.18, 0.16]].forEach(function (p) { g.cyl(p[0], p[1], 0, 0.06, 0.015, 0.015, COL.dark, { seg: 6 }); });
      if (o.lampara !== false) {
        g.cyl(0, -0.04, 0.5, 0.52, 0.07, 0.07, '#cfc7b8', { seg: 12 });
        g.cyl(0, -0.04, 0.52, 0.74, 0.012, 0.012, '#cfc7b8', { seg: 6 });
        g.cyl(0, -0.04, 0.72, 0.92, 0.13, 0.09, '#fff3d6', { seg: 14, mat: 9 });
      }
    },
    refri: function (g, gt, o) { // espalda en z=0, frente hacia +z; acero inoxidable
      var c = o.color || '#c3c7ca', S = { mat: 16 };
      g.foot(-0.34, 0, 0.34, 0.7);
      g.rbox(-0.34, 0.02, 0, 0.34, 1.8, 0.66, c, { mat: 16, e: 0.06, nu: 20, nv: 6 });
      g.box(-0.335, 1.16, 0.655, 0.335, 1.17, 0.664, '#3a3c3e');                                               // junta entre puertas
      g.box(-0.004, 0.06, 0.655, 0.004, 1.16, 0.664, '#3a3c3e');
      g.box(-0.33, 0.02, 0.6, 0.33, 0.07, 0.66, '#2b2c2e');
      [[0.05, 0.25, 1.1], [-0.05, 0.25, 1.1]].forEach(function (h) { g.cyl(h[0], 0.7, h[1], h[2], 0.012, 0.012, '#d7dadc', { mat: 16, seg: 8 }); g.box(h[0] - 0.008, h[1], 0.66, h[0] + 0.008, h[1] + 0.02, 0.7, '#d7dadc', S); g.box(h[0] - 0.008, h[2] - 0.02, 0.66, h[0] + 0.008, h[2], 0.7, '#d7dadc', S); });
      g.cyl(0.24, 0.7, 1.25, 1.7, 0.012, 0.012, '#d7dadc', { mat: 16, seg: 8 }); g.box(0.232, 1.25, 0.66, 0.248, 1.27, 0.7, '#d7dadc', S); g.box(0.232, 1.68, 0.66, 0.248, 1.7, 0.7, '#d7dadc', S);
    },
    barra: function (g, gt, o) {
      var len = o.len || 2.4, hl = len / 2, d = 0.58, i, n = Math.round(len / 0.45);
      g.foot(-hl, 0, hl, d);
      g.box(-hl, 0, 0.04, hl, 0.1, d - 0.06, '#8d8a84');                                       // zoclo del mueble
      g.box(-hl, 0.1, 0, hl, 0.86, d, o.color || COL.white, { mat: o.mat || 0 });
      g.box(-hl - 0.01, 0.86, -0.0, hl + 0.01, 0.9, d + 0.02, o.cubierta || '#c9c7c2', { mat: 8 });         // cubierta
      if (o.copete !== false) g.box(-hl, 0.9, 0, hl, 1.0, 0.02, o.cubierta || '#c9c7c2', { mat: 8 });                               // copete
      for (i = 0; i <= n; i++) { var x = -hl + len * i / n; g.box(x - 0.003, 0.12, d, x + 0.003, 0.84, d + 0.004, '#c4c4bf'); }
      for (i = 0; i < n; i++) { var xc = -hl + len * (i + 0.5) / n; g.box(xc - 0.05, 0.74, d + 0.004, xc + 0.05, 0.755, d + 0.03, COL.steel); }
      if (o.estufa != null) {
        var ex = o.estufa;
        g.box(ex - 0.3, 0.9, 0.06, ex + 0.3, 0.912, 0.54, '#1d1d1f');
        [[-0.15, 0.18], [0.15, 0.18], [-0.15, 0.42], [0.15, 0.42]].forEach(function (p) {
          g.cyl(ex + p[0], p[1], 0.912, 0.925, 0.075, 0.075, '#3a3a3d', { seg: 14 }); g.cyl(ex + p[0], p[1], 0.925, 0.938, 0.035, 0.035, '#121214', { seg: 10 });
        });
        g.box(ex - 0.3, 1.5, 0, ex + 0.3, 1.58, 0.46, COL.steel, { mat: 16 }); g.box(ex - 0.12, 1.58, 0.02, ex + 0.12, o.campana || 2.1, 0.3, COL.steel, { mat: 16 });   // campana
        if (o.horno) { g.box(ex - 0.3, 0.1, d - 0.01, ex + 0.3, 0.88, d + 0.02, '#b4b9bd', { mat: 16 }); g.box(ex - 0.23, 0.26, d + 0.02, ex + 0.23, 0.62, d + 0.026, '#1b1c1f', { mat: 16 }); g.box(ex - 0.24, 0.69, d + 0.02, ex + 0.24, 0.705, d + 0.06, '#d5d8da', { mat: 16 }); }
      }
      if (o.tarja != null) {
        var tx = o.tarja;
        g.box(tx - 0.27, 0.9, 0.1, tx + 0.27, 0.906, 0.5, COL.steel, { mat: 16 }); g.box(tx - 0.22, 0.86, 0.14, tx + 0.22, 0.903, 0.46, '#777c80');
        g.cyl(tx, 0.07, 0.9, 1.16, 0.014, 0.014, COL.steel, { seg: 8 }); g.box(tx - 0.012, 1.14, 0.07, tx + 0.012, 1.164, 0.24, COL.steel);
      }
      (o.altos || []).forEach(function (a) {                                                   // gabinetes altos [desde, hasta]
        g.box(a[0], 1.5, 0, a[1], 2.1, 0.33, o.colorAltos || o.color || COL.white, { mat: o.colorAltos ? 0 : (o.mat || 0) });
        var m = Math.max(1, Math.round((a[1] - a[0]) / 0.45)), k;
        for (k = 0; k <= m; k++) { var xx = a[0] + (a[1] - a[0]) * k / m; g.box(xx - 0.003, 1.52, 0.33, xx + 0.003, 2.08, 0.334, '#c4c4bf'); }
        for (k = 0; k < m; k++) { var xm = a[0] + (a[1] - a[0]) * (k + 0.5) / m; g.box(xm - 0.04, 1.56, 0.334, xm + 0.04, 1.575, 0.355, COL.steel); }
      });
    },
    wc: function (g, gt, o) { // tanque contra el muro en z=0
      var W = '#f7f7f5';
      g.foot(-0.2, 0, 0.2, 0.7);
      g.rbox(-0.2, 0.42, 0.01, 0.2, 0.8, 0.19, W, { e: 0.12, nu: 16, nv: 6 });                                  // tanque
      g.rbox(-0.21, 0.79, 0.0, 0.21, 0.83, 0.2, W, { e: 0.1, nu: 16, nv: 4 });                                  // tapa del tanque
      g.cyl(0.0, 0.33, 0.0, 0.3, 0.11, 0.14, W, { seg: 20 });                                                  // pie
      g.rbox(-0.18, 0.22, 0.18, 0.18, 0.4, 0.68, W, { e: 0.55, nu: 20, nv: 8 });                               // taza
      g.rbox(-0.185, 0.395, 0.19, 0.185, 0.418, 0.685, '#ffffff', { e: 0.5, nu: 20, nv: 4 });                   // asiento
      g.rbox(-0.18, 0.42, 0.2, 0.18, 0.44, 0.67, '#fbfbfa', { e: 0.5, nu: 20, nv: 4 });                         // tapa
      g.box(-0.035, 0.8, 0.07, 0.035, 0.84, 0.13, COL.steel, { mat: 16 });
    },
    lavabo: function (g, gt, o) {
      g.foot(-0.22, 0, 0.22, 0.42);
      g.cyl(0, 0.2, 0, 0.72, 0.07, 0.09, '#f4f4f1', { seg: 12 });
      g.rbox(-0.24, 0.68, 0.0, 0.24, 0.86, 0.44, '#f7f7f4', { e: 0.6 });
      g.rbox(-0.17, 0.83, 0.08, 0.17, 0.866, 0.38, '#dfe3e3', { e: 0.8, nv: 4 });
      g.cyl(0, 0.05, 0.86, 0.98, 0.012, 0.012, COL.steel, { seg: 8 }); g.box(-0.01, 0.96, 0.05, 0.01, 0.98, 0.16, COL.steel);
      g.box(-0.24, 1.15, 0.0, 0.24, 1.75, 0.015, '#cfe0e6');                                    // espejo
      g.box(-0.26, 1.13, 0.0, 0.26, 1.77, 0.01, '#e9e9e6');
    },
    regadera: function (g, gt, o) { // esquina: charola w x d, cancel de vidrio en el frente
      var w = o.w || 0.9, d = o.d || 1.2;
      g.box(0, 0, 0, w, 0.03, d, '#d9d7d0');
      gt.box(w - 0.012, 0.03, 0, w, 1.95, d * 0.62, COL.glass, { a: 0.2 });
      g.box(w - 0.02, 0.03, d * 0.62 - 0.02, w + 0.005, 1.95, d * 0.62, COL.steel);
      g.box(w - 0.02, 1.93, 0, w + 0.005, 1.96, d * 0.62, COL.steel);
      g.cyl(0.07, d / 2, 1.95, 2.0, 0.012, 0.012, COL.steel, { seg: 6 }); g.box(0.06, 1.98, d / 2 - 0.01, 0.28, 2.0, d / 2 + 0.01, COL.steel);
      g.cyl(0.28, d / 2, 1.93, 1.98, 0.09, 0.03, COL.steel, { seg: 12 });
    },
    // clóset abierto como el de las fotos: torre de repisas blanca, entrepaño y tubos. Espalda en z=0.
    closet: function (g, gt, o) {
      var w = o.w || 1.5, hw = w / 2, d = 0.45, t = 0.2, i;
      g.foot(-t, 0, t, d);
      g.box(-t, 0, 0, -t + 0.018, 1.95, d, COL.white); g.box(t - 0.018, 0, 0, t, 1.95, d, COL.white);
      for (i = 0; i < 5; i++) g.box(-t, 0.06 + i * 0.44, 0, t, 0.078 + i * 0.44, d, COL.white);
      g.box(-hw, 1.93, 0, hw, 1.95, d, COL.white);
      g.box(-hw, 1.62, 0.21, -t, 1.645, 0.235, COL.steel); g.box(t, 1.62, 0.21, hw, 1.645, 0.235, COL.steel);
      g.box(t, 0.9, 0.21, hw, 0.925, 0.235, COL.steel);
      if (o.ropa !== false) {
        ['#6f7f8f', '#c9b79c', '#8a5f4a', '#dcdcd6', '#56626e'].forEach(function (c, k) { g.rbox(-hw + 0.12 + k * 0.1, 1.0, 0.06, -hw + 0.19 + k * 0.1, 1.6, 0.38, c, { mat: 7, e: 0.4, nu: 8, nv: 4 }); });
        g.rbox(-t + 0.04, 0.52, 0.06, t - 0.04, 0.68, 0.38, '#d8cdb9', { mat: 7, e: 0.3, nu: 10, nv: 4 });
        g.rbox(-t + 0.04, 0.96, 0.06, t - 0.04, 1.1, 0.38, '#8fa3b3', { mat: 7, e: 0.3, nu: 10, nv: 4 });
      }
    },
    planta: function (g, gt, o) {   // maceta de cerámica y follaje de hojas
      var h = o.h || 1.2, k, rnd = function (n) { var x = Math.sin(n * 12.9898 + (o.seed || 1) * 78.233) * 43758.5453; return x - Math.floor(x); };
      g.foot(-0.17, -0.17, 0.17, 0.17);
      g.cyl(0, 0, 0, 0.36, 0.12, 0.17, o.maceta || '#d9d3c8', { seg: 20 }); g.cyl(0, 0, 0.36, 0.38, 0.172, 0.172, o.maceta || '#d9d3c8', { seg: 20 });
      g.cyl(0, 0, 0.3, 0.37, 0.155, 0.155, '#3e3226', { seg: 16 });
      var stems = Math.max(4, Math.round(h * 5)), greens = ['#4f7d43', '#5f8f4e', '#6c9a55', '#44703c'];
      for (k = 0; k < stems; k++) {
        var a = k * 2.4 + rnd(k) * 0.8, top = h * (0.55 + 0.45 * rnd(k + 9)), sx = Math.cos(a) * 0.05, sz = Math.sin(a) * 0.05;
        g.cyl(sx, sz, 0.34, top, 0.008, 0.005, '#5d4c33', { seg: 5, cap: false });
        var nl = 4 + Math.round(rnd(k + 3) * 3), j;
        for (j = 0; j < nl; j++) {
          var b = a + j * 2.1 + rnd(k * 7 + j), y = top - j * 0.085 * h, len = 0.2 + 0.12 * rnd(k + j * 5), out = 0.6 + 0.3 * rnd(j + k);
          g.leaf([sx, y, sz], [Math.cos(b) * out, 0.55 + 0.4 * rnd(j * 3 + k), Math.sin(b) * out], len * Math.min(1.3, h), 0.13 * Math.min(1.3, h), greens[(k + j) % 4], { droop: 0.35 });
        }
      }
    },
    plafon: function (g, gt, o) { var y = o.y || 2.5; g.cyl(0, 0, y - 0.05, y - 0.045, 0.17, 0.17, '#fffaf0', { seg: 18, mat: 10 }); g.cyl(0, 0, y - 0.05, y, 0.17, 0.19, '#e4e2dc', { seg: 18, cap: false, mat: 10 }); },
    lavadero: function (g, gt, o) {
      g.foot(-0.4, 0, 0.4, 0.6);
      g.box(-0.4, 0, 0.04, -0.3, 0.6, 0.56, '#bdb8ad'); g.box(0.3, 0, 0.04, 0.4, 0.6, 0.56, '#bdb8ad');
      g.box(-0.42, 0.6, 0, 0.42, 0.86, 0.6, '#cfcac0', { mat: 3 }); g.box(-0.36, 0.84, 0.06, 0.0, 0.865, 0.54, '#8f8c85');
    },
    // escalera recta: arranca en z=0 y sube hacia +z. o = {w, n, alto, huella}
    escalera: function (g, gt, o) {
      var w = o.w || 0.9, n = o.n || 14, H = o.alto || 2.7, run = o.huella || 0.26, r = H / n, i, c = o.color || '#d9c8ae', y0 = o.y0 || 0;
      g.foot(-w / 2, 0, w / 2, n * run);
      for (i = 0; i < n; i++) {
        g.box(-w / 2, y0 ? y0 + i * r - 0.12 : 0, i * run, w / 2, y0 + (i + 1) * r - 0.03, (i + 1) * run, '#ecebe6', { mat: 4 });
        g.box(-w / 2, y0 + (i + 1) * r - 0.03, i * run - 0.015, w / 2, y0 + (i + 1) * r, (i + 1) * run, c, { mat: o.mat == null ? 6 : o.mat });
      }
      if (o.barandal) { var bx = o.barandal > 0 ? w / 2 - 0.03 : -w / 2; for (i = 0; i < n; i += 2) g.box(bx, (i + 1) * r, (i + 0.5) * run - 0.012, bx + 0.03, (i + 1) * r + 0.9, (i + 0.5) * run + 0.012, COL.dark); }
    },
    // hueco de escalera visto en la planta alta: peldaños que bajan y barandal. o = {w, l}
    hueco: function (g, gt, o) {
      var w = o.w || 0.9, l = o.l || 2.6, n = 9, i;
      g.box(-w / 2, 0.002, 0, w / 2, 0.006, l, '#4b4741');
      for (i = 0; i < n; i++) { var k = 1 - i / n; g.box(-w / 2 + 0.02, 0.006, l * i / n + 0.02, w / 2 - 0.02, 0.01, l * (i + 1) / n - 0.02, o.color || '#d9c8ae', { mat: 6 }); g.box(-w / 2 + 0.02, 0.01, l * i / n + 0.02, w / 2 - 0.02, 0.012, l * (i + 1) / n - 0.02 - 0.2 * k, '#3b3833', { a: 1 }); }
      (o.lados || [1]).forEach(function (sd) { var x = sd * (w / 2 + 0.02); g.box(x - 0.02, 0.9, 0, x + 0.02, 0.94, l, COL.dark); for (i = 0; i <= 8; i++) g.box(x - 0.012, 0, l * i / 8 - 0.012, x + 0.012, 0.9, l * i / 8 + 0.012, COL.dark); });
    },
    // pantalla en el muro con mueble bajo. Espalda en z=0.
    tv: function (g, gt, o) {   // pantalla delgada en el muro y mueble bajo flotante. Espalda en z=0.
      var w = o.w || 1.6, c = o.color || COL.white, k;
      g.foot(-w / 2, 0, w / 2, 0.4);
      g.box(-w / 2, 0.2, 0, w / 2, 0.55, 0.4, c, { mat: o.color && o.color !== COL.white ? 6 : 0 });
      for (k = 1; k < 3; k++) { var xs = -w / 2 + w * k / 3; g.box(xs - 0.003, 0.22, 0.4, xs + 0.003, 0.53, 0.404, '#b9b4ab'); }
      g.box(-0.56, 1.06, 0.02, 0.56, 1.7, 0.045, '#101113', { mat: 16 }); g.box(-0.55, 1.07, 0.045, 0.55, 1.69, 0.047, '#1b1f25', { mat: 16 });
      g.rbox(-w / 2 + 0.15, 0.55, 0.12, -w / 2 + 0.3, 0.75, 0.27, '#cfc8bb', { e: 0.8 });                      // jarrón
      g.rbox(w / 2 - 0.45, 0.55, 0.1, w / 2 - 0.15, 0.6, 0.3, '#3a4650', { e: 0.15, nu: 10, nv: 4 });         // libros
    },
    lavadora: function (g, gt, o) {   // lavadora de carga frontal
      g.foot(-0.3, 0, 0.3, 0.62);
      g.rbox(-0.3, 0, 0, 0.3, 0.86, 0.6, '#f2f2ef', { e: 0.08, nu: 16, nv: 6 });
      g.box(-0.29, 0.74, 0.6, 0.29, 0.84, 0.604, '#e1e3e4');
      g.box(-0.26, 0.77, 0.604, -0.08, 0.81, 0.607, '#3d4248'); g.cyl(0.18, 0.605, 0.79, 0.792, 0.025, 0.025, '#9aa0a6', { seg: 12 });
      var cx = 0, cy = 0.42, R = 0.19, k, segs = 24;
      for (k = 0; k < segs; k++) {   // aro y cristal de la puerta, dibujados como gajos
        var a0 = 2 * Math.PI * k / segs, a1 = 2 * Math.PI * (k + 1) / segs, N = g.XN([0, 0, 1]), C = hex('#c9ccce'), G = hex('#3b4752');
        var P = function (a, r, z) { return g.X([cx + Math.cos(a) * r, cy + Math.sin(a) * r, z]); };
        g.tri(P(a0, R, 0.61), P(a1, R, 0.61), P(a1, R * 0.78, 0.615), N, N, N, C, 1, 16); g.tri(P(a0, R, 0.61), P(a1, R * 0.78, 0.615), P(a0, R * 0.78, 0.615), N, N, N, C, 1, 16);
        g.tri(g.X([cx, cy, 0.612]), P(a0, R * 0.78, 0.612), P(a1, R * 0.78, 0.612), N, N, N, G, 1, 16);
      }
    },
    pergola: function (g, gt, o) {
      var w = o.w || 3, d = o.d || 3.5, h = o.alto || 2.4;
      [[-w / 2 + 0.06, 0.06], [w / 2 - 0.06, 0.06]].forEach(function (p) { g.box(p[0] - 0.05, 0, p[1] - 0.05, p[0] + 0.05, h, p[1] + 0.05, o.poste || '#5a4636'); });
      if (o.slats) { // pérgola de duelas: deja pasar el sol en franjas
        g.box(-w / 2, h, 0, -w / 2 + 0.1, h + 0.16, d, o.color || '#2b2b2b', { mat: 11 }); g.box(w / 2 - 0.1, h, 0, w / 2, h + 0.16, d, o.color || '#2b2b2b', { mat: 11 });
        for (var zs = 0.04; zs < d; zs += o.slats) g.box(-w / 2, h + 0.08, zs, w / 2, h + 0.16, zs + 0.05, o.color || '#2b2b2b', { mat: 11 });
      } else g.box(-w / 2, h, 0, w / 2, h + 0.12, d, o.color || '#b5563c', { mat: 11 });
    },
    // clóset de madera de piso a techo: puertas corredizas, repisas y cajonera. Espalda en z=0. o = {w, color}
    closetM: function (g, gt, o) {
      var w = o.w || 2.2, hw = w / 2, d = 0.58, c = o.color || '#5a2a22', c2 = '#4a221c', i, x1 = hw - 0.75;
      g.foot(-hw, 0, hw, d);
      g.box(-hw, 0, 0, x1, 2.05, d, c, { mat: 6 });                                              // puertas corredizas
      g.box((-hw + x1) / 2 - 0.004, 0.05, d, (-hw + x1) / 2 + 0.004, 2.0, d + 0.004, c2);
      g.box(-hw, 2.05, 0, hw, 2.4, d, c, { mat: 6 }); g.box(-hw, 2.04, d, hw, 2.06, d + 0.004, c2); // maletero
      g.box(x1, 0, 0, hw, 0.95, d, c, { mat: 6 });                                               // cajonera
      for (i = 0; i < 4; i++) { g.box(x1 + 0.02, 0.04 + i * 0.23, d, hw - 0.02, 0.045 + i * 0.23, d + 0.004, c2); g.box((x1 + hw) / 2 - 0.12, 0.15 + i * 0.23, d, (x1 + hw) / 2 + 0.12, 0.165 + i * 0.23, d + 0.03, COL.steel); }
      g.box(x1, 0.95, 0, x1 + 0.02, 2.05, d, c, { mat: 6 }); g.box(hw - 0.02, 0.95, 0, hw, 2.05, d, c, { mat: 6 });
      g.box(x1, 0.95, 0, hw, 2.05, 0.02, c, { mat: 6 }); g.box(x1, 1.5, 0, hw, 1.52, d, c, { mat: 6 }); // nicho con repisa
    },
    // tocador con dos lavabos y espejos. Espalda en z=0. o = {w, color}
    tocador: function (g, gt, o) {
      var w = o.w || 1.6, hw = w / 2, c = o.color || '#4a1f1c';
      g.foot(-hw, 0, hw, 0.52);
      g.box(-hw, 0.12, 0, hw, 0.78, 0.5, c, { mat: 6 }); g.box(-hw, 0.78, 0, hw, 0.84, 0.54, '#d9d5cc');
      [-1, 1].forEach(function (s) {
        var x = s * w * 0.25;
        g.rbox(x - 0.22, 0.84, 0.1, x + 0.22, 0.97, 0.46, '#fafaf8', { e: 0.7, nv: 4 }); g.rbox(x - 0.16, 0.93, 0.15, x + 0.16, 0.975, 0.41, '#dfe3e3', { e: 0.8, nv: 4 });
        g.cyl(x, 0.06, 0.84, 1.08, 0.014, 0.014, COL.steel, { seg: 8 }); g.box(x - 0.01, 1.06, 0.06, x + 0.01, 1.08, 0.18, COL.steel);
        g.box(x - 0.2, 1.2, 0, x + 0.2, 1.85, 0.012, '#cfe0e6');
        g.box(x - 0.004, 0.16, 0.5, x + 0.004, 0.74, 0.504, '#2f1412');
      });
    },
    // vestidor abierto de melamina clara, como en las fotos: torre de repisas, tubo para colgar y cajonera. Espalda en z=0. o = {w, color, alto}
    vestidor: function (g, gt, o) {
      var w = o.w || 2.2, hw = w / 2, d = 0.5, c = o.color || '#d9c6a5', bk = '#f1efe9', t = 0.025, H = o.alto || 2.3, i, y, W6 = { mat: 6 }, ST = { mat: 16 };
      var xa = -hw + Math.min(0.55, w * 0.28), xb = hw - Math.min(0.8, w * 0.36);
      g.foot(-hw, 0, hw, d);
      g.box(-hw, 0, 0, hw, H, 0.012, bk);
      [-hw, xa - t / 2, xb - t / 2, hw - t].forEach(function (x) { g.box(x, 0, 0.012, x + t, H, d, c, W6); });
      g.box(-hw, H - t, 0.012, hw, H, d, c, W6); g.box(-hw, 0, 0.012, hw, 0.08, d - 0.03, c, W6);
      for (y = 0.4; y < H - 0.2; y += 0.32) g.box(-hw + t, y, 0.012, xa - t / 2, y + t, d, c, W6);
      g.box(xa + t / 2, H - 0.42, 0.012, xb - t / 2, H - 0.42 + t, d, c, W6);
      g.box(xa + t / 2, H - 0.53, 0.24, xb - t / 2, H - 0.505, 0.265, COL.steel, ST);
      if (xb - xa > 0.5) g.box(xa + t / 2, 1.02, 0.24, xb - t / 2, 1.045, 0.265, COL.steel, ST);
      for (i = 0; i < 4; i++) {
        y = 0.08 + i * 0.23;
        g.box(xb + t / 2, y + 0.008, 0.02, hw - t, y + 0.222, d + 0.012, c, W6);
        g.box((xb + hw) / 2 - 0.16, y + 0.108, d + 0.012, (xb + hw) / 2 + 0.16, y + 0.122, d + 0.04, COL.steel, ST);
      }
      g.box(xb + t / 2, 1.0, 0.012, hw - t, 1.0 + t, d, c, W6);
      for (y = 1.45; y < H - 0.2; y += 0.42) g.box(xb + t / 2, y, 0.012, hw - t, y + t, d, c, W6);
    },
    // tocador flotante con ovalín de sobreponer, cubierta de mármol y espejo. Espalda en z=0. o = {w, color, cubierta, n}
    tocadorF: function (g, gt, o) {
      var w = o.w || 1.0, hw = w / 2, c = o.color || '#d9c6a5', top = o.cubierta || '#d8d1c1', n = o.n || 1, k, m = Math.max(2, Math.round(w / 0.45)), ST = { mat: 16 };
      g.foot(-hw, 0, hw, 0.5);
      g.box(-hw + 0.02, 0.36, 0, hw - 0.02, 0.8, 0.46, c, { mat: 6 });
      g.box(-hw, 0.8, 0, hw, 0.86, 0.5, top, { mat: 8 }); g.box(-hw, 0.86, 0, hw, 0.95, 0.02, top, { mat: 8 });
      for (k = 1; k < m; k++) { var xs = -hw + w * k / m; g.box(xs - 0.003, 0.38, 0.46, xs + 0.003, 0.78, 0.464, '#a8946f'); }
      for (k = 0; k < m; k++) { var xh = -hw + w * (k + 0.5) / m; g.box(xh - 0.008, 0.5, 0.464, xh + 0.008, 0.68, 0.49, COL.steel, ST); }
      for (k = 0; k < n; k++) {
        var x = -hw + w * (k + 0.5) / n;
        g.rbox(x - 0.24, 0.86, 0.1, x + 0.24, 0.99, 0.44, '#f5f3ee', { e: 0.25, nv: 4 }); g.rbox(x - 0.2, 0.965, 0.14, x + 0.2, 0.994, 0.4, '#dcdfde', { e: 0.3, nv: 4 });
        g.cyl(x, 0.06, 0.86, 1.14, 0.014, 0.014, COL.steel, { seg: 8, mat: 16 }); g.box(x - 0.012, 1.12, 0.06, x + 0.012, 1.144, 0.2, COL.steel, ST);
      }
      g.box(-hw + 0.05, 1.2, 0, hw - 0.05, 1.95, 0.014, '#c9d6d9', { mat: 9 });
    },
    boiler: function (g, gt, o) { g.cyl(0, 0.2, 0.9, 1.75, 0.19, 0.19, '#f1f1ee', { seg: 16 }); g.cyl(0, 0.2, 1.75, 1.8, 0.19, 0.05, '#dddcd6', { seg: 16 }); }
  };

  // Zonas techadas de la casa: pisos que tienen plafón encima (más plan.indoor). Las terrazas quedan fuera.
  function indoorRects(plan) {
    if (plan.__in) return plan.__in;
    var fl = plan.floors || [], ce = plan.ceilings || [], r;
    if (!ce.length) r = fl.slice();
    else r = fl.filter(function (f) { var x = (f[0] + f[2]) / 2, z = (f[1] + f[3]) / 2; return ce.some(function (q) { return x > q[0] && x < q[2] && z > q[1] && z < q[3]; }); });
    plan.__in = r = r.concat(plan.indoor || []);
    return r;
  }
  function isIn(list, x, z) { for (var i = 0; i < list.length; i++) { var f = list[i]; if (x > f[0] && x < f[2] && z > f[1] && z < f[3]) return true; } return false; }

  // Muro con vanos. w = {ax:'x'|'z', c, from, to, t, h, out, color, mat, cin, open:[...]}
  // Con plan.wallIn el muro se pinta distinto por dentro que por fuera: color/mat por fuera, wallIn (o cin) por dentro.
  function buildWall(g, gt, w, plan) {
    var FR = w.frame || plan.frame || COL.frame, t = w.t || 0.12, h = w.h || 2.5, ax = w.ax, c = w.c, out = w.out || 1, IN = indoorRects(plan);
    var cOut = w.color || plan.wallOut || COL.wall, cIn = plan.wallIn || null, mOut = w.mat || plan.wallMat || 4, E0 = w.from - t / 2, E1 = w.to + t / 2;
    function inside(u, a) {
      var x = ax === 'x' ? u : c + a, z = ax === 'x' ? c + a : u;
      return (plan.floors || []).some(function (f) { return x > f[0] && x < f[2] && z > f[1] && z < f[3]; });
    }
    function indoor(u, s) { var a = s * (t / 2 + 0.12); return ax === 'x' ? isIn(IN, u, c + a) : isIn(IN, c + a, u); }
    function cin(k) { var v = w.cin; return v ? (typeof v === 'string' ? v : (v[k] || cIn || cOut)) : cIn; }
    function bx(geo, u0, y0, a0, u1, y1, a1, color, o) {
      if (ax === 'x') geo.box(u0, y0, c + a0, u1, y1, c + a1, color, o);
      else geo.box(c + a0, y0, u0, c + a1, y1, u1, color, o);
    }
    function slab(u0, y0, u1, y1, o) {
      o = o || {};
      if (!cIn && !w.cin) { bx(g, u0, y0, -t / 2, u1, y1, t / 2, cOut, { mat: mOut, top: o.top, matTop: o.matTop }); return; }
      var um = (u0 + u1) / 2, ia = indoor(um, -1), ib = indoor(um, 1);
      var ca = ia ? cin(0) : cOut, cb = ib ? cin(1) : cOut, ma = ia ? 4 : mOut, mb = ib ? 4 : mOut;
      if (ca === cb && ma === mb) { bx(g, u0, y0, -t / 2, u1, y1, t / 2, ca, { mat: ma, top: o.top, matTop: o.matTop }); return; }
      // en las esquinas la mitad interior se recorta para que no asome por la fachada
      var i0 = u0 <= E0 + 1e-6 ? u0 + t / 2 + 0.001 : u0, i1 = u1 >= E1 - 1e-6 ? u1 - t / 2 - 0.001 : u1;
      bx(g, ia ? i0 : u0, y0, -t / 2, ia ? i1 : u1, y1, 0, ca, { mat: ma, top: o.top, matTop: o.matTop });
      bx(g, ib ? i0 : u0, y0, 0, ib ? i1 : u1, y1, t / 2, cb, { mat: mb, top: o.top, matTop: o.matTop });
    }
    function solid(u0, y0, u1, y1, o) {
      slab(u0, y0, u1, y1, o);
      if (y0 === 0) {
        var r = ax === 'x' ? [u0, c - t / 2, u1, c + t / 2] : [c - t / 2, u0, c + t / 2, u1];
        g.occW.push(r); if (y1 >= 1.9) g.occL.push(r);
        [-1, 1].forEach(function (s) {               // zoclo solo del lado que da a un cuarto
          if (inside((u0 + u1) / 2, s * (t / 2 + 0.06))) bx(g, u0, 0, s * t / 2, u1, 0.085, s * (t / 2 + 0.012), plan.zoclo || COL.zoclo);
        });
      }
    }
    var ops = (w.open || []).slice().sort(function (a, b) { return a.from - b.from; });
    var u = E0, end = E1, wo = { top: COL.wallTop, matTop: 0 };
    ops.forEach(function (op) {
      var sill = op.sill || 0, head = op.head || 2.1;
      if (op.from > u) solid(u, 0, op.from, h, wo);
      if (head < h) slab(op.from, head, op.to, h, wo);
      if (sill > 0) solid(op.from, 0, op.to, sill, {});
      var k = op.kind;
      if (k === 'window' || k === 'glassdoor') {
        var f = 0.045;
        bx(g, op.from, sill, -0.03, op.from + f, head, 0.03, FR);
        bx(g, op.to - f, sill, -0.03, op.to, head, 0.03, FR);
        bx(g, op.from, head - f, -0.03, op.to, head, 0.03, FR);
        bx(g, op.from, sill, -0.03, op.to, sill + f, 0.03, FR);
        if (op.mid !== false) bx(g, (op.from + op.to) / 2 - 0.02, sill, -0.03, (op.from + op.to) / 2 + 0.02, head, 0.03, FR);
        if (k === 'glassdoor') bx(g, op.from, sill + 0.95, -0.03, op.to, sill + 1.0, 0.03, FR);
        bx(gt, op.from + f, sill + f, -0.008, op.to - f, head - f, 0.008, COL.glass, { a: 0.22 });
        if (op.grille) { // herrería blanca por fuera
          var a0 = out * (t / 2 + 0.02), a1 = out * (t / 2 + 0.04), n, i, s;
          n = Math.max(2, Math.round((op.to - op.from) / 0.17));
          for (i = 0; i <= n; i++) { s = op.from + (op.to - op.from) * i / n; bx(g, s - 0.009, sill, a0, s + 0.009, head, a1, COL.grille); }
          n = Math.max(2, Math.round((head - sill) / 0.21));
          for (i = 0; i <= n; i++) { s = sill + (head - sill) * i / n; bx(g, op.from, s - 0.009, a0, op.to, s + 0.009, a1, COL.grille); }
        }
        if (op.blind) { // persiana tipo zebra por dentro; blind = fracción que está bajada
          var um = (op.from + op.to) / 2, sd = indoor(um, 1) ? 1 : (indoor(um, -1) ? -1 : -out);
          var b0 = sd * (t / 2 + 0.02), b1 = sd * (t / 2 + 0.045), drop = head - (head - sill) * op.blind, y, bc = op.blindColor || '#2a2b2e';
          bx(g, op.from - 0.06, head, sd * t / 2, op.to + 0.06, head + 0.09, sd * (t / 2 + 0.09), op.blindColor ? '#f2f1ee' : '#232427');
          if (op.roller) bx(g, op.from - 0.03, drop, b0, op.to + 0.03, head, b1, bc, { mat: 7 });           // persiana enrollable lisa
          else for (y = head - 0.075; y > drop - 0.07; y -= 0.15) bx(g, op.from - 0.03, Math.max(drop, y), b0, op.to + 0.03, y + 0.075, b1, bc, { mat: 7 });
          if (!op.roller) bx(gt, op.from - 0.03, drop, (b0 + b1) / 2 - 0.002, op.to + 0.03, head, (b0 + b1) / 2 + 0.002, '#4a4b4e', { a: 0.3 });
          bx(g, op.from - 0.03, drop - 0.03, b0, op.to + 0.03, drop, b1, op.blindColor ? '#d9d7d2' : '#232427');
        }
      } else if (k === 'door') {
        var hu = op.hinge === 'to' ? op.to : op.from, wd = op.to - op.from, dir = op.hinge === 'to' ? -1 : 1;
        var rot = ax === 'x' ? { px: hu, pz: c, ang: op.ang || 0 } : { px: c, pz: hu, ang: op.ang || 0 };
        var dc = op.color || COL.door, hx = hu + dir * (wd - 0.08), dm = op.mat || 0, mc = op.marco || '#e9e6de';
        if (ax === 'x') {
          g.box(hu, 0.01, c - 0.02, hu + dir * wd, head - 0.02, c + 0.02, dc, { rot: rot, mat: dm });
          g.box(hx - 0.02, 0.98, c - 0.07, hx + 0.02, 1.02, c + 0.07, COL.steel, { rot: rot, mat: 16 });
        } else {
          g.box(c - 0.02, 0.01, hu, c + 0.02, head - 0.02, hu + dir * wd, dc, { rot: rot, mat: dm });
          g.box(c - 0.07, 0.98, hx - 0.02, c + 0.07, 1.02, hx + 0.02, COL.steel, { rot: rot, mat: 16 });
        }
        bx(g, op.from - 0.03, 0, -t / 2 - 0.012, op.from, head + 0.03, t / 2 + 0.012, mc);   // marco
        bx(g, op.to, 0, -t / 2 - 0.012, op.to + 0.03, head + 0.03, t / 2 + 0.012, mc);
        bx(g, op.from - 0.03, head, -t / 2 - 0.012, op.to + 0.03, head + 0.03, t / 2 + 0.012, mc);
      }
      u = op.to;
    });
    if (end > u) solid(u, 0, end, h, wo);
  }

  function build(plan, withFurn) {
    var g = new Geo(), gt = new Geo();
    (plan.ground || []).forEach(function (q) { g.box(q[0], q[1] - 0.2, q[2], q[3], q[1], q[4], q[5], { mat: q[6] || 0 }); });
    (plan.floors || []).forEach(function (q) { // [x0,z0,x1,z1,color,mat]
      g.quad([[q[0], 0, q[1]], [q[0], 0, q[3]], [q[2], 0, q[3]], [q[2], 0, q[1]]], [0, 1, 0], hex(q[4] || '#d9d2c4'), 1, q[5] == null ? 1 : q[5]);
    });
    (plan.ceilings || []).forEach(function (q) { // [x0,z0,x1,z1,y] visible solo desde adentro
      var y = q[4] || 2.5;
      g.quad([[q[0], y, q[1]], [q[2], y, q[1]], [q[2], y, q[3]], [q[0], y, q[3]]], [0, -1, 0], hex('#fbfaf7'), 1, 5);
    });
    (plan.walls || []).forEach(function (w) { buildWall(g, gt, w, plan); });
    (plan.boxes || []).forEach(function (b) { // [x0,y0,z0,x1,y1,z1,color,opts]
      var o = b[7] || {};
      if (o.furn && !withFurn) return;
      (o.a != null && o.a < 1 ? gt : g).box(b[0], b[1], b[2], b[3], b[4], b[5], b[6], o);
    });
    (plan.items || []).forEach(function (it) { // [tipo, x, z, ángulo, opciones]; opciones.s = mueble sugerido
      var o = it[4] || {};
      if (o.s && !withFurn) return;
      g.push(it[1], it[2], it[3]); gt.xf = g.xf;
      LIB[it[0]](g, gt, o);
      g.pop(); gt.xf = null;
    });
    return { solid: new Float32Array(g.v), glass: new Float32Array(gt.v), ao: bakeAO(plan, g) };
  }

  /* Textura vista desde arriba: R cercanía a muros, G sombra de contacto de muebles, B zona techada, A luz que entra por las ventanas */
  var AW = 256, AH = 512, LW = 64, LH = 128;
  function bakeLight(plan, g, x0, z0, x1, z1) {
    var IN = indoorRects(plan), sx = AW / (x1 - x0), sz = AH / (z1 - z0), O = new Uint8Array(AW * AH), i, j, k, src = [];
    g.occL.forEach(function (r) {
      var i0 = Math.max(0, Math.floor((r[0] - x0) * sx)), i1 = Math.min(AW, Math.ceil((r[2] - x0) * sx)), j0 = Math.max(0, Math.floor((r[1] - z0) * sz)), j1 = Math.min(AH, Math.ceil((r[3] - z0) * sz)), a, b;
      for (b = j0; b < j1; b++) for (a = i0; a < i1; a++) O[b * AW + a] = 1;
    });
    (plan.walls || []).forEach(function (w) {
      if ((w.h || 2.5) < 2) return;
      var t = w.t || 0.12;
      (w.open || []).forEach(function (op) {
        if (op.kind !== 'window' && op.kind !== 'glassdoor' && !op.light) return;
        var wd = op.to - op.from, hh = (op.head || 2.1) - (op.sill || 0), n = Math.max(1, Math.round(wd / 0.5)), q, s, um = (op.from + op.to) / 2;
        var area = wd * hh / n * (op.blind ? 1 - 0.55 * op.blind : 1);
        for (s = -1; s <= 1; s += 2) {
          var a = s * (t / 2 + 0.3), pin = w.ax === 'x' ? isIn(IN, um, w.c + a) : isIn(IN, w.c + a, um), pout = w.ax === 'x' ? isIn(IN, um, w.c - a) : isIn(IN, w.c - a, um);
          if (!pin || pout) continue;
          for (q = 0; q < n; q++) { var u = op.from + wd * (q + 0.5) / n, off = s * (t / 2 + 0.05); src.push(w.ax === 'x' ? [u, w.c + off, 0, s, area] : [w.c + off, u, s, 0, area]); }
        }
      });
    });
    var L = new Float32Array(LW * LH), M = new Uint8Array(LW * LH), cx = (x1 - x0) / LW, cz = (z1 - z0) / LH, tot = 0, cnt = 0;
    for (j = 0; j < LH; j++) for (i = 0; i < LW; i++) {
      var x = x0 + (i + 0.5) * cx, z = z0 + (j + 0.5) * cz, sum = 0;
      if (!isIn(IN, x, z)) continue;
      M[j * LW + i] = 1;
      for (k = 0; k < src.length; k++) {
        var s0 = src[k], dx = x - s0[0], dz = z - s0[1], d2 = dx * dx + dz * dz;
        if (d2 > 121) continue;
        var d = Math.sqrt(d2) || 0.01, cs = (dx * s0[2] + dz * s0[3]) / d;
        if (cs <= 0.03) continue;
        var st = Math.ceil(d / 0.07), vis = 1, m;
        for (m = 1; m < st; m++) {
          var ii = Math.floor((s0[0] + dx * m / st - x0) * sx), jj = Math.floor((s0[1] + dz * m / st - z0) * sz);
          if (O[jj * AW + ii]) { vis = 0; break; }
        }
        if (vis) sum += s0[4] * (0.3 + 0.7 * cs) / (2.0 + 0.45 * d2);
      }
      L[j * LW + i] = 1 - Math.exp(-1.25 * sum); tot += L[j * LW + i]; cnt++;
    }
    // luz rebotada: desenfoque amplio dentro de la casa, más un poco del promedio general
    var B2 = new Float32Array(LW * LH), rad = 5, p;
    for (p = 0; p < 2; p++) {
      var srcA = p ? B2 : L, tmp = new Float32Array(LW * LH);
      for (j = 0; j < LH; j++) for (i = 0; i < LW; i++) { var s1 = 0, n1 = 0; for (k = -rad; k <= rad; k++) { var a1 = i + k; if (a1 < 0 || a1 >= LW || !M[j * LW + a1]) continue; s1 += srcA[j * LW + a1]; n1++; } tmp[j * LW + i] = n1 ? s1 / n1 : 0; }
      for (j = 0; j < LH; j++) for (i = 0; i < LW; i++) { var s2 = 0, n2 = 0; for (k = -rad; k <= rad; k++) { var b1 = j + k; if (b1 < 0 || b1 >= LH || !M[b1 * LW + i]) continue; s2 += tmp[b1 * LW + i]; n2++; } B2[j * LW + i] = n2 ? s2 / n2 : 0; }
    }
    var avg = cnt ? tot / cnt : 0;
    for (k = 0; k < LW * LH; k++) L[k] = M[k] ? Math.min(1, 0.62 * L[k] + 0.5 * B2[k] + 0.25 * avg) : -1;
    // los bordes (muros) toman la luz del cuarto vecino para que la interpolación no los oscurezca
    var L2 = new Float32Array(L);
    for (j = 0; j < LH; j++) for (i = 0; i < LW; i++) if (L[j * LW + i] < 0) {
      var s3 = 0, n3 = 0, di, dj;
      for (dj = -2; dj <= 2; dj++) for (di = -2; di <= 2; di++) { var a2 = i + di, b2 = j + dj; if (a2 < 0 || b2 < 0 || a2 >= LW || b2 >= LH) continue; var v = L[b2 * LW + a2]; if (v >= 0) { s3 += v; n3++; } }
      L2[j * LW + i] = n3 ? s3 / n3 : avg;
    }
    return L2;
  }
  function bakeAO(plan, g) {
    var x0 = 1e9, z0 = 1e9, x1 = -1e9, z1 = -1e9;
    (plan.floors || []).forEach(function (f) { x0 = Math.min(x0, f[0]); z0 = Math.min(z0, f[1]); x1 = Math.max(x1, f[2]); z1 = Math.max(z1, f[3]); });
    x0 -= 2.5; z0 -= 2.5; x1 += 2.5; z1 += 2.5;
    var sx = AW / (x1 - x0), sz = AH / (z1 - z0), R = new Float32Array(AW * AH), G = new Float32Array(AW * AH), B = new Float32Array(AW * AH);
    function rect(arr, r) {
      var i0 = Math.max(0, Math.floor((r[0] - x0) * sx)), i1 = Math.min(AW - 1, Math.ceil((r[2] - x0) * sx)), j0 = Math.max(0, Math.floor((r[1] - z0) * sz)), j1 = Math.min(AH - 1, Math.ceil((r[3] - z0) * sz)), i, j;
      for (j = j0; j < j1; j++) for (i = i0; i < i1; i++) arr[j * AW + i] = 1;
    }
    g.occW.forEach(function (r) { rect(R, r); });
    indoorRects(plan).forEach(function (f) { rect(B, f); });
    g.occF.forEach(function (o) {
      var t = o.t, r = o.r, i, j;
      for (j = 0; j < AH; j++) for (i = 0; i < AW; i++) {
        var x = x0 + (i + 0.5) / sx, z = z0 + (j + 0.5) / sz, lx = x, lz = z;
        if (t) { var dx = x - t.x, dz = z - t.z; if (Math.abs(dx) > 3 || Math.abs(dz) > 3) continue; lx = dx * t.c - dz * t.s; lz = dx * t.s + dz * t.c; }
        if (lx > r[0] && lx < r[2] && lz > r[1] && lz < r[3]) G[j * AW + i] = 1;
      }
    });
    function blur(a, rad) { // desenfoque de caja separable, dos pasadas
      var rx = Math.max(1, Math.round(rad * sx)), rz = Math.max(1, Math.round(rad * sz)), tmp = new Float32Array(AW * AH), p, i, j, k, s;
      for (p = 0; p < 2; p++) {
        for (j = 0; j < AH; j++) for (i = 0; i < AW; i++) { s = 0; for (k = -rx; k <= rx; k++) { var ii = Math.min(AW - 1, Math.max(0, i + k)); s += a[j * AW + ii]; } tmp[j * AW + i] = s / (2 * rx + 1); }
        for (j = 0; j < AH; j++) for (i = 0; i < AW; i++) { s = 0; for (k = -rz; k <= rz; k++) { var jj = Math.min(AH - 1, Math.max(0, j + k)); s += tmp[jj * AW + i]; } a[j * AW + i] = s / (2 * rz + 1); }
      }
    }
    var Lt = plan.__wl || (plan.__wl = bakeLight(plan, g, x0, z0, x1, z1));
    blur(R, 0.12); blur(G, 0.1);
    var px = new Uint8Array(AW * AH * 4), n, i, j;
    for (j = 0; j < AH; j++) for (i = 0; i < AW; i++) {
      n = j * AW + i;
      var fx = Math.min(LW - 1.001, Math.max(0, (i + 0.5) * LW / AW - 0.5)), fz = Math.min(LH - 1.001, Math.max(0, (j + 0.5) * LH / AH - 0.5)), ix = Math.floor(fx), iz = Math.floor(fz), tx = fx - ix, tz = fz - iz;
      var l = (Lt[iz * LW + ix] * (1 - tx) + Lt[iz * LW + ix + 1] * tx) * (1 - tz) + (Lt[(iz + 1) * LW + ix] * (1 - tx) + Lt[(iz + 1) * LW + ix + 1] * tx) * tz;
      px[n * 4] = Math.min(255, R[n] * 255); px[n * 4 + 1] = Math.min(255, G[n] * 255); px[n * 4 + 2] = B[n] * 255; px[n * 4 + 3] = Math.max(0, Math.min(255, l * 255));
    }
    return { px: px, b: [x0, z0, 1 / (x1 - x0), 1 / (z1 - z0)] };
  }

  /* ---------- shaders ---------- */
  var VS = [
    'attribute vec3 aP;attribute vec3 aN;attribute vec4 aC;attribute float aM;uniform mat4 uVP;uniform mat4 uLVP;',
    'varying vec3 vP;varying vec3 vN;varying vec4 vC;varying float vM;varying vec4 vS;',
    'void main(){vP=aP;vN=aN;vC=aC;vM=aM;vS=uLVP*vec4(aP+aN*0.035,1.0);gl_Position=uVP*vec4(aP,1.0);}'].join('\n');
  var FS = [
    '#ifdef GL_FRAGMENT_PRECISION_HIGH', 'precision highp float;', '#else', 'precision mediump float;', '#endif',
    'varying vec3 vP;varying vec3 vN;varying vec4 vC;varying float vM;varying vec4 vS;',
    'uniform vec3 uL;uniform vec3 uE;uniform vec3 uSky;uniform sampler2D uSh;uniform sampler2D uAo;uniform sampler2D uRf;uniform vec4 uAoB;',
    'uniform float uRoof;uniform float uTx;uniform float uShOn;uniform vec4 uFx;uniform vec2 uRes;',   // uFx: tamaño de loseta, brillo del piso, pasada de reflejo
    'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
    'float vn(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(h(i),h(i+vec2(1.0,0.0)),f.x),mix(h(i+vec2(0.0,1.0)),h(i+vec2(1.0,1.0)),f.x),f.y);}',
    'float fbm(vec2 p){return 0.5*vn(p)+0.3*vn(p*2.13+7.3)+0.2*vn(p*4.31+1.7);}',
    'float unpack(vec4 c){return dot(c,vec4(1.0,1.0/255.0,1.0/65025.0,1.0/16581375.0));}',
    'float shadow(){if(uShOn<0.5)return 1.0;vec3 p=vS.xyz/vS.w*0.5+0.5;',
    ' if(p.x<0.0||p.x>1.0||p.y<0.0||p.y>1.0||p.z>1.0)return 1.0;float s=0.0;',
    ' for(int i=0;i<4;i++){for(int j=0;j<4;j++){vec2 o=(vec2(float(i),float(j))-1.5)*uTx*1.35;',
    '  s+=step(p.z-0.0010,unpack(texture2D(uSh,p.xy+o)));}}return s/16.0;}',
    'void main(){vec3 n=normalize(vN);vec3 c=vC.rgb;float m=vM;float dist=distance(uE,vP);float up=0.0;',
    ' if(m>19.5){if(uRoof<0.5)discard;up=1.0;m-=20.0;}',
    ' else if(m>9.5&&m<11.5){if(uRoof<0.5)discard;if(m>10.5){up=1.0;m=4.0;}}',
    ' if(uFx.z>0.5&&vP.y<0.02)discard;',
    ' if(m>8.5&&m<10.5){gl_FragColor=vec4(c,vC.a);return;}',
    ' vec3 V=normalize(uE-vP);float nv=max(dot(V,n),0.0);float fr=pow(1.0-nv,4.0);float sheen=0.0;float spec=0.0;float rf=0.0;',
    ' float far=1.0-smoothstep(9.0,28.0,dist);float hz=step(0.5,abs(n.y));',
    ' vec2 qv=hz>0.5?vP.xz:vec2(vP.x+vP.z,vP.y);',
    ' if(m<0.5&&n.y>0.5&&vP.y<-0.035){vec2 q=vP.xz;c*=0.9+0.07*vn(q*1.3)+0.1*far*h(floor(q*95.0))+0.05*vn(q*13.0);}',   // asfalto y suelo
    ' else if(m>0.5&&m<1.5){float ts=uFx.x;vec2 g=vP.xz/ts;vec2 f=fract(g);vec2 id=floor(g);',                       // porcelanato
    '  float e=min(min(f.x,1.0-f.x),min(f.y,1.0-f.y))*ts;float fp=dist*0.0016/max(nv,0.12);float j=smoothstep(0.001,0.004+fp,e);float jk=clamp(0.0045/fp,0.0,1.0);float r=h(id);',
    '  vec2 w=(r>0.5?f.xy:f.yx)+id*3.7;float ve=fbm(vec2(w.x*1.6+fbm(w*2.6)*1.7,w.y*5.5));',
    '  c*=0.95+0.035*r+0.085*(ve-0.5)*(0.4+0.6*far);c*=mix(1.0,mix(0.72,1.0,j),jk);rf=0.4+0.6*j;sheen=0.05*fr;',
    '  if(uFx.w>0.0){vec2 q=vec2(dot(vP.xz,vec2(0.55,0.42)),dot(vP.xz,vec2(-0.9,1.2)))+r*5.0;float mv=fbm(q*vec2(0.8,2.2)+fbm(q*0.7)*1.6);float dv=abs(mv-0.5);float vl=1.0-smoothstep(0.0,0.008+dist*0.0015,dv);float v2=1.0-smoothstep(0.0,0.006,abs(fbm(q*3.1+3.0)-0.5));c*=1.0-uFx.w*(0.14*vl+0.06*v2+0.025*(1.0-smoothstep(0.0,0.08,dv)))*(0.4+0.6*far);}}',
    ' else if(m>1.5&&m<2.5){float nr=1.0-clamp(dist/16.0,0.0,1.0);c*=0.78+0.22*vn(vP.xz*0.55)+0.16*vn(vP.xz*5.0)+0.16*nr*vn(vP.xz*38.0)+0.10*nr*h(floor(vP.xz*170.0));c.r*=0.92+0.16*vn(vP.zx*1.7);}',   // pasto
    ' else if(m>2.5&&m<3.5){vec2 g=vP.xz/1.5;vec2 f=fract(g);float e=min(min(f.x,1.0-f.x),min(f.y,1.0-f.y))*1.5;float fp=dist*0.0012/max(nv,0.15);',  // concreto: juntas, manchas y poro
    '  c*=mix(1.0,mix(0.84,1.0,smoothstep(0.003,0.008+fp,e)),hz);float st=fbm(qv*0.45+3.1);',
    '  c*=0.9+0.15*st+0.05*vn(qv*3.0)+0.05*far*(vn(qv*40.0)-0.5)+0.035*far*(h(floor(qv*260.0))-0.5);sheen=0.025*fr;}',
    ' else if(m>3.5&&m<5.5){c*=0.975+0.03*vn(qv*14.0)+0.02*far*vn(qv*120.0);}',                                 // pintura de muro y plafón
    ' else if(m>5.5&&m<6.5){vec2 q=hz>0.5?vP.xz:vec2(vP.y,vP.x+vP.z);',                                         // madera: veta a lo largo
    '  float wv=fbm(vec2(q.x*1.2,q.y*34.0)+fbm(q*vec2(0.6,3.5))*2.4);float st=vn(vec2(q.x*5.0,q.y*240.0));',
    '  c*=0.86+(0.26*(wv-0.5)+0.07*(st-0.5))*(0.35+0.65*far)+0.03;sheen=0.07*fr;}',
    ' else if(m>6.5&&m<7.5){vec2 q=hz>0.5?vP.xz:vec2(vP.x+vP.z,vP.y);c*=0.97+0.035*vn(q*7.0)+0.035*far*(vn(q*85.0)-0.5)+0.02*far*sin(q.x*900.0)*sin(q.y*900.0);sheen=0.09*fr;}',                        // tela
    ' else if(m>7.5&&m<8.5){vec2 q=vP.xz+vP.yy*1.3;c*=0.80+0.14*vn(q*55.0)+0.12*far*h(floor(q*300.0))+0.08*vn(q*9.0);sheen=0.2*fr;spec=0.25*pow(max(dot(reflect(-V,n),uL),0.0),40.0);}', // granito
    ' else if(m>11.5&&m<12.5){float rh=0.17;float row=floor(qv.y/rh);float bw=0.36+0.34*h(vec2(row,9.0));float bx=(qv.x+h(vec2(row,3.0))*0.7)/bw;',   // piedra en hiladas
    '  vec2 f=vec2(fract(bx)*bw,fract(qv.y/rh)*rh);float e=min(min(f.x,bw-f.x),min(f.y,rh-f.y));float r=h(vec2(floor(bx),row));',
    '  c*=mix(1.0,(0.70+0.52*r*r+0.14*(vn(qv*26.0)-0.5))*mix(0.5,1.0,smoothstep(0.0,0.01,e)),0.3+0.7*far);}',
    ' else if(m>12.5&&m<13.5){float pw=0.2;float pl=1.2;float cl=floor(vP.x/pw);float zz=vP.z+h(vec2(cl,1.0))*pl;float r=h(vec2(cl,floor(zz/pl)));',  // duela de porcelanato
    '  vec2 f=vec2(fract(vP.x/pw)*pw,fract(zz/pl)*pl);float e=min(min(f.x,pw-f.x),min(f.y,pl-f.y));',
    '  float gr=fbm(vec2(zz*1.4+r*20.0,vP.x*42.0)+fbm(vec2(zz*0.8,vP.x*5.0)+r*9.0)*2.2);',
    '  c*=mix(1.0,(0.72+0.34*r+0.42*(gr-0.5))*mix(0.55,1.0,smoothstep(0.0,0.006,e)),0.3+0.7*far);sheen=0.06*fr;}',
    ' else if(m>13.5&&m<14.5){c*=0.95+0.055*(vn(qv*38.0)-0.5)*far+0.035*(vn(qv*150.0)-0.5)*far+0.04*vn(qv*2.2);}', // estuco
    ' else if(m>14.5&&m<15.5){float ph=0.105;float row=floor(vP.z/ph);float xx=vP.x+mod(row,2.0)*ph;',          // adoquín
    '  vec2 f=vec2(fract(xx/0.21)*0.21,fract(vP.z/ph)*ph);float e=min(min(f.x,0.21-f.x),min(f.y,ph-f.y));',
    '  c*=mix(1.0,(0.84+0.26*h(vec2(floor(xx/0.21),row)))*mix(0.66,1.0,smoothstep(0.0,0.007,e)),far);c*=0.94+0.1*vn(vP.xz*0.9);}',
    ' else if(m>15.5&&m<16.5){vec3 R=reflect(-V,n);c*=0.66+0.55*smoothstep(-0.4,0.9,R.y);spec=0.5*pow(max(dot(R,uL),0.0),22.0);sheen=0.14*fr;}', // acero y espejo
    ' else if(m>16.5&&m<17.5){vec2 g=vec2(qv.x/0.3,qv.y/0.6);vec2 f=fract(g);float e=min(min(f.x,1.0-f.x)*0.3,min(f.y,1.0-f.y)*0.6);',   // azulejo de muro
    '  c*=0.95+0.07*h(floor(g))+0.05*(fbm(qv*5.0)-0.5);c*=mix(1.0,mix(0.74,1.0,smoothstep(0.0,0.006,e)),0.3+0.7*far);sheen=0.12*fr;}',
    ' else if(m>17.5&&m<18.5){float ve=fbm(qv*3.0+fbm(qv*1.3)*3.0);c*=0.93+0.1*(ve-0.5)-0.1*smoothstep(0.46,0.5,ve)*(1.0-smoothstep(0.5,0.54,ve));sheen=0.2*fr;}', // mármol
    ' else if(m>18.5&&m<19.5){float rh=0.4;float row=floor(qv.y/rh);float bx=(qv.x+mod(row,2.0)*0.3)/0.6;',   // cantera en placas
    '  vec2 f=vec2(fract(bx)*0.6,fract(qv.y/rh)*rh);float e=min(min(f.x,0.6-f.x),min(f.y,rh-f.y));float r=h(vec2(floor(bx),row));',
    '  c*=mix(1.0,(0.9+0.16*r+0.07*(fbm(qv*7.0)-0.5))*mix(0.7,1.0,smoothstep(0.0,0.008,e)),0.3+0.7*far);}',
    ' vec4 A0=texture2D(uAo,(vP.xz-uAoB.xy)*uAoB.zw);vec3 a0=A0.rgb;vec4 A1=texture2D(uAo,(vP.xz+n.xz*0.22-uAoB.xy)*uAoB.zw);float ao=1.0;',
    ' if(n.y>0.5){ao=1.0-0.44*a0.r-0.52*a0.g*step(vP.y,0.03);}',
    ' else if(n.y<-0.5){ao=1.0-0.34*a0.r;}',
    ' else{ao=1.0-0.42*A1.r-0.32*A1.g*(1.0-smoothstep(0.0,0.75,vP.y));ao*=mix(0.86,1.0,smoothstep(0.0,0.3,vP.y));',
    '  ao*=mix(1.0,0.9,smoothstep(2.05,2.5,vP.y)*uRoof*a0.b);}',
    ' ao=mix(ao,1.0,up);float sh=shadow();if(n.y<0.5)sh*=1.0-smoothstep(2.2,2.4,vP.y)*uRoof*a0.b*(1.0-up);float nl=max(dot(n,uL),0.0);float hemi=0.5+0.5*n.y;',
    ' float side=0.5+0.5*dot(n,vec3(-0.55,0.0,0.83));',
    ' float ind=mix(A1.b,A0.b,hz)*uRoof*(1.0-up);float wl=mix(A1.a,A0.a,hz);',
    ' vec3 al=pow(c,vec3(2.2));',
    ' vec3 ambO=mix(vec3(0.30,0.31,0.35),vec3(0.45,0.48,0.54),hemi)*(0.82+0.18*side);',                         // cielo
    ' vec3 ambI=vec3(1.02,0.965,0.88)*(0.50+0.78*wl)*(0.86+0.14*hemi)*(0.93+0.07*side);',                        // interior: manda la luz de las ventanas
    ' vec3 col=al*(mix(ambO,ambI,ind)*ao*ao+vec3(1.02,0.92,0.76)*nl*sh*mix(1.0,1.5,ind));',
    ' col+=spec*sh*vec3(1.2,1.1,0.95)+sheen*(0.3+0.7*sh);',
    ' col=mix(col,0.55+0.45*(1.0-exp(-(col-0.55)/0.45)),step(0.55,col));col=pow(col,vec3(0.4545));col=mix(col,col*col*(3.0-2.0*col),0.18);float lu=dot(col,vec3(0.3,0.59,0.11));col=mix(vec3(lu),col,1.05);',                                               // mapeo de tonos y gamma
    ' if(uFx.z<0.5&&uFx.y>0.0&&rf>0.0&&n.y>0.5&&abs(vP.y)<0.02){vec2 uv=gl_FragCoord.xy*uRes;',                 // reflejo en el piso
    '  vec3 r=texture2D(uRf,uv).rgb*0.3+texture2D(uRf,uv+vec2(0.0,2.5)*uRes).rgb*0.2+texture2D(uRf,uv-vec2(0.0,2.5)*uRes).rgb*0.2',
    '   +texture2D(uRf,uv+vec2(1.5,5.5)*uRes).rgb*0.15+texture2D(uRf,uv-vec2(1.5,5.5)*uRes).rgb*0.15;',
    '  col=mix(col,r,clamp((0.03+0.62*fr)*rf*uFx.y,0.0,0.7));}',
    ' float al2=vC.a;if(al2<0.9){vec3 Rg=reflect(-V,n);float sk=smoothstep(-0.25,0.65,Rg.y);float fx=smoothstep(3.5,9.0,dist);',   // vidrio: de lejos refleja el cielo y se ve oscuro como en las fotos
    '  vec3 rc=mix(vec3(0.15,0.17,0.19),mix(uSky,vec3(0.56,0.66,0.78),0.45),sk);col=mix(col,rc,(0.25+0.5*fx)*(0.55+0.45*fr));',
    '  col+=vec3(1.0,0.96,0.88)*pow(max(dot(Rg,uL),0.0),60.0)*0.6*sh;al2=min(0.93,al2+0.3*fr+0.55*fx);}',
    ' col=mix(col,uSky,smoothstep(24.0,60.0,dist));',
    ' if(uFx.z<0.5){vec2 sc=gl_FragCoord.xy*uRes-0.5;col*=1.0-0.2*dot(sc,sc);}',                               // viñeta suave de lente
    ' gl_FragColor=vec4(col,al2);}'].join('\n');
  var VS2 = 'attribute vec3 aP;attribute float aM;uniform mat4 uLVP;uniform float uRoof;' +
    'void main(){if(((aM>9.5&&aM<11.5)||aM>19.5||(aM>4.5&&aM<5.5))&&uRoof<0.5){gl_Position=vec4(2.0,2.0,2.0,1.0);}else{gl_Position=uLVP*vec4(aP,1.0);}}';
  var FS2 = '#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n' +
    'void main(){float d=gl_FragCoord.z;vec4 e=fract(d*vec4(1.0,255.0,65025.0,16581375.0));e-=e.yzww*vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);gl_FragColor=e;}';

  var VS3 = 'attribute vec2 aQ;varying vec2 vQ;void main(){vQ=aQ;gl_Position=vec4(aQ,0.0,1.0);}';
  var FS3 = '#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n' +
    'varying vec2 vQ;uniform vec3 uH;uniform vec3 uZ;uniform vec2 uK;uniform vec2 uC;' +
    'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}' +
    'float vn(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(h(i),h(i+vec2(1.0,0.0)),f.x),mix(h(i+vec2(0.0,1.0)),h(i+vec2(1.0,1.0)),f.x),f.y);}' +
    'float fbm(vec2 p){return 0.5*vn(p)+0.27*vn(p*2.13+7.3)+0.15*vn(p*4.31+1.7)+0.08*vn(p*8.7+4.1);}' +
    'void main(){float t=(vQ.y-uK.x)*uK.y;vec3 c=mix(uH,uZ,smoothstep(0.0,0.75,t));' +
    ' if(t>0.015){float az=uC.x-atan(vQ.x*uC.y);vec2 p=vec2(sin(az),cos(az))/(t+0.16)*0.62+vec2(3.7,1.9);' +
    '  float k=smoothstep(0.50,0.74,fbm(p))*smoothstep(0.015,0.2,t);c=mix(c,vec3(1.0,1.0,0.99),k*0.82);}' +
    ' c*=1.0-0.05*dot(vQ,vQ);gl_FragColor=vec4(c,1.0);}';

  var MIRROR = new Float32Array([-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]); // el plano se dibuja como se ve desde la calle
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  /* ---------- visor ---------- */
  function GRVisor(canvas, plan, hooks) {
    hooks = hooks || {};
    var gl = canvas.getContext('webgl', { antialias: true, alpha: false }) || canvas.getContext('experimental-webgl');
    if (!gl) { if (hooks.onFail) hooks.onFail(); return null; }

    function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }
    function prog(vs, fs) {
      var p = gl.createProgram(); gl.attachShader(p, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
      return p;
    }
    var pr, pr2, pr3;
    try { pr = prog(VS, FS); pr2 = prog(VS2, FS2); pr3 = prog(VS3, FS3); } catch (err) { if (window.console) console.error(err); if (hooks.onFail) hooks.onFail(); return null; }
    function U(p, names) { var o = {}; names.forEach(function (n) { o[n] = gl.getUniformLocation(p, n); }); return o; }
    function A(p, names) { var o = {}; names.forEach(function (n) { o[n] = gl.getAttribLocation(p, n); }); return o; }
    var u1 = U(pr, ['uVP', 'uLVP', 'uL', 'uE', 'uSky', 'uSh', 'uAo', 'uRf', 'uAoB', 'uRoof', 'uTx', 'uShOn', 'uFx', 'uRes']), a1 = A(pr, ['aP', 'aN', 'aC', 'aM']);
    var u2 = U(pr2, ['uLVP', 'uRoof']), a2 = A(pr2, ['aP', 'aN', 'aC', 'aM']);
    var u3 = U(pr3, ['uH', 'uZ', 'uK', 'uC']), a3 = gl.getAttribLocation(pr3, 'aQ'), bufQ = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufQ); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var bufS = gl.createBuffer(), bufG = gl.createBuffer(), nS = 0, nG = 0;

    // sol: entra por el frente de la casa
    var L = plan.sun || [0.36, 0.62, -0.7], ll = Math.hypot(L[0], L[1], L[2]); L = [L[0] / ll, L[1] / ll, L[2] / ll];
    var ctr0 = plan.center || [3.2, 0, 5], LVP = mul(ortho(-13, 13, -13, 13, 8, 62), lookAt([ctr0[0] + L[0] * 34, L[1] * 34, ctr0[2] + L[2] * 34], [ctr0[0], 0, ctr0[2]], [0, 1, 0]));
    var SM = Math.min(2048, gl.getParameter(gl.MAX_TEXTURE_SIZE)), shTex = gl.createTexture(), fb = gl.createFramebuffer(), rb = gl.createRenderbuffer(), shOk = true;
    gl.bindTexture(gl.TEXTURE_2D, shTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, SM, SM, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, shTex, 0);
    gl.bindRenderbuffer(gl.RENDERBUFFER, rb); gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, SM, SM);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, rb);
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) shOk = false;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    var aoTex = gl.createTexture(), aoB = [0, 0, 1, 1], roof = -1, shDirty = true;
    // reflejo del piso: la escena volteada se dibuja a media resolución y el porcelanato la mezcla según el ángulo
    var YFLIP = new Float32Array([1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]), rfTex = null, fbR = null, rbR = null, rfW = 0, rfH = 0, rfOk = true;
    function ensureRf() {
      if (!rfOk) return false;
      var w = Math.max(2, canvas.width >> 1), h = Math.max(2, canvas.height >> 1);
      if (w === rfW && h === rfH) return true;
      if (!rfTex) { rfTex = gl.createTexture(); fbR = gl.createFramebuffer(); rbR = gl.createRenderbuffer(); }
      gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, rfTex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbR);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, rfTex, 0);
      gl.bindRenderbuffer(gl.RENDERBUFFER, rbR); gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, w, h);
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, rbR);
      if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) rfOk = false;
      gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.bindTexture(gl.TEXTURE_2D, null);
      rfW = w; rfH = h; return rfOk;
    }

    function bind(buf, a) {
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      var S = 44, defs = [['aP', 3, 0], ['aN', 3, 12], ['aC', 4, 24], ['aM', 1, 40]];
      defs.forEach(function (d) { var l = a[d[0]]; if (l >= 0) { gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l, d[1], gl.FLOAT, false, S, d[2]); } });
    }
    function setGeo(withFurn) {
      var d = build(plan, withFurn);
      gl.bindBuffer(gl.ARRAY_BUFFER, bufS); gl.bufferData(gl.ARRAY_BUFFER, d.solid, gl.STATIC_DRAW); nS = d.solid.length / 11;
      gl.bindBuffer(gl.ARRAY_BUFFER, bufG); gl.bufferData(gl.ARRAY_BUFFER, d.glass, gl.STATIC_DRAW); nG = d.glass.length / 11;
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, aoTex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, AW, AH, 0, gl.RGBA, gl.UNSIGNED_BYTE, d.ao.px);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      aoB = d.ao.b; shDirty = true; dirty = true;
    }
    function drawShadow() { // mapa de sombras del sol; con techo cuando la cámara está adentro
      if (!shOk) return;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb); gl.viewport(0, 0, SM, SM);
      gl.clearColor(1, 1, 1, 1); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.useProgram(pr2); gl.uniformMatrix4fv(u2.uLVP, false, LVP); gl.uniform1f(u2.uRoof, roof);
      gl.enable(gl.DEPTH_TEST); gl.disable(gl.CULL_FACE); gl.disable(gl.BLEND); gl.depthMask(true);
      bind(bufS, a2); gl.drawArrays(gl.TRIANGLES, 0, nS);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    // cámara: mira hacia dir(yaw,pitch) desde eye = target - dir*dist. dist≈0 → vista en primera persona.
    var cam = { tx: 0, ty: 1, tz: 0, yaw: 0, pitch: 0.9, dist: 14, fov: 0.7 }, anim = null, dirty = true, VPm = null, W = 1, H = 1, eye = [0, 0, 0];
    var sky = hex(plan.sky || '#e9eef1'), zen = hex(plan.zenith || '#8fb8e3');

    function dirOf(c) { var cp = Math.cos(c.pitch); return [Math.sin(c.yaw) * cp, -Math.sin(c.pitch), Math.cos(c.yaw) * cp]; }
    function resize() {
      var r = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      var w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      W = r.width; H = r.height; dirty = true;
    }
    function draw() {
      var d = dirOf(cam);
      eye = [cam.tx - d[0] * cam.dist, cam.ty - d[1] * cam.dist, cam.tz - d[2] * cam.dist];
      var nr = (eye[1] < 2.62 || cam.pitch < 0.3) ? 1 : 0; // con techo si la cámara está adentro o mira la casa de frente
      if (nr !== roof || shDirty) { roof = nr; shDirty = false; drawShadow(); }
      var ctr = [eye[0] + d[0], eye[1] + d[1], eye[2] + d[2]];
      // en vertical (celular) se abre el campo de visión para que la casa quepa
      var asp = canvas.width / canvas.height, fov = cam.fov, oy = 0;
      if (asp < 1) fov = 2 * Math.atan(Math.tan(cam.fov / 2) / Math.max(asp, 0.5));
      if (cam.dist > 0.6) oy = (asp < 1 ? 0.34 : 0.2) * Math.min(1, (cam.dist - 0.6) / 6);   // sube la maqueta para que no la tape la barra inferior
      else if (inset > 0) {   // adentro: centra la vista en la parte de la pantalla que no tapa el panel y abre el lente en proporción
        oy = inset; fov = 2 * Math.atan(Math.tan(fov / 2) / (1 - inset * 0.55));
      }
      VPm = mul(mul(persp(fov, asp, 0.08, 140), lookAt(eye, ctr, [0, 1, 0])), MIRROR);
      if (oy) { VPm[1] += oy * VPm[3]; VPm[5] += oy * VPm[7]; VPm[9] += oy * VPm[11]; VPm[13] += oy * VPm[15]; }
      var gloss = plan.gloss == null ? 0.55 : plan.gloss, doRf = gloss > 0 && eye[1] < 4 && ensureRf();
      function setU(vp, pass) {
        gl.useProgram(pr);
        gl.uniformMatrix4fv(u1.uVP, false, vp); gl.uniformMatrix4fv(u1.uLVP, false, LVP);
        gl.uniform3f(u1.uL, L[0], L[1], L[2]); gl.uniform3f(u1.uE, -eye[0], eye[1], eye[2]); gl.uniform3f(u1.uSky, sky[0], sky[1], sky[2]);
        gl.uniform4f(u1.uAoB, aoB[0], aoB[1], aoB[2], aoB[3]); gl.uniform1f(u1.uRoof, roof); gl.uniform1f(u1.uTx, 1 / SM); gl.uniform1f(u1.uShOn, shOk ? 1 : 0);
        gl.uniform4f(u1.uFx, plan.tile || 0.33, doRf ? gloss : 0, pass, plan.marble || 0); gl.uniform2f(u1.uRes, 1 / canvas.width, 1 / canvas.height);
        gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, shTex); gl.uniform1i(u1.uSh, 0);
        gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, aoTex); gl.uniform1i(u1.uAo, 1);
        gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, !pass && doRf ? rfTex : aoTex); gl.uniform1i(u1.uRf, 2);
        gl.enable(gl.DEPTH_TEST); gl.enable(gl.CULL_FACE); gl.frontFace(pass ? gl.CCW : gl.CW); gl.disable(gl.BLEND); gl.depthMask(true);
      }
      if (doRf) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbR); gl.viewport(0, 0, rfW, rfH);
        gl.clearColor(sky[0] * 0.6 + zen[0] * 0.4, sky[1] * 0.6 + zen[1] * 0.4, sky[2] * 0.6 + zen[2] * 0.4, 1); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        setU(mul(VPm, YFLIP), 1); bind(bufS, a1); gl.drawArrays(gl.TRIANGLES, 0, nS);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(sky[0], sky[1], sky[2], 1); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      // cielo: degradado del horizonte al cenit
      var th = Math.tan(fov / 2), oy0 = oy;
      gl.useProgram(pr3); gl.disable(gl.DEPTH_TEST); gl.disable(gl.CULL_FACE); gl.disable(gl.BLEND); gl.depthMask(false);
      gl.uniform3f(u3.uH, sky[0], sky[1], sky[2]); gl.uniform3f(u3.uZ, zen[0], zen[1], zen[2]);
      gl.uniform2f(u3.uK, Math.tan(Math.min(1.45, cam.pitch)) / th + oy0, th); gl.uniform2f(u3.uC, cam.yaw, asp * th);
      gl.bindBuffer(gl.ARRAY_BUFFER, bufQ); gl.enableVertexAttribArray(a3); gl.vertexAttribPointer(a3, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      setU(VPm, 0);
      bind(bufS, a1); gl.drawArrays(gl.TRIANGLES, 0, nS);
      if (nG) {
        gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); gl.depthMask(false); gl.disable(gl.CULL_FACE);
        bind(bufG, a1); gl.drawArrays(gl.TRIANGLES, 0, nG); gl.depthMask(true);
      }
      if (hooks.onFrame) hooks.onFrame(api);
    }
    function loop(now) {
      if (anim) {
        var t = Math.min(1, (now - anim.t0) / anim.ms), e = ease(t), k;
        for (k in anim.to) cam[k] = anim.from[k] + (anim.to[k] - anim.from[k]) * e;
        if (t >= 1) { anim = null; if (hooks.onArrive) hooks.onArrive(); }
        dirty = true;
      }
      if (dirty) { dirty = false; draw(); }
      requestAnimationFrame(loop);
    }

    var ZO = window.GR_ZO || 1.1, ZOD = window.GR_ZOD || 1.06, inset = 0;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function goTo(s, instant) {
      var to = { tx: -s.t[0], ty: s.t[1], tz: s.t[2], yaw: -s.yaw, pitch: s.pitch, dist: s.dist, fov: s.fov || 0.75 };
      // adentro, lente más abierto (como foto inmobiliaria) para que cada cuarto quepa completo en pantalla; afuera, la cámara un poco más lejos
      if (s.dist < 0.6) to.fov = Math.min(1.75, to.fov * ZO); else to.dist = s.dist * ZOD;
      var dy = to.yaw - cam.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); to.yaw = cam.yaw + dy;
      if (instant || reduce) { for (var k in to) cam[k] = to[k]; anim = null; dirty = true; if (hooks.onArrive) hooks.onArrive(); return; }
      var from = {}; for (var k2 in to) from[k2] = cam[k2];
      anim = { from: from, to: to, t0: performance.now(), ms: s.ms || 1400 };
    }

    /* interacción: arrastrar gira, pellizco o rueda acerca */
    var pts = {}, lastPinch = 0;
    function inside() { return cam.dist < 0.6; }
    function zoom(f) {
      if (inside()) cam.fov = Math.min(1.85, Math.max(0.6, cam.fov * f));
      else cam.dist = Math.min(40, Math.max(3, cam.dist * f));
      dirty = true;
    }
    canvas.addEventListener('pointerdown', function (e) { canvas.setPointerCapture(e.pointerId); pts[e.pointerId] = [e.clientX, e.clientY]; anim = null; if (hooks.onTouch) hooks.onTouch(); });
    canvas.addEventListener('pointermove', function (e) {
      var p = pts[e.pointerId]; if (!p) return;
      var ids = Object.keys(pts);
      if (ids.length === 1) {
        var s = inside() ? -0.0042 : 0.006;
        cam.yaw += (e.clientX - p[0]) * s;
        cam.pitch += (e.clientY - p[1]) * (inside() ? -0.0036 : 0.005);
        cam.pitch = inside() ? Math.max(-0.9, Math.min(0.9, cam.pitch)) : Math.max(0.12, Math.min(1.5, cam.pitch));
        dirty = true;
      }
      pts[e.pointerId] = [e.clientX, e.clientY];
      if (ids.length === 2) {
        var a = pts[ids[0]], b = pts[ids[1]], d = Math.hypot(a[0] - b[0], a[1] - b[1]);
        if (lastPinch) zoom(lastPinch / d);
        lastPinch = d;
      }
    });
    function up(e) { delete pts[e.pointerId]; lastPinch = 0; }
    canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
    canvas.addEventListener('wheel', function (e) { e.preventDefault(); anim = null; zoom(e.deltaY > 0 ? 1.08 : 0.925); }, { passive: false });
    window.addEventListener('resize', resize);

    var api = {
      goTo: goTo,
      setFurniture: function (on) { furnOn = on; setGeo(on); },
      setPlan: function (p) { plan = p; sky = hex(plan.sky || '#e9eef1'); zen = hex(plan.zenith || '#8fb8e3'); setGeo(furnOn); },
      eye: function () { return eye; },
      pitch: function () { return cam.pitch; },
      // proyecta un punto del plano a pixeles CSS; null si queda detrás de la cámara
      project: function (p) {
        var m = VPm; if (!m) return null;
        var x = m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12], y = m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13], w = m[3] * p[0] + m[7] * p[1] + m[11] * p[2] + m[15];
        if (w <= 0.01) return null;
        return [(x / w * 0.5 + 0.5) * W, (1 - (y / w * 0.5 + 0.5)) * H];
      },
      zoom: function (f) { anim = null; zoom(f); },
      // fracción de la altura de la pantalla que tapa el panel de abajo
      setInset: function (f) { f = Math.max(0, Math.min(0.5, f || 0)); if (Math.abs(f - inset) > 0.005) { inset = f; dirty = true; } }
    };
    var furnOn = plan.furnitureOn !== false;
    setGeo(furnOn);
    resize();
    requestAnimationFrame(loop);
    return api;
  }
  window.GRVisor = GRVisor;
})();
