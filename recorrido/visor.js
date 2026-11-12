/* GR GROUP · Visor de recorrido 3D (WebGL puro, sin librerías).
   Cada casa define su plano en recorrido/GR-xxx/index.html y llama a GRVisor(canvas, plano).
   Incluye: sombras del sol (shadow map), oclusión en esquinas, sombras de contacto y una
   pequeña biblioteca de muebles modelados (LIB). */
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
     materiales: 0 liso, 1 loseta, 2 pasto, 3 concreto, 4 muro, 5 techo, 6 madera, 7 tela, 9 luminoso */
  function Geo() { this.v = []; this.xf = null; this.occW = []; this.occF = []; }
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
  // huella en el piso (para la sombra de contacto del mueble)
  Geo.prototype.foot = function (x0, z0, x1, z1) { this.occF.push({ t: this.xf, r: [Math.min(x0, x1), Math.min(z0, z1), Math.max(x0, x1), Math.max(z0, z1)] }); };

  var COL = { wall: '#f4f2ed', wallTop: '#3c3a37', frame: '#e6e6e2', grille: '#fbfbfb', door: '#f6f4ee', glass: '#a9cfe0', zoclo: '#cbbfa9',
    wood: '#b3895c', woodDk: '#8a6744', white: '#f4f4f1', steel: '#b9bec2', dark: '#2a2a2c' };

  /* ---------- biblioteca de muebles ----------
     Cada mueble se modela en coordenadas locales: origen al centro, frente hacia +z, y hacia arriba. */
  var LIB = {
    sofa: function (g, gt, o) {
      var w = o.w || 2.0, c = o.color || '#7f8c99', c2 = o.color2 || '#93a0ad', hw = w / 2, n = w > 1.7 ? 3 : 2, i;
      g.foot(-hw, -0.44, hw, 0.44);
      [[-hw + 0.07, -0.37], [hw - 0.07, -0.37], [-hw + 0.07, 0.37], [hw - 0.07, 0.37]].forEach(function (p) { g.cyl(p[0], p[1], 0, 0.12, 0.022, 0.03, COL.woodDk, { mat: 6, seg: 8 }); });
      g.rbox(-hw, 0.1, -0.44, hw, 0.34, 0.44, c, { mat: 7, e: 0.16 });
      g.rbox(-hw, 0.2, -0.46, hw, 0.84, -0.2, c, { mat: 7, e: 0.24 });
      g.rbox(-hw - 0.01, 0.14, -0.44, -hw + 0.2, 0.62, 0.44, c, { mat: 7, e: 0.3 });
      g.rbox(hw - 0.2, 0.14, -0.44, hw + 0.01, 0.62, 0.44, c, { mat: 7, e: 0.3 });
      var cw = (w - 0.4) / n;
      for (i = 0; i < n; i++) {
        var x0 = -hw + 0.2 + cw * i;
        g.rbox(x0 + 0.01, 0.3, -0.24, x0 + cw - 0.01, 0.49, 0.43, c2, { mat: 7, e: 0.36 });
        g.rbox(x0 + 0.02, 0.44, -0.3, x0 + cw - 0.02, 0.86, -0.08, c2, { mat: 7, e: 0.4 });
      }
      g.rbox(-hw + 0.22, 0.47, -0.12, -hw + 0.6, 0.8, 0.06, o.accent || '#d9a15e', { mat: 7, e: 0.5 });
      g.rbox(hw - 0.6, 0.47, -0.1, hw - 0.24, 0.78, 0.08, '#ece6da', { mat: 7, e: 0.5 });
    },
    mesaCentro: function (g, gt, o) {
      var w = o.w || 0.95, d = o.d || 0.55, hw = w / 2, hd = d / 2;
      g.foot(-hw, -hd, hw, hd);
      g.box(-hw, 0.37, -hd, hw, 0.41, hd, COL.wood, { mat: 6 });
      g.box(-hw + 0.06, 0.14, -hd + 0.06, hw - 0.06, 0.16, hd - 0.06, COL.woodDk, { mat: 6 });
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (s) { g.box(s[0] * (hw - 0.03) - 0.02, 0, s[1] * (hd - 0.03) - 0.02, s[0] * (hw - 0.03) + 0.02, 0.37, s[1] * (hd - 0.03) + 0.02, COL.woodDk, { mat: 6 }); });
      g.rbox(-0.2, 0.41, -0.11, 0.08, 0.445, 0.1, '#e9e2d2', { e: 0.2, nu: 10, nv: 4 });   // libros
      g.cyl(0.26, 0.02, 0.41, 0.5, 0.045, 0.06, '#d9d4cb', { seg: 10 });                    // florero
      g.rbox(0.19, 0.5, -0.06, 0.34, 0.66, 0.09, '#6f9460', { e: 0.9, nu: 10, nv: 6 });
    },
    tapete: function (g, gt, o) {
      var hw = (o.w || 2) / 2, hd = (o.d || 1.4) / 2;
      g.box(-hw, 0.004, -hd, hw, 0.014, hd, o.color || '#d8cdbb', { mat: 7 });
      g.box(-hw + 0.12, 0.014, -hd + 0.12, hw - 0.12, 0.016, hd - 0.12, o.color2 || '#c4b59d', { mat: 7 });
    },
    mesa: function (g, gt, o) {
      var hw = (o.w || 0.9) / 2, hd = (o.d || 0.9) / 2;
      g.foot(-hw, -hd, hw, hd);
      g.box(-hw, 0.72, -hd, hw, 0.76, hd, COL.wood, { mat: 6 });
      g.box(-hw + 0.05, 0.64, -hd + 0.05, hw - 0.05, 0.72, hd - 0.05, COL.woodDk, { mat: 6 });
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (s) { g.box(s[0] * (hw - 0.06) - 0.025, 0, s[1] * (hd - 0.06) - 0.025, s[0] * (hw - 0.06) + 0.025, 0.66, s[1] * (hd - 0.06) + 0.025, COL.woodDk, { mat: 6 }); });
      g.cyl(0, 0, 0.76, 0.775, 0.13, 0.15, '#eeeae2', { seg: 14 });                            // frutero
      g.rbox(-0.07, 0.775, -0.06, 0.03, 0.86, 0.04, '#d9793b', { e: 1, nu: 10, nv: 6 });
      g.rbox(0.0, 0.775, 0.0, 0.1, 0.855, 0.09, '#c94f3a', { e: 1, nu: 10, nv: 6 });
    },
    silla: function (g, gt, o) {
      var c = o.color || '#e9e4da';
      g.foot(-0.21, -0.21, 0.21, 0.21);
      [[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]].forEach(function (p) { g.cyl(p[0], p[1], 0, 0.44, 0.016, 0.02, COL.woodDk, { mat: 6, seg: 8 }); });
      g.rbox(-0.22, 0.43, -0.22, 0.22, 0.49, 0.22, c, { mat: 7, e: 0.3, nu: 12, nv: 4 });
      g.cyl(-0.18, -0.2, 0.46, 0.9, 0.016, 0.016, COL.woodDk, { mat: 6, seg: 8 });
      g.cyl(0.18, -0.2, 0.46, 0.9, 0.016, 0.016, COL.woodDk, { mat: 6, seg: 8 });
      g.rbox(-0.21, 0.6, -0.23, 0.21, 0.92, -0.17, c, { mat: 7, e: 0.35, nu: 12, nv: 6 });
    },
    cama: function (g, gt, o) {
      var w = o.w || 1.4, l = o.l || 1.9, hw = w / 2, hl = l / 2, c = o.color || '#dfd8c8';
      g.foot(-hw - 0.04, -hl - 0.06, hw + 0.04, hl);
      g.rbox(-hw - 0.05, 0.06, -hl - 0.09, hw + 0.05, 1.08, -hl, o.cabecera || '#8c7b68', { mat: 7, e: 0.22 });
      g.box(-hw, 0.1, -hl, hw, 0.27, hl, COL.woodDk, { mat: 6 });
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (s) { g.box(s[0] * (hw - 0.05) - 0.03, 0, s[1] * (hl - 0.05) - 0.03, s[0] * (hw - 0.05) + 0.03, 0.1, s[1] * (hl - 0.05) + 0.03, COL.woodDk, { mat: 6 }); });
      g.rbox(-hw + 0.01, 0.26, -hl + 0.01, hw - 0.01, 0.5, hl - 0.01, '#f6f4ef', { mat: 7, e: 0.18 });
      g.rbox(-hw - 0.02, 0.4, -hl + 0.62, hw + 0.02, 0.545, hl + 0.01, c, { mat: 7, e: 0.22 });           // edredón
      g.rbox(-hw - 0.02, 0.44, -hl + 0.56, hw + 0.02, 0.56, -hl + 0.78, '#f8f6f1', { mat: 7, e: 0.4 });    // doblez de sábana
      var pw = w > 1.2 ? w / 2 - 0.06 : w - 0.2, xs = w > 1.2 ? [-w / 4, w / 4] : [0];
      xs.forEach(function (x) { g.rbox(x - pw / 2, 0.47, -hl + 0.08, x + pw / 2, 0.64, -hl + 0.5, '#fbfaf7', { mat: 7, e: 0.55 }); });
      if (o.manta !== false) g.rbox(-hw - 0.03, 0.5, hl - 0.55, hw + 0.03, 0.57, hl - 0.12, o.manta || '#b9703f', { mat: 7, e: 0.3 });
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
    refri: function (g, gt, o) { // espalda en z=0, frente hacia +z
      g.foot(-0.32, 0, 0.32, 0.66);
      g.rbox(-0.32, 0.02, 0, 0.32, 1.74, 0.64, '#d9dcdf', { e: 0.08, nu: 16, nv: 8 });
      g.box(-0.31, 1.18, 0.64, 0.31, 1.19, 0.646, '#8f9498'); g.box(-0.31, 0.02, 0.64, 0.31, 0.06, 0.646, '#6f7477');
      g.box(0.23, 1.26, 0.646, 0.26, 1.62, 0.68, '#eef0f1'); g.box(0.23, 0.6, 0.646, 0.26, 1.12, 0.68, '#eef0f1');
    },
    // barra de cocina: espalda en z=0, corre a lo largo de x, profundidad 0.6 hacia +z
    barra: function (g, gt, o) {
      var len = o.len || 2.4, hl = len / 2, d = 0.58, i, n = Math.round(len / 0.45);
      g.foot(-hl, 0, hl, d);
      g.box(-hl, 0, 0.04, hl, 0.1, d - 0.06, '#8d8a84');                                       // zoclo del mueble
      g.box(-hl, 0.1, 0, hl, 0.86, d, COL.white);
      g.box(-hl - 0.01, 0.86, -0.0, hl + 0.01, 0.9, d + 0.02, o.cubierta || '#c9c7c2', { mat: 8 });         // cubierta
      g.box(-hl, 0.9, 0, hl, 1.0, 0.02, o.cubierta || '#c9c7c2', { mat: 8 });                               // copete
      for (i = 0; i <= n; i++) { var x = -hl + len * i / n; g.box(x - 0.003, 0.12, d, x + 0.003, 0.84, d + 0.004, '#c4c4bf'); }
      for (i = 0; i < n; i++) { var xc = -hl + len * (i + 0.5) / n; g.box(xc - 0.05, 0.74, d + 0.004, xc + 0.05, 0.755, d + 0.03, COL.steel); }
      if (o.estufa != null) {
        var ex = o.estufa;
        g.box(ex - 0.3, 0.9, 0.06, ex + 0.3, 0.912, 0.54, '#1d1d1f');
        [[-0.15, 0.18], [0.15, 0.18], [-0.15, 0.42], [0.15, 0.42]].forEach(function (p) {
          g.cyl(ex + p[0], p[1], 0.912, 0.925, 0.075, 0.075, '#3a3a3d', { seg: 14 }); g.cyl(ex + p[0], p[1], 0.925, 0.938, 0.035, 0.035, '#121214', { seg: 10 });
        });
        g.box(ex - 0.3, 1.5, 0, ex + 0.3, 1.58, 0.46, COL.steel); g.box(ex - 0.12, 1.58, 0.02, ex + 0.12, 2.1, 0.3, COL.steel);   // campana
      }
      if (o.tarja != null) {
        var tx = o.tarja;
        g.box(tx - 0.27, 0.9, 0.1, tx + 0.27, 0.906, 0.5, COL.steel); g.box(tx - 0.22, 0.86, 0.14, tx + 0.22, 0.903, 0.46, '#777c80');
        g.cyl(tx, 0.07, 0.9, 1.16, 0.014, 0.014, COL.steel, { seg: 8 }); g.box(tx - 0.012, 1.14, 0.07, tx + 0.012, 1.164, 0.24, COL.steel);
      }
      (o.altos || []).forEach(function (a) {                                                   // gabinetes altos [desde, hasta]
        g.box(a[0], 1.5, 0, a[1], 2.1, 0.33, COL.white);
        var m = Math.max(1, Math.round((a[1] - a[0]) / 0.45)), k;
        for (k = 0; k <= m; k++) { var xx = a[0] + (a[1] - a[0]) * k / m; g.box(xx - 0.003, 1.52, 0.33, xx + 0.003, 2.08, 0.334, '#c4c4bf'); }
        for (k = 0; k < m; k++) { var xm = a[0] + (a[1] - a[0]) * (k + 0.5) / m; g.box(xm - 0.04, 1.56, 0.334, xm + 0.04, 1.575, 0.355, COL.steel); }
      });
    },
    wc: function (g, gt, o) { // tanque contra el muro en z=0
      g.foot(-0.2, 0, 0.2, 0.68);
      g.rbox(-0.19, 0.4, 0.01, 0.19, 0.82, 0.2, '#f7f7f4', { e: 0.3 });
      g.rbox(-0.13, 0.0, 0.14, 0.13, 0.36, 0.5, '#f4f4f1', { e: 0.6 });
      g.rbox(-0.19, 0.24, 0.16, 0.19, 0.41, 0.68, '#f7f7f4', { e: 0.75 });
      g.rbox(-0.185, 0.4, 0.2, 0.185, 0.43, 0.67, '#ffffff', { e: 0.8, nv: 4 });
      g.box(-0.03, 0.82, 0.08, 0.03, 0.835, 0.12, COL.steel);
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
    planta: function (g, gt, o) {
      var h = o.h || 1.2;
      g.foot(-0.16, -0.16, 0.16, 0.16);
      g.cyl(0, 0, 0, 0.34, 0.13, 0.17, '#d6cfc3', { seg: 14 }); g.cyl(0, 0, 0.3, 0.335, 0.15, 0.15, '#4a3b2c', { seg: 12 });
      g.cyl(0, 0, 0.33, h * 0.6, 0.014, 0.01, '#6b5a3e', { seg: 6 });
      [[0, h * 0.72, 0, 0.26], [0.14, h * 0.58, 0.08, 0.2], [-0.13, h * 0.62, -0.06, 0.2], [0.02, h * 0.9, -0.05, 0.19], [-0.05, h * 0.55, 0.14, 0.17]].forEach(function (b, k) {
        g.rbox(b[0] - b[3], b[1] - b[3] * 0.85, b[2] - b[3], b[0] + b[3], b[1] + b[3] * 0.85, b[2] + b[3], k % 2 ? '#5f8a52' : '#6f9a5c', { e: 0.9, nu: 10, nv: 6 });
      });
    },
    plafon: function (g, gt, o) { var y = o.y || 2.5; g.cyl(0, 0, y - 0.05, y - 0.045, 0.17, 0.17, '#fffaf0', { seg: 18, mat: 10 }); g.cyl(0, 0, y - 0.05, y, 0.17, 0.19, '#e4e2dc', { seg: 18, cap: false, mat: 10 }); },
    lavadero: function (g, gt, o) {
      g.foot(-0.4, 0, 0.4, 0.6);
      g.box(-0.4, 0, 0.04, -0.3, 0.6, 0.56, '#bdb8ad'); g.box(0.3, 0, 0.04, 0.4, 0.6, 0.56, '#bdb8ad');
      g.box(-0.42, 0.6, 0, 0.42, 0.86, 0.6, '#cfcac0', { mat: 3 }); g.box(-0.36, 0.84, 0.06, 0.0, 0.865, 0.54, '#8f8c85');
    },
    boiler: function (g, gt, o) { g.cyl(0, 0.2, 0.9, 1.75, 0.19, 0.19, '#f1f1ee', { seg: 16 }); g.cyl(0, 0.2, 1.75, 1.8, 0.19, 0.05, '#dddcd6', { seg: 16 }); }
  };

  // Muro con vanos. w = {ax:'x'|'z', c, from, to, t, h, out, open:[...]}
  function buildWall(g, gt, w, plan) {
    var t = w.t || 0.12, h = w.h || 2.5, ax = w.ax, c = w.c, out = w.out || 1;
    function inside(u, a) {
      var x = ax === 'x' ? u : c + a, z = ax === 'x' ? c + a : u;
      return (plan.floors || []).some(function (f) { return x > f[0] && x < f[2] && z > f[1] && z < f[3]; });
    }
    function bx(geo, u0, y0, a0, u1, y1, a1, color, o) {
      if (ax === 'x') geo.box(u0, y0, c + a0, u1, y1, c + a1, color, o);
      else geo.box(c + a0, y0, u0, c + a1, y1, u1, color, o);
    }
    function solid(u0, y0, u1, y1, o) {
      bx(g, u0, y0, -t / 2, u1, y1, t / 2, w.color || COL.wall, o);
      if (y0 === 0) {
        if (ax === 'x') g.occW.push([u0, c - t / 2, u1, c + t / 2]); else g.occW.push([c - t / 2, u0, c + t / 2, u1]);
        [-1, 1].forEach(function (s) {               // zoclo solo del lado que da a un cuarto
          if (inside((u0 + u1) / 2, s * (t / 2 + 0.06))) bx(g, u0, 0, s * t / 2, u1, 0.085, s * (t / 2 + 0.012), COL.zoclo);
        });
      }
    }
    var ops = (w.open || []).slice().sort(function (a, b) { return a.from - b.from; });
    var u = w.from - t / 2, end = w.to + t / 2, wo = { mat: 4, top: COL.wallTop, matTop: 0 };
    ops.forEach(function (op) {
      var sill = op.sill || 0, head = op.head || 2.1;
      if (op.from > u) solid(u, 0, op.from, h, wo);
      if (head < h) bx(g, op.from, head, -t / 2, op.to, h, t / 2, w.color || COL.wall, wo);
      if (sill > 0) solid(op.from, 0, op.to, sill, { mat: 4 });
      var k = op.kind;
      if (k === 'window' || k === 'glassdoor') {
        var f = 0.045;
        bx(g, op.from, sill, -0.03, op.from + f, head, 0.03, COL.frame);
        bx(g, op.to - f, sill, -0.03, op.to, head, 0.03, COL.frame);
        bx(g, op.from, head - f, -0.03, op.to, head, 0.03, COL.frame);
        bx(g, op.from, sill, -0.03, op.to, sill + f, 0.03, COL.frame);
        if (op.mid !== false) bx(g, (op.from + op.to) / 2 - 0.02, sill, -0.03, (op.from + op.to) / 2 + 0.02, head, 0.03, COL.frame);
        if (k === 'glassdoor') bx(g, op.from, sill + 0.95, -0.03, op.to, sill + 1.0, 0.03, COL.frame);
        bx(gt, op.from + f, sill + f, -0.008, op.to - f, head - f, 0.008, COL.glass, { a: 0.22 });
        if (op.grille) { // herrería blanca por fuera
          var a0 = out * (t / 2 + 0.02), a1 = out * (t / 2 + 0.04), n, i, s;
          n = Math.max(2, Math.round((op.to - op.from) / 0.17));
          for (i = 0; i <= n; i++) { s = op.from + (op.to - op.from) * i / n; bx(g, s - 0.009, sill, a0, s + 0.009, head, a1, COL.grille); }
          n = Math.max(2, Math.round((head - sill) / 0.21));
          for (i = 0; i <= n; i++) { s = sill + (head - sill) * i / n; bx(g, op.from, s - 0.009, a0, op.to, s + 0.009, a1, COL.grille); }
        }
      } else if (k === 'door') {
        var hu = op.hinge === 'to' ? op.to : op.from, wd = op.to - op.from, dir = op.hinge === 'to' ? -1 : 1;
        var rot = ax === 'x' ? { px: hu, pz: c, ang: op.ang || 0 } : { px: c, pz: hu, ang: op.ang || 0 };
        var dc = op.color || COL.door, hx = hu + dir * (wd - 0.08);
        if (ax === 'x') {
          g.box(hu, 0.01, c - 0.02, hu + dir * wd, head - 0.02, c + 0.02, dc, { rot: rot });
          g.box(hx - 0.02, 0.98, c - 0.07, hx + 0.02, 1.02, c + 0.07, COL.steel, { rot: rot });
        } else {
          g.box(c - 0.02, 0.01, hu, c + 0.02, head - 0.02, hu + dir * wd, dc, { rot: rot });
          g.box(c - 0.07, 0.98, hx - 0.02, c + 0.07, 1.02, hx + 0.02, COL.steel, { rot: rot });
        }
        bx(g, op.from - 0.03, 0, -t / 2 - 0.012, op.from, head + 0.03, t / 2 + 0.012, '#e9e6de');   // marco
        bx(g, op.to, 0, -t / 2 - 0.012, op.to + 0.03, head + 0.03, t / 2 + 0.012, '#e9e6de');
        bx(g, op.from - 0.03, head, -t / 2 - 0.012, op.to + 0.03, head + 0.03, t / 2 + 0.012, '#e9e6de');
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

  /* Textura de oclusión vista desde arriba: R cercanía a muros, G sombra de contacto de muebles, B interior de la casa */
  var AW = 256, AH = 512;
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
    (plan.floors || []).forEach(function (f) { rect(B, f); });
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
    blur(R, 0.12); blur(G, 0.1);
    var px = new Uint8Array(AW * AH * 4), n;
    for (n = 0; n < AW * AH; n++) { px[n * 4] = Math.min(255, R[n] * 255); px[n * 4 + 1] = Math.min(255, G[n] * 255); px[n * 4 + 2] = B[n] * 255; px[n * 4 + 3] = 255; }
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
    'uniform vec3 uL;uniform vec3 uE;uniform vec3 uSky;uniform sampler2D uSh;uniform sampler2D uAo;uniform vec4 uAoB;uniform float uRoof;uniform float uTx;uniform float uShOn;',
    'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
    'float vn(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(h(i),h(i+vec2(1.0,0.0)),f.x),mix(h(i+vec2(0.0,1.0)),h(i+vec2(1.0,1.0)),f.x),f.y);}',
    'float unpack(vec4 c){return dot(c,vec4(1.0,1.0/255.0,1.0/65025.0,1.0/16581375.0));}',
    'float shadow(){if(uShOn<0.5)return 1.0;vec3 p=vS.xyz/vS.w*0.5+0.5;',
    ' if(p.x<0.0||p.x>1.0||p.y<0.0||p.y>1.0||p.z>1.0)return 1.0;float s=0.0;',
    ' for(int i=0;i<4;i++){for(int j=0;j<4;j++){vec2 o=(vec2(float(i),float(j))-1.5)*uTx*1.35;',
    '  s+=step(p.z-0.0010,unpack(texture2D(uSh,p.xy+o)));}}return s/16.0;}',
    'void main(){vec3 n=normalize(vN);vec3 c=vC.rgb;float m=vM;float dist=distance(uE,vP);',
    ' if(m>9.5&&uRoof<0.5)discard;',
    ' if(m>8.5){gl_FragColor=vec4(c,vC.a);return;}',
    ' vec3 V=normalize(uE-vP);float sheen=0.0;',
    ' if(m>0.5&&m<1.5){vec2 g=vP.xz/0.33;vec2 f=fract(g);float e=min(min(f.x,1.0-f.x),min(f.y,1.0-f.y));',      // loseta
    '  float k=mix(0.84,1.0,smoothstep(0.0,0.035,e));k=mix(k,0.97,clamp((dist-8.0)/8.0,0.0,1.0));c*=k;',
    '  c*=0.955+0.07*h(floor(g))+0.02*h(floor(vP.xz*60.0));sheen=0.10*pow(1.0-max(dot(V,n),0.0),3.0);}',
    ' else if(m>1.5&&m<2.5){float nr=1.0-clamp(dist/16.0,0.0,1.0);c*=0.80+0.20*vn(vP.xz*0.55)+0.14*vn(vP.xz*5.0)+0.10*nr*vn(vP.xz*38.0);c.r*=0.94+0.12*vn(vP.zx*1.7);}',                                                // pasto
    ' else if(m>2.5&&m<3.5){vec2 g=vP.xz/1.5;vec2 f=fract(g);float e=min(min(f.x,1.0-f.x),min(f.y,1.0-f.y));',  // concreto
    '  c*=mix(0.9,1.0,smoothstep(0.0,0.014,e));c*=0.98+0.04*h(floor(vP.xz*20.0));}',
    ' else if(m>3.5&&m<5.5){c*=0.985+0.03*h(floor((vP.xz+vP.yy)*90.0));}',                                       // muro y techo: textura de pintura
    ' else if(m>5.5&&m<6.5){float gr=sin((vP.x*0.7+vP.z+vP.y*0.5)*85.0+4.0*h(floor(vP.xz*9.0)));c*=0.95+0.05*gr;sheen=0.05*pow(1.0-max(dot(V,n),0.0),3.0);}', // madera
    ' else if(m>6.5&&m<7.5){c*=0.95+0.09*h(floor((vP.xz+vP.yy*1.7)*220.0));}',                                   // tela
    ' else if(m>7.5&&m<8.5){vec2 q=vP.xz+vP.yy*1.3;c*=0.80+0.14*vn(q*55.0)+0.12*h(floor(q*300.0))+0.08*vn(q*9.0);sheen=0.16*pow(1.0-max(dot(V,n),0.0),2.5);}', // granito
    ' vec3 a0=texture2D(uAo,(vP.xz-uAoB.xy)*uAoB.zw).rgb;float ao=1.0;',
    ' if(n.y>0.5){ao=1.0-0.44*a0.r-0.52*a0.g*step(vP.y,0.03);}',
    ' else if(n.y<-0.5){ao=1.0-0.34*a0.r;}',
    ' else{vec3 a1=texture2D(uAo,(vP.xz+n.xz*0.2-uAoB.xy)*uAoB.zw).rgb;',
    '  ao=1.0-0.42*a1.r-0.32*a1.g*(1.0-smoothstep(0.0,0.75,vP.y));ao*=mix(0.86,1.0,smoothstep(0.0,0.3,vP.y));',
    '  ao*=mix(1.0,0.9,smoothstep(2.05,2.5,vP.y)*uRoof*a0.b);}',
    ' float sh=shadow();if(n.y<0.5)sh*=1.0-smoothstep(2.2,2.4,vP.y)*uRoof*a0.b;float nl=max(dot(n,uL),0.0);float hemi=0.5+0.5*n.y;',
    ' float side=0.5+0.5*dot(n,vec3(-0.55,0.0,0.83));',
    ' vec3 amb=mix(vec3(0.55,0.57,0.62),vec3(0.70,0.70,0.70),hemi)*(0.88+0.12*side);',
    ' amb+=vec3(0.19,0.18,0.16)*a0.b*uRoof;',                                                                    // luz rebotada dentro de la casa
    ' vec3 col=c*(amb*ao+vec3(1.0,0.95,0.85)*0.48*nl*sh)+sheen*(0.4+0.6*sh);',
    ' col=mix(col,uSky,smoothstep(24.0,60.0,dist));',
    ' gl_FragColor=vec4(col,vC.a);}'].join('\n');
  var VS2 = 'attribute vec3 aP;attribute float aM;uniform mat4 uLVP;uniform float uRoof;' +
    'void main(){if((aM>9.5||(aM>4.5&&aM<5.5))&&uRoof<0.5){gl_Position=vec4(2.0,2.0,2.0,1.0);}else{gl_Position=uLVP*vec4(aP,1.0);}}';
  var FS2 = '#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n' +
    'void main(){float d=gl_FragCoord.z;vec4 e=fract(d*vec4(1.0,255.0,65025.0,16581375.0));e-=e.yzww*vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);gl_FragColor=e;}';

  var VS3 = 'attribute vec2 aQ;varying vec2 vQ;void main(){vQ=aQ;gl_Position=vec4(aQ,0.0,1.0);}';
  var FS3 = 'precision mediump float;varying vec2 vQ;uniform vec3 uH;uniform vec3 uZ;uniform vec2 uK;' +
    'void main(){float t=(vQ.y-uK.x)*uK.y;gl_FragColor=vec4(mix(uH,uZ,smoothstep(0.0,0.75,t)),1.0);}';

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
    var u1 = U(pr, ['uVP', 'uLVP', 'uL', 'uE', 'uSky', 'uSh', 'uAo', 'uAoB', 'uRoof', 'uTx', 'uShOn']), a1 = A(pr, ['aP', 'aN', 'aC', 'aM']);
    var u2 = U(pr2, ['uLVP', 'uRoof']), a2 = A(pr2, ['aP', 'aN', 'aC', 'aM']);
    var u3 = U(pr3, ['uH', 'uZ', 'uK']), a3 = gl.getAttribLocation(pr3, 'aQ'), bufQ = gl.createBuffer();
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
      var nr = eye[1] < 2.62 ? 1 : 0;
      if (nr !== roof || shDirty) { roof = nr; shDirty = false; drawShadow(); }
      var ctr = [eye[0] + d[0], eye[1] + d[1], eye[2] + d[2]];
      // en vertical (celular) se abre el campo de visión para que la casa quepa
      var asp = canvas.width / canvas.height, fov = cam.fov;
      if (asp < 1) fov = 2 * Math.atan(Math.tan(cam.fov / 2) / Math.max(asp, 0.5));
      VPm = mul(mul(persp(fov, asp, 0.08, 140), lookAt(eye, ctr, [0, 1, 0])), MIRROR);
      if (cam.dist > 0.6) { // sube la maqueta para que no la tape la barra inferior
        var oy = (asp < 1 ? 0.34 : 0.2) * Math.min(1, (cam.dist - 0.6) / 6);
        VPm[1] += oy * VPm[3]; VPm[5] += oy * VPm[7]; VPm[9] += oy * VPm[11]; VPm[13] += oy * VPm[15];
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(sky[0], sky[1], sky[2], 1); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      // cielo: degradado del horizonte al cenit
      var th = Math.tan(fov / 2), oy0 = cam.dist > 0.6 ? (asp < 1 ? 0.34 : 0.2) * Math.min(1, (cam.dist - 0.6) / 6) : 0;
      gl.useProgram(pr3); gl.disable(gl.DEPTH_TEST); gl.disable(gl.CULL_FACE); gl.disable(gl.BLEND); gl.depthMask(false);
      gl.uniform3f(u3.uH, sky[0], sky[1], sky[2]); gl.uniform3f(u3.uZ, zen[0], zen[1], zen[2]);
      gl.uniform2f(u3.uK, Math.tan(Math.min(1.45, cam.pitch)) / th + oy0, th);
      gl.bindBuffer(gl.ARRAY_BUFFER, bufQ); gl.enableVertexAttribArray(a3); gl.vertexAttribPointer(a3, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.useProgram(pr);
      gl.uniformMatrix4fv(u1.uVP, false, VPm); gl.uniformMatrix4fv(u1.uLVP, false, LVP);
      gl.uniform3f(u1.uL, L[0], L[1], L[2]); gl.uniform3f(u1.uE, -eye[0], eye[1], eye[2]); gl.uniform3f(u1.uSky, sky[0], sky[1], sky[2]);
      gl.uniform4f(u1.uAoB, aoB[0], aoB[1], aoB[2], aoB[3]); gl.uniform1f(u1.uRoof, roof); gl.uniform1f(u1.uTx, 1 / SM); gl.uniform1f(u1.uShOn, shOk ? 1 : 0);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, shTex); gl.uniform1i(u1.uSh, 0);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, aoTex); gl.uniform1i(u1.uAo, 1);
      gl.enable(gl.DEPTH_TEST); gl.enable(gl.CULL_FACE); gl.frontFace(gl.CW); gl.disable(gl.BLEND); gl.depthMask(true);
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

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function goTo(s, instant) {
      var to = { tx: -s.t[0], ty: s.t[1], tz: s.t[2], yaw: -s.yaw, pitch: s.pitch, dist: s.dist, fov: s.fov || 0.75 };
      var dy = to.yaw - cam.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); to.yaw = cam.yaw + dy;
      if (instant || reduce) { for (var k in to) cam[k] = to[k]; anim = null; dirty = true; if (hooks.onArrive) hooks.onArrive(); return; }
      var from = {}; for (var k2 in to) from[k2] = cam[k2];
      anim = { from: from, to: to, t0: performance.now(), ms: s.ms || 1400 };
    }

    /* interacción: arrastrar gira, pellizco o rueda acerca */
    var pts = {}, lastPinch = 0;
    function inside() { return cam.dist < 0.6; }
    function zoom(f) {
      if (inside()) cam.fov = Math.min(1.5, Math.max(0.6, cam.fov * f));
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
      setFurniture: setGeo,
      eye: function () { return eye; },
      // proyecta un punto del plano a pixeles CSS; null si queda detrás de la cámara
      project: function (p) {
        var m = VPm; if (!m) return null;
        var x = m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12], y = m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13], w = m[3] * p[0] + m[7] * p[1] + m[11] * p[2] + m[15];
        if (w <= 0.01) return null;
        return [(x / w * 0.5 + 0.5) * W, (1 - (y / w * 0.5 + 0.5)) * H];
      },
      zoom: function (f) { anim = null; zoom(f); }
    };
    setGeo(plan.furnitureOn !== false);
    resize();
    requestAnimationFrame(loop);
    return api;
  }
  window.GRVisor = GRVisor;
})();
