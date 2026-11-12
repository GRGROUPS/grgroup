#!/usr/bin/env python3
"""Genera las páginas por casa (casa/GR-xxx/index.html), sus vistas previas (og.jpg)
y el sitemap.xml a partir de los datos (var DATA) de index.html.

Uso, desde la raíz del repositorio, cada vez que se agregue, cambie o quite una casa:

    python3 tools/build.py                 # páginas + sitemap; og.jpg solo si falta
    python3 tools/build.py --og GR-007     # además rehace la vista previa de esas casas

Las páginas por casa son páginas reales (sin redirección) para que Google las indexe
y para que el enlace compartido por WhatsApp abra rápido.
"""
import datetime
import html
import json
import os
import re
import shutil
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://grgroups.github.io/grgroup/"


# versión de los archivos del recorrido 3D: cambia cuando cambian, para que el navegador no use una copia vieja
VER = str(int(max(os.path.getmtime(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "recorrido", f))
                  for f in ("visor.js", "tour.js", "tour.css"))))


def esc(s):
    return html.escape(str(s), quote=True)


def money(n):
    return "$" + f"{round(n):,}"


def num(n):
    s = str(n)
    return re.sub(r"\.0+$", "", s)


def load():
    src = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
    data = json.loads(re.search(r"var DATA\s*=\s*(\[.*?\]);\n", src, re.S).group(1))
    wa = re.search(r'var WA = "(\d+)"', src).group(1)
    return [h for h in data if h.get("status") == "Disponible"], wa


def cover(h):
    f = h.get("fotos") or []
    return f[min(h.get("portada") or 1, len(f)) - 1] if f else ""


def price_txt(h):
    if h["op"] == "Renta":
        return money(h["precio"]) + " al mes"
    desde = "desde " if re.search("desde", h.get("precioNota") or "", re.I) else ""
    return desde + money(h["precio"])


def nota(h):
    n = h.get("precioNota") or ""
    return "" if re.match(r"^precio desde$", n, re.I) else n


def pago(h):
    return "Consúltanos" if re.search("confirmar", h.get("credito") or "", re.I) else h.get("credito") or ""


def wa_url(wa, text):
    from urllib.parse import quote
    return "https://wa.me/" + wa + "?text=" + quote(text)


def make_og(h, force):
    out = os.path.join(ROOT, "casa", h["code"], "og.jpg")
    if os.path.exists(out) and not force:
        return
    c = cover(h)
    if not c:
        return
    im = Image.open(os.path.join(ROOT, c)).convert("RGB")
    w, hh = im.size
    scale = max(1200 / w, 630 / hh)
    im = im.resize((round(w * scale), round(hh * scale)), Image.LANCZOS)
    w, hh = im.size
    left, top = (w - 1200) // 2, round((hh - 630) * 0.35)
    im.crop((left, top, left + 1200, top + 630)).save(out, quality=82, optimize=True)


CSS = """
*{box-sizing:border-box}body{margin:0;font-family:Jost,Arial,sans-serif;color:#17140f;background:#fff;font-size:17px;line-height:1.45;padding-bottom:84px}
a{color:inherit}.w{max-width:820px;margin:0 auto;padding:0 16px}
header{border-bottom:1px solid #ddd5c6}header .w{display:flex;align-items:center;justify-content:space-between;height:62px}
header img{height:40px;width:auto;display:block}header a.all{font-size:13px;letter-spacing:1.2px;text-transform:uppercase;text-decoration:none;color:#8a6a2f}
.eb{font-size:13px;font-weight:600;letter-spacing:.6px;color:#8a6a2f;margin:20px 0 4px;text-transform:uppercase}
h1{font-family:"Cormorant Garamond",Georgia,serif;font-size:36px;line-height:1.08;margin:0 0 8px;font-weight:600}
h2{font-family:"Cormorant Garamond",Georgia,serif;font-size:27px;margin:26px 0 10px;font-weight:600}
.pr{font-size:27px;font-weight:600;margin:0}.pr small{font-size:15px;color:#6f6a62;font-weight:500;margin-left:6px}
.zn{color:#6f6a62;margin:6px 0 14px}
.gal{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;margin:0 -16px;padding:0 16px 6px}
.gal img{height:66vw;max-height:440px;width:auto;margin-right:8px;scroll-snap-align:center;border-radius:4px;background:#f6f2ea;flex:none}
.hint{font-size:13px;color:#6f6a62;margin:4px 0 0}
.facts{display:flex;flex-wrap:wrap;margin:16px -5px 0;padding:0;list-style:none}
.facts li{flex:1 1 40%;margin:0 5px 10px;background:#f6f2ea;border:1px solid rgba(184,150,90,.25);border-radius:3px;padding:10px 14px}
.facts b{display:block;font-size:12px;color:#6f6a62;letter-spacing:.4px;text-transform:uppercase;font-weight:500}.facts span{font-size:19px;font-weight:600}
ul.dst{margin:0;padding-left:22px}ul.dst li{margin-bottom:6px}
.btn{display:block;text-align:center;text-decoration:none;border-radius:2px;padding:15px 12px;font-size:13px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;margin:0 0 10px}
.wa{background:#1fa855;color:#fff;border:1px solid #1fa855}.dk{background:#17140f;color:#f6f2ea;border:1px solid #17140f}.ol{border:1px solid #b8965a}.t3{background:#14213d;color:#fff;border:1px solid #14213d;margin:14px 0 4px}
.cta{margin-top:24px}
.sim{display:flex;overflow-x:auto;margin:0 -16px;padding:0 16px 6px}.sim a{flex:none;width:200px;margin-right:12px;text-decoration:none}
.sim img{width:200px;height:140px;object-fit:cover;border-radius:3px;display:block;background:#f6f2ea}.sim b{display:block;margin-top:6px;font-weight:600}.sim span{color:#6f6a62;font-size:15px}
footer{margin-top:34px;padding:18px 0 10px;background:#f6f2ea;font-size:12px;color:#6f6a62}
.bar{position:fixed;left:0;right:0;bottom:0;display:flex;padding:10px 12px 12px;background:rgba(255,255,255,.98);border-top:1px solid rgba(0,0,0,.1)}
.bar a{flex:1;margin:0 4px}.bar a.wa{flex:1.5}.bar .btn{margin-bottom:0;padding:14px 8px}
@media(min-width:700px){h1{font-size:46px}.gal img{height:420px}}
"""


def page(h, todas, wa):
    code, name = h["code"], h["name"]
    url = BASE + "casa/" + code + "/"
    tipo = h.get("tipo") or "Casa"
    op = "renta" if h["op"] == "Renta" else "venta"
    municipio = "Corregidora" if "Corregidora" in h["zona"] else ("El Marqués" if "Marqués" in h["zona"] else "Querétaro")
    title = f"{name} · {price_txt(h)} | {tipo} en {op} en {municipio} | GR GROUP"
    bits = [f"{h['rec']} recámaras"]
    if h.get("banos") is not None:
        bits.append(f"{num(h['banos'])} baños")
    if h.get("constr"):
        bits.append(f"{num(h['constr'])} m² de construcción")
    desc = f"{tipo} en {op} en {h['zona']}: " + ", ".join(bits) + f". {price_txt(h).capitalize()}. Mira las fotos y agenda tu visita con GR GROUP."
    fotos = list(h.get("fotos") or [])
    if cover(h) in fotos:  # la portada va primero
        fotos.remove(cover(h))
        fotos.insert(0, cover(h))
    imgs = ""
    for k, f in enumerate(fotos):
        w, hh = Image.open(os.path.join(ROOT, f)).size
        imgs += (f'<img src="../../{f}" width="{w}" height="{hh}" alt="{esc(name)}, foto {k + 1} de {len(fotos)}"'
                 + ('' if k == 0 else ' loading="lazy"') + ">")
    facts = [("Tipo", tipo), ("Recámaras", h["rec"])]
    if h.get("banos") is not None:
        facts.append(("Baños", num(h["banos"])))
    if h.get("constr"):
        facts.append(("Construcción", num(h["constr"]) + " m²"))
    if h.get("terr"):
        facts.append(("Terreno", num(h["terr"]) + " m²"))
    if h["op"] == "Venta" and pago(h):
        facts.append(("Forma de pago", pago(h)))
    facts_html = "".join(f"<li><b>{esc(a)}</b><span>{esc(b)}</span></li>" for a, b in facts)
    dst = "".join(f"<li>{esc(x)}</li>" for x in h.get("destacados") or [])
    wa_link = wa_url(wa, f"Hola, me interesa la casa {code} – {name} ({money(h['precio'])}). ¿Cuándo la puedo visitar?")
    otros = sorted((o for o in todas if o["code"] != code and o["op"] == h["op"]),
                   key=lambda o: abs(o["precio"] - h["precio"]) / h["precio"] - (0.3 if o["zona"] == h["zona"] else 0))[:5]
    sim = "".join(
        f'<a href="../{o["code"]}/"><img src="../../{cover(o)}" alt="{esc(o["name"])}" loading="lazy" width="200" height="140">'
        f'<b>{esc(o.get("corto") or o["name"])}</b><span>{price_txt(o)} · {esc(o["rec"])} rec.</span></a>' for o in otros)
    ld = {
        "@context": "https://schema.org", "@type": "RealEstateListing", "name": name, "url": url,
        "description": desc, "image": [BASE + f for f in fotos[:6]],
        "offers": {"@type": "Offer", "price": h["precio"], "priceCurrency": "MXN", "availability": "https://schema.org/InStock"},
        "provider": {"@type": "RealEstateAgent", "name": "GR GROUP", "telephone": "+" + wa, "url": BASE},
    }
    n = nota(h)
    return f"""<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website"><meta property="og:site_name" content="GR GROUP · Tu hogar ahora">
<meta property="og:title" content="{esc(h.get('corto') or name)} · {price_txt(h)} | GR GROUP">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{url}"><meta property="og:image" content="{url}og.jpg">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="../../icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Jost:400,500,600%7CCormorant+Garamond:600&amp;display=swap">
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
<style>{CSS}</style></head>
<body>
<header><div class="w"><a href="../../"><img src="../../logo.png" width="528" height="189" alt="GR GROUP · Tu hogar ahora"></a><a class="all" href="../../#casas">Ver todas las casas</a></div></header>
<main class="w">
<p class="eb">{esc(tipo)} en {op} · {esc(code)}</p>
<h1>{esc(name)}</h1>
<p class="pr">{price_txt(h)}{f"<small>{esc(n)}</small>" if n else ""}</p>
<p class="zn">📍 {esc(h["zona"])}</p>
<div class="gal">{imgs}</div>
{f'<p class="hint">Desliza para ver las {len(fotos)} fotos.</p>' if len(fotos) > 1 else ''}
{f'<a class="btn t3" href="../../recorrido/{code}/">Recorrer la casa en 3D</a>' if tiene_recorrido(code) else ''}
<ul class="facts">{facts_html}</ul>
{f'<h2>Lo más destacado</h2><ul class="dst">{dst}</ul>' if dst else ''}
<div class="cta">
<a class="btn wa" href="{esc(wa_link)}">WhatsApp por esta casa</a>
<a class="btn dk" href="../../#visita-{code}">Agendar visita</a>
<a class="btn ol" href="../../#casa-{code}">Ver ficha completa{", calculadora" if h["op"] == "Venta" and h.get("creditos") else ""} y mapa de la zona</a>
</div>
{f'<h2>Otras casas en {op} en Querétaro</h2><div class="sim">{sim}</div>' if sim else ''}
</main>
<footer><div class="w"><p>Precio en pesos mexicanos, sujeto a cambio sin previo aviso. El crédito está sujeto a aprobación. Las fotos y la información son de referencia. La ubicación exacta se da al agendar la visita. Algunas casas se comercializan en colaboración con otros asesores y desarrolladores.</p>
<p>GR GROUP · Tu hogar ahora · Iñaki Guerra · Querétaro · <a href="../../">Inicio</a></p></div></footer>
<div class="bar"><a class="btn wa" href="{esc(wa_link)}">WhatsApp por esta casa</a><a class="btn dk" href="../../#visita-{code}">Agendar visita</a></div>
</body></html>
"""


def tiene_recorrido(code):
    return os.path.exists(os.path.join(ROOT, "recorrido", code, "plan.js"))


def recorrido_page(h, wa):
    """Página del recorrido 3D. El plano vive en recorrido/<código>/plan.js; lo demás sale del catálogo."""
    code, name = h["code"], h["name"]
    corto = h.get("corto") or name
    url = BASE + "recorrido/" + code + "/"
    precio = price_txt(h)
    bits = [f"{h['rec']} recámaras"]
    if h.get("banos") is not None:
        bits.append(f"{num(h['banos'])} baños")
    if h.get("constr"):
        bits.append(f"{num(h['constr'])} m²")
    desc = f"Recorre en 3D desde tu celular: {name}, {h['zona']}. " + ", ".join(bits) + ". Representación ilustrativa."
    wa_link = wa_url(wa, f"Hola, vi el recorrido 3D de la casa {code} – {name} ({money(h['precio'])}). ¿Cuándo la puedo visitar?")
    meta = {"code": code, "name": name, "precio": precio, "url": url, "fotos": f"../../fotos/{code}/"}
    return f"""<!doctype html>
<html lang="es-MX">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Recorrido 3D: {esc(name)} | GR GROUP</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{url}">
<meta property="og:title" content="Recorrido 3D: {esc(corto)} · {precio} | GR GROUP">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:image" content="{BASE}casa/{code}/og.jpg">
<link rel="icon" type="image/png" href="../../icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Jost:400,500,600%7CCormorant+Garamond:500,600,700&amp;display=swap">
<link rel="stylesheet" href="../tour.css?v={VER}">
</head>
<body>
<canvas id="c" aria-label="Maqueta 3D de la casa. Arrastra para girar."></canvas>

<div class="top">
  <div class="id">
    <a href="../../"><img src="../../logo.png" width="528" height="189" alt="GR GROUP, Tu hogar ahora"></a>
    <div><h1>{esc(corto)}</h1><p><i>Recorrido 3D · </i>{precio}</p></div>
  </div>
  <a class="ficha" href="../../casa/{code}/">Ver ficha y fotos</a>
</div>

<div id="labels" aria-hidden="true"></div>

<div class="side">
  <button id="furn" type="button" aria-pressed="true" title="Mostrar u ocultar muebles sugeridos" aria-label="Muebles sugeridos">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><path d="M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v4H3z"/><path d="M6 17v2M18 17v2"/></svg>
  </button>
  <button id="share" type="button" title="Compartir este recorrido" aria-label="Compartir este recorrido">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V4"/><path d="M8 8l4-4 4 4"/><path d="M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg>
  </button>
  <button class="zm" id="zin" type="button" aria-label="Acercar">+</button>
  <button class="zm" id="zout" type="button" aria-label="Alejar">−</button>
</div>

<div class="hint" id="hint">Arrastra para girar la casa</div>

<div class="bottom">
  <div class="row">
    <div class="foto" id="foto" hidden><b>Así se ve en la foto real</b><div class="th" id="th"></div></div>
    <span></span>
    <a class="wa" href="{esc(wa_link)}">Agendar visita</a>
  </div>
  <div class="dock">
    <div class="cap"><div aria-live="polite"><strong id="capT"></strong><span id="capD"></span></div><button class="auto" id="auto" type="button" aria-pressed="false">Ver casa completa</button></div>
    <div class="stops" id="stops" role="group" aria-label="Espacios de la casa"></div>
    <p class="nota">Representación ilustrativa hecha a partir de las fotos y planos. La distribución, las medidas y los muebles son aproximados.</p>
  </div>
</div>

<div class="toast" id="toast" role="status"></div>

<dialog id="dlg"><img id="dimg" alt=""><form method="dialog"><span id="dcap"></span><button>Cerrar</button></form></dialog>

<div class="fail" id="fail" hidden><p>Tu navegador no pudo mostrar el recorrido 3D.<br><a href="../../casa/{code}/">Ver las fotos de la casa</a></p></div>

<script>window.TOUR_META={json.dumps(meta, ensure_ascii=False)};</script>
<script src="../visor.js?v={VER}"></script>
<script src="plan.js?v={VER}"></script>
<script src="../tour.js?v={VER}"></script>
</body>
</html>
"""


def main():
    force = set(sys.argv[sys.argv.index("--og") + 1:]) if "--og" in sys.argv else set()
    casas, wa = load()
    vivos = {h["code"] for h in casas}
    cdir = os.path.join(ROOT, "casa")
    os.makedirs(cdir, exist_ok=True)
    for d in os.listdir(cdir):
        if d not in vivos:
            shutil.rmtree(os.path.join(cdir, d))
    for h in casas:
        os.makedirs(os.path.join(cdir, h["code"]), exist_ok=True)
        open(os.path.join(cdir, h["code"], "index.html"), "w", encoding="utf-8").write(page(h, casas, wa))
        make_og(h, h["code"] in force)
        if tiene_recorrido(h["code"]):
            open(os.path.join(ROOT, "recorrido", h["code"], "index.html"), "w", encoding="utf-8").write(recorrido_page(h, wa))
    # lista de casas con recorrido 3D para la portada, el catálogo y la ficha emergente de index.html
    r3d = [h["code"] for h in casas if tiene_recorrido(h["code"])]
    ip = os.path.join(ROOT, "index.html")
    src = open(ip, encoding="utf-8").read()
    nuevo = re.sub(r"var R3D = \[[^\]]*\];", "var R3D = " + json.dumps(r3d) + ";", src, count=1)
    if nuevo != src:
        open(ip, "w", encoding="utf-8").write(nuevo)
    hoy = datetime.date.today().isoformat()
    sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          f"  <url><loc>{BASE}</loc><lastmod>{hoy}</lastmod></url>"]
    sm += [f"  <url><loc>{BASE}casa/{h['code']}/</loc><lastmod>{hoy}</lastmod></url>" for h in casas]
    sm += [f"  <url><loc>{BASE}recorrido/{h['code']}/</loc><lastmod>{hoy}</lastmod></url>" for h in casas
           if tiene_recorrido(h["code"])]
    sm.append("</urlset>")
    open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8").write("\n".join(sm) + "\n")
    print(len(casas), "páginas de casa y sitemap generados")


if __name__ == "__main__":
    main()
