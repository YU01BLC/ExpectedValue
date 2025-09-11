import type { ReactNode } from 'react';

/**
 * アプリ全体のレイアウト。
 * - シンプルな単一ページレイアウト（サイドバー・ヘッダーなし）
 */
interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div
      className='min-h-screen text-foreground'
      style={{
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        padding: '32px 64px',
      }}
    >
      <div className='mx-auto'>{children}</div>
    </div>
  );
};
