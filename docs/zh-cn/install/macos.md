# macOS 系统安装

## 应用安装

由于本应用未进行 Apple 签名认证，macOS 可能会阻止安装。

### 解决方法

#### 方法一：右键打开（推荐）

1. 在 Finder 中找到 `.app` 文件
2. **右键点击** → **打开**
3. 在弹出的提示框中点击**打开**

#### 方法二：在系统设置中允许

1. 首次打开应用时会看到"macOS 阻止运行"的提示
2. 前往**系统设置** → **隐私与安全性**
3. 滚动到下方，点击**"仍要打开"**

#### 方法三：允许任何来源的应用

1. 打开**终端**，执行以下命令：

```bash
sudo spctl --master-disable
```

2. 打开**系统设置** → **隐私与安全性**
3. 滚动到"安全性"部分，选择"任何来源"

## 系统要求

- **操作系统**: macOS 10.15 (Catalina) 或更高
- **架构**: Apple Silicon (M1/M2/M3/M4) 或 Intel
- **磁盘空间**: 约 200MB 用于 ADB

## 安装方式

### 方式一：Homebrew（推荐）

```bash
brew install android-platform-tools
```

### 方式二：手动安装

1. 下载 [Android SDK Platform Tools](https://developer.android.com/studio/releases/platform-tools) macOS 版本
2. 解压到 `~/Library/Android/sdk/platform-tools/`

## 验证安装

打开终端，输入：

```bash
adb version
```

应显示类似：

```
Android Debug Bridge version 1.0.41
Version 34.0.5-10900879
```

## 配置 PATH（如需要）

如果使用手动安装方式，添加到 `~/.zshrc` 或 `~/.bash_profile`：

```bash
export PATH="$HOME/Library/Android/sdk/platform-tools:$PATH"
```

然后执行：

```bash
source ~/.zshrc  # 或 source ~/.bash_profile
```

## 手机设置

1. 开启手机的「开发者选项」
   - 设置 → 关于手机 → 连续点击「版本号」7 次
2. 启用「无线调试」或「USB 调试」
   - 设置 → 开发者选项 → 无线调试（推荐）或 USB 调试
3. 确保手机和电脑在同一 WiFi 网络

## WiFi 连接

```bash
adb connect 192.168.1.100:5555
```

其中 `192.168.1.100:5555` 是你手机的 IP 地址和端口。
