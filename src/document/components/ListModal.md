# ListModal コンポーネント

## 概要

レース一覧モーダルコンポーネントです。馬情報テーブル、分析チャート、推奨買い目を表示します。

## 機能

- 馬情報テーブルの表示
- レース分析チャートの表示
- 推奨買い目の表示
- モーダルの開閉制御

## Props

```typescript
interface ListModalProps {
  open: boolean; // モーダルの表示状態
  onClose: () => void; // モーダルを閉じるコールバック
}
```

## 構成コンポーネント

- `ListTable`: 馬情報テーブル（ソート機能なし）
- `ListCharts`: 分析チャートセクション
- `RecommendedBets`: 推奨買い目

## データ管理

- 馬情報: モックデータ（`mockHorseData`）
- 推奨買い目: モックデータ（`mockRecommendedBets`）
- チャートデータ: 馬情報から動的生成

## チャートデータ

勝率 × オッズチャート用のデータを馬情報から生成：

```typescript
const winRateOddsData = mockHorseData.map((horse) => ({
  winRate: horse.winRate,
  odds: horse.odds,
  name: horse.name,
}));
```

## スタイリング

- ガラス風のモーダルデザイン
- バックドロップフィルター
- レスポンシブ対応
- 最大サイズ: 95vw × 95vh

## 使用例

```tsx
const [isModalOpen, setIsModalOpen] = useState(false);

<ListModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />;
```

## RaceAnalysisModal との違い

- ソート機能なし
- よりシンプルなテーブル表示
- チャートデータの生成方法が異なる

## 注意事項

- 現在はモックデータを使用
- 多言語対応は未実装
- 実際のデータ取得機能は未実装
