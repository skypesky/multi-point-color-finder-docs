# Windows 系统安装

## 系统要求

- **操作系统**: Windows 10 (版本 1903 或更高)、Windows 11
- **架构**: x86_64 (AMD64)
- **磁盘空间**: 约 200MB 用于 ADB

## 安装 Android SDK Platform Tools

### 方式一：下载压缩包

1. 访问 [Android Developer](https://developer.android.com/studio/releases/platform-tools)
2. 下载 Windows 版本（platform-tools_rXX-windows.zip）
3. 解压到合适位置，如 `C:\Android\Sdk\platform-tools`

### 方式二：使用包管理器（推荐）

使用 [Scoop](https://scoop.sh) 或 [Chocolatey](https://chocolatey.org)：

```powershell
# 使用 Scoop
scoop install adb

# 使用 Chocolatey
choco install adb
```

## 配置环境变量

1. 右键「此电脑」→「属性」→「高级系统设置」
2. 点击「环境变量」
3. 在「系统变量」中找到 `Path`，双击编辑
4. 添加 ADB 路径，如 `C:\Android\Sdk\platform-tools`
5. 确定保存

## 验证安装

打开命令提示符，输入：

```cmd
adb version
```

应显示类似：

```
Android Debug Bridge version 1.0.41
Version 34.0.5-10900879
```

## 手机设置

1. 开启手机的「开发者选项」
   - 设置 → 关于手机 → 连续点击「版本号」7 次
2. 启用「无线调试」或「USB 调试」
   - 设置 → 开发者选项 → 无线调试（推荐）或 USB 调试
3. 确保手机和电脑在同一 WiFi 网络

## WiFi 连接

```cmd
adb connect 192.168.1.100:5555
```

其中 `192.168.1.100:5555` 是你手机的 IP 地址和端口。
