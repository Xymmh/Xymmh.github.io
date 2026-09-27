# my-blog — Xymmh 的博客

React 18 + Arco Design + Vite 构建的个人博客，部署在 GitHub Pages（`https://xymmh.github.io`）。

- 文章：Markdown 文件，放在 `src/posts/` 目录，无需数据库
- 评论：[Giscus](https://giscus.app/zh-CN)，评论数据存放在 GitHub Discussions
- 部署：`gh-pages` 分支

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 本地开发预览（http://localhost:5173） |
| `npm run build` | 构建到 `dist/` |
| `npm run deploy` | 构建并发布到 gh-pages 分支 |

> Windows PowerShell 环境下请使用 `npm.cmd run dev` 代替 `npm run dev`。

## 如何发帖

1. 在 [src/posts](src/posts) 目录新建文件，文件名格式：`YYYY-MM-DD-标题.md`（英文或拼音，作为 URL slug）
2. 文件开头写元信息，然后是正文：

```md
---
title: 文章标题
date: 2026-09-27
tags: [标签1, 标签2]
summary: 一句话摘要（列表页显示）
---

正文使用 Markdown 语法，支持 GFM 表格、代码高亮等。
```

3. 本地 `npm run dev` 预览效果
4. 满意后提交推送：

```powershell
& "C:\Program Files\Git\cmd\git.exe" add .
& "C:\Program Files\Git\cmd\git.exe" commit -m "feat: 新文章"
& "C:\Program Files\Git\cmd\git.exe" push
```

5. 发布到线上：`npm.cmd run deploy`（博客源码推到 main 分支，构建产物由 deploy 推到 gh-pages 分支）

## 开启评论（Giscus，一次性配置）

评论功能基于 GitHub Discussions，访客需要用 GitHub 账号登录后评论（无需在博客注册，也没有数据库）。

1. 打开仓库 https://github.com/Xymmh/Xymmh.github.io → **Settings → General → Features** → 勾选 **Discussions**
2. 安装 [giscus App](https://github.com/apps/giscus) 并授权给该仓库
3. 打开 https://giscus.app/zh-CN ，输入仓库 `Xymmh/Xymmh.github.io`，映射方式选 `pathname`，分类建议选 **Announcements**
4. 把页面生成的 `data-repo-id` 和 `data-category-id` 填入 [src/config.js](src/config.js) 的 `GISCUS.repoId` 和 `GISCUS.categoryId`
5. 重新构建部署后，文章页底部就会出现评论区

## 目录结构

```
my-blog/
├── public/            # 静态资源（404.html 为 GitHub Pages SPA 回退页）
├── src/
│   ├── posts/         # ★ 博客文章（Markdown）
│   ├── components/    # Layout / PostCard / Giscus / MarkdownBody
│   ├── lib/posts.js   # 文章加载与 frontmatter 解析
│   ├── pages/         # Home / Post / Archive / About
│   ├── config.js      # ★ 站点信息 + Giscus 配置
│   ├── App.jsx        # 路由
│   └── main.jsx       # 入口
└── vite.config.js
```
