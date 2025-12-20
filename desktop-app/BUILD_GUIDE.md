# CliniScribe Build Guide

How to build CliniScribe installers for all platforms.

## 📋 Quick Answer: Yes, CliniScribe Works on Windows!

**Built so far:**
- ✅ macOS (ARM64 Apple Silicon)
- ⏳ Windows (ready to build)
- ⏳ Linux (ready to build)

The same codebase works on **all platforms** - you just need to build on each OS.

---

## 🏗️ Building Options

### Option 1: Build Locally on Each Platform

**Best for:** Testing, development, one-time builds

- Build macOS installers → on a Mac
- Build Windows installers → on a Windows PC
- Build Linux installers → on Ubuntu/Debian

### Option 2: Use GitHub Actions (Automated)

**Best for:** Distribution, releases, CI/CD

- Push a tag like `v1.0.0`
- GitHub automatically builds **all platforms**
- Download installers from GitHub Releases

### Option 3: Cross-Compilation (Advanced)

**Note:** Tauri doesn't fully support cross-compilation. You need the target OS to build.

---

## 🍎 macOS Build (What We Just Did!)

### Prerequisites

```bash
# Check if installed:
node --version  # Need 16+
rustc --version # Need latest
```

### Build Steps

```bash
# 1. Install dependencies
npm install

# 2. Build Tauri app
npm run tauri build

# Output:
# - CliniScribe.app → src-tauri/target/release/bundle/macos/
# - CliniScribe.dmg → src-tauri/target/release/bundle/dmg/
```

### Create Professional PKG Installer

```bash
cd installers/macos
bash build-pkg.sh
# Output: installers/output/macos/CliniScribe-1.0.0.pkg
```

**Built Successfully:** ✅
- CliniScribe.app (3.4 MB)
- CliniScribe_1.0.0_aarch64.dmg (3.1 MB)
- CliniScribe-1.0.0.pkg (3.1 MB)

---

## 🪟 Windows Build

### Prerequisites

Install on your Windows 10/11 PC:

1. **Node.js**: https://nodejs.org
   ```cmd
   node --version
   ```

2. **Rust**: https://rustup.rs
   ```cmd
   rustc --version
   ```

3. **NSIS** (for installer): https://nsis.sourceforge.io
   ```cmd
   makensis /?
   ```

4. **Visual Studio Build Tools**: https://visualstudio.microsoft.com/downloads/
   - Select "Desktop development with C++"

### Build Steps

```cmd
REM 1. Clone the repository
git clone https://github.com/yourname/cliniscribe.git
cd cliniscribe\desktop-app

REM 2. Install dependencies
npm install

REM 3. Build Tauri app
npm run tauri build

REM 4. Build NSIS installer
cd installers\windows
makensis cliniscribe.nsi

REM Output: installers\output\windows\CliniScribe-Setup-1.0.0.exe
```

### What Gets Built:

- `CliniScribe.exe` - The main application
- `CliniScribe-Setup-1.0.0.exe` - NSIS installer (recommended for distribution)
- `CliniScribe.msi` - MSI installer (alternative)

### Installer Features:

✅ Professional installer wizard
✅ Start menu shortcuts
✅ Desktop shortcut (optional)
✅ Add/Remove Programs integration
✅ Clean uninstaller
✅ Optional user data removal on uninstall

---

## 🐧 Linux Build

### Prerequisites (Ubuntu/Debian)

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install system dependencies
sudo apt-get update
sudo apt-get install -y \
    libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev
```

### Build Steps

```bash
# 1. Clone and install
git clone https://github.com/yourname/cliniscribe.git
cd cliniscribe/desktop-app
npm install

# 2. Build Tauri app
npm run tauri build

# 3. Build DEB package
cd installers/linux
bash build-deb.sh

# Output: installers/output/linux/cliniscribe_1.0.0_amd64.deb
```

### What Gets Built:

- `cliniscribe` - The binary executable
- `cliniscribe_1.0.0_amd64.deb` - Debian package
- Desktop entry for application menu
- Proper dependency declarations

---

## 🤖 Automated Multi-Platform Build (GitHub Actions)

### Setup (One-Time)

1. **Push your code** to GitHub:
   ```bash
   git add .
   git commit -m "Add build workflows"
   git push origin main
   ```

2. **Create a release tag**:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

3. **GitHub Actions runs automatically** and builds:
   - macOS installers (DMG + PKG)
   - Windows installer (EXE)
   - Linux package (DEB)

4. **Download from GitHub Releases**:
   - Go to your repo → Releases
   - Find v1.0.0
   - Download all platform installers

### Workflow File Created

Location: `.github/workflows/build-installers.yml`

**Triggers:**
- Push tags like `v1.0.0`, `v1.1.0`
- Manual trigger from Actions tab

**Builds:**
- ✅ macOS (on GitHub's macOS runner)
- ✅ Windows (on GitHub's Windows runner)
- ✅ Linux (on GitHub's Ubuntu runner)

---

## 📊 Build Matrix Comparison

| Platform | Build Time | Installer Size | Prerequisites | Difficulty |
|----------|-----------|----------------|---------------|-----------|
| **macOS** | ~5 min | 3-4 MB | Xcode tools, Rust | Easy |
| **Windows** | ~8 min | 4-5 MB | VS Build Tools, NSIS | Medium |
| **Linux** | ~6 min | 3-4 MB | Many packages | Easy |

---

## 🔄 Build All Platforms with One Command

### Using the Unified Builder

```bash
# From desktop-app directory:
cd installers

# Build for current platform:
./build-all.sh --current

# Build all (requires correct OS):
./build-all.sh --all

# Build specific platform:
./build-all.sh --macos
./build-all.sh --windows  # On Windows
./build-all.sh --linux    # On Linux
```

**Note:** You must be on the target OS. Cross-compilation is not fully supported.

---

## 🧪 Testing Your Builds

### macOS

```bash
# Test the app directly
open src-tauri/target/release/bundle/macos/CliniScribe.app

# Test PKG installer
sudo installer -pkg installers/output/macos/CliniScribe-1.0.0.pkg -target /
open /Applications/CliniScribe.app

# Test DMG
open src-tauri/target/release/bundle/dmg/CliniScribe_1.0.0_aarch64.dmg
```

### Windows

```cmd
REM Test the app directly
src-tauri\target\release\cliniscribe.exe

REM Test installer
installers\output\windows\CliniScribe-Setup-1.0.0.exe

REM Verify installation
"C:\Program Files\CliniScribe\CliniScribe.exe"
```

### Linux

```bash
# Test the app directly
./src-tauri/target/release/cliniscribe

# Test DEB package
sudo dpkg -i installers/output/linux/cliniscribe_1.0.0_amd64.deb
cliniscribe

# Verify installation
dpkg -l | grep cliniscribe
```

---

## 📦 Distribution Checklist

Before distributing your installers:

### Required Steps:

- [ ] **Test on clean system** (VM or fresh install)
- [ ] **Verify all features work** (upload, process, export)
- [ ] **Check file sizes** (should be 3-5 MB)
- [ ] **Generate SHA256 checksums**:
  ```bash
  shasum -a 256 installers/output/*/*/*
  ```

### Recommended Steps:

- [ ] **Code sign** (macOS and Windows):
  - macOS: Apple Developer ID ($99/year)
  - Windows: Code signing certificate (~$100-300/year)

- [ ] **Notarize** (macOS only):
  ```bash
  xcrun notarytool submit CliniScribe-1.0.0.pkg \
    --apple-id "your@email.com" \
    --team-id "TEAMID" \
    --wait
  ```

- [ ] **Create release notes** (what's new, bug fixes)

- [ ] **Upload to GitHub Releases** or your website

---

## 🚀 Quick Start for Windows Build

**Since you asked about Windows, here's the fastest way:**

### On a Windows PC:

```cmd
REM 1. Install prerequisites (if not already installed)
winget install OpenJS.NodeJS
winget install Rustlang.Rustup
winget install NSIS.NSIS

REM 2. Clone and build
git clone https://github.com/yourname/cliniscribe.git
cd cliniscribe\desktop-app
npm install
npm run tauri build

REM 3. You now have CliniScribe.exe!
REM Find it at: src-tauri\target\release\cliniscribe.exe

REM 4. (Optional) Build installer
cd installers\windows
makensis cliniscribe.nsi
```

**Output:** `CliniScribe-Setup-1.0.0.exe` ready for distribution!

---

## 🤔 FAQ

### Can I build Windows installer on Mac?

**No.** Tauri requires the target OS for building native apps. You need Windows to build the Windows version.

### Can I use GitHub Actions instead?

**Yes!** Push a tag (`git tag v1.0.0 && git push origin v1.0.0`) and GitHub will build all platforms automatically. This is the easiest way.

### How do I update the version number?

Update in **three places**:
1. `package.json` → `"version": "1.0.0"`
2. `src-tauri/Cargo.toml` → `version = "1.0.0"`
3. `src-tauri/tauri.conf.json` → `"version": "1.0.0"`

### Do I need to rebuild for every platform?

**Yes.** Each platform needs its own build:
- macOS: requires macOS (Intel or ARM)
- Windows: requires Windows 10/11
- Linux: requires Linux (Ubuntu recommended)

### Can students install without admin rights?

**macOS**: No, requires admin for /Applications install
**Windows**: Installer requests admin by default
**Linux**: DEB package requires sudo

For non-admin installs, provide portable versions (just the .exe or .app).

---

## 📞 Need Help Building?

**Can't build on Windows?**
→ Use GitHub Actions - push a tag and it builds automatically

**Build errors?**
→ Check you have all prerequisites installed

**Want to test before building?**
→ The macOS version you already built works perfectly - Windows version will be very similar!

**Questions?**
→ Open an issue on GitHub or email support@cliniscribe.com

---

**You now have everything you need to build CliniScribe for all platforms!** 🎉

The Windows version will work exactly like the macOS version you just built - same features, same performance, same user experience.
