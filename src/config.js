// 站点配置
export const SITE = {
  title: "Xymmh's Blog",
  author: 'Xymmh',
  description: '架构更好的世界',
  github: 'https://github.com/Xymmh',
  v2ex: 'https://www.v2ex.com/member/Xymmh',
  zhihu: 'https://www.zhihu.com/people/meng-hu-83-39',
};

// Giscus 评论配置（基于 GitHub Discussions，访客用 GitHub 账号登录评论）
// 配置步骤见 README.md：
// 1. 开启仓库 Discussions
// 2. 安装 https://github.com/apps/giscus 到该仓库
// 3. 打开 https://giscus.app/zh-CN ，填入仓库 Xymmh/Xymmh.github.io，选择 Discussion 分类
//    （推荐 Announcements），复制生成的 repoId / categoryId 填到下面
export const GISCUS = {
  repo: 'Xymmh/Xymmh.github.io',
  repoId: 'R_kgDOUujKRg', // ← 已填（来自 giscus.app）
  category: 'Announcements',
  categoryId: 'DIC_kwDOUujKRs4DGhGJ', // ← 已填（来自 giscus.app）
  mapping: 'pathname',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  theme: 'light',
  lang: 'zh-CN',
  loading: 'lazy',
};
