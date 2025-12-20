# CliniScribe Installation Guide

Simple installation instructions for medical and nursing students.

## 📥 Download CliniScribe

Visit [cliniscribe.com/download](https://cliniscribe.com/download) and choose your platform:

- **macOS** (Mac computers with Apple Silicon or Intel)
- **Windows** (Windows 10 or 11)
- **Linux** (Ubuntu, Debian, Fedora)

---

## 🍎 macOS Installation

### System Requirements
- macOS 10.15 (Catalina) or later
- 8 GB RAM (16 GB recommended)
- 10 GB free disk space

### Installation Steps

**Option 1: PKG Installer (Recommended)**

1. **Download** `CliniScribe-1.0.0.pkg`

2. **Double-click** the downloaded PKG file

3. **Follow the installer** - Click "Continue" through the screens

4. **Enter your password** when prompted (needed to install to Applications folder)

5. **Done!** CliniScribe is now in your Applications folder

6. **Launch** from Applications or Spotlight (⌘ + Space, type "CliniScribe")

**Option 2: DMG Installer**

1. **Download** `CliniScribe-1.0.0.dmg`

2. **Double-click** the DMG file to mount it

3. **Drag** the CliniScribe icon to the Applications folder

4. **Eject** the DMG (right-click → Eject)

5. **Launch** from Applications folder

### First Launch (Important!)

When you first open CliniScribe, macOS may show a security warning because the app isn't code-signed (yet):

**If you see "CliniScribe cannot be opened":**

1. Go to **System Settings** → **Privacy & Security**
2. Scroll down to the Security section
3. Click **"Open Anyway"** next to CliniScribe
4. Click **Open** in the confirmation dialog

This only happens once. Future launches will work normally.

### Uninstallation

Simply drag **CliniScribe.app** from Applications to the Trash.

---

## 🪟 Windows Installation

### System Requirements
- Windows 10 or Windows 11
- 8 GB RAM (16 GB recommended)
- 10 GB free disk space

### Installation Steps

1. **Download** `CliniScribe-Setup-1.0.0.exe`

2. **Right-click** the installer and select **"Run as Administrator"**

3. **Windows SmartScreen** may appear:
   - Click **"More info"**
   - Click **"Run anyway"**

4. **Follow the installer**:
   - Choose installation location (default is fine)
   - Select "Create desktop shortcut" if desired
   - Click "Install"

5. **Done!** CliniScribe is installed

6. **Launch** from:
   - Desktop shortcut (if created)
   - Start Menu → CliniScribe
   - Search bar → type "CliniScribe"

### Uninstallation

1. **Settings** → **Apps** → **Installed apps**
2. Find **CliniScribe** in the list
3. Click the **three dots** (⋯) → **Uninstall**
4. Choose whether to keep your data and settings

---

## 🐧 Linux Installation

### System Requirements
- Ubuntu 20.04+ / Debian 11+ / Fedora 35+
- 8 GB RAM (16 GB recommended)
- 10 GB free disk space

### Installation Steps

**Ubuntu/Debian (.deb package):**

```bash
# Download the .deb package
# Then install:
sudo dpkg -i cliniscribe_1.0.0_amd64.deb

# If you get dependency errors:
sudo apt-get install -f

# Launch from terminal:
cliniscribe

# Or from Applications menu: search "CliniScribe"
```

**Fedora/RHEL (.rpm package):**

```bash
# Download the .rpm package
# Then install:
sudo dnf install cliniscribe-1.0.0.x86_64.rpm

# Launch:
cliniscribe
```

**AppImage (Universal):**

```bash
# Download CliniScribe.AppImage
# Make it executable:
chmod +x CliniScribe.AppImage

# Run it:
./CliniScribe.AppImage
```

### Uninstallation

**Ubuntu/Debian:**
```bash
sudo apt remove cliniscribe
```

**Fedora:**
```bash
sudo dnf remove cliniscribe
```

---

## 🚀 First-Time Setup

After installation, CliniScribe needs to download AI models on first run.

### What Happens:

1. **Launch CliniScribe** - you'll see the Setup Wizard

2. **Welcome Screen** - introduces CliniScribe features

3. **Download AI Models** (~5 GB):
   - **Whisper** (speech-to-text) - ~1.5 GB
   - **Llama 3.2** (text generation) - ~3.5 GB

   ⏱️ **Time**: 5-15 minutes depending on your internet speed

4. **Setup Complete!** - you're ready to process lectures

### System Check:

The setup wizard will verify:
- ✅ Sufficient disk space (10 GB minimum)
- ✅ Internet connection (for model downloads)
- ✅ System permissions

---

## 💡 Usage Quick Start

### Processing Your First Lecture

1. **Click "Select Audio File"** or drag-and-drop

2. **Choose your lecture recording**:
   - Supported: MP3, WAV, M4A, FLAC, OGG, AAC
   - Max size: 500 MB
   - Recommended: 30-90 minute lectures

3. **Select Subject** (optional):
   - General, Anatomy, Physiology, Pharmacology, etc.
   - Helps tailor the summary to your topic

4. **Adjust Summary Length**:
   - **Quick** (5%) - Bullet points only
   - **Balanced** (15%) - Recommended for most lectures
   - **Comprehensive** (30%) - Detailed notes

5. **Click "Generate Study Notes"**

6. **Wait** (~5-10 minutes for a 1-hour lecture)

7. **Review & Export**:
   - Read your structured notes
   - Export as Markdown (.md)
   - Export as PDF
   - Copy to clipboard

---

## 🔧 Troubleshooting

### CliniScribe Won't Launch

**macOS:**
- Check Security & Privacy settings (see First Launch section above)
- Make sure macOS version is 10.15 or later

**Windows:**
- Run as Administrator
- Disable antivirus temporarily during installation
- Check Windows Defender didn't block it

**Linux:**
- Ensure all dependencies are installed:
  ```bash
  sudo apt-get install libwebkit2gtk-4.0-37 libgtk-3-0
  ```

### Model Downloads Fail

- **Check internet connection**
- **Ensure 10 GB free space** on your drive
- **Disable VPN** temporarily (can interfere with downloads)
- **Restart CliniScribe** and try again

### Processing Takes Too Long

- **First run is slower** (loading models into memory)
- **Larger files take longer** (1 hour audio ≈ 10 minutes processing)
- **GPU matters**: Systems with GPU process faster
- **Close other apps** to free up RAM

### Audio File Not Recognized

- **Check format**: Must be MP3, WAV, M4A, FLAC, OGG, or AAC
- **Check size**: Maximum 500 MB
- **Try converting**: Use online converter to MP3 if needed

### Study Notes Are Incomplete

- **Try higher summary ratio** (20-30% instead of 15%)
- **Check audio quality**: Poor recording quality affects results
- **Specify subject**: Helps AI understand medical terminology

---

## 📞 Getting Help

### Quick Fixes

1. **Restart CliniScribe** - solves 80% of issues
2. **Check system requirements** - make sure your computer meets specs
3. **Free up disk space** - need at least 10 GB free
4. **Update your OS** - keep macOS/Windows/Linux up to date

### Still Need Help?

- **Documentation**: [cliniscribe.com/docs](https://cliniscribe.com/docs)
- **FAQ**: [cliniscribe.com/faq](https://cliniscribe.com/faq)
- **Email Support**: support@cliniscribe.com
- **GitHub Issues**: [github.com/yourname/cliniscribe/issues](https://github.com/yourname/cliniscribe/issues)

### Include This Info:

When reporting issues, please include:
- Your operating system (macOS 14, Windows 11, Ubuntu 22.04, etc.)
- CliniScribe version (found in Settings → About)
- What you were trying to do
- Error message (if any)
- Screenshots (if helpful)

---

## 🔒 Privacy & Offline Use

### Your Data is Private

✅ **100% Local Processing** - All AI runs on your computer
✅ **No Cloud Uploads** - Audio never leaves your device
✅ **No Account Required** - No login, no tracking
✅ **Fully Offline** - Works without internet (after initial setup)

### Internet Only Needed For:

- Initial AI model downloads (one-time, ~5 GB)
- Optional app updates
- Nothing else!

---

## 🔄 Updates

CliniScribe checks for updates automatically (requires internet).

**To update manually:**

1. **Download** the latest installer
2. **Run it** - will upgrade your existing installation
3. **Your data and settings** are preserved
4. **Models are kept** - no need to re-download

---

## ❓ Frequently Asked Questions

### Can I use CliniScribe offline?

**Yes!** After the initial setup (which downloads AI models), CliniScribe works 100% offline. Process as many lectures as you want without internet.

### How much does it cost?

CliniScribe is **free for educational use** by medical and nursing students.

### Is there a mobile version?

Not yet. CliniScribe requires significant computing power for AI processing, which works best on laptops/desktops.

### Can I process multiple lectures at once?

Currently, CliniScribe processes one lecture at a time. This ensures the best quality and performance.

### Where are my notes saved?

Notes are stored in:
- **macOS**: `~/Library/Application Support/com.cliniscribe.app/notes/`
- **Windows**: `%APPDATA%\cliniscribe\notes\`
- **Linux**: `~/.config/cliniscribe/notes/`

### Can I customize the note format?

Yes! Go to **Settings** → **Note Format** to customize:
- Section headings
- Summary style
- Export templates

### Does CliniScribe work with Zoom/Teams recordings?

Yes! As long as you can save the recording as an audio file (MP3, WAV, etc.), CliniScribe can process it.

---

## 🎓 Tips for Best Results

### Recording Tips:

1. **Use a good microphone** - built-in laptop mics work, but external is better
2. **Reduce background noise** - find a quiet space
3. **Speak clearly** - good diction helps transcription accuracy
4. **Record in segments** - 30-90 minute chunks work best

### Processing Tips:

1. **Choose the right subject** - helps AI understand context
2. **Start with "Balanced"** - adjust if needed
3. **Review and edit** - AI is good but not perfect
4. **Export early** - save your notes before making edits

### Study Tips:

1. **Process lectures same day** - while content is fresh
2. **Review generated notes** - add your own annotations
3. **Combine with textbooks** - notes are a supplement, not replacement
4. **Share with study group** - compare notes with classmates

---

**Ready to transform your study notes? Download CliniScribe and get started!**

📥 [Download for macOS](https://cliniscribe.com/download/macos)
📥 [Download for Windows](https://cliniscribe.com/download/windows)
📥 [Download for Linux](https://cliniscribe.com/download/linux)
