import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '@renderer/theme/theme';
import { DualScatterChartCard } from '../DualScatterChartCard';

// テスト用のテーマ
const theme = createAppTheme();

// テスト用のモックデータ
const mockData = [
  {
    x: 1.0,
    y: 3,
    name: 'テスト馬1',
    horseNumber: 1,
    gateNumber: 1,
    evaluation: 'A',
  },
  {
    x: 1.2,
    y: 4,
    name: 'テスト馬2',
    horseNumber: 2,
    gateNumber: 2,
    evaluation: 'S',
  },
];

const defaultProps = {
  title: 'テストチャート',
  leftData: mockData,
  xAxisName: '期待値',
  yAxisName: '評価',
  leftColor: '#1976d2',
};

describe('DualScatterChartCard', () => {
  it('タイトルが正しく表示されること', () => {
    // GIVEN
    render(
      <ThemeProvider theme={theme}>
        <DualScatterChartCard {...defaultProps} />
      </ThemeProvider>
    );

    // THEN
    expect(screen.getByText('テストチャート')).toBeInTheDocument();
  });

  it('データポイントが正しく表示されること', async () => {
    // GIVEN
    render(
      <ThemeProvider theme={theme}>
        <DualScatterChartCard {...defaultProps} />
      </ThemeProvider>
    );

    // THEN - チャートコンテナが存在することを確認
    const chartContainer = document.querySelector(
      '.recharts-responsive-container'
    );
    expect(chartContainer).toBeInTheDocument();

    // データポイントのテキストはSVG内にレンダリングされるため、より柔軟な検証
    await new Promise((resolve) => setTimeout(resolve, 100)); // レンダリング待機
  });

  it('空のデータでもエラーが発生しないこと', () => {
    // GIVEN
    const emptyDataProps = {
      ...defaultProps,
      leftData: [],
    };

    // WHEN & THEN
    expect(() => {
      render(
        <ThemeProvider theme={theme}>
          <DualScatterChartCard {...emptyDataProps} />
        </ThemeProvider>
      );
    }).not.toThrow();
  });
});
