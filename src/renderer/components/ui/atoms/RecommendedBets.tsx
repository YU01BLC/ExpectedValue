import { type JSX } from 'react';
import { Box, Typography } from '@mui/material';

// 推奨買い目の型定義
export interface RecommendedBet {
  type: string;
  horses: string[];
  amount: number;
}

interface RecommendedBetsProps {
  recommendedBets: RecommendedBet[];
}

export const RecommendedBets = ({
  recommendedBets,
}: RecommendedBetsProps): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {recommendedBets.map((bet, index) => (
            <Box
              key={index}
              sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
            >
              <Typography
                variant='body2'
                sx={{ color: 'text.primary', minWidth: '60px' }}
              >
                {bet.type}:
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.primary' }}>
                {bet.horses.join(' - ')}
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: 'text.primary', fontWeight: 600 }}
              >
                ¥{bet.amount?.toLocaleString() || '0'}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
