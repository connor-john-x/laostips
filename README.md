# LaosTips 老挝指南

面向前往老挝**旅游、留学、工作、生活**人群的多语言实用指南网站。
支持 **中文 / 英文 / 老挝语 / 泰语** 四种语言，基于 Astro 5 + Cloudflare Workers 构建。

## 功能

- 多语言路由与 UI 翻译（`/zh/`、`/en/`、`/lo/`、`/th/`）
- 三大内容板块：旅游攻略、工作与经商、生活指南
- Markdown / MDX 内容集合，按语言分目录
- SEO：canonical、hreflang、Open Graph、JSON-LD、Sitemap、RSS
- 内置广告位、邮件订阅、广告招商页、隐私政策（变现就绪）
- 响应式布局，Lighthouse 友好

## 快速开始

```bash
npm install
npm run dev      # 本地开发 http://localhost:4321
npm run build    # 构建到 ./dist
npm run preview  # 本地预览构建结果
npm run check    # 构建 + 类型检查
```

## 目录结构

```
src/
  i18n/            # 多语言配置、UI 翻译、工具函数
  consts.ts        # 站点、广告、分析等全局配置
  content/blog/    # 文章：<lang>/<slug>.md
  components/      # Header/Footer/AdSlot/Newsletter 等
  layouts/         # BaseLayout、ArticleLayout
  lib/posts.ts     # 内容查询与阅读时间
  pages/[lang]/    # 首页、板块、博客、关于、联系、广告、隐私、RSS
docs/monetization.md  # 变现方案
```

## 添加一篇文章

在 `src/content/blog/<语言>/` 下新建 Markdown，例如
`src/content/blog/zh/my-post.md`：

```md
---
title: "标题"
description: "摘要，用于 SEO 与列表"
pubDate: 2026-03-01
category: travel   # travel | work | living
tags: ["标签1", "标签2"]
author: "作者"
featured: false
heroImage: "/blog-placeholder-1.jpg"
---

正文……
```

## 配置站点

编辑 `src/consts.ts`：站点名、域名、邮箱、社交链接、广告与分析开关。
修改 `astro.config.mjs` 中的 `site` 为你的真实域名。

启用 Google AdSense：

1. 申请通过后，设置环境变量 `PUBLIC_ADSENSE_CLIENT=ca-pub-xxxx`。
2. 将 `src/consts.ts` 中 `ADSENSE_ENABLED` 改为 `true`。
3. 在页面里给 `<AdSlot slot="广告单元ID" />` 填入广告单元。

## 部署（Cloudflare）

```bash
npm run deploy   # wrangler deploy
```

`wrangler.json` 已配置 Worker 名称 `laostips`。首次部署前用
`npx wrangler login` 登录，并在 Cloudflare 控制台绑定自定义域名。

## 变现

见 [`docs/monetization.md`](docs/monetization.md)：广告联盟、联盟营销、
赞助软文、邮件赞助、增值服务与流量策略。
