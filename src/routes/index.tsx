import { createMemoryRouter } from 'react-router';
import { MainLayout } from '@/components/layout/MainLayout.tsx';
import Dashboard from '../pages/Dashboard.tsx';
import Horses from '../pages/Horses.tsx';
import Analysis from '../pages/Analysis.tsx';
import History from '../pages/History.tsx';

export const router = createMemoryRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <Dashboard />
      </MainLayout>
    ),
  },
  {
    path: '/horses',
    element: (
      <MainLayout>
        <Horses />
      </MainLayout>
    ),
  },
  {
    path: '/analysis',
    element: (
      <MainLayout>
        <Analysis />
      </MainLayout>
    ),
  },
  {
    path: '/history',
    element: (
      <MainLayout>
        <History />
      </MainLayout>
    ),
  },
]);
