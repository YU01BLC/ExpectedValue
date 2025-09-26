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
  betType: string; // 馬券種別
  horses: string[];
  combinations: string[][]; // 具体的な組み合わせパターン
  amount: number;
  points: number; // 購入点数
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
  raceInfo?: {
    date: string;
    venue: string;
    raceNumber: number;
    raceName: string;
  };
}

export type NagashiType =
  | 'multi1'
  | 'multi2'
  | 'first'
  | 'second'
  | 'third'
  | 'firstSecond';

// 馬単専用の流しタイプ（3着固定や1着・2着固定は存在しない）
export type ExactaNagashiType = 'first' | 'second' | 'multi1';

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
