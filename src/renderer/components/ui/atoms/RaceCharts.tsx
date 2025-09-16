import { type JSX } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PieChartCard, RadarChartCard, ScatterChartCard } from '../charts';
import { getChartColors, getGradientColors } from '../utils/themeColors';
import { createChartData } from '../utils/chartData';
import type { HorseData } from './RaceTable';

interface RaceChartsProps {
  horseData: HorseData[];
}

export const RaceCharts = ({ horseData }: RaceChartsProps): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslation('common');
  const colors = getChartColors(theme);
  const gradients = getGradientColors(theme);
  const chartData = createChartData(theme);

  // 勝率×オッズデータの変換
  const scatterData = horseData.map((horse) => ({
    x: horse.expectedValue,
    y: horse.odds,
    name: horse.name,
  }));

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant='h5'
        sx={{
          mb: 3,
          color: 'text.primary',
          fontSize: '1.5rem',
          fontWeight: 700,
          textAlign: 'center',
          background: gradients.primary,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {t('chart.title')}
      </Typography>

      <Grid container spacing={3}>
        {/* コース傾向 */}
        <Grid item xs={12} md={4}>
          <PieChartCard
            title={t('chart.courseTendency')}
            data={chartData.courseTendency}
            color={colors.success}
          />
        </Grid>

        {/* 脚質分布 */}
        <Grid item xs={12} md={4}>
          <PieChartCard
            title={t('chart.legQualityDistribution')}
            data={chartData.legQuality}
            color={colors.warning}
          />
        </Grid>

        {/* 血統適性 */}
        <Grid item xs={12} md={4}>
          <RadarChartCard
            title={t('chart.pedigreeAptitude')}
            data={chartData.pedigreeAptitude}
            color={colors.info}
          />
        </Grid>

        {/* 期待値 × オッズ */}
        <Grid item xs={12} md={6}>
          <ScatterChartCard
            title={t('chart.expectedValueOdds')}
            data={scatterData}
            xAxisKey='x'
            yAxisKey='y'
            xAxisName={t('chart.expectedValue')}
            yAxisName={t('chart.odds')}
            color={colors.primary}
          />
        </Grid>

        {/* 勝率 × オッズ */}
        <Grid item xs={12} md={6}>
          <ScatterChartCard
            title={t('chart.winRateOdds')}
            data={scatterData}
            xAxisKey='x'
            yAxisKey='y'
            xAxisName={t('chart.winRate')}
            yAxisName={t('chart.odds')}
            color={colors.secondary}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
