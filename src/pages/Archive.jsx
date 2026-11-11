import { Empty } from '@arco-design/web-react';
import { Link } from 'react-router-dom';
import { posts, groupByYear } from '../lib/posts.js';

export default function Archive() {
  const groups = groupByYear(posts);

  return (
    <div>
      <header className="page-head">
        <p className="section-kicker">Archive</p>
        <h1 className="page-title">归档</h1>
        <p className="page-sub">共 {posts.length} 篇文章，按时间倒序排列。</p>
      </header>
      {posts.length === 0 ? (
        <Empty description="还没有文章" />
      ) : (
        <div className="timeline">
          {groups.map(([year, list]) => (
            <section key={year} className="timeline-year">
              <h2 className="archive-year">
                {year}
                <span className="archive-count">{list.length} 篇</span>
              </h2>
              {list.map((post) => (
                <Link key={post.slug} to={`/post/${post.slug}`} className="archive-item">
                  <span className="archive-item-date">{post.dateFormatted.slice(5)}</span>
                  <span className="archive-item-title">{post.title}</span>
                  <span className="archive-item-arrow" aria-hidden="true">→</span>
                </Link>
              ))}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
