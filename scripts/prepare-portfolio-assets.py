"""Generate small previews from existing public assets (optional Pillow helper).

Generated files are committed; the Node-only build needs no Python dependency.
"""
from pathlib import Path
from PIL import Image
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "portfolio-assets"
OUT.mkdir(exist_ok=True)
with Image.open(ROOT / "public/assets/mini-ugur-poses.webp") as sheet:
    cell = sheet.crop((0, 0, round(sheet.width / 4), round(sheet.height / 2)))
    cell.thumbnail((128, 128), Image.Resampling.LANCZOS)
    cell.save(OUT / "mini-preview.webp", lossless=True)
with Image.open(ROOT / "public/images/drug-design/fluoro-deoxy-amentoflavone-interaction-map.png") as image:
    image.thumbnail((640, 640), Image.Resampling.LANCZOS)
    image.save(OUT / "drug-design-preview.webp", quality=90, method=6)
with Image.open(ROOT / "src/features/careeros/assets/demo.png") as image:
    image.thumbnail((640, 640), Image.Resampling.LANCZOS)
    image.save(ROOT / "src/features/careeros/assets/demo-preview.webp", quality=90, method=6)
with Image.open(ROOT / "public/images/cancer-bioinformatics/gepia2-cxcr4-expression.jpg") as image:
    image.thumbnail((640, 640), Image.Resampling.LANCZOS)
    image.save(OUT / "cancer-expression-preview.webp", quality=90, method=6)
for file in [OUT / "mini-preview.webp", OUT / "drug-design-preview.webp", ROOT / "src/features/careeros/assets/demo-preview.webp"]:
    print(file.name, file.stat().st_size, "bytes")
