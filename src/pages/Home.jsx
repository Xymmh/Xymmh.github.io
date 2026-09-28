import { Empty } from '@arco-design/web-react';
import { posts } from '../lib/posts.js';
import PostCard from '../components/PostCard.jsx';
import UserLocalInfo from '../components/UserLocalInfo.jsx';
import { SITE } from '../config.js';

export default function Home() {
  return (
    <div className="home-layout">
      {/* 左侧：个人资料卡片（桌面端吸顶；移动端在文章列表下方居中显示） */}
      <aside className="home-profile">
        <div className="profile-card">
          <img
            className="profile-avatar"
            src="https://github.com/Xymmh.png"
            alt={SITE.author}
          />
          <h2 className="profile-name">{SITE.author}</h2>
          <p className="profile-bio">{SITE.description}</p>
          <div className="profile-socials">
            <a
              className="profile-social"
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.71-4.04-1.58-4.04-1.58-.55-1.36-1.34-1.73-1.34-1.73-1.09-.73.08-.72.08-.72 1.21.08 1.84 1.22 1.84 1.22 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.58-2.67-.3-5.47-1.31-5.47-5.84 0-1.29.47-2.35 1.23-3.18-.12-.3-.53-1.51.12-3.16 0 0 1.01-.32 3.3 1.22.96-.26 1.98-.39 3-.4 1.02.01 2.04.14 3 .4 2.28-1.54 3.29-1.22 3.29-1.22.65 1.65.24 2.86.12 3.16.77.83 1.23 1.89 1.23 3.18 0 4.54-2.81 5.54-5.49 5.83.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.21.7.82.58C20.57 21.91 24 17.5 24 12.29 24 5.78 18.63.5 12 .5z" />
              </svg>
              GitHub
            </a>
            <a
              className="profile-social"
              href={SITE.v2ex}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="V2EX"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              V2EX
            </a>
            <a
              className="profile-social"
              href={SITE.zhihu}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="知乎"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              知乎
            </a>
            <a
              className="profile-social"
              href={SITE.bilibili}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="哔哩哔哩"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="6" width="20" height="14" rx="3" />
                <path d="M7 2l3 4M17 2l-3 4" />
                <path d="M8 13h3M13 13h3" />
              </svg>
              B站
            </a>
            <a
              className="profile-social"
              href={SITE.douyin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="抖音"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
              抖音
            </a>
          </div>
        </div>
        {/* 访客位置天气与时间卡片 */}
        <UserLocalInfo />
      </aside>

      {/* 右侧：文章列表 */}
      <div className="home-posts">
        {posts.length === 0 ? (
          <Empty description="还没有文章，快去 src/posts 目录写一篇吧" />
        ) : (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>
    </div>
  );
}
