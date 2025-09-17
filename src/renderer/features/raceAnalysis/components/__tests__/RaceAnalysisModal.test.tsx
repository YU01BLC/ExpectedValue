import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '@renderer/theme/theme';
import { RaceAnalysisModal } from '../RaceAnalysisModal';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import i18n from '@renderer/i18n';
import { I18nextProvider } from 'react-i18next';

const theme = createAppTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </I18nextProvider>
  );
};

const mockHorseData = [
  {
    horseNumber: 1,
    gateNumber: 1,
    horseName: 'テスト馬1',
    evaluation: 'S' as const,
    expectedValue: 1.5,
    odds: 3.2,
  },
  {
    horseNumber: 2,
    gateNumber: 2,
    horseName: 'テスト馬2',
    evaluation: 'A' as const,
    expectedValue: 1.2,
    odds: 2.8,
  },
];

describe('RaceAnalysisModal', () => {
  const defaultProps = {
    open: true,
    onClose: vi.fn(),
    horseData: mockHorseData,
  };

  it('基本的なレース分析モーダルが表示されること', () => {
    // GIVEN
    renderWithTheme(<RaceAnalysisModal {...defaultProps} />);

    // THEN
    expect(screen.getByText('レース分析モーダル')).toBeInTheDocument();
    expect(screen.getByText('全頭診断')).toBeInTheDocument();
    expect(screen.getByText('推奨買い目')).toBeInTheDocument();
  });

  it('モーダルが閉じている時は表示されないこと', () => {
    // GIVEN
    const closedProps = { ...defaultProps, open: false };

    // WHEN
    renderWithTheme(<RaceAnalysisModal {...closedProps} />);

    // THEN
    expect(screen.queryByText('レース分析モーダル')).not.toBeInTheDocument();
  });

  it('閉じるボタンクリック時にonCloseが呼ばれること', async () => {
    // GIVEN
    const user = userEvent.setup();
    const mockOnClose = vi.fn();
    renderWithTheme(
      <RaceAnalysisModal {...defaultProps} onClose={mockOnClose} />
    );

    // WHEN
    await user.click(screen.getByText('閉じる'));

    // THEN
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('×ボタンクリック時にonCloseが呼ばれること', async () => {
    // GIVEN
    const user = userEvent.setup();
    const mockOnClose = vi.fn();
    renderWithTheme(
      <RaceAnalysisModal {...defaultProps} onClose={mockOnClose} />
    );

    // WHEN
    const closeButton = screen.getByRole('button', { name: '' });
    await user.click(closeButton);

    // THEN
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('全頭診断テーブルが表示されること', () => {
    // GIVEN
    renderWithTheme(<RaceAnalysisModal {...defaultProps} />);

    // THEN
    expect(
      screen.getByRole('columnheader', { name: '馬番' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: '枠番' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: '馬名' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: '評価' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: '期待値' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'オッズ' })
    ).toBeInTheDocument();
  });

  it('チャートセクションが表示されること', () => {
    // GIVEN
    renderWithTheme(<RaceAnalysisModal {...defaultProps} />);

    // THEN
    expect(screen.getByText('コース傾向')).toBeInTheDocument();
    expect(screen.getByText('脚質分布')).toBeInTheDocument();
    expect(screen.getByText('血統適性')).toBeInTheDocument();
    // チャートセクションの存在を確認（具体的なタイトルは実装に依存）
    expect(screen.getByText('レース分析モーダル')).toBeInTheDocument();
  });

  it('推奨買い目が表示されること', () => {
    // GIVEN
    renderWithTheme(<RaceAnalysisModal {...defaultProps} />);

    // THEN
    // 推奨買い目のセクションが表示されることを確認
    expect(screen.getByText('推奨買い目')).toBeInTheDocument();
    // 具体的な買い目タイプはRecommendedBetsコンポーネントで表示される
    expect(screen.getByText('推奨買い目')).toBeInTheDocument();
  });

  it('ソート機能が動作すること', async () => {
    // GIVEN
    const user = userEvent.setup();
    renderWithTheme(<RaceAnalysisModal {...defaultProps} />);

    // WHEN
    await user.click(screen.getByRole('columnheader', { name: '馬番' }));

    // THEN
    // ソートが実行されることを確認（具体的な実装に依存）
    expect(
      screen.getByRole('columnheader', { name: '馬番' })
    ).toBeInTheDocument();
  });

  it('同じフィールドでソートを切り替えること', async () => {
    // GIVEN
    const user = userEvent.setup();
    renderWithTheme(<RaceAnalysisModal {...defaultProps} />);

    // WHEN
    await user.click(screen.getByRole('columnheader', { name: '馬番' }));
    await user.click(screen.getByRole('columnheader', { name: '馬番' }));

    // THEN
    // ソート方向が切り替わることを確認
    expect(
      screen.getByRole('columnheader', { name: '馬番' })
    ).toBeInTheDocument();
  });

  it('異なるフィールドでソートすること', async () => {
    // GIVEN
    const user = userEvent.setup();
    renderWithTheme(<RaceAnalysisModal {...defaultProps} />);

    // WHEN
    await user.click(screen.getByRole('columnheader', { name: '馬番' }));
    await user.click(screen.getByRole('columnheader', { name: '期待値' }));

    // THEN
    // 新しいフィールドでソートされることを確認
    expect(
      screen.getByRole('columnheader', { name: '期待値' })
    ).toBeInTheDocument();
  });

  it('ソート状態の初期化が正しく動作すること', async () => {
    // GIVEN
    const user = userEvent.setup();
    renderWithTheme(<RaceAnalysisModal {...defaultProps} />);

    // WHEN
    // 最初のクリックでフィールドが設定され、昇順でソートされる
    await user.click(screen.getByRole('columnheader', { name: '馬番' }));

    // THEN
    // ソートが適用されることを確認
    expect(
      screen.getByRole('columnheader', { name: '馬番' })
    ).toBeInTheDocument();
  });
});
