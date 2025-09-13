import type { JSX } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Card } from '@/components/ui/atoms/Card';

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
 *
 * @description 共通Cardベースの回収率推移グラフと期間切り替えタブを表示
 * @param props - コンポーネントのプロパティ
 * @param props.data - チャートデータ
 * @param props.period - 現在の期間
 * @param props.onPeriodChange - 期間変更ハンドラー
 * @returns JSX.Element
 */
export const ChartCard = ({
  data,
  period,
  onPeriodChange,
}: ChartCardProps): JSX.Element => {
  const { t } = useTranslation('dashboard');
  const periods = [
    { key: 'day' as const, label: t('chart.periods.day') },
    { key: 'week' as const, label: t('chart.periods.week') },
    { key: 'month' as const, label: t('chart.periods.month') },
    { key: 'year' as const, label: t('chart.periods.year') },
  ];

  return (
    <Card
      title={
        <Typography sx={{ fontSize: 42, fontWeight: 700, letterSpacing: 0.2 }}>
          {t('chart.title')}
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
      height={400}
      sx={{
        mt: { xs: 4, md: 6, xl: 8 },
      }}
    >
      <div className='h-[340px] w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke='rgba(255,255,255,0.06)' vertical={false} />
            <XAxis dataKey='t' stroke='rgba(255,255,255,0.5)' tickMargin={10} />
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
    </Card>
  );
};
