import type { ReactNode } from 'react';
import { Suspense, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from '@/theme/theme';
import '@/i18n';
import './pwa';
import { initializeMockData } from './utils/initializeMockData';

/**
 * アプリ全体のプロバイダを集約するルートコンポーネント
 *
 * @description ElectronRenderer向けにcreateMemoryRouterを外部で管理し、本コンポーネントで共通Providersをラップする。すべてのデータ取得UIはSuspense配下で実行されることを前提とする。MUIテーマとi18nを提供する。
 * @param props - コンポーネントのプロパティ
 * @param props.children - 子コンポーネント
 * @returns JSX.Element
 */

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  const theme = createAppTheme();

  useEffect(() => {
    // モックデータを初期化
    initializeMockData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </ThemeProvider>
  );
};

export default AppProviders;
