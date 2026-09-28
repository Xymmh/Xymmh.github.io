import { Result } from '@arco-design/web-react';
import { Link, useParams } from 'react-router-dom';
import { getPost } from '../lib/posts.js';
import { SITE } from '../config.js';
import Giscus from '../components/Giscus.jsx';
import MarkdownBody from '../components/MarkdownBody.jsx';
import TOC from '../components/TOC.jsx';

export default function Post() {
  const { slug } = useParams();
  const post = getPost(slug);

  if (!post) {
    return (
      <Result
        status="404"
        title="文章不存在"
        subTitle="这篇文章可能还没写，或者链接有误"
        extra={
          <Link to="/" style={{ color: '#165dff' }}>
            返回首页
          </Link>
        }
      />
    );
  }

  document.title = `${post.title} - ${SITE.title}`;

  // 字数：去掉 Markdown 符号后的字符数；阅读时长按 400 字/分钟估算
  const wordCount = post.body.replace(/[\s#>*_\-\[\]()`!]/g, '').length;
  const readTime = Math.max(1, Math.ceil(wordCount / 400));

  return (
    <>
      <TOC key={slug} />
      <article>
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span>{post.dateFormatted}</span>
          <span>{SITE.author}</span>
          <span>约 {wordCount} 字</span>
          <span>{readTime} 分钟阅读</span>
        </div>
      </header>
      <div className="markdown-body">
        <MarkdownBody body={post.body} />
      </div>
        <Giscus />
      </article>
    </>
  );
}
