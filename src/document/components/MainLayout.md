# MainLayout.tsx 詳細ドキュメント

## 概要

`MainLayout.tsx`は、アプリケーション全体の**共通レイアウト**を提供するコンポーネントです。`Header`、`Sidebar`、メインコンテンツエリアを配置し、すべてのページで一貫したレイアウトを提供します。

## なぜこのコンポーネントが必要なのか？

### 1. レイアウトの統一

- すべてのページで同じレイアウト構造を提供
- 一貫したユーザー体験を実現
- レイアウトの変更を一箇所で管理

### 2. コンポーネントの再利用

- `Header`と`Sidebar`を各ページで個別に配置する必要がない
- レイアウトロジックの重複を避ける
- 保守性の向上

### 3. ナビゲーションの提供

- グローバルなナビゲーション機能
- ページ間の移動を容易にする
- 現在のページ位置を視覚的に表示

## コンポーネントの詳細

### インポート文の説明

```typescript
import type { ReactNode } from 'react';
import { Sidebar } from './sidebar/Sidebar.tsx';
import { Header } from './header/header';
```

**各インポートの役割:**

#### `ReactNode`

- **目的**: React 要素の型定義
- **用途**: `children`プロパティの型として使用
- **型のみインポート**: `type`キーワードで型のみをインポート

#### `Sidebar`

- **目的**: サイドバーコンポーネント
- **パス**: `./sidebar/Sidebar.tsx`
- **機能**: ナビゲーションメニューの提供

#### `Header`

- **目的**: ヘッダーコンポーネント
- **パス**: `./header/header`
- **機能**: アプリケーションタイトルの表示

### インターフェース定義

```typescript
interface MainLayoutProps {
  children: ReactNode;
}
```

**プロパティの詳細:**

#### `children`

- **型**: `ReactNode`
- **目的**: メインコンテンツとして表示される子要素
- **例**: ページコンポーネント（`Dashboard`、`Horses`など）

### コンポーネント実装の詳細

```typescript
export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex flex-1 flex-col'>
        <Header />
        <main className='flex-1 p-6 bg-gray-50'>{children}</main>
      </div>
    </div>
  );
};
```

## スタイリングの詳細

### メインコンテナ

```typescript
<div className='flex h-screen'>
```

- **flex**: フレックスボックスレイアウトを有効化
- **h-screen**: 高さを画面の 100%に設定
- **目的**: サイドバーとメインエリアを横並びに配置

### サイドバーエリア

```typescript
<Sidebar />
```

- **配置**: 左側に固定
- **幅**: `Sidebar`コンポーネント内で定義（`w-60`）
- **機能**: ナビゲーションメニュー

### メインコンテンツエリア

```typescript
<div className='flex flex-1 flex-col'>
```

- **flex**: フレックスボックスレイアウトを有効化
- **flex-1**: 残りの幅をすべて使用
- **flex-col**: 縦方向にレイアウト
- **目的**: ヘッダーとメインコンテンツを縦並びに配置

### ヘッダーエリア

```typescript
<Header />
```

- **配置**: メインコンテンツエリアの上部
- **機能**: アプリケーションタイトルの表示

### メインコンテンツ

```typescript
<main className='flex-1 p-6 bg-gray-50'>
```

- **flex-1**: 残りの高さをすべて使用
- **p-6**: パディング 1.5rem（24px）
- **bg-gray-50**: 背景色を薄いグレーに設定
- **目的**: ページコンテンツの表示エリア

## レイアウト構造の詳細

### 全体構造

```
┌─────────────────────────────────────────┐
│ MainLayout (flex h-screen)              │
├─────────────┬───────────────────────────┤
│ Sidebar     │ Main Content Area         │
│ (w-60)      │ (flex-1 flex-col)         │
│             ├───────────────────────────┤
│             │ Header                    │
│             ├───────────────────────────┤
│             │ Main (flex-1 p-6)         │
│             │ ┌─────────────────────┐   │
│             │ │ Page Content        │   │
│             │ │ (children)          │   │
│             │ └─────────────────────┘   │
└─────────────┴───────────────────────────┘
```

### レスポンシブ対応

- **デスクトップ**: サイドバーとメインエリアを横並び
- **モバイル**: 将来的にサイドバーをオーバーレイ表示に変更予定

## 設計思想

### 1. 単一責任の原則

- レイアウトの配置のみに責任を持つ
- ビジネスロジックは含まない
- 各子コンポーネントの詳細は関与しない

### 2. 柔軟性

- `children`プロパティで任意のコンテンツを受け入れ
- ページコンポーネントの変更に影響されない
- レイアウトの拡張が容易

### 3. 一貫性

- すべてのページで同じレイアウトを提供
- ユーザーの混乱を避ける
- ナビゲーションの一貫性を保つ

## 将来の拡張予定

### 1. レスポンシブデザイン

```typescript
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  checkMobile();
  window.addEventListener('resize', checkMobile);

  return () => window.removeEventListener('resize', checkMobile);
}, []);

return (
  <div className='flex h-screen'>
    {!isMobile && <Sidebar />}
    <div className='flex flex-1 flex-col'>
      <Header />
      <main className='flex-1 p-6 bg-gray-50'>{children}</main>
    </div>
    {isMobile && <MobileSidebar />}
  </div>
);
```

### 2. サイドバーの折りたたみ機能

```typescript
const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

return (
  <div className='flex h-screen'>
    <Sidebar collapsed={sidebarCollapsed} />
    <div className='flex flex-1 flex-col'>
      <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className='flex-1 p-6 bg-gray-50'>{children}</main>
    </div>
  </div>
);
```

### 3. テーマ対応

```typescript
const { theme } = useTheme();

return (
  <div
    className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
  >
    <Sidebar />
    <div className='flex flex-1 flex-col'>
      <Header />
      <main
        className={`flex-1 p-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
        }`}
      >
        {children}
      </main>
    </div>
  </div>
);
```

### 4. ローディング状態の管理

```typescript
const [isLoading, setIsLoading] = useState(false);

return (
  <div className='flex h-screen'>
    <Sidebar />
    <div className='flex flex-1 flex-col'>
      <Header />
      <main className='flex-1 p-6 bg-gray-50'>
        {isLoading ? (
          <div className='flex items-center justify-center h-full'>
            <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500'></div>
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  </div>
);
```

## 注意点

### 1. 高さの管理

- `h-screen`で画面の高さを 100%に設定
- 子要素の高さが適切に計算されるようにする
- オーバーフロー時のスクロール対応

### 2. フレックスボックスの理解

- `flex-1`で残りのスペースを占有
- `flex-col`で縦方向のレイアウト
- 子要素の配置を適切に制御

### 3. レスポンシブ対応

- モバイル環境での表示を考慮
- サイドバーの表示/非表示の制御
- タッチ操作への対応

## 関連ファイル

- `src/renderer/components/layout/sidebar/Sidebar.tsx`: サイドバーコンポーネント
- `src/renderer/components/layout/header/header.tsx`: ヘッダーコンポーネント
- `src/routes/index.tsx`: ルート定義（各ページで使用）
- `src/pages/`: 各ページコンポーネント（children として渡される）

## テスト戦略

### 1. レンダリングテスト

```typescript
it('MainLayoutが正しく表示されること', () => {
  render(
    <MainLayout>
      <div>Test Content</div>
    </MainLayout>
  );

  expect(screen.getByText('Test Content')).toBeInTheDocument();
  expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
  expect(screen.getByRole('complementary')).toBeInTheDocument(); // Sidebar
});
```

### 2. レイアウト構造テスト

```typescript
it('正しいレイアウト構造で表示されること', () => {
  render(
    <MainLayout>
      <div>Test Content</div>
    </MainLayout>
  );

  const mainContainer = screen.getByRole('main');
  expect(mainContainer).toHaveClass('flex-1', 'p-6', 'bg-gray-50');
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

  render(
    <MainLayout>
      <div>Test Content</div>
    </MainLayout>
  );

  // モバイル環境での表示を確認
  expect(screen.getByRole('main')).toBeInTheDocument();
});
```
