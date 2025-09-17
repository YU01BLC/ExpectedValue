import { type JSX } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material';
import { ChartCard } from './ChartCard';

interface PieChartData {
  name: string;
  value: number;
  color: string;
  horses?: { number: number; name: string }[];
}

interface PieChartCardProps {
  title: string;
  data: PieChartData[];
  color: string;
  height?: number;
}

export const PieChartCard = ({
  title,
  data,
  color,
  height = 600,
}: PieChartCardProps): JSX.Element => {
  const theme = useTheme();

  // 内訳データの変換
  const breakdownData = data.map((item) => ({
    name: item.name,
    value: `${item.value}%`,
    color: item.color,
    horses: item.horses,
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
        <PieChart>
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            innerRadius={60}
            outerRadius={120}
            dataKey='value'
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value}%`, name]}
            labelStyle={{
              color: '#000000',
              fontSize: 14,
              fontWeight: 600,
            }}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              fontSize: 14,
              color: '#000000',
              fontWeight: 500,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};
