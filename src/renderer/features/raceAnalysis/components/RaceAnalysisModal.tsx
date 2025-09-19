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
import {
  RaceTableResponsive,
  type HorseData,
} from '../../../components/ui/atoms/RaceTableResponsive';
import { RaceCharts } from '../../../components/ui/atoms/RaceCharts';
import {
  RecommendedBets,
  type RecommendedBet,
} from '../../../components/ui/atoms/RecommendedBets';
import { PurchaseForm } from '../../../components/ui/atoms/PurchaseForm';
import { type BetTicket } from '../../../components/ui/atoms/types/purchaseForm';

interface RaceAnalysisModalProps {
  open: boolean;
  onClose: () => void;
}

// ソートの型定義
type SortField =
  | 'horseNumber'
  | 'gateNumber'
  | 'evaluation'
  | 'expectedValue'
  | 'odds';
type SortDirection = 'asc' | 'desc';

// モックデータ
const mockHorseData: HorseData[] = [
  {
    id: '1',
    name: 'サンデーレーサー',
    horseNumber: 1,
    gateNumber: 1,
    evaluation: 'S',
    expectedValue: 1.25,
    odds: 2.8,
    comment: '近走好調、血統適性◎',
  },
  {
    id: '2',
    name: 'トウカイテイオー',
    horseNumber: 2,
    gateNumber: 1,
    evaluation: 'A',
    expectedValue: 1.15,
    odds: 3.2,
    comment: '脚質先行、コース適性良',
  },
  {
    id: '3',
    name: 'ダイナミックガイ',
    horseNumber: 3,
    gateNumber: 2,
    evaluation: 'B',
    expectedValue: 0.95,
    odds: 4.5,
    comment: '中距離得意、騎手相性良',
  },
  {
    id: '4',
    name: 'メジロマックイーン',
    horseNumber: 4,
    gateNumber: 2,
    evaluation: 'C',
    expectedValue: 0.75,
    odds: 6.8,
    comment: '距離短め、調教順調',
  },
  {
    id: '5',
    name: 'オグリキャップ',
    horseNumber: 5,
    gateNumber: 3,
    evaluation: 'B',
    expectedValue: 1.05,
    odds: 3.8,
    comment: '差し切り型、直線勝負',
  },
  {
    id: '6',
    name: 'シンボリルドルフ',
    horseNumber: 6,
    gateNumber: 3,
    evaluation: 'A',
    expectedValue: 1.18,
    odds: 2.9,
    comment: '重賞経験豊富、安定感◎',
  },
  {
    id: '7',
    name: 'ナリタブライアン',
    horseNumber: 7,
    gateNumber: 4,
    evaluation: 'D',
    expectedValue: 0.45,
    odds: 12.5,
    comment: '距離不安、初戦',
  },
  {
    id: '8',
    name: 'ディープインパクト',
    horseNumber: 8,
    gateNumber: 4,
    evaluation: 'C',
    expectedValue: 0.82,
    odds: 5.2,
    comment: '血統良し、調教要観察',
  },
  {
    id: '9',
    name: 'ジェンティルドンナ',
    horseNumber: 9,
    gateNumber: 5,
    evaluation: 'A',
    expectedValue: 1.12,
    odds: 3.1,
    comment: '牝馬の強さ、距離適性◎',
  },
  {
    id: '10',
    name: 'オルフェーヴル',
    horseNumber: 10,
    gateNumber: 5,
    evaluation: 'B',
    expectedValue: 0.98,
    odds: 4.2,
    comment: '中距離得意、脚質良し',
  },
  {
    id: '11',
    name: 'キタサンブラック',
    horseNumber: 11,
    gateNumber: 6,
    evaluation: 'C',
    expectedValue: 0.78,
    odds: 6.5,
    comment: '重賞経験あり、調子要確認',
  },
  {
    id: '12',
    name: 'サトノダイヤモンド',
    horseNumber: 12,
    gateNumber: 6,
    evaluation: 'B',
    expectedValue: 1.08,
    odds: 3.6,
    comment: '血統良し、騎手相性◎',
  },
  {
    id: '13',
    name: 'レイデオロ',
    horseNumber: 13,
    gateNumber: 13,
    evaluation: 'D',
    expectedValue: 0.52,
    odds: 9.8,
    comment: '初戦、距離不安',
  },
  {
    id: '14',
    name: 'サートゥルナーリア',
    horseNumber: 14,
    gateNumber: 14,
    evaluation: 'C',
    expectedValue: 0.85,
    odds: 5.8,
    comment: '牝馬、血統良し',
  },
  {
    id: '15',
    name: 'ロードカナロア',
    horseNumber: 15,
    gateNumber: 15,
    evaluation: 'B',
    expectedValue: 1.02,
    odds: 4.0,
    comment: 'スピード型、直線勝負',
  },
  {
    id: '16',
    name: 'アーモンドアイ',
    horseNumber: 16,
    gateNumber: 16,
    evaluation: 'A',
    expectedValue: 1.2,
    odds: 2.7,
    comment: '牝馬の強さ、コース適性◎',
  },
  {
    id: '17',
    name: 'コントレイル',
    horseNumber: 17,
    gateNumber: 17,
    evaluation: 'B',
    expectedValue: 0.95,
    odds: 4.3,
    comment: '血統良し、調教順調',
  },
  {
    id: '18',
    name: 'エフフォーリア',
    horseNumber: 18,
    gateNumber: 18,
    evaluation: 'C',
    expectedValue: 0.88,
    odds: 5.5,
    comment: '中距離得意、騎手相性良',
  },
];

const mockRecommendedBets: RecommendedBet[] = [
  { type: '単勝', horses: ['サンデーレーサー'], amount: 10000 },
  {
    type: '馬連',
    horses: ['サンデーレーサー', 'トウカイテイオー'],
    amount: 5000,
  },
  {
    type: '3連複',
    horses: ['サンデーレーサー', 'トウカイテイオー', 'シンボリルドルフ'],
    amount: 3000,
  },
];

export const RaceAnalysisModal = ({
  open,
  onClose,
}: RaceAnalysisModalProps): JSX.Element => {
  // ソート状態の管理
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);

  // ソート処理
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // 購入フォームの表示切り替え
  const handleTogglePurchaseForm = () => {
    setShowPurchaseForm(!showPurchaseForm);
  };

  // 購入実行
  const handlePurchase = (tickets: BetTicket[]) => {
    alert('購入が完了しました！');
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
          レース分析モーダル
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
            全頭診断
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
            onCancel={() => setShowPurchaseForm(false)}
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
                推奨買い目
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
                購入フォームを開く
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
