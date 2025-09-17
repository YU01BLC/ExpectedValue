import { type JSX } from 'react';
import {
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTheme, Box } from '@mui/material';
import { ChartCard } from './ChartCard';
import { getGateColor } from '../utils/themeColors';

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

  // 内訳データを空にしてチャートエリアを広げる
  const breakdownData: {
    name: string;
    value: string | number;
    color?: string;
    horses?: { number: number; name: string }[];
  }[] = [];

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
      <Box sx={{ width: '100%', height: '100%' }}>
        <ResponsiveContainer width='100%' height={dynamicHeight - 100}>
          <ScatterChart
            data={leftData}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          >
            <CartesianGrid
              stroke={theme.palette.divider}
              strokeDasharray='3 3'
            />
            <XAxis
              dataKey='x'
              name={xAxisName}
              tick={{
                fill: theme.palette.text.primary,
                fontSize: 12,
              }}
              axisLine={{ stroke: theme.palette.divider }}
              tickLine={{ stroke: theme.palette.divider }}
              type='number'
              scale='linear'
              domain={[0, 2]}
            />
            <YAxis
              dataKey='y'
              name={yAxisName}
              tick={{
                fill: theme.palette.text.primary,
                fontSize: 12,
              }}
              axisLine={{ stroke: theme.palette.divider }}
              tickLine={{ stroke: theme.palette.divider }}
              type='number'
              scale='linear'
              domain={yDomain}
            />
            <Tooltip
              cursor={{
                strokeDasharray: '3 3',
                stroke: theme.palette.divider,
              }}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                color: '#000000',
                fontSize: 12,
                fontWeight: 500,
              }}
              formatter={(value, name, props) => {
                const data = props.payload;
                const evaluationText = data?.evaluation || '';
                const horseNumber = data?.horseNumber || '';
                if (name === 'y') {
                  return [
                    `評価: ${evaluationText}`,
                    `馬番${horseNumber}: ${data?.name || ''}`,
                  ];
                } else {
                  return [
                    `期待値: ${value}`,
                    `馬番${horseNumber}: ${data?.name || ''}`,
                  ];
                }
              }}
            />
            {/* 馬番を直接表示 */}
            {leftData.map((entry, index) => {
              const gateColor = getGateColor(entry.gateNumber || 1, theme);
              const x = 40 + (entry.x / 2) * 60; // X軸の位置を計算（マージン考慮）
              const yRange = yDomain[1] - yDomain[0];
              const y = 40 + ((yDomain[1] - entry.y) / yRange) * 60; // Y軸の位置を計算（動的ドメイン考慮）
              return (
                <g key={`horse-${index}`}>
                  {/* 背景円 */}
                  <circle
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r='16'
                    fill={gateColor.bg}
                    stroke={gateColor.text}
                    strokeWidth='2'
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => {
                      // ホバー時の処理
                      const tooltip = document.createElement('div');
                      tooltip.style.position = 'fixed';
                      tooltip.style.backgroundColor =
                        'rgba(255, 255, 255, 0.95)';
                      tooltip.style.border = '1px solid rgba(0, 0, 0, 0.2)';
                      tooltip.style.borderRadius = '8px';
                      tooltip.style.padding = '8px';
                      tooltip.style.fontSize = '12px';
                      tooltip.style.color = '#000000';
                      tooltip.style.fontWeight = '500';
                      tooltip.style.zIndex = '9999';
                      tooltip.style.pointerEvents = 'none';
                      tooltip.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                      tooltip.innerHTML = `
                        <div>期待値: ${entry.x}</div>
                        <div>評価: ${entry.evaluation}</div>
                        <div>馬番${entry.horseNumber}: ${entry.name}</div>
                      `;
                      document.body.appendChild(tooltip);

                      const updatePosition = (e: MouseEvent) => {
                        tooltip.style.left = e.clientX + 10 + 'px';
                        tooltip.style.top = e.clientY - 10 + 'px';
                      };

                      updatePosition(e as unknown as MouseEvent);
                      document.addEventListener('mousemove', updatePosition);

                      const cleanup = () => {
                        if (document.body.contains(tooltip)) {
                          document.body.removeChild(tooltip);
                        }
                        document.removeEventListener(
                          'mousemove',
                          updatePosition
                        );
                        document.removeEventListener('mouseleave', cleanup);
                      };

                      e.currentTarget.addEventListener('mouseleave', cleanup);
                    }}
                  />
                  {/* 馬番テキスト */}
                  <text
                    x={`${x}%`}
                    y={`${y}%`}
                    textAnchor='middle'
                    dominantBaseline='middle'
                    fontSize='14'
                    fontWeight='bold'
                    fill='white'
                    stroke='black'
                    strokeWidth='0.5'
                  >
                    {entry.horseNumber}
                  </text>
                </g>
              );
            })}
          </ScatterChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};
