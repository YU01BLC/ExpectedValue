import { type JSX, useMemo, useCallback } from 'react';
import { Box, Typography, useTheme, Grid } from '@mui/material';
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

  // 共通のフィルタリング処理を関数として抽出（メモ化）
  // 評価による馬のフィルタリング（S, A, B, C, Dの組み合わせに対応）
  const filterHorsesByEvaluation = useCallback(
    (evaluations: string[]) => {
      return horseData.filter((h) => evaluations.includes(h.evaluation));
    },
    [horseData]
  );

  // 期待値による馬のフィルタリング（範囲指定可能）
  const filterHorsesByExpectedValue = useCallback(
    (minValue: number, maxValue?: number) => {
      return horseData.filter((h) => {
        if (maxValue !== undefined) {
          return h.expectedValue >= minValue && h.expectedValue < maxValue;
        }
        return h.expectedValue >= minValue;
      });
    },
    [horseData]
  );

  // オッズによる馬のフィルタリング（最小値以上）
  const filterHorsesByOdds = useCallback(
    (minOdds: number) => {
      return horseData.filter((h) => h.odds >= minOdds);
    },
    [horseData]
  );

  // 実際の馬データに基づくチャートデータ生成（メモ化）
  const chartData = useMemo(() => {
    // コース傾向データ（馬の評価に基づく）
    const courseTendency = [
      {
        name: t('chart.courseTendencyLabels.leadAdvantage'),
        value: Math.round(
          (filterHorsesByEvaluation(['S', 'A']).length / horseData.length) * 100
        ),
        color: colors.success,
        horses: filterHorsesByEvaluation(['S', 'A']).map((h) => ({
          number: h.horseNumber,
          name: h.name,
          gateNumber: h.gateNumber,
        })),
      },
      {
        name: t('chart.courseTendencyLabels.chaseAdvantage'),
        value: Math.round(
          (filterHorsesByEvaluation(['B']).length / horseData.length) * 100
        ),
        color: colors.info,
        horses: filterHorsesByEvaluation(['B']).map((h) => ({
          number: h.horseNumber,
          name: h.name,
          gateNumber: h.gateNumber,
        })),
      },
      {
        name: t('chart.courseTendencyLabels.escapeAdvantage'),
        value: Math.round(
          (filterHorsesByEvaluation(['C']).length / horseData.length) * 100
        ),
        color: colors.warning,
        horses: filterHorsesByEvaluation(['C']).map((h) => ({
          number: h.horseNumber,
          name: h.name,
          gateNumber: h.gateNumber,
        })),
      },
      {
        name: t('chart.courseTendencyLabels.others'),
        value: Math.round(
          (filterHorsesByEvaluation(['D']).length / horseData.length) * 100
        ),
        color: colors.grey,
        horses: filterHorsesByEvaluation(['D']).map((h) => ({
          number: h.horseNumber,
          name: h.name,
          gateNumber: h.gateNumber,
        })),
      },
    ];

    // 脚質分布データ（期待値に基づく）
    const legQuality = [
      {
        name: t('chart.legQualityLabels.escape'),
        value: Math.round(
          (filterHorsesByExpectedValue(1.5).length / horseData.length) * 100
        ),
        color: colors.error,
        horses: filterHorsesByExpectedValue(1.5).map((h) => ({
          number: h.horseNumber,
          name: h.name,
          gateNumber: h.gateNumber,
        })),
      },
      {
        name: t('chart.legQualityLabels.lead'),
        value: Math.round(
          (filterHorsesByExpectedValue(1.2, 1.5).length / horseData.length) *
            100
        ),
        color: colors.warning,
        horses: filterHorsesByExpectedValue(1.2, 1.5).map((h) => ({
          number: h.horseNumber,
          name: h.name,
          gateNumber: h.gateNumber,
        })),
      },
      {
        name: t('chart.legQualityLabels.chase'),
        value: Math.round(
          (filterHorsesByExpectedValue(1.0, 1.2).length / horseData.length) *
            100
        ),
        color: colors.info,
        horses: filterHorsesByExpectedValue(1.0, 1.2).map((h) => ({
          number: h.horseNumber,
          name: h.name,
          gateNumber: h.gateNumber,
        })),
      },
      {
        name: t('chart.legQualityLabels.closer'),
        value: Math.round(
          (filterHorsesByExpectedValue(0, 1.0).length / horseData.length) * 100
        ),
        color: colors.purple,
        horses: filterHorsesByExpectedValue(0, 1.0).map((h) => ({
          number: h.horseNumber,
          name: h.name,
          gateNumber: h.gateNumber,
        })),
      },
    ];

    // 血統適性データ（オッズに基づく）
    const pedigreeAptitude = [
      {
        subject: t('chart.pedigreeAptitudeLabels.speed'),
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
        subject: t('chart.pedigreeAptitudeLabels.stamina'),
        A: Math.round((filterHorsesByOdds(3).length / horseData.length) * 100),
        B: Math.round(
          (filterHorsesByExpectedValue(1.2).length / horseData.length) * 100
        ),
        fullMark: 100,
      },
      {
        subject: t('chart.pedigreeAptitudeLabels.sprint'),
        A: Math.round((filterHorsesByOdds(5).length / horseData.length) * 100),
        B: Math.round(
          (filterHorsesByExpectedValue(1.5).length / horseData.length) * 100
        ),
        fullMark: 100,
      },
      {
        subject: t('chart.pedigreeAptitudeLabels.endurance'),
        A: Math.round((filterHorsesByOdds(2).length / horseData.length) * 100),
        B: Math.round(
          (filterHorsesByExpectedValue(1.0).length / horseData.length) * 100
        ),
        fullMark: 100,
      },
      {
        subject: t('chart.pedigreeAptitudeLabels.flexibility'),
        A: Math.round((filterHorsesByOdds(4).length / horseData.length) * 100),
        B: Math.round(
          (filterHorsesByExpectedValue(1.3).length / horseData.length) * 100
        ),
        fullMark: 100,
      },
      {
        subject: t('chart.pedigreeAptitudeLabels.balance'),
        A: Math.round(
          (filterHorsesByOdds(2.5).length / horseData.length) * 100
        ),
        B: Math.round(
          (filterHorsesByExpectedValue(1.1).length / horseData.length) * 100
        ),
        fullMark: 100,
      },
    ];

    return { courseTendency, legQuality, pedigreeAptitude };
  }, [
    horseData,
    colors,
    filterHorsesByEvaluation,
    filterHorsesByExpectedValue,
    filterHorsesByOdds,
    t,
  ]);

  // 期待値×評価データの変換（メモ化）
  // 散布図用のデータを生成し、評価を数値に変換
  const scatterData = useMemo(() => {
    // 評価文字列を数値に変換する関数（S=5, A=4, B=3, C=2, D=1）
    const evaluationToNumber = (evaluation: string) => {
      const map: Record<string, number> = { S: 5, A: 4, B: 3, C: 2, D: 1 };
      return map[evaluation] || 1;
    };

    return horseData.map((horse) => ({
      x: horse.expectedValue,
      y: evaluationToNumber(horse.evaluation),
      name: horse.name,
      horseNumber: horse.horseNumber,
      gateNumber: horse.gateNumber,
      evaluation: horse.evaluation,
    }));
  }, [horseData]);

  // エラーハンドリング: データが空の場合は早期リターン
  if (!horseData || horseData.length === 0) {
    return (
      <Box sx={{ mb: 4, textAlign: 'center', py: 4 }}>
        <Typography variant='h6' color='text.secondary'>
          {t('chart.noData')}
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

      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
        {/* コース傾向 */}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <PieChartCard
            title={t('chart.courseTendency')}
            data={chartData.courseTendency}
            color={colors.success}
            height={580}
          />
        </Grid>

        {/* 脚質分布 */}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <PieChartCard
            title={t('chart.legQualityDistribution')}
            data={chartData.legQuality}
            color={colors.warning}
            height={580}
          />
        </Grid>

        {/* 血統適性 */}
        <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
          <RadarChartCard
            title={t('chart.pedigreeAptitude')}
            data={chartData.pedigreeAptitude}
            color={colors.info}
            height={580}
          />
        </Grid>

        {/* 期待値 × 評価分析 */}
        <Grid size={12}>
          <DualScatterChartCard
            title={t('chart.expectedValueEvaluation')}
            leftData={scatterData}
            leftColor={colors.primary}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
