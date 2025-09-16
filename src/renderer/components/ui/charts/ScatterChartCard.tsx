import { type JSX } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
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
  height = 450,
}: ScatterChartCardProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: 3,
        height,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
        },
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: color,
              mr: 2,
            }}
          />
          <Typography
            variant='h6'
            sx={{
              color: 'text.primary',
              fontSize: '1.2rem',
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box
          sx={{ flex: 1, height: height - 120, minWidth: 300, minHeight: 300 }}
        >
          <ResponsiveContainer
            width='100%'
            height='100%'
            minWidth={0}
            minHeight={0}
            aspect={1}
          >
            <ScatterChart
              data={data}
              margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
            >
              <CartesianGrid
                stroke={theme.palette.divider}
                strokeDasharray='3 3'
              />
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
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '8px',
                  color: theme.palette.text.primary,
                  fontSize: 14,
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
        </Box>
      </CardContent>
    </Card>
  );
};
