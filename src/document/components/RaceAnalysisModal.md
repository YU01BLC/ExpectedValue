# RaceAnalysisModal コンポーネント

## 概要

レース分析モーダルコンポーネントです。馬情報テーブル、分析チャート、推奨買い目を統合して表示します。

## 機能

- 馬情報テーブルの表示（ソート機能付き）
- レース分析チャートの表示
- 推奨買い目の表示
- モーダルの開閉制御
- 多言語対応

## Props

```typescript
interface RaceAnalysisModalProps {
  open: boolean; // モーダルの表示状態
  onClose: () => void; // モーダルを閉じるコールバック
}
```

## 構成コンポーネント

- `RaceTable`: 馬情報テーブル
- `RaceCharts`: 分析チャートセクション
- `RecommendedBets`: 推奨買い目

## データ管理

- 馬情報: モックデータ（`mockHorseData`）
- 推奨買い目: モックデータ（`mockRecommendedBets`）
- ソート状態: 内部で管理

## ソート機能

以下のフィールドでソートが可能：

- 馬番、枠番、評価、期待値、オッズ

## スタイリング

- ガラス風のモーダルデザイン
- バックドロップフィルター
- レスポンシブ対応
- 最大サイズ: 95vw × 95vh

## 多言語対応

翻訳キーは `common` ネームスペースから取得：

- `modal.raceAnalysis`: モーダルタイトル
- `modal.allHorseDiagnosis`: 全頭診断
- `modal.close`: 閉じるボタン

## 使用例

```tsx
const [isModalOpen, setIsModalOpen] = useState(false);

<RaceAnalysisModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />;
```

## 注意事項

- 現在はモックデータを使用
- 実際のデータ取得機能は未実装
- チャートの詳細設定は `RaceCharts` コンポーネントで管理
