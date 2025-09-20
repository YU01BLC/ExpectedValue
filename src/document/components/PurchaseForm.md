# PurchaseForm

馬券購入フォームのメインコンポーネント

## 概要

レース分析結果に基づいて馬券を購入するためのフォームコンポーネント。馬券種別の選択、馬の選択、購入金額の入力、購入内容の確認・実行を行う。

## Props

```typescript
interface PurchaseFormProps {
  horses: HorseData[];
  onPurchase: (tickets: BetTicket[]) => void;
  onCancel: () => void;
}
```

- `horses`: 馬データの配列
- `onPurchase`: 購入実行時のコールバック関数
- `onCancel`: キャンセル時のコールバック関数

## 機能

### 馬券選択

- 馬券種別（単勝、馬連、3 連複など）の選択
- 買い方（単複、流し、フォーメーション、ボックス）の選択
- 馬の選択（netkeiba スタイルのテーブル形式）

### 購入管理

- 選択した馬券の組み合わせ数計算
- 購入金額の入力とバリデーション
- 購入内容のサマリー表示
- 購入実行・キャンセル操作

### レスポンシブ対応

- モバイル・タブレット・デスクトップに対応
- 画面サイズに応じたレイアウト調整

## 使用例

```tsx
<PurchaseForm
  horses={horseData}
  onPurchase={handlePurchase}
  onCancel={handleCancel}
/>
```

## 関連コンポーネント

- `BetSelectionForm`: 馬券種別・買い方選択
- `HorseSelector`: 馬選択テーブル
- `PurchaseSummary`: 購入内容サマリー
- `ActionButtons`: 購入・キャンセルボタン
