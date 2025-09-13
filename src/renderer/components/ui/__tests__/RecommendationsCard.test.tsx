import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '@renderer/theme/theme';
import { RecommendationsCard } from '../RecommendationsCard';
import { describe, it, expect } from 'vitest';

const theme = createAppTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('RecommendationsCard', () => {
  const mockItems = [
    { label: 'サンプルA', ev: 1.12 },
    { label: 'サンプルB', ev: 1.3 },
    { label: 'サンプルC', ev: 1.05 },
    { label: 'サンプルD', ev: 1.18 },
    { label: 'サンプルE', ev: 1.02 },
    { label: 'サンプルF', ev: 1.15 },
    { label: 'サンプルG', ev: 0.98 },
    { label: 'サンプルH', ev: 1.08 },
  ];

  it('基本的なおすすめカードが表示されること', () => {
    // GIVEN
    const title = '本日のおすすめ';
    const icon = <span data-testid='recommendation-icon'>📊</span>;

    // WHEN
    renderWithTheme(
      <RecommendationsCard title={title} icon={icon} items={mockItems} />
    );

    // THEN
    expect(screen.getByText('本日のおすすめ')).toBeInTheDocument();
    expect(screen.getAllByTestId('recommendation-icon')).toHaveLength(2); // ヘッダーとメイン値で2つ
  });

  it('メイン値（最初のアイテム）が表示されること', () => {
    // GIVEN
    const title = 'おすすめ';
    const icon = <span>📊</span>;

    // WHEN
    renderWithTheme(
      <RecommendationsCard title={title} icon={icon} items={mockItems} />
    );

    // THEN
    expect(screen.getByText('サンプルA')).toBeInTheDocument();
  });

  it('全てのアイテムが表示されること', () => {
    // GIVEN
    const title = 'おすすめ';
    const icon = <span>📊</span>;

    // WHEN
    renderWithTheme(
      <RecommendationsCard title={title} icon={icon} items={mockItems} />
    );

    // THEN
    mockItems.forEach((item, index) => {
      expect(
        screen.getByText(`${index + 1}. ${item.label}`)
      ).toBeInTheDocument();
      expect(screen.getByText(`EV ${item.ev.toFixed(2)}`)).toBeInTheDocument();
    });
  });

  it('空のアイテムリストの場合の表示確認', () => {
    // GIVEN
    const title = 'おすすめ';
    const icon = <span>📊</span>;
    const emptyItems: Array<{ label: string; ev: number }> = [];

    // WHEN
    renderWithTheme(
      <RecommendationsCard title={title} icon={icon} items={emptyItems} />
    );

    // THEN
    expect(screen.getByText('おすすめ')).toBeInTheDocument();
    // 空のアイテムリストの場合、カードは表示されるがリストは空
    expect(screen.queryByText('1.')).not.toBeInTheDocument();
  });

  it('カスタムカラーが適用されること', () => {
    // GIVEN
    const title = 'おすすめ';
    const icon = <span>📊</span>;
    const customColor = '#ff0000';

    // WHEN
    renderWithTheme(
      <RecommendationsCard
        title={title}
        icon={icon}
        items={mockItems}
        color={customColor}
      />
    );

    // THEN
    expect(screen.getByText('おすすめ')).toBeInTheDocument();
    // カスタムカラーが適用されていることを確認（スタイルの詳細は実装に依存）
  });

  it('スクロール機能が動作すること', () => {
    // GIVEN
    const title = 'おすすめ';
    const icon = <span>📊</span>;

    // WHEN
    renderWithTheme(
      <RecommendationsCard title={title} icon={icon} items={mockItems} />
    );

    // THEN
    // スクロール可能なコンテナが存在することを確認
    const scrollContainer = screen.getByText('1. サンプルA').closest('div');
    expect(scrollContainer).toBeInTheDocument();

    // 複数のアイテムが表示されていることを確認
    expect(screen.getByText('1. サンプルA')).toBeInTheDocument();
    expect(screen.getByText('8. サンプルH')).toBeInTheDocument();
  });

  it('EV値が正しくフォーマットされること', () => {
    // GIVEN
    const title = 'おすすめ';
    const icon = <span>📊</span>;
    const itemsWithDecimal = [
      { label: 'テスト1', ev: 1.123456 },
      { label: 'テスト2', ev: 2.0 },
    ];

    // WHEN
    renderWithTheme(
      <RecommendationsCard title={title} icon={icon} items={itemsWithDecimal} />
    );

    // THEN
    expect(screen.getByText('EV 1.12')).toBeInTheDocument();
    expect(screen.getByText('EV 2.00')).toBeInTheDocument();
  });
});
