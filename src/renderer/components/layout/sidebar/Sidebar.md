# Sidebar.tsx 詳細ドキュメント

## 概要

`Sidebar.tsx`は、アプリケーションの**サイドバーナビゲーション**を提供するコンポーネントです。`react-router`の`useNavigate`フックを使用してページ遷移を行い、ユーザーがアプリケーション内を効率的に移動できるようにします。

## なぜこのコンポーネントが必要なのか？

### 1. ナビゲーションの提供

- アプリケーション内の主要機能へのアクセス
- 直感的なページ間の移動
- 現在のページ位置の視覚的な表示

### 2. ユーザビリティの向上

- 常に表示されるナビゲーション
- ワンクリックでのページ遷移
- 一貫したナビゲーション体験

### 3. アプリケーション構造の明確化

- 利用可能な機能の一覧表示
- アプリケーションの全体像を把握
- 機能の階層構造の表現

## コンポーネントの詳細

### インポート文の説明

```typescript
import { useNavigate } from 'react-router';
```

**インポートの詳細:**

#### `useNavigate`

- **目的**: React Router のナビゲーションフック
- **機能**: プログラムによるページ遷移
- **戻り値**: `navigate`関数
- **Electron 対応**: `createMemoryRouter`環境で最適化

### コンポーネント実装の詳細

```typescript
export const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <aside className='w-60 bg-white border-r p-4 flex flex-col gap-4'>
      <h2 className='text-lg font-bold'>Expected Value</h2>
      <nav className='flex flex-col gap-2'>
        <button className='text-left' onClick={() => navigate('/')}>
          🏠 Dashboard
        </button>
        <button className='text-left' onClick={() => navigate('/horses')}>
          🐎 馬一覧
        </button>
        <button className='text-left' onClick={() => navigate('/analysis')}>
          📊 期待値分析
        </button>
        <button className='text-left' onClick={() => navigate('/history')}>
          📜 履歴
        </button>
      </nav>
    </aside>
  );
};
```

## スタイリングの詳細

### サイドバーコンテナ

```typescript
<aside className='w-60 bg-white border-r p-4 flex flex-col gap-4'>
```

**各クラスの詳細:**

#### `w-60`

- **目的**: 幅を 15rem（240px）に設定
- **理由**: ナビゲーションに適した幅
- **用途**: 一貫したサイドバーサイズの維持

#### `bg-white`

- **目的**: 背景色を白に設定
- **理由**: メインコンテンツとの明確な区別
- **用途**: 視覚的な分離の提供

#### `border-r`

- **目的**: 右境界線を追加
- **理由**: メインコンテンツとの視覚的な分離
- **用途**: レイアウトの明確化

#### `p-4`

- **目的**: パディングを 1rem（16px）に設定
- **理由**: コンテンツの適切な余白
- **用途**: 読みやすさの向上

#### `flex`

- **目的**: フレックスボックスレイアウトを有効化
- **理由**: 内部要素の配置制御
- **用途**: レイアウトの柔軟性

#### `flex-col`

- **目的**: 縦方向のレイアウト
- **理由**: タイトルとナビゲーションを縦並びに配置
- **用途**: 論理的な情報の配置

#### `gap-4`

- **目的**: 子要素間に 1rem（16px）のスペースを追加
- **理由**: 要素間の適切な間隔
- **用途**: 視覚的な分離の向上

### タイトル要素

```typescript
<h2 className='text-lg font-bold'>Expected Value</h2>
```

**各クラスの詳細:**

#### `text-lg`

- **目的**: フォントサイズを 1.125rem（18px）に設定
- **理由**: サイドバーのタイトルに適したサイズ
- **用途**: 可読性の向上

#### `font-bold`

- **目的**: フォントウェイトを 700（太字）に設定
- **理由**: タイトルの重要性を強調
- **用途**: 視覚的な階層の明確化

### ナビゲーション要素

```typescript
<nav className='flex flex-col gap-2'>
```

**各クラスの詳細:**

#### `flex`

- **目的**: フレックスボックスレイアウトを有効化
- **理由**: ナビゲーション項目の配置制御
- **用途**: レイアウトの柔軟性

#### `flex-col`

- **目的**: 縦方向のレイアウト
- **理由**: ナビゲーション項目を縦並びに配置
- **用途**: 論理的な情報の配置

#### `gap-2`

- **目的**: 子要素間に 0.5rem（8px）のスペースを追加
- **理由**: ナビゲーション項目間の適切な間隔
- **用途**: クリックしやすさの向上

### ナビゲーションボタン

```typescript
<button className='text-left' onClick={() => navigate('/path')}>
```

**各クラスの詳細:**

#### `text-left`

- **目的**: テキストを左揃え
- **理由**: ナビゲーション項目の統一された配置
- **用途**: 視覚的な一貫性の向上

## ナビゲーション項目の詳細

### ダッシュボード

```typescript
<button className='text-left' onClick={() => navigate('/')}>
  🏠 Dashboard
</button>
```

- **パス**: `/`（ルートパス）
- **アイコン**: 🏠（ホーム）
- **目的**: アプリケーションのホーム画面

### 馬一覧

```typescript
<button className='text-left' onClick={() => navigate('/horses')}>
  🐎 馬一覧
</button>
```

- **パス**: `/horses`
- **アイコン**: 🐎（馬）
- **目的**: 出走馬の一覧表示

### 期待値分析

```typescript
<button className='text-left' onClick={() => navigate('/analysis')}>
  📊 期待値分析
</button>
```

- **パス**: `/analysis`
- **アイコン**: 📊（グラフ）
- **目的**: 期待値の分析・可視化

### 履歴

```typescript
<button className='text-left' onClick={() => navigate('/history')}>
  📜 履歴
</button>
```

- **パス**: `/history`
- **アイコン**: 📜（巻物）
- **目的**: 購入履歴・回収率の表示

## 設計思想

### 1. シンプルさ

- 必要最小限の要素のみを配置
- 複雑なロジックは含まない
- 直感的な操作を提供

### 2. 一貫性

- すべてのナビゲーション項目で統一されたスタイル
- 一貫したアイコンとテキストの配置
- 予測可能な動作

### 3. アクセシビリティ

- セマンティックな HTML 要素を使用
- キーボードナビゲーションに対応
- スクリーンリーダーに対応

## 将来の拡張予定

### 1. 現在のページのハイライト

```typescript
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/horses', label: '馬一覧', icon: '🐎' },
    { path: '/analysis', label: '期待値分析', icon: '📊' },
    { path: '/history', label: '履歴', icon: '📜' },
  ];

  return (
    <aside className='w-60 bg-white border-r p-4 flex flex-col gap-4'>
      <h2 className='text-lg font-bold'>Expected Value</h2>
      <nav className='flex flex-col gap-2'>
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`text-left p-2 rounded ${
              location.pathname === item.path
                ? 'bg-blue-100 text-blue-800'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};
```

### 2. サブメニューの追加

```typescript
const Sidebar = () => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const navItems = [
    {
      path: '/',
      label: 'Dashboard',
      icon: '🏠',
    },
    {
      path: '/horses',
      label: '馬一覧',
      icon: '🐎',
      children: [
        { path: '/horses/active', label: 'アクティブ' },
        { path: '/horses/archived', label: 'アーカイブ' },
      ],
    },
    // ... 他の項目
  ];

  const toggleExpanded = (path) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <aside className='w-60 bg-white border-r p-4 flex flex-col gap-4'>
      <h2 className='text-lg font-bold'>Expected Value</h2>
      <nav className='flex flex-col gap-2'>
        {navItems.map((item) => (
          <div key={item.path}>
            <button
              className='text-left p-2 rounded hover:bg-gray-100 w-full flex items-center justify-between'
              onClick={() => {
                if (item.children) {
                  toggleExpanded(item.path);
                } else {
                  navigate(item.path);
                }
              }}
            >
              <span>
                {item.icon} {item.label}
              </span>
              {item.children && (
                <span
                  className={`transform transition-transform ${
                    expandedItems.has(item.path) ? 'rotate-90' : ''
                  }`}
                >
                  ▶
                </span>
              )}
            </button>
            {item.children && expandedItems.has(item.path) && (
              <div className='ml-4 mt-1 space-y-1'>
                {item.children.map((child) => (
                  <button
                    key={child.path}
                    className='text-left p-2 rounded hover:bg-gray-100 w-full text-sm'
                    onClick={() => navigate(child.path)}
                  >
                    {child.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};
```

### 3. 検索機能

```typescript
const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredItems = navItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className='w-60 bg-white border-r p-4 flex flex-col gap-4'>
      <h2 className='text-lg font-bold'>Expected Value</h2>
      <div className='relative'>
        <input
          type='text'
          placeholder='メニューを検索...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full p-2 border rounded text-sm'
        />
      </div>
      <nav className='flex flex-col gap-2'>
        {filteredItems.map((item) => (
          <button
            key={item.path}
            className='text-left p-2 rounded hover:bg-gray-100'
            onClick={() => navigate(item.path)}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};
```

### 4. 折りたたみ機能

```typescript
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`bg-white border-r p-4 flex flex-col gap-4 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      <div className='flex items-center justify-between'>
        {!collapsed && <h2 className='text-lg font-bold'>Expected Value</h2>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className='p-1 rounded hover:bg-gray-100'
        >
          {collapsed ? '▶' : '◀'}
        </button>
      </div>
      <nav className='flex flex-col gap-2'>
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`text-left p-2 rounded hover:bg-gray-100 ${
              collapsed ? 'flex justify-center' : ''
            }`}
            onClick={() => navigate(item.path)}
            title={collapsed ? item.label : undefined}
          >
            {collapsed ? item.icon : `${item.icon} ${item.label}`}
          </button>
        ))}
      </nav>
    </aside>
  );
};
```

## 注意点

### 1. ナビゲーションの一貫性

- すべてのボタンで`useNavigate`を使用
- `<a>`タグは使用しない（フルリロードを防ぐため）
- 一貫したクリックハンドラーの実装

### 2. アクセシビリティ

- ボタンに適切なラベルを設定
- キーボードナビゲーションに対応
- スクリーンリーダーに対応

### 3. パフォーマンス

- 不要な再レンダリングを避ける
- `useCallback`でイベントハンドラーを最適化（必要に応じて）

## 関連ファイル

- `src/renderer/components/layout/MainLayout.tsx`: 親コンポーネント
- `src/renderer/components/layout/header/header.tsx`: ヘッダーコンポーネント
- `src/routes/index.tsx`: ルート定義
- `src/pages/`: 各ページコンポーネント

## テスト戦略

### 1. レンダリングテスト

```typescript
it('サイドバーが正しく表示されること', () => {
  render(<Sidebar />);
  expect(screen.getByText('Expected Value')).toBeInTheDocument();
  expect(screen.getByText('🏠 Dashboard')).toBeInTheDocument();
  expect(screen.getByText('🐎 馬一覧')).toBeInTheDocument();
});
```

### 2. ナビゲーションテスト

```typescript
it('ボタンクリック時に正しいページに遷移すること', async () => {
  const user = userEvent.setup();
  render(<Sidebar />);

  await user.click(screen.getByText('🐎 馬一覧'));
  expect(mockNavigate).toHaveBeenCalledWith('/horses');
});
```

### 3. アクセシビリティテスト

```typescript
it('キーボードナビゲーションが正しく動作すること', async () => {
  render(<Sidebar />);

  const firstButton = screen.getByText('🏠 Dashboard');
  firstButton.focus();
  expect(firstButton).toHaveFocus();

  await user.keyboard('{Tab}');
  expect(screen.getByText('🐎 馬一覧')).toHaveFocus();
});
```
