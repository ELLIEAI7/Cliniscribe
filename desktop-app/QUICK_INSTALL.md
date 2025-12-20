# CliniScribe - Quick Installation Guide 🚀

## Super Easy Installation (Recommended)

### Option 1: Bundled Installer (Offline Ready) - EASIEST!

**One-click install with everything included** - No configuration needed!

1. **Download** the bundled installer:
   - File: `CliniScribe-1.0.0-Bundled-Installer.pkg` (~5.4 GB)
   - Includes app + all AI models pre-installed

2. **Double-click** the PKG file

3. **Follow** the installation wizard

4. **Launch** CliniScribe from your Applications folder

5. **Done!** No setup needed - everything works immediately ✅

**Perfect for:**
- Offline environments
- Medical school labs with limited internet
- USB distribution to classmates
- No-hassle installation

---

### Option 2: Standard Installer (Smaller Download)

**Smaller initial download, models download on first run**

1. **Download** the standard installer:
   - File: `CliniScribe-1.0.0-Installer.pkg` (~600 MB)

2. **Double-click** the PKG file

3. **Launch** CliniScribe from Applications

4. **Setup wizard** appears:
   - Click "Get Started"
   - AI models download automatically (~5 GB, 5-15 minutes)
   - One-time download - stored locally

5. **Done!** Ready to use

**Perfect for:**
- Users with good internet connection
- Smaller initial download
- Automatic updates to latest models

---

### Option 3: DMG (Direct App)

**Drag-and-drop installation**

1. **Download**: `CliniScribe_1.0.0_aarch64.dmg`

2. **Open** the DMG file

3. **Drag** CliniScribe.app to Applications folder

4. **Launch** CliniScribe

5. **First run**: Setup wizard downloads models (one-time, ~5 GB)

6. **Done!**

---

## What Happens After Installation?

### First Launch

**If using bundled installer:**
- ✅ App opens immediately
- ✅ Models already installed
- ✅ Skip setup wizard
- ✅ Start processing lectures right away!

**If using standard installer:**
- 📥 Setup wizard appears
- 🤖 Downloads AI models (5-15 minutes)
- ✅ One-time setup
- ✅ Ready to use!

### Using CliniScribe

1. **Upload or Record**:
   - Upload audio file (MP3, WAV, M4A, etc.)
   - OR Record live with microphone

2. **Configure**:
   - Choose subject (Anatomy, Physiology, etc.)
   - Set summary length (Brief to Comprehensive)
   - Choose quiz type

3. **Process**:
   - Click "Process" button
   - Wait 1-5 minutes (depending on length)

4. **Get Results**:
   - Study notes with key concepts
   - Full transcript with timestamps
   - Quiz questions (optional)
   - Export as Markdown

---

## System Requirements

- **macOS**: 10.15 (Catalina) or later
- **RAM**: 8 GB minimum, 16 GB recommended
- **Storage**: 10 GB free space (for AI models)
- **Internet**: Required for first-time setup (unless using bundled installer)

---

## Troubleshooting

### Installation Issues

**"CliniScribe cannot be opened because it is from an unidentified developer"**
1. Right-click CliniScribe.app
2. Click "Open"
3. Click "Open" in the dialog
4. Or: System Settings → Privacy & Security → Allow anyway

**"Permission denied" error**
1. Open Terminal
2. Run: `chmod +x /Applications/CliniScribe.app/Contents/MacOS/CliniScribe`
3. Try launching again

### First Run Issues

**Models not downloading**
- Check internet connection
- Disable VPN temporarily
- Check firewall settings
- Try the bundled installer instead

**Setup wizard stuck**
- Quit CliniScribe
- Delete: `~/Library/Application Support/cliniscribe`
- Restart CliniScribe

**Processing fails**
- Check Services status (green dots in header)
- If red: Quit and restart CliniScribe
- Models may still be loading (wait 1-2 minutes)

### Recording Issues

**Microphone access denied**
- System Settings → Privacy & Security → Microphone
- Enable CliniScribe

**No audio captured**
- Check microphone is selected in browser
- Test microphone in other apps
- Grant microphone permissions

---

## Quick Tips

### For Best Results

✅ **Audio Quality**:
- Use external microphone if possible
- Record from front of classroom
- Minimize background noise
- Keep recordings under 2 hours

✅ **Processing Speed**:
- Use smaller Whisper model (base) for speed
- Use larger model (medium/large) for accuracy
- Enable GPU if you have NVIDIA graphics

✅ **Study Notes**:
- Choose "Standard" summary length for balance
- Select subject for better context
- Export notes as Markdown for later

### Keyboard Shortcuts

- `Cmd+O` - Open audio file
- `Cmd+R` - Start recording
- `Cmd+,` - Open settings
- `Cmd+E` - Export results

---

## Advanced: Manual Installation

### For Developers

1. **Clone repository**:
   ```bash
   git clone https://github.com/cliniscribe/desktop-app.git
   cd desktop-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   cd src-tauri && cargo build
   ```

3. **Run in development**:
   ```bash
   npm run tauri:dev
   ```

4. **Build for production**:
   ```bash
   npm run tauri:build
   ```

---

## Getting Help

- **Documentation**: See `USER_GUIDE.md` for detailed usage
- **Recording Feature**: See `RECORDING_FEATURE.md` for live recording details
- **Build System**: See `installers/README.md` for installer creation
- **Architecture**: See `ARCHITECTURE.md` for technical details

---

## Uninstallation

To remove CliniScribe:

1. **Delete app**: Move CliniScribe.app to Trash
2. **Delete data**: `~/Library/Application Support/cliniscribe`
3. **Delete cache**: `~/.cache/huggingface` (Whisper models)
4. **Delete Ollama**: `~/.ollama` (if not using Ollama elsewhere)

---

## What's Next?

After installation, try:

1. **Test with a lecture**: Upload a short recording (~5 minutes)
2. **Try live recording**: Record yourself explaining a concept
3. **Explore features**: Change summary length, subjects, quiz types
4. **Customize settings**: Adjust models, storage, preferences
5. **Export notes**: Save as Markdown for studying

---

**Enjoy studying smarter with CliniScribe! 🎓💙**
