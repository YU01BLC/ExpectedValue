import { createMemoryRouter } from 'react-router';
import { MainLayout } from '@/components/layout/MainLayout';
import Dashboard from '@/features/dashboard';

/**
 * アプリ全体のルート定義。
 * - Electron環境では`BrowserRouter`ではなく`createMemoryRouter`を使用する。
 * - 現在はダッシュボードページのみを提供。
 */
export const router = createMemoryRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <Dashboard />
      </MainLayout>
    ),
  },
]);
