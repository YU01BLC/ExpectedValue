import type { ReactNode } from 'react';
import { Suspense } from 'react';

/**
 * アプリ全体のプロバイダを集約するルートコンポーネント。
 * - ElectronRenderer向けに`createMemoryRouter`を外部で管理し、本コンポーネントで共通Providersをラップする。
 * - すべてのデータ取得UIは`Suspense`配下で実行されることを前提とする。
 */

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default AppProviders;
