import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '七七多点找色助手',
  description: 'Android 设备多点找色/比色工具',

  lang: 'zh-CN',

  themeConfig: {
    nav: [
      { text: '快速开始', link: '/zh-cn/' },
      { text: '使用指南', link: '/zh-cn/guide/connect' },
    ],

    sidebar: {
      '/zh-cn/': [
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
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/skypesky/multi-point-color-finder' }
    ]
  }
})
