# HorseSelector

馬選択テーブルコンポーネント

## 概要

netkeiba スタイルの馬選択テーブルを提供するコンポーネント。馬券種別と買い方に応じて適切な選択 UI を表示する。

## Props

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

- `horses`: 馬データの配列
- `selectedBetType`: 選択中の馬券種別
- `selectedMethod`: 選択中の買い方
- `columnHorses`: 選択された馬の配列
- `onHorseSelect`: 馬選択時のコールバック
- `axisHorse`: 軸馬（流し買いの場合）
- `onAxisHorseChange`: 軸馬変更時のコールバック
- `nagashiType`: 流しタイプ
- `onNagashiTypeChange`: 流しタイプ変更時のコールバック

## 機能

### 馬選択テーブル

- 馬番、馬名、選択列を表示
- 枠番の色分け表示（netkeiba 仕様）
- チェックボックスによる選択

### 流し買い対応

- 軸馬選択テーブル
- 相手馬選択テーブル
- 流しタイプの選択

### レスポンシブ対応

- モバイル表示での横スクロール
- テーブルの適切なサイズ調整

## 使用例

```tsx
<HorseSelector
  horses={horseData}
  selectedBetType={betType}
  selectedMethod={method}
  columnHorses={selectedHorses}
  onHorseSelect={handleHorseSelect}
  axisHorse={axisHorse}
  onAxisHorseChange={handleAxisHorseChange}
  nagashiType={nagashiType}
  onNagashiTypeChange={handleNagashiTypeChange}
/>
```

## 関連ファイル

- `raceTableUtils.ts`: 枠番の色分けロジック
- `themeColors.ts`: テーマカラー定義
