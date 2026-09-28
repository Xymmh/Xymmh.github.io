import { useEffect, useState } from 'react';

// 文章目录：从渲染后的 Markdown 提取 h2/h3，固定在右侧，
// 滚动时用 IntersectionObserver 高亮当前阅读章节，点击平滑跳转。
export default function TOC() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const container = document.querySelector('.markdown-body');
    if (!container) return;

    const els = [...container.querySelectorAll('h2, h3')];
    // 给每个标题补 id（用于锚点跳转），收集目录数据
    const items = els.map((el, i) => {
      if (!el.id) el.id = 'toc-heading-' + i;
      return { id: el.id, text: el.textContent, level: el.tagName.toLowerCase() };
    });
    setHeadings(items);

    // 监听标题进入视口的位置，高亮当前正在阅读的章节
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      // 顶部留出 sticky header 高度，底部只算视口上 30% 区域，
      // 这样标题滚动到屏幕偏上位置时才激活，更贴合阅读直觉
      { rootMargin: '-80px 0px -70% 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="toc">
      <div className="toc-title">目录</div>
      <ul>
        {headings.map((h) => (
          <li
            key={h.id}
            className={'toc-item toc-' + h.level + (activeId === h.id ? ' active' : '')}
          >
            <a
              href={'#' + h.id}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(h.id)
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
