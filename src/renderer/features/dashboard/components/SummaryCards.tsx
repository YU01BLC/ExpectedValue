import type { JSX } from 'react';
import { ArrowUpRight, Wallet } from 'lucide-react';
import { RichStatCard } from './RichStatCard';
import { RecommendationsCard } from './RecommendationsCard';

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
  period: 'day' | 'week' | 'month' | 'year';
}

/**
 * サマリーカード群コンポーネント
 * - 総回収率カード
 * - 収支カード
 * - おすすめカード
 */
export const SummaryCards = ({
  summaryData,
  recommendations,
  period,
}: SummaryCardsProps): JSX.Element => {
  const top3 = [...recommendations].sort((a, b) => b.ev - a.ev).slice(0, 3);

  return (
    <div className='flex gap-x-[56px] gap-y-8 xl:gap-x-[72px] mb-16 xl:mb-20 items-stretch overflow-x-auto pb-4'>
      <div className='flex-shrink-0 w-[500px]'>
        <RichStatCard
          title='総回収率'
          icon={<ArrowUpRight size={22} />}
          value={`${summaryData.roi}%`}
          caption='参考。過去表示周期の推移'
          valueColor='#22c55e'
        />
      </div>
      <div className='flex-shrink-0 w-[500px]'>
        <RichStatCard
          title='収支'
          icon={<Wallet size={22} />}
          value={`${summaryData.profit >= 0 ? '+ ' : ''}¥${Math.abs(
            summaryData.profit
          ).toLocaleString()}`}
          caption='推移を下のグラフで確認'
          valueColor={summaryData.profit >= 0 ? '#22c55e' : '#f87171'}
        />
      </div>
      <div className='flex-shrink-0 w-[500px]'>
        <RecommendationsCard
          title='本日のおすすめ'
          icon={<ArrowUpRight size={16} />}
          items={top3.map((r) => ({ label: r.horse, ev: r.ev }))}
          color='#60a5fa'
        />
      </div>
    </div>
  );
};
