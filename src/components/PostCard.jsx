import { Tag } from '@arco-design/web-react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <article className="post-card">
      <div className="post-card-date">{post.dateFormatted}</div>
      <h2 className="post-card-title">
        <Link to={`/post/${post.slug}`}>{post.title}</Link>
      </h2>
      {post.summary && <p className="post-card-summary">{post.summary}</p>}
      {post.tags.length > 0 && (
        <div className="post-card-tags">
          {post.tags.map((t) => (
            <Tag key={t} size="small" color="gray" bordered>
              {t}
            </Tag>
          ))}
        </div>
      )}
    </article>
  );
}
