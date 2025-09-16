import { type JSX } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  ListTable,
  type HorseData,
} from '../../../components/ui/atoms/ListTable';
import { ListCharts } from '../../../components/ui/atoms/ListCharts';
import {
  RecommendedBets,
  type RecommendedBet,
} from '../../../components/ui/atoms/RecommendedBets';

interface ListModalProps {
  open: boolean;
  onClose: () => void;
}

// モックデータ
const mockHorseData: HorseData[] = [
  {
    id: '1',
    name: 'サンプルA',
    evaluation: 'S',
    winRate: 8.8,
    odds: 3.83,
    ev: 1.0,
    recommendation: '籠全往騎',
  },
  {
    id: '2',
    name: 'サンプルB',
    evaluation: 'A',
    winRate: 8.9,
    odds: 1.3,
    ev: 1.3,
    recommendation: '膈北条罪',
  },
  {
    id: '3',
    name: 'サンプルC',
    evaluation: 'B',
    winRate: 5.6,
    odds: 2.9,
    ev: 0.85,
    recommendation: '同雨麋',
  },
  {
    id: '4',
    name: 'サンプルD',
    evaluation: 'C',
    winRate: 0.3,
    odds: 2.38,
    ev: 0.63,
    recommendation: '同毒笑晟',
  },
  {
    id: '5',
    name: 'サンプルE',
    evaluation: 'B',
    winRate: 2.8,
    odds: 1.62,
    ev: 1.35,
    recommendation: '籠全往騎',
  },
  {
    id: '6',
    name: 'サンプルF',
    evaluation: 'A',
    winRate: 3.3,
    odds: 0.35,
    ev: 1.0,
    recommendation: '膈北条罪',
  },
  {
    id: '7',
    name: 'サンプルG',
    evaluation: 'D',
    winRate: 0.3,
    odds: 1.2,
    ev: 0.13,
    recommendation: '同雨麋',
  },
  {
    id: '8',
    name: 'サンプルH',
    evaluation: 'C',
    winRate: 2.3,
    odds: 1.5,
    ev: 0.85,
    recommendation: '同毒笑晟',
  },
];

const mockRecommendedBets: RecommendedBet[] = [
  { type: '単勝', horses: ['サンプルA'], amount: 10000 },
  { type: '馬連', horses: ['サンプルA', 'サンプルB'], amount: 5000 },
  {
    type: '3連複',
    horses: ['サンプルA', 'サンプルC', 'サンプルD'],
    amount: 3000,
  },
];

const winRateOddsData = mockHorseData.map((horse) => ({
  winRate: horse.winRate,
  odds: horse.odds,
  name: horse.name,
}));

export const ListModal = ({ open, onClose }: ListModalProps): JSX.Element => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          maxHeight: '95vh',
          width: '95vw',
          maxWidth: '95vw',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1,
        }}
      >
        <Typography
          variant='h6'
          component='span'
          sx={{ color: 'text.primary' }}
        >
          レース一覧
        </Typography>
        <IconButton
          onClick={onClose}
          size='small'
          sx={{ color: 'text.secondary' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 4, maxHeight: '85vh', overflow: 'auto' }}>
        {/* 全頭診断テーブル */}
        <Box sx={{ mb: 4 }}>
          <Typography variant='h6' sx={{ mb: 2, color: 'text.primary' }}>
            全頭診断
          </Typography>
          <ListTable horseData={mockHorseData} />
        </Box>

        {/* チャートセクション */}
        <ListCharts winRateOddsData={winRateOddsData} />

        {/* 推奨買い目 */}
        <RecommendedBets recommendedBets={mockRecommendedBets} />
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 1 }}>
        <Button
          onClick={onClose}
          variant='contained'
          sx={{
            borderRadius: 1,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};
