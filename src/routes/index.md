# routes/index.tsx 詳細ドキュメント

## 概要

`routes/index.tsx`は、アプリケーション全体の**ルーティング設定**を管理するファイルです。Electron 環境に最適化された`createMemoryRouter`を使用し、各ページへの遷移ルールを定義します。

## なぜこのファイルが必要なのか？

### 1. ルーティングの一元管理

- すべてのルート定義を一箇所に集約
- ルートの追加・変更・削除が容易
- ルート間の依存関係を明確化

### 2. Electron 環境での最適化

- `BrowserRouter`は通常の Web ブラウザ向け
- `createMemoryRouter`は Electron の Renderer プロセスに最適
- ブラウザの履歴 API に依存しない

### 3. レイアウトの統一

- すべてのページで`MainLayout`を使用
- グローバルな`Header`と`Sidebar`を共有
- 一貫したユーザー体験を提供

## ファイルの詳細

### インポート文の説明

```typescript
import { createMemoryRouter } from 'react-router';
import { MainLayout } from '@/components/layout/MainLayout.tsx';
import Dashboard from '../pages/Dashboard.tsx';
import Horses from '../pages/Horses.tsx';
import Analysis from '../pages/Analysis.tsx';
import History from '../pages/History.tsx';
```

**各インポートの役割:**

#### `createMemoryRouter`

- **目的**: React Router v6 のメモリベースルーター
- **特徴**:
  - ブラウザの履歴 API を使用しない
  - メモリ内でルート状態を管理
  - Electron 環境に最適
- **従来の`BrowserRouter`との違い**: 外部 URL に影響されない

#### `MainLayout`

- **目的**: アプリ全体の共通レイアウト
- **機能**: `Header`、`Sidebar`、メインコンテンツエリアの配置
- **エイリアス**: `@`は`src/renderer`を指す

#### ページコンポーネント

- **相対パス**: `../pages/`で`src/pages`を参照
- **各ページの役割**:
  - `Dashboard`: ダッシュボード画面
  - `Horses`: 馬一覧画面
  - `Analysis`: 期待値分析画面
  - `History`: 履歴画面

### ルート定義の詳細

```typescript
export const router = createMemoryRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <Dashboard />
      </MainLayout>
    ),
  },
  // ... 他のルート
]);
```

**ルートオブジェクトの構造:**

#### `path`

- **目的**: URL パスの定義
- **例**: `'/'`, `'/horses'`, `'/analysis'`
- **注意**: 先頭の`/`は必須

#### `element`

- **目的**: そのパスで表示する React 要素
- **構造**: `MainLayout`でラップし、その中にページコンポーネントを配置
- **理由**: すべてのページで共通のレイアウトを適用

## 各ルートの詳細

### 1. ダッシュボードルート (`/`)

```typescript
{
  path: '/',
  element: (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  ),
}
```

**説明:**

- **パス**: ルートパス（`/`）
- **コンポーネント**: `Dashboard`
- **用途**: アプリのホーム画面
- **機能**: 概要表示、他ページへのショートカット

### 2. 馬一覧ルート (`/horses`)

```typescript
{
  path: '/horses',
  element: (
    <MainLayout>
      <Horses />
    </MainLayout>
  ),
}
```

**説明:**

- **パス**: `/horses`
- **コンポーネント**: `Horses`
- **用途**: 出走馬の一覧表示
- **機能**: テーブル表示、データ管理

### 3. 期待値分析ルート (`/analysis`)

```typescript
{
  path: '/analysis',
  element: (
    <MainLayout>
      <Analysis />
    </MainLayout>
  ),
}
```

**説明:**

- **パス**: `/analysis`
- **コンポーネント**: `Analysis`
- **用途**: 期待値の分析・可視化
- **機能**: グラフ表示、データ分析

### 4. 履歴ルート (`/history`)

```typescript
{
  path: '/history',
  element: (
    <MainLayout>
      <History />
    </MainLayout>
  ),
}
```

**説明:**

- **パス**: `/history`
- **コンポーネント**: `History`
- **用途**: 購入履歴・回収率の表示
- **機能**: 履歴管理、統計表示

## 設計思想

### 1. レイアウトの統一

- すべてのページで`MainLayout`を使用
- グローバルな`Header`と`Sidebar`を共有
- 一貫したユーザー体験を提供

### 2. 関心の分離

- ルーティング設定はこのファイルに集約
- ページコンポーネントは`src/pages`に配置
- レイアウトコンポーネントは`src/renderer/components/layout`に配置

### 3. 拡張性の考慮

- 新しいページの追加は簡単
- ルートの変更は一箇所で完結
- ネストしたルートにも対応可能

## ルーティングの動作原理

### 1. ルートマッチング

```typescript
// URL: /horses
// マッチするルート: { path: '/horses', ... }
// 表示されるコンポーネント: <MainLayout><Horses /></MainLayout>
```

### 2. ナビゲーション

```typescript
// useNavigateフックを使用
const navigate = useNavigate();
navigate('/horses'); // /horsesに遷移
```

### 3. メモリ内での状態管理

- ブラウザの履歴 API を使用しない
- メモリ内でルート状態を管理
- Electron 環境に最適化

## 将来の拡張予定

### 1. ネストしたルート

```typescript
{
  path: '/horses',
  element: <MainLayout><Horses /></MainLayout>,
  children: [
    {
      path: 'detail/:id',
      element: <HorseDetail />
    }
  ]
}
```

### 2. ルートガード

```typescript
{
  path: '/admin',
  element: <AdminPage />,
  loader: () => {
    // 認証チェック
    if (!isAuthenticated) {
      throw redirect('/login');
    }
  }
}
```

### 3. 遅延読み込み

```typescript
const LazyAnalysis = lazy(() => import('../pages/Analysis.tsx'));

{
  path: '/analysis',
  element: (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyAnalysis />
      </Suspense>
    </MainLayout>
  ),
}
```

## 注意点

### 1. パスの一意性

- 各ルートのパスは一意である必要がある
- 重複するパスがあると、最初にマッチしたルートが使用される

### 2. レイアウトの一貫性

- すべてのページで`MainLayout`を使用
- レイアウトを変更する場合は、すべてのルートを更新

### 3. インポートパス

- ページコンポーネントは相対パスでインポート
- レイアウトコンポーネントはエイリアス（`@`）でインポート

## 関連ファイル

- `src/main.tsx`: このルーターを使用
- `src/pages/`: 各ページコンポーネント
- `src/renderer/components/layout/`: レイアウトコンポーネント
- `src/renderer/components/layout/sidebar/Sidebar.tsx`: ナビゲーション

## テスト戦略

### 1. ルートのテスト

```typescript
// 各ルートが正しくマッチすることをテスト
expect(router.state.location.pathname).toBe('/horses');
```

### 2. ナビゲーションのテスト

```typescript
// useNavigateフックの動作をテスト
const { result } = renderHook(() => useNavigate());
act(() => {
  result.current('/horses');
});
```

### 3. レイアウトのテスト

```typescript
// MainLayoutが正しく表示されることをテスト
render(<RouterProvider router={router} />);
expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
expect(screen.getByRole('complementary')).toBeInTheDocument(); // Sidebar
```
