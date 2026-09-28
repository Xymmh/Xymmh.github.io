import { Alert } from '@arco-design/web-react';
import { useEffect, useRef } from 'react';
import { GISCUS } from '../config.js';

// 根据当前站点主题推断 giscus 主题
function currentGiscusTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'dark'
    : 'light';
}

export default function Giscus() {
  const ref = useRef(null);
  const ready = GISCUS.repoId && GISCUS.categoryId;

  // 初始加载 giscus，data-theme 用当前主题
  useEffect(() => {
    if (!ready || !ref.current) return;
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    const attrs = {
      'data-repo': GISCUS.repo,
      'data-repo-id': GISCUS.repoId,
      'data-category': GISCUS.category,
      'data-category-id': GISCUS.categoryId,
      'data-mapping': GISCUS.mapping,
      'data-strict': '0',
      'data-reactions-enabled': GISCUS.reactionsEnabled,
      'data-emit-metadata': GISCUS.emitMetadata,
      'data-input-position': GISCUS.inputPosition,
      'data-theme': currentGiscusTheme(),
      'data-lang': GISCUS.lang,
      'data-loading': GISCUS.loading,
    };
    for (const [k, v] of Object.entries(attrs)) script.setAttribute(k, v);
    ref.current.appendChild(script);
    return () => {
      script.remove();
    };
  }, [ready]);

  // 监听站点主题切换，动态通知 giscus iframe 切换主题
  useEffect(() => {
    if (!ready) return;
    const observer = new MutationObserver(() => {
      const iframe = document.querySelector('iframe.giscus-frame');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          { giscus: { setConfig: { theme: currentGiscusTheme() } } },
          'https://giscus.app'
        );
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, [ready]);

  return (
    <div className="giscus-wrapper">
      <h3 className="giscus-title">评论</h3>
      {ready ? (
        <div ref={ref} />
      ) : (
        <Alert
          type="info"
          content="评论区尚未启用：需要开启 GitHub Discussions 并在 src/config.js 中填入 Giscus 的 repoId / categoryId（步骤见项目 README）。"
        />
      )}
    </div>
  );
}
