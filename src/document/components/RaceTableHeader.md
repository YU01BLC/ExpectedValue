# RaceTableHeader コンポーネント

## 概要

レーステーブルのヘッダー部分を表示し、ソート機能を提供するコンポーネントです。MUI の TableSortLabel を使用してソート可能な列にソート機能を実装し、テーマカラーを使用してスタイリングを行います。

## 機能

- **ソート機能**: 各列のヘッダーをクリックしてソートを実行
- **テーマ統合**: テーマカラーを使用したスタイリング
- **多言語対応**: 翻訳キーを使用したテキスト表示
- **レスポンシブ対応**: 各列の幅を適切に設定

## Props

| プロパティ      | 型                           | 必須 | 説明                           |
| --------------- | ---------------------------- | ---- | ------------------------------ |
| `sortField`     | `SortField \| null`          | ✅   | 現在のソート対象フィールド     |
| `sortDirection` | `'asc' \| 'desc'`            | ✅   | ソート方向                     |
| `onSort`        | `(field: SortField) => void` | ✅   | ソート実行時のコールバック関数 |

## ソート可能な列

- **枠番** (`gateNumber`): 枠番でソート
- **馬番** (`horseNumber`): 馬番でソート
- **評価** (`evaluation`): 評価（S, A, B, C, D）でソート
- **期待値** (`expectedValue`): 期待値でソート
- **オッズ** (`odds`): オッズでソート

## スタイリング

### テーマカラー使用

コンポーネントは以下のテーマカラーを使用します：

```typescript
theme.palette.table.header = {
  background: 'rgba(0, 0, 0, 0.6)',
  text: 'white',
  border: 'rgba(255, 255, 255, 0.3)',
  shadow: 'rgba(0, 0, 0, 0.3)',
};
```

### 共通スタイル

- **ヘッダーセル**: 共通の`headerCellStyle`オブジェクトを使用
- **ソートラベル**: 共通の`sortLabelStyle`オブジェクトを使用
- **DRY 原則**: スタイルの重複を排除し、保守性を向上

## 使用例

```tsx
import { RaceTableHeader } from '@/components/ui/atoms/table/RaceTableHeader';

const MyComponent = () => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <RaceTableHeader
      sortField={sortField}
      sortDirection={sortDirection}
      onSort={handleSort}
    />
  );
};
```

## 実装の特徴

### 1. テーマ統合

- 直接カラーコード指定を避け、テーマカラーを使用
- ダークモード/ライトモード対応が容易

### 2. 保守性の向上

- スタイルの一元管理
- DRY 原則の適用
- 型安全性の確保

### 3. アクセシビリティ

- 適切な ARIA 属性の設定
- キーボードナビゲーション対応
- スクリーンリーダー対応

## 依存関係

- `@mui/material`: MUI コンポーネント
- `react-i18next`: 多言語対応
- `../types/raceTable`: 型定義

## 関連コンポーネント

- `RaceTable`: メインのテーブルコンポーネント
- `RaceTableBody`: テーブルのボディ部分
- `RaceTableResponsive`: レスポンシブ対応テーブル

## 更新履歴

- **2024-01-XX**: 初回作成
- **2024-01-XX**: テーマ統合とスタイル共通化を実装
- **2024-01-XX**: TSDoc コメントを追加
