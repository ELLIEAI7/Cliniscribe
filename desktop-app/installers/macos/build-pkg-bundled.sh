#!/usr/bin/env bash
set -euo pipefail

echo "🍎 Building CogniScribe Bundled PKG Installer..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INSTALLERS_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
BUNDLED_MODELS_DIR="$INSTALLERS_DIR/bundled-models"

echo -e "${BLUE}Checking for bundled models...${NC}"
echo ""

# Check if bundled models exist
if [ ! -d "$BUNDLED_MODELS_DIR" ]; then
    echo -e "${YELLOW}⚠️  Bundled models not found!${NC}"
    echo ""
    echo "To create a bundled installer, you need to download AI models first."
    echo ""
    echo "This will download:"
    echo "  • Whisper base & small models (~650 MB)"
    echo "  • Llama 3.1 8B model (~4.7 GB)"
    echo "  • Total: ~5.4 GB"
    echo ""
    read -p "Download models now? (y/N): " -n 1 -r
    echo

    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cd "$INSTALLERS_DIR"
        ./bundle-models.sh
    else
        echo ""
        echo -e "${RED}Cannot build bundled installer without models.${NC}"
        echo ""
        echo "To build standard installer (without bundled models):"
        echo "  cd $SCRIPT_DIR"
        echo "  ./build-pkg.sh"
        echo ""
        exit 1
    fi
fi

# Verify models were downloaded
if [ ! -d "$BUNDLED_MODELS_DIR/whisper" ] || [ ! -d "$BUNDLED_MODELS_DIR/ollama" ]; then
    echo -e "${RED}✗ Error: Bundled models directory is incomplete${NC}"
    echo "  Expected: $BUNDLED_MODELS_DIR/whisper and $BUNDLED_MODELS_DIR/ollama"
    exit 1
fi

# Calculate bundle size
BUNDLE_SIZE=$(du -sh "$BUNDLED_MODELS_DIR" | cut -f1)
echo -e "${GREEN}✓ Bundled models found ($BUNDLE_SIZE)${NC}"
echo ""

# Build the PKG with bundled models
echo -e "${BLUE}Building PKG installer with bundled models...${NC}"
echo ""

cd "$SCRIPT_DIR"
./build-pkg.sh

# Check if build succeeded
OUTPUT_DIR="$INSTALLERS_DIR/output/macos"
PKG_FILE="$OUTPUT_DIR/CogniScribe-1.0.0-Installer.pkg"

if [ ! -f "$PKG_FILE" ]; then
    echo -e "${RED}✗ Error: PKG build failed${NC}"
    exit 1
fi

# Rename to indicate bundled version
BUNDLED_PKG="$OUTPUT_DIR/CogniScribe-1.0.0-Bundled-Installer.pkg"
mv "$PKG_FILE" "$BUNDLED_PKG"

# Get sizes
PKG_SIZE=$(du -sh "$BUNDLED_PKG" | cut -f1)

echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ Bundled PKG Installer created successfully!${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
echo ""
echo "  📦 File: CogniScribe-1.0.0-Bundled-Installer.pkg"
echo "  📊 Size: $PKG_SIZE"
echo "  📁 Location: $OUTPUT_DIR"
echo ""
echo -e "${BLUE}Installer includes:${NC}"
echo "  ✓ CogniScribe Desktop App"
echo "  ✓ Whisper Base Model (~150 MB)"
echo "  ✓ Whisper Small Model (~500 MB)"
echo "  ✓ Llama 3.1 8B Model (~4.7 GB)"
echo ""
echo -e "${YELLOW}Benefits of bundled installer:${NC}"
echo "  • No internet required after download"
echo "  • Immediate use - no model download on first run"
echo "  • Ideal for offline deployment"
echo "  • Perfect for USB distribution to medical schools"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "  1. Test: sudo installer -pkg \"$BUNDLED_PKG\" -target /"
echo "  2. Verify: Launch CogniScribe and check setup wizard"
echo "  3. Confirm: Setup should skip model download step"
echo ""
echo -e "${BLUE}Distribution:${NC}"
echo "  • Upload to GitHub Releases (tag as 'bundled')"
echo "  • Provide alongside standard installer"
echo "  • Document as 'offline installer' option"
echo ""
