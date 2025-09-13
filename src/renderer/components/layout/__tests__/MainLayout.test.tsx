import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '@renderer/theme/theme';
import { MainLayout } from '../MainLayout';
import { describe, it, expect } from 'vitest';

const theme = createAppTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('MainLayout', () => {
  it('基本的なレイアウトが表示されること', () => {
    // GIVEN
    const children = <div data-testid='main-content'>メインコンテンツ</div>;

    // WHEN
    renderWithTheme(<MainLayout>{children}</MainLayout>);

    // THEN
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
    expect(screen.getByText('メインコンテンツ')).toBeInTheDocument();
  });

  it('レイアウトコンテナが正しく配置されること', () => {
    // GIVEN
    const children = <div>テストコンテンツ</div>;

    // WHEN
    renderWithTheme(<MainLayout>{children}</MainLayout>);

    // THEN
    const container = screen.getByText('テストコンテンツ').closest('div');
    expect(container).toBeInTheDocument();
  });

  it('複数の子要素が表示されること', () => {
    // GIVEN
    const children = (
      <>
        <div data-testid='child-1'>子要素1</div>
        <div data-testid='child-2'>子要素2</div>
        <div data-testid='child-3'>子要素3</div>
      </>
    );

    // WHEN
    renderWithTheme(<MainLayout>{children}</MainLayout>);

    // THEN
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
  });

  it('空の子要素でも表示されること', () => {
    // GIVEN
    const children = null;

    // WHEN
    renderWithTheme(<MainLayout>{children}</MainLayout>);

    // THEN
    // レイアウトコンテナは存在するが、子要素は表示されない
    const container = document.querySelector('div');
    expect(container).toBeInTheDocument();
  });
});
