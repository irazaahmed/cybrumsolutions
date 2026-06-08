"""
Generate two theme variants of the Cybrum Solutions mark from the source
"CS Logo Without BG.png" (a two-tone mark: brand-blue half + dark-slate half
on a transparent background).

  - logo-dark-theme.png  -> blue + WHITE  (dark slate recolored to white so it
                            stays visible on the dark site background)
  - logo-light-theme.png -> blue + near-BLACK (dark slate deepened so it stays
                            crisp on the light site background)

The blue half is preserved in both; only the non-blue (dark) pixels are
recolored. Alpha (transparency + anti-aliased edges) is preserved.
"""

from PIL import Image
from pathlib import Path

SRC = Path("public/CS Logo Without BG.png")
OUT_DARK = Path("public/logo-dark-theme.png")
OUT_LIGHT = Path("public/logo-light-theme.png")

WHITE = (255, 255, 255)
NEAR_BLACK = (15, 19, 28)  # matches the site's dark ink tone

img = Image.open(SRC).convert("RGBA")
w, h = img.size
px = img.load()

# Confirm transparency
print("size:", w, "x", h)
print("corner pixel (0,0):", px[0, 0])


def is_blue(r, g, b):
    # brand blue ~ (30,136,232): blue channel clearly dominates red
    return b > 90 and (b - r) > 25


OUT_SIZE = 512  # plenty for a small navbar mark; keeps the file tiny + fast


def make_variant(target):
    out = Image.new("RGBA", (w, h))
    op = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 12:
                op[x, y] = (0, 0, 0, 0)
            elif is_blue(r, g, b):
                op[x, y] = (r, g, b, a)  # keep brand blue as-is
            else:
                op[x, y] = (target[0], target[1], target[2], a)
    # downscale the recolored full-res result for crisp, lightweight output
    return out.resize((OUT_SIZE, OUT_SIZE), Image.LANCZOS)


make_variant(WHITE).save(OUT_DARK)
make_variant(NEAR_BLACK).save(OUT_LIGHT)
print("wrote:", OUT_DARK)
print("wrote:", OUT_LIGHT)
