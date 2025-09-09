# button.tsx 詳細ドキュメント

## 概要

`button.tsx`は、**shadcn/ui の Button コンポーネント**を実装したファイルです。`class-variance-authority`（cva）と`tailwind-merge`を使用して、variant と size のプロパティに応じたスタイルを適用し、`asChild`プロパティで子要素をボタンとしてレンダリングできます。

## なぜこのコンポーネントが必要なのか？

### 1. 統一された UI コンポーネント

- アプリケーション全体で一貫したボタンスタイル
- デザインシステムの基盤となるコンポーネント
- 保守性と拡張性の向上

### 2. 柔軟なスタイリング

- variant と size による多様なスタイルパターン
- カスタマイズ可能なスタイル設定
- テーマとの連携

### 3. アクセシビリティの確保

- Radix UI の Slot コンポーネントを使用
- キーボードナビゲーション対応
- スクリーンリーダー対応

## コンポーネントの詳細

### インポート文の説明

```typescript
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
```

**各インポートの詳細:**

#### `React`

- **目的**: React の基本機能を使用
- **用途**: `forwardRef`、`ButtonHTMLAttributes`の型定義

#### `Slot`

- **目的**: Radix UI の Slot コンポーネント
- **機能**: 子要素をボタンとしてレンダリング
- **用途**: `asChild`プロパティの実装

#### `cva`

- **目的**: class-variance-authority ライブラリ
- **機能**: 条件付きクラス名の管理
- **用途**: variant と size のスタイル定義

#### `VariantProps`

- **目的**: cva の型定義
- **機能**: variant の型安全性を提供
- **用途**: プロパティの型定義

#### `cn`

- **目的**: カスタムユーティリティ関数
- **機能**: `clsx`と`tailwind-merge`を組み合わせ
- **用途**: クラス名の結合と競合解決

### スタイル定義の詳細

```typescript
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

**ベースクラスの詳細:**

#### 基本スタイル

- **inline-flex**: インラインフレックスボックス
- **items-center**: 縦方向の中央揃え
- **justify-center**: 横方向の中央揃え
- **whitespace-nowrap**: テキストの折り返しを防ぐ
- **rounded-md**: 角を丸くする
- **text-sm**: フォントサイズを 0.875rem（14px）に設定
- **font-medium**: フォントウェイトを 500 に設定
- **transition-colors**: 色の変化にアニメーション

#### フォーカススタイル

- **focus-visible:outline-none**: フォーカス時のアウトラインを非表示
- **focus-visible:ring-1**: フォーカス時にリングを表示

#### 無効化スタイル

- **disabled:pointer-events-none**: 無効化時にポインターイベントを無効化
- **disabled:opacity-50**: 無効化時に透明度を 50%に設定

**Variant の詳細:**

#### `default`

- **bg-primary**: プライマリカラーを背景に設定
- **text-primary-foreground**: プライマリの前景色をテキストに設定
- **shadow**: 影を追加
- **hover:bg-primary/90**: ホバー時に背景色を 90%の透明度に設定

#### `destructive`

- **bg-destructive**: 破壊的アクション用の背景色
- **text-destructive-foreground**: 破壊的アクション用の前景色
- **shadow-sm**: 小さな影を追加
- **hover:bg-destructive/90**: ホバー時の背景色変化

#### `outline`

- **border border-input**: 入力フィールドと同じ境界線
- **bg-background**: 背景色を設定
- **shadow-sm**: 小さな影を追加
- **hover:bg-accent**: ホバー時にアクセントカラーを背景に設定
- **hover:text-accent-foreground**: ホバー時にアクセントの前景色をテキストに設定

#### `secondary`

- **bg-secondary**: セカンダリカラーを背景に設定
- **text-secondary-foreground**: セカンダリの前景色をテキストに設定
- **shadow-sm**: 小さな影を追加
- **hover:bg-secondary/80**: ホバー時に背景色を 80%の透明度に設定

#### `ghost`

- **hover:bg-accent**: ホバー時にアクセントカラーを背景に設定
- **hover:text-accent-foreground**: ホバー時にアクセントの前景色をテキストに設定

#### `link`

- **text-primary**: プライマリカラーをテキストに設定
- **underline-offset-4**: 下線のオフセットを設定
- **hover:underline**: ホバー時に下線を表示

**Size の詳細:**

#### `default`

- **h-9**: 高さを 2.25rem（36px）に設定
- **px-4**: 左右のパディングを 1rem（16px）に設定
- **py-2**: 上下のパディングを 0.5rem（8px）に設定

#### `sm`

- **h-8**: 高さを 2rem（32px）に設定
- **rounded-md**: 角を丸くする
- **px-3**: 左右のパディングを 0.75rem（12px）に設定

#### `lg`

- **h-10**: 高さを 2.5rem（40px）に設定
- **rounded-md**: 角を丸くする
- **px-8**: 左右のパディングを 2rem（32px）に設定

#### `icon`

- **h-9**: 高さを 2.25rem（36px）に設定
- **w-9**: 幅を 2.25rem（36px）に設定

### インターフェース定義

```typescript
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
```

**プロパティの詳細:**

#### `React.ButtonHTMLAttributes<HTMLButtonElement>`

- **目的**: 標準的な HTML ボタン属性を継承
- **例**: `onClick`, `disabled`, `type`など
- **用途**: ネイティブなボタン機能の提供

#### `VariantProps<typeof buttonVariants>`

- **目的**: cva で定義した variant の型を継承
- **例**: `variant`, `size`プロパティ
- **用途**: 型安全なスタイル指定

#### `asChild`

- **型**: `boolean`
- **目的**: 子要素をボタンとしてレンダリングするかどうか
- **デフォルト**: `false`
- **用途**: 柔軟なコンポーネント構成

### コンポーネント実装の詳細

```typescript
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
```

**実装の詳細:**

#### `React.forwardRef`

- **目的**: ref を子コンポーネントに転送
- **用途**: 親コンポーネントからボタン要素にアクセス

#### プロパティの分割代入

- **className**: 追加の CSS クラス
- **variant**: ボタンのスタイルバリアント
- **size**: ボタンのサイズ
- **asChild**: 子要素をボタンとしてレンダリングするかどうか
- **...props**: その他のプロパティ

#### コンポーネントの選択

```typescript
const Comp = asChild ? Slot : 'button';
```

- **asChild が true**: `Slot`コンポーネントを使用
- **asChild が false**: 標準の`button`要素を使用

#### クラス名の結合

```typescript
className={cn(buttonVariants({ variant, size }), className)}
```

- **buttonVariants({ variant, size })**: cva で生成されたクラス名
- **className**: 追加のクラス名
- **cn**: クラス名を結合し、競合を解決

#### `displayName`の設定

```typescript
Button.displayName = 'Button';
```

- **目的**: React DevTools での表示名を設定
- **用途**: デバッグ時の識別

## 使用例

### 基本的な使用

```typescript
<Button>クリックしてください</Button>
```

### variant の指定

```typescript
<Button variant="destructive">削除</Button>
<Button variant="outline">キャンセル</Button>
<Button variant="ghost">詳細</Button>
```

### size の指定

```typescript
<Button size="sm">小さいボタン</Button>
<Button size="lg">大きいボタン</Button>
<Button size="icon">🔍</Button>
```

### asChild の使用

```typescript
<Button asChild>
  <a href='/link'>リンクボタン</a>
</Button>
```

### カスタムクラスの追加

```typescript
<Button className='w-full'>全幅ボタン</Button>
```

## 設計思想

### 1. 型安全性

- TypeScript による型チェック
- プロパティの型安全性
- コンパイル時のエラー検出

### 2. 柔軟性

- 多様な variant と size
- カスタマイズ可能なスタイル
- 子要素の柔軟な構成

### 3. アクセシビリティ

- Radix UI の Slot コンポーネント
- キーボードナビゲーション対応
- スクリーンリーダー対応

## 将来の拡張予定

### 1. 新しい variant の追加

```typescript
variant: {
  // 既存のvariant
  default: '...',
  destructive: '...',
  // 新しいvariant
  success: 'bg-green-500 text-white hover:bg-green-600',
  warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
}
```

### 2. アニメーションの追加

```typescript
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50'
  // ...
);
```

### 3. ローディング状態の対応

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      loadingText,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <>
            <Spinner className='mr-2 h-4 w-4' />
            {loadingText || '読み込み中...'}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
```

## 注意点

### 1. クラス名の競合

- `cn`関数で Tailwind クラスの競合を解決
- カスタムクラスは適切に処理される

### 2. アクセシビリティ

- `asChild`使用時は子要素のアクセシビリティを確認
- 適切な ARIA 属性の設定

### 3. パフォーマンス

- 不要な再レンダリングを避ける
- `useCallback`でイベントハンドラーを最適化（必要に応じて）

## 関連ファイル

- `src/renderer/lib/utils.ts`: `cn`関数の定義
- `tailwind.config.ts`: Tailwind CSS の設定
- `src/index.css`: CSS 変数の定義
- 使用例: `src/pages/Dashboard.tsx`

## テスト戦略

### 1. レンダリングテスト

```typescript
it('ボタンが正しく表示されること', () => {
  render(<Button>テストボタン</Button>);
  expect(
    screen.getByRole('button', { name: 'テストボタン' })
  ).toBeInTheDocument();
});
```

### 2. variant テスト

```typescript
it('destructive variantが正しく適用されること', () => {
  render(<Button variant='destructive'>削除</Button>);
  const button = screen.getByRole('button');
  expect(button).toHaveClass('bg-destructive', 'text-destructive-foreground');
});
```

### 3. size テスト

```typescript
it('sm sizeが正しく適用されること', () => {
  render(<Button size='sm'>小さいボタン</Button>);
  const button = screen.getByRole('button');
  expect(button).toHaveClass('h-8', 'px-3');
});
```

### 4. asChild テスト

```typescript
it('asChildプロパティが正しく動作すること', () => {
  render(
    <Button asChild>
      <a href='/test'>リンクボタン</a>
    </Button>
  );
  expect(screen.getByRole('link')).toBeInTheDocument();
});
```
