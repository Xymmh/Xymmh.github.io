import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <article className="post-card">
      <div className="post-card-meta">
        {post.pinned && <span className="post-card-pinned">置顶</span>}
        <span className="post-card-date">{post.dateFormatted}</span>
      </div>
      <h2 className="post-card-title">
        <Link to={`/post/${post.slug}`}>{post.title}</Link>
      </h2>
      {post.summary && <p className="post-card-summary">{post.summary}</p>}
      {post.tags.length > 0 && (
        <div className="post-card-tags">
          {post.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
