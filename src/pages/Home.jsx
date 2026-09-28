import { Empty } from '@arco-design/web-react';
import { posts } from '../lib/posts.js';
import PostCard from '../components/PostCard.jsx';
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
          <a
            className="profile-github"
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub →
          </a>
        </div>
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
