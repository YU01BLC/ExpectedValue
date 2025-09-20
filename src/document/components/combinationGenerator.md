# combinationGenerator

馬券の組み合わせ生成ユーティリティ

## 概要

馬券の組み合わせを生成するユーティリティ関数を提供。選択された馬から実際の馬券組み合わせを生成する。

## 主要関数

### generateTicketCombinations

```typescript
function generateTicketCombinations(
  columnHorses: (number | undefined)[][],
  betType: string,
  method: string,
  axisHorse?: number,
  nagashiType?: string
): BetTicket[];
```

馬券の組み合わせを生成する。

#### パラメータ

- `columnHorses`: 選択された馬の配列
- `betType`: 馬券種別
- `method`: 買い方
- `axisHorse`: 軸馬（流し買いの場合）
- `nagashiType`: 流しタイプ

#### 戻り値

- 生成された馬券の配列

### 生成ロジック

#### 単複・ボックス

- 選択された馬の組み合わせを生成
- 重複を排除

#### 流し買い

- 軸馬と相手馬の組み合わせを生成
- 流しタイプに応じた組み合わせ

#### フォーメーション

- 各列の馬の組み合わせを生成
- 列ごとの選択を反映

## 使用例

```typescript
import { generateTicketCombinations } from './combinationGenerator';

// 馬連ボックス（3頭選択）
const tickets = generateTicketCombinations([[1, 2, 3]], 'quinella', 'box');
// 結果: [{ horses: [1, 2] }, { horses: [1, 3] }, { horses: [2, 3] }]

// 3連複流し（軸馬1頭、相手馬3頭）
const tickets = generateTicketCombinations(
  [[1], [2, 3, 4]],
  'trifecta',
  'nagashi',
  1,
  'first'
);
// 結果: 軸馬1頭と相手馬の組み合わせ
```

## 関連ファイル

- `pointCalculator.ts`: 組み合わせ数計算
- `purchaseForm.ts`: 型定義
