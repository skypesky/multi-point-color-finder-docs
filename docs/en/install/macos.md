# macOS Installation

## Application Installation

Since this application is not Apple signed, macOS may block installation.

### Solutions

#### Method 1: Right-click Open (Recommended)

1. Find the `.app` file in Finder
2. **Right-click** → **Open**
3. Click **Open** in the popup dialog

#### Method 2: Allow in System Settings

1. You will see "macOS blocked this app" prompt when first opening
2. Go to **System Settings** → **Privacy & Security**
3. Scroll down, click **"Open Anyway"**

#### Method 3: Allow Apps from Anywhere

1. Open **Terminal**, run:

```bash
sudo spctl --master-disable
```

2. Open **System Settings** → **Privacy & Security**
3. Scroll to "Security" section, select "Allow apps from anywhere"

## System Requirements

- **Operating System**: macOS 10.15 (Catalina) or higher
- **Architecture**: Apple Silicon (M1/M2/M3/M4) or Intel
- **Disk Space**: About 200MB for ADB

## Installation Methods

### Method 1: Homebrew (Recommended)

```bash
brew install android-platform-tools
```

### Method 2: Manual Installation

1. Download [Android SDK Platform Tools](https://developer.android.com/studio/releases/platform-tools) macOS version
2. Extract to `~/Library/Android/sdk/platform-tools/`

## Verify Installation

Open Terminal, enter:

```bash
adb version
```

Should display:

```
Android Debug Bridge version 1.0.41
Version 34.0.5-10900879
```

## Configure PATH (if needed)

If using manual installation, add to `~/.zshrc` or `~/.bash_profile`:

```bash
export PATH="$HOME/Library/Android/sdk/platform-tools:$PATH"
```

Then run:

```bash
source ~/.zshrc  # or source ~/.bash_profile
```

## Phone Settings

1. Enable "Developer Options" on your phone
   - Settings → About Phone → Tap "Build Number" 7 times
2. Enable "Wireless Debugging" or "USB Debugging"
   - Settings → Developer Options → Wireless Debugging (recommended) or USB Debugging
3. Ensure phone and computer are on the same WiFi network

## WiFi Connection

```bash
adb connect 192.168.1.100:5555
```

Where `192.168.1.100:5555` is your phone's IP address and port.
