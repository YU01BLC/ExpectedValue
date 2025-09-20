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
 * 枠番の色を取得する関数（netkeibaの色分けルールに準拠）
 */
export const getGateColor = (
  gateNumber: number,
  theme: Theme,
  totalHorses?: number
): ColorInfo => {
  // 基本の8色
  const baseColors = [
    { bg: '#FFFFFF', text: '#000000' }, // 1枠 - 白背景、黒文字
    { bg: '#000000', text: '#FFFFFF' }, // 2枠 - 黒背景、白文字
    { bg: '#FF0000', text: '#FFFFFF' }, // 3枠 - 赤背景、白文字
    { bg: '#0000FF', text: '#FFFFFF' }, // 4枠 - 青背景、白文字
    { bg: '#FFFF00', text: '#000000' }, // 5枠 - 黄背景、黒文字
    { bg: '#00FF00', text: '#000000' }, // 6枠 - 緑背景、黒文字
    { bg: '#FFA500', text: '#FFFFFF' }, // 7枠 - オレンジ背景、白文字
    { bg: '#FF69B4', text: '#FFFFFF' }, // 8枠 - ピンク背景、白文字
  ];

  // 17頭以上の場合：netkeibaの色分けルール
  if (totalHorses >= 17) {
    if (gateNumber >= 13 && gateNumber <= 15) {
      return baseColors[6]; // オレンジ色（7枠と同じ）
    }
    if (gateNumber >= 16 && gateNumber <= 18) {
      return baseColors[7]; // ピンク色（8枠と同じ）
    }
    // 1-12枠は通常の8色循環
    return baseColors[(gateNumber - 1) % 8];
  }

  // 16頭の場合：2枠ずつ色分け
  if (totalHorses === 16) {
    const colorIndex = Math.floor((gateNumber - 1) / 2);
    return baseColors[colorIndex % 8];
  }

  // その他の場合：通常の8色循環
  return baseColors[(gateNumber - 1) % 8];
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
