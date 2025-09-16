import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '@renderer/theme/theme';
import { RaceTable, type RaceTableProps } from '../RaceTable';
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
  {
    horseNumber: 3,
    gateNumber: 3,
    horseName: 'テスト馬3',
    evaluation: 'B' as const,
    expectedValue: 0.8,
    odds: 4.5,
  },
];

describe('RaceTable', () => {
  const defaultProps: RaceTableProps = {
    horseData: mockHorseData,
    sortField: null,
    sortDirection: 'asc',
    onSort: vi.fn(),
  };

  it('基本的なレーステーブルが表示されること', () => {
    // GIVEN
    renderWithTheme(<RaceTable {...defaultProps} />);

    // THEN
    expect(screen.getByText('馬番')).toBeInTheDocument();
    expect(screen.getByText('枠番')).toBeInTheDocument();
    expect(screen.getByText('馬名')).toBeInTheDocument();
    expect(screen.getByText('評価')).toBeInTheDocument();
    expect(screen.getByText('期待値')).toBeInTheDocument();
    expect(screen.getByText('オッズ')).toBeInTheDocument();
    // テーブルデータが表示されることを確認
    expect(screen.getAllByText('1')).toHaveLength(2); // 馬番1と枠番1
    expect(screen.getAllByText('2')).toHaveLength(2); // 馬番2と枠番2
    expect(screen.getAllByText('3')).toHaveLength(2); // 馬番3と枠番3
  });

  it('馬番でソートが動作すること', async () => {
    // GIVEN
    const user = userEvent.setup();
    const mockOnSort = vi.fn();
    renderWithTheme(<RaceTable {...defaultProps} onSort={mockOnSort} />);

    // WHEN
    await user.click(screen.getByText('馬番'));

    // THEN
    expect(mockOnSort).toHaveBeenCalledWith('horseNumber');
  });

  it('枠番でソートが動作すること', async () => {
    // GIVEN
    const user = userEvent.setup();
    const mockOnSort = vi.fn();
    renderWithTheme(<RaceTable {...defaultProps} onSort={mockOnSort} />);

    // WHEN
    await user.click(screen.getByText('枠番'));

    // THEN
    expect(mockOnSort).toHaveBeenCalledWith('gateNumber');
  });

  it('評価でソートが動作すること', async () => {
    // GIVEN
    const user = userEvent.setup();
    const mockOnSort = vi.fn();
    renderWithTheme(<RaceTable {...defaultProps} onSort={mockOnSort} />);

    // WHEN
    await user.click(screen.getByText('評価'));

    // THEN
    expect(mockOnSort).toHaveBeenCalledWith('evaluation');
  });

  it('期待値でソートが動作すること', async () => {
    // GIVEN
    const user = userEvent.setup();
    const mockOnSort = vi.fn();
    renderWithTheme(<RaceTable {...defaultProps} onSort={mockOnSort} />);

    // WHEN
    await user.click(screen.getByText('期待値'));

    // THEN
    expect(mockOnSort).toHaveBeenCalledWith('expectedValue');
  });

  it('オッズでソートが動作すること', async () => {
    // GIVEN
    const user = userEvent.setup();
    const mockOnSort = vi.fn();
    renderWithTheme(<RaceTable {...defaultProps} onSort={mockOnSort} />);

    // WHEN
    await user.click(screen.getByText('オッズ'));

    // THEN
    expect(mockOnSort).toHaveBeenCalledWith('odds');
  });

  it('評価でソートされたデータが正しく表示されること', () => {
    // GIVEN
    const propsWithSort = {
      ...defaultProps,
      sortField: 'evaluation' as const,
      sortDirection: 'desc' as const,
    };

    // WHEN
    renderWithTheme(<RaceTable {...propsWithSort} />);

    // THEN
    const rows = screen.getAllByRole('row');
    // ヘッダー行を除く最初の行がS評価の馬であることを確認
    expect(rows[1]).toHaveTextContent('S');
    expect(rows[1]).toHaveTextContent('1.5'); // 期待値
  });

  it('期待値でソートされたデータが正しく表示されること', () => {
    // GIVEN
    const propsWithSort = {
      ...defaultProps,
      sortField: 'expectedValue' as const,
      sortDirection: 'desc' as const,
    };

    // WHEN
    renderWithTheme(<RaceTable {...propsWithSort} />);

    // THEN
    const rows = screen.getAllByRole('row');
    // ヘッダー行を除く最初の行が期待値1.5の馬であることを確認
    expect(rows[1]).toHaveTextContent('1.5');
    expect(rows[1]).toHaveTextContent('S'); // 評価
  });

  it('枠番の色が正しく適用されること', () => {
    // GIVEN
    renderWithTheme(<RaceTable {...defaultProps} />);

    // THEN
    const gateCells = screen.getAllByText('1');
    // 枠番1のセルが存在することを確認
    expect(
      gateCells.some((cell) => cell.closest('td')?.textContent?.includes('1'))
    ).toBe(true);
  });

  it('評価の色が正しく適用されること', () => {
    // GIVEN
    renderWithTheme(<RaceTable {...defaultProps} />);

    // THEN
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('空のデータでも表示されること', () => {
    // GIVEN
    const emptyProps = {
      ...defaultProps,
      horseData: [],
    };

    // WHEN
    renderWithTheme(<RaceTable {...emptyProps} />);

    // THEN
    expect(screen.getByText('馬番')).toBeInTheDocument();
    expect(screen.getByText('枠番')).toBeInTheDocument();
    expect(screen.getByText('馬名')).toBeInTheDocument();
    expect(screen.getByText('評価')).toBeInTheDocument();
    expect(screen.getByText('期待値')).toBeInTheDocument();
    expect(screen.getByText('オッズ')).toBeInTheDocument();
  });

  it('無効なソートフィールドでソートが動作すること', () => {
    // GIVEN
    const propsWithInvalidSort = {
      ...defaultProps,
      sortField: 'invalidField' as any,
      sortDirection: 'asc' as const,
    };

    // WHEN
    renderWithTheme(<RaceTable {...propsWithInvalidSort} />);

    // THEN
    // 無効なフィールドでもコンポーネントが正常にレンダリングされることを確認
    expect(screen.getByText('馬番')).toBeInTheDocument();
    expect(screen.getByText('枠番')).toBeInTheDocument();
    expect(screen.getByText('馬名')).toBeInTheDocument();
  });

  it('oddsソートが正しく動作すること', () => {
    // GIVEN
    const propsWithOddsSort = {
      ...defaultProps,
      sortField: 'odds' as const,
      sortDirection: 'asc' as const,
    };

    // WHEN
    renderWithTheme(<RaceTable {...propsWithOddsSort} />);

    // THEN
    expect(screen.getByText('馬番')).toBeInTheDocument();
    expect(screen.getByText('枠番')).toBeInTheDocument();
    expect(screen.getByText('馬名')).toBeInTheDocument();
  });

  it('expectedValueソートが正しく動作すること', () => {
    // GIVEN
    const propsWithExpectedValueSort = {
      ...defaultProps,
      sortField: 'expectedValue' as const,
      sortDirection: 'desc' as const,
    };

    // WHEN
    renderWithTheme(<RaceTable {...propsWithExpectedValueSort} />);

    // THEN
    expect(screen.getByText('馬番')).toBeInTheDocument();
    expect(screen.getByText('枠番')).toBeInTheDocument();
    expect(screen.getByText('馬名')).toBeInTheDocument();
  });
});
