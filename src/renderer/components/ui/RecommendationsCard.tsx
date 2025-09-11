import type { JSX, ReactNode } from 'react';
import { Card, CardContent } from '@mui/material';

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

export const RecommendationsCard = ({
  title,
  icon,
  items,
  color = '#60a5fa',
}: RecommendationsCardProps): JSX.Element => {
  return (
    <Card
      elevation={0}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '28px',
        p: 3.5,
        minHeight: 168,
        display: 'flex',
        background:
          'linear-gradient(180deg, rgba(30,41,59,0.72) 0%, rgba(30,41,59,0.46) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(148, 163, 184, .25)',
        boxShadow: '0 18px 48px rgba(2,6,23,.55)',
        color: '#e2e8f0',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 28%)',
        }}
      />
      <CardContent sx={{ p: 0, display: 'grid', gap: 1.5 }}>
        <div style={{ display: 'grid', gap: 10 }}>
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: '#9fb0c7',
              letterSpacing: 0.2,
            }}
          >
            {title}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `${color}33`,
                color,
              }}
            >
              {icon}
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: -0.5 }}>
              {items[0]?.label ?? ''}
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 6, marginTop: 6 }}>
          {items.map((it, idx) => (
            <div
              key={`${it.label}-${idx}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 12,
                color: '#aeb9c9',
              }}
            >
              <span style={{ opacity: 0.9 }}>{`${idx + 1}. ${it.label}`}</span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '2px 8px',
                  borderRadius: 9999,
                  border: `1px solid ${color}66`,
                  background: `${color}14`,
                  color: '#dbeafe',
                  fontWeight: 700,
                }}
              >
                EV {it.ev.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
