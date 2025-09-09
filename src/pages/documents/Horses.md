# Horses.tsx 詳細ドキュメント

## 概要

`Horses.tsx`は、**出走馬一覧**を表示するページコンポーネントです。現在はダミーデータを使用していますが、将来的には実際の馬データを表示し、評価、勝率、オッズ、期待値などの情報を管理します。

## なぜこのコンポーネントが必要なのか？

### 1. データの可視化

- 複数の馬の情報を一覧で表示
- 比較しやすい形式でデータを提示
- ユーザーが判断しやすい情報を提供

### 2. 期待値分析の基盤

- 各馬の評価、勝率、オッズを表示
- 期待値（EV）の計算結果を表示
- 投資判断のための情報を提供

### 3. データ管理の起点

- 馬データの CRUD 操作の起点
- データの更新・削除・追加のインターフェース
- 将来的なデータベース連携の基盤

## コンポーネントの詳細

### ダミーデータの定義

```typescript
const mockData = [
  { num: 1, name: 'サンプルA', rank: 'A', prob: 0.32, odds: 1.8, ev: 0.95 },
  { num: 2, name: 'サンプルB', rank: 'S', prob: 0.18, odds: 7.2, ev: 1.3 },
];
```

**データ構造の説明:**

#### `num`（枠番）

- **型**: `number`
- **目的**: 馬の枠番を表す
- **範囲**: 通常 1-18（競馬の枠番）
- **用途**: レースでの識別子

#### `name`（馬名）

- **型**: `string`
- **目的**: 馬の名前を表す
- **例**: 'サンプル A', 'サンプル B'
- **用途**: ユーザーが識別しやすい名前

#### `rank`（評価）

- **型**: `string`
- **目的**: 馬の評価ランクを表す
- **値**: 'S', 'A', 'B', 'C'など
- **用途**: 馬の能力を簡潔に表現

#### `prob`（勝率）

- **型**: `number`
- **目的**: 馬の勝率を表す
- **範囲**: 0.0 - 1.0
- **例**: 0.32 = 32%の勝率
- **用途**: 期待値計算の基盤

#### `odds`（オッズ）

- **型**: `number`
- **目的**: 馬のオッズを表す
- **例**: 1.8 = 1.8 倍のオッズ
- **用途**: 期待値計算の基盤

#### `ev`（期待値）

- **型**: `number`
- **目的**: 期待値を表す
- **計算式**: `prob * odds`
- **例**: 0.32 \* 1.8 = 0.576
- **用途**: 投資判断の指標

### コンポーネント実装の詳細

```typescript
const Horses = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>出走馬一覧（ダミーデータ）</h2>
      <div className='overflow-auto bg-white rounded border'>
        <table className='w-full table-auto'>
          {/* テーブルヘッダー */}
          <thead className='text-left bg-slate-100'>
            <tr>
              <th className='p-2'>枠</th>
              <th className='p-2'>馬名</th>
              <th className='p-2'>評価</th>
              <th className='p-2'>勝率</th>
              <th className='p-2'>オッズ</th>
              <th className='p-2'>EV</th>
            </tr>
          </thead>
          {/* テーブルボディ */}
          <tbody>
            {mockData.map((h) => (
              <tr key={h.num} className='border-t'>
                <td className='p-2'>{h.num}</td>
                <td className='p-2'>{h.name}</td>
                <td className='p-2 font-bold'>{h.rank}</td>
                <td className='p-2'>{(h.prob * 100).toFixed(1)}%</td>
                <td className='p-2'>{h.odds}</td>
                <td className='p-2'>{h.ev.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
```

## スタイリングの詳細

### メインコンテナ

```typescript
<div>
```

- **目的**: ページ全体のコンテナ
- **スタイル**: デフォルト（追加スタイルなし）

### タイトル

```typescript
<h2 className='text-2xl font-bold mb-4'>
```

- **text-2xl**: フォントサイズ 1.5rem（24px）
- **font-bold**: フォントウェイト 700（太字）
- **mb-4**: 下マージン 1rem（16px）

### テーブルコンテナ

```typescript
<div className='overflow-auto bg-white rounded border'>
```

- **overflow-auto**: 内容がはみ出た場合にスクロールバーを表示
- **bg-white**: 背景色を白に設定
- **rounded**: 角を丸くする
- **border**: 境界線を追加

### テーブル

```typescript
<table className='w-full table-auto'>
```

- **w-full**: 幅を 100%に設定
- **table-auto**: テーブルレイアウトを自動調整

### テーブルヘッダー

```typescript
<thead className='text-left bg-slate-100'>
```

- **text-left**: テキストを左揃え
- **bg-slate-100**: 背景色を薄いグレーに設定

### ヘッダーセル

```typescript
<th className='p-2'>
```

- **p-2**: パディング 0.5rem（8px）

### テーブルボディ

```typescript
<tbody>
```

- **スタイル**: デフォルト（追加スタイルなし）

### データ行

```typescript
<tr key={h.num} className='border-t'>
```

- **key**: React の一意キー（h.num を使用）
- **border-t**: 上境界線を追加

### データセル

```typescript
<td className='p-2'>
```

- **p-2**: パディング 0.5rem（8px）

### 評価セル

```typescript
<td className='p-2 font-bold'>
```

- **p-2**: パディング 0.5rem（8px）
- **font-bold**: フォントウェイト 700（太字）

## データ表示の詳細

### 勝率の表示

```typescript
{(h.prob * 100).toFixed(1)}%
```

- **h.prob**: 0.0-1.0 の範囲の勝率
- **h.prob \* 100**: パーセンテージに変換
- **toFixed(1)**: 小数点第 1 位まで表示
- **例**: 0.32 → 32.0%

### 期待値の表示

```typescript
{
  h.ev.toFixed(2);
}
```

- **h.ev**: 期待値
- **toFixed(2)**: 小数点第 2 位まで表示
- **例**: 0.95 → 0.95

## 設計思想

### 1. データの可視化

- テーブル形式で情報を整理
- 比較しやすいレイアウト
- 重要な情報を強調表示

### 2. レスポンシブデザイン

- `overflow-auto`で横スクロール対応
- 画面サイズに応じて適切に表示
- モバイル環境でも使いやすい

### 3. アクセシビリティ

- セマンティックな HTML 要素を使用
- 適切なテーブル構造
- スクリーンリーダーに対応

## 将来の拡張予定

### 1. 実際のデータ連携

```typescript
// APIからデータを取得
const { data: horses, loading, error } = useHorses();

if (loading) return <div>読み込み中...</div>;
if (error) return <div>エラーが発生しました</div>;

return (
  <div>
    <h2 className='text-2xl font-bold mb-4'>出走馬一覧</h2>
    <table className='w-full table-auto'>{/* 実際のデータを表示 */}</table>
  </div>
);
```

### 2. ソート機能

```typescript
const [sortField, setSortField] = useState('ev');
const [sortDirection, setSortDirection] = useState('desc');

const sortedData = useMemo(() => {
  return [...mockData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });
}, [sortField, sortDirection]);
```

### 3. フィルタリング機能

```typescript
const [filter, setFilter] = useState('');

const filteredData = useMemo(() => {
  return mockData.filter(
    (horse) =>
      horse.name.toLowerCase().includes(filter.toLowerCase()) ||
      horse.rank.toLowerCase().includes(filter.toLowerCase())
  );
}, [filter]);
```

### 4. ページネーション

```typescript
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

const paginatedData = useMemo(() => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return mockData.slice(startIndex, startIndex + itemsPerPage);
}, [currentPage]);
```

### 5. 編集機能

```typescript
const [editingHorse, setEditingHorse] = useState(null);

const handleEdit = (horse) => {
  setEditingHorse(horse);
};

const handleSave = (updatedHorse) => {
  // データを更新
  setEditingHorse(null);
};
```

## 注意点

### 1. パフォーマンス

- 大量のデータを表示する場合は仮想化を検討
- 不要な再レンダリングを避ける
- `useMemo`で計算結果をメモ化

### 2. データの整合性

- 期待値の計算が正しいことを確認
- 勝率とオッズの範囲チェック
- データの型安全性を確保

### 3. ユーザビリティ

- テーブルの幅が画面に収まるように調整
- 重要な情報を見やすく配置
- 操作しやすいボタンサイズ

## 関連ファイル

- `src/routes/index.tsx`: ルート定義
- `src/renderer/components/layout/MainLayout.tsx`: レイアウト
- 将来的な API ファイル: `src/renderer/api/horses.ts`
- 将来的な型定義: `src/renderer/types/horse.ts`

## テスト戦略

### 1. レンダリングテスト

```typescript
it('馬一覧が正しく表示されること', () => {
  render(<Horses />);
  expect(screen.getByText('出走馬一覧（ダミーデータ）')).toBeInTheDocument();
  expect(screen.getByText('サンプルA')).toBeInTheDocument();
  expect(screen.getByText('サンプルB')).toBeInTheDocument();
});
```

### 2. データ表示テスト

```typescript
it('馬のデータが正しく表示されること', () => {
  render(<Horses />);
  expect(screen.getByText('1')).toBeInTheDocument(); // 枠番
  expect(screen.getByText('A')).toBeInTheDocument(); // 評価
  expect(screen.getByText('32.0%')).toBeInTheDocument(); // 勝率
  expect(screen.getByText('1.8')).toBeInTheDocument(); // オッズ
  expect(screen.getByText('0.95')).toBeInTheDocument(); // 期待値
});
```

### 3. テーブル構造テスト

```typescript
it('テーブルが正しい構造で表示されること', () => {
  render(<Horses />);
  expect(screen.getByRole('table')).toBeInTheDocument();
  expect(screen.getAllByRole('columnheader')).toHaveLength(6);
  expect(screen.getAllByRole('row')).toHaveLength(3); // ヘッダー + 2データ行
});
```
