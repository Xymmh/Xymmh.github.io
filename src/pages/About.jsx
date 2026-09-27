import { SITE } from '../config.js';

export default function About() {
  return (
    <div className="markdown-body">
      <h1>关于我</h1>
      <p>
        你好，我是 <strong>{SITE.author}</strong>。
      </p>
      <p>{SITE.description}</p>
      <ul>
        <li>
          GitHub：
          <a href={SITE.github} target="_blank" rel="noreferrer">
            @{SITE.author}
          </a>
        </li>
        <li>邮箱：wangqialun@gmail.com</li>
      </ul>
      <h2>关于本站</h2>
      <p>
        本站使用 React + Arco Design 构建，部署在 GitHub Pages 上。文章以
        Markdown 编写，评论基于 GitHub Discussions（Giscus）。
      </p>
    </div>
  );
}
