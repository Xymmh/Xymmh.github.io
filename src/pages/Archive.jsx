import { Empty } from '@arco-design/web-react';
import { Link } from 'react-router-dom';
import { posts, groupByYear } from '../lib/posts.js';

export default function Archive() {
  const groups = groupByYear(posts);

  if (posts.length === 0) {
    return <Empty description="还没有文章" />;
  }

  return (
    <div>
      {groups.map(([year, list]) => (
        <div key={year}>
          <h2 className="archive-year">{year}</h2>
          {list.map((post) => (
            <div key={post.slug} className="archive-item">
              <span className="archive-item-date">{post.dateFormatted}</span>
              <Link to={`/post/${post.slug}`}>{post.title}</Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
