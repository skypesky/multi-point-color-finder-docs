import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Multi-Point Color Finder',
  description: 'ADB-based Android screenshot analysis tool',

  base: '/multi-point-color-finder-docs/',

  locales: {
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/en/guide/connect' },
        ],
        sidebar: [
          {
            text: 'Getting Started',
            items: [
              { text: 'Quick Start', link: '/en/quick-start' },
            ]
          },
          {
            text: 'Installation',
            items: [
              { text: 'Windows', link: '/en/install/windows' },
              { text: 'macOS', link: '/en/install/macos' },
            ]
          },
          {
            text: 'User Guide',
            items: [
              { text: 'Connect Device', link: '/en/guide/connect' },
              { text: 'Screenshot', link: '/en/guide/screenshot' },
              { text: 'Color Points', link: '/en/guide/color-points' },
            ]
          },
        ]
      }
    },
    'zh-cn': {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh-cn/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh-cn/' },
          { text: '使用指南', link: '/zh-cn/guide/connect' },
        ],
        sidebar: [
          {
            text: '快速开始',
            items: [
              { text: '快速指引', link: '/zh-cn/quick-start' },
              { text: '界面介绍', link: '/zh-cn/interface' },
            ]
          },
          {
            text: '安装与环境配置',
            items: [
              { text: 'Windows', link: '/zh-cn/install/windows' },
              { text: 'macOS', link: '/zh-cn/install/macos' },
            ]
          },
          {
            text: '使用指南',
            items: [
              { text: '连接设备', link: '/zh-cn/guide/connect' },
              { text: '获取截图', link: '/zh-cn/guide/screenshot' },
              { text: '标记颜色点', link: '/zh-cn/guide/color-points' },
              { text: '框选区域', link: '/zh-cn/guide/region' },
              { text: '测试找色', link: '/zh-cn/guide/find-color' },
              { text: '生成代码', link: '/zh-cn/guide/code-gen' },
            ]
          },
          {
            text: '其他',
            items: [
              { text: '快捷键', link: '/zh-cn/shortcuts' },
              { text: '设置', link: '/zh-cn/settings' },
              { text: '常见问题', link: '/zh-cn/faq' },
            ]
          },
        ]
      }
    }
  }
})
