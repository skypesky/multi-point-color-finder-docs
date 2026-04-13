# Windows Installation

## System Requirements

- **Operating System**: Windows 10 or higher
- **ADB**: Part of Android SDK Platform Tools

## Installation Methods

### Method 1: Download Platform Tools (Recommended)

1. Download [Android SDK Platform Tools](https://developer.android.com/studio/releases/platform-tools) for Windows
2. Extract to `C:\adb\platform-tools\`
3. Add to system PATH: `C:\adb\platform-tools`

### Method 2: Via Chocolatey

```powershell
choco install adb
```

### Method 3: Via Winget

```powershell
winget install Google.PlatformTools
```

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
2. Enable "USB Debugging"
   - Settings → Developer Options → USB Debugging
3. Ensure phone and computer are on the same WiFi network

## ADB Connection

### USB Connection

```cmd
adb devices
adb usb
```

### WiFi Connection

```cmd
# Make phone listen on TCP port
adb tcpip 5555

# Connect via WiFi
adb connect 192.168.1.100:5555
```
