# purchaseFormTypes

購入フォーム関連の型定義

## 概要

購入フォームで使用する型定義を提供。馬券データ、購入フォームの Props、馬券選択の状態などを定義する。

## 型定義

### BetTicket

```typescript
interface BetTicket {
  id: string;
  type: string;
  method: string;
  horses: number[];
  amount: number;
  combinations: number;
  axisHorse?: number;
  opponentHorses?: string[];
  nagashiType?: string;
  columnHorses?: string[][];
}
```

馬券の型定義。

#### プロパティ

- `id`: 馬券の一意識別子
- `type`: 馬券種別
- `method`: 買い方
- `horses`: 選択された馬の配列
- `amount`: 購入金額
- `combinations`: 組み合わせ数
- `axisHorse`: 軸馬（流し買いの場合）
- `opponentHorses`: 相手馬（流し買いの場合）
- `nagashiType`: 流しタイプ
- `columnHorses`: 列ごとの馬（フォーメーション買いの場合）

### PurchaseFormProps

```typescript
interface PurchaseFormProps {
  horses: HorseData[];
  onPurchase: (tickets: BetTicket[]) => void;
  onCancel: () => void;
}
```

購入フォームの Props 型定義。

### BetSelectionFormProps

```typescript
interface BetSelectionFormProps {
  selectedBetType: string;
  selectedMethod: string;
  onBetTypeChange: (type: string) => void;
  onMethodChange: (method: string) => void;
}
```

馬券選択フォームの Props 型定義。

### HorseSelectorProps

```typescript
interface HorseSelectorProps {
  horses: HorseData[];
  selectedBetType: string;
  selectedMethod: string;
  columnHorses: (number | undefined)[][];
  onHorseSelect: (columnIndex: number, horseNumber: number) => void;
  axisHorse?: number;
  onAxisHorseChange?: (horseNumber: number) => void;
  nagashiType?: string;
  onNagashiTypeChange?: (type: string) => void;
}
```

馬選択テーブルの Props 型定義。

### PurchaseSummaryProps

```typescript
interface PurchaseSummaryProps {
  tickets: BetTicket[];
  totalAmount: number;
  onRemoveTicket: (id: string) => void;
}
```

購入サマリーの Props 型定義。

### ActionButtonsProps

```typescript
interface ActionButtonsProps {
  onPurchase: () => void;
  onCancel: () => void;
  disabled?: boolean;
}
```

アクションボタンの Props 型定義。

## 使用例

```typescript
import { BetTicket, PurchaseFormProps } from './purchaseFormTypes';

// 馬券データの作成
const ticket: BetTicket = {
  id: '1',
  type: 'quinella',
  method: 'box',
  horses: [1, 2, 3],
  amount: 1000,
  combinations: 3,
};

// 購入フォームのProps
const props: PurchaseFormProps = {
  horses: horseData,
  onPurchase: handlePurchase,
  onCancel: handleCancel,
};
```

## 関連ファイル

- `PurchaseForm.tsx`: メイン購入フォーム
- `BetSelectionForm.tsx`: 馬券選択フォーム
- `HorseSelector.tsx`: 馬選択テーブル
- `PurchaseSummary.tsx`: 購入サマリー
- `ActionButtons.tsx`: アクションボタン
