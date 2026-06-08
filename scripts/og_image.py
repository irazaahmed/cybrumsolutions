"""
Generate the social/SEO share image at public/og.png (1200x630).

A dark branded card with the logo, the wordmark, the core message, and the
founder line. Used by Open Graph / Twitter / Google for link previews.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 630
BG = (10, 13, 20, 255)        # #0a0d14
ACCENT = (30, 136, 232, 255)  # brand blue
ACCENT_BRIGHT = (70, 164, 255, 255)
WHITE = (233, 237, 245, 255)
MUTED = (151, 163, 182, 255)

FONT_DIR = Path("C:/Windows/Fonts")


def font(name, size):
    for candidate in (name, "segoeui.ttf", "arial.ttf"):
        p = FONT_DIR / candidate
        if p.exists():
            return ImageFont.truetype(str(p), size)
    return ImageFont.load_default()


f_word = font("segoeuib.ttf", 58)
f_head = font("segoeuib.ttf", 60)
f_sub = font("segoeui.ttf", 30)
f_domain = font("segoeuib.ttf", 28)

img = Image.new("RGBA", (W, H), BG)

# Soft accent glow (top-left and bottom-right)
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
gd.ellipse([-220, -260, 360, 320], fill=(30, 136, 232, 90))
gd.ellipse([W - 360, H - 320, W + 220, H + 260], fill=(21, 100, 176, 80))
glow = glow.filter(ImageFilter.GaussianBlur(120))
img = Image.alpha_composite(img, glow)

draw = ImageDraw.Draw(img)

PAD = 80

# Logo (blue + white variant)
logo = Image.open("public/logo-dark-theme.png").convert("RGBA")
logo = logo.resize((132, 132), Image.LANCZOS)
img.alpha_composite(logo, (PAD, 70))

# Wordmark next to the logo: "Cybrum" white + " Solutions" accent
wx, wy = PAD + 160, 108
draw.text((wx, wy), "Cybrum", font=f_word, fill=WHITE)
cw = draw.textlength("Cybrum", font=f_word)
draw.text((wx + cw, wy), " Solutions", font=f_word, fill=ACCENT_BRIGHT)

# Headline (two lines)
draw.text((PAD, 280), "AI Agents, Automation,", font=f_head, fill=WHITE)
draw.text((PAD, 352), "Chatbots & Web Systems", font=f_head, fill=WHITE)

# Accent underline bar
draw.rounded_rectangle([PAD, 446, PAD + 120, 454], radius=4, fill=ACCENT)

# Founder / positioning line
draw.text(
    (PAD, 478),
    "AI-Native Company   |   Founder & CEO: Ahmed Raza, AI Solutions Expert",
    font=f_sub,
    fill=MUTED,
)

# Domain bottom-right
domain = "www.cybrumsolutions.dev"
dw = draw.textlength(domain, font=f_domain)
draw.text((W - PAD - dw, H - PAD - 6), domain, font=f_domain, fill=ACCENT_BRIGHT)

out = Path("public/og.png")
img.convert("RGB").save(out, "PNG")
print("wrote:", out, img.size)
