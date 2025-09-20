# betConfig

馬券設定定数

## 概要

馬券の種別と買い方の設定を定義する定数ファイル。購入フォームで使用する選択肢を提供する。

## 定数

### BET_TYPES

```typescript
const BET_TYPES = [
  { value: 'win', label: '単勝' },
  { value: 'place', label: '複勝' },
  { value: 'exacta', label: '馬連' },
  { value: 'quinella', label: '馬連' },
  { value: 'trifecta', label: '3連複' },
  { value: 'trio', label: '3連複' },
  { value: 'wide', label: 'ワイド' },
];
```

馬券種別の定義。

### BET_METHODS

```typescript
const BET_METHODS = [
  { value: 'single', label: '単複' },
  { value: 'box', label: 'ボックス' },
  { value: 'nagashi', label: '流し' },
  { value: 'formation', label: 'フォーメーション' },
];
```

買い方の定義。

### NAGASHI_TYPES

```typescript
const NAGASHI_TYPES = [
  { value: 'first', label: '1着固定流し' },
  { value: 'second', label: '2着固定流し' },
  { value: 'third', label: '3着固定流し' },
  { value: 'firstSecond', label: '1着・2着固定流し' },
];
```

流しタイプの定義。

## 使用例

```typescript
import { BET_TYPES, BET_METHODS, NAGASHI_TYPES } from './betConfig';

// 馬券種別の選択肢を取得
const betTypeOptions = BET_TYPES.map((type) => ({
  value: type.value,
  label: type.label,
}));

// 買い方の選択肢を取得
const methodOptions = BET_METHODS.map((method) => ({
  value: method.value,
  label: method.label,
}));
```

## 関連ファイル

- `BetSelectionForm.tsx`: 馬券選択フォーム
- `HorseSelector.tsx`: 馬選択テーブル
