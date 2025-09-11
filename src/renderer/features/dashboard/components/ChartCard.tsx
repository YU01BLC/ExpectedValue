import type { JSX } from 'react';
import MuiCard from '@mui/material/Card';
import MuiCardContent from '@mui/material/CardContent';
import MuiCardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface ChartDataPoint {
  t: string;
  rate: number;
}

interface ChartCardProps {
  data: ChartDataPoint[];
  period: 'day' | 'week' | 'month' | 'year';
  onPeriodChange: (period: 'day' | 'week' | 'month' | 'year') => void;
}

/**
 * チャートカードコンポーネント
 * - 回収率推移グラフ
 * - 期間切り替えタブ
 */
export const ChartCard = ({
  data,
  period,
  onPeriodChange,
}: ChartCardProps): JSX.Element => {
  const periods = [
    { key: 'day' as const, label: '日' },
    { key: 'week' as const, label: '週' },
    { key: 'month' as const, label: '月' },
    { key: 'year' as const, label: '年' },
  ];

  return (
    <MuiCard
      elevation={0}
      sx={{
        mt: { xs: 4, md: 6, xl: 8 },
        borderRadius: 4,
        background:
          'linear-gradient(180deg, rgba(30,41,59,0.72) 0%, rgba(30,41,59,0.46) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(148, 163, 184, .25)',
        boxShadow: '0 18px 48px rgba(2,6,23,.55)',
        color: '#e2e8f0',
      }}
    >
      <MuiCardHeader
        title={
          <Typography
            sx={{ fontSize: 16, fontWeight: 700, letterSpacing: 0.2 }}
          >
            回収率推移
          </Typography>
        }
        action={
          <Box
            sx={{
              bgcolor: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 9999,
              p: 0.25,
              display: 'flex',
              gap: 0.25,
            }}
          >
            {periods.map(({ key, label }) => (
              <Box
                key={key}
                onClick={() => onPeriodChange(key)}
                sx={{
                  px: 2,
                  py: 0.5,
                  fontSize: 12,
                  fontWeight: 500,
                  borderRadius: 9999,
                  cursor: 'pointer',
                  color: period === key ? '#000000' : '#ffffff',
                  bgcolor:
                    period === key ? 'rgba(255,255,255,0.9)' : 'transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                {label}
              </Box>
            ))}
          </Box>
        }
        sx={{ pb: 0 }}
      />
      <MuiCardContent sx={{ pt: 2 }}>
        <div className='h-[340px] w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={data}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke='rgba(255,255,255,0.06)' vertical={false} />
              <XAxis
                dataKey='t'
                stroke='rgba(255,255,255,0.5)'
                tickMargin={10}
              />
              <YAxis
                stroke='rgba(255,255,255,0.5)'
                tickMargin={10}
                domain={[0, 160]}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              />
              <Line
                type='monotone'
                dataKey='rate'
                stroke='#60a5fa'
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </MuiCardContent>
    </MuiCard>
  );
};
