import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 部署到用户站点 https://xymmh.github.io/ 根路径，base 为 '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
});
