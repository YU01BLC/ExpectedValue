import type { JSX, ReactNode } from 'react';
import { memo } from 'react';
import { Box } from '@mui/material';
import { Card } from './atoms/Card';

interface RecommendationItem {
  label: string;
  ev: number;
}

interface RecommendationsCardProps {
  title: string;
  icon: ReactNode;
  items: RecommendationItem[];
  color?: string; // 主色（アイコンとバッジ枠）
}

/**
 * おすすめカードコンポーネント
 *
 * @description 共通Cardベースのおすすめ表示カード
 * @param props - コンポーネントのプロパティ
 * @param props.title - カードタイトル
 * @param props.icon - アイコン
 * @param props.items - おすすめアイテムリスト
 * @param props.color - 主色（デフォルト: #60a5fa）
 * @returns JSX.Element
 */
export const RecommendationsCard = memo(
  ({
    title,
    icon,
    items,
    color = '#60a5fa',
  }: RecommendationsCardProps): JSX.Element => {
    return (
      <Card
        title={title}
        icon={icon}
        mainValue={{
          icon,
          value: items[0]?.label ?? '',
          iconColor: color,
          fontSize: 42,
        }}
        height={400}
      >
        <Box
          sx={{
            fontSize: 12,
            color: 'text.secondary',
            marginTop: 2,
            flex: 1,
            overflowY: 'auto',
            paddingRight: 0.5,
            maxHeight: '200px',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'rgba(255, 255, 255, 0.5)',
            },
          }}
        >
          <Box sx={{ display: 'grid', gap: 1.5 }}>
            {items.map((it, idx) => (
              <Box
                key={`${it.label}-${idx}`}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 14,
                  color: 'text.secondary',
                  padding: 1.5,
                  borderRadius: 2,
                  background: 'rgba(96, 165, 250, 0.05)',
                  border: `1px solid ${color}20`,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: 'rgba(96, 165, 250, 0.1)',
                    border: `1px solid ${color}40`,
                  },
                }}
              >
                <Box component='span' sx={{ opacity: 0.9, fontWeight: 500 }}>
                  {`${idx + 1}. ${it.label}`}
                </Box>
                <Box
                  component='span'
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.75,
                    padding: '4px 12px',
                    borderRadius: 9999,
                    border: `1px solid ${color}66`,
                    background: `${color}14`,
                    color: 'primary.light',
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  EV {it.ev.toFixed(2)}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Card>
    );
  }
);

RecommendationsCard.displayName = 'RecommendationsCard';
