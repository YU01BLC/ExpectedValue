import { memo } from 'react';
import type { JSX, ReactNode } from 'react';
import { Card } from './atoms/Card';
import { useThemeColor } from '@renderer/hooks/useThemeColor';

interface RichStatCardProps {
  title: string;
  icon: ReactNode;
  value: string;
  caption?: string;
  valueColor?: string;
}

/**
 * 統計カードコンポーネント
 *
 * @description 共通Cardベースの統計表示カード
 * @param props - コンポーネントのプロパティ
 * @param props.title - カードタイトル
 * @param props.icon - アイコン
 * @param props.value - 表示値
 * @param props.caption - キャプション（オプション）
 * @param props.valueColor - 値の色（デフォルト: secondary.main）
 * @returns JSX.Element
 */
export const RichStatCard = memo(
  ({
    title,
    icon,
    value,
    caption,
    valueColor = 'secondary.main',
  }: RichStatCardProps): JSX.Element => {
    const resolvedColor = useThemeColor(valueColor, valueColor);

    return (
      <Card
        title={title}
        icon={icon}
        mainValue={{
          icon,
          value,
          iconColor: resolvedColor,
          fontSize: 42,
        }}
        caption={caption}
      />
    );
  }
);

RichStatCard.displayName = 'RichStatCard';
