import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { SITE } from '../config.js';
import ThemeToggle from './ThemeToggle.jsx';
import ReadingProgress from './ReadingProgress.jsx';
import BackToTop from './BackToTop.jsx';
import { Aurora } from './Effects.jsx';
import { SocialIcons } from './Socials.jsx';

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 切换路由时回到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Aurora />
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
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
            <span className="site-header-divider" />
            <ThemeToggle />
          </div>
        </div>
        {!isHome && <ReadingProgress />}
      </header>
      <main className={isHome ? 'main-container main-container-home' : 'main-container'}>
        <div key={location.pathname} className="page-enter">
          <Outlet />
        </div>
      </main>
      <footer className="site-footer">
        <div className="site-footer-inner">
          <div>
            <div className="footer-logo">{SITE.author}</div>
            <p className="footer-tagline">{SITE.description}</p>
          </div>
          <SocialIcons />
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {SITE.author}</span>
          <span>Built with React · Hosted on GitHub Pages</span>
        </div>
      </footer>
      <BackToTop />
    </>
  );
}
