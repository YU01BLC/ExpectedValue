import { useCallback, useState } from 'react';
import { PurchaseHistoryStorage } from '../utils/purchaseHistoryStorage';
import {
  type PurchaseHistory,
  type PurchaseRace,
} from '../types/purchaseHistory';
import { type BetTicket } from '../components/ui/atoms/types/purchaseForm';

interface UsePurchaseCompletionProps {
  onPurchaseComplete?: () => void;
  onModalClose?: () => void;
}

interface PurchaseSuccessData {
  totalAmount: number;
  totalPoints: number;
}

/**
 * 購入完了処理を管理するカスタムフック
 */
export const usePurchaseCompletion = ({
  onPurchaseComplete,
  onModalClose,
}: UsePurchaseCompletionProps = {}) => {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successData, setSuccessData] = useState<PurchaseSuccessData | null>(
    null
  );
  /**
   * 購入完了処理
   */
  const handlePurchaseComplete = useCallback(
    (
      tickets: BetTicket[],
      raceInfo: {
        date: string;
        venue: string;
        raceNumber: number;
        raceName: string;
      }
    ) => {
      try {
        // 購入履歴データを作成
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD形式
        const purchaseHistory: PurchaseHistory = {
          id: `purchase_${Date.now()}`,
          date: today, // 現在の日付を使用
          venue: raceInfo.venue,
          races: [
            {
              raceNumber: raceInfo.raceNumber,
              raceName: raceInfo.raceName,
              status: 'upcoming',
              tickets: tickets.map((ticket) => ({
                betType: ticket.betType,
                horses: ticket.horses,
                amount: ticket.amount,
                points: ticket.points,
              })),
            },
          ],
          createdAt: new Date().toISOString(),
          totalAmount: tickets.reduce(
            (sum, ticket) => sum + ticket.totalAmount,
            0
          ),
          totalPoints: tickets.reduce((sum, ticket) => sum + ticket.points, 0),
        };

        // 既存の履歴を取得
        const existingHistory = PurchaseHistoryStorage.getAll();

        // 同じ日付・会場の履歴があるかチェック
        const existingIndex = existingHistory.findIndex(
          (h) => h.date === today && h.venue === raceInfo.venue
        );

        if (existingIndex >= 0) {
          // 既存の履歴にレースを追加
          const existing = existingHistory[existingIndex];
          const updatedHistory = {
            ...existing,
            races: [...existing.races, ...purchaseHistory.races],
            totalAmount: existing.totalAmount + purchaseHistory.totalAmount,
            totalPoints: existing.totalPoints + purchaseHistory.totalPoints,
          };

          // 既存の履歴を更新
          existingHistory[existingIndex] = updatedHistory;
          localStorage.setItem(
            'purchaseHistory',
            JSON.stringify(existingHistory)
          );
        } else {
          // 新しい履歴を追加
          PurchaseHistoryStorage.save(purchaseHistory);
        }

        // デバッグ用ログ
        console.log('購入履歴を保存しました:', purchaseHistory);
        console.log('購入金額の詳細:', {
          tickets: tickets.map((t) => ({
            amount: t.amount,
            points: t.points,
            totalAmount: t.totalAmount,
          })),
          calculatedTotal: tickets.reduce(
            (sum, ticket) => sum + ticket.totalAmount,
            0
          ),
        });
        console.log('保存後の全履歴:', PurchaseHistoryStorage.getAll());

        // 成功モーダルを表示
        setSuccessData({
          totalAmount: purchaseHistory.totalAmount,
          totalPoints: purchaseHistory.totalPoints,
        });
        setSuccessModalOpen(true);

        // 購入完了コールバックを実行
        onPurchaseComplete?.();

        // 同一タブでも履歴カードが即時更新されるよう、storage相当のイベントを明示発火
        try {
          window.dispatchEvent(
            new StorageEvent('storage', { key: 'purchaseHistory' })
          );
        } catch {}
      } catch (error) {
        console.error('購入履歴の保存に失敗しました:', error);
      }
    },
    [onPurchaseComplete, onModalClose]
  );

  const handleSuccessModalClose = useCallback(() => {
    setSuccessModalOpen(false);
    setSuccessData(null);
    onModalClose?.();
  }, [onModalClose]);

  return {
    handlePurchaseComplete,
    successModalOpen,
    successData,
    handleSuccessModalClose,
  };
};
