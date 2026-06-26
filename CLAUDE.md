# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概况

这是"小漫的角落"个人博客网站，一个温柔文艺风的 Astro 静态站点，部署在 Vercel。

- **网址**：https://my-blog-v2-alpha.vercel.app/zh/
- **GitHub 仓库**：`manjiangprayuki2204-dev/my-blog-v2`
- **用户身份**：编程小白，请用中文沟通，所有操作尽量给图形界面指引

## 常用命令

```bash
npm run dev          # 本地开发（localhost:4321）
npm run build        # 生产构建（astro build + pagefind 搜索索引）
npm run preview      # 本地预览构建结果
npm run test         # 运行所有测试（Vitest，35 个用例）
```

## 技术栈

- **框架**：Astro 5（静态模式）
- **部署**：Vercel（GitHub 推送自动触发部署）
- **后台管理**：自定义 Admin SPA（`/admin`），通过 GitHub REST API 直接读写仓库中的 Markdown 文件
- **评论**：Giscus（基于 GitHub Discussions，仓库 `my-blog-v2`）
- **搜索**：Pagefind（构建时生成索引，`Ctrl+K` 打开搜索弹窗）
- **测试**：Vitest
- **样式**：CSS 变量驱动（`src/styles/`），无 UI 框架

## 项目结构

```
src/
├── pages/
│   ├── index.astro          # 根路径重定向到 /zh/
│   ├── zh/                   # 中文页面（/zh/ 路由）
│   │   ├── index.astro       # 首页
│   │   ├── blog/index.astro  # 文章列表
│   │   ├── blog/[slug].astro # 文章详情
│   │   ├── works/...         # 作品集
│   │   └── about.astro       # 关于我
│   └── en/                   # 英文页面（/en/ 路由，结构同 zh/）
├── components/     # 13 个 Astro 组件（Nav、Hero、ArticleCard、GiscusComments 等）
├── layouts/        # BaseLayout.astro — 全局布局模板（导航 + 页脚 + 主题/语言切换）
├── domain/         # TypeScript 类型定义（Article、Work、Profile、Tag）
├── services/       # 纯函数业务逻辑（排序、筛选、日期格式化）
├── i18n/           # 国际化翻译字典（zh.ts / en.ts / index.ts）
├── styles/         # 全局 CSS（配色变量、字体、响应式）
api/
├── content.js      # Vercel Serverless Function — GitHub 文件 CRUD
└── upload.js       # Vercel Serverless Function — 图片上传到 GitHub
public/
└── admin/
    └── index.html  # 后台管理 SPA（纯 HTML/CSS/JS，零依赖）
content/            # Markdown 内容（通过后台或直接编辑管理）
├── articles/       # 文章 .md 文件
├── works/          # 作品 .md 文件
└── profile/        # 个人资料 profile.md
```

## 核心架构说明

### 内容流
1. 用户在 `/admin` 后台编辑 → SPA 调用 `/api/content` → 写入 GitHub 仓库 Markdown 文件
2. GitHub 文件变更触发 Vercel 自动部署 → Astro 构建时通过 `Astro.glob` 读取 `.md` 文件的 frontmatter → 生成静态 HTML
3. 构建完成后 Pagefind 对 `dist/` 建立搜索索引

### 双语实现
- URL 路径前缀区分：`/zh/` 和 `/en/`
- 文章的所有字段（标题、摘要、正文）都分中英两份：`titleZh` / `titleEn` 等
- 中文正文存为 Markdown 文件 body，英文正文 `bodyEn` 存在 frontmatter 中
- 导航/按钮/页脚等固定文本通过 `src/i18n/` 字典翻译

### 深浅色模式
- 默认跟随系统 `prefers-color-scheme`
- 用户手动切换后存入 `localStorage` 覆盖系统设置
- CSS 变量切换实现，0.3s 过渡动画

### 后台 /admin
- 纯客户端 SPA，使用 GitHub Token 登录（Token 存 `localStorage`）
- 保存文件时通过 `/api/content`（Vercel serverless function）代理 GitHub API 调用
- **重要**：serverless function 需要 Vercel 环境变量 `GITHUB_TOKEN` 才能运行
- 图片上传到 `public/images/`，最大 10MB

## 修改注意事项

### 不要做的事
- 不要使用任何数据库、外部后端服务、Netlify 产品
- 不要在代码里硬编码敏感信息（Token、API Key）
- 不要擅自更换框架或引入重型 UI 库
- 不要改用 SSR 模式——站点是纯静态的（除了 `/api/` serverless functions）

### 改样式
- 配色变量在 `src/styles/` 的 `:root` 和 `[data-theme="dark"]` 中
- 自定义光标在 `src/components/CustomCursor.astro`
- 组件样式分散在各 `.astro` 文件的 `<style>` 块中

### 改文章/作品数据结构
- 类型定义在 `src/domain/`，修改后要同步更新：
  1. `tina/config.ts` 已删除不再使用
  2. `/admin` 页面的表单字段（`public/admin/index.html`）
  3. `/api/content.js` 的处理逻辑无需改动（它是通用的文件读写）
  4. 现有 Markdown 文件的 frontmatter

### 部署
- `git push` 到 GitHub main 分支即可，Vercel 自动部署
- 如果新文章不显示 → Vercel 点 Redeploy（强制拉取最新文件）
- Vercel 必需环境变量：`GITHUB_TOKEN`、`PUBLIC_GISCUS_REPO`、`PUBLIC_GISCUS_REPO_ID`、`PUBLIC_GISCUS_CATEGORY_ID`、`PUBLIC_SITE_URL`
