#!/usr/bin/env python3
"""
Build the Weca Offroad Centre favicon set + OG image from the REAL brand
assets (public/images/brand/brand_logo_white.webp - the client's actual
logo artwork). Replaces the placeholder Tangison "Z" mark set.

Outputs to public/:
  - favicon.svg          W monogram (orange on dark), hand-drawn vector
  - favicon-16/32/48.png W monogram raster renders
  - favicon.ico          16 + 32 + 48 bundled
  - apple-touch-icon.png 180x180, real logo on solid dark square
  - icon-192.png         192x192, real logo, full-bleed
  - icon-512.png         512x512, real logo, full-bleed
  - icon-192-maskable.png  logo at 80% safe zone
  - icon-512-maskable.png  logo at 80% safe zone
  - og-image.png         1200x630, real logo + wordmark context

Design rules:
  - Small sizes (16-48px): the full Jeep illustration is illegible, so a
    bold "W" monogram in the site's orange (#E67E22) on the site's dark
    (#0D0D0D) carries the brand at tiny sizes. Same geometry in SVG and
    PNG so every size renders the same mark.
  - Large sizes (180px+): the actual logo artwork, composited as-is on
    the dark brand background (no AI regeneration - pure compositing).
"""
from PIL import Image, ImageDraw, ImageFont
import math
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, "public")
LOGO_WHITE = os.path.join(PUB, "images", "brand", "brand_logo_white.webp")

DARK = (13, 13, 13, 255)        # #0D0D0D
DARK_LINE = (42, 42, 42, 255)   # #2A2A2A
ORANGE = (230, 126, 34, 255)    # #E67E22
CREAM = (245, 245, 245, 255)    # #F5F5F5

# ---------------------------------------------------------------- W monogram
# Geometry in a 64x64 logical box, mirrored exactly in favicon.svg.
W_PTS = [(15, 18), (24, 46), (32, 26), (40, 46), (49, 18)]
W_STROKE = 8.0
CORNER = 14.0  # rounded-square radius (logical units, 64-box)


def _extend(p1, p2, by):
    """Extend segment p1->p2 by `by` at both ends (square caps)."""
    dx, dy = p2[0] - p1[0], p2[1] - p1[1]
    L = math.hypot(dx, dy)
    ux, uy = dx / L, dy / L
    return ((p1[0] - ux * by, p1[1] - uy * by), (p2[0] + ux * by, p2[1] + uy * by))


def render_monogram(size: int) -> Image.Image:
    """Render the W monogram at `size` px (square)."""
    s = size / 64.0
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    # rounded dark plate
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=CORNER * s, fill=DARK)
    if size >= 48:  # subtle border only where it reads
        d.rounded_rectangle(
            [0, 0, size - 1, size - 1], radius=CORNER * s,
            outline=DARK_LINE, width=max(1, int(s * 1.5)),
        )
    # W strokes with square caps
    w = max(2, int(round(W_STROKE * s)))
    for i in range(len(W_PTS) - 1):
        a, b = _extend(W_PTS[i], W_PTS[i + 1], w / 2)
        d.line([(a[0] * s, a[1] * s), (b[0] * s, b[1] * s)], fill=ORANGE, width=w)
    # square joint fills at the two bottom vertices (miter the joins)
    for idx in (1, 3):
        px, py = W_PTS[idx]
        r = w * 0.72
        d.rectangle([(px * s - r, py * s - r), (px * s + r, py * s + r)], fill=ORANGE)
    return img


FAVICON_SVG = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">\n'
    '  <!-- Weca Offroad Centre favicon: W monogram in brand orange on brand dark.\n'
    '       Small-size companion to the full logo artwork used at 180px+. -->\n'
    '  <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="14" ry="14"\n'
    '        fill="#0D0D0D" stroke="#2A2A2A" stroke-width="1.5"/>\n'
    '  <polyline points="'
    + " ".join(f"{x},{y}" for x, y in W_PTS)
    + '" fill="none" stroke="#E67E22" stroke-width="8"\n'
    '        stroke-linecap="square" stroke-linejoin="miter"/>\n'
    f'  <rect x="{W_PTS[1][0] - 5.76}" y="{W_PTS[1][1] - 5.76}" width="11.52" height="11.52" fill="#E67E22"/>\n'
    f'  <rect x="{W_PTS[3][0] - 5.76}" y="{W_PTS[3][1] - 5.76}" width="11.52" height="11.52" fill="#E67E22"/>\n'
    "</svg>\n"
)


# ------------------------------------------------------- logo compositing
def load_logo() -> Image.Image:
    return Image.open(LOGO_WHITE).convert("RGBA")


def composite_logo(size: int, logo_scale: float = 0.74, solid: bool = True) -> Image.Image:
    """Real logo artwork centered on a dark square."""
    img = Image.new("RGBA", (size, size), DARK)
    logo = load_logo()
    target = int(size * logo_scale)
    ratio = target / logo.width
    logo_r = logo.resize((target, max(1, int(logo.height * ratio))), Image.LANCZOS)
    img.paste(logo_r, ((size - logo_r.width) // 2, (size - logo_r.height) // 2), logo_r)
    if solid:
        return img.convert("RGB")
    return img


def main():
    # --- W monogram set (tiny sizes) ---
    with open(os.path.join(PUB, "favicon.svg"), "w") as f:
        f.write(FAVICON_SVG)
    for px in (16, 32, 48):
        render_monogram(px).save(os.path.join(PUB, f"favicon-{px}px.png"))
    # .ico bundling 16/32/48
    ico_imgs = [render_monogram(px) for px in (16, 32, 48)]
    ico_imgs[0].save(
        os.path.join(PUB, "favicon.ico"),
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=ico_imgs[1:],
    )

    # --- real-logo set (large sizes) ---
    composite_logo(180, 0.70).save(os.path.join(PUB, "apple-touch-icon.png"))
    composite_logo(192, 0.72).save(os.path.join(PUB, "icon-192.png"))
    composite_logo(512, 0.72).save(os.path.join(PUB, "icon-512.png"))
    # maskable: logo fully inside the 80% safe circle
    composite_logo(192, 0.60).save(os.path.join(PUB, "icon-192-maskable.png"))
    composite_logo(512, 0.60).save(os.path.join(PUB, "icon-512-maskable.png"))

    # --- OG image 1200x630 ---
    W, H = 1200, 630
    og = Image.new("RGB", (W, H), DARK[:3])
    d = ImageDraw.Draw(og)
    # orange accent bar, right edge (keeps prior design language, real branding)
    d.rectangle([W - 36, 0, W, H], fill=ORANGE[:3])
    # real logo, centered-left of the accent bar
    logo = load_logo()
    lh = 380
    ratio = lh / logo.height
    lw = int(logo.width * ratio)
    logo_r = logo.resize((lw, lh), Image.LANCZOS)
    og.paste(logo_r, ((W - 36 - lw) // 2, 90), logo_r)
    # wordmark context under the logo
    try:
        f_big = ImageFont.truetype(
            "/usr/share/fonts/truetype/english/Carlito-Bold.ttf", 46)
        f_sm = ImageFont.truetype(
            "/usr/share/fonts/truetype/english/Carlito-Regular.ttf", 28)
    except OSError:
        f_big = ImageFont.truetype(
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 46)
        f_sm = ImageFont.truetype(
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 28)

    def center_text(y, text, font, fill):
        tw = d.textlength(text, font=font)
        d.text(((W - 36 - tw) // 2, y), text, font=font, fill=fill)

    center_text(515, "4x4 Accessories & Fitment  |  Swakopmund, Namibia", f_sm, CREAM[:3])
    center_text(553, "wecaoffroad.com", f_big, ORANGE[:3])
    og.save(os.path.join(PUB, "og-image.png"), optimize=True)

    # report
    for f in ["favicon.svg", "favicon-16px.png", "favicon-32px.png", "favicon-48px.png",
              "favicon.ico", "apple-touch-icon.png", "icon-192.png", "icon-512.png",
              "icon-192-maskable.png", "icon-512-maskable.png", "og-image.png"]:
        p = os.path.join(PUB, f)
        print(f"built {f:28s} {os.path.getsize(p):>8,} bytes")


if __name__ == "__main__":
    main()
