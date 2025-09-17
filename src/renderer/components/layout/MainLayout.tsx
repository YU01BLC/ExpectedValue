import type { ReactNode } from 'react';
import { Box } from '@mui/material';

/**
 * アプリ全体のレイアウト。
 * - シンプルな単一ページレイアウト（サイドバー・ヘッダーなし）
 */
interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        color: 'text.primary',
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        padding: { xs: 2, md: 4, lg: 6 },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          width: '100%',
          mx: 'auto',
          flex: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
