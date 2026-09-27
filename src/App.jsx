import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Post from './pages/Post.jsx';
import Archive from './pages/Archive.jsx';
import About from './pages/About.jsx';

const TITLES = {
  '/': 'Xymmh 的博客',
  '/archive': '归档 - Xymmh 的博客',
  '/about': '关于 - Xymmh 的博客',
};

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // 处理 404.html SPA 回退（/?p=/post/xxx 形式）
  // 必须用 navigate 让 React Router 感知路径变化，replaceState 只改地址栏不触发渲染
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('p');
    if (p && p !== '/') {
      navigate(p, { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    document.title = TITLES[location.pathname] ??
      (location.pathname.startsWith('/post/') ? undefined : TITLES['/']);
  }, [location]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/post/:slug" element={<Post />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
