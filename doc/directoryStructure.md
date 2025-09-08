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
│ │ │ │ ├── Button.tsx
│ │ │ │ ├── Button.module.css # CSS Modules ファイル
│ │ │ │ ├── Input.tsx
│ │ │ │ ├── Input.module.css
│ │ │ │ └── ... # 他の共通 atoms
│ │ │ └── ... # 必要に応じて molecules/organisms 等
│ │ └── layout/ # 共通レイアウト
│ │ ├── Sidebar.tsx # グローバルサイドバー
│ │ ├── Sidebar.module.css
│ │ ├── Header.tsx # グローバルヘッダー
│ │ ├── Header.module.css
│ │ ├── MainLayout.tsx # メインレイアウトラッパー
│ │ └── MainLayout.module.css
│ │
│ ├── features/ # 機能ごとのモジュール (Feature 型)
│ │ ├── dashboard/ # ダッシュボード機能
│ │ │ ├── components/ # 機能固有コンポーネント
│ │ │ │ ├── atoms/ # 機能固有の最小 UI パーツ
│ │ │ │ │ ├── StatLabel.tsx
│ │ │ │ │ └── StatLabel.module.css
│ │ │ │ ├── Chart.tsx
│ │ │ │ └── Chart.module.css
│ │ │ ├── hooks/ # 機能固有フック
│ │ │ │ └── useDashboardData.ts
│ │ │ ├── index.tsx
│ │ │ └── Dashboard.module.css
│ │ │
│ │ └── other... # 他の機能
│ │ └── ...
│ │
│ ├── hooks/ # グローバルなカスタムフック (Layer 型)
│ │ ├── useSidebar.ts # サイドバー状態管理フック
│ │ └── useAuth.ts # 認証関連フック
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
│ │ ├── en/ # 英語
│ │ │ ├── common.json # namespace 共通
│ │ │ └── home.json # namespace ホーム画面
│ │ └── ja/
│ │ ├── common.json
│ │ └── home.json
│ │
│ ├── routes/ # ルーティング設定
│ │ └── index.tsx
│ │
│ ├── store/ # 状態管理（Zustand）
│ │ ├── slices/ # Slice 定義
│ │ │ ├── authSlice.ts
│ │ │ └── othreSlice.ts
│ │ ├── hooks.ts # Store 関連の hook
│ │ ├── index.ts # Store 定義
│ │ └── types.ts
│ │
│ ├── App.tsx # レンダラーのルートコンポーネント
│ └── index.tsx # レンダラーのエントリーポイント
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
