# header.tsx 詳細ドキュメント

## 概要

`header.tsx`は、アプリケーションの**グローバルヘッダー**を提供するコンポーネントです。アプリケーションのタイトルを表示し、将来的にはユーザー情報、通知、設定メニューなどの機能を追加する予定です。

## なぜこのコンポーネントが必要なのか？

### 1. ブランドアイデンティティ

- アプリケーションのタイトルを明確に表示
- ユーザーに現在のアプリケーションを認識させる
- 一貫したブランド体験を提供

### 2. ナビゲーションの補完

- サイドバーと連携したナビゲーション
- 重要な機能へのアクセスを提供
- ユーザーの現在位置を明確化

### 3. 将来の機能拡張

- ユーザー情報の表示
- 通知機能の実装
- 設定メニューの提供
- 検索機能の追加

## コンポーネントの詳細

### インポート文の説明

```typescript
import React from 'react';
```

**インポートの詳細:**

#### `React`

- **目的**: React の基本機能を使用
- **用途**: JSX の変換、コンポーネントの定義
- **注意**: 現在は直接使用していないが、将来的な拡張を考慮

### コンポーネント実装の詳細

```typescript
export const Header = () => {
  return (
    <header className='h-14 bg-white border-b px-6 flex items-center justify-between'>
      <h1 className='text-xl font-semibold'>Horse EV Analyzer</h1>
    </header>
  );
};
```

## スタイリングの詳細

### ヘッダー要素

```typescript
<header className='h-14 bg-white border-b px-6 flex items-center justify-between'>
```

**各クラスの詳細:**

#### `h-14`

- **目的**: 高さを 3.5rem（56px）に設定
- **理由**: 標準的なヘッダーの高さ
- **用途**: 一貫したヘッダーサイズの維持

#### `bg-white`

- **目的**: 背景色を白に設定
- **理由**: コンテンツとの明確な区別
- **用途**: 視覚的な分離の提供

#### `border-b`

- **目的**: 下境界線を追加
- **理由**: メインコンテンツとの視覚的な分離
- **用途**: レイアウトの明確化

#### `px-6`

- **目的**: 左右のパディングを 1.5rem（24px）に設定
- **理由**: コンテンツの適切な余白
- **用途**: 読みやすさの向上

#### `flex`

- **目的**: フレックスボックスレイアウトを有効化
- **理由**: 内部要素の配置制御
- **用途**: レイアウトの柔軟性

#### `items-center`

- **目的**: 縦方向の中央揃え
- **理由**: タイトルを垂直中央に配置
- **用途**: 視覚的なバランスの向上

#### `justify-between`

- **目的**: 横方向の両端揃え
- **理由**: 左側にタイトル、右側に将来の機能を配置
- **用途**: レイアウトの拡張性

### タイトル要素

```typescript
<h1 className='text-xl font-semibold'>Horse EV Analyzer</h1>
```

**各クラスの詳細:**

#### `text-xl`

- **目的**: フォントサイズを 1.25rem（20px）に設定
- **理由**: ヘッダーに適したサイズ
- **用途**: 可読性の向上

#### `font-semibold`

- **目的**: フォントウェイトを 600（セミボールド）に設定
- **理由**: タイトルの重要性を強調
- **用途**: 視覚的な階層の明確化

## 設計思想

### 1. シンプルさ

- 必要最小限の要素のみを配置
- 複雑なロジックは含まない
- 直感的な理解を促進

### 2. 拡張性

- 将来の機能追加に対応
- レイアウトの柔軟性を保持
- コンポーネントの再利用性

### 3. 一貫性

- アプリケーション全体で統一されたスタイル
- 他のコンポーネントとの調和
- ブランドアイデンティティの維持

## 将来の拡張予定

### 1. ユーザー情報の表示

```typescript
const Header = () => {
  const { user } = useAuth();

  return (
    <header className='h-14 bg-white border-b px-6 flex items-center justify-between'>
      <h1 className='text-xl font-semibold'>Horse EV Analyzer</h1>
      <div className='flex items-center gap-4'>
        <span className='text-sm text-gray-600'>
          ようこそ、{user?.name}さん
        </span>
        <UserAvatar user={user} />
      </div>
    </header>
  );
};
```

### 2. 通知機能

```typescript
const Header = () => {
  const { notifications, unreadCount } = useNotifications();

  return (
    <header className='h-14 bg-white border-b px-6 flex items-center justify-between'>
      <h1 className='text-xl font-semibold'>Horse EV Analyzer</h1>
      <div className='flex items-center gap-4'>
        <NotificationBell count={unreadCount} notifications={notifications} />
        <UserMenu />
      </div>
    </header>
  );
};
```

### 3. 検索機能

```typescript
const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className='h-14 bg-white border-b px-6 flex items-center justify-between'>
      <h1 className='text-xl font-semibold'>Horse EV Analyzer</h1>
      <div className='flex items-center gap-4'>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder='馬名で検索...'
        />
        <UserMenu />
      </div>
    </header>
  );
};
```

### 4. テーマ切り替え

```typescript
const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`h-14 border-b px-6 flex items-center justify-between ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <h1 className='text-xl font-semibold'>Horse EV Analyzer</h1>
      <div className='flex items-center gap-4'>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        <UserMenu />
      </div>
    </header>
  );
};
```

### 5. ブレッドクラム

```typescript
const Header = () => {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);

  return (
    <header className='h-14 bg-white border-b px-6 flex items-center justify-between'>
      <div className='flex items-center gap-4'>
        <h1 className='text-xl font-semibold'>Horse EV Analyzer</h1>
        <Breadcrumb items={breadcrumbs} />
      </div>
      <div className='flex items-center gap-4'>
        <UserMenu />
      </div>
    </header>
  );
};
```

## アクセシビリティの考慮

### 1. セマンティック HTML

```typescript
<header role='banner'>
  <h1>Horse EV Analyzer</h1>
</header>
```

### 2. キーボードナビゲーション

```typescript
<header className='h-14 bg-white border-b px-6 flex items-center justify-between'>
  <h1 className='text-xl font-semibold'>Horse EV Analyzer</h1>
  <div className='flex items-center gap-4'>
    <button
      className='p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
      aria-label='通知を開く'
    >
      <BellIcon />
    </button>
  </div>
</header>
```

### 3. スクリーンリーダー対応

```typescript
<header className='h-14 bg-white border-b px-6 flex items-center justify-between'>
  <h1 className='text-xl font-semibold'>
    <span className='sr-only'>アプリケーション名: </span>
    Horse EV Analyzer
  </h1>
</header>
```

## 注意点

### 1. 高さの固定

- `h-14`で高さを固定
- 内容が増えても高さを維持
- レイアウトの安定性を確保

### 2. レスポンシブ対応

- モバイル環境での表示を考慮
- 長いタイトルへの対応
- 小画面でのレイアウト調整

### 3. パフォーマンス

- 不要な再レンダリングを避ける
- 静的なコンテンツは最適化
- 将来的な状態管理の考慮

## 関連ファイル

- `src/renderer/components/layout/MainLayout.tsx`: 親コンポーネント
- `src/renderer/components/layout/sidebar/Sidebar.tsx`: サイドバーコンポーネント
- 将来的なコンポーネント: `src/renderer/components/ui/NotificationBell.tsx`
- 将来的なコンポーネント: `src/renderer/components/ui/UserMenu.tsx`

## テスト戦略

### 1. レンダリングテスト

```typescript
it('ヘッダーが正しく表示されること', () => {
  render(<Header />);
  expect(screen.getByText('Horse EV Analyzer')).toBeInTheDocument();
  expect(screen.getByRole('banner')).toBeInTheDocument();
});
```

### 2. スタイリングテスト

```typescript
it('正しいスタイルが適用されること', () => {
  render(<Header />);
  const header = screen.getByRole('banner');
  expect(header).toHaveClass('h-14', 'bg-white', 'border-b', 'px-6');
});
```

### 3. アクセシビリティテスト

```typescript
it('アクセシビリティが正しく実装されること', () => {
  render(<Header />);
  expect(screen.getByRole('banner')).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
});
```
