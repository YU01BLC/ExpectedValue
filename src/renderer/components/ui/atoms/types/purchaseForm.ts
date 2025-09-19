// 購入フォーム関連の型定義

export interface Horse {
  number: number;
  name: string;
  odds: number;
  expectedValue: number;
  evaluation: string;
  gateNumber: number;
}

export interface BetTicket {
  id: string;
  type: string;
  horses: string[];
  combinations: string[][]; // 具体的な組み合わせパターン
  amount: number;
  totalAmount: number; // 総購入金額
  // 流し馬券用の詳細情報
  axisHorse?: string; // 軸馬
  opponentHorses?: string[]; // 相手馬
  nagashiType?: NagashiType; // 流しタイプ
  // フォーメーション買い用の詳細情報
  columnHorses?: string[][]; // 列ごとの馬のリスト
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
