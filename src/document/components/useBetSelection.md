# useBetSelection

馬券選択カスタムフック

## 概要

購入フォームでの馬券選択状態を管理するカスタムフック。馬券種別、買い方、馬の選択状態を統合的に管理する。

## 戻り値

```typescript
interface UseBetSelectionReturn {
  selectedBetType: string;
  selectedMethod: string;
  columnHorses: (number | undefined)[][];
  axisHorse: number | undefined;
  nagashiType: string;
  setSelectedBetType: (type: string) => void;
  setSelectedMethod: (method: string) => void;
  setColumnHorses: (horses: (number | undefined)[][]) => void;
  setAxisHorse: (horse: number | undefined) => void;
  setNagashiType: (type: string) => void;
  resetSelection: () => void;
}
```

### 状態

- `selectedBetType`: 選択中の馬券種別
- `selectedMethod`: 選択中の買い方
- `columnHorses`: 選択された馬の配列
- `axisHorse`: 軸馬（流し買いの場合）
- `nagashiType`: 流しタイプ

### アクション

- `setSelectedBetType`: 馬券種別の設定
- `setSelectedMethod`: 買い方の設定
- `setColumnHorses`: 馬選択の設定
- `setAxisHorse`: 軸馬の設定
- `setNagashiType`: 流しタイプの設定
- `resetSelection`: 選択状態のリセット

## 機能

### 状態管理

- 馬券種別と買い方の連動管理
- 馬選択状態の管理
- 流し買いの軸馬管理

### バリデーション

- 選択内容の妥当性チェック
- 馬券種別に応じた買い方の制限

### リセット機能

- 選択状態の一括リセット
- 初期状態への復帰

## 使用例

```typescript
import { useBetSelection } from './useBetSelection';

function PurchaseForm() {
  const {
    selectedBetType,
    selectedMethod,
    columnHorses,
    axisHorse,
    nagashiType,
    setSelectedBetType,
    setSelectedMethod,
    setColumnHorses,
    setAxisHorse,
    setNagashiType,
    resetSelection
  } = useBetSelection();

  // 馬券種別の変更
  const handleBetTypeChange = (type: string) => {
    setSelectedBetType(type);
    // 買い方のリセット
    setSelectedMethod('single');
  };

  // 馬選択の変更
  const handleHorseSelect = (columnIndex: number, horseNumber: number) => {
    const newHorses = [...columnHorses];
    newHorses[columnIndex] = [...(newHorses[columnIndex] || [])];
    // 馬の選択/解除ロジック
    setColumnHorses(newHorses);
  };

  return (
    // フォームのJSX
  );
}
```

## 関連ファイル

- `PurchaseForm.tsx`: メイン購入フォーム
- `BetSelectionForm.tsx`: 馬券選択フォーム
- `HorseSelector.tsx`: 馬選択テーブル
