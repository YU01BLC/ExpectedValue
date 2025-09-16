# Dashboard 詳細ドキュメント

## 概要

`index.tsx`は、アプリケーションの**メインダッシュボード**を担当するページコンポーネントです。回収率の統計情報、収支データ、おすすめの馬券情報、および回収率推移チャートを表示します。

## なぜこのコンポーネントが必要なのか？

### 1. データの可視化

- 回収率の統計情報を一目で確認
- 収支の推移を視覚的に表示
- おすすめの馬券情報を提供

### 2. ユーザビリティの向上

- 期間別のデータ表示（日/週/月/年）
- インタラクティブなチャート
- 直感的なデータ操作

### 3. 意思決定支援

- 期待値の高い馬券を推薦
- 過去のパフォーマンスを分析
- データに基づいた判断を支援

## コンポーネントの詳細

### インポート文の説明

```typescript
import { useState } from 'react';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { SummaryCards } from './components/SummaryCards';
import { ChartCard } from './components/ChartCard';
```

**各インポートの役割:**

#### `useState`

- **目的**: 期間選択の状態管理
- **型**: `'day' | 'week' | 'month' | 'year'`
- **デフォルト値**: `'day'`

#### `useTranslation`

- **目的**: 多言語対応の翻訳フック
- **namespace**: `['common', 'dashboard']`
- **機能**: ハードコードされたテキストを翻訳キーに置き換え

#### `SummaryCards`

- **目的**: サマリーカード群の表示
- **機能**: 総回収率、収支、おすすめカード

#### `ChartCard`

- **目的**: 回収率推移チャートの表示
- **機能**: 期間切り替えタブ付きチャート

### 定数定義

```typescript
const DEFAULT_PERIOD = 'day' as const;
const SAMPLE_DATA = {
  ROI: {
    DAY: 105,
    WEEK: 98,
    MONTH: 112,
    YEAR: 102,
  },
  PROFIT: {
    DAY: 12000,
    WEEK: -5000,
    MONTH: 30000,
    YEAR: 15000,
  },
} as const;
```

**設計思想:**

- マジックナンバーを定数として抽出
- 型安全性を確保（`as const`）
- 保守性の向上

### データ構造

#### ダッシュボードサマリーデータ

```typescript
const dashboardSummaryData: Record<
  'day' | 'week' | 'month' | 'year',
  { roi: number; profit: number }
> = {
  day: { roi: SAMPLE_DATA.ROI.DAY, profit: SAMPLE_DATA.PROFIT.DAY },
  week: { roi: SAMPLE_DATA.ROI.WEEK, profit: SAMPLE_DATA.PROFIT.WEEK },
  month: { roi: SAMPLE_DATA.ROI.MONTH, profit: SAMPLE_DATA.PROFIT.MONTH },
  year: { roi: SAMPLE_DATA.ROI.YEAR, profit: SAMPLE_DATA.PROFIT.YEAR },
};
```

#### 回収率チャートデータ

```typescript
const roiChartData: Record<
  'day' | 'week' | 'month' | 'year',
  Array<{ t: string; rate: number }>
> = {
  // 期間別のチャートデータ
};
```

#### おすすめデータ

```typescript
const horseRecommendations: Record<
  'day' | 'week' | 'month' | 'year',
  Array<{
    race: string;
    horse: string;
    bet: string;
    odds: number;
    ev: number;
  }>
> = {
  // 期間別のおすすめ馬券データ
};
```

## 多言語対応

### 翻訳キーの使用

```typescript
<h1 className='text-6xl font-black tracking-tight mb-2'>
  {t('common:app.title')}
</h1>
<p className='text-slate-300'>{t('common:app.subtitle')}</p>
```

**翻訳キー:**

- `common:app.title`: "Expected Value Tracker"
- `common:app.subtitle`: "回収率を最大化するためのダッシュボード"

### 翻訳ファイル構造

```
src/renderer/i18n/
├── ja/
│   ├── common.json
│   └── dashboard.json
└── en/
    ├── common.json
    └── dashboard.json
```

## コンポーネント構成

### 1. ヘッダー部分

```typescript
<header className='mb-8'>
  <h1 className='text-6xl font-black tracking-tight mb-2'>
    {t('common:app.title')}
  </h1>
  <p className='text-slate-300'>{t('common:app.subtitle')}</p>
</header>
```

**スタイリング:**

- `text-6xl`: 大きなフォントサイズ
- `font-black`: 最太のフォントウェイト
- `tracking-tight`: 文字間隔を狭く
- `mb-8`: 下マージン 2rem

### 2. サマリーカード群

```typescript
<SummaryCards
  summaryData={dashboardSummaryData[period]}
  recommendations={horseRecommendations[period]}
  period={period}
/>
```

**機能:**

- 総回収率カード
- 収支カード
- おすすめカード

### 3. チャートカード

```typescript
<ChartCard
  data={roiChartData[period]}
  period={period}
  onPeriodChange={setPeriod}
/>
```

**機能:**

- 回収率推移グラフ
- 期間切り替えタブ
- インタラクティブな操作

## 設計思想

### 1. データ駆動

- 期間別のデータを一元管理
- 定数を使用してマジックナンバーを排除
- 型安全性を確保

### 2. 多言語対応

- ハードコードされたテキストを排除
- 翻訳キーを使用した国際化
- 保守性の向上

### 3. コンポーネント分離

- 機能ごとにコンポーネントを分割
- 再利用性を考慮した設計
- 責務の明確化

## 状態管理

### 期間選択状態

```typescript
const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>(
  DEFAULT_PERIOD
);
```

**特徴:**

- 型安全な状態管理
- デフォルト値の定数化
- 期間変更時の自動再レンダリング

## パフォーマンス考慮

### 1. メモ化

- `SummaryCards`と`ChartCard`でメモ化を適用
- 不要な再レンダリングを防止

### 2. データ構造

- 期間別データを事前計算
- リアルタイム計算を避ける

## 将来の拡張予定

### 1. リアルタイムデータ

```typescript
// WebSocket を使用したリアルタイム更新
const useRealtimeData = () => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };
    return () => ws.close();
  }, []);

  return data;
};
```

### 2. データ永続化

```typescript
// ローカルストレージを使用したデータ永続化
const usePersistedData = (key: string, initialValue: any) => {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return [data, setData];
};
```

### 3. エラーハンドリング

```typescript
// エラー境界を使用したエラーハンドリング
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <div>エラーが発生しました</div>;
  }

  return children;
};
```

## 注意点

### 1. データの整合性

- 期間変更時にデータが正しく更新されることを確認
- 型安全性を維持

### 2. パフォーマンス

- 大量のデータがある場合の表示最適化
- メモ化の適切な使用

### 3. アクセシビリティ

- スクリーンリーダー対応
- キーボードナビゲーション対応

## 関連ファイル

- `src/renderer/features/dashboard/components/SummaryCards.tsx`: サマリーカード群
- `src/renderer/features/dashboard/components/ChartCard.tsx`: チャートカード
- `src/renderer/i18n/ja/dashboard.json`: 日本語翻訳
- `src/renderer/i18n/en/dashboard.json`: 英語翻訳
- `src/renderer/theme/theme.ts`: MUI テーマ設定

## テスト戦略

### 1. レンダリングテスト

```typescript
it('ダッシュボードが正しく表示されること', () => {
  render(<Dashboard />);
  expect(screen.getByText('Expected Value Tracker')).toBeInTheDocument();
});
```

### 2. 期間切り替えテスト

```typescript
it('期間切り替えが正しく動作すること', async () => {
  const user = userEvent.setup();
  render(<Dashboard />);

  await user.click(screen.getByText('週'));
  expect(screen.getByText('98%')).toBeInTheDocument();
});
```

### 3. 多言語テスト

```typescript
it('翻訳が正しく表示されること', () => {
  render(<Dashboard />);
  expect(screen.getByText('Expected Value Tracker')).toBeInTheDocument();
});
```
