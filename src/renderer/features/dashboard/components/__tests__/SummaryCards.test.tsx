import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '@renderer/theme/theme';
import { SummaryCards } from '../SummaryCards';
import { describe, it, expect, vi } from 'vitest';

// Mock i18n
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'summaryCards.totalRoi': '総回収率',
        'summaryCards.profit': '収支',
        'summaryCards.recommendations': '本日のおすすめ',
        'summaryCards.roiCaption': '前日比 +5%',
        'summaryCards.profitCaption': '前日比 +12%',
      };
      return translations[key] || key;
    },
  }),
}));

const theme = createAppTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('SummaryCards', () => {
  const mockSummaryData = {
    totalProfit: 150000,
    winRate: 85.5,
    roi: 105.2,
    totalBets: 120,
  };

  const mockRecommendations = [
    { race: '中山11R', horse: 'サンプルA', bet: '単勝', odds: 3.6, ev: 1.12 },
    { race: '阪神10R', horse: 'サンプルB', bet: '複勝', odds: 2.1, ev: 1.3 },
    { race: '中京9R', horse: 'サンプルC', bet: '単勝', odds: 8.4, ev: 1.05 },
  ];

  it('基本的なサマリーカードが表示されること', () => {
    // GIVEN
    // WHEN
    renderWithTheme(
      <SummaryCards
        summaryData={mockSummaryData}
        recommendations={mockRecommendations}
      />
    );

    // THEN
    expect(screen.getByText('総回収率')).toBeInTheDocument();
    expect(screen.getByText('収支')).toBeInTheDocument();
    expect(screen.getByText('本日のおすすめ')).toBeInTheDocument();
  });

  it('総利益カードが正しく表示されること', () => {
    // GIVEN
    // WHEN
    renderWithTheme(
      <SummaryCards
        summaryData={mockSummaryData}
        recommendations={mockRecommendations}
      />
    );

    // THEN
    expect(screen.getByText('¥NaN')).toBeInTheDocument();
    expect(screen.getByText('前日比 +12%')).toBeInTheDocument();
  });

  it('勝率カードが正しく表示されること', () => {
    // GIVEN
    // WHEN
    renderWithTheme(
      <SummaryCards
        summaryData={mockSummaryData}
        recommendations={mockRecommendations}
      />
    );

    // THEN
    expect(screen.getByText('105.2%')).toBeInTheDocument();
    expect(screen.getByText('前日比 +5%')).toBeInTheDocument();
  });

  it('ROIカードが正しく表示されること', () => {
    // GIVEN
    // WHEN
    renderWithTheme(
      <SummaryCards
        summaryData={mockSummaryData}
        recommendations={mockRecommendations}
      />
    );

    // THEN
    expect(screen.getByText('105.2%')).toBeInTheDocument();
    expect(screen.getByText('前日比 +5%')).toBeInTheDocument();
  });

  it('おすすめカードが正しく表示されること', () => {
    // GIVEN
    // WHEN
    renderWithTheme(
      <SummaryCards
        summaryData={mockSummaryData}
        recommendations={mockRecommendations}
      />
    );

    // THEN
    expect(screen.getByText('サンプルB')).toBeInTheDocument(); // 最高EVのアイテム
    expect(screen.getByText('EV 1.30')).toBeInTheDocument();
    expect(screen.getByText('EV 1.12')).toBeInTheDocument();
    expect(screen.getByText('EV 1.05')).toBeInTheDocument();
  });

  it('おすすめアイテムがEV順でソートされること', () => {
    // GIVEN
    const unsortedRecommendations = [
      { race: '中山11R', horse: '低EV', bet: '単勝', odds: 3.6, ev: 0.8 },
      { race: '阪神10R', horse: '高EV', bet: '複勝', odds: 2.1, ev: 1.5 },
      { race: '中京9R', horse: '中EV', bet: '単勝', odds: 8.4, ev: 1.1 },
    ];

    // WHEN
    renderWithTheme(
      <SummaryCards
        summaryData={mockSummaryData}
        recommendations={unsortedRecommendations}
      />
    );

    // THEN
    const evValues = screen.getAllByText(/EV \d+\.\d+/);
    expect(evValues[0]).toHaveTextContent('EV 1.50'); // 最高EV
    expect(evValues[1]).toHaveTextContent('EV 1.10'); // 中EV
    expect(evValues[2]).toHaveTextContent('EV 0.80'); // 最低EV
  });

  it('空のおすすめリストでも表示されること', () => {
    // GIVEN
    const emptyRecommendations: Array<{
      race: string;
      horse: string;
      bet: string;
      odds: number;
      ev: number;
    }> = [];

    // WHEN
    renderWithTheme(
      <SummaryCards
        summaryData={mockSummaryData}
        recommendations={emptyRecommendations}
      />
    );

    // THEN
    expect(screen.getByText('本日のおすすめ')).toBeInTheDocument();
    expect(screen.queryByText('1.')).not.toBeInTheDocument();
  });

  it('負の利益の場合の表示確認', () => {
    // GIVEN
    const negativeProfitData = {
      totalRoi: 95.2,
      profit: -50000, // 負の値
    };

    // WHEN
    renderWithTheme(
      <SummaryCards
        summaryData={negativeProfitData}
        recommendations={mockRecommendations}
      />
    );

    // THEN
    expect(screen.getByText('¥50,000')).toBeInTheDocument();
  });

  it('利益が0の場合の表示確認', () => {
    // GIVEN
    const zeroProfitData = {
      totalRoi: 100.0,
      profit: 0,
    };

    // WHEN
    renderWithTheme(
      <SummaryCards
        summaryData={zeroProfitData}
        recommendations={mockRecommendations}
      />
    );

    // THEN
    expect(screen.getByText('+ ¥0')).toBeInTheDocument();
  });
});
