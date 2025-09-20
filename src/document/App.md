# App.tsx 詳細ドキュメント

## 概要

`App.tsx`は、Electron アプリケーションの Renderer プロセスにおける**ルートプロバイダコンポーネント**です。アプリ全体の共通プロバイダ（ThemeProvider、i18nProvider、Suspense など）を集約し、すべてのページコンポーネントに共通の機能を提供します。

## なぜこのコンポーネントが必要なのか？

### 1. プロバイダの集約

- React アプリケーションでは、複数の Context Provider を組み合わせて使用することが多い
- 各 Provider を個別に管理すると、Provider の順序や依存関係が複雑になる
- `AppProviders`で一元管理することで、Provider の階層を明確にし、保守性を向上させる

### 2. Electron 環境での特別な考慮

- Electron の Renderer プロセスは通常の Web ブラウザとは異なる環境
- メインプロセスとの通信、ファイルシステムアクセスなど、特別な機能が必要
- 将来的に Electron 専用の Provider（IPC 通信、ファイルアクセスなど）を追加する予定

### 3. 非同期処理の統一管理

- すべてのデータ取得コンポーネントを`Suspense`でラップ
- ローディング状態の統一的な管理
- エラーバウンダリとの組み合わせで、アプリ全体のエラーハンドリングを統一

## コンポーネントの詳細

### インターフェース定義

```typescript
interface AppProvidersProps {
  children: ReactNode;
}
```

**説明:**

- `children`: 子コンポーネント（通常は`RouterProvider`）
- `ReactNode`: React 要素、文字列、数値、配列など、React がレンダリングできるすべての型を含む

### コンポーネント実装

```typescript
const AppProviders = ({ children }: AppProvidersProps) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};
```

**詳細説明:**

#### Suspense の役割

- **目的**: 非同期コンポーネントのローディング状態を管理
- **動作**: 子コンポーネントが非同期処理中の場合、`fallback`で指定された UI を表示
- **使用例**: `use()`フックや`React.lazy()`で読み込まれるコンポーネント

#### fallback プロパティ

- **現在の実装**: `<div>Loading...</div>`
- **将来の改善案**:
  - スピナーアニメーション
  - プログレスバー
  - スケルトン UI
  - エラーメッセージ

## 使用例

### 基本的な使用

```typescript
// main.tsxでの使用例
<AppProviders>
  <RouterProvider router={router} />
</AppProviders>
```

### 現在の実装

```typescript
// 現在の実装
const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </I18nextProvider>
    </ThemeProvider>
  );
};
```

## 設計思想

### 1. 単一責任の原則

- このコンポーネントは「プロバイダの集約」のみに責任を持つ
- ビジネスロジックや UI ロジックは含まない

### 2. 拡張性の考慮

- 新しい Provider を追加する際は、このコンポーネントを修正する
- 各ページコンポーネントは変更不要

### 3. テストの容易さ

- プロバイダのテストは、このコンポーネントをテストすることで網羅できる
- 各ページコンポーネントのテストでは、このコンポーネントをモック化

## 注意点

### 1. Provider の順序

- Context Provider は、外側から内側に向かって適用される
- 依存関係のある Provider は、依存先を内側に配置する必要がある

### 2. パフォーマンス

- すべての Provider が再レンダリングされる可能性がある
- 必要に応じて`useMemo`や`useCallback`で最適化を検討

### 3. エラーハンドリング

- 現在は基本的なエラーハンドリングを実装
- 必要に応じて`ErrorBoundary`コンポーネントでラップすることを検討

## 関連ファイル

- `src/main.tsx`: このコンポーネントを使用
- `src/routes/index.tsx`: 子コンポーネントとして`RouterProvider`を渡す
- 将来的な Provider ファイル: `src/renderer/providers/`配下に配置予定

## 購入フォーム機能

### 概要

レース分析結果に基づいて馬券を購入する機能を提供。netkeiba スタイルの UI で直感的な馬券購入が可能。

### 主要コンポーネント

- **PurchaseForm**: メイン購入フォーム
- **BetSelectionForm**: 馬券種別・買い方選択
- **HorseSelector**: 馬選択テーブル
- **PurchaseSummary**: 購入内容サマリー
- **ActionButtons**: 購入・キャンセルボタン

### 機能

- 馬券種別（単勝、馬連、3 連複など）の選択
- 買い方（単複、流し、フォーメーション、ボックス）の選択
- netkeiba スタイルの馬選択テーブル
- 組み合わせ数計算とバリデーション
- レスポンシブ対応
