"""
Generate a proper site favicon at src/app/icon.png.

Google (and browser tabs) show this next to the site name in results. The raw
logo is transparent and huge, so on a white results row the white parts of the
mark vanish and Google falls back to a globe. This builds a small, square,
solid-background icon: the blue+white logo centered on the brand dark, with a
rounded square so it reads cleanly at small sizes and under Google's masking.
"""

from pathlib import Path
from PIL import Image, ImageDraw

SIZE = 512               # square, high-res; browsers/Google rescale down
BG = (10, 13, 20, 255)   # #0a0d14 brand deep charcoal
PAD_RATIO = 0.20         # padding around the logo
RADIUS = int(SIZE * 0.22)

root = Path(__file__).resolve().parents[1]
logo_path = root / "public" / "logo-dark-theme.png"  # blue + white variant
out_path = root / "src" / "app" / "icon.png"

# Rounded-square brand background
bg = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
mask = Image.new("L", (SIZE, SIZE), 0)
ImageDraw.Draw(mask).rounded_rectangle([0, 0, SIZE - 1, SIZE - 1], radius=RADIUS, fill=255)
fill = Image.new("RGBA", (SIZE, SIZE), BG)
bg.paste(fill, (0, 0), mask)

# Logo, scaled to fit inside the padding, centered
logo = Image.open(logo_path).convert("RGBA")
inner = int(SIZE * (1 - 2 * PAD_RATIO))
lw, lh = logo.size
scale = min(inner / lw, inner / lh)
logo = logo.resize((max(1, int(lw * scale)), max(1, int(lh * scale))), Image.LANCZOS)
pos = ((SIZE - logo.width) // 2, (SIZE - logo.height) // 2)
bg.alpha_composite(logo, pos)

bg.save(out_path, "PNG")
print("wrote:", out_path, bg.size, f"{out_path.stat().st_size // 1024} KB")
