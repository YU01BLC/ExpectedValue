import { type HorseData } from '../../../components/ui/atoms/types/purchaseForm';

// ソートの型定義
export type SortField =
  | 'horseNumber'
  | 'gateNumber'
  | 'evaluation'
  | 'expectedValue'
  | 'odds';
export type SortDirection = 'asc' | 'desc';

// ソート関数
export const sortHorseData = (
  data: HorseData[],
  field: SortField,
  direction: SortDirection
): HorseData[] => {
  return [...data].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (field) {
      case 'horseNumber':
        aValue = a.horseNumber;
        bValue = b.horseNumber;
        break;
      case 'gateNumber':
        aValue = a.gateNumber;
        bValue = b.gateNumber;
        break;
      case 'evaluation':
        // 評価を数値に変換（S=5, A=4, B=3, C=2, D=1）
        const evaluationOrder = { S: 5, A: 4, B: 3, C: 2, D: 1 };
        aValue =
          evaluationOrder[a.evaluation as keyof typeof evaluationOrder] || 0;
        bValue =
          evaluationOrder[b.evaluation as keyof typeof evaluationOrder] || 0;
        break;
      case 'expectedValue':
        aValue = a.expectedValue;
        bValue = b.expectedValue;
        break;
      case 'odds':
        aValue = a.odds;
        bValue = b.odds;
        break;
      default:
        return 0;
    }

    if (aValue < bValue) {
      return direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
};
