import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { SITE } from '../config.js';
import ThemeToggle from './ThemeToggle.jsx';
import ReadingProgress from './ReadingProgress.jsx';
import BackToTop from './BackToTop.jsx';

export default function Layout() {
  const location = useLocation();
  // 首页需要更宽的容器以容纳左右分栏布局（profile + 文章列表）
  const isHome = location.pathname === '/';
  const mainClass = isHome ? 'main-container main-container-home' : 'main-container';
  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <NavLink to="/" className="site-logo">
            {SITE.title}
          </NavLink>
          <div className="site-header-right">
            <nav className="site-nav">
              <NavLink to="/" end>
                首页
              </NavLink>
              <NavLink to="/archive">归档</NavLink>
              <NavLink to="/about">关于</NavLink>
            </nav>
            <ThemeToggle />
          </div>
        </div>
        <ReadingProgress />
      </header>
      <main className={mainClass}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="footer-card">
          © {new Date().getFullYear()} {SITE.author} · Powered by React + GitHub Pages
        </div>
      </footer>
      <BackToTop />
    </>
  );
}
