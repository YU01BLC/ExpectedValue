# i18n 詳細ドキュメント

## 概要

`index.ts`は、アプリケーションの国際化（i18n）設定を管理するファイルです。多言語対応を提供し、ユーザーの言語設定に応じて適切な翻訳を表示します。

## なぜこのファイルが必要なのか？

### 1. 多言語対応

- 日本語と英語の翻訳を提供
- ユーザーの言語設定に応じた表示
- グローバルなユーザビリティの向上

### 2. 保守性の向上

- 翻訳テキストの一元管理
- ハードコードされたテキストの排除
- 翻訳の更新が容易

### 3. スケーラビリティ

- 新しい言語の追加が容易
- 翻訳ファイルの構造化
- 機能単位での翻訳管理

## ファイル構造

### インポート文

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 翻訳リソース
import jaCommon from './ja/common.json';
import jaDashboard from './ja/dashboard.json';
import enCommon from './en/common.json';
import enDashboard from './en/dashboard.json';
```

**説明:**

- `i18next`: 国際化ライブラリのコア
- `initReactI18next`: React 用の i18next プラグイン
- 翻訳ファイル: 言語・機能別に分割

### 翻訳リソースの構造

```
src/renderer/i18n/
├── index.ts              # 設定ファイル
├── ja/                   # 日本語翻訳
│   ├── common.json       # 共通翻訳
│   └── dashboard.json    # ダッシュボード翻訳
└── en/                   # 英語翻訳
    ├── common.json       # 共通翻訳
    └── dashboard.json    # ダッシュボード翻訳
```

## 設定の詳細

### i18n 初期化

```typescript
i18n.use(initReactI18next).init({
  resources: {
    ja: {
      common: jaCommon,
      dashboard: jaDashboard,
    },
    en: {
      common: enCommon,
      dashboard: enDashboard,
    },
  },
  lng: 'ja',
  fallbackLng: 'ja',
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});
```

**設定項目の説明:**

#### resources

- **目的**: 翻訳リソースの定義
- **構造**: `言語: { namespace: 翻訳データ }`
- **例**: `ja: { common: jaCommon, dashboard: jaDashboard }`

#### lng

- **目的**: デフォルト言語の設定
- **値**: `'ja'`（日本語）
- **機能**: アプリ起動時の言語

#### fallbackLng

- **目的**: フォールバック言語の設定
- **値**: `'ja'`（日本語）
- **機能**: 翻訳が見つからない場合の代替言語

#### debug

- **目的**: デバッグモードの設定
- **値**: 開発環境のみ`true`
- **機能**: 翻訳のデバッグ情報を表示

#### interpolation

- **目的**: 補間設定
- **escapeValue**: `false`（React で XSS 対策済み）
- **機能**: 変数の補間処理

#### react

- **目的**: React 用設定
- **useSuspense**: `false`（SSR 対応）
- **機能**: React Suspense との連携

## 翻訳ファイルの詳細

### 共通翻訳（common.json）

#### 日本語版

```json
{
  "app": {
    "title": "Expected Value Tracker",
    "subtitle": "回収率を最大化するためのダッシュボード"
  }
}
```

#### 英語版

```json
{
  "app": {
    "title": "Expected Value Tracker",
    "subtitle": "Dashboard to maximize return rate"
  }
}
```

### ダッシュボード翻訳（dashboard.json）

#### 日本語版

```json
{
  "summaryCards": {
    "totalRoi": "総回収率",
    "profit": "収支",
    "recommendations": "本日のおすすめ",
    "roiCaption": "参考。過去表示周期の推移",
    "profitCaption": "推移を下のグラフで確認"
  },
  "chart": {
    "title": "回収率推移",
    "periods": {
      "day": "日",
      "week": "週",
      "month": "月",
      "year": "年"
    }
  }
}
```

#### 英語版

```json
{
  "summaryCards": {
    "totalRoi": "Total ROI",
    "profit": "Profit",
    "recommendations": "Today's Recommendations",
    "roiCaption": "Reference. Past period trends",
    "profitCaption": "Check trends in the chart below"
  },
  "chart": {
    "title": "ROI Trends",
    "periods": {
      "day": "Day",
      "week": "Week",
      "month": "Month",
      "year": "Year"
    }
  }
}
```

## 使用方法

### コンポーネントでの使用

```typescript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation(['common', 'dashboard']);

  return (
    <div>
      <h1>{t('common:app.title')}</h1>
      <p>{t('common:app.subtitle')}</p>
      <h2>{t('dashboard:summaryCards.totalRoi')}</h2>
    </div>
  );
};
```

### 翻訳キーの指定方法

```typescript
// 単一namespace
const { t } = useTranslation('dashboard');

// 複数namespace
const { t } = useTranslation(['common', 'dashboard']);

// 翻訳キーの使用
t('common:app.title'); // common namespace
t('dashboard:chart.title'); // dashboard namespace
t('chart.title'); // 現在のnamespace（dashboard）
```

### 変数の補間

```typescript
// 翻訳ファイル
{
  "welcome": "こんにちは、{{name}}さん！"
}

// コンポーネント
const { t } = useTranslation('common');
return <p>{t('welcome', { name: '田中' })}</p>;
```

## 翻訳ファイルの管理

### 命名規則

- **ファイル名**: 機能名 + `.json`
- **キー名**: 階層構造で管理
- **値**: 実際の表示テキスト

### 階層構造

```json
{
  "namespace": {
    "category": {
      "item": "翻訳テキスト"
    }
  }
}
```

**例:**

```json
{
  "dashboard": {
    "summaryCards": {
      "totalRoi": "総回収率"
    }
  }
}
```

### 翻訳キーの設計原則

1. **意味のある名前**: 機能を表す名前を使用
2. **階層化**: 関連する翻訳をグループ化
3. **一貫性**: 同じ概念には同じキー名を使用
4. **拡張性**: 将来の追加に対応できる構造

## 多言語対応の実装

### 言語切り替え機能

```typescript
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <select onChange={(e) => changeLanguage(e.target.value)}>
      <option value='ja'>日本語</option>
      <option value='en'>English</option>
    </select>
  );
};
```

### 言語の永続化

```typescript
// ローカルストレージでの言語設定保存
const usePersistedLanguage = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return { changeLanguage };
};
```

## パフォーマンス考慮

### 遅延読み込み

```typescript
// 翻訳ファイルの遅延読み込み
const loadTranslation = async (lng: string, ns: string) => {
  const translation = await import(`./${lng}/${ns}.json`);
  return translation.default;
};

i18n.use(Backend).init({
  backend: {
    loadPath: loadTranslation,
  },
});
```

### メモ化

```typescript
// 翻訳結果のメモ化
const TranslatedText = memo(
  ({ translationKey }: { translationKey: string }) => {
    const { t } = useTranslation();
    return <span>{t(translationKey)}</span>;
  }
);
```

## エラーハンドリング

### 翻訳が見つからない場合

```typescript
// フォールバック翻訳の設定
i18n.init({
  fallbackLng: 'ja',
  fallbackNS: 'common',
  // 翻訳が見つからない場合の処理
  missingKeyHandler: (lng, ns, key) => {
    console.warn(`Missing translation: ${lng}.${ns}.${key}`);
  },
});
```

### 翻訳の検証

```typescript
// 翻訳の完全性チェック
const validateTranslations = () => {
  const requiredKeys = [
    'common:app.title',
    'common:app.subtitle',
    'dashboard:summaryCards.totalRoi',
  ];

  requiredKeys.forEach((key) => {
    if (!i18n.exists(key)) {
      console.error(`Missing required translation: ${key}`);
    }
  });
};
```

## 将来の拡張予定

### 1. 新しい言語の追加

```typescript
// 中国語の追加例
import zhCommon from './zh/common.json';
import zhDashboard from './zh/dashboard.json';

i18n.init({
  resources: {
    ja: { common: jaCommon, dashboard: jaDashboard },
    en: { common: enCommon, dashboard: enDashboard },
    zh: { common: zhCommon, dashboard: zhDashboard }, // 新規追加
  },
});
```

### 2. 動的翻訳の読み込み

```typescript
// APIから翻訳を取得
const loadTranslationsFromAPI = async (lng: string) => {
  const response = await fetch(`/api/translations/${lng}`);
  return response.json();
};
```

### 3. 翻訳の自動検出

```typescript
// ブラウザの言語設定を自動検出
const detectLanguage = () => {
  const browserLang = navigator.language.split('-')[0];
  return ['ja', 'en'].includes(browserLang) ? browserLang : 'ja';
};
```

## 注意点

### 1. 翻訳の一貫性

- 同じ概念には同じ翻訳を使用
- 翻訳者間での用語の統一

### 2. 文化的配慮

- 文化的な違いを考慮した翻訳
- 適切な敬語の使用

### 3. パフォーマンス

- 不要な翻訳ファイルの読み込みを避ける
- 翻訳結果のキャッシュ

## 関連ファイル

- `src/renderer/App.tsx`: i18n の初期化
- `src/renderer/features/dashboard/index.tsx`: 翻訳の使用例
- `src/renderer/i18n/ja/common.json`: 日本語共通翻訳
- `src/renderer/i18n/en/common.json`: 英語共通翻訳

## テスト戦略

### 1. 翻訳の表示テスト

```typescript
it('翻訳が正しく表示されること', () => {
  render(<Dashboard />);
  expect(screen.getByText('Expected Value Tracker')).toBeInTheDocument();
});
```

### 2. 言語切り替えテスト

```typescript
it('言語切り替えが正しく動作すること', async () => {
  const user = userEvent.setup();
  render(<LanguageSwitcher />);

  await user.selectOptions(screen.getByRole('combobox'), 'en');
  expect(
    screen.getByText('Dashboard to maximize return rate')
  ).toBeInTheDocument();
});
```

### 3. 翻訳キーの存在テスト

```typescript
it('必要な翻訳キーが存在すること', () => {
  const requiredKeys = [
    'common:app.title',
    'common:app.subtitle',
    'dashboard:summaryCards.totalRoi',
  ];

  requiredKeys.forEach((key) => {
    expect(i18n.exists(key)).toBe(true);
  });
});
```
