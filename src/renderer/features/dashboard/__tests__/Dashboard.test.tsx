import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '@renderer/theme/theme';
import Dashboard from '../index';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';

// 実際のi18nインスタンスを使用
import i18n from '../../../i18n';
import { I18nextProvider } from 'react-i18next';

// 画像ファイルのモックは不要（動的読み込みのため）

const theme = createAppTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </I18nextProvider>
  );
};

describe('Dashboard', () => {
  it('ダッシュボードが正しく表示されること', () => {
    // GIVEN
    // WHEN
    renderWithTheme(<Dashboard />);

    // THEN
    expect(screen.getByText('Expected Value Tracker')).toBeInTheDocument();
    expect(
      screen.getByText('回収率を最大化するためのダッシュボード')
    ).toBeInTheDocument();
    expect(screen.getByText('🔍 レース検索')).toBeInTheDocument();
    expect(screen.getByText('検索')).toBeInTheDocument();
  });

  it('検索ボタンが表示されること', () => {
    // GIVEN
    // WHEN
    renderWithTheme(<Dashboard />);

    // THEN
    const searchButton = screen.getByRole('button', { name: '検索' });
    expect(searchButton).toBeInTheDocument();
  });

  it('検索ボタンクリック時にモーダルが開くこと', async () => {
    // GIVEN
    const user = userEvent.setup();

    // WHEN
    renderWithTheme(<Dashboard />);
    const searchButton = screen.getByRole('button', { name: '検索' });
    await user.click(searchButton);

    // THEN
    expect(screen.getByText('レース分析モーダル')).toBeInTheDocument();
    expect(screen.getByText('閉じる')).toBeInTheDocument();
  });

  it('モーダルの閉じるボタンクリック時にモーダルが閉じること', async () => {
    // GIVEN
    const user = userEvent.setup();

    // WHEN
    renderWithTheme(<Dashboard />);
    const searchButton = screen.getByRole('button', { name: '検索' });
    await user.click(searchButton);

    const closeButton = screen.getByText('閉じる');
    await user.click(closeButton);

    // THEN
    await waitFor(() => {
      expect(screen.queryByText('レース分析モーダル')).not.toBeInTheDocument();
    });
  });

  it('モーダルの×ボタンクリック時にモーダルが閉じること', async () => {
    // GIVEN
    const user = userEvent.setup();

    // WHEN
    renderWithTheme(<Dashboard />);
    const searchButton = screen.getByRole('button', { name: '検索' });
    await user.click(searchButton);

    const closeIconButton = screen.getByTestId('CloseIcon'); // ×ボタン
    await user.click(closeIconButton);

    // THEN
    await waitFor(() => {
      expect(screen.queryByText('レース分析モーダル')).not.toBeInTheDocument();
    });
  });
});
