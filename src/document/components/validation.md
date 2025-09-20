# validation

購入フォームバリデーションユーティリティ

## 概要

購入フォームの入力値検証を行うユーティリティ関数を提供。馬券の選択内容や購入金額の妥当性をチェックする。

## 主要関数

### validateTicketAddition

```typescript
function validateTicketAddition(
  betType: string,
  method: string,
  columnHorses: (number | undefined)[][],
  axisHorse?: number
): string | null;
```

馬券追加時のバリデーションを行う。

#### パラメータ

- `betType`: 馬券種別
- `method`: 買い方
- `columnHorses`: 選択された馬の配列
- `axisHorse`: 軸馬（流し買いの場合）

#### 戻り値

- エラーメッセージ（string）または null

### validateAmount

```typescript
function validateAmount(amount: number): string | null;
```

購入金額のバリデーションを行う。

#### パラメータ

- `amount`: 購入金額

#### 戻り値

- エラーメッセージ（string）または null

### バリデーションルール

#### 馬券選択

- 最低 1 頭の馬が選択されていること
- 流し買いの場合は軸馬が選択されていること
- フォーメーション買いの場合は各列に馬が選択されていること

#### 購入金額

- 100 円以上であること
- 100 円単位であること
- 数値であること

## 使用例

```typescript
import { validateTicketAddition, validateAmount } from './validation';

// 馬券選択のバリデーション
const error = validateTicketAddition('quinella', 'box', [[1, 2, 3]]);
if (error) {
  console.error(error);
}

// 購入金額のバリデーション
const amountError = validateAmount(1000);
if (amountError) {
  console.error(amountError);
}
```

## 関連ファイル

- `pointCalculator.ts`: 組み合わせ数計算
- `combinationGenerator.ts`: 組み合わせ生成
