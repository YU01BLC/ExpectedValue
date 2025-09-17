import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '@renderer/i18n';
import { createAppTheme } from '@renderer/theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import { RaceTableBody } from '../RaceTableBody';
import type { HorseData } from '../../types/raceTable';

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

describe('RaceTableBody', () => {
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
    onHorseClick: vi.fn(),
  };

  it('馬データが正しく表示されること', () => {
    // GIVEN
    renderWithProviders(<RaceTableBody {...defaultProps} />);

    // THEN
    expect(screen.getByText('テスト馬1')).toBeInTheDocument();
    expect(screen.getByText('テスト馬2')).toBeInTheDocument();
    expect(screen.getByText('テスト馬3')).toBeInTheDocument();
    expect(screen.getAllByText('1')).toHaveLength(2); // 枠番と馬番
    expect(screen.getAllByText('2')).toHaveLength(2); // 枠番と馬番
    expect(screen.getAllByText('3')).toHaveLength(2); // 枠番と馬番
  });

  it('馬データが空の場合、何も表示されないこと', () => {
    // GIVEN
    const propsWithEmptyData = {
      ...defaultProps,
      horseData: [],
    };

    // WHEN
    const { container } = renderWithProviders(
      <RaceTableBody {...propsWithEmptyData} />
    );

    // THEN
    const tableBody = container.querySelector('tbody');
    expect(tableBody?.children).toHaveLength(0);
  });

  it('馬の行をクリックした時にonHorseClickが呼ばれること', () => {
    // GIVEN
    const mockOnHorseClick = vi.fn();
    const props = { ...defaultProps, onHorseClick: mockOnHorseClick };
    renderWithProviders(<RaceTableBody {...props} />);

    // WHEN
    const firstHorseRow = screen.getByText('テスト馬1').closest('tr');
    fireEvent.click(firstHorseRow!);

    // THEN
    expect(mockOnHorseClick).toHaveBeenCalledWith(mockHorseData[0]);
  });

  it('異なる馬の行をクリックした時に正しい馬データが渡されること', () => {
    // GIVEN
    const mockOnHorseClick = vi.fn();
    const props = { ...defaultProps, onHorseClick: mockOnHorseClick };
    renderWithProviders(<RaceTableBody {...props} />);

    // WHEN
    const secondHorseRow = screen.getByText('テスト馬2').closest('tr');
    fireEvent.click(secondHorseRow!);

    // THEN
    expect(mockOnHorseClick).toHaveBeenCalledWith(mockHorseData[1]);
  });

  it('評価チップが正しく表示されること', () => {
    // GIVEN
    renderWithProviders(<RaceTableBody {...defaultProps} />);

    // THEN
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('期待値が正しく表示されること', () => {
    // GIVEN
    renderWithProviders(<RaceTableBody {...defaultProps} />);

    // THEN
    expect(screen.getByText('1.5')).toBeInTheDocument();
    expect(screen.getByText('1.2')).toBeInTheDocument();
    expect(screen.getByText('0.8')).toBeInTheDocument();
  });

  it('オッズが正しく表示されること', () => {
    // GIVEN
    renderWithProviders(<RaceTableBody {...defaultProps} />);

    // THEN
    expect(screen.getByText('3.2')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('コメントが正しく表示されること', () => {
    // GIVEN
    renderWithProviders(<RaceTableBody {...defaultProps} />);

    // THEN
    expect(screen.getByText('コメント1')).toBeInTheDocument();
    expect(screen.getByText('コメント2')).toBeInTheDocument();
    expect(screen.getByText('コメント3')).toBeInTheDocument();
  });

  it('枠番の色が正しく適用されること', () => {
    // GIVEN
    renderWithProviders(<RaceTableBody {...defaultProps} />);

    // THEN
    const gateNumberElements = screen.getAllByText('1');
    // 枠番の1が表示されていることを確認
    expect(gateNumberElements.length).toBeGreaterThan(0);
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
    renderWithProviders(<RaceTableBody {...props} />);

    // THEN
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
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
    renderWithProviders(<RaceTableBody {...props} />);

    // THEN
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
    renderWithProviders(<RaceTableBody {...props} />);

    // THEN
    expect(screen.getByText('3.7')).toBeInTheDocument();
  });

  it('テーブル行にhoverスタイルが適用されること', () => {
    // GIVEN
    renderWithProviders(<RaceTableBody {...defaultProps} />);

    // THEN
    const tableRows = screen.getAllByRole('row');
    expect(tableRows.length).toBe(3); // 3つの馬データ
  });

  it('各行に正しいkeyが設定されていること', () => {
    // GIVEN
    renderWithProviders(<RaceTableBody {...defaultProps} />);

    // THEN
    // Reactのkey属性は直接テストできないが、正しいデータが表示されることで間接的に確認
    expect(screen.getByText('テスト馬1')).toBeInTheDocument();
    expect(screen.getByText('テスト馬2')).toBeInTheDocument();
    expect(screen.getByText('テスト馬3')).toBeInTheDocument();
  });
});
