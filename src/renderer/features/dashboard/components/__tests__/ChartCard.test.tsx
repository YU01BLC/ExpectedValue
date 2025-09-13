import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '@renderer/theme/theme';
import { ChartCard } from '../ChartCard';
import { describe, it, expect, vi } from 'vitest';

// Mock i18n
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'chart.title': '回収率推移',
        'chart.periods.day': '日',
        'chart.periods.week': '週',
        'chart.periods.month': '月',
        'chart.periods.year': '年',
      };
      return translations[key] || key;
    },
  }),
}));

const theme = createAppTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

// Rechartsのモック
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='responsive-container'>{children}</div>
  ),
  LineChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='line-chart'>{children}</div>
  ),
  Line: () => <div data-testid='line' />,
  XAxis: () => <div data-testid='x-axis' />,
  YAxis: () => <div data-testid='y-axis' />,
  CartesianGrid: () => <div data-testid='cartesian-grid' />,
  Tooltip: () => <div data-testid='tooltip' />,
}));

describe('ChartCard', () => {
  const mockData = [
    { t: '2024-01-01', rate: 100 },
    { t: '2024-01-02', rate: 105 },
    { t: '2024-01-03', rate: 110 },
  ];

  it('基本的なチャートカードが表示されること', () => {
    // GIVEN
    const period = 'day' as const;
    const onPeriodChange = vi.fn();

    // WHEN
    renderWithTheme(
      <ChartCard
        data={mockData}
        period={period}
        onPeriodChange={onPeriodChange}
      />
    );

    // THEN
    expect(screen.getByText('回収率推移')).toBeInTheDocument();
    expect(screen.getByText('日')).toBeInTheDocument();
    expect(screen.getByText('週')).toBeInTheDocument();
    expect(screen.getByText('月')).toBeInTheDocument();
    expect(screen.getByText('年')).toBeInTheDocument();
  });

  it('期間切り替えボタンが動作すること', async () => {
    // GIVEN
    const period = 'day' as const;
    const onPeriodChange = vi.fn();

    // WHEN
    renderWithTheme(
      <ChartCard
        data={mockData}
        period={period}
        onPeriodChange={onPeriodChange}
      />
    );

    // THEN
    const weekButton = screen.getByText('週');
    expect(weekButton).toBeInTheDocument();

    // 週ボタンをクリック
    weekButton.click();
    expect(onPeriodChange).toHaveBeenCalledWith('week');
  });

  it('現在の期間がハイライトされること', () => {
    // GIVEN
    const period = 'month' as const;
    const onPeriodChange = vi.fn();

    // WHEN
    renderWithTheme(
      <ChartCard
        data={mockData}
        period={period}
        onPeriodChange={onPeriodChange}
      />
    );

    // THEN
    const monthButton = screen.getByText('月');
    expect(monthButton).toBeInTheDocument();
    // アクティブなボタンのスタイルが適用されていることを確認
    expect(monthButton.closest('div')).toHaveStyle({
      color: '#000000',
      backgroundColor: 'rgba(255,255,255,0.9)',
    });
  });

  it('チャートコンポーネントが表示されること', () => {
    // GIVEN
    const period = 'day' as const;
    const onPeriodChange = vi.fn();

    // WHEN
    renderWithTheme(
      <ChartCard
        data={mockData}
        period={period}
        onPeriodChange={onPeriodChange}
      />
    );

    // THEN
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    expect(screen.getByTestId('line')).toBeInTheDocument();
    expect(screen.getByTestId('x-axis')).toBeInTheDocument();
    expect(screen.getByTestId('y-axis')).toBeInTheDocument();
    expect(screen.getByTestId('cartesian-grid')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
  });

  it('空のデータでも表示されること', () => {
    // GIVEN
    const period = 'day' as const;
    const onPeriodChange = vi.fn();
    const emptyData: Array<{ t: string; rate: number }> = [];

    // WHEN
    renderWithTheme(
      <ChartCard
        data={emptyData}
        period={period}
        onPeriodChange={onPeriodChange}
      />
    );

    // THEN
    expect(screen.getByText('回収率推移')).toBeInTheDocument();
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });
});
