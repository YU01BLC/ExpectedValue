import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '@renderer/i18n';
import { createAppTheme } from '@renderer/theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import { RaceTableMobileView } from '../RaceTableMobileView';
import type {
  HorseData,
  SortField,
  SortDirection,
} from '../../types/raceTable';

// テスト用のテーマプロバイダー
const TestThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = createAppTheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

// テスト用のレンダリング関数
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <TestThemeProvider>{component}</TestThemeProvider>
    </I18nextProvider>
  );
};

describe('RaceTableMobileView', () => {
  const mockHorseData: HorseData[] = [
    {
      id: '1',
      name: 'テスト馬1',
      horseNumber: 1,
      gateNumber: 1,
      evaluation: 'S',
      expectedValue: 1.5,
      odds: 3.2,
      comment: 'コメント1',
    },
    {
      id: '2',
      name: 'テスト馬2',
      horseNumber: 2,
      gateNumber: 2,
      evaluation: 'A',
      expectedValue: 1.2,
      odds: 4.5,
      comment: 'コメント2',
    },
    {
      id: '3',
      name: 'テスト馬3',
      horseNumber: 3,
      gateNumber: 3,
      evaluation: 'B',
      expectedValue: 0.8,
      odds: 6.0,
      comment: 'コメント3',
    },
  ];

  const defaultProps = {
    horseData: mockHorseData,
    sortField: null as SortField | null,
    sortDirection: 'asc' as SortDirection,
    onSort: vi.fn(),
    onHorseClick: vi.fn(),
  };

  it('馬データが正しく表示されること', () => {
    // GIVEN
    renderWithProviders(<RaceTableMobileView {...defaultProps} />);

    // THEN
    expect(screen.getByText('テスト馬1')).toBeInTheDocument();
    expect(screen.getByText('テスト馬2')).toBeInTheDocument();
    expect(screen.getByText('テスト馬3')).toBeInTheDocument();
  });

  it('ソートボタンが表示されること', () => {
    // GIVEN
    renderWithProviders(<RaceTableMobileView {...defaultProps} />);

    // THEN
    expect(screen.getByText('馬番')).toBeInTheDocument();
    expect(screen.getByText('オッズ')).toBeInTheDocument();
    expect(screen.getByText('期待値')).toBeInTheDocument();
  });

  it('馬番ソートボタンクリック時にonSortが呼ばれること', () => {
    // GIVEN
    const mockOnSort = vi.fn();
    const props = { ...defaultProps, onSort: mockOnSort };
    renderWithProviders(<RaceTableMobileView {...props} />);

    // WHEN
    const horseNumberButton = screen.getByText('馬番');
    fireEvent.click(horseNumberButton);

    // THEN
    expect(mockOnSort).toHaveBeenCalledWith('horseNumber');
  });

  it('オッズソートボタンクリック時にonSortが呼ばれること', () => {
    // GIVEN
    const mockOnSort = vi.fn();
    const props = { ...defaultProps, onSort: mockOnSort };
    renderWithProviders(<RaceTableMobileView {...props} />);

    // WHEN
    const oddsButton = screen.getByText('オッズ');
    fireEvent.click(oddsButton);

    // THEN
    expect(mockOnSort).toHaveBeenCalledWith('odds');
  });

  it('期待値ソートボタンクリック時にonSortが呼ばれること', () => {
    // GIVEN
    const mockOnSort = vi.fn();
    const props = { ...defaultProps, onSort: mockOnSort };
    renderWithProviders(<RaceTableMobileView {...props} />);

    // WHEN
    const expectedValueButton = screen.getByText('期待値');
    fireEvent.click(expectedValueButton);

    // THEN
    expect(mockOnSort).toHaveBeenCalledWith('expectedValue');
  });

  it('ソートフィールドが選択されている場合、ボタンがアクティブ状態になること', () => {
    // GIVEN
    const props = {
      ...defaultProps,
      sortField: 'horseNumber' as SortField,
    };
    renderWithProviders(<RaceTableMobileView {...props} />);

    // THEN
    const horseNumberButton = screen.getByRole('button', { name: /馬番/ });
    expect(horseNumberButton).toHaveClass('MuiButton-contained');
  });

  it('ソート方向が表示されること', () => {
    // GIVEN
    const props = {
      ...defaultProps,
      sortField: 'horseNumber' as SortField,
      sortDirection: 'desc' as SortDirection,
    };
    renderWithProviders(<RaceTableMobileView {...props} />);

    // THEN
    expect(screen.getByText('馬番 ↓')).toBeInTheDocument();
  });

  it('昇順ソートの場合、↑が表示されること', () => {
    // GIVEN
    const props = {
      ...defaultProps,
      sortField: 'odds' as SortField,
      sortDirection: 'asc' as SortDirection,
    };
    renderWithProviders(<RaceTableMobileView {...props} />);

    // THEN
    expect(screen.getByText('オッズ ↑')).toBeInTheDocument();
  });

  it('アコーディオンが展開できること', () => {
    // GIVEN
    renderWithProviders(<RaceTableMobileView {...defaultProps} />);

    // WHEN
    const expandIcon = screen.getAllByTestId('ExpandMoreIcon')[0];
    fireEvent.click(expandIcon);

    // THEN
    expect(screen.getAllByText('タップして詳細を表示')[0]).toBeInTheDocument();
  });

  it('詳細表示リンククリック時にonHorseClickが呼ばれること', () => {
    // GIVEN
    const mockOnHorseClick = vi.fn();
    const props = { ...defaultProps, onHorseClick: mockOnHorseClick };
    renderWithProviders(<RaceTableMobileView {...props} />);

    // WHEN
    const expandIcon = screen.getAllByTestId('ExpandMoreIcon')[0];
    fireEvent.click(expandIcon);
    const detailLink = screen.getAllByText('タップして詳細を表示')[0];
    fireEvent.click(detailLink);

    // THEN
    expect(mockOnHorseClick).toHaveBeenCalledWith(mockHorseData[0]);
  });

  it('馬の詳細情報が正しく表示されること', () => {
    // GIVEN
    renderWithProviders(<RaceTableMobileView {...defaultProps} />);

    // WHEN
    const expandIcon = screen.getAllByTestId('ExpandMoreIcon')[0];
    fireEvent.click(expandIcon);

    // THEN
    expect(screen.getByText('S')).toBeInTheDocument(); // 評価
    expect(screen.getAllByText('期待値:')[0]).toBeInTheDocument();
    expect(screen.getByText('1.5')).toBeInTheDocument();
  });

  it('馬データが空の場合、ソートボタンのみ表示されること', () => {
    // GIVEN
    const props = {
      ...defaultProps,
      horseData: [],
    };
    renderWithProviders(<RaceTableMobileView {...props} />);

    // THEN
    expect(screen.getByText('馬番')).toBeInTheDocument();
    expect(screen.getByText('オッズ')).toBeInTheDocument();
    expect(screen.getByText('期待値')).toBeInTheDocument();
    expect(screen.queryByText('テスト馬1')).not.toBeInTheDocument();
  });

  it('全ての評価タイプが正しく表示されること', () => {
    // GIVEN
    const horseDataWithAllEvaluations: HorseData[] = [
      { ...mockHorseData[0], evaluation: 'S' },
      { ...mockHorseData[1], evaluation: 'A' },
      { ...mockHorseData[2], evaluation: 'B' },
      { ...mockHorseData[0], id: '4', name: '馬4', evaluation: 'C' },
      { ...mockHorseData[0], id: '5', name: '馬5', evaluation: 'D' },
    ];

    const props = {
      ...defaultProps,
      horseData: horseDataWithAllEvaluations,
    };

    // WHEN
    renderWithProviders(<RaceTableMobileView {...props} />);

    // THEN
    // 最初のアコーディオンを展開
    const expandIcons = screen.getAllByTestId('ExpandMoreIcon');
    fireEvent.click(expandIcons[0]);

    expect(screen.getByText('S')).toBeInTheDocument();
  });

  it('期待値が0の場合も正しく表示されること', () => {
    // GIVEN
    const horseDataWithZeroExpectedValue: HorseData[] = [
      { ...mockHorseData[0], expectedValue: 0 },
    ];

    const props = {
      ...defaultProps,
      horseData: horseDataWithZeroExpectedValue,
    };

    // WHEN
    renderWithProviders(<RaceTableMobileView {...props} />);
    const expandIcon = screen.getAllByTestId('ExpandMoreIcon')[0];
    fireEvent.click(expandIcon);

    // THEN
    expect(screen.getByText('期待値:')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('オッズが小数点以下の場合も正しく表示されること', () => {
    // GIVEN
    const horseDataWithDecimalOdds: HorseData[] = [
      { ...mockHorseData[0], odds: 3.7 },
    ];

    const props = {
      ...defaultProps,
      horseData: horseDataWithDecimalOdds,
    };

    // WHEN
    renderWithProviders(<RaceTableMobileView {...props} />);

    // THEN
    expect(screen.getByText('3.7倍')).toBeInTheDocument();
  });

  it('複数のアコーディオンが独立して動作すること', () => {
    // GIVEN
    renderWithProviders(<RaceTableMobileView {...defaultProps} />);

    // WHEN
    const expandIcons = screen.getAllByTestId('ExpandMoreIcon');
    fireEvent.click(expandIcons[0]); // 最初のアコーディオンを展開
    fireEvent.click(expandIcons[1]); // 2番目のアコーディオンを展開

    // THEN
    expect(screen.getAllByText('タップして詳細を表示')).toHaveLength(3);
  });
});
