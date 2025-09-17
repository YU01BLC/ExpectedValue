# DualScatterChartCard コンポーネント

## 概要

期待値 × 評価の散布図を表示するカスタムチャートコンポーネントです。馬番を色分けした円形で表示し、ホバー時に詳細情報を表示します。

## 機能

- 期待値 × 評価の散布図表示
- 馬番の色分け表示（枠番の色を使用）
- カスタムツールチップ
- 動的な高さ調整
- レスポンシブ対応
- 馬番の ① 形状表示

## Props

```typescript
interface DualScatterChartCardProps {
  title: string; // チャートのタイトル
  leftData: ScatterData[]; // 左側のデータ
  rightData: ScatterData[]; // 右側のデータ（現在は未使用）
  leftTitle: string; // 左側のタイトル
  rightTitle: string; // 右側のタイトル
  xAxisName: string; // X軸の名前
  yAxisName: string; // Y軸の名前
  leftColor: string; // 左側の色
  rightColor: string; // 右側の色
  height?: number; // 高さ（デフォルト: 600）
}
```

## データ型

```typescript
interface ScatterData {
  x: number; // 期待値
  y: number; // 評価（1-5）
  horseNumber: number; // 馬番
  gateNumber: number; // 枠番
  name: string; // 馬名
  evaluation: string; // 評価（S/A/B/C/D）
}
```

## 表示機能

### 散布図の表示

- X 軸: 期待値（0-2 の範囲）
- Y 軸: 評価（1-5 の範囲）
- データポイント: 馬番を色分けした円形

### 馬番の表示

- 枠番の色で円形の背景
- 馬番を中央に表示
- ① の形状で視覚的に強調

### ツールチップ

- ホバー時に馬名、馬番、期待値、評価を表示
- カスタム HTML 要素で実装
- モーダル上に表示されるよう z-index 調整

## 動的高さ調整

データの範囲に基づいて高さを動的に計算：

```typescript
const calculateDynamicHeight = () => {
  const margin = 80;
  const minHeight = Math.min(height, 400);
  const maxHeight = Math.max(height, 800);
  const dataHeight = (maxY - minY) * 60;
  const calculatedHeight = Math.max(minHeight, margin + dataHeight + margin);
  return Math.min(calculatedHeight, maxHeight);
};
```

## レスポンシブ対応

- スマホ: 最小 400px 高さ
- タブレット: 中間サイズ
- デスクトップ: 最大 800px 高さ

## スタイリング

- ガラス風のカードデザイン
- カスタムスクロールバー
- 枠番の色分け表示
- 影付きの円形要素

## 使用例

```tsx
<DualScatterChartCard
  title='期待値×評価分析'
  leftData={scatterData}
  rightData={[]}
  leftTitle='期待値×評価'
  rightTitle=''
  xAxisName='期待値'
  yAxisName='評価'
  leftColor={colors.primary}
  rightColor={colors.secondary}
  height={600}
/>
```

## 注意事項

- 右側のデータは現在未使用
- 馬番の表示はカスタム SVG 要素で実装
- ツールチップは手動で DOM 操作
- テーマカラーを使用して色分けを実装
