# BetSelectionForm

馬券種別と買い方の選択フォーム

## 概要

馬券の種別（単勝、馬連、3 連複など）と買い方（単複、流し、フォーメーション、ボックス）を選択するフォームコンポーネント。

## Props

```typescript
interface BetSelectionFormProps {
  selectedBetType: string;
  selectedMethod: string;
  onBetTypeChange: (type: string) => void;
  onMethodChange: (method: string) => void;
}
```

- `selectedBetType`: 選択中の馬券種別
- `selectedMethod`: 選択中の買い方
- `onBetTypeChange`: 馬券種別変更時のコールバック
- `onMethodChange`: 買い方変更時のコールバック

## 機能

### 馬券種別選択

- 単勝、馬連、3 連複、3 連単、ワイドなどの選択
- 選択に応じた買い方の制限

### 買い方選択

- 単複、流し、フォーメーション、ボックスの選択
- 馬券種別に応じた買い方の表示制御

### レスポンシブ対応

- モバイル表示でのコンパクトなレイアウト
- セレクトボックスの適切なサイズ調整

## 使用例

```tsx
<BetSelectionForm
  selectedBetType={betType}
  selectedMethod={method}
  onBetTypeChange={handleBetTypeChange}
  onMethodChange={handleMethodChange}
/>
```

## 関連ファイル

- `betConfig.ts`: 馬券種別と買い方の設定
- `validation.ts`: 選択内容のバリデーション
