import { memo } from 'react';
import type { JSX, ReactNode } from 'react';
import { Card, CardContent } from '@mui/material';

interface RichStatCardProps {
  title: string;
  icon: ReactNode;
  value: string;
  caption?: string;
  valueColor?: string;
}

/**
 * MUI製のリッチカード（ガラス風 / 角丸 / 強い影 / グラデ）
 */
export const RichStatCard = memo(
  ({
    title,
    icon,
    value,
    caption,
    valueColor = '#22c55e',
  }: RichStatCardProps): JSX.Element => {
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
        <CardContent
          sx={{
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <div style={{ marginBottom: 8 }}>
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: '#9fb0c7',
                letterSpacing: 0.2,
                marginBottom: 10,
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
                  background: `${valueColor}33`,
                  color: valueColor,
                }}
              >
                {icon}
              </div>
              <div style={{ fontSize: 64, fontWeight: 900, letterSpacing: -1 }}>
                {value}
              </div>
            </div>
          </div>
          {caption ? (
            <div style={{ fontSize: 12, color: '#aeb9c9', marginTop: 6 }}>
              {caption}
            </div>
          ) : null}
        </CardContent>
      </Card>
    );
  }
);

RichStatCard.displayName = 'RichStatCard';
