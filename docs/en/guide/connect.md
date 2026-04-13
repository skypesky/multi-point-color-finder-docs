# Connect Device

## Connection Methods

### WiFi Connection (Recommended)

1. Ensure phone and computer are on the same WiFi network
2. Enable ADB over WiFi on your phone (usually via developer options or `adb tcpip 5555`)
3. Enter phone IP and port in the device input (e.g., `192.168.1.100:5555`)
4. Click "Connect"

### USB Connection

1. Connect phone to computer via USB cable
2. Enable USB debugging on your phone
3. The device should appear in the dropdown automatically

## Add Device

- Click device dropdown to see all connected devices
- Click "Add Device" to manually enter IP:port
- Format: `IP:PORT` (e.g., `192.168.1.100:5555`)

## Connection Status

- **Connected**: Green status indicator, device info displayed
- **Connecting**: Yellow status indicator, attempting connection
- **Disconnected**: Gray status, no device connected
- **Error**: Red status indicator, connection failed (check IP and ADB server)

## Troubleshooting

1. **Device not found**: Make sure ADB server is running (`adb start-server`)
2. **Connection timeout**: Check network connectivity and firewall settings
3. **Unauthorized**: Unlock phone and approve USB debugging permission
