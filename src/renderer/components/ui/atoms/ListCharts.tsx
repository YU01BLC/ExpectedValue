import { type JSX, useMemo } from 'react';
import { Box, Typography, useTheme, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PieChartCard, RadarChartCard, ScatterChartCard } from '../charts';
import { getChartColors, getGradientColors } from '../utils/themeColors';
import { createChartData } from '../utils/chartData';

interface ListChartsProps {
  winRateOddsData: Array<{
    winRate: number;
    odds: number;
    name: string;
  }>;
}

export const ListCharts = ({
  winRateOddsData,
}: ListChartsProps): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslation('common');
  const colors = getChartColors(theme);
  const gradients = getGradientColors(theme);

  // チャートデータの生成（メモ化）
  const chartData = useMemo(() => createChartData(theme), [theme]);

  // 勝率×オッズデータの変換（メモ化）
  const scatterData = useMemo(() => {
    return winRateOddsData.map((horse) => ({
      x: horse.winRate,
      y: horse.odds,
      name: horse.name,
    }));
  }, [winRateOddsData]);

  // エラーハンドリング: データが空の場合は早期リターン
  if (!winRateOddsData || winRateOddsData.length === 0) {
    return (
      <Box sx={{ mb: 4, textAlign: 'center', py: 4 }}>
        <Typography variant='h6' color='text.secondary'>
          勝率・オッズデータがありません
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant='h5'
        sx={{
          mb: 3,
          color: 'text.primary',
          textAlign: 'center',
          background: gradients.primary,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {t('chart.title')}
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {/* コース傾向 */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <PieChartCard
            title={t('chart.courseTendency')}
            data={chartData.courseTendency}
            color={colors.success}
            height={500}
          />
        </Grid>

        {/* 脚質分布 */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <PieChartCard
            title={t('chart.legQualityDistribution')}
            data={chartData.legQuality}
            color={colors.warning}
            height={500}
          />
        </Grid>

        {/* 血統適性 */}
        <Grid size={{ xs: 12, sm: 12, md: 4 }}>
          <RadarChartCard
            title={t('chart.pedigreeAptitude')}
            data={chartData.pedigreeAptitude}
            color={colors.info}
            height={500}
          />
        </Grid>

        {/* 勝率 × オッズ */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ScatterChartCard
            title={t('chart.winRateOdds')}
            data={scatterData}
            xAxisKey='x'
            yAxisKey='y'
            xAxisName={t('chart.winRate')}
            yAxisName={t('chart.odds')}
            color={colors.primary}
            height={350}
          />
        </Grid>

        {/* 期待値 × オッズ */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ScatterChartCard
            title={t('chart.expectedValueOdds')}
            data={scatterData}
            xAxisKey='x'
            yAxisKey='y'
            xAxisName={t('chart.expectedValue')}
            yAxisName={t('chart.odds')}
            color={colors.secondary}
            height={350}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
