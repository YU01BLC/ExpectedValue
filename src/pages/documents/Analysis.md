# Analysis.tsx 詳細ドキュメント

## 概要

`Analysis.tsx`は、**期待値分析**を可視化するページコンポーネントです。現在はサンプルデータを使用して回収率の推移を折れ線グラフで表示していますが、将来的には実際の分析データを表示し、より詳細な分析機能を提供します。

## なぜこのコンポーネントが必要なのか？

### 1. データの可視化

- 数値データをグラフで直感的に表示
- 時系列データの推移を把握
- パターンや傾向を視覚的に理解

### 2. 分析結果の提示

- 期待値分析の結果を分かりやすく表示
- 投資判断のための情報を提供
- 過去の実績を基にした将来予測

### 3. 意思決定支援

- グラフによる直感的な理解
- 数値だけでは分からない傾向を発見
- データドリブンな判断を支援

## コンポーネントの詳細

### インポート文の説明

```typescript
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
```

**各インポートの役割:**

#### `React`

- **目的**: React の基本機能を使用
- **用途**: JSX の変換、コンポーネントの定義

#### `recharts`ライブラリ

- **目的**: React 用のチャートライブラリ
- **特徴**:
  - React コンポーネントとして使用可能
  - レスポンシブデザインに対応
  - 豊富なチャートタイプを提供

**各コンポーネントの詳細:**

##### `LineChart`

- **目的**: 折れ線グラフのコンテナ
- **機能**: データを受け取り、折れ線グラフを描画
- **プロパティ**: `data`（データ配列）

##### `Line`

- **目的**: 折れ線の描画
- **機能**: データポイントを線で結ぶ
- **プロパティ**: `dataKey`（データのキー）、`stroke`（線の色）

##### `XAxis`

- **目的**: X 軸（横軸）の描画
- **機能**: データの横軸を表示
- **プロパティ**: `dataKey`（X 軸のデータキー）

##### `YAxis`

- **目的**: Y 軸（縦軸）の描画
- **機能**: データの縦軸を表示
- **プロパティ**: `domain`（Y 軸の範囲）

##### `Tooltip`

- **目的**: ホバー時のツールチップ
- **機能**: マウスオーバー時に詳細情報を表示
- **用途**: データポイントの詳細確認

##### `CartesianGrid`

- **目的**: グリッド線の描画
- **機能**: 背景にグリッド線を表示
- **プロパティ**: `strokeDasharray`（点線のパターン）

##### `ResponsiveContainer`

- **目的**: レスポンシブ対応
- **機能**: 親要素のサイズに応じてチャートサイズを調整
- **プロパティ**: `width`、`height`

### サンプルデータの定義

```typescript
const sampleData = [
  { t: '2025-08-01', rate: 95 },
  { t: '2025-08-08', rate: 102 },
  { t: '2025-08-15', rate: 88 },
  { t: '2025-08-22', rate: 110 },
  { t: '2025-08-29', rate: 98 },
];
```

**データ構造の説明:**

#### `t`（日付）

- **型**: `string`
- **目的**: 日付を表す
- **形式**: 'YYYY-MM-DD'
- **用途**: X 軸のラベル

#### `rate`（回収率）

- **型**: `number`
- **目的**: 回収率を表す
- **単位**: パーセンテージ（100% = 100）
- **用途**: Y 軸の値

### コンポーネント実装の詳細

```typescript
const Analysis = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>期待値分析（サンプル）</h2>

      <div className='bg-white rounded shadow p-4'>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='t' />
              <YAxis domain={[50, 150]} />
              <Tooltip />
              <Line
                type='monotone'
                dataKey='rate'
                stroke='#3182ce'
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className='text-sm text-gray-500 mt-2'>
          折れ線は回収率（％）の推移イメージです。
        </p>
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

### チャートコンテナ

```typescript
<div className='bg-white rounded shadow p-4'>
```

- **bg-white**: 背景色を白に設定
- **rounded**: 角を丸くする
- **shadow**: 影を追加
- **p-4**: パディング 1rem（16px）

### チャートエリア

```typescript
<div style={{ width: '100%', height: 300 }}>
```

- **width: '100%'**: 幅を 100%に設定
- **height: 300**: 高さを 300px に設定
- **目的**: チャートの表示領域を定義

## チャート設定の詳細

### ResponsiveContainer

```typescript
<ResponsiveContainer>
```

- **目的**: 親要素のサイズに応じてチャートサイズを調整
- **機能**: ウィンドウサイズが変わっても適切に表示

### LineChart

```typescript
<LineChart data={sampleData}>
```

- **data**: 表示するデータ配列
- **目的**: 折れ線グラフのコンテナ

### CartesianGrid

```typescript
<CartesianGrid strokeDasharray='3 3' />
```

- **strokeDasharray**: 点線のパターン（3px 実線、3px 空白）
- **目的**: 背景にグリッド線を表示

### XAxis

```typescript
<XAxis dataKey='t' />
```

- **dataKey**: X 軸に使用するデータのキー（'t' = 日付）
- **目的**: 横軸（日付）を表示

### YAxis

```typescript
<YAxis domain={[50, 150]} />
```

- **domain**: Y 軸の表示範囲（50-150）
- **目的**: 縦軸（回収率）を表示

### Tooltip

```typescript
<Tooltip />
```

- **目的**: マウスオーバー時に詳細情報を表示
- **機能**: データポイントの詳細確認

### Line

```typescript
<Line type='monotone' dataKey='rate' stroke='#3182ce' strokeWidth={2} />
```

**各プロパティの詳細:**

#### `type='monotone'`

- **目的**: 線の描画方法を指定
- **monotone**: 滑らかな曲線で描画
- **他の選択肢**: 'linear', 'step', 'stepBefore', 'stepAfter'

#### `dataKey='rate'`

- **目的**: 線に使用するデータのキー
- **値**: 'rate'（回収率）

#### `stroke='#3182ce'`

- **目的**: 線の色を指定
- **値**: 青色（#3182ce）
- **用途**: 視認性の向上

#### `strokeWidth={2}`

- **目的**: 線の太さを指定
- **値**: 2px
- **用途**: 見やすさの向上

## 設計思想

### 1. データの可視化

- 数値データを直感的に理解できる形式で表示
- 時系列データの推移を把握しやすくする
- パターンや傾向を視覚的に発見

### 2. レスポンシブデザイン

- `ResponsiveContainer`で画面サイズに対応
- モバイル環境でも使いやすい
- ウィンドウサイズの変更に柔軟に対応

### 3. ユーザビリティ

- ツールチップで詳細情報を確認可能
- グリッド線でデータの読み取りを支援
- 適切な色と線の太さで視認性を向上

## 将来の拡張予定

### 1. 実際のデータ連携

```typescript
// APIからデータを取得
const { data: analysisData, loading, error } = useAnalysisData();

if (loading) return <div>読み込み中...</div>;
if (error) return <div>エラーが発生しました</div>;

return (
  <div>
    <h2 className='text-2xl font-bold mb-4'>期待値分析</h2>
    <div className='bg-white rounded shadow p-4'>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={analysisData}>{/* チャート設定 */}</LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);
```

### 2. 複数のデータ系列

```typescript
// 複数の線を表示
<LineChart data={sampleData}>
  <CartesianGrid strokeDasharray='3 3' />
  <XAxis dataKey='t' />
  <YAxis domain={[50, 150]} />
  <Tooltip />
  <Line type='monotone' dataKey='rate' stroke='#3182ce' strokeWidth={2} />
  <Line
    type='monotone'
    dataKey='expectedRate'
    stroke='#e53e3e'
    strokeWidth={2}
  />
</LineChart>
```

### 3. インタラクティブ機能

```typescript
// ズーム機能
<LineChart data={sampleData} zoom={{ x: true, y: true }}>
  {/* チャート設定 */}
</LineChart>

// クリックイベント
<LineChart data={sampleData} onClick={handleChartClick}>
  {/* チャート設定 */}
</LineChart>
```

### 4. カスタマイズ可能な設定

```typescript
const [chartConfig, setChartConfig] = useState({
  showGrid: true,
  showTooltip: true,
  lineColor: '#3182ce',
  lineWidth: 2,
});

return (
  <div>
    <div className='mb-4'>
      <label>
        <input
          type='checkbox'
          checked={chartConfig.showGrid}
          onChange={(e) =>
            setChartConfig({
              ...chartConfig,
              showGrid: e.target.checked,
            })
          }
        />
        グリッドを表示
      </label>
    </div>
    <LineChart data={sampleData}>
      {chartConfig.showGrid && <CartesianGrid strokeDasharray='3 3' />}
      <XAxis dataKey='t' />
      <YAxis domain={[50, 150]} />
      {chartConfig.showTooltip && <Tooltip />}
      <Line
        type='monotone'
        dataKey='rate'
        stroke={chartConfig.lineColor}
        strokeWidth={chartConfig.lineWidth}
      />
    </LineChart>
  </div>
);
```

### 5. データエクスポート機能

```typescript
const handleExport = () => {
  const csvContent = sampleData.map((row) => `${row.t},${row.rate}`).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'analysis_data.csv';
  a.click();
};
```

## 注意点

### 1. パフォーマンス

- 大量のデータを表示する場合は仮想化を検討
- 不要な再レンダリングを避ける
- `useMemo`で計算結果をメモ化

### 2. データの整合性

- データの型と形式を確認
- 欠損データの処理
- 異常値の検出と処理

### 3. アクセシビリティ

- スクリーンリーダーに対応
- キーボードナビゲーション対応
- 色覚異常者への配慮

## 関連ファイル

- `src/routes/index.tsx`: ルート定義
- `src/renderer/components/layout/MainLayout.tsx`: レイアウト
- 将来的な API ファイル: `src/renderer/api/analysis.ts`
- 将来的な型定義: `src/renderer/types/analysis.ts`

## テスト戦略

### 1. レンダリングテスト

```typescript
it('分析ページが正しく表示されること', () => {
  render(<Analysis />);
  expect(screen.getByText('期待値分析（サンプル）')).toBeInTheDocument();
  expect(
    screen.getByText('折れ線は回収率（％）の推移イメージです。')
  ).toBeInTheDocument();
});
```

### 2. チャート表示テスト

```typescript
it('チャートが正しく表示されること', () => {
  render(<Analysis />);
  expect(screen.getByRole('img')).toBeInTheDocument(); // SVG要素
});
```

### 3. データ表示テスト

```typescript
it('サンプルデータが正しく表示されること', () => {
  render(<Analysis />);
  // チャート内のデータポイントを確認
  expect(screen.getByText('2025-08-01')).toBeInTheDocument();
  expect(screen.getByText('95')).toBeInTheDocument();
});
```
