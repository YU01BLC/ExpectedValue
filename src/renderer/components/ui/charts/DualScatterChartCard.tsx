import { type JSX } from 'react';
import {
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Scatter,
} from 'recharts';
import { useTheme, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ChartCard } from './ChartCard';
import { getGateColor } from '../atoms/utils/raceTableUtils';

interface ScatterData {
  x: number;
  y: number;
  name: string;
  horseNumber?: number;
  gateNumber?: number;
  evaluation?: string;
}

interface DualScatterChartCardProps {
  title: string;
  leftData: ScatterData[];
  xAxisName: string;
  yAxisName: string;
  leftColor: string;
}

export const DualScatterChartCard = ({
  title,
  leftData,
  xAxisName,
  yAxisName,
  leftColor,
}: DualScatterChartCardProps): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslation('common');

  // 内訳データを空にしてチャートエリアを広げる
  const breakdownData: {
    name: string;
    value: string | number;
    color?: string;
    horses?: { number: number; name: string }[];
  }[] = [];

  // シンプルなX軸範囲設定
  const getXAxisRange = () => {
    if (leftData.length === 0) return { minX: 0.8, maxX: 1.4 };

    const xValues = leftData.map((entry) => entry.x);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);

    // データの範囲に十分な余裕を持たせる（見切れ防止）
    const padding = (maxX - minX) * 0.2; // 20%のパディングに増加
    return {
      minX: Math.max(0.7, minX - padding), // 最小値は0.7%に拡張
      maxX: Math.min(1.5, maxX + padding), // 最大値は1.5%に拡張
    };
  };

  const xAxisRange = getXAxisRange();

  // 評価を数値からグレードに変換する関数
  const getEvaluationGrade = (value: number): string => {
    if (value >= 4.5) return 'S';
    if (value >= 4.0) return 'A';
    if (value >= 3.5) return 'B';
    if (value >= 3.0) return 'C';
    if (value >= 2.5) return 'D';
    return 'E';
  };

  // カスタムTooltipコンポーネント
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;
      const gateColor = getGateColor(data.gateNumber || 1, theme, 18);

      return (
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            p: 1.5,
            boxShadow: theme.shadows[3],
          }}
        >
          <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 'bold' }}>
            {data.horseNumber}
            {t('table.horseNumber')}
          </Typography>
          <Typography variant='body2' sx={{ mb: 0.5 }}>
            {t('table.expectedValue')}: {data.x.toFixed(2)}%
          </Typography>
          <Typography variant='body2' sx={{ mb: 0.5 }}>
            {t('table.evaluation')}: {getEvaluationGrade(data.y)}
          </Typography>
          <Typography variant='body2'>
            {t('table.horseName')}:{' '}
            {data.horseName || `${t('table.horseName')}${data.horseNumber}`}
          </Typography>
          <Box
            sx={{
              display: 'inline-block',
              width: 12,
              height: 12,
              backgroundColor: gateColor.bg,
              borderRadius: '50%',
              border: `2px solid ${gateColor.text}`,
              mt: 0.5,
            }}
          />
        </Box>
      );
    }
    return null;
  };

  // データポイントの位置に基づいて動的に高さを計算
  const calculateDynamicHeight = () => {
    if (leftData.length === 0) return 600;

    // データポイントのY軸の範囲を取得
    const yValues = leftData.map((entry) => entry.y);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    // より保守的な高さ計算
    const margin = 120; // 上下のマージンをさらに増加
    const minHeight = 600; // 最小高さを600に設定
    const dataHeight = (maxY - minY) * 100; // データ範囲に基づく高さを増加
    const calculatedHeight = Math.max(minHeight, margin + dataHeight + margin);

    return Math.min(calculatedHeight, 1200); // 最大1200pxに制限
  };

  const dynamicHeight = calculateDynamicHeight();

  // Y軸のドメインを動的に計算
  const calculateYDomain = () => {
    if (leftData.length === 0) return [1, 5];

    const yValues = leftData.map((entry) => entry.y);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    // より大きな余裕を持たせてドメインを設定
    const padding = 1.0; // 0.5から1.0に増加
    return [Math.max(0.5, minY - padding), Math.min(5.5, maxY + padding)];
  };

  const yDomain = calculateYDomain();

  return (
    <ChartCard
      title={title}
      color={leftColor}
      height={dynamicHeight}
      breakdownData={breakdownData}
      showBreakdown={false}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'hidden', // 親コンテナのオーバーフローを制御
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: dynamicHeight - 100,
            overflowX: 'auto', // 横スクロールを有効化
            overflowY: 'hidden',
            '&::-webkit-scrollbar': {
              height: 6,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: theme.palette.grey[800],
              borderRadius: 3,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.grey[600],
              borderRadius: 3,
              '&:hover': {
                backgroundColor: theme.palette.grey[500],
              },
            },
          }}
        >
          <Box
            sx={{
              width: { xs: 1000, sm: '100%' }, // SP表示のみ固定幅
              height: '100%',
              flexShrink: 0, // 縮小を防ぐ
            }}
          >
            <ResponsiveContainer width='100%' height='100%'>
              <ScatterChart
                data={leftData}
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
              >
                <CartesianGrid
                  stroke={theme.palette.divider}
                  strokeDasharray='3 3'
                />
                <Tooltip content={<CustomTooltip />} />
                <XAxis
                  dataKey='x'
                  name={t('table.expectedValue')}
                  tick={{
                    fill: theme.palette.text.primary,
                    fontSize: 12,
                  }}
                  axisLine={{ stroke: theme.palette.divider }}
                  tickLine={{ stroke: theme.palette.divider }}
                  type='number'
                  scale='linear'
                  domain={[xAxisRange.minX, xAxisRange.maxX]}
                  ticks={[0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4]}
                  tickFormatter={(value) => `${value.toFixed(2)}%`}
                />
                <YAxis
                  dataKey='y'
                  name={t('table.evaluation')}
                  tick={{
                    fill: theme.palette.text.primary,
                    fontSize: 12,
                  }}
                  axisLine={{ stroke: theme.palette.divider }}
                  tickLine={{ stroke: theme.palette.divider }}
                  type='number'
                  scale='linear'
                  domain={yDomain}
                  tickFormatter={(value) => getEvaluationGrade(value)}
                />
                {/* RechartsのScatterコンポーネントを使用してホバー機能を有効化 */}
                <Scatter
                  data={leftData}
                  fill={theme.palette.primary.main}
                  shape={(props: {
                    cx: number;
                    cy: number;
                    payload: ScatterData;
                  }) => {
                    const { cx, cy, payload } = props;
                    const gateColor = getGateColor(
                      payload?.gateNumber || 1,
                      theme,
                      18
                    );

                    return (
                      <g>
                        <circle
                          cx={cx}
                          cy={cy}
                          r={12}
                          fill={gateColor.bg}
                          stroke={gateColor.text}
                          strokeWidth={2}
                        />
                        <text
                          x={cx}
                          y={cy}
                          textAnchor='middle'
                          dominantBaseline='middle'
                          fontSize={10}
                          fontWeight='bold'
                          fill={gateColor.text}
                          stroke='white'
                          strokeWidth={0.5}
                        >
                          {payload?.horseNumber}
                        </text>
                      </g>
                    );
                  }}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </ChartCard>
  );
};
