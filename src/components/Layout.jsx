import { NavLink, Outlet } from 'react-router-dom';
import { SITE } from '../config.js';

export default function Layout() {
  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <NavLink to="/" className="site-logo">
            {SITE.title}
          </NavLink>
          <nav className="site-nav">
            <NavLink to="/" end>
              首页
            </NavLink>
            <NavLink to="/archive">归档</NavLink>
            <NavLink to="/about">关于</NavLink>
          </nav>
        </div>
      </header>
      <main className="main-container">
        <Outlet />
      </main>
      <footer className="site-footer">
        © {new Date().getFullYear()} {SITE.author} · Powered by React + GitHub Pages
      </footer>
    </>
  );
}
