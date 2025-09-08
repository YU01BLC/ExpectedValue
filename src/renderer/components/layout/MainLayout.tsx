import type { ReactNode } from 'react';
import { Sidebar } from './sidebar/Sidebar.tsx';
import { Header } from './header/header';

/**
 * アプリ全体のレイアウト。
 * - グローバル`Sidebar`と`Header`を配置し、メイン領域に子要素を描画する。
 */
interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex flex-1 flex-col'>
        <Header />
        <main className='flex-1 p-6 bg-gray-50'>{children}</main>
      </div>
    </div>
  );
};
