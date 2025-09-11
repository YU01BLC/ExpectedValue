import { useState } from 'react';
import type { JSX } from 'react';
import { SummaryCards } from './components/SummaryCards';
import { ChartCard } from './components/ChartCard';

/**
 * ダッシュボードページ（単一ビュー）。
 * - 上段: 3枚のカード（総回収率 / 収支 / 本日のおすすめ）
 * - 下段: 回収率推移チャート（カード右上にタブ）
 */
const Dashboard = (): JSX.Element => {
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>(
    'day'
  );

  const summaryByPeriod: Record<
    'day' | 'week' | 'month' | 'year',
    { roi: number; profit: number }
  > = {
    day: { roi: 105, profit: 12000 },
    week: { roi: 98, profit: -5000 },
    month: { roi: 112, profit: 30000 },
    year: { roi: 102, profit: 15000 },
  };

  const seriesByPeriod: Record<
    'day' | 'week' | 'month' | 'year',
    Array<{ t: string; rate: number }>
  > = {
    day: [
      { t: '09/01', rate: 95 },
      { t: '09/02', rate: 102 },
      { t: '09/03', rate: 110 },
      { t: '09/04', rate: 105 },
    ],
    week: [
      { t: 'W1', rate: 100 },
      { t: 'W2', rate: 95 },
      { t: 'W3', rate: 98 },
      { t: 'W4', rate: 98 },
    ],
    month: [
      { t: 'Aug1', rate: 90 },
      { t: 'Aug8', rate: 105 },
      { t: 'Aug15', rate: 115 },
      { t: 'Aug22', rate: 112 },
    ],
    year: [
      { t: '2024-01', rate: 95 },
      { t: '2024-04', rate: 100 },
      { t: '2024-07', rate: 110 },
      { t: '2024-10', rate: 102 },
    ],
  };

  const recommendations: Record<
    'day' | 'week' | 'month' | 'year',
    Array<{
      race: string;
      horse: string;
      bet: string;
      odds: number;
      ev: number;
    }>
  > = {
    day: [
      { race: '中山11R', horse: 'サンプルA', bet: '単勝', odds: 3.6, ev: 1.12 },
      { race: '阪神10R', horse: 'サンプルB', bet: '複勝', odds: 2.1, ev: 1.3 },
      { race: '中京9R', horse: 'サンプルC', bet: '単勝', odds: 8.4, ev: 1.05 },
    ],
    week: [
      { race: '東京11R', horse: 'サンプルD', bet: '単勝', odds: 4.2, ev: 0.95 },
      { race: '小倉12R', horse: 'サンプルE', bet: '複勝', odds: 1.8, ev: 1.1 },
      { race: '札幌10R', horse: 'サンプルF', bet: '単勝', odds: 7.2, ev: 1.02 },
    ],
    month: [
      { race: '京都8R', horse: 'サンプルG', bet: '単勝', odds: 5.5, ev: 1.15 },
      { race: '福島7R', horse: 'サンプルH', bet: '複勝', odds: 2.5, ev: 0.99 },
      { race: '新潟6R', horse: 'サンプルI', bet: '単勝', odds: 12.0, ev: 1.08 },
    ],
    year: [
      { race: '中山12R', horse: 'サンプルJ', bet: '単勝', odds: 6.0, ev: 1.2 },
      { race: '中京10R', horse: 'サンプルK', bet: '複勝', odds: 2.2, ev: 1.08 },
      { race: '東京9R', horse: 'サンプルL', bet: '単勝', odds: 9.0, ev: 0.98 },
    ],
  };

  return (
    <div>
      <header className='mb-8'>
        <h1 className='text-6xl font-black tracking-tight mb-2'>
          Expected Value Tracker
        </h1>
        <p className='text-slate-300'>回収率を最大化するためのダッシュボード</p>
      </header>

      <SummaryCards
        summaryData={summaryByPeriod[period]}
        recommendations={recommendations[period]}
        period={period}
      />

      <ChartCard
        data={seriesByPeriod[period]}
        period={period}
        onPeriodChange={setPeriod}
      />
    </div>
  );
};

export default Dashboard;
