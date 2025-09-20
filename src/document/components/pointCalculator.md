# pointCalculator

馬券の組み合わせ数計算ユーティリティ

## 概要

馬券の組み合わせ数を計算するユーティリティ関数を提供。競馬の実際のルールに基づいて正確な計算を行う。

## 主要関数

### calculateCombinations

```typescript
function calculateCombinations(
  betType: string,
  method: string,
  horses: (number | undefined)[][]
): number;
```

馬券の組み合わせ数を計算する。

#### パラメータ

- `betType`: 馬券種別（'win', 'place', 'exacta', 'quinella', 'trifecta', 'trio', 'wide'）
- `method`: 買い方（'single', 'box', 'nagashi', 'formation'）
- `horses`: 選択された馬の配列

#### 戻り値

- 組み合わせ数（number）

### 計算ロジック

#### 単勝・複勝

- 単複: 選択馬数
- ボックス: 選択馬数

#### 馬連・3 連複

- 単複: 選択馬数
- ボックス: nC2 または nC3
- 流し: 軸馬数 × 相手馬数
- フォーメーション: 各列の組み合わせ

#### 3 連単・ワイド

- 単複: 選択馬数
- ボックス: nP3 または nC2
- 流し: 軸馬数 × 相手馬数
- フォーメーション: 各列の組み合わせ

## 使用例

```typescript
import { calculateCombinations } from './pointCalculator';

// 馬連ボックス（3頭選択）
const combinations = calculateCombinations('quinella', 'box', [[1, 2, 3]]);
// 結果: 3

// 3連複流し（軸馬1頭、相手馬3頭）
const combinations = calculateCombinations('trifecta', 'nagashi', [
  [1],
  [2, 3, 4],
]);
// 結果: 3
```

## 関連ファイル

- `combinationGenerator.ts`: 組み合わせ生成
- `validation.ts`: バリデーション
