import { type JSX, useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import { RaceTableResponsive } from '../../../components/ui/atoms/RaceTableResponsive';
import { RaceCharts } from '../../../components/ui/atoms/RaceCharts';
import { RecommendedBets } from '../../../components/ui/atoms/RecommendedBets';
import { PurchaseForm } from '../../../components/ui/atoms/PurchaseForm';
// import { type BetTicket } from '../../../components/ui/atoms/types/purchaseForm';
import { mockHorseData, mockRecommendedBets } from '../data/mockData';

interface RaceAnalysisModalProps {
  open: boolean;
  onClose: () => void;
  onPurchaseComplete?: () => void;
}

export const RaceAnalysisModal = ({
  open,
  onClose,
  onPurchaseComplete,
}: RaceAnalysisModalProps): JSX.Element => {
  const { t } = useTranslation('common');

  // ソート状態の管理
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);

  // ソート処理
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // ソートされたデータを取得（現在は使用していないが、将来的に使用予定）
  // const sortedHorseData = sortHorseData(
  //   mockHorseData,
  //   sortField || 'horseNumber',
  //   sortDirection
  // );

  // 購入フォームの表示切り替え
  const handleTogglePurchaseForm = () => {
    setShowPurchaseForm(!showPurchaseForm);
  };

  // 購入実行
  const handlePurchase = () => {
    alert(t('purchase.completed'));
    setShowPurchaseForm(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth
      fullScreen={{ xs: true, sm: true, md: false }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: { xs: 0, sm: 0, md: 2 },
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            maxHeight: { xs: '100vh', sm: '100vh', md: '95vh' },
            width: { xs: '100vw', sm: '100vw', md: '95vw' },
            maxWidth: { xs: '100vw', sm: '100vw', md: '95vw' },
          },
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
          {t('modal.raceAnalysis')}
        </Typography>
        <IconButton
          onClick={onClose}
          size='small'
          sx={{ color: 'text.secondary' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          maxHeight: {
            xs: 'calc(100vh - 80px)',
            sm: 'calc(100vh - 80px)',
            md: '85vh',
          },
          overflow: 'auto',
        }}
      >
        {/* 全頭診断テーブル */}
        <Box sx={{ mb: 4 }}>
          <Typography variant='h6' sx={{ mb: 2, color: 'text.primary' }}>
            {t('modal.allHorseDiagnosis')}
          </Typography>
          <RaceTableResponsive
            horseData={mockHorseData}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        </Box>

        {/* チャートセクション */}
        <RaceCharts horseData={mockHorseData} />

        {/* 購入フォームまたは推奨買い目 */}
        {showPurchaseForm ? (
          <PurchaseForm
            horses={mockHorseData.map((horse) => ({
              number: horse.horseNumber,
              name: horse.name,
              odds: horse.odds,
              expectedValue: horse.expectedValue,
              evaluation: horse.evaluation,
              gateNumber: horse.gateNumber,
            }))}
            onPurchase={handlePurchase}
            onCancel={() => {
              setShowPurchaseForm(false);
              onClose(); // レース分析モーダルも閉じる
            }}
            raceInfo={{
              date: new Date().toISOString().split('T')[0], // 現在の日付
              venue: '東京競馬場',
              raceNumber: 1,
              raceName: 'サンプルレース',
            }}
          />
        ) : (
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant='h6' sx={{ color: 'text.primary' }}>
                {t('modal.recommendedBets')}
              </Typography>
              <Button
                variant='contained'
                onClick={handleTogglePurchaseForm}
                sx={{
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background:
                      'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                  },
                }}
              >
                {t('purchase.openForm')}
              </Button>
            </Box>
            <RecommendedBets recommendedBets={mockRecommendedBets} />
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: { xs: 2, sm: 2, md: 2 }, pt: 1 }}>
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
