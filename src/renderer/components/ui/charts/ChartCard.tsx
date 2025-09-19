import { type JSX, type ReactNode } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material';

interface ChartCardProps {
  title: string;
  color: string;
  height?: number;
  children: ReactNode;
  breakdownData: Array<{
    name: string;
    value: string | number;
    color?: string;
    horses?: { number: number; name: string; gateNumber: number }[];
  }>;
  showBreakdown?: boolean;
}

export const ChartCard = ({
  title,
  color,
  height = 600,
  children,
  breakdownData,
  showBreakdown = true,
}: ChartCardProps): JSX.Element => {
  const theme = useTheme();

  // 枠番の色を取得する関数
  const getGateColor = (gateNumber: number) => {
    return (
      theme.palette.gate[gateNumber as keyof typeof theme.palette.gate] ||
      theme.palette.gate.default
    );
  };

  return (
    <Card
      component='div'
      onClick={(e) => e.preventDefault()}
      onMouseDown={(e) => e.preventDefault()}
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
        cursor: 'default',
        userSelect: 'none',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px rgba(59, 130, 246, 0.3)',
          border: '1px solid rgba(59, 130, 246, 0.4)',
        },
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          height: '100%',
        }}
      >
        {/* タイトル */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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

        {/* チャートエリア - カードの中心やや上に配置 */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 300,
            // maxHeightを削除して動的高さに対応
          }}
        >
          {children}
        </Box>

        {/* 内訳表示 */}
        {showBreakdown && (
          <Box sx={{ mt: 'auto' }}>
            <Typography
              variant='body2'
              sx={{
                color: 'text.secondary',
                fontSize: '0.875rem',
                fontWeight: 500,
                mb: 2,
              }}
            >
              内訳
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                maxHeight: 200,
                overflowY: 'auto',
                pr: 1,
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(255,255,255,0.3)',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: 'rgba(255,255,255,0.5)',
                },
              }}
            >
              {breakdownData.map((item, index) => (
                <Box key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      py: 1,
                      px: 1,
                      mb: 0.5,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: item.color || color,
                          mr: 1.5,
                        }}
                      />
                      <Typography
                        variant='body2'
                        sx={{
                          color: 'text.primary',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                    <Typography
                      variant='body2'
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                  {/* 馬番表示 */}
                  {item.horses && item.horses.length > 0 && (
                    <Box sx={{ pl: 3, mb: 1 }}>
                      <Typography
                        variant='caption'
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.7rem',
                          display: 'block',
                          mb: 0.5,
                        }}
                      >
                        該当馬:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {item.horses.map((horse, horseIndex) => (
                          <Box
                            key={horseIndex}
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              backgroundColor: 'rgba(255,255,255,0.1)',
                              borderRadius: 1,
                              px: 1,
                              py: 0.25,
                              mr: 0.5,
                              mb: 0.5,
                            }}
                          >
                            <Box
                              sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                backgroundColor: getGateColor(
                                  horse.gateNumber,
                                  theme,
                                  18
                                ).bg, // デフォルト18頭
                                color: getGateColor(horse.gateNumber, theme, 18)
                                  .text, // デフォルト18頭
                                fontSize: '0.6rem',
                                fontWeight: 700,
                                mr: 0.5,
                              }}
                            >
                              {horse.number}
                            </Box>
                            <Typography
                              variant='caption'
                              sx={{
                                color: 'text.primary',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                              }}
                            >
                              {horse.name}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
