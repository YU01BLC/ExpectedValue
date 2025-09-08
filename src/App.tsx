import type { ReactNode } from 'react';
import { Suspense } from 'react';

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default AppProviders;
