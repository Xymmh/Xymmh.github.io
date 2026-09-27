import { Empty } from '@arco-design/web-react';
import { posts } from '../lib/posts.js';
import PostCard from '../components/PostCard.jsx';

export default function Home() {
  return (
    <div className="post-list">
      {posts.length === 0 ? (
        <Empty description="还没有文章，快去 src/posts 目录写一篇吧" />
      ) : (
        posts.map((post) => <PostCard key={post.slug} post={post} />)
      )}
    </div>
  );
}
