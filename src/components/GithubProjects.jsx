import { useEffect, useState } from 'react';
import { SITE } from '../config.js';

const USER = SITE.github.split('/').pop();
const CACHE_KEY = 'gh-repos-v1';
// 不在首页展示的仓库（个人主页、测试仓库等）
const EXCLUDE = new Set([USER, `${USER}.github.io`, 'test1', 'blog-comments', 'Refer-backup']);

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Shell: '#89e051',
};

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function GithubProjects({ limit = 3 }) {
  const [repos, setRepos] = useState(readCache);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (repos) return;
    let cancelled = false;
    fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        const list = data
          .filter((r) => !r.fork && !r.archived && !EXCLUDE.has(r.name))
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              new Date(b.pushed_at) - new Date(a.pushed_at)
          )
          .map((r) => ({
            name: r.name,
            url: r.html_url,
            desc: r.description,
            lang: r.language,
            stars: r.stargazers_count,
            forks: r.forks_count,
          }));
        if (cancelled) return;
        setRepos(list);
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(list));
        } catch {
          /* 存储不可用时忽略 */
        }
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [repos]);

  if (failed || (repos && repos.length === 0)) {
    return (
      <a className="project-empty" href={SITE.github} target="_blank" rel="noopener noreferrer">
        去 GitHub 查看我的全部项目 →
      </a>
    );
  }

  if (!repos) {
    return (
      <div className="project-list">
        {Array.from({ length: limit }).map((_, i) => (
          <div key={i} className="project-item project-skeleton" />
        ))}
      </div>
    );
  }

  return (
    <div className="project-list">
      {repos.slice(0, limit).map((r) => (
        <a key={r.name} className="project-item" href={r.url} target="_blank" rel="noopener noreferrer">
          <div className="project-head">
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
            </svg>
            <span className="project-name">{r.name}</span>
          </div>
          {r.desc && <p className="project-desc">{r.desc}</p>}
          <div className="project-meta">
            {r.lang && (
              <span>
                <i className="project-lang-dot" style={{ background: LANG_COLORS[r.lang] || '#8b949e' }} />
                {r.lang}
              </span>
            )}
            <span>★ {r.stars}</span>
            {r.forks > 0 && <span>⑂ {r.forks}</span>}
          </div>
        </a>
      ))}
    </div>
  );
}
