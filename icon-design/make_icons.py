"""App icon: a ball riding a cresting wave ("whitecap") on harbour navy.
Run: python3 icon-design/make_icons.py  -> writes public/icons/*"""
import math, os
from PIL import Image, ImageDraw

NAVY, SKY, FOAM, DEEP = (19, 48, 90), (157, 196, 236), (245, 249, 253), (14, 38, 72)
S = 4096
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'icons')


def wave_points(cx, cy, amp, offset=0.0):
    """Swell rising to a crest right of centre. Always spans the full canvas width."""
    pts = []
    for i in range(0, 401):
        t = i / 400
        y = 0.70 - amp * 0.20 * math.exp(-((t - 0.62) / 0.20) ** 2) + amp * 0.03 * math.sin(t * 9) + offset
        pts.append((t * S, cy + (y - 0.5) * S))
    return pts


def ball(size_r, bx, by):
    """Original ball: light circle, dark centre pentagon, dark patches at the rim."""
    layer = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    r = size_r
    d.ellipse([bx - r, by - r, bx + r, by + r], fill=FOAM)
    def pent(cx, cy, rr, rot):
        return [(cx + math.cos(rot + k * 2 * math.pi / 5) * rr, cy + math.sin(rot + k * 2 * math.pi / 5) * rr) for k in range(5)]
    d.polygon(pent(bx, by, r * 0.38, -math.pi / 2), fill=DEEP)
    for k in range(5):
        a = -math.pi / 2 + k * 2 * math.pi / 5 + math.pi / 5
        d.polygon(pent(bx + math.cos(a) * r * 1.02, by + math.sin(a) * r * 1.02, r * 0.36, a), fill=DEEP)
    m = Image.new('L', (S, S), 0)
    ImageDraw.Draw(m).ellipse([bx - r, by - r, bx + r, by + r], fill=255)
    out = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    out.paste(layer, (0, 0), m)
    ImageDraw.Draw(out).ellipse([bx - r, by - r, bx + r, by + r], outline=DEEP, width=int(r * 0.09))
    return out


def draw(content=1.0, rounded=True):
    img = Image.new('RGBA', (S, S), NAVY + (255,))
    d = ImageDraw.Draw(img)
    cy = S / 2
    amp = 1.0
    shift = (1 - content) * 0.10  # pull the crest a little lower for the maskable safe zone
    back = wave_points(0, cy, amp, offset=-0.07 + shift)
    d.polygon(back + [(S, S), (0, S)], fill=(91, 128, 178))
    foam = wave_points(0, cy, amp, offset=-0.012 + shift)
    d.polygon(foam + [(S, S), (0, S)], fill=FOAM)
    front = wave_points(0, cy, amp, offset=0.022 + shift)
    d.polygon(front + [(S, S), (0, S)], fill=SKY)
    r = 0.17 * S * content
    bx = S * 0.62
    crest_y = min(y for _, y in foam)
    img.alpha_composite(ball(r, bx, crest_y - r * 0.80))
    if not rounded:
        return img
    mask = Image.new('L', (S, S), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, S - 1, S - 1], radius=int(S * 0.22), fill=255)
    out = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    out.paste(img, (0, 0), mask)
    return out


def save(img, size, name):
    img.resize((size, size), Image.LANCZOS).save(os.path.join(OUT, name))


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    tile = draw(1.0, rounded=True)
    full = draw(1.0, rounded=False)
    mask = draw(0.78, rounded=False)  # content inside Android's safe zone
    save(tile, 192, 'icon-192.png')
    save(tile, 512, 'icon-512.png')
    save(mask, 512, 'icon-512-maskable.png')
    save(full, 180, 'apple-touch-icon.png')
    save(tile, 32, 'favicon-32.png')
    print('icons written to', os.path.abspath(OUT))
