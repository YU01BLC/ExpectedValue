# SummaryCards コンポーネント

## 概要

ダッシュボードの上部に表示される 3 つのサマリーカードを管理するコンポーネントです。

## 目的

- 総回収率、収支、おすすめ情報を一括で表示
- カードのレイアウトとスタイリングを統一
- 期間に応じたデータの表示を管理

## 実装詳細

### Props

- `summaryData: SummaryData` - サマリーデータ（ROI、収支）
- `recommendations: RecommendationItem[]` - おすすめ情報の配列
- `period: 'day' | 'week' | 'month' | 'year'` - 表示期間

### 内部処理

1. おすすめ情報を EV 値でソートして上位 3 件を取得
2. 3 つのカードを横並びで表示
3. レスポンシブ対応（小画面では横スクロール）

### 使用コンポーネント

- `RichStatCard` - 総回収率・収支カード
- `RecommendationsCard` - おすすめカード

## スタイリング

- Tailwind CSS クラスを使用
- カード間の間隔: `gap-x-[56px] gap-y-8 xl:gap-x-[72px]`
- カード幅: 固定 500px
- 横スクロール対応: `overflow-x-auto`

## 設計理由

- カードの表示ロジックを一箇所に集約
- Dashboard.tsx の行数を削減（300 行制限対応）
- 再利用可能なコンポーネントとして分離

## 将来の拡張

- カードの種類を動的に変更可能にする
- アニメーション効果の追加
- カスタマイズ可能なレイアウト設定

## 関連ファイル

- `src/pages/Dashboard.tsx` - 親コンポーネント
- `src/renderer/components/ui/RichStatCard.tsx` - 使用コンポーネント
- `src/renderer/components/ui/RecommendationsCard.tsx` - 使用コンポーネント

## テスト戦略

- 各期間でのデータ表示確認
- レスポンシブレイアウトのテスト
- カードクリック時の動作確認
