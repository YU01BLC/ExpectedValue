import { mockPurchaseHistory } from '../data/mockPurchaseHistory';
import { PurchaseHistoryStorage } from './purchaseHistoryStorage';

/**
 * モックデータを初期化
 * 開発環境でのみ実行される
 */
export const initializeMockData = () => {
  if (process.env.NODE_ENV === 'development') {
    // 既存のデータがあるかチェック
    const existingData = PurchaseHistoryStorage.getAll();

    if (existingData.length === 0) {
      // モックデータを保存
      mockPurchaseHistory.forEach((history) => {
        PurchaseHistoryStorage.save(history);
      });

      console.log('モックデータを初期化しました');
    }
  }
};
