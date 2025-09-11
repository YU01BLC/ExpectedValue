/**
 * React レンダラのエントリーポイント。
 * - Electron アプリのRendererプロセスで起動される。
 * - ルーティングは`createMemoryRouter`を`src/routes`で構成し、本ファイルでは`RouterProvider`のみをマウントする。
 * - `StrictMode`配下でアプリの副作用検知を有効にする。
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../global.css';
import { RouterProvider } from 'react-router';
import AppProviders from '@/App';
import { router } from '@/routes';

// index.html で #root 要素の存在が保証されているため Non-null アサーションは安全です。

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>
);
