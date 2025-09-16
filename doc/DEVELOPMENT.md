# 開発ガイドライン

## 🏗️ アーキテクチャ

### ディレクトリ構造

```
src/renderer/
├── components/          # UIコンポーネント
│   ├── ui/             # 基本コンポーネント
│   │   ├── atoms/      # 原子コンポーネント（300行以内）
│   │   ├── charts/     # チャートコンポーネント
│   │   └── utils/      # ユーティリティ関数
│   └── layout/         # レイアウトコンポーネント
├── features/           # 機能別コンポーネント
│   ├── dashboard/      # ダッシュボード機能
│   ├── raceAnalysis/   # レース分析機能
│   └── raceList/       # レース一覧機能
├── hooks/              # カスタムフック
├── i18n/               # 国際化設定
└── theme/              # テーマ設定
```

### コンポーネント設計原則

- **単一責任**: 1 つのコンポーネントは 1 つの責務
- **再利用性**: 汎用的なコンポーネントの作成
- **型安全性**: TypeScript の型定義を活用
- **テスト容易性**: テストしやすい設計

## 📝 コーディング規約

### 命名規則

- **コンポーネント**: PascalCase（例: `RaceTable`）
- **関数・変数**: camelCase（例: `handleClick`）
- **定数**: UPPER_SNAKE_CASE（例: `API_BASE_URL`）
- **ファイル**: kebab-case（例: `race-table.tsx`）

### 型定義

```typescript
// Propsはinterfaceで定義
interface RaceTableProps {
  horseData: HorseData[];
  sortField: SortField | null;
  sortDirection: SortDirection;
}

// その他はtypeで定義
type SortField = 'horseNumber' | 'gateNumber' | 'evaluation';
type SortDirection = 'asc' | 'desc';
```

### コンポーネント定義

```typescript
// アロー関数で定義（React.FCは使用しない）
const RaceTable = ({ horseData, sortField, sortDirection }: RaceTableProps) => {
  // 実装
};

export default RaceTable;
```

## 🧪 テスト

### テスト戦略

- **カバレッジ目標**: 100%
- **テストフレームワーク**: Vitest + Testing Library
- **テストパターン**: GIVEN/WHEN/THEN

### テスト例

```typescript
describe('RaceTable', () => {
  it('基本的なレーステーブルが表示されること', () => {
    // GIVEN
    const props = {
      /* テストデータ */
    };

    // WHEN
    renderWithTheme(<RaceTable {...props} />);

    // THEN
    expect(screen.getByText('馬番')).toBeInTheDocument();
  });
});
```

### テストのベストプラクティス

- **userEvent**: fireEvent の代わりに userEvent を使用
- **実際の i18n**: モックではなく実際の i18n インスタンスを使用
- **ハードコードテキスト**: 実際に表示される文字列でアサーション

## 🎨 スタイリング

### Material-UI 使用

```typescript
// sxプロパティでスタイリング
<Box
  sx={{
    display: 'flex',
    gap: 2,
    p: 2,
  }}
>
  <Typography variant='h6' sx={{ color: 'primary.main' }}>
    タイトル
  </Typography>
</Box>
```

### テーマカラー

```typescript
// テーマから色を取得
const theme = useTheme();
const color = theme.palette.primary.main;

// カスタムカラーはpaletteを拡張
const customTheme = createTheme({
  palette: {
    custom: {
      main: '#FF5722',
    },
  },
});
```

## 🌐 国際化

### 翻訳キー

```typescript
// useTranslationでnamespaceを指定
const { t } = useTranslation('dashboard');

// 翻訳キーを使用
<Typography>{t('title')}</Typography>;
```

### 翻訳ファイル構造

```
src/renderer/i18n/
├── ja/
│   ├── common.json
│   └── dashboard.json
└── en/
    ├── common.json
    └── dashboard.json
```

## 🔧 開発環境

### 必須ツール

- Node.js 20+
- npm 9+
- VS Code（推奨）

### 推奨拡張機能

- ES7+ React/Redux/React-Native snippets
- TypeScript Importer
- Prettier - Code formatter
- ESLint

### 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# テスト実行
npm run test

# テストカバレッジ
npm run test:ci

# リント
npm run lint

# ビルド
npm run build
```

## 📊 パフォーマンス

### 最適化手法

- **React.memo**: 不要な再レンダリングを防止
- **useMemo**: 重い計算のメモ化
- **useCallback**: 関数のメモ化
- **コード分割**: 動的インポート

### パフォーマンス測定

```typescript
// React DevTools Profilerで測定
import { Profiler } from 'react';

const onRenderCallback = (id, phase, actualDuration) => {
  console.log('Render time:', actualDuration);
};

<Profiler id='RaceTable' onRender={onRenderCallback}>
  <RaceTable {...props} />
</Profiler>;
```

## 🚀 デプロイ

### ビルドプロセス

1. TypeScript コンパイル
2. Vite ビルド
3. Electron パッケージング
4. テスト実行

### 環境変数

```bash
# 開発環境
NODE_ENV=development

# 本番環境
NODE_ENV=production
```

## 🔍 デバッグ

### 開発者ツール

- **React DevTools**: コンポーネント状態確認
- **Redux DevTools**: 状態管理確認
- **Chrome DevTools**: パフォーマンス分析

### ログ出力

```typescript
// 開発環境のみログ出力
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}
```
