import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 翻訳リソース
import jaCommon from './ja/common.json';
import jaDashboard from './ja/dashboard.json';
import enCommon from './en/common.json';
import enDashboard from './en/dashboard.json';

/**
 * i18n設定
 * - デフォルト言語: 日本語
 * - フォールバック言語: 日本語
 * - エスケープ無効化（ReactでXSS対策済み）
 * - デバッグモード: 開発環境のみ
 */
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
    escapeValue: false, // ReactでXSS対策済み
  },
  react: {
    useSuspense: false, // SSR対応
  },
});

export default i18n;
