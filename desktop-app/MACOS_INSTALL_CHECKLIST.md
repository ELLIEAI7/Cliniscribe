# macOS Install Checklist (White-Glove)

Goal: zero steps for learners. IT handles everything once; users just launch CogniScribe.

## Prereqs (IT)
- Use a signed and notarized PKG to avoid Gatekeeper prompts.
- Prefer the bundled-models PKG for offline or low-touch installs.
- Prepare an MDM PPPC profile to pre-approve microphone access for bundle ID `com.bageltech.cogniscribe`.

## Checklist

1) Prepare the installer
- File: `CogniScribe-1.0.0-Bundled-Installer.pkg` (offline) or `CogniScribe-1.0.0.pkg` (online)
- Verify signature: `codesign -dv --verbose=4 /Applications/CogniScribe.app`
- Verify notarization: `spctl -a -vv /Applications/CogniScribe.app`

2) Deploy
- MDM push is preferred.
- Manual install (admin only): `sudo installer -pkg <path-to-pkg> -target /`
- If not notarized (dev only): `xattr -dr com.apple.quarantine /Applications/CogniScribe.app`

3) First launch (no user prompts)
- Apply PPPC profile for Microphone (and Screen Recording if OBS features are used).
- Confirm bundled models marker exists:
  `~/Library/Application Support/com.bageltech.cogniscribe/.models-installed`

4) Validate
- Launch CogniScribe and confirm setup completes without downloads.
- Health check: `curl http://localhost:8080/api/health`

5) Support handoff
- Provide a single-click dock/Launchpad shortcut.
- Share a single support contact for issues (no troubleshooting steps for users).

---

## Appendix: MDM Profile Requirements (PPPC/TCC)

Goal: zero prompts at first launch.

**App Identifier**
- Bundle ID: `com.bageltech.cogniscribe`
- Code requirement: use your signed Team ID (recommended) or bundle ID (dev only).

**Privacy Controls (allow)**
- Microphone (`kTCCServiceMicrophone`) - required for recording.
- Screen Recording (`kTCCServiceScreenCapture`) - required only if OBS features are enabled.

**Notes**
- Prefer distributing a signed/notarized build so PPPC rules match reliably.
- If OBS is not used, omit Screen Recording.
