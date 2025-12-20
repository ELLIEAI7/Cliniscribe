# CliniScribe Bundled Models Usage

This bundle contains pre-downloaded AI models for offline CliniScribe installation.

## Contents

- **Whisper Models**: Speech-to-text models (base, small, medium)
- **Ollama Models**: Llama 3.2 3B for text generation

Total size: ~5GB

## Using the Bundled Models

### During Installation

1. Extract this bundle to your system:
   ```bash
   tar -xzf cliniscribe-models-bundle-1.0.0.tar.gz
   ```

2. Place models in the correct locations:

   **macOS:**
   ```bash
   mkdir -p ~/Library/Application\ Support/com.cliniscribe.app/models
   cp -r whisper/* ~/Library/Application\ Support/com.cliniscribe.app/models/whisper/
   cp -r ollama/* ~/Library/Application\ Support/com.cliniscribe.app/models/ollama/
   ```

   **Linux:**
   ```bash
   mkdir -p ~/.config/cliniscribe/models
   cp -r whisper/* ~/.config/cliniscribe/models/whisper/
   cp -r ollama/* ~/.config/cliniscribe/models/ollama/
   ```

   **Windows:**
   ```cmd
   mkdir %APPDATA%\cliniscribe\models
   xcopy /E /I whisper %APPDATA%\cliniscribe\models\whisper
   xcopy /E /I ollama %APPDATA%\cliniscribe\models\ollama
   ```

3. Install CliniScribe normally. It will detect the pre-installed models and skip downloading.

## For Offline Systems

If installing on a computer without internet:

1. Download this bundle on a computer with internet
2. Transfer via USB drive to the offline computer
3. Extract and place models as shown above
4. Install CliniScribe from the installer
5. Run CliniScribe - it will use the bundled models

## Verification

To verify the models were installed correctly, check:

- Whisper models should be in: `models/whisper/ggml-*.bin`
- Ollama models should be in: `models/ollama/`

CliniScribe will display "✓ Models found" during first run if successful.

## SHA256 Checksums

See MANIFEST.json for individual file checksums.

## Support

For issues with bundled models:
- Check file permissions (should be readable)
- Verify SHA256 checksums match
- Visit: https://cliniscribe.com/docs/offline-installation
