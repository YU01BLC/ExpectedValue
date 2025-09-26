import { type PurchaseHistory } from '../types/purchaseHistory';

/**
 * 購入履歴のモックデータ
 */
export const mockPurchaseHistory: PurchaseHistory[] = [
  {
    id: '1',
    date: '2024-01-15',
    venue: '東京競馬場',
    races: [
      {
        raceNumber: 1,
        raceName: '新春ステークス',
        status: 'finished',
        tickets: [
          {
            betType: '単勝',
            horses: [3],
            amount: 1000,
            points: 1,
            isWinning: true,
            payout: 2500,
          },
          {
            betType: '馬連',
            horses: [3, 7],
            amount: 2000,
            points: 1,
            isWinning: false,
          },
        ],
      },
      {
        raceNumber: 2,
        raceName: '初春ステークス',
        status: 'finished',
        tickets: [
          {
            betType: '3連複',
            horses: [1, 5, 8],
            amount: 3000,
            points: 1,
            isWinning: true,
            payout: 15000,
          },
        ],
      },
    ],
    createdAt: '2024-01-15T10:30:00Z',
    totalAmount: 6000,
    totalPoints: 3,
  },
  {
    id: '2',
    date: '2024-01-14',
    venue: '中山競馬場',
    races: [
      {
        raceNumber: 1,
        raceName: '冬のステークス',
        status: 'finished',
        tickets: [
          {
            betType: 'ワイド',
            horses: [2, 4],
            amount: 1000,
            points: 1,
            isWinning: false,
          },
        ],
      },
      {
        raceNumber: 2,
        raceName: '寒風ステークス',
        status: 'finished',
        tickets: [
          {
            betType: '馬単',
            horses: [6, 1],
            amount: 2000,
            points: 1,
            isWinning: true,
            payout: 8000,
          },
        ],
      },
    ],
    createdAt: '2024-01-14T09:15:00Z',
    totalAmount: 3000,
    totalPoints: 2,
  },
  {
    id: '3',
    date: '2024-01-13',
    venue: '阪神競馬場',
    races: [
      {
        raceNumber: 1,
        raceName: '関西ステークス',
        status: 'upcoming',
        tickets: [
          {
            betType: '3連単',
            horses: [1, 3, 5],
            amount: 2000,
            points: 1,
          },
        ],
      },
      {
        raceNumber: 2,
        raceName: '近畿ステークス',
        status: 'upcoming',
        tickets: [
          {
            betType: '馬連',
            horses: [2, 7],
            amount: 1500,
            points: 1,
          },
        ],
      },
    ],
    createdAt: '2024-01-13T11:00:00Z',
    totalAmount: 3500,
    totalPoints: 2,
  },
  {
    id: '4',
    date: '2024-01-12',
    venue: '京都競馬場',
    races: [
      {
        raceNumber: 1,
        raceName: '古都ステークス',
        status: 'cancelled',
        tickets: [
          {
            betType: '単勝',
            horses: [4],
            amount: 1000,
            points: 1,
          },
        ],
      },
    ],
    createdAt: '2024-01-12T08:45:00Z',
    totalAmount: 1000,
    totalPoints: 1,
  },
];

/**
 * 購入履歴のサマリーデータを生成
 */
export const generatePurchaseHistorySummary = (history: PurchaseHistory[]) => {
  return history.map((h) => {
    const finishedRaces = h.races.filter((race) => race.status === 'finished');
    const winningRaces = finishedRaces.filter((race) =>
      race.tickets.some((ticket) => ticket.isWinning)
    );

    return {
      date: h.date,
      venue: h.venue,
      raceCount: h.races.length,
      totalAmount: h.totalAmount,
      totalPoints: h.totalPoints,
      winningRaces: winningRaces.length,
      totalRaces: finishedRaces.length,
    };
  });
};
