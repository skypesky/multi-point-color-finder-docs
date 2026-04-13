# Windows Installation

## System Requirements

- **Operating System**: Windows 10 (version 1903 or higher), Windows 11
- **Architecture**: x86_64 (AMD64)
- **Disk Space**: About 200MB for ADB

## Installation Methods

### Method 1: Download Platform Tools (Recommended)

1. Download [Android SDK Platform Tools](https://developer.android.com/studio/releases/platform-tools) for Windows
2. Extract to `C:\Android\Sdk\platform-tools`

### Method 2: Via Package Managers (Recommended)

Using [Scoop](https://scoop.sh) or [Chocolatey](https://chocolatey.org):

```powershell
# Using Scoop
scoop install adb

# Using Chocolatey
choco install adb
```

## Configure Environment Variable

1. Right-click "This PC" → Properties → Advanced system settings
2. Click "Environment Variables"
3. Find `Path` in "System variables", double-click to edit
4. Add ADB path, e.g., `C:\Android\Sdk\platform-tools`
5. Save

## Verify Installation

Open Command Prompt, enter:

```cmd
adb version
```

Should display:

```
Android Debug Bridge version 1.0.41
Version 34.0.5-10900879
```

## Phone Settings

1. Enable "Developer Options" on your phone
   - Settings → About Phone → Tap "Build Number" 7 times
2. Enable "Wireless Debugging" or "USB Debugging"
   - Settings → Developer Options → Wireless Debugging (recommended) or USB Debugging
3. Ensure phone and computer are on the same WiFi network

## WiFi Connection

```cmd
adb connect 192.168.1.100:5555
```

Where `192.168.1.100:5555` is your phone's IP address and port.
