import { Link } from 'react-router-dom';
import { SpotCard } from './Effects.jsx';

export default function PostCard({ post, index }) {
  return (
    <SpotCard as="article" className="post-card">
      <Link to={`/post/${post.slug}`} className="post-card-link" aria-label={post.title} />
      {index != null && <span className="post-card-index">{String(index).padStart(2, '0')}</span>}
      <div className="post-card-body">
        <div className="post-card-meta">
          {post.pinned && <span className="post-card-pinned">置顶</span>}
          <time className="post-card-date">{post.dateFormatted}</time>
          {post.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <h3 className="post-card-title">{post.title}</h3>
        {post.summary && <p className="post-card-summary">{post.summary}</p>}
      </div>
      <span className="post-card-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </span>
    </SpotCard>
  );
}
