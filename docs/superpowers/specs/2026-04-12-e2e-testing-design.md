# E2E 测试方案设计

## 1. 概述

本项目为 Tauri 2 + React + TypeScript 桌面应用（七七多点找色助手），接入 Playwright E2E 测试，测试环境使用真实的 Android Studio AVD 模拟器。

**测试目标：**
- 验证从图片导入到代码生成的完整用户流程
- 验证 ADB 截图与真实 Android 设备的交互
- 确保所有功能在真实环境下正常工作

## 2. 技术选型

| 类别 | 选择 | 理由 |
|------|------|------|
| 测试框架 | Playwright | 桌面应用支持优秀、ADB 集成、内置截图对比 |
| 模拟器 | Android Studio AVD | 免费、官方支持、ADB 兼容性好 |
| 截图工具 | emulators -avd | AVD 官方启动方式 |

## 3. 测试覆盖范围

### 3.1 文件导入测试 (`01-file-import.spec.ts`)

**测试场景：**
- ✅ 文件选择器导入 PNG/JPG/BMP 图片
- ✅ 拖放图片到应用窗口
- ✅ 粘贴剪贴板图片（通过 Clipboard API）
- ✅ 图片加载后尺寸和显示正确
- ✅ 多 Tab 管理（每次导入创建新 Tab）

**期望结果：**
- 图片成功加载并显示在 ImageDisplay 组件中
- 颜色选取器能够获取到正确的像素颜色

### 3.2 ADB 截图测试 (`02-screenshot.spec.ts`)

**测试场景：**
- ✅ 检测 ADB 可用性（`adb version`）
- ✅ 连接 AVD 模拟器（`adb connect localhost:5555`）
- ✅ 列出已连接设备（`adb devices`）
- ✅ 执行截图命令（`adb exec-out screencap -p`）
- ✅ 截图显示在应用中
- ✅ 设备离线后自动重连
- ✅ 截图时自动连接未在列表中的设备

**期望结果：**
- 截图成功获取并显示
- 图片可以在应用中用于颜色选取

### 3.3 颜色选取测试 (`03-color-pick.spec.ts`)

**测试场景：**
- ✅ 点击图片添加颜色点
- ✅ 获取点击位置的正确颜色值（RGBA）
- ✅ 颜色列表正确更新
- ✅ 选中/取消选中颜色点
- ✅ 删除单个颜色点
- ✅ 清空所有颜色点
- ✅ 绘制搜索区域矩形

**期望结果：**
- 选取的颜色与图片中对应位置的像素颜色一致
- 颜色点列表UI显示正确

### 3.4 代码生成测试 (`04-code-gen.spec.ts`)

**测试场景：**
- ✅ AutoJs 找色格式代码生成
- ✅ AutoJs 比色格式代码生成
- ✅ 大漠找色格式代码生成
- ✅ 锚点找色格式代码生成
- ✅ 锚点比色格式代码生成
- ✅ 代码复制到剪贴板
- ✅ 相似度设置生效

**期望结果：**
- 生成的代码格式正确，符合对应脚本语言的语法
- 颜色值、坐标、相似度参数正确替换

### 3.5 ADB 连接设备测试 (`05-device-connection.spec.ts`)

**测试场景：**
- ✅ 添加新设备（IP + 端口）
- ✅ 连接设备
- ✅ 断开设备连接
- ✅ 批量连接最近设备
- ✅ 获取本地 IP 地址

**期望结果：**
- 设备连接状态正确显示
- 批量连接超时处理正确（10秒总超时）

## 4. 目录结构

```
e2e/
├── playwright.config.ts          # Playwright 全局配置
├── utils/
│   ├── avd.ts                   # AVD 模拟器管理
│   │   ├── startAvd()           # 启动 AVD 模拟器
│   │   ├── stopAvd()            # 关闭 AVD 模拟器
│   │   ├── waitForAvdReady()    # 等待 AVD 就绪
│   │   └── isAvdRunning()       # 检查 AVD 运行状态
│   ├── adb.ts                   # ADB 命令封装
│   │   ├── connect()            # 连接设备
│   │   ├── disconnect()         # 断开设备
│   │   ├── getDevices()         # 获取设备列表
│   │   ├── screenshot()         # 执行截图
│   │   └── isAvailable()        # 检查 ADB 可用性
│   └── app.ts                   # Tauri 应用管理
│       ├── launch()             # 启动应用
│       ├── close()              # 关闭应用
│       └── isRunning()          # 检查应用运行状态
├── fixtures/
│   └── sample.png               # 测试用示例图片（纯色、渐变、实际截图）
├── tests/
│   ├── setup.ts                 # 全局测试设置（beforeAll/afterAll）
│   ├── 01-file-import.spec.ts   # 文件导入测试
│   ├── 02-screenshot.spec.ts    # ADB 截图测试
│   ├── 03-color-pick.spec.ts    # 颜色选取测试
│   ├── 04-code-gen.spec.ts      # 代码生成测试
│   └── 05-device-connection.spec.ts # 设备连接测试
└── README.md                     # 测试说明文档
```

## 5. 测试夹具（Fixtures）

### 5.1 示例图片

| 文件名 | 描述 | 用途 |
|--------|------|------|
| `solid-red.png` | 纯红色 100x100 | 验证颜色选取准确性 |
| `gradient.png` | 渐变色 200x200 | 验证多颜色选取 |
| `ui-screenshot.png` | 真实 UI 截图 | 模拟真实使用场景 |

### 5.2 全局 Fixtures

```typescript
// setup.ts 提供的全局 fixtures
test.beforeAll(async ({}, testInfo) => {
  // 1. 启动 AVD 模拟器
  // 2. 等待模拟器就绪
  // 3. 启动 Tauri 应用
  // 4. 连接测试设备
});

test.afterAll(async ({}, testInfo) => {
  // 1. 关闭 Tauri 应用
  // 2. 关闭 AVD 模拟器
});
```

## 6. AVD 管理策略

### 6.1 启动流程

```typescript
async function startAvd(avdName: string = 'Pixel_6_API_34'): Promise<void> {
  // 1. 检查是否已有 AVD 运行
  const devices = await getRunningAvds();
  if (devices.includes(avdName)) {
    console.log(`AVD ${avdName} already running`);
    return;
  }

  // 2. 启动 AVD（后台运行）
  await spawn('emulator', ['-avd', avdName, '-no-window', '-no-audio']);

  // 3. 等待 ADB 在线
  await waitForDeviceOnline('localhost:5555', 120000); // 最多等2分钟

  // 4. 验证设备就绪
  const deviceInfo = await adb shell('getprop ro.build.version.release');
  console.log(`AVD started: Android ${deviceInfo}`);
}
```

### 6.2 关闭流程

```typescript
async function stopAvd(): Promise<void> {
  // 方法1: 通过 ADB 关闭
  await adb emu kill();

  // 方法2: 直接杀进程
  await exec('pkill', ['-f', 'emulator']);
}
```

### 6.3 就绪检测

```typescript
async function waitForDeviceOnline(
  deviceId: string,
  timeout: number = 120000
): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const devices = await adb.devices();
    if (devices.includes(deviceId)) {
      // 额外等待 boot animation 结束
      await delay(3000);
      return true;
    }
    await delay(2000);
  }
  throw new Error(`Device ${deviceId} not online after ${timeout}ms`);
}
```

## 7. Playwright 配置

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // 测试目录
  testDir: './e2e/tests',

  // 全局超时
  timeout: 30000,

  // 预期失败（已知问题）
  expect: {
    timeout: 5000,
  },

  // 报告器
  reporter: [
    ['html'],
    ['list'],
  ],

  // 全局钩子
  globalSetup: './tests/setup.ts',

  use: {
    // Tauri 窗口
    channel: 'tauri',

    // 截图目录
    screenshot: 'only-on-failure',

    // 视频录制
    video: 'retain-on-failure',
  },

  // 设备配置
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

## 8. 测试用例命名规范

```
test(测试描述, async ({ page }) => {
  // Arrange - 准备测试数据/环境
  // Act - 执行被测操作
  // Assert - 验证结果
});
```

**示例：**
```typescript
test('拖放 PNG 图片后，图片正确加载并显示', async ({ page }) => {
  // Arrange: 创建测试图片，导航到应用
  const filePath = path.join(__dirname, '../fixtures/solid-red.png');

  // Act: 拖放图片到应用窗口
  const dropZone = page.locator('[data-testid="image-drop-zone"]');
  await dropZone.setInputFiles(filePath);

  // Assert: 验证图片加载成功
  const image = page.locator('[data-testid="image-display"]');
  await expect(image).toBeVisible();
});
```

## 9. 依赖安装

```bash
# 安装 Playwright
npm install -D @playwright/test

# 安装浏览器（Chromium 用于 Tauri）
npx playwright install chromium

# 安装 ADB（如果系统没有）
# Android Studio 自带，或通过 brew install android-platform-tools
```

## 10. 运行测试

```bash
# 运行所有 E2E 测试
npm run test:e2e

# 运行特定测试文件
npm run test:e2e -- 01-file-import.spec.ts

# 运行带 UI 的测试（调试用）
npm run test:e2e -- --ui

# 生成 HTML 报告
npm run test:e2e -- --reporter=html
open playwright-report/index.html
```

## 11. package.json 脚本

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "avd:start": "node e2e/utils/avd.js start",
    "avd:stop": "node e2e/utils/avd.js stop",
    "avd:status": "node e2e/utils/avd.js status"
  }
}
```

## 12. 注意事项

### 12.1 AVD 启动时间

AVD 冷启动需要 1-3 分钟，测试设计应考虑：
- 设置合理的超时时间（默认 2 分钟）
- 测试报告应清晰显示启动耗时

### 12.2 端口冲突

多个 AVD 实例可能端口冲突：
- 使用固定端口 5555
- 启动前检查端口是否被占用

### 12.3 许可证弹窗

应用启动时可能弹出许可证验证窗口：
- 使用 `page.handleDialog()` 拦截并处理
- 或通过命令行参数跳过验证（如果支持）

### 12.4 截图格式差异

不同 Android 版本截图格式可能不同：
- 使用 `adb exec-out screencap -p` 跨版本兼容
- 验证 PNG 文件头（`89 50 4E 47`）

### 12.5 CI/CD 集成

未来集成到 CI 时：
- 需要 Xvfb（Linux 无头模式）
- AVD 需要 `-no-window` 和 `-no-audio` 参数
- 可使用 GitHub Actions 的 macOS runner（支持 GUI）

## 13. 测试流程图

```
┌─────────────────────────────────────────────────────────────────┐
│                      E2E 测试完整流程                              │
└─────────────────────────────────────────────────────────────────┘

                              开始
                                │
                                ▼
                    ┌───────────────────────┐
                    │   globalSetup         │
                    │   1. 启动 AVD          │
                    │   2. 等待就绪          │
                    │   3. 启动 Tauri App   │
                    │   4. 连接设备          │
                    └───────────┬───────────┘
                                │
                                ▼
         ┌──────────────────────────────────────────┐
         │         01-file-import.spec.ts          │
         │  • 文件选择器导入                         │
         │  • 拖放图片                              │
         │  • 粘贴图片                              │
         │  • 多 Tab 管理                           │
         └─────────────────┬────────────────────────┘
                           │
                           ▼
         ┌──────────────────────────────────────────┐
         │        02-screenshot.spec.ts             │
         │  • ADB 可用性检测                         │
         │  • 连接/断开设备                          │
         │  • 执行截图                              │
         │  • 截图显示验证                          │
         │  • 自动重连测试                          │
         └─────────────────┬────────────────────────┘
                           │
                           ▼
         ┌──────────────────────────────────────────┐
         │        03-color-pick.spec.ts             │
         │  • 点击添加颜色点                         │
         │  • 颜色值验证                            │
         │  • 选中/取消选中                         │
         │  • 删除颜色点                            │
         │  • 绘制搜索区域                          │
         └─────────────────┬────────────────────────┘
                           │
                           ▼
         ┌──────────────────────────────────────────┐
         │        04-code-gen.spec.ts              │
         │  • AutoJs 找色                         │
         │  • AutoJs 比色                         │
         │  • 大漠找色                             │
         │  • 锚点找色                             │
         │  • 锚点比色                             │
         │  • 复制到剪贴板                         │
         └─────────────────┬────────────────────────┘
                           │
                           ▼
         ┌──────────────────────────────────────────┐
         │      05-device-connection.spec.ts         │
         │  • 添加设备                              │
         │  • 连接/断开                             │
         │  • 批量连接                              │
         │  • 获取本地 IP                           │
         └─────────────────┬────────────────────────┘
                           │
                           ▼
                    ┌───────────────────────┐
                    │   globalTeardown      │
                    │   1. 关闭 Tauri App  │
                    │   2. 关闭 AVD        │
                    └───────────┬───────────┘
                                │
                                ▼
                              结束
```

## 14. 验收标准

✅ **所有测试通过率 100%**
- 每个测试用例都必须在本地通过
- PR 必须通过所有 E2E 测试才能合并

✅ **测试文档完整**
- 每个测试文件、测试用例都有中文注释
- 关键步骤解释清晰

✅ **可重复执行**
- 同一测试连续运行结果一致
- 支持并行执行（使用独立 AVD 实例）

✅ **快速反馈**
- 完整测试套件运行时间 < 15 分钟
- 支持单测试快速运行调试

---

*最后更新：2026-04-12*
