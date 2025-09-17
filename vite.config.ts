import { defineConfig } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Electron の file:// 読み込みでパス解決できるよう相対パスにする
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/renderer'),
      '@renderer': path.resolve(__dirname, 'src/renderer'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  server: {
    headers: {
      'Content-Security-Policy':
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; worker-src 'self' blob:;",
    },
  },
});
