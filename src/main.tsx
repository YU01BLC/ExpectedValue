/**
 * React レンダラのエントリポイント。
 * React.StrictMode でアプリを DOM にマウントします。
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import AppProviders from './App.tsx';
import { router } from './routes/index.tsx';

// index.html で #root 要素の存在が保証されているため Non-null アサーションは安全です。

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>
);
