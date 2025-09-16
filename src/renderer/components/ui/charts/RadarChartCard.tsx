import { type JSX } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
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
  height = 450,
}: RadarChartCardProps): JSX.Element => {
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
            <RadarChart
              data={data}
              margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
            >
              <PolarGrid stroke={theme.palette.divider} />
              <PolarAngleAxis
                dataKey='subject'
                tick={{
                  fill: theme.palette.text.primary,
                  fontSize: 12,
                  fontWeight: 500,
                }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{
                  fill: theme.palette.text.secondary,
                  fontSize: 10,
                }}
                axisLine={false}
              />
              <Radar
                name='A'
                dataKey='A'
                stroke={theme.palette.primary.main}
                fill={theme.palette.primary.main}
                fillOpacity={0.4}
                strokeWidth={3}
              />
              <Radar
                name='B'
                dataKey='B'
                stroke={theme.palette.secondary.main}
                fill={theme.palette.secondary.main}
                fillOpacity={0.4}
                strokeWidth={3}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '8px',
                  color: theme.palette.text.primary,
                  fontSize: 14,
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};
