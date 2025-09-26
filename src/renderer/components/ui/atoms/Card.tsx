import type { JSX, ReactNode } from 'react';
import { memo } from 'react';
import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  Box,
  type SxProps,
  type Theme,
} from '@mui/material';
import { useThemeColor } from '@renderer/hooks/useThemeColor';

export interface CardProps {
  /** カードのタイトル */
  title?: string;
  /** カードのアイコン */
  icon?: ReactNode;
  /** カードのアクション部分（右上など） */
  action?: ReactNode;
  /** カードの内容 */
  children?: ReactNode;
  /** カードの高さ（デフォルト: 400px） */
  height?: number;
  /** カードのパディング（デフォルト: 3.5） */
  padding?: number;
  /** カードの背景色（テーマパレットキーまたはカラーコード） */
  backgroundColor?: string;
  /** カードの境界線色（テーマパレットキーまたはカラーコード） */
  borderColor?: string;
  /** カードの影の強さ（デフォルト: 0） */
  elevation?: number;
  /** カードの角丸（デフォルト: 10px） */
  borderRadius?: number | string;
  /** カードのクリックハンドラー */
  onClick?: () => void;
  /** カードのクラス名 */
  className?: string;
  /** カードのスタイル */
  sx?: SxProps<Theme>;
  /** メイン値の表示 */
  mainValue?: {
    icon?: ReactNode;
    value: string;
    iconColor?: string;
    fontSize?: number;
  };
  /** キャプション */
  caption?: string;
}

/**
 * 共通カードコンポーネント
 *
 * @description ガラス風デザインの再利用可能なカードコンポーネント
 * @param props - コンポーネントのプロパティ
 * @returns JSX.Element
 */
export const Card = memo(
  ({
    title,
    icon,
    action,
    children,
    height = 400,
    padding = 3.5,
    backgroundColor,
    borderColor,
    elevation = 0,
    borderRadius = '10px',
    onClick,
    className,
    sx = {},
    mainValue,
    caption,
  }: CardProps): JSX.Element => {
    // カスタムフックを使用して色を解決
    const resolvedBackgroundColor = useThemeColor(
      backgroundColor,
      'linear-gradient(180deg, rgba(30,41,59,0.72) 0%, rgba(30,41,59,0.46) 100%)'
    );

    const resolvedBorderColor = useThemeColor(
      borderColor,
      'rgba(148, 163, 184, .25)'
    );

    return (
      <MuiCard
        elevation={elevation}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        className={className}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius,
          p: padding,
          height,
          display: 'flex',
          flexDirection: 'column',
          background: resolvedBackgroundColor,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${resolvedBorderColor}`,
          boxShadow: '0 18px 48px rgba(2,6,23,.55)',
          color: 'text.primary',
          cursor: onClick ? 'pointer' : 'default',
          transition: 'all 0.2s ease',
          '&:hover': onClick
            ? {
                transform: 'translateY(-2px)',
                boxShadow: '0 24px 64px rgba(2,6,23,.7)',
              }
            : {},
          ...sx,
        }}
      >
        {/* ガラス効果のオーバーレイ */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 28%)',
          }}
        />

        {/* ヘッダー部分 */}
        {(() => {
          const shouldRenderHeader = title || icon || action;
          const headerContent = title ? (
            <Box
              sx={{
                fontSize: 42,
                fontWeight: 600,
                color: 'text.secondary',
                letterSpacing: 0.2,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              {icon && (
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(96, 165, 250, 0.2)',
                    color: 'primary.main',
                  }}
                >
                  {icon}
                </Box>
              )}
              {title}
            </Box>
          ) : undefined;

          return shouldRenderHeader ? (
            <CardHeader
              title={headerContent}
              action={action}
              sx={{ pb: 0, px: 0, pt: 0 }}
            />
          ) : null;
        })()}

        {/* コンテンツ部分 */}
        <CardContent
          sx={{
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'flex-start',
            minHeight: 0,
            overflow: 'hidden',
          }}
        >
          {/* メイン値表示 */}
          {mainValue && (
            <Box sx={{ my: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                {mainValue.icon && (
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: 9999,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `${mainValue.iconColor || 'primary.main'}33`,
                      color: mainValue.iconColor || 'primary.main',
                    }}
                  >
                    {mainValue.icon}
                  </Box>
                )}
                <Box
                  sx={{
                    fontSize: mainValue.fontSize || 42,
                    fontWeight: 900,
                    letterSpacing: -1,
                  }}
                >
                  {mainValue.value}
                </Box>
              </Box>
            </Box>
          )}

          {/* カスタムコンテンツ */}
          {children}

          {/* キャプション */}
          {caption && (
            <Box
              sx={{ fontSize: 12, color: 'text.secondary', marginTop: 0.75 }}
            >
              {caption}
            </Box>
          )}
        </CardContent>
      </MuiCard>
    );
  }
);

Card.displayName = 'Card';
