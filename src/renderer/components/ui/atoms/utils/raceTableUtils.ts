import { type Theme } from '@mui/material';
import type {
  HorseData,
  SortField,
  SortDirection,
  ColorInfo,
} from '../types/raceTable';

/**
 * 評価の色を取得する関数（テーマカラー使用）
 */
export const getEvaluationColor = (
  evaluation: string,
  theme: Theme
): string => {
  return (
    theme.palette.evaluation?.[
      evaluation as keyof typeof theme.palette.evaluation
    ] ||
    theme.palette.evaluation?.D ||
    theme.palette.grey[500]
  );
};

/**
 * 枠番の色を取得する関数（テーマカラー使用）
 */
export const getGateColor = (gateNumber: number, theme: Theme): ColorInfo => {
  return (
    theme.palette.gate?.[gateNumber as keyof typeof theme.palette.gate] ||
    theme.palette.gate?.default || {
      bg: theme.palette.grey[300],
      text: theme.palette.grey[800],
    }
  );
};

/**
 * 馬データをソートする関数
 */
export const sortHorseData = (
  horseData: HorseData[],
  sortField: SortField | null,
  sortDirection: SortDirection
): HorseData[] => {
  if (!sortField) return horseData;

  return [...horseData].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortField) {
      case 'horseNumber':
        aValue = a.horseNumber;
        bValue = b.horseNumber;
        break;
      case 'gateNumber':
        aValue = a.gateNumber;
        bValue = b.gateNumber;
        break;
      case 'evaluation': {
        // 評価の順序: S > A > B > C > D
        const evaluationOrder = { S: 5, A: 4, B: 3, C: 2, D: 1 };
        aValue = evaluationOrder[a.evaluation];
        bValue = evaluationOrder[b.evaluation];
        break;
      }
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
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });
};
