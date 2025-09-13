import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '@renderer/theme/theme';
import { RichStatCard } from '../RichStatCard';
import { describe, it, expect } from 'vitest';

const theme = createAppTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('RichStatCard', () => {
  it('基本的な統計カードが表示されること', () => {
    // GIVEN
    const title = '総利益';
    const icon = <span data-testid='stat-icon'>💰</span>;
    const value = '105%';
    const caption = '前月比 +5%';

    // WHEN
    renderWithTheme(
      <RichStatCard title={title} icon={icon} value={value} caption={caption} />
    );

    // THEN
    expect(screen.getByText('総利益')).toBeInTheDocument();
    expect(screen.getAllByTestId('stat-icon')).toHaveLength(2); // ヘッダーとメイン値で2つ
    expect(screen.getByText('105%')).toBeInTheDocument();
    expect(screen.getByText('前月比 +5%')).toBeInTheDocument();
  });

  it('カスタムカラーが適用されること', () => {
    // GIVEN
    const title = '勝率';
    const icon = <span>📈</span>;
    const value = '85%';
    const valueColor = 'success.main';

    // WHEN
    renderWithTheme(
      <RichStatCard
        title={title}
        icon={icon}
        value={value}
        valueColor={valueColor}
      />
    );

    // THEN
    expect(screen.getByText('勝率')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
  });

  it('キャプションなしでも表示されること', () => {
    // GIVEN
    const title = '回収率';
    const icon = <span>💎</span>;
    const value = '120%';

    // WHEN
    renderWithTheme(<RichStatCard title={title} icon={icon} value={value} />);

    // THEN
    expect(screen.getByText('回収率')).toBeInTheDocument();
    expect(screen.getByText('120%')).toBeInTheDocument();
  });

  it('デフォルトカラーが適用されること', () => {
    // GIVEN
    const title = '期待値';
    const icon = <span>🎯</span>;
    const value = '1.15';

    // WHEN
    renderWithTheme(<RichStatCard title={title} icon={icon} value={value} />);

    // THEN
    expect(screen.getByText('期待値')).toBeInTheDocument();
    expect(screen.getByText('1.15')).toBeInTheDocument();
  });
});
