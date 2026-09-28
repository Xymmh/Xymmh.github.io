import { NavLink, Outlet } from 'react-router-dom';
import { SITE } from '../config.js';
import ThemeToggle from './ThemeToggle.jsx';
import ReadingProgress from './ReadingProgress.jsx';
import BackToTop from './BackToTop.jsx';

export default function Layout() {
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
      <main className="main-container">
        <Outlet />
      </main>
      <footer className="site-footer">
        © {new Date().getFullYear()} {SITE.author} · Powered by React + GitHub Pages
      </footer>
      <BackToTop />
    </>
  );
}
