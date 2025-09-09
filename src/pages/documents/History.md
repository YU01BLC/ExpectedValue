# History.tsx 詳細ドキュメント

## 概要

`History.tsx`は、**購入履歴と回収率**を表示するページコンポーネントです。現在はダミーデータを使用していますが、将来的には実際の購入履歴を表示し、累計投資、払戻、回収率の統計情報を管理します。

## なぜこのコンポーネントが必要なのか？

### 1. 投資実績の可視化

- 過去の投資履歴を一覧で表示
- 累計投資額と払戻額を明確に表示
- 回収率の推移を把握

### 2. パフォーマンス分析

- 投資戦略の効果を定量的に評価
- 成功・失敗のパターンを分析
- 将来の投資判断に活用

### 3. データ管理の基盤

- 購入履歴の CRUD 操作の起点
- データの永続化とバックアップ
- 将来的なデータベース連携の基盤

## コンポーネントの詳細

### コンポーネント実装の詳細

```typescript
const History = () => {
  // ここは後で IndexedDB / 集計ロジックに繋げます
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>購入履歴 / 回収率</h2>

      <div className='grid grid-cols-3 gap-4 mb-6'>
        <div className='p-4 bg-white rounded shadow'>累計投資: ¥123,456</div>
        <div className='p-4 bg-white rounded shadow'>累計払戻: ¥98,765</div>
        <div className='p-4 bg-white rounded shadow'>回収率: 80%</div>
      </div>

      <div className='bg-white rounded border p-4'>
        <p className='text-sm text-gray-500'>
          履歴はここに一覧表示されます（MVPでは最小表示でOK）。
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

### 統計カードエリア

```typescript
<div className='grid grid-cols-3 gap-4 mb-6'>
```

- **grid**: グリッドレイアウトを有効化
- **grid-cols-3**: 3 列のグリッドを作成
- **gap-4**: グリッドアイテム間に 1rem（16px）のスペース
- **mb-6**: 下マージン 1.5rem（24px）

### 統計カード

```typescript
<div className='p-4 bg-white rounded shadow'>
```

- **p-4**: パディング 1rem（16px）
- **bg-white**: 背景色を白に設定
- **rounded**: 角を丸くする
- **shadow**: 影を追加

### 履歴エリア

```typescript
<div className='bg-white rounded border p-4'>
```

- **bg-white**: 背景色を白に設定
- **rounded**: 角を丸くする
- **border**: 境界線を追加
- **p-4**: パディング 1rem（16px）

### 説明テキスト

```typescript
<p className='text-sm text-gray-500'>
```

- **text-sm**: フォントサイズ 0.875rem（14px）
- **text-gray-500**: テキスト色を中程度のグレーに設定

## データ構造の詳細

### 現在のダミーデータ

```typescript
// 現在はハードコードされた値
累計投資: ¥123,456
累計払戻: ¥98,765
回収率: 80%
```

### 将来のデータ構造

```typescript
interface HistoryData {
  totalInvestment: number; // 累計投資額
  totalPayout: number; // 累計払戻額
  returnRate: number; // 回収率（%）
  transactions: Transaction[]; // 個別取引履歴
}

interface Transaction {
  id: string;
  date: string;
  horseName: string;
  investment: number;
  payout: number;
  odds: number;
  result: 'win' | 'lose';
}
```

## 設計思想

### 1. 情報の階層化

- 重要な統計情報を上部に配置
- 詳細な履歴を下部に配置
- 視覚的な階層を明確化

### 2. カードベースのレイアウト

- 関連する情報をカードでグループ化
- 統一されたスタイリング
- レスポンシブデザインに対応

### 3. 段階的な情報表示

- MVP では最小限の情報を表示
- 将来的に詳細な履歴を追加
- ユーザーのニーズに応じて拡張

## 将来の拡張予定

### 1. 実際のデータ連携

```typescript
// IndexedDBからデータを取得
const { data: historyData, loading, error } = useHistoryData();

if (loading) return <div>読み込み中...</div>;
if (error) return <div>エラーが発生しました</div>;

return (
  <div>
    <h2 className='text-2xl font-bold mb-4'>購入履歴 / 回収率</h2>

    <div className='grid grid-cols-3 gap-4 mb-6'>
      <div className='p-4 bg-white rounded shadow'>
        累計投資: ¥{historyData.totalInvestment.toLocaleString()}
      </div>
      <div className='p-4 bg-white rounded shadow'>
        累計払戻: ¥{historyData.totalPayout.toLocaleString()}
      </div>
      <div className='p-4 bg-white rounded shadow'>
        回収率: {historyData.returnRate}%
      </div>
    </div>

    <TransactionList transactions={historyData.transactions} />
  </div>
);
```

### 2. 詳細な履歴表示

```typescript
const TransactionList = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <div className='bg-white rounded border'>
      <div className='p-4 border-b'>
        <h3 className='text-lg font-semibold'>取引履歴</h3>
      </div>
      <div className='overflow-auto'>
        <table className='w-full table-auto'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='p-3 text-left'>日付</th>
              <th className='p-3 text-left'>馬名</th>
              <th className='p-3 text-left'>投資額</th>
              <th className='p-3 text-left'>払戻額</th>
              <th className='p-3 text-left'>結果</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className='border-t'>
                <td className='p-3'>{transaction.date}</td>
                <td className='p-3'>{transaction.horseName}</td>
                <td className='p-3'>
                  ¥{transaction.investment.toLocaleString()}
                </td>
                <td className='p-3'>¥{transaction.payout.toLocaleString()}</td>
                <td className='p-3'>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      transaction.result === 'win'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {transaction.result === 'win' ? '勝利' : '敗北'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
```

### 3. フィルタリング機能

```typescript
const [filters, setFilters] = useState({
  dateRange: { start: null, end: null },
  result: 'all', // 'all', 'win', 'lose'
  minInvestment: 0,
});

const filteredTransactions = useMemo(() => {
  return transactions.filter((transaction) => {
    // 日付範囲フィルタ
    if (filters.dateRange.start && transaction.date < filters.dateRange.start) {
      return false;
    }
    if (filters.dateRange.end && transaction.date > filters.dateRange.end) {
      return false;
    }

    // 結果フィルタ
    if (filters.result !== 'all' && transaction.result !== filters.result) {
      return false;
    }

    // 投資額フィルタ
    if (transaction.investment < filters.minInvestment) {
      return false;
    }

    return true;
  });
}, [transactions, filters]);
```

### 4. グラフ表示

```typescript
const PerformanceChart = ({ data }: { data: HistoryData }) => {
  const chartData = data.transactions.map((transaction, index) => ({
    date: transaction.date,
    cumulativeInvestment: data.transactions
      .slice(0, index + 1)
      .reduce((sum, t) => sum + t.investment, 0),
    cumulativePayout: data.transactions
      .slice(0, index + 1)
      .reduce((sum, t) => sum + t.payout, 0),
  }));

  return (
    <div className='bg-white rounded border p-4'>
      <h3 className='text-lg font-semibold mb-4'>パフォーマンス推移</h3>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Line
            type='monotone'
            dataKey='cumulativeInvestment'
            stroke='#8884d8'
          />
          <Line type='monotone' dataKey='cumulativePayout' stroke='#82ca9d' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
```

### 5. データエクスポート機能

```typescript
const handleExport = () => {
  const csvContent = [
    ['日付', '馬名', '投資額', '払戻額', '結果'],
    ...transactions.map((t) => [
      t.date,
      t.horseName,
      t.investment.toString(),
      t.payout.toString(),
      t.result === 'win' ? '勝利' : '敗北',
    ]),
  ]
    .map((row) => row.join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute(
    'download',
    `history_${new Date().toISOString().split('T')[0]}.csv`
  );
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
```

## 注意点

### 1. データの整合性

- 累計投資額と個別取引の合計が一致することを確認
- 回収率の計算が正しいことを確認
- 日付の形式を統一

### 2. パフォーマンス

- 大量の履歴データを表示する場合は仮想化を検討
- 不要な再レンダリングを避ける
- `useMemo`で計算結果をメモ化

### 3. プライバシー

- 個人の投資履歴は機密情報
- データの暗号化を検討
- 適切なアクセス制御を実装

## 関連ファイル

- `src/routes/index.tsx`: ルート定義
- `src/renderer/components/layout/MainLayout.tsx`: レイアウト
- 将来的な API ファイル: `src/renderer/api/history.ts`
- 将来的な型定義: `src/renderer/types/history.ts`
- 将来的なデータベース: `src/renderer/db/indexeddb.ts`

## テスト戦略

### 1. レンダリングテスト

```typescript
it('履歴ページが正しく表示されること', () => {
  render(<History />);
  expect(screen.getByText('購入履歴 / 回収率')).toBeInTheDocument();
  expect(screen.getByText('累計投資: ¥123,456')).toBeInTheDocument();
  expect(screen.getByText('累計払戻: ¥98,765')).toBeInTheDocument();
  expect(screen.getByText('回収率: 80%')).toBeInTheDocument();
});
```

### 2. 統計カードテスト

```typescript
it('統計カードが正しく表示されること', () => {
  render(<History />);
  const cards = screen.getAllByRole('generic');
  expect(cards).toHaveLength(4); // 3つの統計カード + 1つの履歴エリア
});
```

### 3. レスポンシブテスト

```typescript
it('モバイル環境で正しく表示されること', () => {
  // モバイルサイズに設定
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 375,
  });

  render(<History />);
  // グリッドレイアウトが適切に調整されることを確認
});
```
