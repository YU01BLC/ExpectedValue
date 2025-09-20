# PurchaseSummary

購入内容サマリーコンポーネント

## 概要

選択した馬券の購入内容を表示するサマリーコンポーネント。馬券の詳細、組み合わせ数、購入金額を表示する。

## Props

```typescript
interface PurchaseSummaryProps {
  tickets: BetTicket[];
  totalAmount: number;
  onRemoveTicket: (id: string) => void;
}
```

- `tickets`: 購入する馬券の配列
- `totalAmount`: 合計購入金額
- `onRemoveTicket`: 馬券削除時のコールバック

## 機能

### 馬券表示

- 馬券種別と買い方の表示
- 選択された馬の表示
- 組み合わせ数の表示
- 購入金額の表示

### 馬券管理

- 個別馬券の削除機能
- 合計金額の自動計算

### レスポンシブ対応

- モバイル表示でのコンパクトなレイアウト
- 長い馬券情報の適切な表示

## 使用例

```tsx
<PurchaseSummary
  tickets={selectedTickets}
  totalAmount={totalAmount}
  onRemoveTicket={handleRemoveTicket}
/>
```

## 関連ファイル

- `pointCalculator.ts`: 組み合わせ数計算
- `combinationGenerator.ts`: 組み合わせ生成
