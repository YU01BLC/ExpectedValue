# ChartCard コンポーネント

## 概要

チャート表示用の共通カードコンポーネントです。各種チャートを統一されたデザインで表示し、内訳情報も含めて表示します。

## 機能

- 統一されたカードデザイン
- チャートと内訳の表示
- ホバー時のアニメーション効果
- レスポンシブ対応
- グラフ/内訳の切り替え機能（モバイル用）

## Props

```typescript
interface ChartCardProps {
  title: string; // カードのタイトル
  color: string; // カードのアクセントカラー
  height?: number; // カードの高さ（デフォルト: 600）
  children: ReactNode; // チャートコンテンツ
  breakdownData: Array<{
    name: string;
    value: string | number;
    color?: string;
    horses?: { number: number; name: string }[];
  }>; // 内訳データ
  showBreakdown?: boolean; // 内訳表示の有無（デフォルト: true）
  enableToggle?: boolean; // 切り替え機能の有無（デフォルト: false）
}
```

## 表示モード

### デスクトップ表示

- チャートと内訳を同時表示
- 内訳は下部に配置
- スクロール可能な内訳エリア

### モバイル表示（enableToggle=true）

- グラフ/内訳の切り替えボタン
- タップで表示モードを切り替え
- 内訳は全画面表示

## 内訳データ

```typescript
interface BreakdownItem {
  name: string; // 項目名
  value: string | number; // 値
  color?: string; // 色（未指定時はカードのアクセントカラー）
  horses?: {
    // 該当馬の情報
    number: number; // 馬番
    name: string; // 馬名
  }[];
}
```

## スタイリング

- ガラス風のカードデザイン
- グラデーション背景
- ホバー時の浮き上がり効果
- カスタムスクロールバー
- 枠番の色分け表示

## 使用例

```tsx
<ChartCard
  title='コース傾向'
  color={colors.success}
  height={400}
  breakdownData={breakdownData}
  enableToggle={true}
>
  <PieChart data={chartData} />
</ChartCard>
```

## 注意事項

- 内訳データが空の場合は内訳セクションを非表示
- モバイル表示では切り替え機能を有効にすることを推奨
- テーマカラーを使用して色分けを実装
