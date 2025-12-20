# CliniScribe Installer Build Guide

This directory contains scripts for building CliniScribe installers for macOS.

## Overview

CliniScribe offers two installer types:

1. **Standard Installer** (~600 MB) - Downloads AI models on first run
2. **Bundled Installer** (~5.4 GB) - Includes pre-downloaded AI models for offline use

## Prerequisites

### For Standard Installer
- macOS 10.15 or later
- Xcode Command Line Tools
- Node.js 18+ and npm
- Rust toolchain (for Tauri)

### For Bundled Installer (Additional Requirements)
- Python 3.8+
- pip3
- faster-whisper library (`pip3 install faster-whisper`)
- Ollama (`brew install ollama` or from https://ollama.com)
- ~10 GB free disk space (for model downloads + build)
- Stable internet connection (for initial model download)

## Building Installers

### Standard Installer (No Models)

The standard installer is lightweight and downloads models on first run:

```bash
cd desktop-app/installers/macos
./build-pkg.sh
```

**Output:** `desktop-app/installers/output/macos/CliniScribe-1.0.0-Installer.pkg`

**Installation size:** ~600 MB
**First run:** Downloads ~5 GB of AI models (requires internet)

### Bundled Installer (With Models)

The bundled installer includes pre-downloaded models for offline deployment:

```bash
cd desktop-app/installers/macos
./build-pkg-bundled.sh
```

This script will:
1. Check if models are already downloaded
2. Prompt to download models if missing (~5.4 GB download)
3. Build the PKG with bundled models
4. Create a renamed installer indicating it's bundled

**Output:** `desktop-app/installers/output/macos/CliniScribe-1.0.0-Bundled-Installer.pkg`

**Installation size:** ~5.4 GB
**First run:** No downloads needed - ready to use immediately

## Model Bundling Process

### Step 1: Download Models

Run the bundle-models.sh script separately if you want to pre-download models:

```bash
cd desktop-app/installers
./bundle-models.sh
```

This will:
- Download Whisper base & small models (~650 MB) using faster-whisper
- Download Llama 3.1 8B model (~4.7 GB) using Ollama
- Store models in `bundled-models/` directory with correct cache structure
- Create a MANIFEST.json with model metadata

**Directory structure:**
```
bundled-models/
├── whisper/
│   └── hub/                    # HuggingFace cache structure
│       └── models--Systran--faster-whisper-{base,small}/
├── ollama/                     # Ollama model files
│   ├── blobs/
│   └── manifests/
├── MANIFEST.json               # Model metadata
└── USAGE.md                    # Installation instructions
```

### Step 2: Build PKG with Models

Once models are downloaded, the build script automatically:

1. Detects `bundled-models/` directory
2. Includes models in PKG payload at `/Library/Application Support/CliniScribe/BundledModels`
3. Generates bundled-specific welcome message
4. Creates postinstall script to copy models to user directories

### Step 3: Installation Process

When a user installs the bundled PKG:

1. **App Installation:** CliniScribe.app → `/Applications/`
2. **Model Installation:** Bundled models → User cache directories
   - Whisper: `~/.cache/huggingface/hub/`
   - Ollama: `~/.ollama/models/`
3. **Marker Creation:** `.models-installed` file indicates bundled models were installed
4. **Permission Fix:** Sets correct ownership for current user

### Step 4: First Run Detection

When CliniScribe launches:

1. Checks for `.models-installed` marker file
2. If found: Skips model download step in setup wizard
3. Shows "Models Pre-Installed!" message
4. User can start using immediately without downloads

## File Descriptions

### Scripts

- **`bundle-models.sh`** - Downloads AI models and creates bundled-models directory
  - Uses faster-whisper to download Whisper models correctly
  - Uses Ollama CLI to download LLM models
  - Creates proper HuggingFace cache structure
  - Generates metadata manifest

- **`macos/build-pkg.sh`** - Main PKG builder
  - Builds Tauri app
  - Detects bundled models (if available)
  - Creates PKG payload structure
  - Generates installer resources (welcome, license, etc.)
  - Builds signed/unsigned PKG

- **`macos/build-pkg-bundled.sh`** - Bundled installer wrapper
  - Checks for bundled models
  - Prompts to download if missing
  - Calls build-pkg.sh
  - Renames output to indicate bundled version

### Installation Scripts

- **`macos/pkg-build/scripts/postinstall`** - Runs after PKG installation
  - Copies bundled models to user directories
  - Sets proper permissions
  - Creates marker file for first-run detection

## Distribution

### Standard Installer
Best for:
- Users with reliable internet
- Smaller download size preferred
- GitHub releases (primary download)

### Bundled Installer
Best for:
- Offline environments (medical schools, hospitals)
- Limited/slow internet connections
- USB drive distribution
- Demo/presentation scenarios
- Corporate deployments with restricted internet

## Build Outputs

Both build scripts create output in:
```
desktop-app/installers/output/macos/
├── CliniScribe-1.0.0-Installer.pkg         # Standard (~600 MB)
└── CliniScribe-1.0.0-Bundled-Installer.pkg # Bundled (~5.4 GB)
```

## Testing

### Test Standard Installer
```bash
sudo installer -pkg "output/macos/CliniScribe-1.0.0-Installer.pkg" -target /
open /Applications/CliniScribe.app
# Should show setup wizard with model download step
```

### Test Bundled Installer
```bash
sudo installer -pkg "output/macos/CliniScribe-1.0.0-Bundled-Installer.pkg" -target /
open /Applications/CliniScribe.app
# Should show "Models Pre-Installed!" and skip download
```

### Verify Bundled Models
```bash
# Check marker file
cat ~/Library/Application\ Support/com.cliniscribe.app/.models-installed

# Check Whisper models
ls -lh ~/.cache/huggingface/hub/models--Systran--faster-whisper-*/

# Check Ollama models
ollama list
```

## Troubleshooting

### Models Not Detected After Installation

**Problem:** Bundled installer doesn't skip download step

**Solutions:**
1. Check marker file exists:
   ```bash
   ls ~/Library/Application\ Support/com.cliniscribe.app/.models-installed
   ```

2. Check model directories:
   ```bash
   ls ~/.cache/huggingface/hub/
   ls ~/.ollama/models/
   ```

3. Check permissions:
   ```bash
   ls -la ~/.cache/huggingface/
   ```

### Bundle-Models.sh Fails

**Problem:** Model download fails

**Solutions:**
1. Check Python installation: `python3 --version`
2. Install faster-whisper: `pip3 install faster-whisper`
3. Check Ollama: `ollama --version`
4. Start Ollama service: `ollama serve`
5. Check disk space: `df -h`

### Build Fails

**Problem:** PKG build errors

**Solutions:**
1. Clean build directory:
   ```bash
   rm -rf macos/pkg-build
   ```

2. Rebuild Tauri app:
   ```bash
   cd desktop-app
   npm run tauri:build
   ```

3. Check file permissions:
   ```bash
   chmod +x macos/*.sh
   ```

## Architecture

```
User downloads installer
         ↓
    Installs PKG
         ↓
Postinstall script runs
         ↓
Copies models to user cache
         ↓
Creates .models-installed marker
         ↓
User launches CliniScribe
         ↓
App checks for marker
         ↓
If found: Skip download
If not found: Download models
```

## Advanced Options

### Custom Model Locations

To use different model storage locations, modify:
- `bundle-models.sh` - Change `BUNDLE_DIR` variable
- `build-pkg.sh` - Update postinstall script paths

### Different Models

To bundle different Whisper or Ollama models:
1. Edit `bundle-models.sh`:
   ```bash
   WHISPER_MODELS=("tiny" "base" "small" "medium")
   OLLAMA_MODELS=("llama3.1:8b" "mistral:7b")
   ```

2. Update postinstall script to match new model names

### Code Signing

To sign installers for distribution:
```bash
export DEVELOPER_ID_INSTALLER="Developer ID Installer: Your Name (TEAM_ID)"
./build-pkg.sh
```

### Notarization

For App Store / Gatekeeper approval:
```bash
xcrun notarytool submit \
  "output/macos/CliniScribe-1.0.0-Installer.pkg" \
  --apple-id "you@example.com" \
  --password "app-specific-password" \
  --team-id "TEAM_ID" \
  --wait
```

## Support

For issues or questions:
- Check the troubleshooting section above
- Review build script output for errors
- Verify all prerequisites are installed
- Check disk space and permissions

## License

See LICENSE file in project root.
