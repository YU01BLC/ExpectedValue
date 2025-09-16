import { type JSX } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material';

interface PieChartData {
  name: string;
  value: number;
  color: string;
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
  height = 450,
}: PieChartCardProps): JSX.Element => {
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
            <PieChart>
              <Pie
                data={data}
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={140}
                dataKey='value'
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value}%`, name]}
                labelStyle={{ color: theme.palette.text.primary, fontSize: 14 }}
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '8px',
                  fontSize: 14,
                  color: theme.palette.text.primary,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};
