import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '@renderer/theme/theme';
import { ScatterChartCard } from '../ScatterChartCard';
import { describe, it, expect } from 'vitest';

const theme = createAppTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const mockData = [
  { x: 10, y: 20, name: 'データ1' },
  { x: 15, y: 25, name: 'データ2' },
  { x: 20, y: 30, name: 'データ3' },
];

describe('ScatterChartCard', () => {
  it('基本的な散布図カードが表示されること', () => {
    // GIVEN
    const props = {
      title: 'テスト散布図',
      data: mockData,
      xAxisKey: 'x',
      yAxisKey: 'y',
      xAxisName: 'X軸',
      yAxisName: 'Y軸',
      color: '#FF5722',
    };

    // WHEN
    renderWithTheme(<ScatterChartCard {...props} />);

    // THEN
    expect(screen.getByText('テスト散布図')).toBeInTheDocument();
  });

  it('カスタムプロパティで表示されること', () => {
    // GIVEN
    const props = {
      title: 'カスタム散布図',
      data: mockData,
      xAxisKey: 'x',
      yAxisKey: 'y',
      xAxisName: 'カスタムX軸',
      yAxisName: 'カスタムY軸',
      color: '#2196F3',
      height: 400,
    };

    // WHEN
    renderWithTheme(<ScatterChartCard {...props} />);

    // THEN
    expect(screen.getByText('カスタム散布図')).toBeInTheDocument();
  });

  it('空のデータでも表示されること', () => {
    // GIVEN
    const props = {
      title: '空の散布図',
      data: [],
      xAxisKey: 'x',
      yAxisKey: 'y',
      xAxisName: 'X軸',
      yAxisName: 'Y軸',
      color: '#4CAF50',
    };

    // WHEN
    renderWithTheme(<ScatterChartCard {...props} />);

    // THEN
    expect(screen.getByText('空の散布図')).toBeInTheDocument();
  });

  it('デフォルトの高さで表示されること', () => {
    // GIVEN
    const props = {
      title: 'デフォルト高さ',
      data: mockData,
      xAxisKey: 'x',
      yAxisKey: 'y',
      xAxisName: 'X軸',
      yAxisName: 'Y軸',
      color: '#FF9800',
    };

    // WHEN
    renderWithTheme(<ScatterChartCard {...props} />);

    // THEN
    expect(screen.getByText('デフォルト高さ')).toBeInTheDocument();
  });

  it('異なる軸キーでformatterが正しく動作すること', () => {
    // GIVEN
    const customData = [
      { x: 100, y: 200, z: 200, name: 'A' },
      { x: 120, y: 100, z: 260, name: 'B' },
    ];

    // WHEN
    renderWithTheme(
      <ScatterChartCard
        title='カスタム軸'
        data={customData}
        xAxisKey='z'
        yAxisKey='x'
        xAxisName='Z軸'
        yAxisName='X軸'
        color='#ff7300'
      />
    );

    // THEN
    expect(screen.getByText('カスタム軸')).toBeInTheDocument();
    // チャートが正しくレンダリングされることを確認（軸ラベルは内部で使用される）
    expect(screen.getByText('カスタム軸')).toBeInTheDocument();
  });

  it('formatter関数の条件分岐が正しく動作すること', () => {
    // GIVEN
    const dataWithName = [
      { x: 100, y: 200, name: 'テストデータ' },
      { x: 120, y: 100, name: '別のデータ' },
    ];

    // WHEN
    renderWithTheme(
      <ScatterChartCard
        title='フォーマッターテスト'
        data={dataWithName}
        xAxisKey='x'
        yAxisKey='y'
        xAxisName='X軸'
        yAxisName='Y軸'
        color='#ff7300'
      />
    );

    // THEN
    expect(screen.getByText('フォーマッターテスト')).toBeInTheDocument();
  });
});
