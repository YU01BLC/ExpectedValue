# RaceTable コンポーネント

## 概要

レース分析モーダルで使用される馬情報テーブルコンポーネントです。ソート機能付きのテーブルで馬の詳細情報を表示します。

## 機能

- 馬情報の一覧表示
- 各カラムでのソート機能（昇順・降順）
- 評価カラーの表示（S/A/B/C/D）
- 枠番の色分け表示（netkeiba 風）
- 多言語対応

## Props

```typescript
interface RaceTableProps {
  horseData: HorseData[]; // 馬情報の配列
  sortField: SortField | null; // 現在のソートフィールド
  sortDirection: SortDirection; // ソート方向（asc/desc）
  onSort: (field: SortField) => void; // ソート処理のコールバック
}
```

## データ型

```typescript
interface HorseData {
  id: string; // 馬のID
  name: string; // 馬名
  horseNumber: number; // 馬番
  gateNumber: number; // 枠番
  evaluation: 'S' | 'A' | 'B' | 'C' | 'D'; // 評価
  expectedValue: number; // 期待値
  odds: number; // オッズ
  comment: string; // コメント
}
```

## ソート機能

以下のフィールドでソートが可能です：

- `horseNumber`: 馬番
- `gateNumber`: 枠番
- `evaluation`: 評価（S > A > B > C > D の順）
- `expectedValue`: 期待値
- `odds`: オッズ

## テーマカラー

- 評価カラーはテーマの `palette.evaluation` から取得
- 枠番カラーはテーマの `palette.gate` から取得

## 多言語対応

翻訳キーは `common` ネームスペースから取得：

- `table.gateNumber`: 枠番
- `table.horseNumber`: 馬番
- `table.horseName`: 馬名
- `table.evaluation`: 評価
- `table.expectedValue`: 期待値
- `table.odds`: オッズ
- `table.comment`: コメント

## 使用例

```tsx
<RaceTable
  horseData={mockHorseData}
  sortField={sortField}
  sortDirection={sortDirection}
  onSort={handleSort}
/>
```
