# ディレクトリ構成ルール

- 以下のディレクトリ構成に従って実装を行うこと
- 各機能・レイヤーごとに適切なディレクトリに配置すること
- テストファイルは実装ファイルと同じ階層に`__tests__`フォルダを作成し、その中に格納すること
- ディレクトリ構成に逸脱がある場合は必ず修正・指摘すること

---

src/
├── main/ # Electron Main Process
│ ├── main.ts # Electron エントリーポイント
│ ├── preload.ts # プリロードスクリプト
│ ├── menu.ts # アプリケーションメニュー設定
│ ├── window.ts # ウィンドウ管理
│ ├── ipc/ # IPC 通信ハンドラ
│ │ ├── handlers.ts # メイン処理ハンドラ
│ │ └── channels.ts # IPC 通信チャネル定義
│ └── utils/ # ユーティリティ関数（メイン用）
│ ├── logger.ts
│ └── store.ts # 永続化ストア (electron-store)
│
├── renderer/ # Electron Renderer Process (React)
│ ├── components/ # 共通コンポーネント (Layer 型)
│ │ ├── ui/ # 純粋な UI コンポーネント
│ │ │ ├── atoms/ # アプリ全体で共通利用する最小 UI パーツ
│ │ │ │ ├── Card.tsx # 共通カードコンポーネント
│ │ │ │ ├── **tests**/ # テストファイル
│ │ │ │ │ └── Card.test.tsx
│ │ │ │ ├── Button.tsx
│ │ │ │ ├── Button.module.css # CSS Modules ファイル
│ │ │ │ ├── Input.tsx
│ │ │ │ ├── Input.module.css
│ │ │ │ └── ... # 他の共通 atoms
│ │ │ ├── RichStatCard.tsx # リッチ統計カード
│ │ │ ├── RichStatCard.md
│ │ │ ├── RecommendationsCard.tsx # おすすめカード
│ │ │ ├── RecommendationsCard.md
│ │ │ ├── **tests**/ # テストファイル
│ │ │ │ ├── RichStatCard.test.tsx
│ │ │ │ └── RecommendationsCard.test.tsx
│ │ │ └── index.ts # UI コンポーネントのエクスポート
│ │ └── layout/ # 共通レイアウト
│ │ ├── MainLayout.tsx # メインレイアウトラッパー
│ │ ├── MainLayout.md
│ │ └── **tests**/ # テストファイル
│ │ └── MainLayout.test.tsx
│ │
│ ├── features/ # 機能ごとのモジュール (Feature 型)
│ │ ├── dashboard/ # ダッシュボード機能
│ │ │ ├── components/ # 機能固有コンポーネント
│ │ │ │ ├── atoms/ # 機能固有の最小 UI パーツ
│ │ │ │ │ ├── StatLabel.tsx
│ │ │ │ │ └── StatLabel.module.css
│ │ │ │ ├── SummaryCards.tsx # サマリーカード群
│ │ │ │ ├── SummaryCards.md
│ │ │ │ ├── ChartCard.tsx # チャートカード
│ │ │ │ ├── ChartCard.md
│ │ │ │ └── **tests**/ # テストファイル
│ │ │ │ ├── SummaryCards.test.tsx
│ │ │ │ └── ChartCard.test.tsx
│ │ │ ├── hooks/ # 機能固有フック
│ │ │ │ └── useDashboardData.ts
│ │ │ ├── index.tsx # ダッシュボードページ
│ │ │ ├── index.md
│ │ │ └── Dashboard.module.css
│ │ │
│ │ └── other... # 他の機能
│ │ └── ...
│ │
│ ├── hooks/ # グローバルなカスタムフック (Layer 型)
│ │ ├── useThemeColor.ts # テーマカラー解決フック
│ │ ├── useSidebar.ts # サイドバー状態管理フック
│ │ ├── useAuth.ts # 認証関連フック
│ │ └── **tests**/ # テストファイル
│ │ └── useThemeColor.test.tsx
│ │
│ ├── utils/ # ユーティリティ関数 (Layer 型)
│ │ ├── formatting.ts
│ │ └── electron.ts # Electron API ラッパー
│ │
│ ├── services/ # サービス層 (IPC 通信など)
│ │ ├── ipc.ts # IPC 通信ラッパー
│ │ └── api.ts # 外部 API 通信
│ │
│ ├── i18n/ # 国際化
│ │ ├── index.ts # i18n 設定ファイル
│ │ ├── index.md # i18n 詳細ドキュメント
│ │ ├── en/ # 英語
│ │ │ ├── common.json # namespace 共通
│ │ │ └── dashboard.json # namespace ダッシュボード
│ │ └── ja/ # 日本語
│ │ ├── common.json # namespace 共通
│ │ └── dashboard.json # namespace ダッシュボード
│ │
│ ├── routes/ # ルーティング設定
│ │ ├── index.tsx # ルート定義
│ │ └── index.md # ルート詳細ドキュメント
│ │
│ ├── store/ # 状態管理（Zustand）
│ │ ├── slices/ # Slice 定義
│ │ │ ├── authSlice.ts
│ │ │ └── othreSlice.ts
│ │ ├── hooks.ts # Store 関連の hook
│ │ ├── index.ts # Store 定義
│ │ └── types.ts
│ │
│ ├── theme/ # テーマ管理
│ │ ├── theme.ts # MUI テーマ設定
│ │ └── theme.md # テーマ詳細ドキュメント
│ │
│ ├── App.tsx # レンダラーのルートコンポーネント
│ ├── App.md # App 詳細ドキュメント
│ ├── index.tsx # レンダラーのエントリーポイント
│ └── **tests**/ # テストファイル
│ └── App.test.tsx
│
├── shared/ # Main・Renderer 間で共有するコード
│ ├── types/ # 共有型定義
│ │ └── index.ts
│ ├── constants.ts # 共有定数
│ └── utils/ # 共有ユーティリティ
│ └── validation.ts
│
├── assets/ # 静的アセット
│ ├── images/
│ └── icons/
│
└── index.html # エントリーポイント HTML
