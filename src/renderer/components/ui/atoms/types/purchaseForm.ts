// 購入フォーム関連の型定義

export interface Horse {
  number: number;
  name: string;
  odds: number;
  expectedValue: number;
  evaluation: string;
}

export interface BetTicket {
  id: string;
  type: string;
  horses: string[];
  combinations: string[][]; // 具体的な組み合わせパターン
  amount: number;
  totalAmount: number; // 総購入金額
}

export interface PurchaseFormProps {
  horses: Horse[];
  onPurchase: (tickets: BetTicket[]) => void;
  onCancel: () => void;
}

export type NagashiType =
  | 'multi1'
  | 'multi2'
  | 'first'
  | 'second'
  | 'third'
  | 'firstSecond';

export interface BetTypeConfig {
  value: string;
  label: string;
  columns: number;
  description: string;
}

export interface BetMethodConfig {
  value: string;
  label: string;
  description: string;
}
