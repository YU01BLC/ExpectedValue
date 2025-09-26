/**
 * 購入履歴関連の型定義
 */

export interface PurchaseTicket {
  /** 馬券種別 */
  betType: string;
  /** 選択馬番号 */
  horses: number[];
  /** 購入金額 */
  amount: number;
  /** 購入点数 */
  points: number;
  /** 当選フラグ（終了済みレースのみ） */
  isWinning?: boolean;
  /** 払戻金額（当選時のみ） */
  payout?: number;
}

export interface PurchaseRace {
  /** レース番号 */
  raceNumber: number;
  /** レース名 */
  raceName: string;
  /** レース状態 */
  status: 'upcoming' | 'finished' | 'cancelled';
  /** 購入馬券一覧 */
  tickets: PurchaseTicket[];
}

export interface PurchaseHistory {
  /** 履歴ID */
  id: string;
  /** 開催日 */
  date: string;
  /** 会場名 */
  venue: string;
  /** レース一覧 */
  races: PurchaseRace[];
  /** 購入日時 */
  createdAt: string;
  /** 合計購入金額 */
  totalAmount: number;
  /** 合計購入点数 */
  totalPoints: number;
}

export interface PurchaseHistorySummary {
  /** 日付 */
  date: string;
  /** 会場名 */
  venue: string;
  /** レース数 */
  raceCount: number;
  /** 合計購入金額 */
  totalAmount: number;
  /** 合計購入点数 */
  totalPoints: number;
  /** 当選レース数 */
  winningRaces: number;
  /** 総レース数 */
  totalRaces: number;
}
