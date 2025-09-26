import { type PurchaseHistory } from '../types/purchaseHistory';

const STORAGE_KEY = 'purchaseHistory';
const MAX_STORAGE_DAYS = 365; // 1年分のデータ保持

/**
 * 購入履歴のローカルストレージ管理
 */
export class PurchaseHistoryStorage {
  /**
   * 購入履歴を保存
   */
  static save(history: PurchaseHistory): void {
    try {
      const existingHistory = this.getAll();
      const updatedHistory = [history, ...existingHistory];

      // 古いデータを削除（1年分のみ保持）
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - MAX_STORAGE_DAYS);

      const filteredHistory = updatedHistory.filter((h) => {
        const historyDate = new Date(h.date);
        return historyDate >= cutoffDate;
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredHistory));
    } catch (error) {
      console.error('購入履歴の保存に失敗しました:', error);
    }
  }

  /**
   * 全購入履歴を取得
   */
  static getAll(): PurchaseHistory[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];

      const history = JSON.parse(stored) as PurchaseHistory[];
      return history.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } catch (error) {
      console.error('購入履歴の取得に失敗しました:', error);
      return [];
    }
  }

  /**
   * 特定の日付・会場の購入履歴を取得
   */
  static getByDateAndVenue(
    date: string,
    venue: string
  ): PurchaseHistory | null {
    const allHistory = this.getAll();
    return allHistory.find((h) => h.date === date && h.venue === venue) || null;
  }

  /**
   * 購入履歴を削除
   */
  static remove(id: string): void {
    try {
      const existingHistory = this.getAll();
      const filteredHistory = existingHistory.filter((h) => h.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredHistory));
    } catch (error) {
      console.error('購入履歴の削除に失敗しました:', error);
    }
  }

  /**
   * 全購入履歴をクリア
   */
  static clear(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('購入履歴のクリアに失敗しました:', error);
    }
  }

  /**
   * ストレージの使用状況を取得
   */
  static getStorageInfo(): { count: number; totalSize: number } {
    const history = this.getAll();
    const totalSize = JSON.stringify(history).length;
    return {
      count: history.length,
      totalSize,
    };
  }
}
