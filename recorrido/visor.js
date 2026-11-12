/* GR GROUP · Visor de recorrido 3D (WebGL puro, sin librerías).
   Cada casa define su plano en recorrido/GR-xxx/index.html y llama a GRVisor(canvas, plano). */
(function () {
  'use strict';

  /* ---------- matemáticas ---------- */
  function persp(fov, asp, n, f) {
    var t = 1 / Math.tan(fov / 2), m = new Float32Array(16);
    m[0] = t / asp; m[5] = t; m[10] = (f + n) / (n - f); m[11] = -1; m[14] = 2 * f * n / (n - f);
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

  /* ---------- geometría ---------- */
  // vértice: pos(3) normal(3) color(4) material(1)
  function Geo() { this.v = []; }
  Geo.prototype.quad = function (p, n, col, a, mat) {
    var idx = [0, 1, 2, 0, 2, 3], i, q;
    for (i = 0; i < 6; i++) { q = p[idx[i]]; this.v.push(q[0], q[1], q[2], n[0], n[1], n[2], col[0], col[1], col[2], a, mat); }
  };
  // caja alineada a ejes; o = {mat, top (color de la cara superior), a (alfa), rot:{px,pz,ang}}
  Geo.prototype.box = function (x0, y0, z0, x1, y1, z1, color, o) {
    o = o || {};
    var t;
    if (x0 > x1) { t = x0; x0 = x1; x1 = t; } if (y0 > y1) { t = y0; y0 = y1; y1 = t; } if (z0 > z1) { t = z0; z0 = z1; z1 = t; }
    var c = hex(color), ct = o.top ? hex(o.top) : c, a = o.a == null ? 1 : o.a, mat = o.mat || 0, r = o.rot, self = this;
    var cs = r ? Math.cos(r.ang) : 1, sn = r ? Math.sin(r.ang) : 0;
    function P(x, y, z) { if (!r) return [x, y, z]; var dx = x - r.px, dz = z - r.pz; return [r.px + dx * cs + dz * sn, y, r.pz - dx * sn + dz * cs]; }
    function N(x, y, z) { return r ? [x * cs + z * sn, y, -x * sn + z * cs] : [x, y, z]; }
    function f(a0, b0, c0, d0, n, col, m) { self.quad([P.apply(0, a0), P.apply(0, b0), P.apply(0, c0), P.apply(0, d0)], N.apply(0, n), col, a, m); }
    f([x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1], [1, 0, 0], c, mat);
    f([x0, y0, z1], [x0, y1, z1], [x0, y1, z0], [x0, y0, z0], [-1, 0, 0], c, mat);
    f([x0, y1, z0], [x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [0, 1, 0], ct, o.matTop == null ? mat : o.matTop);
    f([x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], [0, -1, 0], c, mat);
    f([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], [0, 0, 1], c, mat);
    f([x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0], [0, 0, -1], c, mat);
  };

  var COL = { wall: '#f3f1ec', wallTop: '#3c3a37', frame: '#e4e4e0', grille: '#fafafa', door: '#f7f6f2', glass: '#a9cfe0' };

  // Muro con vanos. w = {ax:'x'|'z', c, from, to, t, h, out, open:[...]}
  // ax 'x': corre a lo largo de x en z=c.  ax 'z': corre a lo largo de z en x=c.
  function buildWall(g, gt, w) {
    var t = w.t || 0.12, h = w.h || 2.5, ax = w.ax, c = w.c, out = w.out || 1;
    function bx(geo, u0, y0, a0, u1, y1, a1, color, o) {
      if (ax === 'x') geo.box(u0, y0, c + a0, u1, y1, c + a1, color, o);
      else geo.box(c + a0, y0, u0, c + a1, y1, u1, color, o);
    }
    var ops = (w.open || []).slice().sort(function (a, b) { return a.from - b.from; });
    var u = w.from - t / 2, end = w.to + t / 2, wo = { mat: 4, top: COL.wallTop, matTop: 0 };
    ops.forEach(function (op) {
      var sill = op.sill || 0, head = op.head || 2.1;
      if (op.from > u) bx(g, u, 0, -t / 2, op.from, h, t / 2, w.color || COL.wall, wo);
      if (head < h) bx(g, op.from, head, -t / 2, op.to, h, t / 2, w.color || COL.wall, wo);
      if (sill > 0) bx(g, op.from, 0, -t / 2, op.to, sill, t / 2, w.color || COL.wall, { mat: 4 });
      var k = op.kind;
      if (k === 'window' || k === 'glassdoor') {
        var f = 0.045;
        bx(g, op.from, sill, -0.03, op.from + f, head, 0.03, COL.frame);
        bx(g, op.to - f, sill, -0.03, op.to, head, 0.03, COL.frame);
        bx(g, op.from, head - f, -0.03, op.to, head, 0.03, COL.frame);
        bx(g, op.from, sill, -0.03, op.to, sill + f, 0.03, COL.frame);
        if (op.mid !== false) bx(g, (op.from + op.to) / 2 - 0.02, sill, -0.03, (op.from + op.to) / 2 + 0.02, head, 0.03, COL.frame);
        if (k === 'glassdoor') bx(g, op.from, sill + 0.95, -0.03, op.to, sill + 1.0, 0.03, COL.frame);
        bx(gt, op.from + f, sill + f, -0.008, op.to - f, head - f, 0.008, COL.glass, { a: 0.28 });
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
        var o2 = { rot: rot };
        if (ax === 'x') g.box(hu, 0.01, c - 0.02, hu + dir * wd, head - 0.02, c + 0.02, op.color || COL.door, o2);
        else g.box(c - 0.02, 0.01, hu, c + 0.02, head - 0.02, hu + dir * wd, op.color || COL.door, o2);
      }
      u = op.to;
    });
    if (end > u) bx(g, u, 0, -t / 2, end, h, t / 2, w.color || COL.wall, wo);
  }

  function build(plan, withFurn) {
    var g = new Geo(), gt = new Geo();
    (plan.ground || []).forEach(function (q) { g.box(q[0], q[1] - 0.2, q[2], q[3], q[1], q[4], q[5], { mat: q[6] || 0 }); });
    (plan.floors || []).forEach(function (q) { // [x0,z0,x1,z1,color,mat]
      g.quad([[q[0], 0, q[1]], [q[0], 0, q[3]], [q[2], 0, q[3]], [q[2], 0, q[1]]], [0, 1, 0], hex(q[4] || '#d9d2c4'), 1, q[5] == null ? 1 : q[5]);
    });
    (plan.ceilings || []).forEach(function (q) { // [x0,z0,x1,z1,y] visible solo desde adentro
      var y = q[4] || 2.5;
      g.quad([[q[0], y, q[1]], [q[2], y, q[1]], [q[2], y, q[3]], [q[0], y, q[3]]], [0, -1, 0], hex('#fbfaf7'), 1, 0);
    });
    (plan.walls || []).forEach(function (w) { buildWall(g, gt, w); });
    (plan.boxes || []).forEach(function (b) { // [x0,y0,z0,x1,y1,z1,color,opts]
      var o = b[7] || {};
      if (o.furn && !withFurn) return;
      (o.a != null && o.a < 1 ? gt : g).box(b[0], b[1], b[2], b[3], b[4], b[5], b[6], o);
    });
    return { solid: new Float32Array(g.v), glass: new Float32Array(gt.v) };
  }

  /* ---------- shaders ---------- */
  var VS = 'attribute vec3 aP;attribute vec3 aN;attribute vec4 aC;attribute float aM;uniform mat4 uVP;' +
    'varying vec3 vP;varying vec3 vN;varying vec4 vC;varying float vM;' +
    'void main(){vP=aP;vN=aN;vC=aC;vM=aM;gl_Position=uVP*vec4(aP,1.0);}';
  var FS = 'precision mediump float;varying vec3 vP;varying vec3 vN;varying vec4 vC;varying float vM;uniform vec3 uL;uniform vec3 uE;' +
    'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}' +
    'void main(){vec3 n=normalize(vN);vec3 c=vC.rgb;float dist=distance(uE,vP);' +
    'if(vM>0.5&&vM<1.5){vec2 g=vP.xz/0.33;vec2 f=fract(g);float e=min(min(f.x,1.0-f.x),min(f.y,1.0-f.y));' +   // loseta
    'float k=mix(0.86,1.0,smoothstep(0.0,0.04,e));k=mix(k,0.97,clamp((dist-9.0)/9.0,0.0,1.0));c*=k;c*=0.97+0.06*h(floor(g));}' +
    'else if(vM>1.5&&vM<2.5){c*=0.95+0.1*h(floor(vP.xz*14.0));}' +                                               // pasto
    'else if(vM>2.5&&vM<3.5){vec2 g=vP.xz/1.5;vec2 f=fract(g);float e=min(min(f.x,1.0-f.x),min(f.y,1.0-f.y));' + // concreto
    'c*=mix(0.9,1.0,smoothstep(0.0,0.014,e));c*=0.985+0.03*h(floor(vP.xz*20.0));}' +
    'else if(vM>3.5&&vM<4.5){c*=mix(0.9,1.0,clamp(vP.y/2.4,0.0,1.0));}' +                                       // muro
    'float d=0.5+0.5*dot(n,uL);float li=0.56+0.10*(0.5+0.5*n.y)+0.40*d;' +
    'gl_FragColor=vec4(c*li,vC.a);}';

  var MIRROR = new Float32Array([-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  /* ---------- visor ---------- */
  function GRVisor(canvas, plan, hooks) {
    hooks = hooks || {};
    var gl = canvas.getContext('webgl', { antialias: true, alpha: false }) || canvas.getContext('experimental-webgl');
    if (!gl) { if (hooks.onFail) hooks.onFail(); return null; }

    function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }
    var pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(pr));
    gl.useProgram(pr);
    var loc = { P: gl.getAttribLocation(pr, 'aP'), N: gl.getAttribLocation(pr, 'aN'), C: gl.getAttribLocation(pr, 'aC'), M: gl.getAttribLocation(pr, 'aM'),
      VP: gl.getUniformLocation(pr, 'uVP'), L: gl.getUniformLocation(pr, 'uL'), E: gl.getUniformLocation(pr, 'uE') };
    var bufS = gl.createBuffer(), bufG = gl.createBuffer(), nS = 0, nG = 0;

    function setGeo(withFurn) {
      var d = build(plan, withFurn);
      gl.bindBuffer(gl.ARRAY_BUFFER, bufS); gl.bufferData(gl.ARRAY_BUFFER, d.solid, gl.STATIC_DRAW); nS = d.solid.length / 11;
      gl.bindBuffer(gl.ARRAY_BUFFER, bufG); gl.bufferData(gl.ARRAY_BUFFER, d.glass, gl.STATIC_DRAW); nG = d.glass.length / 11;
      dirty = true;
    }
    function bind(buf) {
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      var S = 44;
      gl.enableVertexAttribArray(loc.P); gl.vertexAttribPointer(loc.P, 3, gl.FLOAT, false, S, 0);
      gl.enableVertexAttribArray(loc.N); gl.vertexAttribPointer(loc.N, 3, gl.FLOAT, false, S, 12);
      gl.enableVertexAttribArray(loc.C); gl.vertexAttribPointer(loc.C, 4, gl.FLOAT, false, S, 24);
      gl.enableVertexAttribArray(loc.M); gl.vertexAttribPointer(loc.M, 1, gl.FLOAT, false, S, 40);
    }

    // cámara: mira hacia dir(yaw,pitch) desde eye = target - dir*dist. dist≈0 → vista en primera persona.
    var cam = { tx: 0, ty: 1, tz: 0, yaw: 0, pitch: 0.9, dist: 14, fov: 0.7 }, anim = null, dirty = true, VPm = null, W = 1, H = 1, eye = [0, 0, 0];
    var sky = hex(plan.sky || '#e9eef1');

    function dirOf(c) { var cp = Math.cos(c.pitch); return [Math.sin(c.yaw) * cp, -Math.sin(c.pitch), Math.cos(c.yaw) * cp]; }
    function resize() {
      var r = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      W = r.width; H = r.height; dirty = true;
    }
    function draw() {
      var d = dirOf(cam);
      eye = [cam.tx - d[0] * cam.dist, cam.ty - d[1] * cam.dist, cam.tz - d[2] * cam.dist];
      var ctr = [eye[0] + d[0], eye[1] + d[1], eye[2] + d[2]];
      // en vertical (celular) se abre el campo de visión para que la casa quepa
      var asp = canvas.width / canvas.height, fov = cam.fov;
      if (asp < 1) fov = 2 * Math.atan(Math.tan(cam.fov / 2) / Math.max(asp, 0.5));
      VPm = mul(mul(persp(fov, asp, 0.08, 120), lookAt(eye, ctr, [0, 1, 0])), MIRROR);
      if (cam.dist > 0.6) { // sube la maqueta para que no la tape la barra inferior
        var oy = (asp < 1 ? 0.34 : 0.2) * Math.min(1, (cam.dist - 0.6) / 6);
        VPm[1] += oy * VPm[3]; VPm[5] += oy * VPm[7]; VPm[9] += oy * VPm[11]; VPm[13] += oy * VPm[15];
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(sky[0], sky[1], sky[2], 1); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.uniformMatrix4fv(loc.VP, false, VPm);
      var L = [0.42, 0.78, -0.46], l = Math.hypot(L[0], L[1], L[2]);
      gl.uniform3f(loc.L, L[0] / l, L[1] / l, L[2] / l); gl.uniform3f(loc.E, -eye[0], eye[1], eye[2]);
      gl.enable(gl.DEPTH_TEST); gl.enable(gl.CULL_FACE); gl.frontFace(gl.CW); gl.disable(gl.BLEND); gl.depthMask(true);
      bind(bufS); gl.drawArrays(gl.TRIANGLES, 0, nS);
      if (nG) {
        gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); gl.depthMask(false); gl.disable(gl.CULL_FACE);
        bind(bufG); gl.drawArrays(gl.TRIANGLES, 0, nG); gl.depthMask(true);
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
      // proyecta un punto del mundo a pixeles CSS; null si queda detrás de la cámara
      project: function (p) {
        var m = VPm; if (!m) return null;
        var x = m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12], y = m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13], w = m[3] * p[0] + m[7] * p[1] + m[11] * p[2] + m[15];
        if (w <= 0.01) return null;
        return [(x / w * 0.5 + 0.5) * W, (1 - (y / w * 0.5 + 0.5)) * H];
      },
      nudge: function (dyaw) { anim = null; cam.yaw += dyaw; dirty = true; },
      zoom: function (f) { anim = null; zoom(f); }
    };
    setGeo(plan.furnitureOn !== false);
    resize();
    requestAnimationFrame(loop);
    return api;
  }
  window.GRVisor = GRVisor;
})();
