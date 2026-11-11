import { SITE } from '../config.js';
import { SpotCard } from '../components/Effects.jsx';
import { SocialGrid } from '../components/Socials.jsx';

export default function About() {
  return (
    <div>
      <header className="page-head">
        <p className="section-kicker">About</p>
        <h1 className="page-title">关于我</h1>
      </header>

      <SpotCard className="about-card">
        <img className="about-avatar" src={`${SITE.github}.png`} alt={SITE.author} />
        <div>
          <h2 className="about-name">{SITE.author}</h2>
          <p className="about-bio">{SITE.description}</p>
          <a className="btn btn-ghost btn-sm" href="mailto:wangqialun@gmail.com">
            ✉ wangqialun@gmail.com
          </a>
        </div>
      </SpotCard>

      <div className="markdown-body about-body">
        <p>
          你好，我是 <strong>{SITE.author}</strong>。这里是我记录想法、分享内容的地方，
          也是通往我在各个平台主页的入口。
        </p>

        <h2>在别处找到我</h2>
      </div>
      <SocialGrid />

      <div className="markdown-body about-body">
        <h2>关于本站</h2>
        <p>
          本站使用 React + Arco Design 构建，部署在 GitHub Pages 上。文章以 Markdown
          编写，评论基于 GitHub Discussions（Giscus）。
        </p>
      </div>
    </div>
  );
}
