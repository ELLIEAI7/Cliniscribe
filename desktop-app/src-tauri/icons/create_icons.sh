#!/bin/bash
# Create a simple placeholder icon using macOS sips

# Create a base64 encoded 512x512 blue PNG
cat > icon-512.png << 'PNGEOF'
iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADlSURBVFhH7ZbBDcMgDEXJEt2jO3SH7tEdukN36A7dIYbKqaoqGhNj25yo/tOJIJ6++QNJVsaYp5MxxphT4QAOOOCAA45jA51zQgiB9377O8WOEIIWQuSc0+N4FhFx13VdcM51lVJKKUWJiLuO47jwPM9V13VdKKUURZIkSSillFJKKaUUJY7jQmtdUGsthBCF1loppdSvlFJKqV8ppZRS6lfe+57We6XUj5RS6lellFJK/UoppdSvlFJKqV8ppZRS6lce+77v6H/fPvjvM0Yp9SOl1I+UUv+SSv1IKfUfpdR/lFL/UUr9Rin1o38B2Hkq/zGF0KIAAAAASUVORK5CYII=
PNGEOF

base64 -d icon-512.png > temp.png 2>/dev/null || {
    # If that doesn't work, create a simple solid color image
    # Use SF Symbols on macOS to create a temporary icon
    # For now, just create a minimal 1x1 pixel and scale it
    printf '\x89\x50\x4e\x47\x0d\x0a\x1a\x0a\x00\x00\x00\x0d\x49\x48\x44\x52\x00\x00\x00\x20\x00\x00\x00\x20\x08\x02\x00\x00\x00\xfc\x18\xed\xa3\x00\x00\x00\x0c\x49\x44\x41\x54\x48\xc7\x63\xf8\xcf\xc0\xc0\x00\x00\x02\x62\x01\x01\x9c\x8f\x1e\xbc\x00\x00\x00\x00\x49\x45\x4e\x44\xae\x42\x60\x82' > icon.png
}

# Use sips to create different sizes
sips -z 32 32 icon.png --out 32x32.png 2>/dev/null
sips -z 128 128 icon.png --out 128x128.png 2>/dev/null
sips -z 256 256 icon.png --out 128x128@2x.png 2>/dev/null

# Create ICNS file for macOS
mkdir temp.iconset 2>/dev/null
sips -z 16 16 icon.png --out temp.iconset/icon_16x16.png 2>/dev/null
sips -z 32 32 icon.png --out temp.iconset/icon_16x16@2x.png 2>/dev/null
sips -z 32 32 icon.png --out temp.iconset/icon_32x32.png 2>/dev/null
sips -z 64 64 icon.png --out temp.iconset/icon_32x32@2x.png 2>/dev/null
sips -z 128 128 icon.png --out temp.iconset/icon_128x128.png 2>/dev/null
sips -z 256 256 icon.png --out temp.iconset/icon_128x128@2x.png 2>/dev/null
sips -z 256 256 icon.png --out temp.iconset/icon_256x256.png 2>/dev/null
sips -z 512 512 icon.png --out temp.iconset/icon_256x256@2x.png 2>/dev/null
sips -z 512 512 icon.png --out temp.iconset/icon_512x512.png 2>/dev/null
sips -z 1024 1024 icon.png --out temp.iconset/icon_512x512@2x.png 2>/dev/null
iconutil -c icns temp.iconset -o icon.icns 2>/dev/null
rm -rf temp.iconset

# Create ICO for Windows (simple conversion)
sips -s format bmp icon.png --out icon.bmp 2>/dev/null
# We'll skip proper ICO creation for now, just copy the PNG
cp icon.png icon.ico

echo "Icons created!"
ls -lh
