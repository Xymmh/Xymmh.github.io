import { useEffect, useState } from 'react';
import { Button } from '@arco-design/web-react';
import { IconUp } from '@arco-design/web-react/icon';

// 滚动超过一屏后显示，点击平滑回到顶部
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <Button
      className="back-to-top"
      shape="circle"
      type="default"
      icon={<IconUp />}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="回到顶部"
    />
  );
}
