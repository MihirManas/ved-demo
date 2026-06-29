from PIL import Image, ImageDraw
import math

WIDTH = 100
HEIGHT = 100
SCALE_HIRES = 8 # Super sampling for high quality anti-aliasing

def draw_poly_with_outline(draw, pts, fill, outline, width):
    draw.polygon(pts, fill=fill)
    pts_closed = pts + [pts[0]]
    draw.line(pts_closed, fill=outline, width=width)
    for p in pts:
        r = width / 2
        draw.ellipse((p[0]-r, p[1]-r, p[0]+r, p[1]+r), fill=outline)

def draw_logo(scale):
    # Center is 50, 50.
    img = Image.new('RGB', (WIDTH * SCALE_HIRES, HEIGHT * SCALE_HIRES), '#0A0A0B')
    draw = ImageDraw.Draw(img)
    
    def transform(x, y):
        nx = (x - 50) * scale + 50
        ny = (y - 50) * scale + 50
        return nx * SCALE_HIRES, ny * SCALE_HIRES
    
    color = '#E6C875'
    bg_color = '#0A0A0B'
    w = int(3 * SCALE_HIRES * scale)
    
    # Right ribbon (behind)
    pts1 = [transform(58,2), transform(89,2), transform(70,50), transform(45,45)]
    draw_poly_with_outline(draw, pts1, bg_color, color, w)
    
    # Left ribbon (front)
    pts2 = [transform(11,2), transform(42,2), transform(55,45), transform(30,50)]
    draw_poly_with_outline(draw, pts2, bg_color, color, w)
    
    # Circle
    cx, cy = transform(50, 65)
    r = 26 * scale * SCALE_HIRES
    draw.ellipse((cx-r, cy-r, cx+r, cy+r), fill=bg_color)
    # Outline for circle
    draw.ellipse((cx-r, cy-r, cx+r, cy+r), outline=color, width=w)
    
    # Inner lines
    def draw_thick_line(x1, y1, x2, y2):
        lx1, ly1 = transform(x1, y1)
        lx2, ly2 = transform(x2, y2)
        draw.line((lx1, ly1, lx2, ly2), fill=color, width=w)
        # Rounded caps
        rad = w / 2
        draw.ellipse((lx1-rad, ly1-rad, lx1+rad, ly1+rad), fill=color)
        draw.ellipse((lx2-rad, ly2-rad, lx2+rad, ly2+rad), fill=color)

    draw_thick_line(42, 58, 58, 58)
    draw_thick_line(34, 68, 66, 68)
    
    # Resize for antialiasing
    return img.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS if hasattr(Image, 'Resampling') else Image.LANCZOS)

frames = []
NUM_FRAMES = 45 # Smoother
for i in range(NUM_FRAMES):
    # Scale pulses gently from 0.92 to 1.08
    scale = 1.0 + 0.08 * math.sin((i / NUM_FRAMES) * math.pi * 2)
    frames.append(draw_logo(scale))

frames[0].save('public/favicon.gif', save_all=True, append_images=frames[1:], duration=40, loop=0)
print("Successfully generated animated favicon.gif")
