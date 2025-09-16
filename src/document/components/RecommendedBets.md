# RecommendedBets コンポーネント

## 概要

推奨買い目を表示するコンポーネントです。馬券の種類、対象馬、投資金額を一覧表示します。

## 機能

- 推奨買い目の一覧表示
- 馬券種類別の表示
- 投資金額の表示（カンマ区切り）
- シンプルなレイアウト

## Props

```typescript
interface RecommendedBetsProps {
  recommendedBets: RecommendedBet[]; // 推奨買い目の配列
}
```

## データ型

```typescript
interface RecommendedBet {
  type: string; // 馬券の種類（単勝、馬連、3連複など）
  horses: string[]; // 対象馬の配列
  amount: number; // 投資金額
}
```

## 表示形式

- 馬券種類: 対象馬 - 投資金額
- 例: "単勝: サンデーレーサー - ¥10,000"

## スタイリング

- フレックスレイアウト
- テーマカラーを使用
- レスポンシブ対応

## 使用例

```tsx
const recommendedBets = [
  { type: '単勝', horses: ['サンデーレーサー'], amount: 10000 },
  {
    type: '馬連',
    horses: ['サンデーレーサー', 'トウカイテイオー'],
    amount: 5000,
  },
];

<RecommendedBets recommendedBets={recommendedBets} />;
```

## 注意事項

- 多言語対応は未実装（今後の課題）
- 金額の表示形式は固定（カンマ区切り）
