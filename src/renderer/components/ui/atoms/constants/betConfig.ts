import {
  type BetTypeConfig,
  type BetMethodConfig,
} from '../types/purchaseForm';

// 馬券種別の定義
export const BET_TYPES: BetTypeConfig[] = [
  { value: 'win', label: '単勝', columns: 1, description: '1着のみ' },
  { value: 'place', label: '複勝', columns: 1, description: '1-3着のいずれか' },
  {
    value: 'wakuren',
    label: '枠連',
    columns: 2,
    description: '1着・2着の枠組み合わせ',
  },
  {
    value: 'quinella',
    label: '馬連',
    columns: 2,
    description: '1着・2着の組み合わせ',
  },
  { value: 'exacta', label: '馬単', columns: 2, description: '1着・2着の順序' },
  {
    value: 'wide',
    label: 'ワイド',
    columns: 2,
    description: '1着・2着の組み合わせ',
  },
  {
    value: 'trio',
    label: '3連複',
    columns: 3,
    description: '1着・2着・3着の組み合わせ',
  },
  {
    value: 'trifecta',
    label: '3連単',
    columns: 3,
    description: '1着・2着・3着の順序',
  },
];

// 買い方の定義
export const BET_METHODS: BetMethodConfig[] = [
  { value: 'single', label: '単式', description: '1点のみ' },
  {
    value: 'formation',
    label: 'フォーメーション',
    description: '複数頭の組み合わせ',
  },
  { value: 'box', label: 'ボックス', description: '全組み合わせ' },
  { value: 'nagashi', label: '流し', description: '軸馬+相手馬' },
];
