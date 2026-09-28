import { useEffect, useState } from 'react';
import { Button } from '@arco-design/web-react';
import { IconSunFill, IconMoonFill } from '@arco-design/web-react/icon';
// 用 ?url 让 Vite 返回 CSS 文件的 URL，便于运行时按主题启用/禁用
import hlLight from 'highlight.js/styles/github.css?url';
import hlDark from 'highlight.js/styles/github-dark.css?url';

const STORAGE_KEY = 'blog-theme';

// 初始主题：优先读本地存储，否则跟随系统偏好
function getInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  // 把主题写到 <html data-theme="..."> 并持久化
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // 注入两份代码高亮样式表，按主题切换 disabled
  useEffect(() => {
    const light = document.createElement('link');
    light.rel = 'stylesheet';
    light.href = hlLight;
    light.id = 'hl-light';
    const dark = document.createElement('link');
    dark.rel = 'stylesheet';
    dark.href = hlDark;
    dark.id = 'hl-dark';
    document.head.append(light, dark);
    return () => {
      light.remove();
      dark.remove();
    };
  }, []);

  // 切换主题时翻转两份样式表的启用状态
  useEffect(() => {
    const light = document.getElementById('hl-light');
    const dark = document.getElementById('hl-dark');
    if (light) light.disabled = theme !== 'light';
    if (dark) dark.disabled = theme !== 'dark';
  }, [theme]);

  return (
    <Button
      type="text"
      shape="circle"
      icon={theme === 'dark' ? <IconSunFill /> : <IconMoonFill />}
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      aria-label="切换主题"
    />
  );
}
