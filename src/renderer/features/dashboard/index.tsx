import { useState } from 'react';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { SummaryCards } from './components/SummaryCards';
import { ChartCard } from './components/ChartCard';
import { SearchArea, type SearchFilters } from '@/components/ui';
import { RaceAnalysisModal } from '../raceAnalysis';

/**
 * ダッシュボードページ（単一ビュー）
 *
 * @description 上段: 3枚のカード（総回収率 / 収支 / 本日のおすすめ）、下段: 回収率推移チャート（カード右上にタブ）
 * @returns JSX.Element
 */
// 定数定義
const DEFAULT_PERIOD = 'day' as const;
const SAMPLE_DATA = {
  ROI: {
    DAY: 105,
    WEEK: 98,
    MONTH: 112,
    YEAR: 102,
  },
  PROFIT: {
    DAY: 12000,
    WEEK: -5000,
    MONTH: 30000,
    YEAR: 15000,
  },
} as const;

const Dashboard = (): JSX.Element => {
  const { t } = useTranslation(['common', 'dashboard']);
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>(
    DEFAULT_PERIOD
  );
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    date: null,
    venue: 'tokyo',
    raceNumber: 1,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dashboardSummaryData: Record<
    'day' | 'week' | 'month' | 'year',
    { roi: number; profit: number }
  > = {
    day: { roi: SAMPLE_DATA.ROI.DAY, profit: SAMPLE_DATA.PROFIT.DAY },
    week: { roi: SAMPLE_DATA.ROI.WEEK, profit: SAMPLE_DATA.PROFIT.WEEK },
    month: { roi: SAMPLE_DATA.ROI.MONTH, profit: SAMPLE_DATA.PROFIT.MONTH },
    year: { roi: SAMPLE_DATA.ROI.YEAR, profit: SAMPLE_DATA.PROFIT.YEAR },
  };

  const roiChartData: Record<
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

  const horseRecommendations: Record<
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
      { race: '東京12R', horse: 'サンプルD', bet: '複勝', odds: 1.9, ev: 1.18 },
      { race: '小倉8R', horse: 'サンプルE', bet: '単勝', odds: 6.2, ev: 1.02 },
      { race: '札幌7R', horse: 'サンプルF', bet: '複勝', odds: 2.8, ev: 1.15 },
      { race: '京都6R', horse: 'サンプルG', bet: '単勝', odds: 4.8, ev: 0.98 },
      { race: '福島5R', horse: 'サンプルH', bet: '複勝', odds: 3.1, ev: 1.08 },
    ],
    week: [
      { race: '東京11R', horse: 'サンプルD', bet: '単勝', odds: 4.2, ev: 0.95 },
      { race: '小倉12R', horse: 'サンプルE', bet: '複勝', odds: 1.8, ev: 1.1 },
      { race: '札幌10R', horse: 'サンプルF', bet: '単勝', odds: 7.2, ev: 1.02 },
      { race: '中山9R', horse: 'サンプルG', bet: '複勝', odds: 2.3, ev: 1.25 },
      { race: '中京8R', horse: 'サンプルH', bet: '単勝', odds: 5.5, ev: 0.92 },
      { race: '阪神7R', horse: 'サンプルI', bet: '複勝', odds: 1.7, ev: 1.12 },
      { race: '新潟6R', horse: 'サンプルJ', bet: '単勝', odds: 9.8, ev: 1.05 },
      { race: '京都5R', horse: 'サンプルK', bet: '複勝', odds: 2.9, ev: 1.18 },
    ],
    month: [
      { race: '京都8R', horse: 'サンプルG', bet: '単勝', odds: 5.5, ev: 1.15 },
      { race: '福島7R', horse: 'サンプルH', bet: '複勝', odds: 2.5, ev: 0.99 },
      { race: '新潟6R', horse: 'サンプルI', bet: '単勝', odds: 12.0, ev: 1.08 },
      { race: '中山5R', horse: 'サンプルJ', bet: '複勝', odds: 1.6, ev: 1.22 },
      { race: '東京4R', horse: 'サンプルK', bet: '単勝', odds: 7.8, ev: 0.94 },
      { race: '中京3R', horse: 'サンプルL', bet: '複勝', odds: 2.7, ev: 1.16 },
      { race: '小倉2R', horse: 'サンプルM', bet: '単勝', odds: 11.5, ev: 1.01 },
      { race: '札幌1R', horse: 'サンプルN', bet: '複勝', odds: 3.2, ev: 1.09 },
    ],
    year: [
      { race: '中山12R', horse: 'サンプルJ', bet: '単勝', odds: 6.0, ev: 1.2 },
      { race: '中京10R', horse: 'サンプルK', bet: '複勝', odds: 2.2, ev: 1.08 },
      { race: '東京9R', horse: 'サンプルL', bet: '単勝', odds: 9.0, ev: 0.98 },
      { race: '京都8R', horse: 'サンプルM', bet: '複勝', odds: 1.9, ev: 1.28 },
      { race: '福島7R', horse: 'サンプルN', bet: '単勝', odds: 8.5, ev: 0.96 },
      { race: '新潟6R', horse: 'サンプルO', bet: '複勝', odds: 2.4, ev: 1.14 },
      { race: '小倉5R', horse: 'サンプルP', bet: '単勝', odds: 10.2, ev: 1.03 },
      { race: '札幌4R', horse: 'サンプルQ', bet: '複勝', odds: 3.5, ev: 1.11 },
    ],
  };

  const handleSearchClick = () => {
    // TODO: 実際の検索処理を実装
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Box
        component='header'
        sx={{
          mb: 4,
        }}
      >
        <Typography
          variant='h2'
          sx={{
            fontSize: { xs: '2.5rem', md: '3.75rem' },
            fontWeight: 900,
            letterSpacing: '-0.025em',
            mb: 1,
            color: 'text.primary',
          }}
        >
          {t('common:app.title')}
        </Typography>
        <Typography
          variant='body1'
          sx={{
            color: 'text.secondary',
            fontSize: '1.125rem',
          }}
        >
          {t('common:app.subtitle')}
        </Typography>
      </Box>

      <SearchArea
        onFiltersChange={setSearchFilters}
        onSearchClick={handleSearchClick}
        initialFilters={searchFilters}
      />

      <SummaryCards
        summaryData={dashboardSummaryData[period]}
        recommendations={horseRecommendations[period]}
      />

      <ChartCard
        data={roiChartData[period]}
        period={period}
        onPeriodChange={setPeriod}
      />

      <RaceAnalysisModal open={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default Dashboard;
