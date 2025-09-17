import { type JSX } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '@mui/material';
import { ChartCard } from './ChartCard';

interface ScatterData {
  x: number;
  y: number;
  name: string;
  horseNumber?: number;
  gateNumber?: number;
  evaluation?: string;
}

interface ScatterChartCardProps {
  title: string;
  data: ScatterData[];
  xAxisKey: string;
  yAxisKey: string;
  xAxisName: string;
  yAxisName: string;
  color: string;
  height?: number;
}

export const ScatterChartCard = ({
  title,
  data,
  xAxisKey,
  yAxisKey,
  xAxisName,
  yAxisName,
  color,
  height = 600,
}: ScatterChartCardProps): JSX.Element => {
  const theme = useTheme();

  return (
    <ChartCard
      title={title}
      color={color}
      height={height}
      breakdownData={[]} // スキャッターチャートは内訳表示なし
    >
      <ResponsiveContainer
        width='100%'
        height='100%'
        minWidth={200}
        minHeight={200}
      >
        <ScatterChart
          data={data}
          margin={{ top: 15, right: 15, bottom: 15, left: 15 }}
        >
          <CartesianGrid stroke={theme.palette.divider} strokeDasharray='3 3' />
          <XAxis
            dataKey={xAxisKey}
            name={xAxisName}
            tick={{
              fill: theme.palette.text.primary,
              fontSize: 12,
            }}
            axisLine={{ stroke: theme.palette.divider }}
            tickLine={{ stroke: theme.palette.divider }}
            type='number'
            scale='linear'
            domain={[0, 10]}
          />
          <YAxis
            dataKey={yAxisKey}
            name={yAxisName}
            tick={{
              fill: theme.palette.text.primary,
              fontSize: 12,
            }}
            axisLine={{ stroke: theme.palette.divider }}
            tickLine={{ stroke: theme.palette.divider }}
            type='number'
            scale='linear'
            domain={[0, 5]}
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
              fontSize: 14,
              fontWeight: 500,
            }}
            formatter={(value, name, props) => [
              `${value}`,
              name === yAxisKey ? yAxisName : xAxisName,
              props.payload?.name || '',
            ]}
          />
          <Scatter dataKey={yAxisKey} fill={color} r={8} />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};
