import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '@renderer/theme/theme';
import { ListModal } from '../ListModal';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import i18n from '@renderer/i18n';
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

describe('ListModal', () => {
  it('モーダルが閉じている時は表示されないこと', () => {
    // GIVEN
    const mockOnClose = vi.fn();

    // WHEN
    renderWithTheme(<ListModal open={false} onClose={mockOnClose} />);

    // THEN
    expect(screen.queryByText('レース一覧')).not.toBeInTheDocument();
  });

  it('モーダルが開いている時は表示されること', () => {
    // GIVEN
    const mockOnClose = vi.fn();

    // WHEN
    renderWithTheme(<ListModal open={true} onClose={mockOnClose} />);

    // THEN
    expect(screen.getByText('レース一覧')).toBeInTheDocument();
    expect(screen.getByText('閉じる')).toBeInTheDocument();
  });

  it('閉じるボタンクリック時にonCloseが呼ばれること', async () => {
    // GIVEN
    const user = userEvent.setup();
    const mockOnClose = vi.fn();

    // WHEN
    renderWithTheme(<ListModal open={true} onClose={mockOnClose} />);
    await user.click(screen.getByText('閉じる'));

    // THEN
    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  it('×ボタンクリック時にonCloseが呼ばれること', async () => {
    // GIVEN
    const user = userEvent.setup();
    const mockOnClose = vi.fn();

    // WHEN
    renderWithTheme(<ListModal open={true} onClose={mockOnClose} />);
    const closeButton = screen.getByRole('button', { name: '' }); // ×ボタン
    await user.click(closeButton);

    // THEN
    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  it('全頭診断テーブルが表示されること', () => {
    // GIVEN
    const mockOnClose = vi.fn();

    // WHEN
    renderWithTheme(<ListModal open={true} onClose={mockOnClose} />);

    // THEN
    expect(screen.getByText('全頭診断')).toBeInTheDocument();
    expect(screen.getByText('馬名')).toBeInTheDocument();
    expect(screen.getByText('評価')).toBeInTheDocument();
    expect(screen.getByText('勝率%')).toBeInTheDocument();
    expect(screen.getByText('オッズ')).toBeInTheDocument();
    expect(screen.getByText('EV値')).toBeInTheDocument();
    expect(screen.getByText('推奨')).toBeInTheDocument();
    expect(screen.getAllByText('サンプルA')).toHaveLength(2); // テーブルと推奨買い目で2回出現
    expect(screen.getByText('サンプルB')).toBeInTheDocument();
  });

  it('チャートセクションが表示されること', () => {
    // GIVEN
    const mockOnClose = vi.fn();

    // WHEN
    renderWithTheme(<ListModal open={true} onClose={mockOnClose} />);

    // THEN
    expect(screen.getByText('コース傾向')).toBeInTheDocument();
    expect(screen.getByText('脚質分布')).toBeInTheDocument();
    expect(screen.getByText('血統適性')).toBeInTheDocument();
    expect(screen.getByText('勝率 × オッズ')).toBeInTheDocument();
  });

  it('推奨買い目が表示されること', () => {
    // GIVEN
    const mockOnClose = vi.fn();

    // WHEN
    renderWithTheme(<ListModal open={true} onClose={mockOnClose} />);

    // THEN
    expect(screen.getByText('推奨買い目')).toBeInTheDocument();
    expect(screen.getByText('単勝:')).toBeInTheDocument();
    expect(screen.getByText('馬連:')).toBeInTheDocument();
    expect(screen.getByText('3連複:')).toBeInTheDocument();
  });
});
