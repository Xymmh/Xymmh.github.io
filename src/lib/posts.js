// Markdown 文章加载器
// 用法：把 .md 文件放到 src/posts/ 目录即可自动收录，无需手动注册。
// 文件头部使用 frontmatter 元信息：
// ---
// title: 文章标题
// date: 2026-09-27
// tags: [随笔, 教程]
// summary: 一句话摘要
// ---

const files = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function parseFrontmatter(raw) {
  const content = { raw };
  const meta = {};
  if (raw.startsWith('---')) {
    const end = raw.indexOf('---', 3);
    if (end !== -1) {
      const lines = raw.slice(3, end).trim().split(/\r?\n/);
      for (const line of lines) {
        const idx = line.indexOf(':');
        if (idx === -1) continue;
        const key = line.slice(0, idx).trim();
        let value = line.slice(idx + 1).trim();
        // 支持 [a, b] 形式的 tags
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value
            .slice(1, -1)
            .split(',')
            .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
            .filter(Boolean);
        }
        meta[key] = value;
      }
      content.body = raw.slice(end + 3).trim();
    } else {
      content.body = raw;
    }
  } else {
    content.body = raw;
  }
  return { meta, body: content.body };
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
}

export const posts = Object.entries(files)
  .map(([path, raw]) => {
    const { meta, body } = parseFrontmatter(raw);
    const slug = path.split('/').pop().replace(/\.md$/, '');
    return {
      slug,
      title: meta.title || slug,
      date: meta.date || '',
      dateFormatted: meta.date ? formatDate(meta.date) : '',
      tags: Array.isArray(meta.tags) ? meta.tags : meta.tags ? [meta.tags] : [],
      summary: meta.summary || '',
      body,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}

export function groupByYear(list) {
  const map = new Map();
  for (const p of list) {
    const year = p.date ? p.date.slice(0, 4) : '未知';
    if (!map.has(year)) map.set(year, []);
    map.get(year).push(p);
  }
  return [...map.entries()];
}
