import { type JSX } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PieChartCard, RadarChartCard, DualScatterChartCard } from '../charts';
import { getChartColors, getGradientColors } from '../utils/themeColors';
import type { HorseData } from './types/raceTable';

interface RaceChartsProps {
  horseData: HorseData[];
}

export const RaceCharts = ({ horseData }: RaceChartsProps): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslation('common');
  const colors = getChartColors(theme);
  const gradients = getGradientColors(theme);

  // 実際の馬データに基づくチャートデータ生成
  const generateChartData = () => {
    // コース傾向データ（馬の評価に基づく）
    const courseTendency = [
      {
        name: '先行有利',
        value: Math.round(
          (horseData.filter((h) => h.evaluation === 'S' || h.evaluation === 'A')
            .length /
            horseData.length) *
            100
        ),
        color: colors.success,
        horses: horseData
          .filter((h) => h.evaluation === 'S' || h.evaluation === 'A')
          .map((h) => ({ number: h.horseNumber, name: h.name })),
      },
      {
        name: '差し有利',
        value: Math.round(
          (horseData.filter((h) => h.evaluation === 'B').length /
            horseData.length) *
            100
        ),
        color: colors.info,
        horses: horseData
          .filter((h) => h.evaluation === 'B')
          .map((h) => ({ number: h.horseNumber, name: h.name })),
      },
      {
        name: '逃げ有利',
        value: Math.round(
          (horseData.filter((h) => h.evaluation === 'C').length /
            horseData.length) *
            100
        ),
        color: colors.warning,
        horses: horseData
          .filter((h) => h.evaluation === 'C')
          .map((h) => ({ number: h.horseNumber, name: h.name })),
      },
      {
        name: 'その他',
        value: Math.round(
          (horseData.filter((h) => h.evaluation === 'D').length /
            horseData.length) *
            100
        ),
        color: colors.grey,
        horses: horseData
          .filter((h) => h.evaluation === 'D')
          .map((h) => ({ number: h.horseNumber, name: h.name })),
      },
    ];

    // 脚質分布データ（期待値に基づく）
    const legQuality = [
      {
        name: '逃げ',
        value: Math.round(
          (horseData.filter((h) => h.expectedValue >= 1.5).length /
            horseData.length) *
            100
        ),
        color: colors.error,
        horses: horseData
          .filter((h) => h.expectedValue >= 1.5)
          .map((h) => ({ number: h.horseNumber, name: h.name })),
      },
      {
        name: '先行',
        value: Math.round(
          (horseData.filter(
            (h) => h.expectedValue >= 1.2 && h.expectedValue < 1.5
          ).length /
            horseData.length) *
            100
        ),
        color: colors.warning,
        horses: horseData
          .filter((h) => h.expectedValue >= 1.2 && h.expectedValue < 1.5)
          .map((h) => ({ number: h.horseNumber, name: h.name })),
      },
      {
        name: '差し',
        value: Math.round(
          (horseData.filter(
            (h) => h.expectedValue >= 1.0 && h.expectedValue < 1.2
          ).length /
            horseData.length) *
            100
        ),
        color: colors.info,
        horses: horseData
          .filter((h) => h.expectedValue >= 1.0 && h.expectedValue < 1.2)
          .map((h) => ({ number: h.horseNumber, name: h.name })),
      },
      {
        name: '追込',
        value: Math.round(
          (horseData.filter((h) => h.expectedValue < 1.0).length /
            horseData.length) *
            100
        ),
        color: colors.purple,
        horses: horseData
          .filter((h) => h.expectedValue < 1.0)
          .map((h) => ({ number: h.horseNumber, name: h.name })),
      },
    ];

    // 血統適性データ（オッズに基づく）
    const pedigreeAptitude = [
      {
        subject: 'スピード',
        A: Math.round(
          horseData.reduce((sum, h) => sum + h.odds, 0) / horseData.length
        ),
        B: Math.round(
          horseData.reduce((sum, h) => sum + h.expectedValue, 0) /
            horseData.length
        ),
        fullMark: 100,
      },
      {
        subject: 'スタミナ',
        A: Math.round(
          (horseData.filter((h) => h.odds >= 3).length / horseData.length) * 100
        ),
        B: Math.round(
          (horseData.filter((h) => h.expectedValue >= 1.2).length /
            horseData.length) *
            100
        ),
        fullMark: 100,
      },
      {
        subject: '瞬発力',
        A: Math.round(
          (horseData.filter((h) => h.odds >= 5).length / horseData.length) * 100
        ),
        B: Math.round(
          (horseData.filter((h) => h.expectedValue >= 1.5).length /
            horseData.length) *
            100
        ),
        fullMark: 100,
      },
      {
        subject: '持久力',
        A: Math.round(
          (horseData.filter((h) => h.odds >= 2).length / horseData.length) * 100
        ),
        B: Math.round(
          (horseData.filter((h) => h.expectedValue >= 1.0).length /
            horseData.length) *
            100
        ),
        fullMark: 100,
      },
      {
        subject: '柔軟性',
        A: Math.round(
          (horseData.filter((h) => h.odds >= 4).length / horseData.length) * 100
        ),
        B: Math.round(
          (horseData.filter((h) => h.expectedValue >= 1.3).length /
            horseData.length) *
            100
        ),
        fullMark: 100,
      },
      {
        subject: 'バランス',
        A: Math.round(
          (horseData.filter((h) => h.odds >= 2.5).length / horseData.length) *
            100
        ),
        B: Math.round(
          (horseData.filter((h) => h.expectedValue >= 1.1).length /
            horseData.length) *
            100
        ),
        fullMark: 100,
      },
    ];

    return { courseTendency, legQuality, pedigreeAptitude };
  };

  const chartData = generateChartData();

  // 期待値×評価データの変換
  const evaluationToNumber = (evaluation: string) => {
    const map: Record<string, number> = { S: 5, A: 4, B: 3, C: 2, D: 1 };
    return map[evaluation] || 1;
  };

  const scatterData = horseData.map((horse) => ({
    x: horse.expectedValue,
    y: evaluationToNumber(horse.evaluation),
    name: horse.name,
    horseNumber: horse.horseNumber,
    gateNumber: horse.gateNumber,
    evaluation: horse.evaluation,
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

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* コース傾向 */}
        <Grid item xs={12} sm={6} lg={4}>
          <PieChartCard
            title={t('chart.courseTendency')}
            data={chartData.courseTendency}
            color={colors.success}
            height={580}
          />
        </Grid>

        {/* 脚質分布 */}
        <Grid item xs={12} sm={6} lg={4}>
          <PieChartCard
            title={t('chart.legQualityDistribution')}
            data={chartData.legQuality}
            color={colors.warning}
            height={580}
          />
        </Grid>

        {/* 血統適性 */}
        <Grid item xs={12} sm={12} lg={4}>
          <RadarChartCard
            title={t('chart.pedigreeAptitude')}
            data={chartData.pedigreeAptitude}
            color={colors.info}
            height={580}
          />
        </Grid>

        {/* 期待値 × 評価分析 */}
        <Grid item xs={12}>
          <DualScatterChartCard
            title='期待値×評価分析'
            leftData={scatterData}
            xAxisName='期待値'
            yAxisName='評価'
            leftColor={colors.primary}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
