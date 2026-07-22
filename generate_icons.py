import os
from PIL import Image, ImageDraw, ImageFont

def generate_svg():
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="128" fill="#070a10"/>
  <circle cx="256" cy="256" r="180" fill="#1e1b4b" stroke="#6366f1" stroke-width="12"/>
  <path d="M150 200 L210 256 L150 312" fill="none" stroke="#10b981" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="235" y="295" font-family="monospace, Courier New, Courier" font-size="120" font-weight="bold" fill="#ffffff">26</text>
  <line x1="235" y1="315" x2="355" y2="315" stroke="#6366f1" stroke-width="20" stroke-linecap="round"/>
</svg>
"""
    os.makedirs('public', exist_ok=True)
    with open('public/favicon.svg', 'w') as f:
        f.write(svg_content)
    print("Generated public/favicon.svg")

def generate_png(size, is_maskable=False):
    # Create background image
    # For PWA maskable icons, we must use a solid background
    bg_color = (7, 10, 16) # #070a10
    img = Image.new('RGB', (size, size), bg_color)
    draw = ImageDraw.Draw(img)

    scale = size / 512.0

    # Draw central circle
    # Radius = 180 * scale
    center = size / 2.0
    r = 180 * scale
    circle_box = [center - r, center - r, center + r, center + r]
    draw.ellipse(circle_box, fill=(30, 27, 75), outline=(99, 102, 241), width=int(12 * scale)) # #1e1b4b, #6366f1

    # Draw terminal prompt '>'
    # Path: (150, 200) -> (210, 256) -> (150, 312)
    p1 = (int(150 * scale), int(200 * scale))
    p2 = (int(210 * scale), int(256 * scale))
    p3 = (int(150 * scale), int(312 * scale))
    # Draw thicker lines using polygon or multiple lines
    draw.line([p1, p2, p3], fill=(16, 185, 129), width=int(24 * scale), joint="round") # #10b981

    # Draw cursor line
    # Line from (235, 315) to (355, 315)
    c1 = (int(235 * scale), int(315 * scale))
    c2 = (int(355 * scale), int(315 * scale))
    draw.line([c1, c2], fill=(99, 102, 241), width=int(20 * scale)) # #6366f1

    # Draw text '26'
    # Try to load Consolas or Courier New or fallback
    font_path = "C:\\Windows\\Fonts\\consolab.ttf"
    if not os.path.exists(font_path):
        font_path = "C:\\Windows\\Fonts\\lucon.ttf" # Lucida Console
    if not os.path.exists(font_path):
        font_path = "C:\\Windows\\Fonts\\courbd.ttf" # Courier New Bold
        
    font_size = int(120 * scale)
    try:
        font = ImageFont.truetype(font_path, font_size)
    except IOError:
        font = ImageFont.load_default()
        print("Fallback to default font")

    # Position text '26'
    text_pos = (int(230 * scale), int(190 * scale))
    draw.text(text_pos, "26", fill=(255, 255, 255), font=font)

    # Save
    name_suffix = "-maskable" if is_maskable else ""
    filename = f"public/icon-{size}{name_suffix}.png"
    img.save(filename, "PNG")
    print(f"Generated {filename}")

if __name__ == '__main__':
    generate_svg()
    generate_png(192, is_maskable=False)
    generate_png(512, is_maskable=False)
    generate_png(192, is_maskable=True)
    generate_png(512, is_maskable=True)
