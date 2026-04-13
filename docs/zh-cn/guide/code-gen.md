# 生成代码

![代码生成结果](/multi-point-color-finder-docs/images/guide-codegen-result.png)

## 支持的格式

| 格式 | 说明 | 示例用途 |
|------|------|---------|
| AutoJs找色 | AutoJs 多点找色代码 | Android 自动化脚本 |
| AutoJs比色 | AutoJs 多点比色代码 | 颜色验证脚本 |
| 大漠找色 | 大漠插件格式 | 旧版大漠用户 |
| 锚点找色 | 锚点格式找色 | 锚点脚本 |
| 锚点比色 | 锚点格式比色 | 锚点验证 |

## 生成代码

1. 选择目标代码格式
2. 点击「生成」按钮
3. 代码显示在左侧面板

**快捷键**：`G`

## 复制代码

点击「复制」按钮将代码复制到剪贴板。

**快捷键**：`C`

## 代码示例

### AutoJs 找色格式

```javascript
// 找色示例
let result = findColor("screenshot.png", "#FF5733", {
  region: [100, 100, 300, 300],
  similarity: 0.95
});
if (result) {
  console.log("找到位置: " + result.x + "," + result.y);
}
```

### AutoJs 比色格式

```javascript
// 比色示例
let result = cmpColor([
  [100, 200, "#FF5733"],
  [150, 250, "#34FF57"]
], 0.95);
if (result) {
  console.log("颜色匹配成功");
}
```

## 相似度参数

生成代码时会包含设置的相似度参数（0.80-1.0）。
