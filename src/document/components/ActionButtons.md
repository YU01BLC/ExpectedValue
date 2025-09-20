# ActionButtons

購入・キャンセルアクションボタンコンポーネント

## 概要

購入フォームのアクションボタン（購入・キャンセル）を提供するコンポーネント。

## Props

```typescript
interface ActionButtonsProps {
  onPurchase: () => void;
  onCancel: () => void;
  disabled?: boolean;
}
```

- `onPurchase`: 購入実行時のコールバック
- `onCancel`: キャンセル時のコールバック
- `disabled`: ボタンの無効化フラグ

## 機能

### ボタン表示

- 購入ボタン（プライマリ）
- キャンセルボタン（セカンダリ）

### 状態管理

- ボタンの有効/無効状態
- ローディング状態の表示

### レスポンシブ対応

- モバイル表示での適切なサイズ
- ボタン間の適切なスペーシング

## 使用例

```tsx
<ActionButtons
  onPurchase={handlePurchase}
  onCancel={handleCancel}
  disabled={!isValid}
/>
```

## 関連ファイル

- `PurchaseForm.tsx`: 親コンポーネント
