# utils.ts 詳細ドキュメント

## 概要

`utils.ts`は、**Tailwind CSS クラス名を条件付きで結合し、競合を解決する**ユーティリティ関数を提供するファイルです。`clsx`と`tailwind-merge`を組み合わせて使用し、shadcn/ui コンポーネントでクラス名の管理を効率化します。

## なぜこのファイルが必要なのか？

### 1. クラス名の競合解決

- Tailwind CSS では同じプロパティのクラスが競合する
- 後から指定されたクラスが優先される
- `tailwind-merge`で適切に競合を解決

### 2. 条件付きクラス名の管理

- 動的にクラス名を組み合わせる必要がある
- `clsx`で条件付きクラス名を効率的に管理
- 可読性と保守性の向上

### 3. shadcn/ui との統合

- shadcn/ui コンポーネントで標準的に使用
- 一貫したクラス名管理の実現
- コンポーネント間での再利用

## ファイルの詳細

### インポート文の説明

```typescript
import { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
```

**各インポートの詳細:**

#### `ClassValue`

- **目的**: `clsx`の型定義
- **機能**: クラス名の型を提供
- **用途**: 関数の引数の型安全性

#### `twMerge`

- **目的**: `tailwind-merge`のメイン関数
- **機能**: Tailwind CSS クラスの競合を解決
- **用途**: 重複するクラスを適切に処理

#### `clsx`

- **目的**: `clsx`のメイン関数
- **機能**: 条件付きクラス名を結合
- **用途**: 動的なクラス名の生成

### 関数実装の詳細

```typescript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**実装の詳細:**

#### 関数シグネチャ

```typescript
export function cn(...inputs: ClassValue[]);
```

- **export function**: 名前付きエクスポート
- **cn**: 関数名（"class names"の略）
- **...inputs**: 可変長引数（レストパラメータ）
- **ClassValue[]**: 引数の型（ClassValue の配列）

#### 戻り値

```typescript
return twMerge(clsx(inputs));
```

- **clsx(inputs)**: 入力されたクラス名を結合
- **twMerge(...)**: 結合されたクラス名の競合を解決
- **return**: 処理されたクラス名文字列を返す

## 使用例

### 基本的な使用

```typescript
import { cn } from '@/lib/utils';

// 基本的なクラス名の結合
const className = cn('px-4', 'py-2', 'bg-blue-500');
// 結果: 'px-4 py-2 bg-blue-500'
```

### 条件付きクラス名

```typescript
const isActive = true;
const isDisabled = false;

const className = cn('px-4 py-2 rounded', {
  'bg-blue-500 text-white': isActive,
  'bg-gray-300 text-gray-500': isDisabled,
});
// 結果: 'px-4 py-2 rounded bg-blue-500 text-white'
```

### 競合の解決

```typescript
const className = cn('px-4', 'px-8', 'py-2');
// 結果: 'px-8 py-2' (px-4はpx-8で上書きされる)
```

### 配列とオブジェクトの組み合わせ

```typescript
const baseClasses = ['px-4', 'py-2'];
const conditionalClasses = {
  'bg-blue-500': true,
  'bg-red-500': false,
};

const className = cn(baseClasses, conditionalClasses);
// 結果: 'px-4 py-2 bg-blue-500'
```

### コンポーネントでの使用

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Button = ({ variant = 'primary', size = 'md', className, ...props }) => {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded font-medium',
        {
          'bg-blue-500 text-white': variant === 'primary',
          'bg-gray-500 text-white': variant === 'secondary',
        },
        {
          'px-2 py-1 text-sm': size === 'sm',
          'px-4 py-2': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
};
```

## 技術的な詳細

### clsx の動作

```typescript
clsx('px-4', 'py-2', { 'bg-blue-500': true, 'bg-red-500': false });
// 結果: 'px-4 py-2 bg-blue-500'
```

**clsx の特徴:**

- 文字列、数値、配列、オブジェクトを受け入れる
- 条件付きクラス名を効率的に処理
- 不要なスペースを自動で除去
- パフォーマンスが最適化されている

### tailwind-merge の動作

```typescript
twMerge('px-4 py-2', 'px-8 py-3');
// 結果: 'py-2 px-8 py-3' (px-4はpx-8で上書き、py-2は保持)
```

**tailwind-merge の特徴:**

- Tailwind CSS クラスの競合を解決
- 同じプロパティのクラスを適切に処理
- 後から指定されたクラスが優先される
- 不要なクラスを自動で除去

### 組み合わせの効果

```typescript
cn('px-4 py-2', { 'px-8': true }, 'py-3');
// 1. clsx('px-4 py-2', { 'px-8': true }, 'py-3')
//    → 'px-4 py-2 px-8 py-3'
// 2. twMerge('px-4 py-2 px-8 py-3')
//    → 'py-2 px-8 py-3'
```

## 設計思想

### 1. シンプルさ

- 単一の関数でクラス名管理を完結
- 直感的な API 設計
- 学習コストの最小化

### 2. 型安全性

- TypeScript による型チェック
- コンパイル時のエラー検出
- IDE での補完機能

### 3. パフォーマンス

- 軽量なライブラリの組み合わせ
- 不要な処理の削減
- メモ化との組み合わせ

## 将来の拡張予定

### 1. カスタムマージ関数

```typescript
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl'],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
```

### 2. テーマ対応

```typescript
import { useTheme } from '@/hooks/useTheme';

export function cn(...inputs: ClassValue[]) {
  const { theme } = useTheme();

  return twMerge(clsx(inputs), theme === 'dark' ? 'dark' : 'light');
}
```

### 3. デバッグ機能

```typescript
export function cn(...inputs: ClassValue[]) {
  const result = twMerge(clsx(inputs));

  if (process.env.NODE_ENV === 'development') {
    console.log('cn input:', inputs);
    console.log('cn output:', result);
  }

  return result;
}
```

### 4. メモ化対応

```typescript
import { useMemo } from 'react';

export function useCn(...inputs: ClassValue[]) {
  return useMemo(() => twMerge(clsx(inputs)), inputs);
}
```

## 注意点

### 1. パフォーマンス

- 大量のクラス名を処理する場合は注意
- 不要な再計算を避ける
- メモ化を適切に使用

### 2. 型安全性

- `ClassValue`型を正しく使用
- 型エラーを適切に処理
- 型定義の更新に注意

### 3. デバッグ

- 複雑なクラス名の組み合わせをデバッグ
- 期待通りの結果が得られているか確認
- 開発環境でのログ出力を活用

## 関連ファイル

- `src/renderer/components/ui/button.tsx`: 使用例
- `src/renderer/components/layout/MainLayout.tsx`: 使用例
- `package.json`: 依存関係の定義
- `tailwind.config.ts`: Tailwind CSS の設定

## テスト戦略

### 1. 基本的な結合テスト

```typescript
it('基本的なクラス名の結合が正しく動作すること', () => {
  expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  expect(cn('px-4', 'py-2', 'bg-blue-500')).toBe('px-4 py-2 bg-blue-500');
});
```

### 2. 条件付きクラス名テスト

```typescript
it('条件付きクラス名が正しく動作すること', () => {
  expect(cn('px-4', { 'bg-blue-500': true, 'bg-red-500': false })).toBe(
    'px-4 bg-blue-500'
  );
  expect(cn('px-4', { 'bg-blue-500': false, 'bg-red-500': true })).toBe(
    'px-4 bg-red-500'
  );
});
```

### 3. 競合解決テスト

```typescript
it('クラス名の競合が正しく解決されること', () => {
  expect(cn('px-4', 'px-8')).toBe('px-8');
  expect(cn('px-4 py-2', 'px-8 py-3')).toBe('py-2 px-8 py-3');
});
```

### 4. 配列とオブジェクトの組み合わせテスト

```typescript
it('配列とオブジェクトの組み合わせが正しく動作すること', () => {
  const baseClasses = ['px-4', 'py-2'];
  const conditionalClasses = { 'bg-blue-500': true };

  expect(cn(baseClasses, conditionalClasses)).toBe('px-4 py-2 bg-blue-500');
});
```

### 5. エッジケーステスト

```typescript
it('エッジケースが正しく処理されること', () => {
  expect(cn()).toBe('');
  expect(cn('')).toBe('');
  expect(cn(null, undefined, false, 0)).toBe('');
  expect(cn('px-4', null, 'py-2')).toBe('px-4 py-2');
});
```
