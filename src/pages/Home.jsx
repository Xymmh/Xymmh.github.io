import { Empty } from '@arco-design/web-react';
import { Link } from 'react-router-dom';
import { posts } from '../lib/posts.js';
import PostCard from '../components/PostCard.jsx';
import UserLocalInfo from '../components/UserLocalInfo.jsx';
import GithubProjects from '../components/GithubProjects.jsx';
import { SocialIcons, SocialGrid } from '../components/Socials.jsx';
import { SpotCard, Reveal, Typewriter, CountUp } from '../components/Effects.jsx';
import { SITE } from '../config.js';

const TAGLINES = [SITE.description, '记录技术与生活', '欢迎来到我的小站'];

// 站点上线日期：取最早一篇文章的日期
const SINCE = posts.reduce((min, p) => (p.date && p.date < min ? p.date : min), '9999');
const DAYS = SINCE === '9999' ? 0 : Math.max(1, Math.floor((Date.now() - new Date(SINCE)) / 86400000));
const TAG_COUNT = new Set(posts.flatMap((p) => p.tags)).size;

function scrollToPosts(e) {
  e.preventDefault();
  document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Home() {
  return (
    <div className="home">
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="hero-avatar">
          <span className="hero-avatar-ring" aria-hidden="true" />
          <img src={`${SITE.github}.png`} alt={SITE.author} width="132" height="132" />
          <span className="hero-avatar-status" title="在线" />
        </div>

        <p className="hero-eyebrow">
          <span className="hero-wave" aria-hidden="true">👋</span> 你好，我是
        </p>
        <h1 className="hero-name">{SITE.author}</h1>
        <p className="hero-tagline">
          <Typewriter words={TAGLINES} />
        </p>

        <div className="hero-actions">
          <a href="#posts" className="btn btn-primary" onClick={scrollToPosts}>
            阅读文章
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </a>
          <Link to="/about" className="btn btn-ghost">
            关于我
          </Link>
        </div>

        <SocialIcons />

        <a href="#posts" className="hero-scroll" onClick={scrollToPosts} aria-label="向下滚动">
          <span />
        </a>
      </section>

      {/* ---------- Bento ---------- */}
      <section className="bento">
        <Reveal className="bento-socials">
          <SpotCard className="bento-card">
            <div className="bento-label">
              <span className="dot" /> 在别处找到我
            </div>
            <SocialGrid />
          </SpotCard>
        </Reveal>

        <Reveal className="bento-local" delay={80}>
          <SpotCard className="bento-card">
            <div className="bento-label">
              <span className="dot dot-green" /> 此刻 · 你那里
            </div>
            <UserLocalInfo />
          </SpotCard>
        </Reveal>

        <Reveal className="bento-stats" delay={160}>
          <SpotCard className="bento-card">
            <div className="bento-label">
              <span className="dot dot-amber" /> 站点数据
            </div>
            <div className="stats">
              <div className="stat">
                <div className="stat-num"><CountUp to={posts.length} /></div>
                <div className="stat-label">文章</div>
              </div>
              <div className="stat">
                <div className="stat-num"><CountUp to={TAG_COUNT} /></div>
                <div className="stat-label">标签</div>
              </div>
              <div className="stat">
                <div className="stat-num"><CountUp to={DAYS} /></div>
                <div className="stat-label">运行天数</div>
              </div>
            </div>
          </SpotCard>
        </Reveal>

        <Reveal className="bento-projects" delay={120}>
          <SpotCard className="bento-card">
            <div className="bento-label bento-label-row">
              <span>
                <span className="dot dot-violet" /> 开源项目
              </span>
              <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="bento-more">
                全部 →
              </a>
            </div>
            <GithubProjects limit={3} />
          </SpotCard>
        </Reveal>
      </section>

      {/* ---------- 文章 ---------- */}
      <section id="posts" className="home-section">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="section-kicker">Writing</p>
              <h2 className="section-title">最新文章</h2>
            </div>
            <Link to="/archive" className="bento-more">
              查看归档 →
            </Link>
          </div>
        </Reveal>
        {posts.length === 0 ? (
          <Empty description="还没有文章，快去 src/posts 目录写一篇吧" />
        ) : (
          <div className="post-list">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 60}>
                <PostCard post={post} index={i + 1} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
