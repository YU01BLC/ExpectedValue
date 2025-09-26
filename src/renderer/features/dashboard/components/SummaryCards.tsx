import type { JSX } from 'react';
import { ArrowUpRight, Wallet, History } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { RichStatCard } from '@/components/ui/RichStatCard';
import { RecommendationsCard } from '@/components/ui/RecommendationsCard';
import { PurchaseHistoryCard } from '@/components/ui/atoms/PurchaseHistoryCard';

interface SummaryData {
  roi: number;
  profit: number;
}

interface RecommendationItem {
  race: string;
  horse: string;
  bet: string;
  odds: number;
  ev: number;
}

interface SummaryCardsProps {
  summaryData: SummaryData;
  recommendations: RecommendationItem[];
  onHistoryClick?: (date: string, venue: string) => void;
  refreshTrigger?: number;
}

/**
 * サマリーカード群コンポーネント
 *
 * @description 総回収率カード、収支カード、おすすめカードを表示
 * @param props - コンポーネントのプロパティ
 * @param props.summaryData - サマリーデータ
 * @param props.recommendations - おすすめデータ
 * @returns JSX.Element
 */
export const SummaryCards = ({
  summaryData,
  recommendations,
  onHistoryClick,
  refreshTrigger,
}: SummaryCardsProps): JSX.Element => {
  const { t } = useTranslation('dashboard');
  const topRecommendations = [...recommendations].sort((a, b) => b.ev - a.ev);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: { xs: 7, xl: 9 },
        mb: { xs: 4, xl: 5 },
        alignItems: 'stretch',
        overflowX: 'auto',
        pb: 1,
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(148, 163, 184, 0.3) transparent',
        '&::-webkit-scrollbar': {
          height: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(148, 163, 184, 0.3)',
          borderRadius: '3px',
          '&:hover': {
            background: 'rgba(148, 163, 184, 0.5)',
          },
        },
      }}
    >
      <Box sx={{ flexShrink: 0, width: 500 }}>
        <RichStatCard
          title={t('summaryCards.totalRoi')}
          icon={<ArrowUpRight size={22} />}
          value={`${summaryData.roi}%`}
          caption={t('summaryCards.roiCaption')}
          valueColor='secondary.main'
        />
      </Box>
      <Box sx={{ flexShrink: 0, width: 500 }}>
        <RichStatCard
          title={t('summaryCards.profit')}
          icon={<Wallet size={22} />}
          value={`${summaryData.profit >= 0 ? '+ ' : ''}¥${Math.abs(
            summaryData.profit
          ).toLocaleString()}`}
          caption={t('summaryCards.profitCaption')}
          valueColor={summaryData.profit >= 0 ? 'secondary.main' : 'error.main'}
        />
      </Box>
      <Box sx={{ flexShrink: 0, width: 500 }}>
        <RecommendationsCard
          title={t('summaryCards.recommendations')}
          icon={<ArrowUpRight size={16} />}
          items={topRecommendations.map((r) => ({ label: r.horse, ev: r.ev }))}
          color='primary.main'
        />
      </Box>
      <Box sx={{ flexShrink: 0, width: 500 }}>
        <PurchaseHistoryCard
          onHistoryClick={onHistoryClick}
          refreshTrigger={refreshTrigger}
        />
      </Box>
    </Box>
  );
};
