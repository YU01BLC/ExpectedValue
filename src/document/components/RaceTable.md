# RaceTableResponsive コンポーネント

## 概要

レース分析モーダルで使用される馬情報テーブルコンポーネントです。デスクトップではテーブル表示、モバイルではアコーディオン表示に切り替わるレスポンシブ対応のコンポーネントです。

## 機能

- レスポンシブ表示（デスクトップ：テーブル、モバイル：アコーディオン）
- 各カラムでのソート機能（昇順・降順）
- 評価カラーの表示（S/A/B/C/D）
- 枠番の色分け表示（netkeiba 風）
- 馬の詳細情報モーダル表示
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

## 表示モード

### デスクトップ表示（md 以上）

- 従来のテーブル形式で表示
- ヘッダークリックでソート機能
- 全カラムが横並びで表示

### モバイル表示（xs〜sm）

- アコーディオン形式で表示
- ソートボタンでソート機能
- 枠番と馬番を組み合わせた円形表示
- 馬名とオッズを並列表示
- タップで詳細モーダル表示

## ソート機能

以下のフィールドでソートが可能です：

- `horseNumber`: 馬番
- `gateNumber`: 枠番
- `evaluation`: 評価（S > A > B > C > D の順）
- `expectedValue`: 期待値
- `odds`: オッズ

### モバイル表示でのソート

- 馬番、オッズ、期待値のソートボタンを提供
- 現在のソート項目は強調表示
- 昇順/降順の矢印で状態を表示

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

## 詳細モーダル

モバイル表示で馬をタップすると詳細モーダルが表示されます：

- 馬の全情報を整理して表示
- 枠番、馬番、評価を色分けで表示
- 馬番は ① の形状で表示
- 全要素のサイズと位置を統一

## 使用例

```tsx
<RaceTableResponsive
  horseData={mockHorseData}
  sortField={sortField}
  sortDirection={sortDirection}
  onSort={handleSort}
/>
```
