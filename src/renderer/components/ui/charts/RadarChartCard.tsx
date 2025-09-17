import { type JSX } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '@mui/material';
import { ChartCard } from './ChartCard';

interface RadarChartData {
  subject: string;
  A: number;
  B: number;
  fullMark: number;
}

interface RadarChartCardProps {
  title: string;
  data: RadarChartData[];
  color: string;
  height?: number;
}

export const RadarChartCard = ({
  title,
  data,
  color,
  height = 600,
}: RadarChartCardProps): JSX.Element => {
  const theme = useTheme();

  // 内訳データの変換
  const breakdownData = data.map((item, index) => ({
    name: item.subject,
    value: `A: ${item.A} B: ${item.B}`,
    color:
      index === 0 ? theme.palette.primary.main : theme.palette.secondary.main,
  }));

  return (
    <ChartCard
      title={title}
      color={color}
      height={height}
      breakdownData={breakdownData}
    >
      <ResponsiveContainer
        width='100%'
        height='100%'
        minWidth={200}
        minHeight={200}
      >
        <RadarChart
          data={data}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <PolarGrid stroke={theme.palette.divider} />
          <PolarAngleAxis
            dataKey='subject'
            tick={{
              fill: theme.palette.text.primary,
              fontSize: 11,
              fontWeight: 500,
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{
              fill: theme.palette.text.secondary,
              fontSize: 9,
            }}
            axisLine={false}
          />
          <Radar
            name='A'
            dataKey='A'
            stroke={theme.palette.primary.main}
            fill={theme.palette.primary.main}
            fillOpacity={0.4}
            strokeWidth={2}
          />
          <Radar
            name='B'
            dataKey='B'
            stroke={theme.palette.secondary.main}
            fill={theme.palette.secondary.main}
            fillOpacity={0.4}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              color: '#000000',
              fontSize: 14,
              fontWeight: 500,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};
