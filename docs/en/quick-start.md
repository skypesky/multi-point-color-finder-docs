# Quick Start

## Prerequisites

Before you begin, make sure you have completed the following:

1. **Install the App** — Follow the [Windows Installation Guide](install/windows) or [macOS Installation Guide](install/macos) to install the application
2. **Install ADB** — Android Debug Bridge is required for connecting to Android devices, see the ADB configuration in the installation guide
3. **Connect Device** — Ensure your Android device has USB debugging enabled and is connected to your computer via ADB

## 5 Steps to Complete Color Finding Script

### Step 1: Connect Device

1. Select device from the top dropdown, or click "Add Device" to enter `IP:port` (e.g., `192.168.1.100:5555`)
2. Click "Connect" button
3. Status bar shows "Connected" when successful

### Step 2: Screenshot

1. Ensure device is connected
2. Click "Screenshot" button to capture device screen
3. Screenshot displays in the center image area

### Step 3: Mark Color Points

1. Click target position on image to add color point automatically
2. Set anchor type (None/L/C/R) in the color list on the right
3. Click color value to copy hex color code

### Step 4: Test

1. Click "Test" button after setting up
2. Check result: "Found: (x, y)" or "Not Found"

### Step 5: Generate Code

1. Select code format (AutoJs FindColor/AutoJs CompareColor/DM FindColor/Anchor FindColor/Anchor CompareColor)
2. Click "Generate" button
3. Click "Copy" to copy code to clipboard

## Next Steps

- [Learn more about connection](guide/connect)
- [Learn more about screenshot import](guide/screenshot)
- [Learn more about color point operations](guide/color-points)
