# theme.ts 詳細ドキュメント

## 概要

`theme.ts`は、MUI（Material-UI）のテーマ設定を管理するファイルです。アプリケーション全体のデザインシステムを定義し、一貫した UI 体験を提供します。

## なぜこのファイルが必要なのか？

### 1. デザインシステムの統一

- カラーパレットの一元管理
- タイポグラフィの統一
- コンポーネントスタイルの一貫性

### 2. ダークモード対応

- ダークテーマの実装
- アクセシビリティの向上
- ユーザー体験の向上

### 3. 保守性の向上

- デザイン変更の一元化
- カスタムカラーの管理
- レスポンシブ対応

## ファイル構造

### インポート文

```typescript
import { createTheme } from '@mui/material/styles';
```

**説明:**

- `createTheme`: MUI のテーマ作成関数
- 型安全性を確保

### カスタムカラーパレット

```typescript
const customColors = {
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    // ... 900まで
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    // ... 900まで
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    // ... 900まで
  },
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    // ... 900まで
  },
} as const;
```

**設計思想:**

- 50-900 の階調でカラーを定義
- `as const`で型安全性を確保
- セマンティックなカラー名を使用

## テーマ設定の詳細

### パレット設定

```typescript
palette: {
  mode: 'dark',
  primary: {
    main: customColors.blue[400],
    light: customColors.blue[300],
    dark: customColors.blue[500],
  },
  secondary: {
    main: customColors.green[500],
    light: customColors.green[400],
    dark: customColors.green[600],
  },
  error: {
    main: customColors.red[400],
    light: customColors.red[300],
    dark: customColors.red[500],
  },
  background: {
    default: customColors.slate[900],
    paper: 'rgba(30, 41, 59, 0.72)', // ガラス風
  },
  text: {
    primary: customColors.slate[200],
    secondary: customColors.slate[400],
  },
}
```

**カラー設計:**

- **Primary**: ブルー系（メインアクション）
- **Secondary**: グリーン系（成功・ポジティブ）
- **Error**: レッド系（エラー・警告）
- **Background**: ダークスレート系
- **Text**: 高コントラストのテキストカラー

### タイポグラフィ設定

```typescript
typography: {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: '3.75rem',
    fontWeight: 900,
    letterSpacing: '-0.025em',
  },
  // h2-h6, body1, body2 の設定
}
```

**フォント設計:**

- **Font Family**: Inter を優先、フォールバック付き
- **Heading**: 大きなサイズ、太字、タイトな文字間隔
- **Body**: 読みやすいサイズ、適切な行間

### 形状設定

```typescript
shape: {
  borderRadius: 12,
}
```

**デザイン原則:**

- 統一された角丸（12px）
- モダンなデザイン
- アクセシビリティを考慮

### ブレークポイント設定

```typescript
breakpoints: {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
}
```

**レスポンシブ設計:**

- モバイルファーストアプローチ
- 段階的なブレークポイント
- デバイス別最適化

### コンポーネントカスタマイズ

```typescript
components: {
  MuiCard: {
    styleOverrides: {
      root: {
        background: 'linear-gradient(180deg, rgba(30,41,59,0.72) 0%, rgba(30,41,59,0.46) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(148, 163, 184, .25)',
        boxShadow: '0 18px 48px rgba(2,6,23,.55)',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: 'none',
        fontWeight: 500,
      },
    },
  },
}
```

**カスタマイズ内容:**

- **Card**: ガラス風デザイン、ブラー効果
- **Button**: 角丸、テキスト変換なし、適切なフォントウェイト

## 使用例

### テーマの適用

```typescript
// App.tsx での使用
import { ThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '@/theme/theme';

const AppProviders = ({ children }: AppProvidersProps) => {
  const theme = createAppTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
```

### コンポーネントでの使用

```typescript
// テーマカラーの使用
import { useTheme } from '@mui/material/styles';

const MyComponent = () => {
  const theme = useTheme();

  return <Box sx={{ color: theme.palette.primary.main }}>テキスト</Box>;
};
```

### レスポンシブデザイン

```typescript
// ブレークポイントの使用
<Box
  sx={{
    display: { xs: 'block', md: 'flex' },
    gap: { xs: 2, md: 4 },
  }}
>
  コンテンツ
</Box>
```

## カラーパレットの詳細

### ブルー系（Primary）

```typescript
blue: {
  50: '#eff6ff',   // 最も薄い
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',  // メインカラー
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',  // 最も濃い
}
```

**使用場面:**

- メインアクションボタン
- リンク
- アクセントカラー

### グリーン系（Secondary）

```typescript
green: {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',  // メインカラー
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
}
```

**使用場面:**

- 成功メッセージ
- ポジティブな指標
- チェックマーク

### レッド系（Error）

```typescript
red: {
  50: '#fef2f2',
  100: '#fee2e2',
  200: '#fecaca',
  300: '#fca5a5',
  400: '#f87171',  // メインカラー
  500: '#ef4444',
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
  900: '#7f1d1d',
}
```

**使用場面:**

- エラーメッセージ
- 警告
- 削除ボタン

### スレート系（Neutral）

```typescript
slate: {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',  // 背景色
}
```

**使用場面:**

- 背景色
- テキストカラー
- ボーダー

## アクセシビリティ

### コントラスト比

- **テキスト**: 4.5:1 以上のコントラスト比を確保
- **背景**: 十分なコントラストを提供
- **カラー**: 色覚異常者への配慮

### フォントサイズ

- **最小サイズ**: 14px 以上
- **読みやすさ**: 適切な行間と文字間隔
- **スケーラビリティ**: ユーザー設定に対応

## パフォーマンス考慮

### テーマの最適化

```typescript
// テーマのメモ化
const theme = useMemo(() => createAppTheme(), []);
```

### カスタムカラーの効率化

- 定数として定義
- 型安全性の確保
- 再利用性の向上

## 将来の拡張予定

### 1. ライトモード対応

```typescript
const createAppTheme = (mode: 'light' | 'dark' = 'dark') => {
  return createTheme({
    palette: {
      mode,
      // モードに応じたカラー設定
    },
  });
};
```

### 2. 動的テーマ

```typescript
// ユーザー設定に基づくテーマ
const useDynamicTheme = (userPreferences: UserPreferences) => {
  return useMemo(() => {
    return createTheme({
      palette: {
        primary: {
          main: userPreferences.primaryColor,
        },
      },
    });
  }, [userPreferences]);
};
```

### 3. テーマの永続化

```typescript
// ローカルストレージでのテーマ保存
const usePersistedTheme = () => {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('themeMode') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  return { themeMode, setThemeMode };
};
```

## 注意点

### 1. カラーの一貫性

- 定義されたカラーパレットのみを使用
- ハードコードされたカラーコードを避ける

### 2. パフォーマンス

- テーマの再作成を避ける
- メモ化の適切な使用

### 3. アクセシビリティ

- コントラスト比の確認
- 色覚異常者への配慮

## 関連ファイル

- `src/renderer/App.tsx`: テーマプロバイダーの設定
- `src/renderer/components/ui/RichStatCard.tsx`: テーマカラーの使用例
- `src/renderer/features/dashboard/components/ChartCard.tsx`: MUI コンポーネントの使用例

## テスト戦略

### 1. テーマの適用テスト

```typescript
it('テーマが正しく適用されること', () => {
  render(
    <ThemeProvider theme={createAppTheme()}>
      <Box data-testid='test-box' />
    </ThemeProvider>
  );

  const box = screen.getByTestId('test-box');
  expect(box).toHaveStyle('background-color: rgb(15, 23, 42)');
});
```

### 2. レスポンシブテスト

```typescript
it('ブレークポイントが正しく動作すること', () => {
  render(
    <ThemeProvider theme={createAppTheme()}>
      <Box sx={{ display: { xs: 'block', md: 'flex' } }} />
    </ThemeProvider>
  );

  // レスポンシブ動作のテスト
});
```

### 3. アクセシビリティテスト

```typescript
it('コントラスト比が適切であること', () => {
  const theme = createAppTheme();
  const contrast = getContrastRatio(
    theme.palette.text.primary,
    theme.palette.background.default
  );

  expect(contrast).toBeGreaterThanOrEqual(4.5);
});
```
