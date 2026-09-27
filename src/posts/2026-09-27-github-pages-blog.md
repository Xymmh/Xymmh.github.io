---
title: 从零搭建了这个博客
date: 2026-09-27
tags: [教程, GitHub Pages]
summary: 从零开始用 React + Arco Design 搭建博客，并部署到 GitHub Pages 的完整记录。
---

今天把这个博客搭起来了，记录一下过程。

## 技术选型

| 需求 | 方案 |
| --- | --- |
| 前端框架 | React 18 |
| 组件库 | Arco Design |
| 文章 | Markdown 文件（src/posts 目录） |
| 评论 | Giscus（GitHub Discussions） |
| 托管 | GitHub Pages |

## 为什么不需要数据库

最初想给博客做「用户注册 + 评论」，但 GitHub Pages 是纯静态托管，没有后端，也就没有数据库可连。

后来想通了：评论的本质是「别人在我这里留言」，用 [Giscus](https://giscus.app/zh-CN) 就够了——

1. 评论数据存在本仓库的 Discussions 里
2. 访客用 GitHub 账号授权登录后评论
3. 不需要服务器，也不需要数据库

注册功能同理：访客的「身份」就是他的 GitHub 账号，不需要我在博客里再存一份。

## 发帖方式

在 `src/posts/` 目录新建一个 `YYYY-MM-DD-标题.md` 文件，写上 frontmatter 即可：

```md
---
title: 文章标题
date: 2026-09-27
tags: [标签]
summary: 摘要
---

正文使用 Markdown 语法……
```

保存后本地 `npm run dev` 预览，确认无误后提交推送，再 `npm run deploy` 发布。
